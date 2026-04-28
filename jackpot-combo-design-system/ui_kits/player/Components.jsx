/* global React */

// ============================================================
// WalletBanner — gradient hero with balance + withdrawable
// ============================================================
window.WalletBanner = function WalletBanner({ balance, withdrawable, onOpenRecords }) {
  return (
    <div style={{
      background:'var(--player-gradient-banner)', borderRadius:20, padding:'22px 20px',
      boxShadow:'var(--shadow-card)', color:'#fff', position:'relative', overflow:'hidden'
    }}>
      <div style={{
        position:'absolute', top:-40, right:-30, width:200, height:200,
        background:'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
      }} />
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, position:'relative'}}>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:11, opacity:0.85, fontWeight:500}}>Total Balance</div>
          <div style={{fontSize:32, fontWeight:800, color:'#FFC107', letterSpacing:'-0.02em', lineHeight:1.1, fontVariantNumeric:'tabular-nums'}}>
            ₱{balance.toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2})}
          </div>
          <div style={{fontSize:11, opacity:0.9, marginTop:4}}>
            Ready to withdraw: <strong style={{color:'#fff'}}>₱{withdrawable.toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2})}</strong>
          </div>
        </div>
        <button onClick={onOpenRecords} style={{
          background:'rgba(255,255,255,0.18)', color:'#fff', border:0,
          padding:'8px 14px', borderRadius:9999, backdropFilter:'blur(8px)',
          fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'Poppins',
          whiteSpace:'nowrap'
        }}>📋 Records →</button>
      </div>
    </div>
  );
};

// ============================================================
// TurnoverStatus — the shared progress-bar component (D18)
// ============================================================
window.TurnoverStatus = function TurnoverStatus({ kind, title, current, target, claimable }) {
  if (kind === 'ready') {
    return (
      <div style={{
        background:'#D1FAE5', border:'1px solid #10B981',
        borderRadius:14, padding:'12px 14px', display:'flex', alignItems:'center', gap:12
      }}>
        <div style={{fontSize:26}}>✅</div>
        <div style={{flex:1}}>
          <div style={{fontSize:11, color:'#065F46', fontWeight:500}}>Ready to withdraw</div>
          <div style={{fontSize:18, fontWeight:700, color:'#065F46', fontVariantNumeric:'tabular-nums'}}>
            ₱{(claimable || 0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2})}
          </div>
        </div>
      </div>
    );
  }
  const pct = Math.min(100, Math.max(0, (current / target) * 100));
  const remaining = Math.max(0, target - current);
  const icon = kind === 'bonus' ? '🎰' : '💰';
  return (
    <div style={{
      background:'rgba(244,239,250,0.9)', border:'1px solid var(--border)',
      borderRadius:14, padding:'12px 14px'
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <div style={{fontWeight:700, fontSize:13, color:'var(--ink)'}}>{icon} {title}</div>
        <div style={{fontSize:11, color:'var(--ink-muted)', fontVariantNumeric:'tabular-nums'}}>{Math.round(pct)}%</div>
      </div>
      <div style={{height:8, background:'#fff', borderRadius:9999, overflow:'hidden', marginBottom:8}}>
        <div style={{height:'100%', width:`${pct}%`, background:'var(--player-gradient-pill)', borderRadius:9999, transition:'width 350ms ease'}} />
      </div>
      <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--ink-muted)', fontVariantNumeric:'tabular-nums'}}>
        <span>Bet <strong style={{color:'var(--ink)', fontWeight:700}}>₱{remaining.toLocaleString('en-PH')}</strong> more to withdraw</span>
        <span>₱{current.toLocaleString('en-PH')} / ₱{target.toLocaleString('en-PH')}</span>
      </div>
    </div>
  );
};

// ============================================================
// PromotionCard — used on Lobby, Gift Box, Reward Center
// ============================================================
window.PromotionCard = function PromotionCard({ promo, onClaim, joined }) {
  return (
    <div style={{
      background:'#fff', borderRadius:14, boxShadow:'var(--shadow-card)', overflow:'hidden'
    }}>
      <div style={{
        background:'var(--player-gradient-banner)', padding:'14px 16px', color:'#fff',
        display:'flex', gap:12, alignItems:'center'
      }}>
        <div style={{
          width:44, height:44, borderRadius:12, background:'rgba(255,255,255,0.2)',
          display:'grid', placeItems:'center', fontSize:22, flexShrink:0
        }}>{promo.icon}</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'0.08em', opacity:0.85}}>{promo.tag}</div>
          <div style={{fontSize:15, fontWeight:700, marginTop:2, lineHeight:1.25}}>{promo.title}</div>
          <div style={{fontSize:11, opacity:0.85, marginTop:2}}>{promo.subtitle}</div>
        </div>
      </div>
      <div style={{padding:'12px 16px'}}>
        <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--ink-muted)', marginBottom:10}}>
          <span>{promo.period}</span>
          <span>Min ₱{promo.minDeposit.toLocaleString('en-PH')}</span>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button style={{
            flex:1, padding:'9px 12px', borderRadius:9999, fontWeight:600, fontSize:12,
            background:'#fff', border:'1px solid var(--border)', color:'var(--ink-muted)',
            cursor:'pointer', fontFamily:'Poppins'
          }}>View T&C</button>
          <button onClick={() => onClaim(promo)} disabled={joined} style={{
            flex:1, padding:'9px 12px', borderRadius:9999, fontWeight:600, fontSize:12,
            background: joined ? '#D1FAE5' : 'var(--player-gradient-cta)',
            color: joined ? '#065F46' : '#fff',
            border:0, cursor: joined ? 'default' : 'pointer', fontFamily:'Poppins'
          }}>{joined ? 'Joined ✓' : 'Claim Now'}</button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// RecordRow — reward-history card with status-accent left border
// ============================================================
window.RecordRow = function RecordRow({ rec }) {
  const colors = {
    Active:        {border:'#8E66FF', bg:'rgba(142,102,255,0.15)', fg:'#8E66FF'},
    'Completed 🎉':{border:'#10B981', bg:'#D1FAE5',                fg:'#047857'},
    'Ended (low balance)': {border:'#F59E0B', bg:'#FEF3C7',         fg:'#92400E'},
    Cancelled:     {border:'#F97316', bg:'#FED7AA',                fg:'#9A3412'},
    Pending:       {border:'#6B5B8E', bg:'#E8E0F5',                fg:'#4A3B7A'},
  };
  const c = colors[rec.status] || colors.Pending;
  const pct = rec.target ? Math.min(100, (rec.current/rec.target)*100) : 0;
  return (
    <div style={{
      background:'#fff', borderRadius:14, padding:'12px 14px',
      boxShadow:'var(--shadow-card)', borderLeft:`4px solid ${c.border}`
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
        <div style={{fontWeight:700, fontSize:13, color:'var(--ink)'}}>{rec.icon} {rec.title}</div>
        <span style={{background:c.bg, color:c.fg, padding:'2px 10px', borderRadius:9999, fontSize:10, fontWeight:600}}>{rec.status}</span>
      </div>
      <div style={{fontSize:10, color:'var(--ink-muted)', marginBottom:8, fontVariantNumeric:'tabular-nums'}}>
        Joined {rec.joined} · ₱{rec.current.toLocaleString('en-PH')} / ₱{rec.target.toLocaleString('en-PH')}
      </div>
      {rec.status === 'Active' && (
        <div style={{height:4, background:'#F4EFFA', borderRadius:9999, overflow:'hidden'}}>
          <div style={{height:'100%', width:`${pct}%`, background:'var(--player-gradient-pill)'}} />
        </div>
      )}
    </div>
  );
};
