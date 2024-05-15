import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FloatingButton from "@/components/custom/floating-button";

describe("FloatingButton", () => {
  it("renders its children", () => {
    render(
      <FloatingButton>
        <span>Test</span>
      </FloatingButton>
    );
    const childElement = screen.getByText("Test");
    expect(childElement).toBeInTheDocument();
  });

  it("passes props correctly", () => {
    const onClick = jest.fn();
    render(
      <FloatingButton onClick={onClick} role="button">
        <span>Test</span>
      </FloatingButton>
    );
    const buttonElement = screen.getByRole("button");
    fireEvent(
      buttonElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(onClick).toHaveBeenCalled();
  });
});
