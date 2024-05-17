import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ProjectPage from "./ProjectPage";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { toast } from "react-toastify";
import makeApiCall from "../../utils/ApiCall";
import { ToasterMessages } from "../../utils/Constants";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("../../utils/ApiCall")

vi.mock("../../components/NavBar/NavBar", () => ({
  __esModule: true,
  default: () => <div>NavBar</div>,
}));

vi.mock("../../components/Todos/AddTodo/AddTodo", () => ({
  __esModule: true,
  default: ({ open }) => (open ? <div>AddTodo Modal</div> : null),
}));

vi.mock("../../components/Projects/EditProject/EditProject", () => ({
  __esModule: true,
  default: ({ open }) => (open ? <div>EditProject Modal</div> : null),
}));

vi.mock("../../components/Projects/ExportGist/ExportGist", () => ({
  __esModule: true,
  default: ({ open }) => (open ? <div>ExportGist Modal</div> : null),
}));

vi.mock("../../components/Loader/Loader", () => ({
  __esModule: true,
  default: ({ open }) => (open ? <div>Loading...</div> : null),
}));

describe("ProjectPage", () => {
  const mockTodos = [
    {
      todoID: "1",
      description: "Test Todo 1",
      status: "Pending",
      createdDate: "2023-01-01T00:00:00Z",
      updatedDate: "2023-01-01T00:00:00Z",
    },
    {
      todoID: "2",
      description: "Test Todo 2",
      status: "Completed",
      createdDate: "2023-01-02T00:00:00Z",
      updatedDate: "2023-01-02T00:00:00Z",
    },
  ];

  beforeEach(() => {
    makeApiCall.mockClear();
    toast.error.mockClear();
  });

  test("renders project data and todos correctly", async () => {
    makeApiCall.mockResolvedValueOnce({
      title: "Test Project",
      createdDate: "2023-01-01T00:00:00Z",
      todos: mockTodos,
    });

    render(
      <Router>
        <ProjectPage />
      </Router>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Project")).toBeInTheDocument();
      expect(screen.getByText("Created: January 1, 2023")).toBeInTheDocument();
      expect(screen.getByText("Todos: 2")).toBeInTheDocument();
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    });
  });

  test("handles error during data fetching", async () => {
    const errorMessage = "Error fetching project data";
    makeApiCall.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <Router>
        <ProjectPage />
      </Router>
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        ToasterMessages.FETCH_PROJECTS_ERROR
      );
      expect(toast.error).toHaveBeenCalledWith(errorMessage, { delay: 250 });
    });
  });

  test("opens EditProject modal when 'Edit Title' button is clicked", async () => {
    makeApiCall.mockResolvedValueOnce({
      title: "Test Project",
      createdDate: "2023-01-01T00:00:00Z",
      todos: mockTodos,
    });

    render(
      <Router>
        <ProjectPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("test-project-page-edit-title-btn"));
    expect(screen.getByText("EditProject Modal")).toBeInTheDocument();
  });

  test("opens AddTodo modal when 'Add Todo' button is clicked", async () => {
    makeApiCall.mockResolvedValueOnce({
      title: "Test Project",
      createdDate: "2023-01-01T00:00:00Z",
      todos: mockTodos,
    });

    render(
      <Router>
        <ProjectPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("test-project-page-add-todo-btn"));
    expect(screen.getByText("AddTodo Modal")).toBeInTheDocument();
  });

  test("opens ExportGist modal when 'Export Project' button is clicked", async () => {
    makeApiCall.mockResolvedValueOnce({
      title: "Test Project",
      createdDate: "2023-01-01T00:00:00Z",
      todos: mockTodos,
    });

    render(
      <Router>
        <ProjectPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("test-project-page-export-btn"));
    expect(screen.getByText("ExportGist Modal")).toBeInTheDocument();
  });

  test("renders Empty component when no todos are present", async () => {
    makeApiCall.mockResolvedValueOnce({
      title: "Test Project",
      createdDate: "2023-01-01T00:00:00Z",
      todos: [],
    });

    render(
      <Router>
        <ProjectPage />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "No todos to display. Add todos using the 'Add todo' button."
        )
      ).toBeInTheDocument();
    });
  });
});
