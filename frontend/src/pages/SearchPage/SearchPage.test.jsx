import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchPage from "./SearchPage";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { toast } from "react-toastify";
import makeApiCall from "../../utils/ApiCall";
import { ToasterMessages } from "../../utils/Constants";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("../../utils/ApiCall");

vi.mock("../../components/NavBar/NavBar", () => ({
  __esModule: true,
  default: () => <div>NavBar</div>,
}));

vi.mock("../../components/Projects/ProjectComponent/ProjectComponent", () => ({
  __esModule: true,
  default: ({ projects, heading }) => (
    <div>
      {heading}
      {projects.map((project) => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  ),
}));

vi.mock("../../components/Loader/Loader", () => ({
  __esModule: true,
  default: ({ open }) => (open ? <div>Loading...</div> : null),
}));

vi.mock("../../components/Empty/Empty", () => ({
  __esModule: true,
  default: ({ message }) => <div>{message}</div>,
}));

describe("SearchPage", () => {
  beforeEach(() => {
    makeApiCall.mockClear();
    toast.error.mockClear();
    localStorage.setItem("userID", "test-user-id");
  });

  test("renders the search bar and search button", () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );

    expect(
      screen.getByTestId("test-search-page-search-bar")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-search-page-search-btn")
    ).toBeInTheDocument();
  });

  test("disables search button when search key is empty", () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );

    expect(screen.getByTestId("test-search-page-search-btn")).toBeDisabled();
  });

  test("enables search button when search key is not empty", () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );

    const searchBar = screen.getByTestId("test-search-page-search-bar").querySelector('input');
    const searchButton = screen.getByTestId("test-search-page-search-btn");

    fireEvent.change(searchBar, { target: { value: "Test Project" } });
    expect(searchButton).not.toBeDisabled();
  });

  test("displays results when search is successful", async () => {
    const mockProjects = [
      { id: "1", title: "Test Project 1" },
      { id: "2", title: "Test Project 2" },
    ];
    makeApiCall.mockResolvedValueOnce(mockProjects);

    render(
      <Router>
        <SearchPage />
      </Router>
    );

    const searchBar = screen
      .getByTestId("test-search-page-search-bar")
      .querySelector("input");
    const searchButton = screen.getByTestId("test-search-page-search-btn");

    fireEvent.change(searchBar, { target: { value: "Test Project" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("Results")).toBeInTheDocument();
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.getByText("Test Project 2")).toBeInTheDocument();
    });
  });

  test("displays 'No results found' when search returns empty", async () => {
    makeApiCall.mockResolvedValueOnce([]);

    render(
      <Router>
        <SearchPage />
      </Router>
    );

    const searchBar = screen
      .getByTestId("test-search-page-search-bar")
      .querySelector("input");
    const searchButton = screen.getByTestId("test-search-page-search-btn");

    fireEvent.change(searchBar, { target: { value: "Nonexistent Project" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("No results found !")).toBeInTheDocument();
    });
  });

  test("handles search error correctly", async () => {
    const errorMessage = "Error searching projects";
    makeApiCall.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <Router>
        <SearchPage />
      </Router>
    );

    const searchBar = screen
      .getByTestId("test-search-page-search-bar")
      .querySelector("input");
    const searchButton = screen.getByTestId("test-search-page-search-btn");

    fireEvent.change(searchBar, { target: { value: "Error Project" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        ToasterMessages.SEARCH_PROJECTS_ERROR
      );
      expect(toast.error).toHaveBeenCalledWith(errorMessage, { delay: 250 });
    });
  });

  test("shows loading indicator while searching", async () => {
    makeApiCall.mockImplementation(() => new Promise(() => {}));

    render(
      <Router>
        <SearchPage />
      </Router>
    );

    const searchBar = screen
      .getByTestId("test-search-page-search-bar")
      .querySelector("input");
    const searchButton = screen.getByTestId("test-search-page-search-btn");

    fireEvent.change(searchBar, { target: { value: "Loading Project" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });
});
