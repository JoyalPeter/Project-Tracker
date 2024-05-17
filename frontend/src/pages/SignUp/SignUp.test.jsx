import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import makeApiCall from "../../utils/ApiCall";
import { toast } from "react-toastify";
import { describe, expect, test, vi, beforeEach } from "vitest";

vi.mock("../../utils/ApiCall");

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// vi.mock("react-router-dom", async () => {
//   const actual = await vi.importActual("react-router-dom");
//   return {
//     ...actual,
//     useNavigate: () => vi.fn(),
//   };
// });

describe("SignUp Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders SignUp form", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Sign up/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("test-signup-username")).toBeInTheDocument();
    expect(screen.getByTestId("test-signup-password")).toBeInTheDocument();
    expect(
      screen.getByTestId("test-signup-confirm-password")
    ).toBeInTheDocument();
  });

  test("disables sign up button when password does not satisfy required conditions", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    fireEvent.change(
      screen.getByTestId("test-signup-username").querySelector("input"),
      {
        target: { value: "testuser" },
      }
    );
    let password = "pass";

    fireEvent.change(
      screen.getByTestId("test-signup-password").querySelector("input"),
      {
        target: { value: password },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-signup-confirm-password").querySelector("input"),
      {
        target: { value: password },
      }
    );

    expect(
      screen.getByTestId("test-signup-signup-button").closest("button")
    ).toBeDisabled();
  });

  test("enables sign up button when password satisfies required conditions", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    fireEvent.change(
      screen.getByTestId("test-signup-username").querySelector("input"),
      {
        target: { value: "testuser" },
      }
    );
    let password = "Password@123";

    fireEvent.change(
      screen.getByTestId("test-signup-password").querySelector("input"),
      {
        target: { value: password },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-signup-confirm-password").querySelector("input"),
      {
        target: { value: password },
      }
    );

    expect(
      screen.getByTestId("test-signup-signup-button").closest("button")
    ).not.toBeDisabled();
  });

  test("enables sign up button when passwords match", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(
      screen.getByTestId("test-signup-username").querySelector("input"),
      {
        target: { value: "testuser" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-signup-password").querySelector("input"),
      {
        target: { value: "Password123!" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-signup-confirm-password").querySelector("input"),
      {
        target: { value: "Password123!" },
      }
    );

    expect(
      screen.getByTestId("test-signup-signup-button").closest("button")
    ).toBeDisabled();
  });

  test("disables sign up button when passwords do not match", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(
      screen.getByTestId("test-signup-username").querySelector("input"),
      {
        target: { value: "testuser" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-signup-password").querySelector("input"),
      {
        target: { value: "Password123!" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-signup-confirm-password").querySelector("input"),
      {
        target: { value: "Password" },
      }
    );

    expect(
      screen.getByTestId("test-signup-signup-button").closest("button")
    ).toBeDisabled();
  });

  test("calls API on form submit and handles success", async () => {
    // const mockNavigate = vi.fn();
    // useNavigate.mockReturnValue(mockNavigate);
    vi.mocked(makeApiCall).mockResolvedValue({ userID: "12345" });

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByTestId("test-signup-username").querySelector("input"),
      {
        target: { value: "testuser" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-signup-password").querySelector("input"),
      {
        target: { value: "Password@123" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-signup-confirm-password").querySelector("input"),
      {
        target: { value: "Password@123" },
      }
    );
    fireEvent.click(screen.getByTestId("test-signup-signup-button"));

    await waitFor(() => {
      expect(makeApiCall).toHaveBeenCalledWith("/users/signup", "POST", {
        username: "testuser",
        password: "Password@123",
      });
      expect(toast.success).toHaveBeenCalledWith(
        "Sign-up successful! Use credentials to sign-in."
      );
      // expect(mockNavigate).toHaveBeenCalledWith("/signin");
    });
  });

  test("handles API error on form submit", async () => {
    vi.mocked(makeApiCall).mockRejectedValueOnce(new Error("Signup failed"));

    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(
      screen.getByTestId("test-signup-username").querySelector("input"),
      {
        target: { value: "testuser" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-signup-password").querySelector("input"),
      {
        target: { value: "Password@123" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-signup-confirm-password").querySelector("input"),
      {
        target: { value: "Password@123" },
      }
    );

    fireEvent.click(screen.getByTestId("test-signup-signup-button"));

    await waitFor(() => {
      expect(makeApiCall).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith("Sign-up failed!");
    });
  });
});
