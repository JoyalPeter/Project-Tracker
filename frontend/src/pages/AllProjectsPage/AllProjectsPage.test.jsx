import { render, screen, waitFor } from "@testing-library/react";
import {
  describe,
  expect,
  test,
  beforeEach,
  vi,
  afterEach,
  afterAll,
  beforeAll,
} from "vitest";
import AllProjectsPage from "./AllProjectsPage";
import makeApiCall from "../../utils/ApiCall";
import { ToasterMessages } from "../../utils/Constants";
import { toast } from "react-toastify";

vi.mock("../../utils/ApiCall");
vi.mock("../../components/Loader/Loader", () => ({
  __esModule: true,
  default: ({ open }) =>
    open ? <div data-testid="loader">Loading...</div> : null,
}));
vi.mock("../../components/NavBar/NavBar", () => ({
  __esModule: true,
  default: () => <nav>NavBar</nav>,
}));
vi.mock("../../components/Projects/ProjectComponent/ProjectComponent", () => ({
  __esModule: true,
  default: ({ projects, heading }) => (
    <div data-testid="projects-component">
      <h2>{heading}</h2>
      {projects.length === 0 ? (
        <p>No projects</p>
      ) : (
        projects.map((project) => (
          <div key={project.projectID}>{project.title}</div>
        ))
      )}
    </div>
  ),
}));

describe("AllProjectsPage", () => {
  const userID = "12345";
  const mockProjects = [
    { projectID: "1", title: "Project 1" },
    { projectID: "2", title: "Project 2" },
  ];

  beforeAll(() => {
    localStorage.setItem("userID", userID);
  });

  afterAll(() => {
    localStorage.removeItem("userID");
  });

  beforeEach(() => {
    toast.error = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the NavBar and loader initially", () => {
    makeApiCall.mockResolvedValue(mockProjects);
    render(<AllProjectsPage />);

    expect(screen.getByText("NavBar")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders the projects after fetching them", async () => {
    makeApiCall.mockResolvedValue(mockProjects);
    render(<AllProjectsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("projects-component")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
  });

  test("displays an error message when the API call fails", async () => {
    makeApiCall.mockRejectedValue(new Error("API call failed"));
    render(<AllProjectsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    expect(toast.error).toHaveBeenCalledWith(
      ToasterMessages.FETCH_PROJECTS_ERROR
    );
    expect(toast.error).toHaveBeenCalledWith("API call failed", { delay: 250 });
    expect(screen.getByText("No projects")).toBeInTheDocument();
  });

  test("renders no projects message when there are no projects", async () => {
    makeApiCall.mockResolvedValue([]);
    render(<AllProjectsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("projects-component")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("No projects")).toBeInTheDocument();
  });
});
