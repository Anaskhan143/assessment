export interface EnvironmentConfig {
  isProduction: boolean;
  cookieSecure: boolean;
  cookieSameSite: 'Lax' | 'Strict' | 'None';
  corsOrigin: string;
  port: number;
}

export function getEnvironmentConfig(): EnvironmentConfig {
  const isProduction = import.meta.env.PROD;
  
  return {
    isProduction,
    cookieSecure: isProduction,
    cookieSameSite: isProduction ? 'Lax' : 'Lax',
    corsOrigin: isProduction ? 'https://yourdomain.com' : 'http://localhost:3000',
    port: parseInt(import.meta.env.VITE_PORT || '3000', 10)
  };
}

export function getCookieAttributes(name: string, value: string, config: EnvironmentConfig): string {
  const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
  const secure = config.cookieSecure ? '; Secure' : '';
  const sameSite = `; SameSite=${config.cookieSameSite}`;
  const httpOnly = '; HttpOnly';
  const path = '; Path=/';
  
  return `${name}=${value}; Max-Age=${maxAge}${secure}${sameSite}${httpOnly}${path}`;
}
