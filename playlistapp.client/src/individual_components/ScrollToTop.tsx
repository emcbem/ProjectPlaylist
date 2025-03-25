import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

/* When you click on a new page, you have to manually scroll back to the top */
/* This component adds it automatically */
const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);
  return <>{children}</>;
};

export default ScrollToTop;
