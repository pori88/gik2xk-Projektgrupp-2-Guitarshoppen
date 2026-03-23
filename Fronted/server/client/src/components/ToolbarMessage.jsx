import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const token = localStorage.getItem("token");
<Box sx={{ bgcolor: "orange", py: 1, textAlign: "center" }}>
  <Typography variant="body2">
    Välkommen till Musikcenters butik idag! Öppet mellan kl 11:00 - 18:00.
  </Typography>
  {token && (
  <MenuItem component={Link} to="/admin/products">
    Admin
  </MenuItem>
)}
</Box>