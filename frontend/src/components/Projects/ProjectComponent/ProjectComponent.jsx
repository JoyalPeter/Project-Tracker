import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

import Empty from "../../Empty/Empty";

export default function ProjectComponent({ projects, heading }) {
  const navigate = useNavigate();

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      {projects.length === 0 ? (
        <Empty
          message={
            "No projects to display. Add projects using the 'create project' button in the home page"
          }
        />
      ) : (
        <TableContainer component={Paper} data-testid="test-projects-table">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan="5">
                  <Typography variant="h4">
                    {heading}: {projects.length}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Created On
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Todos
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow
                  hover
                  key={project.projectID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography
                      sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {project.title}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>{formatDate(project.createdDate)}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>{project.todos.length}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>
                      <Button
                        data-testid="test-projects-table-view-btn"
                        startIcon={<VisibilityIcon />}
                        onClick={() =>
                          navigate(`/projects/${project.projectID}`)
                        }
                      >
                        View
                      </Button>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

ProjectComponent.propTypes = {
  projects: PropTypes.array.isRequired,
  heading: PropTypes.string.isRequired,
};
