import { useEffect, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AdminProductCard from "../components/product/AdminProductCard";
export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}` 
        }
    });
    setProducts(products.filter(p => p.product_id !== id));
  };
  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", mt: 6 }}>
      <Button variant="contained" component={Link} to="/productEdit/new" sx={{ mb: 4 }}>
        SKAPA PRODUKT
      </Button>
      <Grid container spacing={3} justifyContent="center">
        {products.map(product => (
          <Grid item key={product.product_id}>
            <AdminProductCard product={product} onDelete={deleteProduct}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}