import { describe, expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import EditProject from "./EditProject";
import makeApiCall from "../../../utils/ApiCall";
import { toast } from "react-toastify";

vi.mock("../../../utils/ApiCall");
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("EditProject Component", () => {
  const setup = (props) => {
    const defaultProps = {
      projectID: "1",
      open: true,
      setOpen: vi.fn(),
      currentTitle: "Old Project Title",
      updated: false,
      setUpdated: vi.fn(),
      ...props,
    };
    render(<EditProject {...defaultProps} />);
    return defaultProps;
  };

  test("renders correctly when modal is open", () => {
    setup();

    expect(screen.getByTestId("test-edit-project")).toBeInTheDocument();
    expect(screen.getByText("Enter New Title")).toBeInTheDocument();
    expect(screen.getByTestId("test-edit-project-title")).toBeInTheDocument();
    expect(
      screen.getByTestId("test-edit-project-save-btn")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-edit-project-cancel-btn")
    ).toBeInTheDocument();
  });

  test("handles input field for project title", () => {
    setup();

    const input = screen.getByTestId("test-edit-project-title").querySelector('input');
    fireEvent.change(input, { target: { value: "New Project Title" } });
    expect(input.value).toBe("New Project Title");
  });

  test("handles Save button click event", async () => {
    const defaultProps = setup();
    const response = { projectID: "1" };
    vi.mocked(makeApiCall).mockResolvedValue(response);

    const input = screen.getByTestId("test-edit-project-title").querySelector('input');
    fireEvent.change(input, { target: { value: "New Project Title" } });

    const saveButton = screen.getByTestId("test-edit-project-save-btn");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(makeApiCall).toHaveBeenCalledWith(
        `/projects/${defaultProps.projectID}`,
        "PATCH",
        {
          title: "New Project Title",
        }
      );
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Project updation successful!"
      );
      expect(defaultProps.setUpdated).toHaveBeenCalledWith(
        !defaultProps.updated
      );
      expect(defaultProps.setOpen).toHaveBeenCalledWith(false);
    });
  });

  test("handles Cancel button click event", () => {
    const defaultProps = setup();

    const cancelButton = screen.getByTestId("test-edit-project-cancel-btn");
    fireEvent.click(cancelButton);
    expect(defaultProps.setOpen).toHaveBeenCalledWith(false);
    expect(screen.getByTestId("test-edit-project-title").querySelector('input').value).toBe(
      defaultProps.currentTitle
    );
  });
});
