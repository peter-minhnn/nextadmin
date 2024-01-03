import { useEffect, useState } from "react";
import { useLocalStorage } from "./use-local-storage";

export default function useLanguage() {
    const { getItem: getLang, setItem: setLangLocalStorage } = useLocalStorage('lang');
    const lang = getLang();
    const [currentLang, setCurrentLang] = useState<string>('');

    useEffect(() => {
        if (!lang) {
            setLangLocalStorage('vi');
            setCurrentLang('vi');
        }
        lang && setCurrentLang(lang);
    }, [lang])

    return { currentLang } as const;
}