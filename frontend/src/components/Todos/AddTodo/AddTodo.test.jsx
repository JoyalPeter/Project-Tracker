import { describe, expect, test, beforeEach,vi } from "vitest"; 
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTodo from "./AddTodo";
import { Api_Methods, Status, ToasterMessages } from "../../../utils/Constants";
import makeApiCall from "../../../utils/ApiCall";
import { toast } from "react-toastify";

vi.mock("../../../utils/ApiCall");
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("AddTodo", () => {
  const mockSetOpen = vi.fn();
  const mockSetUpdated = vi.fn();

  const setup = () => {
    render(
      <AddTodo
        projectID="123"
        open={true}
        setOpen={mockSetOpen}
        updated={false}
        setUpdated={mockSetUpdated}
      />
    );
  };

    beforeEach(() => {
      vi.clearAllMocks();
    });

  test("renders the AddTodo modal", () => {
    setup();

    expect(screen.getByTestId("test-add-todo")).toBeInTheDocument();
    expect(screen.getByTestId("test-add-todo-description")).toBeInTheDocument();
    expect(screen.getByTestId("test-add-todo-status")).toBeInTheDocument();
    expect(screen.getByTestId("test-add-todo-create-btn")).toBeInTheDocument();
    expect(screen.getByTestId("test-add-todo-cancel-btn")).toBeInTheDocument();
  });

  test("handles input changes and form submission", async () => {
    setup();

    fireEvent.change(
      screen.getByTestId("test-add-todo-description").querySelector("input"),
      {
        target: { value: "New Todo" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-add-todo-status").querySelector("input"),
      {
        target: { value: Status.COMPLETED },
      }
    );

    expect(
      screen.getByTestId("test-add-todo-description").querySelector("input")
        .value
    ).toBe("New Todo");
    expect(
      screen.getByTestId("test-add-todo-status").querySelector("input").value
    ).toBe(Status.COMPLETED);

    vi.mocked(makeApiCall).mockResolvedValue({ todoID: "1" });

    fireEvent.click(screen.getByTestId("test-add-todo-create-btn"));

    expect(makeApiCall).toHaveBeenCalledWith("/todos", Api_Methods.POST, {
      projectID: "123",
      description: "New Todo",
      status: Status.COMPLETED,
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        ToasterMessages.CREATE_TODO_SUCCESS
      );
    });

    expect(mockSetUpdated).toHaveBeenCalledWith(true);
  });

  test("handles cancel button click", () => {
    setup();

    fireEvent.click(screen.getByTestId("test-add-todo-cancel-btn"));

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test("displays error message on API call failure", async () => {
    setup();

    fireEvent.change(
      screen.getByTestId("test-add-todo-description").querySelector("input"),
      {
        target: { value: "New Todo" },
      }
    );

    vi.mocked(makeApiCall).mockRejectedValue(new Error("API error"));

    fireEvent.click(screen.getByTestId("test-add-todo-create-btn"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        ToasterMessages.CREATE_TODO_ERROR
      );
      expect(toast.error).toHaveBeenCalledWith("API error", { delay: 250 });
    });
  });
});
