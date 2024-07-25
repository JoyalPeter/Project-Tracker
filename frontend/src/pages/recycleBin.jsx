import PropTypes from "prop-types";
import { useEffect, useState, useParams } from "react";
import makeApiCall from "../../utils/ApiCall";
import { Api_Methods, ToasterMessages } from "../../utils/Constants";
import { toast } from "react-toastify";
import Empty from "../../components/Empty/Empty";
import TodoComponent from "../../components/Todos/TodoComponent/TodoComponent";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function RecycleBin({ updated, setUpdated }) {
  const { projectID } = useParams();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        await makeApiCall(`/projects/${projectID}`, Api_Methods.GET).then(
          (response) => {
            setTodos(response.todos);
            const createdAtDate = new Date(response.createdDate);
            setCreatedAt(
              createdAtDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            );
          }
        );
      } catch (error) {
        console.error("The following error occurred :\n", error);
        toast.error(ToasterMessages.FETCH_PROJECTS_ERROR);
        toast.error(error.message, { delay: 250 });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {!loading && (
        <>
          {todos.length == 0 ? (
            <Empty
              message={
                "No todos to display. Add todos using the 'Add todo' button."
              }
            />
          ) : (
            <TableContainer
              data-testid="test-project-page-todos-table"
              component={Paper}
            >
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan="5">
                      <Typography
                        variant="h4"
                        data-testid="test-project-page-todos-table-todo-count"
                        className="todos"
                      >
                        Todos: {todos.length}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Created On
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Last Updated
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todos.map((todo) => {
                    if (todo.deleted === true) {
                      return (
                        <TodoComponent
                          key={todo.todoID}
                          todo={todo}
                          updated={updated}
                          setUpdated={setUpdated}
                        />
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
}
RecycleBin.propTypes = {
  updated: PropTypes.bool.isRequired,
  setUpdated: PropTypes.func.isRequired,
};