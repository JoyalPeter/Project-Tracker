import Box from "@mui/material/Box";
import Logout from "../Logout/Logout";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [openLogout, setOpenLogout] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: "2%" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              data-testid="test-navbar-home"
              onClick={() => navigate("/")}
            >
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
