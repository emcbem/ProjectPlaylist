interface props {
  height: number;
  width: number;
  darkColor?: string;
  color? : string
}


export const TwitchIcon: React.FC<props> = ({height, width, darkColor, color}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-[${width}px] h-[${height}px] m-1 ${color && darkColor ? `dark:fill-${darkColor} fill-${color}` : ''}`}
    viewBox="1 0 13.71 16"
  >
    <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z" />
    <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
  </svg>
);
