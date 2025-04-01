import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "border-2 border-gray-300 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base  focus:outline-none focus:border-gray-500  w-full ease-linear transition-all duration-150 file:bg-gray-200 file:border-0 file:me-4 file:py-2 file:px-2 dark:file:bg-neutral-700 dark:file:text-neutral-400",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
