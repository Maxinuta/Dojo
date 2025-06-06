// utils/translations.ts
import csTranslations from '@/translations/cs.json';
import enTranslations from '@/translations/en.json';

// Mapování jazykových kódů na překlady
const translations: Record<string, any> = {
  cs: csTranslations,
  en: enTranslations
};

/**
 * Pomocná funkce pro získání překladů podle jazykového kódu
 * @param locale Jazykový kód (cs, en)
 */
export function getTranslations(locale: string) {
  // Výchozí jazyk je čeština
  const currentTranslations = translations[locale] || translations.cs;
  
  /**
   * Funkce pro získání překladu podle klíče
   * @param key Klíč překladu ve formátu "category.subcategory.key"
   * @returns Přeložený text nebo původní klíč, pokud překlad neexistuje
   */
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    // Postupné procházení objektu podle klíčů
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value === undefined ? key : value;
  };
  
  return t;
}

/**
 * Hook pro použití překladů v client komponentách
 * @param locale Jazykový kód (cs, en)
 */
export function useTranslations(locale: string) {
  return getTranslations(locale);
}