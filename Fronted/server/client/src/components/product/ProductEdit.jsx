import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {TextField,Button,Typography,Box,Grid,MenuItem} from "@mui/material";
export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";
  const [formData, setFormData] = useState({
    title: "",
    model_id: "",
    price: "",
    description: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [models, setModels] = useState([]);
  /* ===============================
     HÄMTA MODELLER
  =============================== */
  useEffect(() => {
    fetch("http://localhost:5000/models")
      .then(res => res.json())
      .then(data => setModels(data))
      .catch(err => console.error(err));
  }, []);
  /* ===============================
     HÄMTA PRODUKT VID EDIT
  =============================== */
  useEffect(() => {
    if (!id || id === "new") return;
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          title: data.title || "",
          price: data.price || "",
          description: data.description || "",
          model_id: data.model_id || ""
        });
        if (data.image_url) {
          setPreview(`http://localhost:5000${data.image_url}`);
        }
      });
  }, [id]);
  /* ===============================
     INPUT CHANGE
  =============================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  /* ===============================
     IMAGE UPLOAD
  =============================== */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("model_id", formData.model_id);
    if (imageFile) {
      data.append("image", imageFile);
    }
    const method = isNew ? "POST" : "PUT";
    const url = isNew
      ? "http://localhost:5000/products"
      : `http://localhost:5000/products/${id}`;
    const res = await fetch(url, {method, body: data});
    await res.json();
    alert(isNew ? "Produkt skapad!" : "Produkt uppdaterad!");
    navigate("/admin/products");
  };
  /* ===============================
     UI
  =============================== */
return (
  <Box
    sx={{
      maxWidth: "900px",
      width: "95%",
      margin: "auto",
      mt: { xs: 1, md: 2 },
      p: 2,
      borderRadius: 3,
      background: "rgba(255,255,255,0.96)",
      boxShadow: "0 25px 70px rgba(0,0,0,0.6)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
    <Typography
      variant="h4"
      sx={{mb: 1, fontWeight: "bold", textAlign: "center"}}>
      🎸 {isNew ? "Skapa Gitarr" : "Redigera Gitarr"} {/*använde https://www.compart.com/en/unicode/U+1F3B8 men vi kunde också använda react-icons vi vlade denna emoji*/}
    </Typography>
    <Button component={Link} to="/admin/products" sx={{ mb: 3 }}>
      ← Tillbaka till admin
    </Button>
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Box sx={{ width: "100%", maxWidth: 700, margin: "auto" }}>
        {/* RAD 1 */}
        <Box
          sx={{display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2}}>
          <TextField label="Titel" name="title" value={formData.title} onChange={handleChange} fullWidth/>
          <TextField label="Pris" name="price" value={formData.price} onChange={handleChange} fullWidth/>
          <TextField select label="Modell" name="model_id" value={formData.model_id} onChange={handleChange} fullWidth>
            <MenuItem value="">Välj modell</MenuItem>
            {models.map(model => (
              <MenuItem key={model.model_id} value={model.model_id}>
                {model.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {/* RAD 2 */}
        <Box sx={{ mt: 2 }}>
          <TextField label="Beskrivning" name="description" value={formData.description} onChange={handleChange} multiline rows={3} fullWidth/>
        </Box>
        {/* BILD SEKTION */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Ladda upp bild
            <input hidden type="file" onChange={handleImageChange} />
          </Button>
          {preview && (
            <Box
              component="img"
              src={preview}
              sx={{width: "100%", maxWidth: 140, borderRadius: 3, border: "1px solid #ddd", background: "#fff", p: 2, mx: "auto", display: "block"}}/>
          )}
        </Box>
        {/* SPARA BUTTON */}
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{mt: 3, width: "100%", py: 1.2, fontWeight: "bold"}}>
          SPARA PRODUKT
        </Button>
      </Box>
    </form>
  </Box>
);
}