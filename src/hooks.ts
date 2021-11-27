import { useRef, useEffect } from "react";
import { VoidFunction } from "./types";

export const useTimeout = (callback: VoidFunction, delay: number) => {
  const savedCallback = useRef<VoidFunction>();
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    const id = setTimeout(tick, delay);
    return () => clearTimeout(id);
  }, [delay]);
};
