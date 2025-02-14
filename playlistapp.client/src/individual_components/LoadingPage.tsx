import LogoAnimation from "./LogoAnimation";

const LoadingPage = () => {
  return (
    <>
      <div className="flex w-full h-96 justify-center items-center relative z-20">
        <div className="flex space-x-2 justify-center items-center bg-transparent lg:mx-12">
          <span className="dark:text-white text-black text-5xl">Loading</span>
          <LogoAnimation />
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
