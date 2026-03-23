import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductDetailCard from "../components/product/ProductDetails";
function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return <h2 style={{ color: "white" }}>Laddar produkt...</h2>;
  }
  if (!product) {
    return <h2 style={{ color: "white" }}>Produkten hittades inte</h2>;
  }
  return (
    <ProductDetailCard
      product={product}
      addToCart={addToCart}
    />
  );
}
export default ProductDetails;