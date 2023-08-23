import { useEffect, useState, useRef } from "react";

const useMinimumFetchTimeElapsed = (ms, isLoading) => {
  const [hasElapsed, setHasElapsed] = useState(true);
  const timeout = useRef();

  useEffect(() => {
    if (isLoading) {
      timeout.current && clearTimeout(timeout.current);
      setHasElapsed(false);
      timeout.current = setTimeout(() => {
        setHasElapsed(true);
      }, ms);
    }
  }, [ms, isLoading]);

  useEffect(() => timeout.current && clearTimeout(timeout.current), []);

  return hasElapsed;
};

export default useMinimumFetchTimeElapsed;
