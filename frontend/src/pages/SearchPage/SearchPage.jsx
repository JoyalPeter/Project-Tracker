import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import makeApiCall from "../../utils/ApiCall";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { toast } from "react-toastify";
import { Api_Methods, ToasterMessages } from "../../utils/Constants";
import "./SearchPage.css";

import Empty from "../../components/Empty/Empty";
import NavBar from "../../components/NavBar/NavBar";
import Loader from "../../components/Loader/Loader";
import ProjectComponent from "../../components/Projects/ProjectComponent/ProjectComponent";

export default function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searched, setSearched] = useState(false);
  const [projects, setProjects] = useState([]);

  async function handleSearch() {
    try {
      setLoading(true);
      const userID = localStorage.getItem("userID");
      await makeApiCall(
        `/projects/search?key=${searchKey}&userID=${userID}`,
        Api_Methods.GET
      ).then((response) => {
        setProjects(response);
      });
    } catch (error) {
      console.error("The following error occured:\n", error);
      toast.error(ToasterMessages.SEARCH_PROJECTS_ERROR);
      toast.error(error.message, { delay: 250 });
    } finally {
      setLoading(false);
      setSearchKey("");
      setSearched(true);
    }
  }

  return (
    <>
      <NavBar />
      <Box className="search-page-container">
        <TextField
          fullWidth
          variant="outlined"
          label="Enter project title"
          className="search-page-search-bar"
          data-testid="test-search-page-search-bar"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Button
          variant="outlined"
          className="search-page-search-button"
          data-testid="test-search-page-search-btn"
          disabled={searchKey === ""}
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      {!loading &&
        (projects.length === 0 ? (
          searched && <Empty message={"No results found !"} />
        ) : (
          <ProjectComponent projects={projects} heading="Results" />
        ))}
      <Loader open={loading} />
    </>
  );
}
