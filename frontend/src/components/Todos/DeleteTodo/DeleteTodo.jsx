import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import makeApiCall from "../../../utils/ApiCall";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { toast } from "react-toastify";
import { Api_Methods, ToasterMessages } from "../../../utils/Constants";
import "./DeleteTodo.css";

import Loader from "../../Loader/Loader";

export default function DeleteTodo({
  todoID,
  open,
  setOpen,
  updated,
  setUpdated,
}) {
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  async function handleDelete() {
    try {
      setLoading(true);
      handleClose();
      await makeApiCall(`/todos/${todoID}`, Api_Methods.DELETE).then((_) => {
        toast.success(ToasterMessages.DELETE_TODO_SUCCESS);
        setUpdated(!updated);
      });
    } catch (error) {
      console.error("The following error occured:\n", error);
      toast.error(ToasterMessages.DELETE_TODO_ERROR);
      toast.error(error.message, { delay: 250 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} data-testid="test-delete-todo">
        <Box
          className="delete-todo-modal"
          sx={{ backgroundColor: "background.paper" }}
        >
          <Typography
            className="delete-todo-modal-title"
            variant="h6"
            component="h2"
          >
            Do you want to delete this todo?
          </Typography>
          <Box className="delete-todo-modal-buttons">
            <Button
              variant="contained"
              color="error"
              data-testid="test-delete-todo-confirm-btn"
              onClick={handleDelete}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              data-testid="test-delete-todo-cancel-btn"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Loader open={loading} />
    </>
  );
}

DeleteTodo.propTypes = {
  todoID: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,
  setUpdated: PropTypes.func.isRequired,
};
