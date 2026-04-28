/* global React */
const { useState, useEffect } = React;

// ============================================================
// Chrome — Figma-faithful header + floating glass tab bar
// Ref: /1.2_JC-Lobby/Mobile (node 2844:5411)
// ============================================================
window.Chrome = function Chrome({ page, setPage, balance, unread, onOpenGiftBox, giftOpen }) {
  return (
    <>
      {/* ── Header: purple brand band with mark + balance pill ── */}
      <header style={{
        position:'sticky', top:0, zIndex:20,
        background:'linear-gradient(180deg, #9E74FF 0%, #8A68FF 100%)',
        color:'#fff',
        display:'flex', alignItems:'center', gap:10,
        padding:'10px 14px 12px',
        boxShadow:'0 4px 20px rgba(119,79,255,0.25)',
      }}>
        <div onClick={() => setPage('home')} style={{display:'flex', alignItems:'center', gap:8, cursor:'pointer'}}>
          <img src="../../assets/logo-mark.png" alt="JC" style={{
            width:32, height:32, borderRadius:8,
            boxShadow:'0 2px 8px rgba(0,0,0,0.25)',
            imageRendering:'-webkit-optimize-contrast'
          }} />
          <div style={{display:'flex', flexDirection:'column', lineHeight:1}}>
            <span style={{fontWeight:800, fontSize:13, letterSpacing:'-0.01em'}}>jackpot</span>
            <span style={{fontWeight:500, fontSize:11, opacity:0.85, letterSpacing:'0.02em'}}>combo</span>
          </div>
        </div>
        <div style={{flex:1}} />

        {/* Balance pill — glassy on purple */}
        <div style={{
          background:'rgba(255,255,255,0.18)',
          backdropFilter:'blur(10px)',
          border:'1px solid rgba(255,255,255,0.35)',
          padding:'5px 12px 5px 14px', borderRadius:9999,
          display:'flex', alignItems:'center', gap:8,
        }}>
          <span style={{fontSize:10, opacity:0.8, fontWeight:500}}>₱</span>
          <span style={{fontVariantNumeric:'tabular-nums', fontWeight:700, color:'#FFD74A', fontSize:13, lineHeight:1}}>
            {balance.toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2})}
          </span>
        </div>

        <button onClick={onOpenGiftBox} style={{
          background:'rgba(255,255,255,0.18)', backdropFilter:'blur(10px)',
          border:'1px solid rgba(255,255,255,0.35)', borderRadius:9999,
          width:32, height:32, display:'grid', placeItems:'center',
          cursor:'pointer', position:'relative', padding:0, color:'#fff'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
          </svg>
          {unread > 0 && !giftOpen && (
            <span style={{
              position:'absolute', top:-3, right:-3,
              background:'#F36DF3', color:'#fff',
              borderRadius:9999, minWidth:16, height:16, fontSize:9, fontWeight:700,
              display:'grid', placeItems:'center', padding:'0 4px', border:'1.5px solid #fff',
              lineHeight:1
            }}>{unread}</span>
          )}
        </button>
      </header>

      {/* ── Bottom tab bar: dark rounded-top, glassy purple glow, center FAB ── */}
      <nav style={{
        position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)',
        width:'100%', maxWidth:440, zIndex:20,
        pointerEvents:'none',
      }}>
        {/* Outer glow layer */}
        <div style={{
          position:'absolute', left:0, right:0, bottom:0, height:80,
          borderRadius:'34px 34px 0 0',
          background:'linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.88) 50%, rgba(255,255,255,0.42) 100%)',
          backdropFilter:'blur(14px)',
          boxShadow:'0 -10px 24px rgba(124,150,255,0.3)',
        }} />
        {/* Dark base */}
        <div style={{
          position:'relative',
          height:70,
          borderRadius:'34px 34px 0 0',
          background:'#1A1330',
          overflow:'hidden',
          pointerEvents:'auto',
        }}>
          {/* Purple/blue inner glow */}
          <div style={{
            position:'absolute', inset:0,
            background:'radial-gradient(ellipse at 50% 0%, rgba(132,103,255,0.55) 0%, rgba(116,217,246,0.15) 40%, transparent 70%)',
          }} />
          {/* Top highlight line */}
          <div style={{
            position:'absolute', top:0, left:20, right:20, height:1,
            background:'linear-gradient(90deg, transparent, rgba(176,153,251,0.6), transparent)',
          }} />

          {/* Tabs */}
          <div style={{
            position:'relative', height:'100%',
            display:'grid', gridTemplateColumns:'1fr 1fr 72px 1fr 1fr',
            alignItems:'center',
          }}>
            <TabBtn id="home" page={page} setPage={setPage} label="Home" unread={0}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-8.5Z"/>
              </svg>
            </TabBtn>
            <TabBtn id="promo" page={page} setPage={setPage} label="Promo" unread={0}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 21V7"/>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
              </svg>
            </TabBtn>
            {/* Spacer — FAB sits above */}
            <div />
            <TabBtn id="news" page={page} setPage={setPage} label="News" unread={unread > 0 ? unread : 0}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4h12a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a2 2 0 0 1 2-2Z"/>
                <path d="M8 8h8M8 12h8M8 16h5"/>
              </svg>
            </TabBtn>
            <TabBtn id="records" page={page} setPage={setPage} label="My" unread={0}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>
              </svg>
            </TabBtn>
          </div>
        </div>

        {/* Deposit FAB — overlaps the bar center */}
        <button
          onClick={() => setPage('deposit')}
          style={{
            position:'absolute', left:'50%', top:-8, transform:'translateX(-50%)',
            width:62, height:62, borderRadius:'50%',
            border:'3px solid #fff',
            background:'linear-gradient(180deg, #74D9F6 0%, #8086FD 26%, #8467FF 50%, #AA70FF 75%, #C878FF 100%)',
            boxShadow:'0 6px 14px rgba(132,103,255,0.45), inset 0 2px 4px rgba(255,255,255,0.35)',
            cursor:'pointer', padding:0,
            display:'grid', placeItems:'center',
            pointerEvents:'auto',
            color:'#fff',
          }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="14" rx="2"/>
            <path d="M2 10h20"/>
            <path d="M12 14v4M10 16h4"/>
          </svg>
        </button>
        <div style={{
          position:'absolute', left:'50%', top:56, transform:'translateX(-50%)',
          fontSize:11, fontWeight:700, color:'#2D2F2E', fontFamily:'Poppins',
          pointerEvents:'none', letterSpacing:'-0.01em',
        }}>Deposit</div>
      </nav>
    </>
  );
};

// Inline tab button — active state = white icon/text, inactive = muted lavender
function TabBtn({ id, page, setPage, label, unread, children }) {
  const active = page === id;
  return (
    <button onClick={() => setPage(id)} style={{
      background:'none', border:0, cursor:'pointer',
      padding:'0 4px', height:'100%',
      display:'flex', flexDirection:'column', alignItems:'center', gap:3,
      color: active ? '#fff' : 'rgba(217,213,245,0.75)',
      fontFamily:'Poppins',
      position:'relative',
    }}>
      <div style={{position:'relative'}}>
        {children}
        {unread > 0 && (
          <span style={{
            position:'absolute', top:-4, right:-8,
            background:'#F36DF3', color:'#fff',
            borderRadius:9999, minWidth:15, height:15, fontSize:8.5, fontWeight:700,
            display:'grid', placeItems:'center', padding:'0 4px', border:'1.5px solid #1A1330',
            lineHeight:1
          }}>{unread}</span>
        )}
      </div>
      <span style={{fontSize:10.5, fontWeight: active ? 700 : 500, letterSpacing:'-0.005em'}}>{label}</span>
      {active && (
        <div style={{
          position:'absolute', top:4, left:'50%', transform:'translateX(-50%)',
          width:32, height:32, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(176,153,251,0.45) 0%, transparent 70%)',
          pointerEvents:'none',
        }} />
      )}
    </button>
  );
}
