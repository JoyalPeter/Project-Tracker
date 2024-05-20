import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import makeApiCall from "../../utils/ApiCall";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment  from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Api_Methods, ToasterMessages } from "../../utils/Constants";

import Loader from "../../components/Loader/Loader";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      setLoading(true);
      await makeApiCall("/signin", Api_Methods.POST, {
        username,
        password,
      }).then((response) => {
        localStorage.setItem("jwtToken", response.access_token);
        const payload = jwtDecode(response.access_token);
        localStorage.setItem("userID", payload.userID);
        navigate("/");
      });
    } catch (error) {
      console.error("The following error occured:\n", error);
      toast.error(ToasterMessages.SIGNIN_ERROR);
      toast.error(error.message, { delay: 250 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container component="main" data-testid="test-sign-in" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              required
              fullWidth
              autoFocus
              margin="normal"
              data-testid="test-sign-in-username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              data-testid="test-sign-in-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              data-testid="test-sign-in-btn"
              sx={{ mt: 3, mb: 2 }}
              disabled={username === "" || password === ""}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" data-testid="test-sign-in-sign-up-link" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Loader open={loading} />
    </>
  );
}
