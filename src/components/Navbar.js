import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { common, green, blueGrey } from "@mui/material/colors";
import { AuthContext, auth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { BlogContext } from "../contexts/BlogContext";

const login = ["Login", "Register"];
const userProfil = ["Profile", "New Blog", "Logout"];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const { setGoogle } = React.useContext(BlogContext);

  const { currentUser } = React.useContext(AuthContext);
  // const [setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    // setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigation = (setting) => {
    if (setting === "Login") {
      navigate("/login");
    } else if (setting === "Register") {
      navigate("/register");
    } else {
      navigate("/");
    }
  };

  const handleNavigationUser = (setting) => {
    if (setting === "Profile") {
      navigate("/profile");
    } else if (setting === "New Blog") {
      navigate("/newblog");
    } else if (setting === "Logout") {
      signOut(auth);
      setGoogle(false);
      navigate("/");
    }
  };

  // React.useEffect(() => {
  //   console.log(google);
  // });

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: common.white,
        boxShadow: `3px 3px 4px ${blueGrey[400]}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img
              src={`https://www.onblastblog.com/wp-content/uploads/2017/08/blogger-logo-624x357.jpg`}
              alt={"blog"}
              loading="lazy"
              style={{
                width: "8rem",
                // borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Harun Dayan" sx={{ bgcolor: green[700] }}>
                  {!currentUser ? (
                    <AccountCircleIcon />
                  ) : currentUser.displayName.lenght > 2 ? (
                    currentUser.displayName[0]
                  ) : currentUser ? (
                    currentUser.displayName
                  ) : (
                    "hd"
                  )}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
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
              {currentUser
                ? userProfil.map((setting, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => handleNavigationUser(setting)}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))
                : login.map((setting, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => handleNavigation(setting)}
                      >
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
};
export default ResponsiveAppBar;
