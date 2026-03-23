import ProductCard from "../components/product/Cards";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Products() {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });
  }, []);
  const filteredProducts =
    !type || type === "all"
      ? products
      : products.filter(product => {
          const guitarTypeId = product.model?.type_id;
          if (type === "electric") return guitarTypeId === 25;
          if (type === "acoustic") return guitarTypeId === 26;
          return true;
        });
  return (
    <Box
  sx={{display: "grid", gridTemplateColumns: {xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}, gap: 4, p: 4}}>
  {filteredProducts.map(product => (
    <ProductCard key={product.product_id} product={product} />
  ))}
</Box>
  );
}