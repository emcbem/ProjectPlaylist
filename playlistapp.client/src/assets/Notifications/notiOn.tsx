interface IconProps {
  width: string;
}

const NotiOn: React.FC<IconProps> = ({ width }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-300 fill-black dark:fill-white"
    >
      <path
        d="M9.5 19C8.89555 19 7.01237 19 5.61714 19C4.87375 19 4.39116 18.2177 4.72361 17.5528L5.57771 15.8446C5.85542 15.2892 6 14.6774 6 14.0564C6 13.2867 6 12.1434 6 11C6 9 7 5 12 5C17 5 18 9 18 11C18 12.1434 18 13.2867 18 14.0564C18 14.6774 18.1446 15.2892 18.4223 15.8446L19.2764 17.5528C19.6088 18.2177 19.1253 19 18.382 19H14.5M9.5 19C9.5 21 10.5 22 12 22C13.5 22 14.5 21 14.5 19M9.5 19C11.0621 19 14.5 19 14.5 19"
        className="stroke-white dark:stroke-black"
        stroke-linejoin="round"
        strokeWidth="2"
      ></path>
      <path
        d="M12 5V3"
        className="stroke-white dark:stroke-black"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  );
};

export default NotiOn;
