import { Suspense, lazy } from "react";
import Loader from "./components/Loader/Loader";
import PrivateRoutes from "./utils/PrivateRoutes";
import Toaster from "./components/Toaster/Toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage/SearchPage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage/ProjectPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const AllProjectsPage = lazy(() =>
  import("./pages/AllProjectsPage/AllProjectsPage")
);

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={<Loader open={true}/>}>
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
          </Suspense>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
