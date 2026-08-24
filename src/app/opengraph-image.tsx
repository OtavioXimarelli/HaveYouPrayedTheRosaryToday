import {ImageResponse} from 'next/og';

export const alt = 'Evangelizae — oração para a vida cotidiana';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        background: '#1d2927',
        color: '#fff8eb',
        padding: '72px 88px',
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 780}}>
        <div style={{display: 'flex', color: '#d7b169', fontSize: 24, letterSpacing: 6, textTransform: 'uppercase'}}>
          Oração católica, sem ruído
        </div>
        <div style={{display: 'flex', fontFamily: 'Georgia, serif', fontSize: 82, lineHeight: 1.02, letterSpacing: -3}}>
          Um lugar simples para voltar a Deus todos os dias.
        </div>
        <div style={{display: 'flex', color: '#d6d2c8', fontSize: 27}}>
          Rosário guiado e liturgia diária · gratuito e de código aberto
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          width: 230,
          height: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(215,177,105,.38)',
          borderRadius: '115px 115px 12px 12px',
        }}
      >
        <div style={{position: 'absolute', width: 24, height: 210, borderRadius: 20, background: '#d7b169'}} />
        <div style={{position: 'absolute', width: 150, height: 24, borderRadius: 20, background: '#d7b169', transform: 'translateY(-42px)'}} />
      </div>
    </div>,
    size,
  );
}
