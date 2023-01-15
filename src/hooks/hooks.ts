import { useEffect } from "react";

export function useDebounce(callback: (...args: unknown[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | undefined;

  return (...args: unknown[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = undefined;
    }, delay);
  };
}

export function useVScroll(callback: () => void, threshold: number) {
  const handleScroll = useDebounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop / (scrollHeight - clientHeight) >= threshold) {
      callback();
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, threshold, handleScroll]);
}
