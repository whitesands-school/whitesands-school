import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Whitesands School — Duc in Altum';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundImage:
            'linear-gradient(135deg, #2C246B 0%, #1A1530 100%)',
          color: 'white',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 36,
              height: 2,
              background: '#FFF700',
            }}
          />
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#FFF700',
              fontFamily: 'sans-serif',
            }}
          >
            Whitesands School · Lagos
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Launching minds
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: -2,
              fontStyle: 'italic',
              color: '#FFF700',
            }}
          >
            into the deep.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'sans-serif',
              maxWidth: 880,
            }}
          >
            A secondary school for boys in Lekki, Lagos · Est. 2000
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'sans-serif',
            fontSize: 18,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          <div>whitesands.org.ng</div>
          <div style={{ fontStyle: 'italic', color: '#FFF700' }}>Duc in Altum</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
