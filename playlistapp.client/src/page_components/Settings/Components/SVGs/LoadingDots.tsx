const LoadingDots = () => {
  return (
    <div className="flex justify-start relative z-20 w-1/2 ml-4 mt-2">
      <div className="flex space-x-2 justify-center items-center dark:invert bg-transparent">
        <span className="sr-only">Loading...</span>
        <div className="h-2 w-2 bg-black rounded-full animate-[bounce_1.2s_infinite] [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-black rounded-full animate-[bounce_1.2s_infinite] [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-black rounded-full animate-[bounce_1.2s_infinite]"></div>
      </div>
    </div>
  );
};

export default LoadingDots;
