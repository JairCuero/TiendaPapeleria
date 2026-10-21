import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OFFIEXPRESS | Papelería para tus ideas",
  description:
    "Encuentra útiles de papelería y oficina para estudiar, crear y trabajar mejor.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
