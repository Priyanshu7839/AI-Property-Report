import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-[#1B1B1B] placeholder:text-[#717182] selection:bg-[#030213] selection:text-white dark:bg-input/30 border-[#cfcfd7] flex h-9 w-full min-w-0 rounded-md border px-3 py-2 text-base bg-[#f3f3f5] transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-transparent focus-visible:ring-[#0285FF]/80 focus-visible:ring-[3px]",
        "aria-invalid:ring-[#d4183d]/20 dark:aria-invalid:ring-[#d4183d]/40 aria-invalid:border-[#d4183d]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
