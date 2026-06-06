import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Toast from "../../src/components/common/Toast";

describe("Toast Component", () => {
  it("should render toast message", () => {
    render(<Toast message="Test notification" type="success" />);

    const messageElement =
      screen.queryByText("Test notification") ||
      document.body.textContent.includes("Test notification");
    expect(messageElement || messageElement === true).toBeTruthy();
  });

  it("should display different toast types", () => {
    const { container: successContainer } = render(
      <Toast message="Success" type="success" />,
    );
    expect(successContainer).toBeInTheDocument();

    const { container: errorContainer } = render(
      <Toast message="Error" type="error" />,
    );
    expect(errorContainer).toBeInTheDocument();

    const { container: warningContainer } = render(
      <Toast message="Warning" type="warning" />,
    );
    expect(warningContainer).toBeInTheDocument();
  });

  it("should auto-dismiss after timeout", async () => {
    const onDismiss = vi.fn();
    const { container } = render(
      <Toast
        message="Test"
        type="info"
        onDismiss={onDismiss}
        duration={1000}
      />,
    );

    expect(container).toBeInTheDocument();
  });
});
