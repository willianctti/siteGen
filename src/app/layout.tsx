import './globals.css'

export const metadata = {
  title: 'Site Generator - Crie sites profissionais',
  description: 'Ferramenta para geração rápida de sites profissionais',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}