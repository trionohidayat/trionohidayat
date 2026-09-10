import { ImageResponse } from 'next/og';

export const alt = 'Triono Hidayat - GovTech & Full-Stack Solutions Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 70px',
          backgroundColor: '#090a0f',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
          fontFamily: 'system-ui, sans-serif',
          color: '#ffffff',
        }}
      >
        {/* Top Header Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '9999px',
              padding: '8px 20px',
              color: '#34d399',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            AVAILABLE FOR FREELANCE &amp; CONTRACT
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#94a3b8',
              fontSize: '18px',
              fontFamily: 'monospace',
            }}
          >
            trionohidayat.my.id
          </div>
        </div>

        {/* Main Pitch / Hero Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '62px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#ffffff',
            }}
          >
            Triono Hidayat
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: '#60a5fa',
              letterSpacing: '-0.01em',
            }}
          >
            GovTech &amp; Full-Stack Solutions Developer
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Turning complex operational workflows into high-performance Next.js web applications, native Android solutions, and n8n automations.
          </div>
        </div>

        {/* Bottom Highlights & Metrics Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '32px',
          }}
        >
          {/* Tech Badges */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Next.js 16', 'React 19', 'n8n Automation', 'Android Native', 'RFID / WMS'].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    padding: '8px 16px',
                    fontSize: '16px',
                    color: '#e2e8f0',
                    fontWeight: 500,
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>

          {/* Metric */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              padding: '10px 20px',
            }}
          >
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#60a5fa' }}>8+ Years</span>
            <span style={{ fontSize: '16px', color: '#cbd5e1' }}>Experience</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
