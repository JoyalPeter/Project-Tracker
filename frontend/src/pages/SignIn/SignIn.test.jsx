import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignIn from "./SignIn";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { toast } from "react-toastify";
import makeApiCall from "../../utils/ApiCall";
import { ToasterMessages } from "../../utils/Constants";
// import jwtDecode from "jwt-decode";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("../../utils/ApiCall");

// vi.mock("jwt-decode",()=>{vi.fn()});

vi.mock("../../components/Loader/Loader", () => ({
  __esModule: true,
  default: ({ open }) => (open ? <div>Loading...</div> : null),
}));

describe("SignIn", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // jwtDecode.mockClear();
    localStorage.clear();
  });

  test("renders the sign-in form", () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );

    expect(screen.getByTestId("test-sign-in")).toBeInTheDocument();
    expect(screen.getByTestId("test-sign-in-username")).toBeInTheDocument();
    expect(screen.getByTestId("test-sign-in-password")).toBeInTheDocument();
    expect(screen.getByTestId("test-sign-in-btn")).toBeInTheDocument();
    expect(screen.getByTestId("test-sign-in-sign-up-link")).toBeInTheDocument();
  });

  test("disables the sign-in button when username or password is empty", () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );

    const signInButton = screen.getByTestId("test-sign-in-btn");

    expect(signInButton).toBeDisabled();

    fireEvent.change(
      screen.getByTestId("test-sign-in-username").querySelector("input"),
      {
        target: { value: "testuser" },
      }
    );
    expect(signInButton).toBeDisabled();

    fireEvent.change(
      screen.getByTestId("test-sign-in-password").querySelector("input"),
      {
        target: { value: "password" },
      }
    );
    expect(signInButton).not.toBeDisabled();
  });

  test("shows loader while signing in", async () => {
    makeApiCall.mockImplementation(() => new Promise(() => {}));

    render(
      <Router>
        <SignIn />
      </Router>
    );

    fireEvent.change(
      screen.getByTestId("test-sign-in-username").querySelector("input"),
      {
        target: { value: "testuser" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-sign-in-password").querySelector("input"),
      {
        target: { value: "password" },
      }
    );

    fireEvent.click(screen.getByTestId("test-sign-in-btn"));

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  test("handles successful sign-in", async () => {
    const mockResponse = {
      access_token: "testtoken",
    };
    makeApiCall.mockResolvedValueOnce(mockResponse);
    // jwtDecode.mockReturnValue({ userID: "test-user-id" });

    render(
      <Router>
        <SignIn />
      </Router>
    );

    fireEvent.change(
      screen.getByTestId("test-sign-in-username").querySelector("input"),
      {
        target: { value: "testuser" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-sign-in-password").querySelector("input"),
      {
        target: { value: "password" },
      }
    );
    fireEvent.click(screen.getByTestId("test-sign-in-btn"));

    await waitFor(() => {
        expect(makeApiCall).toHaveBeenCalledTimes(1);
    //   expect(localStorage.getItem("jwtToken")).toBe(mockResponse.access_token);
    //   expect(localStorage.getItem("userID")).toBe("test-user-id");
    });
  });

  test("handles sign-in error", async () => {
    const errorMessage = "Error signing in";
    makeApiCall.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <Router>
        <SignIn />
      </Router>
    );

    fireEvent.change(
      screen.getByTestId("test-sign-in-username").querySelector("input"),
      {
        target: { value: "testuser" },
      }
    );
    fireEvent.change(
      screen.getByTestId("test-sign-in-password").querySelector("input"),
      {
        target: { value: "password" },
      }
    );

    fireEvent.click(screen.getByTestId("test-sign-in-btn"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ToasterMessages.SIGNIN_ERROR);
      expect(toast.error).toHaveBeenCalledWith(errorMessage, { delay: 250 });
    });
  });
});
