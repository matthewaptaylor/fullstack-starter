'use client';

import '@/app/main.scss';
import { PropsWithChildren } from 'react';
import { useLocale } from 'react-aria';
import { Inter } from 'next/font/google';
import WithI18nProvider from '@/app/WithI18nProvider';

const inter = Inter({ subsets: ['latin'] });

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  let { locale, direction } = useLocale();

  return (
    <html lang={locale} dir={direction}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default WithI18nProvider(RootLayout);
