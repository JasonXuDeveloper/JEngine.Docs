import { ImageResponse } from 'next/og';
import { source } from '@/lib/source';
import { notFound } from 'next/navigation';

// Use Node.js runtime for compatibility with source loader

export async function GET(request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '60px 80px',
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ color: '#10b981' }}>⚡</span>
            JEngine Docs
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: '20px',
            maxWidth: '900px',
          }}
        >
          {page.data.title}
        </div>

        {/* Description */}
        {page.data.description && (
          <div
            style={{
              fontSize: '24px',
              color: '#a1a1aa',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            {page.data.description}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            right: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              color: '#52525b',
            }}
          >
            Unity Hot Update Framework
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#52525b',
            }}
          >
            jengine.dev
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

// Note: generateStaticParams removed as it's incompatible with edge runtime
// OG images will be generated on-demand
