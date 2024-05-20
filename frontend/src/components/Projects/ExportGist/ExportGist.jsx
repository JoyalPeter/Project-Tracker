import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  ToasterMessages,
  MarkDownSkeleton,
  Status,
} from "../../../utils/Constants";

import Loader from "../../Loader/Loader";

export default function ExportGist({ projectTitle, todos, open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const markdownfileName = `${projectTitle}.md`;

  function generateMarkDownContent() {
    let markDownContent = MarkDownSkeleton;
    markDownContent = markDownContent.replace("projectTitle", projectTitle);

    let completed = 0;
    todos.forEach((todo) => {
      if (todo.status === Status.COMPLETED) {
        completed++;
        const index = markDownContent.indexOf("completedTodos");
        markDownContent =
          markDownContent.slice(0, index) +
          `- [x] ${todo.description}\n` +
          markDownContent.slice(index);
      } else {
        const index = markDownContent.indexOf("pendingTodos");
        markDownContent =
          markDownContent.slice(0, index) +
          `- [ ] ${todo.description}\n` +
          markDownContent.slice(index);
      }
    });
    markDownContent = markDownContent.replace("completedTodos", "");
    markDownContent = markDownContent.replace("pendingTodos", "");
    markDownContent = markDownContent.replace("noOfComplete", `${completed}`);
    markDownContent = markDownContent.replace(
      "totalNoOfTodos",
      `${todos.length}`
    );
    return markDownContent;
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleExportGist() {
    try {
      setLoading(true);
      handleClose();
      const markDownFileContent = generateMarkDownContent();
      await fetch("https://api.github.com/gists", {
        method: "POST",
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: {
            [markdownfileName]: {
              content: markDownFileContent,
            },
          },
          public: false,
        }),
      }).then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `${response.status || "Unknown status"}: ${
              errorData.message || "Unknown error"
            }`
          );
        } else {
          const fileBlob = new Blob([markDownFileContent], {
            type: "text/markdown",
          });
          saveAs(fileBlob, markdownfileName);
          toast.success(ToasterMessages.EXPORT_N_SAVE_SUCCESS);
        }
      });
    } catch (error) {
      console.error("Error exporting gist:\n", error);
      toast.error(ToasterMessages.EXPORT_N_SAVE_ERROR);
      toast.error(error.message, { delay: 250 });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        data-testid="test-export-gist"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Export and save Project?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to export the file as secret gist and save it as
            markdown file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            data-testid="test-export-gist-cancel-btn"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            data-testid="test-export-gist-export-btn"
            onClick={handleExportGist}
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>
      <Loader open={loading} />
    </>
  );
}

ExportGist.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  todos: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
