'use client'
import vi from '@/lib/languages/vi';
import en from '@/lib/languages/en';
import useLanguage from './useLanguages';

const useTrans = () => {
    const { currentLang } = useLanguage();
    const trans = currentLang === 'en' ? en : vi
    return trans
}

export default useTrans