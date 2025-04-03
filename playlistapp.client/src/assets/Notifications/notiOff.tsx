interface IconProps {
  width: string;
}

const NotiOff: React.FC<IconProps> = ({ width }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-300 fill-black dark:fill-white"
    >
      <path
        d="M6 15C6 15 6 13 6 11C6 9 7 5 12 5C13.5723 5 14.749 5.39552 15.6235 6M9.5 19C9.5 21 10.5 22 12 22C13.5 22 14.5 21 14.5 19M9.5 19C11.0621 19 14.5 19 14.5 19M9.5 19C9.14909 19 8.36719 19 7.5 19M14.5 19H18.382C19.1253 19 19.6088 18.2177 19.2764 17.5528L18 15C18 15 18 13 18 11C18 10.3755 17.9025 9.55594 17.6161 8.72408"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M12 5V3"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M21 3L3 21"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};

export default NotiOff;
