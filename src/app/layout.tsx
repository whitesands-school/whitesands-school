import type { Metadata } from "next";
import { PT_Serif, PT_Sans, Roboto } from "next/font/google";
import { headers } from "next/headers";
import { connection } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { SITE } from "@/lib/site";
import "./globals.css";

export const dynamic = 'force-dynamic';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BfcacheFix } from "@/components/layout/BfcacheFix";
import { PopoverModal } from "@/components/layout/PopoverModal";
import { PageTransition } from "@/components/layout/PageTransition";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { BookVisitTab } from "@/components/ui/BookVisitTab";
import { HeritageStrip } from "@/components/ui/HeritageStrip";
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
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.motto}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  keywords: [
    "Catholic school Lagos",
    "Whitesands School",
    "secondary school Lagos",
    "best school Lekki",
    "Catholic secondary education Nigeria",
    "WAEC results Lagos",
    "Cambridge IGCSE Nigeria",
    "Duc in Altum",
  ],
  openGraph: {
    siteName: SITE.name,
    locale: "en_NG",
    type: "website",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.motto}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.motto}`,
    description: SITE.description,
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      data-scroll-behavior="smooth"
      className={`${ptSerif.variable} ${ptSans.variable} ${roboto.variable} h-full scroll-smooth`}
      style={{ ['--ws-banner-h' as string]: announcement ? '36px' : '0px' }}
    >
      <body className="min-h-full flex flex-col font-sans text-dark bg-white antialiased">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-200 focus:px-4 focus:py-2 focus:bg-lemon focus:text-dark focus:font-roboto focus:font-semibold focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        {!isAdmin && (
          <header className="fixed top-0 inset-x-0 z-50">
            {announcement && (
              <AnnouncementBanner announcement={announcement} />
            )}
            <HeritageStrip />
            <Navbar />
          </header>
        )}
        {isAdmin ? (
          children
        ) : (
          <BfcacheFix>
            {/*
              Header height = HeritageStrip (~36px) + Navbar (h-20 = 80px) = 116px ≈ pt-28.
              Banner height (~36px) is tracked via --ws-banner-h so the padding
              collapses in sync if the user dismisses the banner client-side.
              data-with-banner = visual probe for child components that need to
              know about the banner (e.g. HeroVideo's negative top margin).
            */}
            <main
              id="main-content"
              data-with-banner={!!announcement}
              className="flex-1"
              style={{ paddingTop: 'calc(7rem + var(--ws-banner-h, 0px))' }}
            >
              <PageTransition>{children}</PageTransition>
            </main>
          </BfcacheFix>
        )}
        {!isAdmin && <Footer />}
        {!isAdmin && <BookVisitTab />}
        {popover && <PopoverModal popover={popover} />}
      </body>
    </html>
  );
}
