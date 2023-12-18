import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function useLanguage() {
    const { getItem: getLang, setItem: setLangLocalStorage } = useLocalStorage('lang');
    const lang = getLang();
    const [currentLang, setCurrentLang] = useState<string>('');

    useEffect(() => {
        if (!lang) {
            setLangLocalStorage('en');
            setCurrentLang('en');
        }
        lang && setCurrentLang(lang);
    }, [lang])

    return { currentLang } as const;
}