'use client'
import { useCallback, useEffect, useState } from "react";

const useWindowResize = (ref: any = null) => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const handleSizeChanged = useCallback((event: any = null) => {
        if (!event || !ref) return;
        setWidth(ref ? ref.current.clientWidth : event.current.clientWidth)
        setHeight(ref ? ref.current.clientHeight : event.current.clientHeight)
    }, [width, height])

    useEffect(() => {
        window.addEventListener('resize', handleSizeChanged)
        return () => window.removeEventListener('resize', handleSizeChanged)
    }, [])

    return { width, height } as const
}

export default useWindowResize