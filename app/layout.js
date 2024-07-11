import '@/styles/globals.css';

export const metadata = {
  title: 'English to Tamil Translator',
  description: 'Translate English text to Tamil with preserved technical terms',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}