import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toaster from "./components/Toaster/Toaster";
import PrivateRoutes from "./utils/PrivateRoutes";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import AllProjectsPage from "./pages/AllProjectsPage/AllProjectsPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" Component={SignIn} />
            <Route path="/signup" Component={SignUp} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" Component={HomePage} />
              <Route path="/projects/all" Component={AllProjectsPage} />
              <Route path="/projects/:projectID" Component={ProjectPage} />
              <Route path="/projects/search" Component={SearchPage} />
            </Route>
            <Route path="*" Component={NotFoundPage} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
