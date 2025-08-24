import { Outlet, useActionData } from 'react-router';
import { useEffect } from 'react';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';

export default function Root() {
  const { t } = useTranslation();
  const actionData = useActionData() as { theme?: string; language?: string } | undefined;

  useEffect(() => {
    // Initialize theme on client side
    const theme = getCookie('theme') || 'system';
    const language = getCookie('language') || 'en';
    
    // Apply theme
    applyTheme(theme);
    
    // Apply language
    if (typeof window !== 'undefined') {
      import('@/i18n/i18n').then(({ default: i18n }) => {
        i18n.changeLanguage(language);
      });
    }
  }, []);

  // Update from action data
  useEffect(() => {
    if (actionData?.theme) {
      applyTheme(actionData.theme);
    }
    if (actionData?.language) {
      import('@/i18n/i18n').then(({ default: i18n }) => {
        i18n.changeLanguage(actionData.language);
      });
    }
  }, [actionData]);

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{t('home.title')}</h1>
          <p className="text-xl mb-6 text-muted-foreground">{t('home.subtitle')}</p>
          <p className="text-lg leading-relaxed">{t('home.description')}</p>
        </div>
      </main>
      <Outlet />
    </div>
  );
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
