import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../utils/ColorTheme";

import Logout from "../Logout/Logout";
import { Avatar } from "@mui/material";

export default function NavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [openLogout, setOpenLogout] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  function handleClick(event){
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: "2%" }}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Home">
              <IconButton
                edge="start"
                color="inherit"
                data-testid="test-navbar-home"
                onClick={() => navigate("/")}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Typography
              align="center"
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Project Tracker
            </Typography>
            <Tooltip title="Change mode">
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Tooltip>
            <IconButton onClick={handleClick}>
              <Avatar>{localStorage.getItem("username")[0]}</Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Button
            color="inherit"
            data-testid="test-navbar-logout"
            startIcon={<LogoutIcon />}
            onClick={() => {
              handleClose()
              setOpenLogout(true);
            }}
          >
            Logout
          </Button>
        </MenuItem>
      </Menu>
      <Logout open={openLogout} setOpen={setOpenLogout} />
    </>
  );
}
