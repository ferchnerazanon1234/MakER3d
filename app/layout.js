export const metadata = {
  title: 'Tienda 3D Personalizada - Bambu Lab P1S',
  description: 'Impresiones 3D profesionales y acabados artesanales',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
