import { useState, useEffect } from "react";

const useIntersection = (element: any) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setState(entry.isIntersecting);
    });

    element.current && observer.observe(element.current);
  }, []);

  return isVisible;
};

export default useIntersection;
