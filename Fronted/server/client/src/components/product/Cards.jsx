import {Card,CardContent,CardMedia,Typography,Button,Box,Chip,} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <Card
      component={Link}
      to={`/product/${product.product_id}`}
      sx={{
        maxWidth: 520,
        mt: { xs: 4, md: 0 },
        position: "relative",
        textAlign: "center",
        borderRadius: 1,
        backgroundColor:{xs:"rgba(0,0,0,0.4)",sm:"rgba(0,0,0,0.5)",md:"rgba(0,0,0,0.6)",lg:"rgba(0,0,0,0.99)"},
        transition:"background-color 1.3s ease","&:hover":{backgroundColor:"rgba(11, 0, 0, 0.5)"},
        textDecoration: "none",
        color: "inherit",
      }}>
      {/* Label */}
      <Chip
        label="I BUTIK"
        size="small"
        sx={{position: "absolute",top: 12,left: 12,bgcolor: "#7FA36B",color: "white",fontWeight: "bold",zIndex: 1,}}/>
      {/* Bild */}
      <Box
        sx={{p: 6, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)",}}>
        <CardMedia
          component="img"
          image={product.image_url ? `http://localhost:5000${product.image_url}`: "/images/preview.jpg"} alt={product.title || product.name}
          sx={{
                height: 420,
                width: "auto",
                objectFit: "contain",
                maskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)", 
                WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
              }}
        />
      </Box>
      {/* Produktinfo */}
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "#888",
            fontWeight: "bold",
            letterSpacing: 1,
          }}>
          {product.brand?.name || product.brand || ""}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "white" }}>
          {product.title || product.name}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {product.oldPrice && (
            <Typography
              component="span"
              sx={{textDecoration: "line-through",color: "#aaa",mr: 1,}}>
              {product.oldPrice} kr
            </Typography>
          )}
          <Typography
            component="span"
            sx={{color: "#ffffff",fontWeight: "bold",fontSize: 28,}}>
            {product.price} kr
          </Typography>
        </Box>
      </CardContent>
      {/* Add to cart */}
      <Box sx={{ pb: 2 }}>
        <Button variant="contained" onClick={(e) => {e.preventDefault();
            addToCart({
              ...product,
              id: product.product_id,
            });
          }}
          sx={{width: "80%", margin: "0 auto", display: "block", borderRadius: 1, backgroundColor: "rgba(0,0,0,0.2)", "&:hover": { bgcolor: "#433e3e" },}}>
          LÄGG TILL I VARUKORG
        </Button>
      </Box>
    </Card>
  );
}