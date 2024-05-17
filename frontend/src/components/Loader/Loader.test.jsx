import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Loader from "./Loader";

describe("Loader", () => {
  test("renders", () => {
    render(<Loader open={true} />);

    expect(
      screen.getByTestId("test-loader-backdrop")
    ).toBeInTheDocument();
    expect(screen.getByTestId("test-loader-progress")).toBeInTheDocument();
  });
});
