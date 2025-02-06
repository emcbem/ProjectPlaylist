const LoadingDots = () => {
  return (
    <div className="flex justify-end relative z-20">
      <div className="flex space-x-2 justify-center items-center dark:invert bg-transparent lg:mx-12">
        <span className="sr-only">Loading...</span>
        <div className="h-2 w-2 bg-black rounded-full animate-[bounce_1.2s_infinite] [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-black rounded-full animate-[bounce_1.2s_infinite] [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-black rounded-full animate-[bounce_1.2s_infinite]"></div>
      </div>
    </div>
  );
};

export default LoadingDots;
