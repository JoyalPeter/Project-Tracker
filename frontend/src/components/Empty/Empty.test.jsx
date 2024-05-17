import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Empty from "./Empty";

describe("Empty", () => {
  test("renders", () => {
    render(<Empty message="Testing"/>);

    expect(
      screen.getByTestId("test-empty-message-container")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Testing")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-empty-message-icon")
    ).toBeInTheDocument();
  });
});
