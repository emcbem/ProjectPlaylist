const Gauge = () => {
  return (
    <div className="relative size-40">
      <svg
        className="rotate-[135deg] size-full"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-clay-950"
          stroke-width="1"
          stroke-dasharray="75 100"
          stroke-linecap="round"
        ></circle>

        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-green-500 dark:text-green-500"
          stroke-width="2"
          stroke-dasharray="56.25 100"
          stroke-linecap="round"
        ></circle>
      </svg>

      <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-4xl font-bold text-green-600 dark:text-green-500">
          75%
        </span>
        <span className="text-green-600 dark:text-green-500 block">
          Finished
        </span>
      </div>
    </div>
  );
};

export default Gauge;
