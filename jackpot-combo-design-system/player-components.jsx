/* global React, JC_DATA */
const { useState, useEffect, useRef } = React;

// ============================================================
// Player components for the inbox prototype
// ============================================================

// ---------- Category badge ----------
window.CategoryBadge = function CategoryBadge({ category, size = 'md' }) {
  const C = JC_DATA.CATEGORIES[category];
  const compact = size === 'sm';
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4,
      background:'rgba(142,102,255,0.08)',
      color: C.color,
      padding: compact ? '2px 8px' : '3px 10px',
      borderRadius: 9999,
      fontSize: compact ? 10 : 11, fontWeight:600, lineHeight:1.2,
      border:`1px solid ${C.color}33`,
    }}>
      <span>{C.icon}</span>
      <span>{C.label}</span>
    </span>
  );
};

// ---------- Inbox icon (header) ----------
window.InboxIcon = function InboxIcon({ unread, onClick, animating }) {
  return (
    <button onClick={onClick} aria-label="Inbox" style={{
      background:'rgba(255,255,255,0.18)', backdropFilter:'blur(10px)',
      border:'1px solid rgba(255,255,255,0.35)', borderRadius:9999,
      width:36, height:36, display:'grid', placeItems:'center',
      cursor:'pointer', position:'relative', padding:0, color:'#fff',
      transition:'transform 200ms',
      transform: animating ? 'scale(1.15)' : 'scale(1)',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/>
      </svg>
      {unread > 0 && (
        <span className="red-dot" style={{
          position:'absolute', top:4, right:4,
          width:10, height:10, borderRadius:'50%',
          background:'#F36DF3',
          border:'2px solid rgba(142,102,255,1)',
          boxShadow:'0 0 0 0 rgba(243,109,243,0.5)',
          animation: animating ? 'pulse 1.2s ease' : 'none',
        }} />
      )}
    </button>
  );
};

// ---------- Player Header ----------
window.PlayerHeader = function PlayerHeader({ balance, unread, onOpenInbox, dotPulse }) {
  return (
    <header style={{
      position:'sticky', top:0, zIndex:20,
      background:'linear-gradient(180deg, #9E74FF 0%, #8A68FF 100%)',
      color:'#fff',
      display:'flex', alignItems:'center', gap:10,
      padding:'12px 16px',
      boxShadow:'0 4px 20px rgba(119,79,255,0.25)',
    }}>
      <img src="assets/logo-mark.png" alt="JC" style={{
        width:32, height:32, borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.25)',
      }} />
      <div style={{display:'flex', flexDirection:'column', lineHeight:1}}>
        <span style={{fontWeight:800, fontSize:13, letterSpacing:'-0.01em'}}>jackpot</span>
        <span style={{fontWeight:500, fontSize:11, opacity:0.85, letterSpacing:'0.02em'}}>combo</span>
      </div>
      <div style={{flex:1}} />
      <div style={{
        background:'rgba(255,255,255,0.18)', backdropFilter:'blur(10px)',
        border:'1px solid rgba(255,255,255,0.35)',
        padding:'5px 12px 5px 14px', borderRadius:9999,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{fontSize:10, opacity:0.8, fontWeight:500}}>₱</span>
        <span style={{fontVariantNumeric:'tabular-nums', fontWeight:700, color:'#FFD74A', fontSize:13, lineHeight:1}}>
          {balance.toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2})}
        </span>
      </div>
      <window.InboxIcon unread={unread} onClick={onOpenInbox} animating={dotPulse} />
    </header>
  );
};

// ---------- Toast ----------
window.MsgToast = function MsgToast({ toast, onDismiss, onOpen }) {
  const C = JC_DATA.CATEGORIES[toast.category];
  if (toast.summary) {
    return (
      <div onClick={onOpen} style={toastShellStyle()}>
        <div style={{
          width:38, height:38, borderRadius:10, flexShrink:0,
          background:'var(--player-gradient-pill)',
          color:'#fff', display:'grid', placeItems:'center', fontSize:18,
        }}>📬</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:11, fontWeight:600, color:'#8E66FF', textTransform:'uppercase', letterSpacing:'0.04em'}}>New messages</div>
          <div style={{fontSize:13, fontWeight:700, color:'#2D1B4E', lineHeight:1.3, marginTop:2}}>You have {toast.count} new messages</div>
          <div style={{fontSize:11, color:'#6B5B8E', marginTop:2}}>Tap to open inbox</div>
        </div>
        <button onClick={(e) => {e.stopPropagation(); onDismiss();}} style={toastCloseStyle()}>×</button>
      </div>
    );
  }
  return (
    <div onClick={onOpen} style={toastShellStyle()}>
      <div style={{
        width:38, height:38, borderRadius:10, flexShrink:0,
        background:`${C.color}1F`,
        color: C.color, display:'grid', placeItems:'center', fontSize:18,
      }}>{C.icon}</div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:10, fontWeight:600, color:C.color, textTransform:'uppercase', letterSpacing:'0.04em'}}>{C.label}</div>
        <div style={{fontSize:13, fontWeight:700, color:'#2D1B4E', lineHeight:1.3, marginTop:2,
          overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{toast.title}</div>
        <div style={{fontSize:11, color:'#6B5B8E', marginTop:2, lineHeight:1.4,
          display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{toast.body}</div>
      </div>
      <button onClick={(e) => {e.stopPropagation(); onDismiss();}} style={toastCloseStyle()}>×</button>
      <div style={{
        position:'absolute', bottom:0, left:0, height:3,
        background:'var(--player-gradient-pill)',
        animation:'toastBar 5s linear forwards',
        borderBottomLeftRadius:14,
      }} />
    </div>
  );
};

function toastShellStyle() {
  return {
    background:'#fff', borderRadius:14, padding:'12px 36px 12px 12px',
    boxShadow:'0 12px 36px -8px rgba(45,27,78,0.28), 0 0 0 1px rgba(142,102,255,0.12)',
    display:'flex', alignItems:'flex-start', gap:12,
    cursor:'pointer', position:'relative', overflow:'hidden',
    pointerEvents:'auto',
  };
}
function toastCloseStyle() {
  return {
    position:'absolute', top:6, right:6,
    width:24, height:24, border:0, background:'transparent',
    color:'#8E7DC0', cursor:'pointer', fontSize:18, lineHeight:1, padding:0,
    borderRadius:6,
  };
}

// ---------- Inbox List Item ----------
window.InboxListItem = function InboxListItem({ msg, onClick }) {
  const C = JC_DATA.CATEGORIES[msg.category];
  const preview = msg.body.replace(/\s+/g, ' ').slice(0, 60);
  return (
    <div onClick={onClick} style={{
      background: msg.unread ? '#fff' : 'rgba(255,255,255,0.55)',
      borderRadius:14,
      padding:'14px 14px 14px 16px',
      boxShadow: msg.unread ? '0 4px 20px -6px rgba(139,102,255,0.18)' : '0 2px 10px -6px rgba(139,102,255,0.10)',
      borderLeft: msg.unread ? `3px solid ${C.color}` : '3px solid transparent',
      display:'flex', gap:12, cursor:'pointer',
      transition:'transform 150ms, box-shadow 150ms',
    }}>
      <div style={{
        width:40, height:40, borderRadius:10, flexShrink:0,
        background: msg.unread ? `${C.color}1F` : 'rgba(142,102,255,0.06)',
        color: C.color, display:'grid', placeItems:'center', fontSize:20,
      }}>{C.icon}</div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, marginBottom:2}}>
          <div style={{
            fontSize:13.5, fontWeight: msg.unread ? 700 : 500,
            color: msg.unread ? '#2D1B4E' : '#6B5B8E',
            lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
          }}>{msg.title}</div>
          {msg.unread && <span style={{
            width:8, height:8, borderRadius:'50%', background:'#F36DF3', flexShrink:0,
          }} />}
        </div>
        <div style={{
          fontSize:11.5, color:'#6B5B8E', lineHeight:1.4, marginBottom:6,
          display:'-webkit-box', WebkitLineClamp:1, WebkitBoxOrient:'vertical', overflow:'hidden',
        }}>{preview}{preview.length >= 50 ? '…' : ''}</div>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span style={{
            fontSize:10, color: C.color, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em',
          }}>{C.label}</span>
          <span style={{width:3, height:3, borderRadius:'50%', background:'#C8B8E5'}} />
          <span style={{fontSize:10.5, color:'#8E7DC0', fontVariantNumeric:'tabular-nums'}}>{msg.fmt}</span>
        </div>
      </div>
    </div>
  );
};

// ---------- Inbox Tabs ----------
window.InboxTabs = function InboxTabs({ tab, setTab, counts }) {
  const tabs = [
    { id:'personal', label:'Personal' },
    { id:'promo',    label:'Promotions' },
    { id:'system',   label:'System' },
  ];
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6,
      padding:'8px', background:'rgba(244,239,250,0.7)',
      borderRadius:9999, margin:'0 0 14px 0',
    }}>
      {tabs.map(t => {
        const active = tab === t.id;
        const n = counts[t.id] || 0;
        return (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            border:0, padding:'9px 10px', borderRadius:9999, cursor:'pointer',
            background: active ? 'var(--player-gradient-pill)' : 'transparent',
            color: active ? '#fff' : '#6B5B8E',
            fontWeight: active ? 700 : 600, fontSize:12,
            fontFamily:'Poppins',
            display:'flex', alignItems:'center', justifyContent:'center', gap:6,
            transition:'all 200ms',
            boxShadow: active ? '0 2px 8px -2px rgba(139,102,255,0.5)' : 'none',
          }}>
            <span>{t.label}</span>
            {n > 0 && (
              <span style={{
                background: active ? 'rgba(255,255,255,0.25)' : '#F36DF3',
                color:'#fff',
                fontSize:9.5, fontWeight:700,
                minWidth:16, height:16, padding:'0 5px',
                borderRadius:9999,
                display:'grid', placeItems:'center', lineHeight:1,
              }}>{n}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// ---------- Message Detail ----------
window.MsgDetail = function MsgDetail({ msg, onClose, onCtaClick }) {
  const C = JC_DATA.CATEGORIES[msg.category];
  return (
    <div style={{
      background:'#fff', borderRadius:20, overflow:'hidden',
      boxShadow:'0 12px 40px -10px rgba(45,27,78,0.25)',
    }}>
      {/* Header */}
      <div style={{
        background:'var(--player-gradient-banner)', color:'#fff',
        padding:'18px 18px 22px', position:'relative',
      }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8}}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            background:'rgba(255,255,255,0.22)', padding:'4px 10px', borderRadius:9999,
            fontSize:11, fontWeight:600,
          }}>
            <span>{C.icon}</span>
            <span>{C.label}</span>
          </div>
          <button onClick={onClose} style={{
            background:'rgba(255,255,255,0.22)', border:0, color:'#fff',
            width:30, height:30, borderRadius:'50%', cursor:'pointer', fontSize:16, lineHeight:1,
            padding:0, display:'grid', placeItems:'center',
          }}>←</button>
        </div>
        <div style={{fontSize:18, fontWeight:700, marginTop:14, lineHeight:1.3, textWrap:'pretty'}}>{msg.title}</div>
        <div style={{fontSize:11, opacity:0.85, marginTop:6, fontVariantNumeric:'tabular-nums'}}>
          {msg.fmt} · ID {msg.id}
        </div>
      </div>
      {/* Body */}
      <div style={{padding:'18px'}}>
        <div style={{
          fontSize:14, color:'#2D1B4E', lineHeight:1.6, whiteSpace:'pre-wrap', textWrap:'pretty',
        }}>{msg.body}</div>
        {msg.cta && (
          <button onClick={() => onCtaClick(msg)} style={{
            marginTop:18, width:'100%',
            background:'var(--player-gradient-cta)', color:'#fff',
            border:0, padding:'13px 16px', borderRadius:9999,
            fontSize:14, fontWeight:700, cursor:'pointer',
            fontFamily:'Poppins',
            boxShadow:'0 4px 14px -4px rgba(139,102,255,0.6)',
            display:'flex', alignItems:'center', justifyContent:'center', gap:6,
          }}>
            {msg.cta.label} →
          </button>
        )}
        <div style={{
          marginTop:14, padding:'10px 14px',
          background:'rgba(244,239,250,0.7)', borderRadius:10,
          fontSize:11, color:'#8E7DC0', display:'flex', alignItems:'center', gap:6,
        }}>
          <span>✅</span>
          <span>Read at {new Date().toLocaleString('en-PH',{hour:'2-digit',minute:'2-digit'})} · Marked automatically</span>
        </div>
      </div>
    </div>
  );
};

// ---------- Empty state ----------
window.EmptyTab = function EmptyTab({ tab }) {
  const map = {
    personal: { icon:'💬', text:'No personal messages yet' },
    promo:    { icon:'🎁', text:'No promotions yet — stay tuned' },
    system:   { icon:'📢', text:'No system announcements' },
  };
  const m = map[tab];
  return (
    <div style={{
      padding:'40px 20px', textAlign:'center', color:'#8E7DC0',
    }}>
      <div style={{fontSize:48, marginBottom:8, opacity:0.6}}>{m.icon}</div>
      <div style={{fontSize:13, fontWeight:500}}>{m.text}</div>
    </div>
  );
};
