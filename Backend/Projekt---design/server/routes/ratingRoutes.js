// Detta är en router för ratings kopplade till produkter.
const router = require('express').Router({ mergeParams: true });              // mergeParams gör att productId från parent route kan användas här.
const ratingService = require('../services/ratingService');
const authMiddleware = require("../middleware/authMiddleware");
router.get('/', (req, res) => {                                               // GET hämtar alla ratings för en specifik produkt.
  ratingService.getByProduct(req.params.productId).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.get('/average', (req, res) => {                                        // GET /average hämtar genomsnittligt betyg för produkten.
  ratingService.getAverageByProduct(req.params.productId).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post('/', (req, res) => {                                              // POST lägger till en ny rating för produkten med data från request body.
  console.log(req.body);
  ratingService.addRating(req.params.productId, req.body).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.delete('/:ratingId', authMiddleware, (req, res) => {         // DELETE tar bort en rating.Den använder authMiddleware för att kontrollera att användaren är inloggad.

  console.log("REQ USER:", req.user);

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });                   // Endast admin får ta bort ratings, annars returneras ett 403-fel.
  }

  ratingService.deleteRating(req.params.ratingId).then((result) => {          // ratingService används för all logik och databas-anrop.
    res.status(result.status).json(result.data);
  });

});

module.exports = router;                                                      // Routern exporteras så att den kan användas i appen.