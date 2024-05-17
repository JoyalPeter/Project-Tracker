import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteTodo from "./DeleteTodo";
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

describe("DeleteTodo Component", () => {
  const setup = () => {
    const setOpen = vi.fn();
    const setUpdated = vi.fn();
    const props = {
      todoID: "12345",
      open: true,
      setOpen,
      updated: false,
      setUpdated,
    };

    return {
      setOpen,
      setUpdated,
      ...render(<DeleteTodo {...props} />),
    };
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("renders the DeleteTodo modal", () => {
    setup();
    expect(screen.getByTestId("test-delete-todo")).toBeInTheDocument();
    expect(
      screen.getByText(/Do you want to delete this todo?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-delete-todo-confirm-btn")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-delete-todo-cancel-btn")
    ).toBeInTheDocument();
  });

  test("calls handleDelete and makes API call on confirm button click", async () => {
    makeApiCall.mockResolvedValue({});

    const { setUpdated } = setup();
    fireEvent.click(screen.getByTestId("test-delete-todo-confirm-btn"));

    await waitFor(() => {
      expect(makeApiCall).toHaveBeenCalledWith("/todos/12345", "DELETE");
      expect(toast.success).toHaveBeenCalledWith("Todo deleted successfully!");
      expect(setUpdated).toHaveBeenCalledWith(true);
    });
  });

  test("handles API error during delete", async () => {
    makeApiCall.mockRejectedValue(new Error("API Error"));

    setup();
    fireEvent.click(screen.getByTestId("test-delete-todo-confirm-btn"));

    await waitFor(() => {
      expect(makeApiCall).toHaveBeenCalledWith("/todos/12345", "DELETE");
      expect(toast.error).toHaveBeenCalledWith("Todo delete failed!");
      expect(toast.error).toHaveBeenCalledWith("API Error", { delay: 250 });
    });
  });

  test("calls handleClose on cancel button click", () => {
    const { setOpen } = setup();
    fireEvent.click(screen.getByTestId("test-delete-todo-cancel-btn"));
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
