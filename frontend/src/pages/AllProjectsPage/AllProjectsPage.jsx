import makeApiCall from "../../utils/ApiCall";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Api_Methods, ToasterMessages } from "../../utils/Constants";

import NavBar from "../../components/NavBar/NavBar";
import Loader from "../../components/Loader/Loader";
import ProjectComponent from "../../components/Projects/ProjectComponent/ProjectComponent";

export default function AllProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const path = `/projects/${userID}/all`;
        await makeApiCall(path, Api_Methods.GET).then((response) => {
          setProjects(response);
        });
      } catch (error) {
        console.error("The following error occured:\n", error);
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
      <NavBar />
      <Loader open={loading} />
      {!loading && <ProjectComponent projects={projects} heading="Projects" />}
    </>
  );
}
