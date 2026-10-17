import { ImageResponse } from 'next/og';

export const alt = 'Sudokuing — Free Sudoku Online';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Looks like a classic board in progress: digits are givens, dots are empty cells.
const GIVENS =
  '5.4.78.9.' +
  '.7.1.5.4.' +
  '198.4.5..' +
  '8..76..23' +
  '.2.8537..' +
  '7.3.24.8.' +
  '9.1.372..' +
  '.87..963.' +
  '3.5.8.179';

const PALETTE = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7'];

export default function Image() {
  const rows = Array.from({ length: 9 }, (_, r) =>
    Array.from({ length: 9 }, (_, c) => GIVENS[r * 9 + c])
  );

  const board = rows.map((row, r) => (
    <div key={r} style={{ display: 'flex', marginBottom: r % 3 === 2 && r !== 8 ? 6 : 0 }}>
      {row.map((cell, c) => {
        const color = PALETTE[(r + c) % PALETTE.length];
        return (
          <div
            key={c}
            style={{
              display: 'flex',
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: c % 3 === 2 && c !== 8 ? 6 : 0,
              border: '1px solid #334155',
              borderRadius: 4,
              backgroundColor: cell === '.' ? '#0f172a' : '#1e293b',
              color: cell === '.' ? 'transparent' : color,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {cell}
          </div>
        );
      })}
    </div>
  ));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 560 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>Sudokuing</div>
          <div style={{ marginTop: 16, fontSize: 40, color: '#94a3b8' }}>Free Sudoku Online</div>
          <div style={{ marginTop: 24, fontSize: 28, color: '#64748b' }}>
            Classic · Alphabet · Color — Easy to Crazy
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 24,
            borderRadius: 16,
            backgroundColor: '#0f172a',
          }}
        >
          {board}
        </div>
      </div>
    ),
    { ...size }
  );
}
