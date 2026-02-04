"use client ";

import { ComponentPropsWithoutRef, LegacyRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface textareaProps extends ComponentPropsWithoutRef<"textarea"> {
  error?: boolean;
  errorMessage?: string;
}

function textarea(
  { className, error, errorMessage, ...props }: textareaProps,
  ref: LegacyRef<HTMLTextAreaElement> | undefined
) {
  const textareaClassName = twMerge(
    "rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-dark placeholder-black placeholder-opacity-20 outline-none transition-all",
    error ? "border-red-500" : "focus:ring-1 focus:ring-primary",
    className
  );

  return (
    <div className="flex w-full flex-col">
      <textarea ref={ref} className={textareaClassName} {...props} />
      {error && errorMessage && (
        <span className="mt-1 text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
}

export default forwardRef(textarea);
