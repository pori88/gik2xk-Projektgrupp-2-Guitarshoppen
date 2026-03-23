// Detta är en service för kundvagnen (cart) som hanterar logik och databas.
const db = require('../models');
const {createResponseSuccess,createResponseError,createResponseMessage} = require('../helpers/responseHelper');
async function getActiveCart(userId) {                                // getActiveCart hämtar en aktiv kundvagn för en användare.
  if (!userId) return createResponseError(422, 'userId is required'); //createResponseSuccess, createResponseError och createResponseMessage, 
                                                                      //Används för att skicka standardiserade svar.
  try {
    let cart = await db.cart.findOne({
      where: { user_id: userId, status: 'active' },
      include: [                                                      // Den inkluderar även cart_items och tillhörande produkter.
        {
          model: db.cart_item,                                        
          include: [db.product]
        }
      ]
    });
    if (!cart) {                                                      // Om ingen finns skapas en ny.
      cart = await db.cart.create({
        user_id: userId,
        status: 'active',
        created_at: new Date()
      });
    }
    return createResponseSuccess(cart);
  } catch (err) {
    return createResponseError(500, err.message);                    
  }
}
async function addItem(userId, productId, quantity) {                // addItem lägger till en produkt i kundvagnen.
  if (!userId || !productId) return createResponseError(422, 'userId and productId are required');
  const qty = Number(quantity ?? 1);                                // Om produkten redan finns uppdateras quantity istället.
  try {
    // ensure cart exists
    const cartRes = await getActiveCart(userId);
    if (cartRes.status !== 200) return cartRes;
    const cart = cartRes.data;
    const existing = await db.cart_item.findOne({
      where: { cart_id: cart.cart_id, product_id: productId }
    });
    if (existing) {                                                 // Annars skapas en ny cart_item.
      await db.cart_item.update(
        { quantity: existing.quantity + qty },
        { where: { cart_item_id: existing.cart_item_id } }
      );
      return createResponseMessage(200, 'Item quantity updated');  
    }
    await db.cart_item.create({
      cart_id: cart.cart_id,
      product_id: productId,
      quantity: qty
    });
    return createResponseMessage(201, 'Item added');              
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function updateItem(cartItemId, quantity) {                  // updateItem uppdaterar quantity för en specifik cart_item.
  if (!cartItemId) return createResponseError(422, 'cartItemId is required');  // används för att skicka standardiserade svar.
  try {
    await db.cart_item.update(
      { quantity: Number(quantity) },
      { where: { cart_item_id: cartItemId } }
    );
    return createResponseMessage(200, 'Cart item updated');      
  } catch (err) {
    return createResponseError(500, err.message);                 
  }
}
async function removeItem(cartItemId) {                           // removeItem tar bort en produkt från kundvagnen.
  if (!cartItemId) return createResponseError(422, 'cartItemId is required'); 
  try {
    const deleted = await db.cart_item.destroy({ where: { cart_item_id: cartItemId } });
    if (!deleted) return createResponseError(404, 'Cart item not found');     // Om produkten inte finns returneras ett 404-fel.
    return createResponseMessage(200, 'Cart item removed');                  
  } catch (err) {
    return createResponseError(500, err.message);                            
  }
}
module.exports = { getActiveCart, addItem, updateItem, removeItem};         // Alla funktioner exporteras så att de kan användas i routes.