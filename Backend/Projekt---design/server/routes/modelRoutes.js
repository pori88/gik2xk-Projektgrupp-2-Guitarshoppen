const router = require("express").Router(); // Detta är en GET-route som hämtar alla poster från databasen.
router.get("/", async (req, res) => {       // Den använder async/await för att hämta data från modellen.
  try {                                     // Om det lyckas skickas datan tillbaka som JSON.
    const models = await req.app.get("models").model.findAll();
    res.json(models);
  } catch (err) {
    res.status(500).json(err);              // Om något går fel returneras ett 500-fel.
  }
});
module.exports = router;                    // Routern exporteras så att den kan användas i appen.