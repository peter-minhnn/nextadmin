import { useCallback, useEffect, useState } from "react";

export default function useOutsideAlerter(ref: any) {
  const [isOutSide, setIsOutSide] = useState<boolean>(false);
  
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
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return { isOutSide } as const;
}