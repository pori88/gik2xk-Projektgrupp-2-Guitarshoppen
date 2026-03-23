import {Card,CardContent,CardMedia,Typography,Button,Box,Chip} from "@mui/material";
import { Link } from "react-router-dom";
export default function AdminProductCard({ product, onDelete }) {
  return (
    <Card
      sx={{maxWidth: 320, mt: { xs: 4, md: 12 }, position: "relative", textAlign: "center", borderRadius: 1, backgroundColor: "rgba(0,0,0,0.4)",color: "inherit"}}>
      <Chip label="ADMIN" size="small"
        sx={{position: "absolute", top: 12, left: 12, bgcolor: "#7FA36B", color: "white", fontWeight: "bold", zIndex: 1}}/>
      {/* Bild */}
      <Box
        sx={{p: 3, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)"}}>
        <CardMedia
          component="img"
          image={
            product.image_url
              ? `http://localhost:5000${product.image_url}`
              : "/images/preview.jpg"
          }
          alt={product.title}
          sx={{
            height: 220,
            width: "auto",
            objectFit: "contain"
          }}
        />
      </Box>
      <CardContent>
        <Typography
          variant="body2"
          sx={{color: "#888", fontWeight: "bold", letterSpacing: 1}}> {product.brand?.name || product.brand || ""}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "white" }}>
          {product.title}
        </Typography>
        <Typography
          sx={{color: "#e00000", fontWeight: "bold", fontSize: 18}}>{product.price} kr
        </Typography>
      </CardContent>
      <Box sx={{ pb: 2 }}>
        <Button component={Link} to={`/productEdit/${product.product_id}`}
          sx={{mr: 1}}>
          ÄNDRA
        </Button>
        <Button color="error" onClick={() => onDelete(product.product_id)}>
          TA BORT
        </Button>
      </Box>
    </Card>
  );
}