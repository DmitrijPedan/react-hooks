import {useCallback, useRef} from "react";

export default function useDebounce (clb, delay) {

  const timer = useRef();

  const debouncedCallback = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => clb(...args), delay);
  }, [clb, delay]);

  return debouncedCallback;


}
