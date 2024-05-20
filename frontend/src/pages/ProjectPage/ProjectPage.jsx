import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import makeApiCall from "../../utils/ApiCall";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import PublishIcon from "@mui/icons-material/Publish";
import TableContainer from "@mui/material/TableContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api_Methods, ToasterMessages } from "../../utils/Constants";
import "./ProjectPage.css";

import Empty from "../../components/Empty/Empty";
import NavBar from "../../components/NavBar/NavBar";
import Loader from "../../components/Loader/Loader";
import AddTodo from "../../components/Todos/AddTodo/AddTodo";
import ExportGist from "../../components/Projects/ExportGist/ExportGist";
import EditProject from "../../components/Projects/EditProject/EditProject";
import TodoComponent from "../../components/Todos/TodoComponent/TodoComponent";

export default function ProjectPage() {
  const { projectID } = useParams();
  const [todos, setTodos] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updated, setUpdated] = useState(false);
  const [openEditProjectTitle, setOpenEditProjectTitle] = useState(false);
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        await makeApiCall(`/projects/${projectID}`, Api_Methods.GET).then(
          (response) => {
            setProjectTitle(response.title);
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
  }, [updated]);

  return (
    <>
      <NavBar />
      <Card
        variant="outlined"
        data-testid="test-project-page"
        className="project-page-project-card"
      >
        <CardContent className="project-page-project-card-content">
          <Typography
            variant="h1"
            data-testid="test-project-page-title"
            className="project-page-project-card-title"
          >
            {projectTitle}
          </Typography>
          <Typography
            variant="h6"
            data-testid="test-project-page-created-at"
            sx={{ marginBottom: "1%" }}
            className="project-page-project-card-created"
          >
            Created: {createdAt}
          </Typography>

          <Box className="project-page-project-card-buttons">
            <Button
              fullWidth
              variant="outlined"
              data-testid="test-project-page-edit-title-btn"
              startIcon={<EditIcon />}
              onClick={() => setOpenEditProjectTitle(true)}
            >
              Edit Title
            </Button>
            <Button
              fullWidth
              variant="outlined"
              data-testid="test-project-page-add-todo-btn"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setOpenAddTodo(true)}
            >
              Add Todo
            </Button>
            {todos.length === 0 ? null : (
              <Button
                fullWidth
                variant="outlined"
                data-testid="test-project-page-export-btn"
                startIcon={<PublishIcon />}
                onClick={() => {
                  setOpenExport(true);
                }}
              >
                Export Project
              </Button>
            )}
          </Box>

          <Box>
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
                        {todos.map((todo) => (
                          <TodoComponent
                            key={todo.todoID}
                            todo={todo}
                            updated={updated}
                            setUpdated={setUpdated}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            )}
          </Box>
        </CardContent>
      </Card>

      <AddTodo
        open={openAddTodo}
        setOpen={setOpenAddTodo}
        projectID={projectID}
        updated={updated}
        setUpdated={setUpdated}
      />
      <EditProject
        open={openEditProjectTitle}
        setOpen={setOpenEditProjectTitle}
        projectID={projectID}
        currentTitle={projectTitle}
        updated={updated}
        setUpdated={setUpdated}
      />
      <ExportGist
        projectTitle={projectTitle}
        todos={todos}
        open={openExport}
        setOpen={setOpenExport}
      />
      <Loader open={loading} />
    </>
  );
}
