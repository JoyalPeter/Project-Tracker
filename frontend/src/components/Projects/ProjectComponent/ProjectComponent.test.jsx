import { describe, expect, test, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ProjectComponent from "./ProjectComponent";

// vi.mock("react-router-dom", () => ({
//   ...vi.importActual("react-router-dom"),
//   useNavigate: () => vi.fn(),   
// }));

describe("ProjectComponent", () => {
  const mockProjects = [
    {
      projectID: "1",
      title: "Project 1",
      createdDate: "2023-05-10T10:00:00Z",
      todos: [{}, {}, {}],
    },
    {
      projectID: "2",
      title: "Project 2",
      createdDate: "2023-05-11T10:00:00Z",
      todos: [{}, {}],
    },
  ];

  // const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // vi.mocked(useNavigate).mockImplementation(() => mockNavigate);
  });

  test("renders the table with projects", () => {
    render(
      <MemoryRouter>
        <ProjectComponent projects={mockProjects} heading="Projects" />
      </MemoryRouter>
    );

    expect(screen.getByTestId("test-projects-table")).toBeInTheDocument();
    expect(screen.getByText("Projects: 2")).toBeInTheDocument();
    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
    expect(screen.getByText("May 10, 2023")).toBeInTheDocument();
    expect(screen.getByText("May 11, 2023")).toBeInTheDocument();
    expect(screen.getAllByText("View").length).toBe(2);
  });

  test("renders empty message when no projects", () => {
    render(
      <MemoryRouter>
        <ProjectComponent projects={[]} heading="Projects" />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        "No projects to display. Add projects using the 'create project' button in the home page"
      )
    ).toBeInTheDocument();
  });

  // test("handles view button click", () => {
  //   render(
  //     <MemoryRouter>
  //       <ProjectComponent projects={mockProjects} heading="Projects" />
  //     </MemoryRouter>
  //   );

  //   const viewButtons = screen.getAllByTestId("test-projects-table-view-btn");
  //   fireEvent.click(viewButtons[0]);

  //   expect(mockNavigate).toHaveBeenCalledWith("/projects/1");
  // });
});
