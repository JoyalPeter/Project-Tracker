import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import HomePage from "./HomePage";

vi.mock("../../components/NavBar/NavBar", () => ({
  __esModule: true,
  default: () => <nav>NavBar</nav>,
}));

vi.mock("../../components/Projects/CreateProject/CreateProject", () => ({
  __esModule: true,
  default: ({ open }) =>
    open ? (
      <div data-testid="test-create-project-modal">Create Project Modal</div>
    ) : null,
}));

describe("HomePage", () => {
  test("renders NavBar and menu items", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText("NavBar")).toBeInTheDocument();
    expect(
      screen.getByTestId("test-home-page-create-project")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-home-page-view-all-project")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-home-page-view-a-project")
    ).toBeInTheDocument();
  });

  test("opens CreateProject modal on 'Create Project' click", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    const createProjectButton = screen.getByTestId(
      "test-home-page-create-project"
    );
    fireEvent.click(createProjectButton);

    expect(screen.getByTestId("test-create-project-modal")).toBeInTheDocument();
  });

  //   test("navigates to /projects/all on 'View All Projects' click", () => {
  //     const mockNavigate = vi.fn();
  //     vi.mock("react-router-dom", async () => {
  //       const original = await vi.importActual("react-router-dom");
  //       return {
  //         ...original,
  //         useNavigate: () => mockNavigate,
  //       };
  //     });

  //     render(
  //       <Router>
  //         <HomePage />
  //       </Router>
  //     );

  //     const viewAllProjectsButton = screen.getByTestId(
  //       "test-home-page-view-all-project"
  //     );
  //     fireEvent.click(viewAllProjectsButton);

  //     expect(mockNavigate).toHaveBeenCalledWith("/projects/all");
  //   });

  //   test("navigates to /projects/search on 'View a Project' click", () => {
  //     const mockNavigate = vi.fn();
  //     vi.mock("react-router-dom", async () => {
  //       const original = await vi.importActual("react-router-dom");
  //       return {
  //         ...original,
  //         useNavigate: () => mockNavigate,
  //       };
  //     });

  //     render(
  //       <Router>
  //         <HomePage />
  //       </Router>
  //     );

  //     const viewAProjectButton = screen.getByTestId(
  //       "test-home-page-view-a-project"
  //     );
  //     fireEvent.click(viewAProjectButton);

  //     expect(mockNavigate).toHaveBeenCalledWith("/projects/search");
  //   });
});
