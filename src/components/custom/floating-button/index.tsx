import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

/**
 * A floating button component.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} children - The content of the button.
 * @param {React.LegacyRef<HTMLButtonElement>} ref - The ref to the button element.
 * @returns {JSX.Element} The rendered button component.
 * @example
 * ```tsx
 * <FloatingButton>
 *   <span>Click me</span>
 * </FloatingButton>
 * ```
 */
const FloatingButton = forwardRef(
  /**

   */
  (
    {
      children,
      ...props
    }: {
      children: React.ReactNode;
    } & React.ComponentPropsWithoutRef<"button">,
    ref: React.LegacyRef<HTMLButtonElement>
  ) => {
    return (
      <Button
        ref={ref}
        variant="secondary"
        className="absolute h-auto top-0 right-0 px-3 py-3 m-4"
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export default FloatingButton;
