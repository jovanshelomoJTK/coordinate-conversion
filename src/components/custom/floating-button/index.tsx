import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

const FloatingButton = forwardRef(
  (
    {
      children,
      ...props
    }: {
      children: React.ReactNode;
      props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    },
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
