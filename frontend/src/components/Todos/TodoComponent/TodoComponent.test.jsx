import { render, screen, fireEvent } from "@testing-library/react";
import TodoComponent from "./TodoComponent";
import { Status } from "../../../utils/Constants";
import { describe, expect, test, beforeEach, vi } from "vitest";

// Mock the EditTodo and DeleteTodo components
vi.mock("../EditTodo/EditTodo", () => ({
  __esModule: true,
  default: ({ open }) =>
    open ? <div data-testid="test-edit-todo-modal">EditTodo Modal</div> : null,
}));

vi.mock("../DeleteTodo/DeleteTodo", () => ({
  __esModule: true,
  default: ({ open }) =>
    open ? (
      <div data-testid="test-delete-todo-modal">DeleteTodo Modal</div>
    ) : null,
}));

describe("TodoComponent", () => {
  const mockTodo = {
    todoID: "1",
    description: "Test Todo",
    status: Status.PENDING,
    createdDate: "2023-01-01T00:00:00Z",
    updatedDate: "2023-01-02T00:00:00Z",
  };

  const setup = (propsOverrides = {}) => {
    const setUpdated = vi.fn();
    const props = {
      todo: mockTodo,
      updated: false,
      setUpdated,
      ...propsOverrides,
    };

    return {
      setUpdated,
      ...render(<TodoComponent {...props} />),
    };
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("renders the TodoComponent with correct data", () => {
    setup();

    expect(screen.getByTestId("test-todo-component-row")).toBeInTheDocument();
    expect(
      screen.getByTestId("test-todo-component-row-description").textContent
    ).toBe("Test Todo");
    expect(
      screen.getByTestId("test-todo-component-row-status").textContent
    ).toBe(Status.PENDING);
    expect(
      screen.getByTestId("test-todo-component-row-created-date").textContent
    ).toBe("January 1, 2023");
    expect(
      screen.getByTestId("test-todo-component-row-updated-date").textContent
    ).toBe("January 2, 2023");
  });

  test("opens the EditTodo modal on edit button click", () => {
    setup();

    fireEvent.click(screen.getByTestId("test-todo-component-row-edit-btn"));

    expect(screen.getByTestId("test-edit-todo-modal")).toBeInTheDocument();
  });

  test("opens the DeleteTodo modal on delete button click", () => {
    setup();

    fireEvent.click(screen.getByTestId("test-todo-component-row-delete-btn"));

    expect(screen.getByTestId("test-delete-todo-modal")).toBeInTheDocument();
  });
});
