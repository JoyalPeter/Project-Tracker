import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import "./Empty.css";

export default function Empty({ message }) {
  return (
    <Box
      className="empty-message-container"
      data-testid="test-empty-message-container"
    >
      <InfoIcon
        sx={{ fontSize: "4rem", color: "grey.500", marginBottom: "1rem" }}
        data-testid="test-empty-message-icon"
      />
      <Typography
        variant="h4"
        className="empty-message-text"
        data-testid="test-empty-message-text"
      >
        {message}
      </Typography>
    </Box>
  );
}

Empty.propTypes = { message: PropTypes.string.isRequired };
