// src/app/layout.tsx

import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = {
  title: 'SaaS Factory',
  description: 'Factory for building SaaS applications',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
