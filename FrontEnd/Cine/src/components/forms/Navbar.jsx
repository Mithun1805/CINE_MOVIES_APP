
import * as React from "react";
import { useNavigate } from 'react-router-dom'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from '@mui/icons-material/Search';
import api from "./Axios";


const pages = ["HOME", "MY LIST", "HISTORY"];


function Navbar() {
      const username = localStorage.getItem("username");

    const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ["Profile", "Logout"];
  const handleLogout = async () => {
    try {
        // Get CSRF token from Django
        const csrfResponse = await api.get("/csrf/");

        const csrfToken = csrfResponse.data.csrfToken;

        // Logout with CSRF token
        await api.post(
            "/logout/",
            {},
            {
                headers: {
                    "X-CSRFToken": csrfToken,
                },
            }
        );

        console.log("Logout successful");

        navigate("/");
    } catch (error) {
        console.error("Logout error:", error);
    }
};
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const searchbox = () => {
    navigate("/search")
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#030405",
        borderRadius: 5,
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Desktop Logo */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CINE
            <Box
              component="span"
              sx={{
                color: "red",
                ml: 0.5,
              }}
            >
              MOVIES
            </Box>
          </Typography>

          {/* Mobile Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={()=>{handleCloseNavMenu();
                    if (page == "HOME"){
                        navigate("/home")
                    }
                    else if(page == "MY LIST"){
                        navigate("/mylist")

                    }
                    else if(page == "HISTORY"){
                        navigate("/history")
                    }
                }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CINE
            <Box
              component="span"
              sx={{
                color: "red",
                ml: 0.5,
              }}
            >
              MOVIES
            </Box>
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              paddingLeft: "200px",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{handleCloseNavMenu();
                    if (page == "HOME"){
                        navigate("/home")
                    }
                    else if(page == "MY LIST"){
                        navigate("/mylist")

                    }
                    else if(page == "HISTORY"){
                        navigate("/history")
                    }
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        <IconButton
              sx={{
                color: "white",
                 mr: 2,
             }}
             onClick={searchbox}
        >
             <SearchIcon />
         </IconButton>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar alt="User" />
              </IconButton>
            </Tooltip>
            

            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={()=>{handleCloseUserMenu();
                    if (setting === "Logout") {
                    handleLogout();
}
                    if(setting == "Profile"){
                      navigate("/profile")
                    }
                  }}
                >
                  
                  <Typography sx={{ textAlign: "center" }}>

                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

