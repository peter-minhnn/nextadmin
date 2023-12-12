import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */

export default function useOutsideAlerter(ref: any) {
  const [isOutSide, setIsOutSide] = useState<boolean>(false);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOutSide(true);
        return;
      }
      setIsOutSide(false);
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => { console.log(isOutSide)}, [isOutSide])

  return { isOutSide } as const;
}