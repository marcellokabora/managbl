import "./globals.css";
import { StepperProvider } from "@/app/context/StepperContext";
import ClientLayout from "@/app/components/ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <StepperProvider>
          <ClientLayout>{children}</ClientLayout>
        </StepperProvider>
      </body>
    </html>
  );
}
