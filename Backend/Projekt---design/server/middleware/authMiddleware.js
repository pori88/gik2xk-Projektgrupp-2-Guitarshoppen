// Detta middleware används för att kontrollera om användaren är inloggad via JWT.
// Den hämtar token från request headern (authorization).
// Om ingen token finns skickas ett felmeddelande (403).
// Token delas upp och verifieras med jwt.verify() och en hemlig nyckel.
// Om token är giltig sparas användarens data i req.user så att den kan användas senare.
// Console.log används för att debugga och se headern och den dekodade token.
// Om token är ogiltig skickas också ett 403-fel.
// next() körs om allt är korrekt så att requesten kan gå vidare.
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
console.log("AUTH HEADER:", req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "supersecret");
    req.user = decoded;
    console.log("DECODED TOKEN:", decoded);   // <- lägg till denna
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
module.exports = authMiddleware;