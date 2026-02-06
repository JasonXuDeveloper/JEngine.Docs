import type { ReactNode } from 'react';

// This layout just passes through to child layouts
// The actual HTML structure is in /[lang]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
