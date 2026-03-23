// Detta är en route för admin-inloggning.
// Den tar emot email och lösenord från request body.
// Om uppgifterna stämmer med de hårdkodade admin-uppgifterna skapas en JWT token.
// Token innehåller admin-roll och email och gäller i 2 timmar.
// Om inloggningen lyckas skickas token tillbaka.
// Om uppgifterna är fel returneras ett 401-fel.
// Routern exporteras så att den kan användas i appen.
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ADMIN_EMAIL = "pori@live.se";
const ADMIN_PASSWORD = "admin123";
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (
    email === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { role: "admin", email },
      "supersecret",
      { expiresIn: "2h" }
    );
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid admin credentials" });
});
module.exports = router;