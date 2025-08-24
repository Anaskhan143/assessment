import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'es';

function Header() {
  const { t } = useTranslation();
  const [appearance, setAppearance] = useState<Theme>('system');
  const [language, setLanguage] = useState<Language>('en');

  // Handle theme change
  const handleThemeChange = (theme: string) => {
    const themeValue = theme as Theme;
    setAppearance(themeValue);
    
    // Save to cookie
    document.cookie = `theme=${themeValue}; path=/; max-age=${365 * 24 * 60 * 60}`;
    
    // Apply theme immediately
    applyTheme(themeValue);
  };

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    const languageValue = lang as Language;
    setLanguage(languageValue);
    
    // Save to cookie
    document.cookie = `language=${languageValue}; path=/; max-age=${365 * 24 * 60 * 60}`;
    
    // Change language immediately
    import('@/i18n/i18n').then(({ default: i18n }) => {
      i18n.changeLanguage(languageValue);
    });
  };

  // Initialize from cookies on mount
  useEffect(() => {
    const themeCookie = getCookie('theme') as Theme;
    const languageCookie = getCookie('language') as Language;
    
    if (themeCookie) {
      setAppearance(themeCookie);
      applyTheme(themeCookie);
    }
    
    if (languageCookie) {
      setLanguage(languageCookie);
      import('@/i18n/i18n').then(({ default: i18n }) => {
        i18n.changeLanguage(languageCookie);
      });
    }
  }, []);



  const themeLabels = {'light': t('common.light'), 'dark': t('common.dark'), 'system': t('common.system')};
  const languages = ['en', 'es'];

  return (
    <header>
      <div className="brand">
        <h1>{t('home.title')}</h1>
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger data-testid="theme-trigger" className="dropdown-trigger">
            {themeLabels[appearance]}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={appearance} onValueChange={handleThemeChange}>
              {(Object.keys(themeLabels) as Theme[]).map((theme) => (
                <DropdownMenuRadioItem key={theme} value={theme}>
                  {themeLabels[theme]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger data-testid="language-trigger" className="dropdown-trigger">
            {language === 'en' ? t('common.english') : t('common.spanish')}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
              {languages.map((lang) => (
                <DropdownMenuRadioItem key={lang} value={lang}>
                  {lang === 'en' ? t('common.english') : t('common.spanish')}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

// Cookie utility functions
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function applyTheme(theme: string): void {
  if (typeof document === 'undefined') return;
  
  const isDark = theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  document.documentElement.classList.toggle('dark', isDark);
}

export default Header
