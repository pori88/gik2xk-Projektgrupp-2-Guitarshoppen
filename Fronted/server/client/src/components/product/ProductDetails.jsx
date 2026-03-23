import {Container,Grid,Typography,Button,Box,Paper} from "@mui/material";
import RatingSection from "./RatingSection";
function ProductDetailCard({ product, addToCart }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Paper
        elevation={10}
        sx={{p: 4, borderRadius: 3, backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(6px)"}}>
        <Grid container spacing={4} alignItems="center">
          {/* Produktbild */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{background: "white", borderRadius: 3, p: 3, display: "flex", justifyContent: "center"}}>
              <img src={`http://localhost:5000${encodeURI(product.image_url)}`} alt={product.title}
                style={{maxHeight: "420px", width: "auto", objectFit: "contain"}}/>
            </Box>
          </Grid>
          {/* Produktinfo */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="h4"
              sx={{ color: "white", fontWeight: 700, mb: 2 }}>
              {product.title}
            </Typography>
            <Typography sx={{ color: "#ccc", mb: 1 }}>
              <strong>Märke:</strong> {product.model?.brand?.name}
            </Typography>
            <Typography sx={{ color: "#ccc", mb: 1 }}>
              <strong>Modell:</strong> {product.model?.name}
            </Typography>
            <Typography sx={{ color: "#ccc", mb: 3 }}>
              <strong>Typ:</strong> {product.model?.guitar_type?.name}
            </Typography>
            <Typography
            sx={{color: "#ffffff", fontWeight: "bold", mb: 1, mt: 2}}>
            Beskrivning:
          </Typography>
            <Typography
              sx={{color: "#ffffff", mb: 3, lineHeight: 1.6, maxWidth: 500}}>
              {product.description}
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "red", fontWeight: "bold", mb: 3 }}>
              {product.price} kr
            </Typography>
            <Button
              variant="contained" size="large" onClick={() =>
                addToCart({...product, id: product.product_id})}
              sx={{px: 5, py: 1.5, fontSize: 16, borderRadius: 2, backgroundColor: "rgba(199, 140, 140, 0.2)", "&:hover": { bgcolor: "#521111" }}}>
              LÄGG TILL I VARUKORG
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ mt: 4 }}>
        <RatingSection productId={product.product_id} />
      </Box>
    </Container>
  );
}
export default ProductDetailCard;