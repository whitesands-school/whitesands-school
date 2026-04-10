import type { Metadata } from "next";
import { PT_Serif, PT_Sans, Roboto } from "next/font/google";
import { headers } from "next/headers";
import { connection } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import "./globals.css";

export const dynamic = 'force-dynamic';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BfcacheFix } from "@/components/layout/BfcacheFix";
import { PopoverModal } from "@/components/layout/PopoverModal";
import { PageTransition } from "@/components/layout/PageTransition";
import type { Announcement, SitePopover } from "@/types";

const ptSerif = PT_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const ptSans = PT_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Whitesands School",
    template: "%s — Whitesands School",
  },
  description: "Duc in Altum — Launch into the Deep. A Catholic school in Nigeria committed to academic excellence and holistic formation.",
  openGraph: {
    siteName: "Whitesands School",
    locale: "en_NG",
    type: "website",
    images: [{ url: "/images/logos/whitesands-school-logo.svg", width: 1200, height: 630 }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connection();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const isAdmin = pathname.startsWith('/admin');

  let announcement: Announcement | undefined
  let popover: SitePopover | undefined

  if (!isAdmin) {
    const announcements: Announcement[] = JSON.parse(
      readFileSync(join(process.cwd(), 'src/content/announcements.json'), 'utf-8')
    )
    announcement = announcements.find((a) => a.active)

    const popovers: SitePopover[] = JSON.parse(
      readFileSync(join(process.cwd(), 'src/content/popover.json'), 'utf-8')
    )
    const now = new Date()
    popover = popovers.find(
      (p) => p.active && (!p.expiresAt || new Date(p.expiresAt) >= now)
    )
  }

  return (
    <html
      lang="en"
      className={`${ptSerif.variable} ${ptSans.variable} ${roboto.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans text-dark bg-white antialiased">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-200 focus:px-4 focus:py-2 focus:bg-lemon focus:text-dark focus:font-roboto focus:font-semibold focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        {!isAdmin && <Navbar announcement={announcement} />}
        {isAdmin ? (
          children
        ) : (
          <BfcacheFix>
            <main id="main-content" className="flex-1 pt-25">
              <PageTransition>{children}</PageTransition>
            </main>
          </BfcacheFix>
        )}
        {!isAdmin && <Footer />}
        {popover && <PopoverModal popover={popover} />}
      </body>
    </html>
  );
}
