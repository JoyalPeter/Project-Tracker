import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import PropTypes from "prop-types";

export default function Logout({ open, setOpen }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      data-testid="test-logout"
    >
      <DialogTitle
        id="alert-dialog-title"
        fontWeight="bold"
        sx={{ textAlign: "center" }}
      >
        Confirm logout?
      </DialogTitle>
      <DialogContent sx={{ padding: "1rem", textAlign: "center" }}>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="outlined" onClick={handleClose} data-testid="test-logout-cancel">
          Cancel
        </Button>
        <Button
          autoFocus
          variant="outlined"
          data-testid="test-logout-confirm"
          onClick={handleLogout}
          sx={{ marginLeft: "1rem" }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Logout.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
