interface props {
  height: number;
  width: number;
  darkColor?: string;
  color? : string
}

export const XboxIcon: React.FC<props> = ({height, width, darkColor, color}) => (
  <svg
  className={`2xl:w-[${width}px] 2xl:h-[${height}px] xl:w-[${width-3}px] xl:h-[${height-3}px] lg:w-[${width-6}px] lg:h-[${height-6}px] md:w-[${width-9}px] md:h-[${height-9}px] sm:w-[${width-12}px] sm:h-[${height-12}px] w-[${width-15}px] h-[${height-15}px] m-1 ${color && darkColor ? `dark:fill-${darkColor} fill-${color}` : ''}`}
  viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m24 12c0-.001 0-.001 0-.002 0-3.618-1.606-6.861-4.144-9.054l-.015-.013c-1.91 1.023-3.548 2.261-4.967 3.713l-.004.004c.044.046.087.085.131.132 3.719 4.012 7.106 9.73 6.546 12.471 1.53-1.985 2.452-4.508 2.452-7.246 0-.002 0-.004 0-.006z" />
    <path d="m12.591 3.955c1.68-1.104 3.699-1.833 5.872-2.022l.048-.003c-1.837-1.21-4.09-1.929-6.511-1.929-2.171 0-4.207.579-5.962 1.591l.058-.031c.658.567 2.837.781 5.484 2.4.143.089.316.142.502.142.189 0 .365-.055.513-.149l-.004.002z" />
    <path d="m9.166 6.778c.046-.049.093-.09.138-.138-1.17-1.134-2.446-2.174-3.806-3.1l-.099-.064c-.302-.221-.681-.354-1.091-.354-.146 0-.288.017-.425.049l.013-.002c-2.398 2.198-3.896 5.344-3.896 8.84 0 2.909 1.037 5.576 2.762 7.651l-.016-.02c-1.031-2.547 2.477-8.672 6.419-12.862z" />
    <path d="m12.084 9.198c-3.962 3.503-9.477 8.73-8.632 11.218 2.174 2.213 5.198 3.584 8.542 3.584 3.493 0 6.637-1.496 8.826-3.883l.008-.009c.486-2.618-4.755-7.337-8.744-10.91z" />
  </svg>
);
