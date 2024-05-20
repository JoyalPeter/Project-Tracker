import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader({ open }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      data-testid="test-loader-backdrop"
    >
      <CircularProgress color="inherit" data-testid="test-loader-progress" />
    </Backdrop>
  );
}

Loader.propTypes = { open: PropTypes.bool.isRequired };
