// hooks/useTranslations.ts
import { useParams } from 'next/navigation';
import csTranslations from '@/translations/cs.json';
import enTranslations from '@/translations/en.json';


export function useTranslations() {
  const params = useParams();
  const locale = (params?.locale as string) || 'cs';
  const translations = locale === 'en' ? enTranslations : csTranslations;

  //TODO:nejde to jinak? for a generics..
  function t<T = string>(key: string): T {
    try {
      const parts = key.split('.');
      let current: unknown = translations;
      
      for (const part of parts) {
        if (!current || typeof current !== 'object') {
          return key as unknown as T;
        }
        current = (current as Record<string, unknown>)[part];
      }
      
      return current as T;
    } catch (e) {
      return key as unknown as T;
    }
  }

  return { t };
}