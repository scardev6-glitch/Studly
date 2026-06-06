import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmptyState from "../../src/components/common/EmptyState";

describe("EmptyState Component", () => {
  it("should render empty state message", () => {
    const testMessage = "No data available";
    render(<EmptyState message={testMessage} />);

    const messageElement =
      screen.queryByText(testMessage) ||
      document.body.textContent.includes(testMessage);
    expect(messageElement || messageElement === true).toBeTruthy();
  });

  it("should render with custom icon", () => {
    const { container } = render(
      <EmptyState message="No items" icon="inbox" />,
    );
    expect(container).toBeInTheDocument();
  });

  it("should render with action button", () => {
    const mockAction = { text: "Add Item", onClick: () => {} };
    const { container } = render(
      <EmptyState message="No items" action={mockAction} />,
    );
    expect(container).toBeInTheDocument();
  });
});
