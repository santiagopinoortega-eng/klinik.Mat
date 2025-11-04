// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'KLINIK-MAT — Formación clínica digital',
  description: 'Casos clínicos para estudiantes de Obstetricia (Anticoncepción e ITS)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect + Google Fonts stylesheet loaded from the server layout to avoid CSS @import ordering issues */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-800">
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl border border-red-600 flex items-center justify-center">
                <div className="h-4 w-4 rounded-[4px] bg-red-600" />
              </div>
              <div className="leading-tight">
                <p className="font-bold tracking-tight text-red-600">KLINIK-MAT</p>
                <p className="text-[10px] text-gray-500 -mt-0.5">Formación clínica digital</p>
              </div>
            </a>
            <div className="flex items-center gap-4 text-sm">
              <a href="/casos" className="hover:text-red-600">Casos clínicos</a>
              <a href="/about" className="hover:text-red-600">Acerca</a>
            </div>
          </nav>
        </header>
        <main className="mx-auto min-h-[calc(100vh-60px)] max-w-6xl px-6 py-6">
          {children}
        </main>
        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-gray-500">
            © {new Date().getFullYear()} KLINIK-MAT — Obstetricia. Hecho con Next.js + Tailwind.
          </div>
        </footer>
      </body>
    </html>
  );
}

