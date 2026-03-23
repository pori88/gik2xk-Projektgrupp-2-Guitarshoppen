import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import BackgroundVideo from "./components/BackgroundVideo";
import "./index.css";
import { useCart } from "./context/CartContext";

function App() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElGuitars, setAnchorElGuitars] = React.useState(null);
  const { cartItems } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userName = user ? `${user.firstName || ""} ${user.lastName || ""}` : "";
  const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenGuitarsMenu = (event) => {
    setAnchorElGuitars(event.currentTarget);
  };
  const handleCloseGuitarsMenu = () => {
    setAnchorElGuitars(null);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <>
      <BackgroundVideo />
      <AppBar position="static" sx={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" component={Link} to="/"
              sx={{mr: 2, fontWeight: 700, letterSpacing: ".2rem", color: "inherit",textDecoration: "none",}}>
              GITARRSHOPPEN
            </Typography>
            {/* MOBILE MENU */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                <MenuItem onClick={handleOpenGuitarsMenu}>
                  Alla Gitarrer
                </MenuItem>
                <Menu anchorEl={anchorElGuitars} open={Boolean(anchorElGuitars)} onClose={handleCloseGuitarsMenu}>
                  <MenuItem component={Link} to="/products/all" onClick={() => {handleCloseGuitarsMenu(); handleCloseNavMenu();}}>
                    Alla Gitarrer
                  </MenuItem>
                  <MenuItem component={Link} to="/products/electric" onClick={() => {handleCloseGuitarsMenu(); handleCloseNavMenu();}}>
                    Elgitarrer
                  </MenuItem>
                  <MenuItem component={Link} to="/products/acoustic" onClick={() => {handleCloseGuitarsMenu(); handleCloseNavMenu();}}>
                    Akustiska
                  </MenuItem>
                </Menu>
                <MenuItem component={Link} to="/Cart" onClick={handleCloseNavMenu}>
                  Varukorg ({cartCount})
                </MenuItem>
                {/* ANVÄNDAR LOGIN */}
                {!token && !user && (
                  <MenuItem component={Link} to="/login" onClick={handleCloseNavMenu}>
                    Registera dig/Login
                  </MenuItem>
                )}
                {user && (
                  <MenuItem disabled>
                    {userName}
                  </MenuItem>
                )}
                {/* ADMIN PANEL */}
                {token && (
                  <MenuItem component={Link} to="/admin/products" onClick={handleCloseNavMenu}>
                    Admin Panel
                  </MenuItem>
                )}
                {(token || user) && (
                  <MenuItem onClick={() => {logout(); handleCloseNavMenu();}}>
                    Logout
                  </MenuItem>
                )}
              </Menu>
            </Box>
            {/* DESKTOP MENU */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button onClick={handleOpenGuitarsMenu} endIcon={<KeyboardArrowDownIcon />}
                sx={{ color: "white" }}>
                Alla Gitarrer
              </Button>
              <Menu
                anchorEl={anchorElGuitars}
                open={Boolean(anchorElGuitars)}
                onClose={handleCloseGuitarsMenu}
                slotProps={{
                  paper: {
                    sx: {backgroundColor: "rgba(122,22,22,0.6)", color: "white", boxShadow: "none"}}}}>
                <MenuItem component={Link} to="/products/all" onClick={handleCloseGuitarsMenu}>
                  Alla gitarrer
                </MenuItem>
                <MenuItem component={Link} to="/products/electric" onClick={handleCloseGuitarsMenu}>
                  Elgitarrer
                </MenuItem>
                <MenuItem component={Link} to="/products/acoustic" onClick={handleCloseGuitarsMenu}>
                  Akustiska gitarrer
                </MenuItem>
              </Menu>
              <Button component={Link} to="/Cart" sx={{ color: "white" }}>
                Varukorg ({cartCount})
              </Button>
              {!token && !user && (
                <Button component={Link} to="/login" sx={{ color: "white" }}>
                  Registera dig/Login
                </Button>
              )}
              {user && (
                <Button sx={{ color: "white" }}>
                  {userName}
                </Button>
              )}
              {token && (
                <Button component={Link} to="/admin/products" sx={{ color: "white" }}>
                  Admin Panel
                </Button>
              )}
              {(token || user) && (
                <Button onClick={logout} sx={{ color: "white" }}>
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default App;