import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Curriculym",
    template: "%s · Curriculym",
  },
  description:
    "All-in-one multi-tenant school management — IB, AP, IGCSE, A Level, and more in a macOS workspace.",
  icons: {
    icon: [
      {
        url: "/curriculym-logo.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/curriculym-logo-dark.png",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-full font-sans antialiased">
        <ClerkProvider appearance={{ theme: shadcn }}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
