// Detta är huvudfilen för Express-appen där servern konfigureras.
// Importerar viktiga paket som express, cookieParser, logger och path.
// Skapar en Express-app och registrerar Sequelize-modeller så de kan användas globalt.
// Middleware:
// logger loggar requests i terminalen.
// express.json() och urlencoded() hanterar inkommande data.
// cookieParser används för cookies.
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require("path");
const app = express();
// registrera sequelize models
const models = require("./models");
app.set("models", models);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// CORS tillåter att frontend kan anropa backend (alla origins tillåtna).
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  next();
});
// Serverar (bilder) från olika mappar via /images och /uploads.
app.use("/images", express.static(path.join(__dirname, "uploads/images")));
app.use("/images", express.static(path.join(__dirname, "../client/public/images")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// ROUTES
// Kopplar olika endpoints till respektive route-fil (models, products, carts, users).
// ratings routes är kopplade till specifika produkter.
// admin routes används för admin-funktioner.
app.use('/models', require('./routes/modelRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/products/:productId/ratings', require('./routes/ratingRoutes'));
app.use('/carts', require('./routes/cartRoutes'));
app.use('/users', require('./routes/userRoutes'));
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);
module.exports = app;