import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItems from "../components/cart/CartItems";

export default function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.0)",
      }}
    >
      <Box
        sx={{
          width: 600,
          p: 4,
          borderRadius: 2,
          backgroundColor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "white",
            textShadow: "0 2px 10px rgba(0,0,0,0.7)",
          }}
        >
          Din Varukorg
        </Typography>
        <CartItems
          cartItems={cartItems}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeItem={removeItem}
        />
        <Box sx={{ mt: 4, fontWeight: 700, color: "white", fontSize: "2rem" }}>
          <Typography variant="h4">
            Totalt:{" "}
            {total.toLocaleString("sv-SE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            kr
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgba(122,22,22,0.8)" }}
            component={Link}
            to="/products/all"
          >
            Fortsätt handla
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#7a1616" }}>
            Till kassan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
