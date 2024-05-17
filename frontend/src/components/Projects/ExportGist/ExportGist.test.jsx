import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import ExportGist from "./ExportGist";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { Status, ToasterMessages } from "../../../utils/Constants";
import { describe, expect, test } from "vitest";

vi.mock("file-saver", () => ({
  saveAs: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("ExportGist Component", () => {
  const setup = (props) => {
    const defaultProps = {
      projectTitle: "Sample Project",
      todos: [
        { description: "Task 1", status: Status.COMPLETED },
        { description: "Task 2", status: Status.PENDING },
      ],
      open: true,
      setOpen: vi.fn(),
      ...props,
    };
    render(<ExportGist {...defaultProps} />);
    return defaultProps;
  };

  test("renders correctly when dialog is open", () => {
    setup();

    expect(screen.getByTestId("test-export-gist")).toBeInTheDocument();
    expect(screen.getByText("Export and save Project?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Do you want to export the file as secret gist and save it as markdown file?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-export-gist-cancel-btn")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-export-gist-export-btn")
    ).toBeInTheDocument();
  });

  test("handles Cancel button click event", () => {
    const defaultProps = setup();

    const cancelButton = screen.getByTestId("test-export-gist-cancel-btn");
    fireEvent.click(cancelButton);

    expect(defaultProps.setOpen).toHaveBeenCalledWith(false);
  });

  test("handles Export button click event successfully", async () => {
    const defaultProps = setup();

    // eslint-disable-next-line no-undef
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({}),
    });

    const exportButton = screen.getByTestId("test-export-gist-export-btn");
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(defaultProps.setOpen).toHaveBeenCalledWith(false);
    });

    await waitFor(() => {
      expect(saveAs).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        ToasterMessages.EXPORT_N_SAVE_SUCCESS
      );
    });
  });

  test("handles Export button click event with API error", async () => {
    setup();
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn().mockRejectedValue(new Error("API Error"));

    const exportButton = screen.getByTestId("test-export-gist-export-btn");
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        ToasterMessages.EXPORT_N_SAVE_ERROR
      );
      expect(toast.error).toHaveBeenCalledWith("API Error", { delay: 250 });
    });
  });
});
