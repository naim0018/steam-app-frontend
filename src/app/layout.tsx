import React from 'react';

import Navbar from '@/components/ui/Navbar';
import '../app/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Steam Games Explorer',
  description: 'Browse and search Steam games',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
