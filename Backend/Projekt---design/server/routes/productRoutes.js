const router = require('express').Router();
const productService = require('../services/productService');
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");
const ratingRoutes = require('./ratingRoutes');

router.use('/:productId/ratings', ratingRoutes);                    // ratingRoutes kopplas till varje produkt via /:productId/ratings.
                                                                    // GET hämtar alla produkter.
                                                                    // GET med id hämtar en specifik produkt.
router.get('/', (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.get('/:id', (req, res) => {
  productService.getById(req.params.id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.post('/', upload.single("image"), async (req, res) => {      // POST skapar en ny produkt och kan även ladda upp en bild med multer.
                                                                    // Om en bild finns sparas den i databasen med rätt product_id.
  try {                                                             // try/catch används för att hantera fel och returnera 500 om något går fel.
    const productData = {
      model_id: req.body.model_id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      is_active: 1
    };
    const result = await productService.create(productData);
    const product = result.data.dataValues || result.data;
    console.log(result.data);
    if (req.file) {
  await req.app.get("models").product_image.create({
    product_id: product.product_id,
    image_url: "/uploads/images/" + req.file.filename
  });
}
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
router.put('/:id', upload.single("image"), (req, res) => {        // PUT uppdaterar en produkt och kan också uppdatera bilden om en ny laddas upp.
  const productData = {
    ...req.body
  };
  if (req.file) {
    productData.image_url = "/images/" + req.file.filename;
  }
  productService.update(req.params.id, productData).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.delete("/:id", async (req, res) => {                       // DELETE tar bort en produkt.
                                                                  // Den kollar först om det finns en bild kopplad och raderar filen från servern.
                                                                  // Sedan tas produkten bort via productService.
  try {                                                           // try/catch används för att hantera fel och returnera 500 om något går fel.
    const models = req.app.get("models");
    const image = await models.product_image.findOne({
      where: { product_id: req.params.id }
    });
    if (image) {
      const filePath = path.join(
        __dirname,
        "../uploads/images",
        path.basename(image.image_url)
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    const result = await productService.destroy(req.params.id);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
module.exports = router;                                        // Routern exporteras så att den kan användas i appen.