import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      className="not-found-container"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" className="not-found-title" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" className="not-found-message" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography
        variant="body1"
        className="not-found-description"
        gutterBottom
      >
        The page you are trying to open does not exist. You may have mistyped
        the address, or the page might have been removed, had its name changed,
        or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="not-found-button"
        data-testid="test-404-page-back-btn"
        onClick={handleGoBack}
      >
        Go Back
      </Button>
    </Box>
  );
}
