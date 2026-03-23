// Detta är en service för produkter som hanterar logik och databas.
const db = require('../models');
const {createResponseSuccess,createResponseError,createResponseMessage} = require('../helpers/responseHelper');
const productInclude = [                          // productInclude används för att inkludera relaterad data:
  {
    model: db.model,                              // model (med brand och guitar_type), bilder och ratings med användare.
    include: [db.brand, db.guitar_type]
  },
  {
    model: db.product_image,
    attributes: ["image_url"]
  },
  {
    model: db.rating,
    include: [db.user]
  }
];
function formatProduct(product) {                  // Omvandlar produkten till JSON och hämtar första bilden (image_url)
  const p = product.toJSON();                      // så att det blir enklare att använda i frontend.

  return {
    ...p,
    image_url: p.product_images?.[0]?.image_url || null
  };
}
async function getAll() {                          // getAll hämtar alla produkter med relaterad data.
  try {
    const products = await db.product.findAll({
      include: productInclude
    });
    const formattedProducts = products.map(formatProduct);
    return createResponseSuccess(formattedProducts);      // Produkterna formateras innan de skickas tillbaka.
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function getById(id) {                      // getById hämtar en specifik produkt baserat på id.
  if (!id) return createResponseError(422, 'product id is required');
  try {
    const product = await db.product.findOne({
      where: { product_id: id },
      include: productInclude
    });
    if (!product) return createResponseError(404, 'Product not found');   // Om produkten inte finns returneras 404.
    return createResponseSuccess(formatProduct(product));
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function create(product) {                  // create skapar en ny produkt i databasen.
  try {
    const created = await db.product.create(product);
    return createResponseSuccess(created, 201);
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function update(id, product) {              // update uppdaterar en produkt.
  if (!id) return createResponseError(422, 'product id is required');
  try {
    const existing = await db.product.findOne({   // Den kollar först om produkten finns.
      where: { product_id: id }
    });
    if (!existing) return createResponseError(404, 'Product not found');
    await db.product.update(product, {
      where: { product_id: id }
    });
    const updatedProduct = await db.product.findOne({
      where: { product_id: id },
      include: productInclude                     
    });
    return createResponseSuccess(formatProduct(updatedProduct)); // Sedan uppdateras den och hämtas igen med inkluderad data.
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function destroy(id) {                      // destroy tar bort en produkt.
  if (!id) return createResponseError(422, 'product id is required');
  try {
    const deleted = await db.product.destroy({
      where: { product_id: id }
    });
    if (!deleted) return createResponseError(404, 'Product not found'); // Om produkten inte finns returneras 404.
    return createResponseMessage(200, 'Product deleted');
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
module.exports = {getAll,getById,create,update,destroy}; // Alla funktioner exporteras så att de kan användas i routes.