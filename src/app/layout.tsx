// Import types from Next.js
import type { Metadata } from "next";

// Import Google Font with specific options
import { Poppins } from "next/font/google";

// Import global CSS styles
import "./globals.css";

// Import components and providers
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";

// Configure Google Font
const P = Poppins({
  subsets: ["latin"],
  weight: "300",
});

// Define metadata for the application
export const metadata: Metadata = {
  title: "Job Control",
  description: "Task and client management system.",
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={P.className}>
        {/* Providers for authentication and modal management */}
        <AuthProvider>
          <ModalProvider>
            {/* Header component */}
            <Header />
            {/* Render child components */}
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
