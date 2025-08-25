import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';

export default function Root() {
  const { t } = useTranslation();

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

  return (
    <div style={{ minHeight: '100vh', color: 'var(--foreground)' }}>
      <Header />
      <main style={{ padding: '1.5rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>{t('home.subtitle')}</p>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }}>{t('home.description')}</p>
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
