'use client';

/**
 * Last-resort boundary — catches errors thrown by the root layout itself.
 * Renders without globals.css or fonts, so everything is inlined.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8F8F4',
          color: '#1A1530',
          fontFamily: 'Georgia, "Times New Roman", serif',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <p
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 11,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#DD251D',
              margin: 0,
            }}
          >
            Whitesands School
          </p>
          <h1
            style={{
              fontSize: 'clamp(28px, 6vw, 44px)',
              lineHeight: 1.1,
              color: '#2C246B',
              margin: '20px 0 0',
              fontWeight: 400,
            }}
          >
            Something went wrong<span style={{ fontStyle: 'italic' }}>.</span>
          </h1>
          <p
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
              color: 'rgba(26,21,48,0.7)',
              margin: '18px 0 0',
            }}
          >
            An unexpected error occurred. Please try again — if it persists,
            email info@whitesands.org.ng.
            {error?.digest ? ` (Ref: ${error.digest})` : ''}
          </p>
          <div style={{ marginTop: 32 }}>
            <button
              onClick={unstable_retry}
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: '#2C246B',
                color: '#fff',
                border: 0,
                padding: '14px 32px',
                cursor: 'pointer',
                marginRight: 12,
              }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages --
                the app shell has crashed; a full-page load is the point */}
            <a
              href="/"
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#2C246B',
                border: '1px solid rgba(44,36,107,0.35)',
                padding: '13px 32px',
                display: 'inline-block',
                textDecoration: 'none',
              }}
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
