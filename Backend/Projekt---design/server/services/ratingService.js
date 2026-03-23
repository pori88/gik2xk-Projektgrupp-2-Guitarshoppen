// Detta är en service för ratings (betyg) kopplade till produkter.Den hanterar logik och databas-anrop.
const db = require('../models');
const { sequelize } = require("../models");
const {createResponseSuccess,createResponseError,createResponseMessage} = require('../helpers/responseHelper');
async function addRating(productId, rating) {                                 // addRating lägger till ett nytt betyg för en produkt.
  if (!productId) return createResponseError(422, 'productId is required');   
  try {
    const created = await db.rating.create({                                  // Den sparar product_id, user_id, score och eventuell kommentar.
      product_id: Number(productId),
      user_id: rating.user_id,
      score: rating.score,
      comment: rating.comment || null
    });
    return createResponseSuccess(created, 201);
  } catch (err) {
    console.error(err);
    return createResponseError(500, err.message);
  }
}                                                                             
async function getByProduct(productId) {                                     // getByProduct hämtar alla ratings för en specifik produkt.
  if (!productId) return createResponseError(422, 'productId is required');
  try {
    const ratings = await db.rating.findAll({                                // Den inkluderar även information om användaren som gjort ratingen.
      where: { product_id: productId },
      include: [db.user]
    });
    return createResponseSuccess(ratings);
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function deleteRating(ratingId) {                                     // deleteRating tar bort en rating baserat på ratingId.
  if (!ratingId) return createResponseError(422, 'ratingId is required');
  try {
    const deleted = await db.rating.destroy({ where: { rating_id: ratingId } });
    if (!deleted) return createResponseError(404, 'Rating not found');      // Om ratingen inte finns returneras ett 404-fel.
    return createResponseMessage(200, 'Rating deleted');
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
exports.getAverageByProduct = async (productId) => {                        // async/await används för att hantera asynkrona databas-anrop.
                                                                            // getAverageByProduct räknar ut genomsnittligt betyg (AVG) 
  try {
    const result = await Rating.findOne({                                   // och antal ratings (COUNT) för en produkt med Sequelize.
      attributes: [
        [sequelize.fn("AVG", sequelize.col("score")), "average"],
        [sequelize.fn("COUNT", sequelize.col("rating_id")), "count"]
      ],
      where: { product_id: productId },
      raw: true
    });
    return {
      status: 200,
      data: result
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: error.message }
    };
  }
};
module.exports = { addRating, getByProduct, deleteRating };