import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import makeApiCall from "../../../utils/ApiCall";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Api_Methods, ToasterMessages } from "../../../utils/Constants";
import "./CreateProject.css";

import Loader from "../../Loader/Loader";

export default function CreateProject({ open, setOpen }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  async function handleCreate() {
    try {
      setLoading(true);
      handleClose();
      const userID = localStorage.getItem("userID");
      await makeApiCall("/projects", Api_Methods.POST, {
        title,
        userID,
      }).then((response) => {
        toast.success(ToasterMessages.CREATE_PROJECT_SUCCESS);
        navigate(`/projects/${response.projectID}`);
      });
    } catch (error) {
      console.error("The following error occured:\n", error);
      toast.error(ToasterMessages.CREATE_PROJECT_ERROR);
      toast.error(error.message, { delay: 250 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        data-testid="test-create-project"
      >
        <Box className="create-project-modal">
          <Typography variant="h6" component="h2" align="center">
            Enter Project Title
          </Typography>
          <TextField
            fullWidth
            data-testid="test-create-project-title"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Box className="create-project-modal-buttons">
            <Button
              variant="contained"
              data-testid="test-create-project-create-btn"
              disabled={title === ""}
              onClick={handleCreate}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              data-testid="test-create-project-cancel-btn"
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

CreateProject.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
