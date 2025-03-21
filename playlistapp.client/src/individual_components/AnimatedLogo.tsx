import { useEffect, useState } from "react";

const AnimatedLogo = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prev) => !prev);
    }, 2000); // Adjust timing to match animation duration

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      zoomAndPan="magnify"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
      viewBox="96.33 77.27 182.34 220.54"
      width="182.33999633789062"
      height="220.5399932861328"
      className={isActive ? "active" : ""}
    >
      <defs>
        <clipPath id="92d4545779">
          <path
            d="M 145.242188 77.265625 L 230.238281 77.265625 L 230.238281 182.847656 L 145.242188 182.847656 Z M 145.242188 77.265625 "
            clipRule="nonzero"
            className="svg-elem-1"
          ></path>
        </clipPath>
        <clipPath id="fa0df3b3c3">
          <path
            d="M 187.738281 77.265625 L 230.238281 130.023438 L 187.738281 182.78125 L 145.242188 130.023438 Z M 187.738281 77.265625 "
            clipRule="nonzero"
            className="svg-elem-2"
          ></path>
        </clipPath>
        <clipPath id="a0de49d58c">
          <path
            d="M 96.328125 135.335938 L 181.324219 135.335938 L 181.324219 240.914062 L 96.328125 240.914062 Z M 96.328125 135.335938 "
            clipRule="nonzero"
            className="svg-elem-3"
          ></path>
        </clipPath>
        <clipPath id="f03737ad19">
          <path
            d="M 138.824219 135.335938 L 181.324219 188.09375 L 138.824219 240.851562 L 96.328125 188.09375 Z M 138.824219 135.335938 "
            clipRule="nonzero"
            className="svg-elem-4"
          ></path>
        </clipPath>
        <clipPath id="d770e522be">
          <path
            d="M 193.675781 134.148438 L 278.671875 134.148438 L 278.671875 239.730469 L 193.675781 239.730469 Z M 193.675781 134.148438 "
            clipRule="nonzero"
            className="svg-elem-5"
          ></path>
        </clipPath>
        <clipPath id="3f08d4b586">
          <path
            d="M 236.175781 134.148438 L 278.671875 186.90625 L 236.175781 239.664062 L 193.675781 186.90625 Z M 236.175781 134.148438 "
            clipRule="nonzero"
            className="svg-elem-6"
          ></path>
        </clipPath>
        <clipPath id="e3c204af25">
          <path
            d="M 144.761719 192.21875 L 229.757812 192.21875 L 229.757812 297.800781 L 144.761719 297.800781 Z M 144.761719 192.21875 "
            clipRule="nonzero"
            className="svg-elem-7"
          ></path>
        </clipPath>
        <clipPath id="4ab8331df3">
          <path
            d="M 187.261719 192.21875 L 229.757812 244.976562 L 187.261719 297.734375 L 144.761719 244.976562 Z M 187.261719 192.21875 "
            clipRule="nonzero"
            className="svg-elem-8"
          ></path>
        </clipPath>
      </defs>
      <g clip-path="url(#92d4545779)">
        <g clip-path="url(#fa0df3b3c3)">
          <path
            fill="#a43845"
            d="M 145.242188 77.265625 L 230.238281 77.265625 L 230.238281 182.847656 L 145.242188 182.847656 Z M 145.242188 77.265625 "
            fill-opacity="1"
            fillRule="nonzero"
            className="svg-elem-9"
          ></path>
        </g>
      </g>
      <g clip-path="url(#a0de49d58c)">
        <g clip-path="url(#f03737ad19)">
          <path
            fill="#de5152"
            d="M 96.328125 135.335938 L 181.324219 135.335938 L 181.324219 240.914062 L 96.328125 240.914062 Z M 96.328125 135.335938 "
            fill-opacity="1"
            fillRule="nonzero"
            className="svg-elem-10"
          ></path>
        </g>
      </g>
      <g clip-path="url(#d770e522be)">
        <g clip-path="url(#3f08d4b586)">
          <path
            fill="#602b53"
            d="M 193.675781 134.148438 L 278.671875 134.148438 L 278.671875 239.730469 L 193.675781 239.730469 Z M 193.675781 134.148438 "
            fill-opacity="1"
            fillRule="nonzero"
            className="svg-elem-11"
          ></path>
        </g>
      </g>
      <g clip-path="url(#e3c204af25)">
        <g clip-path="url(#4ab8331df3)">
          <path
            fill="#edbd68"
            d="M 144.761719 192.21875 L 229.757812 192.21875 L 229.757812 297.800781 L 144.761719 297.800781 Z M 144.761719 192.21875 "
            fill-opacity="1"
            fillRule="nonzero"
            className="svg-elem-12"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default AnimatedLogo;
