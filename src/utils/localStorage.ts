export const saveTheme = (theme: string) => {
  localStorage.setItem('appTheme', theme);
};

export const getTheme = (): string => {
  if (typeof window === 'undefined') return 'system';

  return localStorage.getItem('appTheme') || 'system';
};
