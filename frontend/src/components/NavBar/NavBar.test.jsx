import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import NavBar from "./NavBar";
import { describe, expect, test } from "vitest";

describe("NavBar Component", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const homeButton = screen.getByTestId("test-navbar-home");
    const logoutButton = screen.getByTestId("test-navbar-logout");

    expect(homeButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(screen.getByText("Take Home Challenge")).toBeInTheDocument();
  });

//   test("navigates to home on home button click", () => {
//     const navigate = vi.fn();
//     vi.mock("react-router-dom", () => ({
//       useNavigate: () => navigate,
//     }));

//     render(
//       <MemoryRouter>
//         <NavBar />
//       </MemoryRouter>
//     );

//     const homeButton = screen.getByTestId("test-navbar-home");
//     fireEvent.click(homeButton);

//     expect(navigate).toHaveBeenCalledWith("/");
//   });

  test("opens Logout dialog on logout button click", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const logoutButton = screen.getByTestId("test-navbar-logout");
    fireEvent.click(logoutButton);

    const logoutDialog = screen.getByTestId("test-logout");
    expect(logoutDialog).toBeInTheDocument();
  });
});
