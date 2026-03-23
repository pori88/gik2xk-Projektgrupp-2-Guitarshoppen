import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
export default function CartItems({cartItems,increaseQty,decreaseQty,removeItem}) {
  return (
    <Box>
      {cartItems.map((item, index) => (
        <Box key={item.id}>
          <Box
            sx={{display: "flex", justifyContent: "space-between", alignItems: "center", py: 2}}>
            {/* namn + pris */}
            <Box>
              <Typography
                sx={{fontSize: "1.2rem",fontWeight: 600,color: "white"}}>
                {item.title}
              </Typography>
              <Typography
                sx={{color: "#e00000",fontWeight: "bold",fontSize: "1.5rem",fontVariantNumeric: "tabular-nums",whiteSpace: "nowrap"}}>
                {item.price.toLocaleString("sv-SE")} kr
              </Typography>
            </Box>
            {/* controls */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button variant="contained" size="small" onClick={() => decreaseQty(item.id)}>
                -
              </Button>
              <Typography
                sx={{fontSize: "1.3rem",fontWeight: "bold",color: "white",minWidth: 30,textAlign: "center"}}>
                {item.quantity}
              </Typography>
              <Button variant="contained" size="small" onClick={() => increaseQty(item.id)}>
                +
              </Button>
              <IconButton color="error" onClick={() => removeItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          {/* Divider (inte efter sista) */}
          {index !== cartItems.length - 1 && (
            <Divider
              sx={{borderColor: "rgba(255,255,255,0.2)"}}/>
          )}
        </Box>
      ))}
    </Box>
  );
}