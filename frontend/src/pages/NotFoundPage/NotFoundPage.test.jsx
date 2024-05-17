import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import NotFoundPage from "./NotFoundPage";

vi.mock("react-router-dom", async () => {
  const original = await vi.importActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => vi.fn(),
  };
});

describe("NotFoundPage", () => {
  test("renders NotFoundPage correctly", () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Oops! Page not found.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you are trying to open does not exist. You may have mistyped the address, or the page might have been removed, had its name changed, or is temporarily unavailable."
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("test-404-page-back-btn")).toBeInTheDocument();
  });

//   test("navigates back on 'Go Back' button click", () => {
//     const mockNavigate = vi.fn();
//     vi.mock("react-router-dom", async () => {
//       const original = await vi.importActual("react-router-dom");
//       return {
//         ...original,
//         useNavigate: () => mockNavigate,
//       };
//     });

//     render(
//       <Router>
//         <NotFoundPage />
//       </Router>
//     );

//     const goBackButton = screen.getByTestId("test-404-page-back-btn");
//     fireEvent.click(goBackButton);

//     expect(mockNavigate).toHaveBeenCalledWith(-1);
//   });
});
