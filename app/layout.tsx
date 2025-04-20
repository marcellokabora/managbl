import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StepperProvider } from "@/app/context/StepperContext";
import ClientLayout from "@/app/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <StepperProvider>
          <ClientLayout>{children}</ClientLayout>
        </StepperProvider>
      </body>
    </html>
  );
}
