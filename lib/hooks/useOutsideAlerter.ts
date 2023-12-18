import { useCallback, useEffect, useState } from "react";

export default function useOutsideAlerter(ref: any) {
  const [isOutSide, setIsOutSide] = useState<boolean>(true);
  
  const handleClickOutside = useCallback((event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOutSide(true);
      return;
    }
    setIsOutSide(false);
  }, [isOutSide])

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mouseover", () => setIsOutSide(false));
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mouseover", () => setIsOutSide(false));
    };
  }, [ref]);

  return { isOutSide } as const;
}