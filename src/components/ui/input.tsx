"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string;
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, classNameInput, rightElement, type, ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "flex flex-row items-center w-fullborder-transparent border rounded-md shadow-sm border-input bg-transparent focus-within:ring-1 focus-within:ring-ring",
            className
          )}
        >
          {props.prefix && (
            <span className="pl-2 text-sm text-soft">{props.prefix}</span>
          )}
          <input
            type={type === "password" && passwordVisible ? "text" : type}
            className={cn(
              "flex w-full  h-8 bg-transparent px-3 py-1 text-sm transition-colors rounded-md file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
              classNameInput
            )}
            ref={ref}
            {...props}
          />
        </div>
        {type === "password" && (
          <div className="absolute right-0 top-0 bottom-0 grid place-items-center">
            <Button
              type="button"
              variant="link"
              className="text-sm font-medium text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400 focus:ring-primary-500"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              <span className="sr-only">
                {passwordVisible ? "Hide" : "Show"} password
              </span>
              {passwordVisible ? (
                <EyeOpenIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <EyeClosedIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        )}
        {rightElement && (
          <div className="absolute right-0 top-0 bottom-0 grid place-items-center">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
