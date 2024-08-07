import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Status } from "../../../utils/Constants";
import Button from "@mui/material/Button";
import makeApiCall from "../../../utils/ApiCall";
import { Api_Methods, ToasterMessages } from "../../../utils/Constants";
import { toast } from "react-toastify";

import EditTodo from "../EditTodo/EditTodo";
import DeleteTodo from "../DeleteTodo/DeleteTodo";

export default function TodoComponent({ todo, updated, setUpdated }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const createdAtDate = new Date(todo.createdDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedAtDate = new Date(todo.updatedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function handleRestore() {
    try {
      setLoading(true);
      await makeApiCall(`/todos/${todo.todoID}`, Api_Methods.PATCH, {
        deleted: false,
      }).then((_) => {
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

  

  async function clearFromRecycleBin() {
    try {
      setLoading(true);
      await makeApiCall(`/todos/${todo.todoID}`, Api_Methods.DELETE).then((_) => {
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
      <TableRow
        hover
        data-testid="test-todo-component-row"
        key={todo.todoID}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Typography
            data-testid="test-todo-component-row-description"
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {todo.description}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography
            data-testid="test-todo-component-row-status"
            color={todo.status === Status.COMPLETED ? "green" : "red"}
          >
            {todo.status}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography data-testid="test-todo-component-row-created-date">
            {createdAtDate}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography data-testid="test-todo-component-row-updated-date">
            {updatedAtDate}
          </Typography>
        </TableCell>
        <TableCell align="center">
          {todo.deleted === false ? (
            <>
              <Box sx={{ gap: "1%" }}>
                <Tooltip title="Edit">
                  <IconButton
                    color="inherit"
                    data-testid="test-todo-component-row-edit-btn"
                    onClick={() => {
                      setOpenEditModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="inherit"
                    data-testid="test-todo-component-row-delete-btn"
                    onClick={() => {
                      setOpenDeleteModal(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : (
            <>
              <Button onClick={handleRestore}>Restore</Button>
              <Button onClick={clearFromRecycleBin}>
                Clear from Recycle Bin
              </Button>
            </>
          )}
          <EditTodo
            open={openEditModal}
            setOpen={setOpenEditModal}
            currentDescription={todo.description}
            currentStatus={todo.status}
            todoID={todo.todoID}
            updated={updated}
            setUpdated={setUpdated}
          />
          <DeleteTodo
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            updated={updated}
            setUpdated={setUpdated}
            todoID={todo.todoID}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

TodoComponent.propTypes = {
  todo: PropTypes.object.isRequired,
  updated: PropTypes.bool.isRequired,
  setUpdated: PropTypes.func.isRequired,
};
