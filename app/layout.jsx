import './globals.css';

export const metadata = {
  title: 'Finance Visualizer',
  description: 'Track your personal finances',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <main className="container py-4">
          {children}
        </main>
      </body>
    </html>
  );
}