const router = require('express').Router();  // Detta är en router för cart (kundvagn) i Express.
const cartService = require('../services/cartService'); // Den använder cartService för att hantera logiken istället för att skriva allt här.

// GET hämtar den aktiva kundvagnen för en specifik användare via userId.
router.get('/active/:userId', (req, res) => {
  cartService.getActiveCart(req.params.userId).then((result) => {
    res.status(result.status).json(result.data);
  });
});
// POST lägger till en produkt i användarens aktiva kundvagn (med product_id och quantity från body).
router.post('/active/:userId/items', (req, res) => {
  const { product_id, quantity } = req.body;
  cartService.addItem(req.params.userId, product_id, quantity).then((result) => {
    res.status(result.status).json(result.data);
  });
});
// PUT uppdaterar antalet (quantity) för en specifik produkt i kundvagnen.
router.put('/items/:cartItemId', (req, res) => {
  cartService.updateItem(req.params.cartItemId, req.body.quantity).then((result) => {
    res.status(result.status).json(result.data);
  });
});
// DELETE tar bort en produkt från kundvagnen baserat på cartItemId.
router.delete('/items/:cartItemId', (req, res) => {
  cartService.removeItem(req.params.cartItemId).then((result) => {
    res.status(result.status).json(result.data);
  });
});
module.exports = router; // Alla anrop skickas vidare till cartService och returnerar status + data som svar.
                        // module.exports gör så att routern kan användas i andra filer.