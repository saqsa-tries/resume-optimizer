import './globals.css';

export const metadata = {
  title: 'Resume Optimizer',
  description: 'AI-powered resume optimization tool',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
