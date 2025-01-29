import { cn } from "@/lib/utils";
import { motion, MotionProps} from "motion/react";
import React from "react";
interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {

  return (
    <motion.div
      ref={ref}
      className={cn(
        "z-[1000] h-1 origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className,
      )}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";
