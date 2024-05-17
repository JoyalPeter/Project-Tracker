import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Logout from "./Logout";
import { describe, expect, test } from "vitest";

describe("Logout Component", () => {
  test("renders correctly when open", () => {
    render(
      <MemoryRouter>
        <Logout open={true} setOpen={vi.fn()} />
      </MemoryRouter>
    );

    const dialog = screen.getByTestId("test-logout");
    const cancelButton = screen.getByTestId("test-logout-cancel");
    const confirmButton = screen.getByTestId("test-logout-confirm");

    expect(dialog).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  });

  test("calls handleClose when cancel button is clicked", () => {
    const setOpen = vi.fn();
    render(
      <MemoryRouter>
        <Logout open={true} setOpen={setOpen} />
      </MemoryRouter>
    );

    const cancelButton = screen.getByTestId("test-logout-cancel");
    fireEvent.click(cancelButton);

    expect(setOpen).toHaveBeenCalledWith(false);
  });

  // test("calls handleLogout when confirm button is clicked", () => {
  //   const setOpen = vi.fn();
  //   // const navigate = vi.fn();
  //   // vi.mock("react-router-dom", () => ({
  //   //   useNavigate: () => navigate,
  //   // }));

  //   render(
  //     <MemoryRouter>
  //       <Logout open={true} setOpen={setOpen} />
  //     </MemoryRouter>
  //   );

  //   const confirmButton = screen.getByTestId("test-logout-confirm");
  //   fireEvent.click(confirmButton);

  //   expect(localStorage.clear).toHaveBeenCalled();
  //   // expect(navigate).toHaveBeenCalledWith("/signin");
  // });
});
