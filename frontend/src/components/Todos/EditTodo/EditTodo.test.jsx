import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditTodo from "./EditTodo";
import makeApiCall from "../../../utils/ApiCall";
import { toast } from "react-toastify";
import { describe, expect, test, beforeEach, vi } from "vitest";

vi.mock("../../../utils/ApiCall");
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("EditTodo Component", () => {
  const setup = (propsOverrides = {}) => {
    const setOpen = vi.fn();
    const setUpdated = vi.fn();
    const props = {
      todoID: "12345",
      open: true,
      setOpen,
      updated: false,
      setUpdated,
      currentDescription: "Test Todo",
      currentStatus: "Pending",
      ...propsOverrides,
    };

    return {
      setOpen,
      setUpdated,
      ...render(<EditTodo {...props} />),
    };
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("renders the EditTodo modal", () => {
    setup();
    expect(screen.getByTestId("test-edit-todo")).toBeInTheDocument();
    expect(screen.getByText(/Enter Todo Description/i)).toBeInTheDocument();
    expect(screen.getByTestId("test-edit-todo-description").querySelector('input')).toHaveValue(
      "Test Todo"
    );
    expect(screen.getByTestId("test-edit-todo-status")).toBeInTheDocument();
    expect(screen.getByTestId("test-edit-todo-update-btn")).toBeInTheDocument();
    expect(screen.getByTestId("test-edit-todo-cancel-btn")).toBeInTheDocument();
  });

  test("calls handleEdit and makes API call on update button click", async () => {
    makeApiCall.mockResolvedValue({});

    const { setUpdated } = setup();
    fireEvent.change(
      screen.getByTestId("test-edit-todo-description").querySelector("input"),
      {
        target: { value: "Updated Todo" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-edit-todo-status").querySelector("input"),
      {
        target: { value: "Completed" },
      }
    );
    fireEvent.click(screen.getByTestId("test-edit-todo-update-btn"));

    await waitFor(() => {
      expect(makeApiCall).toHaveBeenCalledWith("/todos/12345", "PATCH", {
        description: "Updated Todo",
        status: "Completed",
      });
      expect(toast.success).toHaveBeenCalledWith("Todo updation successful!");
      expect(setUpdated).toHaveBeenCalledWith(true);
    });
  });

  test("handles API error during edit", async () => {
    makeApiCall.mockRejectedValue(new Error("API Error"));

    setup();
    fireEvent.change(screen.getByTestId("test-edit-todo-description").querySelector('input'), {
      target: { value: "Updated Todo" },
    });
    fireEvent.change(
      screen.getByTestId("test-edit-todo-status").querySelector("input"),
      {
        target: { value: "Completed" },
      }
    );
    fireEvent.click(screen.getByTestId("test-edit-todo-update-btn"));

    await waitFor(() => {
      expect(makeApiCall).toHaveBeenCalledWith("/todos/12345", "PATCH", {
        description: "Updated Todo",
        status: "Completed",
      });
      expect(toast.error).toHaveBeenCalledWith("Todo updation failed!");
      expect(toast.error).toHaveBeenCalledWith("API Error", { delay: 250 });
    });
  });

  test("calls handleClose on cancel button click", () => {
    const { setOpen } = setup();
    fireEvent.click(screen.getByTestId("test-edit-todo-cancel-btn"));
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  test("disables update button if description is empty", () => {
    setup({ currentDescription: "" });
    expect(screen.getByTestId("test-edit-todo-update-btn")).toBeDisabled();
  });

  test("disables update button if description and status are unchanged", () => {
    setup();
    expect(screen.getByTestId("test-edit-todo-update-btn")).toBeDisabled();
  });
});
