import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css'

import NavBar from "../../components/NavBar/NavBar";
import CreateProject from "../../components/Projects/CreateProject/CreateProject";

export default function HomePage() {
  const [open,setOpen]=useState(false)
  const navigate=useNavigate()
  
  return (
    <>
      <NavBar />
      <div className="menu">
        <Paper
          elevation={3}
          className="menuItem"
          data-testid="test-home-page-create-project"
          onClick={() => setOpen(true)}
        >
          <Typography variant="h4">Create Project</Typography>
        </Paper>
        <Paper
          elevation={3}
          className="menuItem"
          data-testid="test-home-page-view-all-project"
          onClick={() => navigate("/projects/all")}
        >
          <Typography variant="h4">View All Projects</Typography>
        </Paper>
        <Paper
          elevation={3}
          className="menuItem"
          data-testid="test-home-page-view-a-project"
          onClick={() => navigate("/projects/search")}
        >
          <Typography variant="h4">View a Project</Typography>
        </Paper>
      </div>

      <CreateProject open={open} setOpen={setOpen} />
    </>
  );
}
