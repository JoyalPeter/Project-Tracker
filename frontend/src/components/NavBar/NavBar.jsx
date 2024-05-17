import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logout from "../Logout/Logout";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

export default function NavBar() {
  const navigate = useNavigate();
  const [openLogout, setOpenLogout] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: "2%" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" data-testid="test-navbar-home" onClick={() => navigate("/")}>
              <HomeIcon />
            </IconButton>
            <Typography
              align="center"
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Take Home Challenge
            </Typography>

            <Button
              color="inherit"
              data-testid="test-navbar-logout"
              startIcon={<LogoutIcon />}
              onClick={() => {
                setOpenLogout(true);
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Logout open={openLogout} setOpen={setOpenLogout} />
    </>
  );
}
