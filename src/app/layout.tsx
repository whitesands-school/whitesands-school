import type { Metadata } from "next";
import { PT_Serif, PT_Sans, Roboto } from "next/font/google";
import { headers } from "next/headers";
import { connection } from "next/server";
import { SITE } from "@/lib/site";
import { readContent } from "@/lib/content-store";
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
    default: `${SITE.name} — Secondary School for Boys in Lekki, Lagos`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  keywords: [
    "boys school Lekki",
    "all-boys secondary school Lagos",
    "Catholic school Lagos",
    "Whitesands School",
    "best boys school in Nigeria",
    "secondary school Lekki Phase 1",
    "best school Lekki",
    "Catholic secondary education Nigeria",
    "WAEC results Lagos",
    "Duc in Altum",
  ],
  openGraph: {
    siteName: SITE.name,
    locale: "en_NG",
    type: "website",
    url: SITE.url,
    title: `${SITE.name} — Duc in Altum`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.motto}`,
    description: SITE.description,
  },
  // No site-wide canonical: setting one here would be inherited by every
  // child route and mark them all as duplicates of the homepage.
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
  const isAdmin =
    pathname.startsWith('/admin') || pathname.startsWith('/super-admin');

  let announcement: Announcement | undefined
  let popover: SitePopover | undefined

  if (!isAdmin) {
    const announcements = await readContent<Announcement[]>('announcements')
    announcement = announcements.find((a) => a.active)

    const popovers = await readContent<SitePopover[]>('popover')
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
      {/* pb-11 reserves space for the fixed mobile Book-a-Visit bar so it
          never covers the footer or a form's last field; the bar is lg-hidden
          so the padding collapses on desktop. Admin pages render without it. */}
      <body
        className={`min-h-full flex flex-col font-sans text-dark bg-white antialiased ${
          isAdmin ? '' : 'pb-11 lg:pb-0'
        }`}
      >
        {/* React hoists these to <head>. Every image comes from ImageKit and
            every video from Cloudinary — warming both connections shaves
            DNS+TLS time off the LCP image request. */}
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
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
        {!isAdmin && <Footer showClosingCta={pathname !== '/fees-portal'} />}
        {!isAdmin && <BookVisitTab />}
        {popover && <PopoverModal popover={popover} />}
      </body>
    </html>
  );
}
