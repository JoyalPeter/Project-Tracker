import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import EditTodo from "../EditTodo/EditTodo";
import DeleteTodo from "../DeleteTodo/DeleteTodo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Status } from "../../../utils/Constants";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";

export default function TodoComponent({ todo, updated, setUpdated }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
          <Box sx={{ gap: "1%" }}>
            <IconButton
              data-testid="test-todo-component-row-edit-btn"
              onClick={() => {
                setOpenEditModal(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              data-testid="test-todo-component-row-delete-btn"
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
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
