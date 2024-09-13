import localFont from "next/font/local";
import "./globals.css";



export const metadata = {
  title: "Your Handyman",
  description: "Juan Ososrio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body

      >
        {children}
      </body>
    </html>
  );
}
