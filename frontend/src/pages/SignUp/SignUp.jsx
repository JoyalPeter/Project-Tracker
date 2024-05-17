import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import {
  Api_Methods,
  PasswordRegex,
  ToasterMessages,
} from "../../utils/Constants";
import makeApiCall from "../../utils/ApiCall";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { InputAdornment } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [validPassWord, setValidPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setValidPassword(PasswordRegex.test(password));
  }, [password]);

  useEffect(() => {
    setPasswordConfirmed(password === confirmPassword);
  }, [confirmPassword]);

  async function handleSubmit() {
    try {
      setLoading(true);
      await makeApiCall("/users/signup", Api_Methods.POST, {
        username,
        password,
      }).then((response) => {
        localStorage.setItem("userID", response.userID);
        toast.success(ToasterMessages.SIGNUP_SUCCESS);
        navigate("/signin");
      });
    } catch (error) {
      console.error("The following error occured:\n", error);
      toast.error(ToasterMessages.SIGNUP_ERROR);
      toast.error(error.message, { delay: 250 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  data-testid="test-signup-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Tooltip
                  title="The password must contain at least one digit, one lowercase
                  letter,one uppercase letter, one special character and no
                  whitespace."
                  placement="right"
                  arrow={true}
                >
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    data-testid="test-signup-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    error={password !== "" && !validPassWord}
                    helperText={
                      validPassWord === false && password !== ""
                        ? "Password doesn't meet requirements"
                        : ""
                    }
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
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
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  data-testid="test-signup-confirm-password"
                  error={confirmPassword != "" && !passwordConfirmed}
                  helperText={
                    passwordConfirmed === false && confirmPassword !== ""
                      ? "Passwords doesn't match"
                      : ""
                  }
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              data-testid="test-signup-signup-button"
              sx={{ mt: 3, mb: 2 }}
              disabled={!(validPassWord && passwordConfirmed)}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
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
