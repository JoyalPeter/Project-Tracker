import {
  Button,
  FormControl,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import makeApiCall from "../../../utils/ApiCall";
import { Api_Methods, Status } from "../../../utils/Constants";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { ToasterMessages } from "../../../utils/Constants";
import "./AddTodo.css";
import PropTypes from "prop-types";

export default function AddTodo({
  projectID,
  open,
  setOpen,
  updated,
  setUpdated,
}) {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(Status.PENDING);
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setOpen(false);
    setDescription("");
    setStatus(Status.PENDING);
  }

  async function handleCreate() {
    try {
      setLoading(true);
      handleClose();
      await makeApiCall("/todos", Api_Methods.POST, {
        projectID,
        description,
        status,
      }).then((_) => {
        setUpdated(!updated);
        toast.success(ToasterMessages.CREATE_TODO_SUCCESS);
      });
    } catch (error) {
      console.error("The following error occured:\n", error);
      toast.error(ToasterMessages.CREATE_TODO_ERROR);
      toast.error(error.message, { delay: 250 });
    } finally {
      setLoading(false);
      setDescription("");
      setStatus(Status.PENDING);
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} data-testid="test-add-todo">
        <Box className="add-todo-modal">
          <Typography
            className="add-todo-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "1rem" }}
          >
            Enter Todo Description
          </Typography>
          <Box className="add-todo-modal-content">
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              data-testid="test-add-todo-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Typography
              variant="h6"
              component="h2"
              className="add-todo-modal-status"
            >
              Select Status
            </Typography>
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                data-testid="test-add-todo-status"
                defaultValue={Status.PENDING}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={Status.PENDING}>Pending</MenuItem>
                <MenuItem value={Status.COMPLETED}>Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="add-todo-modal-buttons">
            <Button
              variant="contained"
              data-testid="test-add-todo-create-btn"
              disabled={description === ""}
              onClick={handleCreate}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              data-testid="test-add-todo-cancel-btn"
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

AddTodo.propTypes = {
  projectID: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  updated: PropTypes.bool.isRequired,
  setUpdated: PropTypes.func.isRequired,
};