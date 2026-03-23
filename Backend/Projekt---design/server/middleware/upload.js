// Detta används för att hantera filuppladdningar med multer.
// storage bestämmer var filer ska sparas och vad de ska heta.
// destination anger mappen där bilderna sparas (uploads/images).
// filename skapar ett unikt namn med Date.now() så att filer inte skrivs över.
// path.extname behåller filens ursprungliga filändelse (t.ex. .jpg, .png).
// upload exporteras så att det kan användas i routes för att ladda upp bilder.
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/images"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });
module.exports = upload;