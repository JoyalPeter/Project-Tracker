import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import makeApiCall from "../../../utils/ApiCall";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToasterMessages } from "../../../utils/Constants";
import { Api_Methods, Status } from "../../../utils/Constants";
import "./EditTodo.css";

import Loader from "../../Loader/Loader";

export default function EditTodo({
  todoID,
  currentDescription,
  currentStatus,
  open,
  setOpen,
  setUpdated,
  updated,
}) {
  const [description, setDescription] = useState(currentDescription);
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  async function handleEdit() {
    try {
      setLoading(true);
      handleClose();
      await makeApiCall(`/todos/${todoID}`, Api_Methods.PATCH, {
        description,
        status,
      }).then((_) => {
        toast.success(ToasterMessages.UPDATE_TODO_SUCCESS);
        setUpdated(!updated);
      });
    } catch (error) {
      console.error("The following error occured:\n", error);
      toast.error(ToasterMessages.UPDATE_TODO_ERROR);
      toast.error(error.message, { delay: 250 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} data-testid="test-edit-todo">
        <Box className="edit-todo-modal" sx={{ marginBottom: "1rem" }}>
          <Typography
            variant="h6"
            component="h2"
            className="edit-todo-modal-title"
            sx={{ marginBottom: "1rem" }}
          >
            Enter Todo Description
          </Typography>
          <Box className="edit-todo-modal-content">
            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              data-testid="test-edit-todo-description"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Typography
              variant="h6"
              component="h2"
              className="edit-todo-modal-status"
            >
              Select Status
            </Typography>
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={status}
                data-testid="test-edit-todo-status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={Status.PENDING}>Pending</MenuItem>
                <MenuItem value={Status.COMPLETED}>Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="edit-todo-modal-buttons">
            <Button
              variant="contained"
              data-testid="test-edit-todo-update-btn"
              disabled={
                description === "" ||
                (description === currentDescription && status === currentStatus)
              }
              onClick={handleEdit}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              data-testid="test-edit-todo-cancel-btn"
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

EditTodo.propTypes = {
  todoID: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,
  setUpdated: PropTypes.func.isRequired,
  currentDescription: PropTypes.string.isRequired,
  currentStatus: PropTypes.string.isRequired,
};
