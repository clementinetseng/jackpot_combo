/* global React, ReactDOM, JC_DATA */
const { useState, useEffect, useRef, useCallback } = React;

// ============================================================
// Player App — phone frame with inbox, toasts, WS simulator
// ============================================================

window.PlayerApp = function PlayerApp({ tweaks, onPushFromOutside }) {
  const [messages, setMessages] = useState(() => JC_DATA.seedMessages.map(m => ({...m})));
  const [view, setView] = useState('lobby'); // lobby | inbox | detail
  const [tab, setTab] = useState('personal');
  const [activeMsg, setActiveMsg] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [dotPulse, setDotPulse] = useState(false);
  const seqRef = useRef(2000);

  const balance = 12540;

  const unread = messages.filter(m => m.unread).length;
  const counts = {
    personal: messages.filter(m => m.category === 'personal' && m.unread).length,
    promo:    messages.filter(m => m.category === 'promo'    && m.unread).length,
    system:   messages.filter(m => m.category === 'system'   && m.unread).length,
  };

  // Push a new message (simulating WS)
  const pushNew = useCallback((tplId, vars = JC_DATA.SEED_VARS) => {
    const tpl = JC_DATA.TEMPLATES.find(t => t.id === tplId);
    if (!tpl) return;
    const r = JC_DATA.render(tpl, vars);
    const id = 'M-' + (++seqRef.current);
    const newMsg = {
      id, title:r.title, body:r.body, cta:r.cta,
      category:r.category, toast:r.toast, eventId:r.eventId,
      unread:true, receivedAt:new Date().toISOString(), fmt:'Just now',
      source:'event',
    };
    setMessages(prev => [newMsg, ...prev]);

    // Pulse the dot
    setDotPulse(true);
    setTimeout(() => setDotPulse(false), 1200);

    // Toast only for messages flagged toast=true (and only personal per PRD §5.4)
    // PRD: only personal category triggers toast — promo/system never do
    if (newMsg.toast && newMsg.category === 'personal' && tweaks.toastsEnabled) {
      addToast({ ...newMsg, kind:'msg' });
    }
  }, [tweaks.toastsEnabled]);

  // Expose pushNew to outside (Tweaks WS sim panel)
  useEffect(() => { if (onPushFromOutside) onPushFromOutside(pushNew); }, [pushNew]);

  // Toast queue logic — max N visible, summarize the rest
  function addToast(t) {
    setToasts(prev => {
      const max = tweaks.maxToasts;
      const visible = prev.filter(x => !x.summary);
      const id = 't-' + Date.now() + '-' + Math.random();
      if (visible.length < max) {
        const next = [...prev.filter(x => !x.summary), { ...t, id }];
        // auto-dismiss
        setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), 5000);
        return next;
      }
      // Replace overflow with summary
      const summary = prev.find(x => x.summary);
      if (summary) {
        const updated = prev.map(x => x.summary ? { ...x, count: x.count + 1 } : x);
        return updated;
      }
      const sumId = 't-sum-' + Date.now();
      const sum = { id: sumId, summary:true, count: 2 };
      setTimeout(() => setToasts(p => p.filter(x => x.id !== sumId)), 8000);
      return [...prev.filter(x => !x.summary), sum];
    });
  }

  function dismissToast(id) {
    setToasts(prev => prev.filter(x => x.id !== id));
  }
  function openToast(t) {
    if (t.summary) {
      setView('inbox'); setTab('personal');
    } else {
      const m = messages.find(x => x.id === t.id) || t;
      openMessage(m);
    }
    dismissToast(t.id);
  }

  function openMessage(msg) {
    setMessages(prev => prev.map(m => m.id === msg.id ? {...m, unread:false} : m));
    setActiveMsg({...msg, unread:false});
    setView('detail');
  }

  // Filtered list per tab + 90-day window (all seed within window)
  const tabMessages = messages.filter(m => {
    if (tab === 'personal') return m.category === 'personal';
    if (tab === 'promo')    return m.category === 'promo';
    if (tab === 'system')   return m.category === 'system';
    return true;
  });

  // Phone frame
  return (
    <div style={{
      width:420, height:780,
      background:'var(--player-gradient-page)',
      borderRadius:38, overflow:'hidden', position:'relative',
      boxShadow:'0 20px 60px -10px rgba(45,27,78,0.4), 0 0 0 10px #1a1330, 0 0 0 12px #2d1b4e',
      fontFamily:'Poppins',
      display:'flex', flexDirection:'column',
    }}>
      <window.PlayerHeader balance={balance} unread={unread}
        onOpenInbox={() => { setView('inbox'); }} dotPulse={dotPulse} />

      {/* Body */}
      <div style={{flex:1, overflow:'auto', position:'relative'}}>
        {view === 'lobby' && <LobbyView setView={setView} setTab={setTab} unread={unread} pushNew={pushNew} />}
        {view === 'inbox' && (
          <InboxView
            tab={tab} setTab={setTab} counts={counts}
            messages={tabMessages}
            onOpenMessage={openMessage}
            onClose={() => setView('lobby')}
          />
        )}
        {view === 'detail' && activeMsg && (
          <DetailView msg={activeMsg} onClose={() => setView('inbox')}
            onCtaClick={() => alert('Navigate: ' + activeMsg.cta.url)} />
        )}
      </div>

      {/* Toast stack */}
      <div style={{
        position:'absolute', right:12, bottom:14, left:12,
        display:'flex', flexDirection:'column', gap:8,
        pointerEvents:'none', zIndex:50,
      }}>
        {toasts.map((t, i) => (
          <div key={t.id} style={{
            animation:'toastIn 280ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            transformOrigin:'bottom right',
          }}>
            <window.MsgToast toast={t} onDismiss={() => dismissToast(t.id)}
              onOpen={() => openToast(t)} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- Lobby placeholder ----------
function LobbyView({ setView, setTab, unread, pushNew }) {
  return (
    <div style={{padding:'16px'}}>
      <div style={{
        background:'var(--player-gradient-banner)', color:'#fff',
        borderRadius:20, padding:'20px', boxShadow:'0 8px 24px -8px rgba(139,102,255,0.4)',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{position:'absolute', top:-30, right:-20, width:160, height:160,
          background:'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)'}} />
        <div style={{fontSize:11, opacity:0.85, fontWeight:500}}>Total Balance</div>
        <div style={{fontSize:30, fontWeight:800, color:'#FFC107', letterSpacing:'-0.02em', lineHeight:1.1, fontVariantNumeric:'tabular-nums'}}>
          ₱12,540.00
        </div>
        <div style={{fontSize:11, opacity:0.9, marginTop:6}}>
          Ready to withdraw: <strong>₱8,200.00</strong>
        </div>
      </div>

      <div style={{
        marginTop:16, background:'#fff', borderRadius:14, padding:'16px',
        boxShadow:'var(--shadow-card)',
      }}>
        <div style={{fontSize:13, fontWeight:700, color:'#2D1B4E', marginBottom:8,
          display:'flex', alignItems:'center', gap:6}}>
          📬 Inbox preview
        </div>
        <div style={{fontSize:12, color:'#6B5B8E', marginBottom:12, lineHeight:1.5}}>
          {unread > 0
            ? <>You have <strong style={{color:'#8E66FF'}}>{unread} unread</strong> {unread === 1 ? 'message' : 'messages'}.</>
            : <>You're all caught up 🎉</>}
        </div>
        <button onClick={() => setView('inbox')} style={{
          width:'100%', background:'var(--player-gradient-cta)', color:'#fff',
          border:0, padding:'11px', borderRadius:9999, fontSize:13, fontWeight:700,
          cursor:'pointer', fontFamily:'Poppins',
          boxShadow:'0 4px 14px -4px rgba(139,102,255,0.6)',
        }}>Open Inbox</button>
      </div>

      <div style={{
        marginTop:14, padding:'12px 14px',
        background:'rgba(255,255,255,0.6)', borderRadius:14,
        border:'1px dashed rgba(142,102,255,0.35)',
        fontSize:11, color:'#6B5B8E', lineHeight:1.5,
      }}>
        <strong style={{color:'#8E66FF'}}>WebSocket simulator</strong> — use the Tweaks panel on the right side to push events into this inbox in real time.
      </div>
    </div>
  );
}

// ---------- Inbox view ----------
function InboxView({ tab, setTab, counts, messages, onOpenMessage, onClose }) {
  return (
    <div style={{padding:'12px 14px 70px'}}>
      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
        <button onClick={onClose} style={{
          background:'rgba(255,255,255,0.7)', border:0, width:34, height:34, borderRadius:'50%',
          cursor:'pointer', fontSize:16, color:'#2D1B4E', boxShadow:'0 2px 8px -2px rgba(139,102,255,0.3)',
        }}>←</button>
        <div style={{fontSize:18, fontWeight:700, color:'#2D1B4E', letterSpacing:'-0.01em'}}>Inbox</div>
        <div style={{flex:1}} />
        <span style={{fontSize:10, color:'#8E7DC0'}}>Last 90 days</span>
      </div>
      <window.InboxTabs tab={tab} setTab={setTab} counts={counts} />
      {messages.length === 0 ? (
        <window.EmptyTab tab={tab} />
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {messages.map(m => (
            <window.InboxListItem key={m.id} msg={m} onClick={() => onOpenMessage(m)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Detail view ----------
function DetailView({ msg, onClose, onCtaClick }) {
  return (
    <div style={{padding:'14px'}}>
      <window.MsgDetail msg={msg} onClose={onClose} onCtaClick={onCtaClick} />
    </div>
  );
}
