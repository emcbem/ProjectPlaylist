import { FC } from "react";

const TimelineIcon: FC<{ color: string }> = ({ color }) => {



  return (
    <div className="rounded-full  h-12 w-12 flex justify-center items-center" style={{ backgroundColor: color }}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <rect
          x="3"
          y="6"
          width="18"
          height="15"
          rx="2"
          stroke="#FFFFFF"
          stroke-width="2"
        />
        <path
          d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z"
          fill="#FFFFFF"
        />
        <path
          d="M7 3L7 6"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M17 3L17 6"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
};

export default TimelineIcon;
