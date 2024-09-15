// import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Servicios Osorio",
  description: "Juan Osorio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Metaetiqueta viewport para asegurar responsividad */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
