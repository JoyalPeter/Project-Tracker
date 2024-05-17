import { describe, expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { toast } from "react-toastify";
import CreateProject from "./CreateProject";
import makeApiCall from "../../../utils/ApiCall";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("../../../utils/ApiCall");
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("CreateProject Component", () => {
  const setup = (open = true) => {
    const setOpen = vi.fn();
    render(
      <BrowserRouter>
        <CreateProject open={open} setOpen={setOpen} />
      </BrowserRouter>
    );
    return { setOpen };
  };

  test("renders correctly when modal is open", () => {
    setup();

    expect(screen.getByTestId("test-create-project")).toBeInTheDocument();
    expect(screen.getByText("Enter Project Title")).toBeInTheDocument();
    expect(screen.getByTestId("test-create-project-title")).toBeInTheDocument();
    expect(
      screen.getByTestId("test-create-project-create-btn")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-create-project-cancel-btn")
    ).toBeInTheDocument();
  });

  test("handles input field for project title", () => {
    setup();

    const input = screen.getByTestId("test-create-project-title").querySelector('input');
    fireEvent.change(input, { target: { value: "New Project" } });
    expect(input.value).toBe("New Project");
  });

  test("handles Create button click event", async () => {
    const { setOpen } = setup();
    // const mockNavigate = vi.fn();
    const response = { projectID: "123" };
    // vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(makeApiCall).mockResolvedValue(response);

    const input = screen.getByTestId("test-create-project-title").querySelector('input');
    fireEvent.change(input, { target: { value: "New Project" } });

    const createButton = screen.getByTestId("test-create-project-create-btn");
    fireEvent.click(createButton);

    await waitFor(() =>
      expect(makeApiCall).toHaveBeenCalledWith("/projects", "POST", {
        title: "New Project",
        userID: localStorage.getItem("userID"),
      })
    );

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Project creation successful!"
      );
      // expect(mockNavigate).toHaveBeenCalledWith("/projects/123");
    });

    expect(setOpen).toHaveBeenCalledWith(false);
  });

  test("handles Cancel button click event", () => {
    const { setOpen } = setup();

    const cancelButton = screen.getByTestId("test-create-project-cancel-btn");
    fireEvent.click(cancelButton);

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
