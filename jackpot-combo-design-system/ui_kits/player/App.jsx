/* global React */
const { useState } = React;

const PROMOS = [
  {id:'p1', icon:'🎁', tag:'FIRST DEPOSIT', title:'100% First Deposit Bonus', subtitle:'Up to ₱5,000 · Bet ₱45,000 to withdraw', period:'Apr 10 ~ Apr 30', minDeposit:500, eligible:true},
  {id:'p2', icon:'💰', tag:'RELOAD',        title:'50% Reload Bonus',         subtitle:'Up to ₱3,000 · Bet ₱30,000 to withdraw', period:'Apr 15 ~ May 15', minDeposit:500, eligible:true},
  {id:'p3', icon:'🎰', tag:'SLOTS CASHBACK', title:'₱200 Slots Cashback',      subtitle:'Bet ₱4,000 on slots · Auto-credit',     period:'Apr 12 ~ Apr 18', minDeposit:200, eligible:true},
  {id:'p4', icon:'🎉', tag:'WEEKEND',        title:'Weekend Reload 30%',       subtitle:'Up to ₱1,500 · Bet ₱15,000 to withdraw', period:'Sat – Sun',       minDeposit:300, eligible:true},
];

window.PlayerApp = function PlayerApp() {
  // Tabs match Figma mobile nav: Home | Promo | [Deposit FAB] | News | My
  const [page, setPage] = useState('home');
  const [giftOpen, setGiftOpen] = useState(false);
  const [joined, setJoined] = useState([]);
  const [balance, setBalance] = useState(6882.43);
  const [unread, setUnread] = useState(3);
  const [toast, setToast] = useState(null);

  const withdrawable = joined.length > 0 ? 0 : balance;
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const addBalance = (a) => setBalance(b => b + a);
  const handleOpenGift = () => { setGiftOpen(v => !v); setUnread(0); };

  let content;
  if (page === 'home')         content = <PageLobby balance={balance} withdrawable={withdrawable} setPage={setPage} promos={PROMOS} joined={joined} />;
  else if (page === 'deposit') content = <PageDeposit promos={PROMOS} joined={joined} setJoined={setJoined} addBalance={addBalance} setPage={setPage} showToast={showToast} />;
  else if (page === 'promo')   content = <PageRewards promos={PROMOS} joined={joined} setPage={setPage} />;
  else if (page === 'records') content = <PageRecords />;
  else if (page === 'news')    content = <PageNews />;
  else                         content = <PageLobby balance={balance} withdrawable={withdrawable} setPage={setPage} promos={PROMOS} joined={joined} />;

  return (
    <>
      <Chrome page={page} setPage={setPage} balance={balance} unread={unread} onOpenGiftBox={handleOpenGift} giftOpen={giftOpen} />

      {giftOpen && (
        <div onClick={() => setGiftOpen(false)} style={{position:'fixed', inset:0, background:'rgba(45,27,78,0.4)', zIndex:30}}>
          <div onClick={e => e.stopPropagation()} style={{
            position:'absolute', top:66, right:12, width:300, maxHeight:'70vh', overflow:'auto',
            background:'#fff', borderRadius:14, boxShadow:'var(--shadow-overlay)', padding:14
          }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
              <div style={{fontWeight:700, fontSize:14, color:'var(--ink)'}}>Gift Box</div>
              <button onClick={() => setGiftOpen(false)} style={{background:'none', border:0, fontSize:18, color:'var(--ink-muted)', cursor:'pointer'}}>×</button>
            </div>
            {joined.length > 0 && (
              <>
                <div style={{fontSize:10, fontWeight:700, color:'var(--ink-muted)', textTransform:'uppercase', letterSpacing:'0.05em', margin:'6px 0'}}>Active</div>
                {PROMOS.filter(p => joined.includes(p.id)).map(p => (
                  <div key={p.id} style={{padding:'8px 0', borderBottom:'1px solid var(--border)', display:'flex', gap:10}}>
                    <span style={{fontSize:18}}>{p.icon}</span>
                    <div style={{flex:1}}><div style={{fontWeight:600, fontSize:12, color:'var(--ink)'}}>{p.title}</div><div style={{fontSize:10, color:'var(--ink-muted)'}}>Active</div></div>
                  </div>
                ))}
              </>
            )}
            <div style={{fontSize:10, fontWeight:700, color:'var(--ink-muted)', textTransform:'uppercase', letterSpacing:'0.05em', margin:'10px 0 6px'}}>For You</div>
            {PROMOS.filter(p => !joined.includes(p.id)).slice(0,3).map(p => (
              <div key={p.id} onClick={() => {setGiftOpen(false); setPage('promo');}} style={{padding:'8px 0', borderBottom:'1px solid var(--border)', display:'flex', gap:10, cursor:'pointer'}}>
                <span style={{fontSize:18}}>{p.icon}</span>
                <div style={{flex:1}}><div style={{fontWeight:600, fontSize:12, color:'var(--ink)'}}>{p.title}</div><div style={{fontSize:10, color:'var(--ink-muted)'}}>{p.subtitle}</div></div>
              </div>
            ))}
            <button onClick={() => {setGiftOpen(false); setPage('promo');}} style={{
              width:'100%', marginTop:10, padding:'10px', borderRadius:9999, border:0,
              background:'var(--player-gradient-cta)', color:'#fff', fontWeight:600, fontSize:12, cursor:'pointer', fontFamily:'Poppins'
            }}>View all →</button>
          </div>
        </div>
      )}

      <main>{content}</main>

      {toast && (
        <div style={{
          position:'fixed', top:70, left:'50%', transform:'translateX(-50%)', zIndex:40,
          background:'rgba(45,27,78,0.92)', color:'#fff', padding:'10px 18px', borderRadius:9999,
          fontSize:13, fontWeight:500, fontFamily:'Poppins', boxShadow:'var(--shadow-overlay)',
          backdropFilter:'blur(12px)'
        }}>{toast}</div>
      )}
    </>
  );
};

// Simple News placeholder that matches the lobby look
window.PageNews = function PageNews() {
  const items = [
    {tag:'NEW', title:'Spring Tournament kicks off Apr 25', body:'₱500,000 prize pool across Slots & Live Casino. Opt-in from the Promo tab.', time:'2h ago'},
    {tag:'SYSTEM', title:'Scheduled maintenance — Apr 23, 02:00–04:00', body:'GCash deposits will be briefly unavailable. PayMaya and bank transfer unaffected.', time:'1d ago'},
    {tag:'PAYMENT', title:'BPI Direct is back online', body:'Deposits via BPI Direct have resumed after yesterday\u2019s provider-side issue.', time:'2d ago'},
    {tag:'PROMO', title:'Weekend Reload extended to Sunday 11:59 PM', body:'Get 30% back up to ₱1,500. Min deposit ₱300 to qualify.', time:'4d ago'},
  ];
  return (
    <div style={{padding:'14px 16px 120px', display:'flex', flexDirection:'column', gap:12}}>
      <h1 style={{margin:'2px 0 2px', fontSize:22, fontWeight:700, color:'var(--ink)'}}>News</h1>
      {items.map((n,i) => (
        <div key={i} style={{background:'#fff', borderRadius:14, padding:'14px 16px', boxShadow:'var(--shadow-card)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
            <span style={{
              background:'var(--player-gradient-pill)', color:'#fff', padding:'2px 8px',
              borderRadius:9999, fontSize:9, fontWeight:700, letterSpacing:'0.06em'
            }}>{n.tag}</span>
            <span style={{fontSize:10, color:'var(--ink-muted)'}}>{n.time}</span>
          </div>
          <div style={{fontWeight:700, fontSize:14, color:'var(--ink)', marginBottom:4}}>{n.title}</div>
          <div style={{fontSize:12, color:'var(--ink-muted)', lineHeight:1.45}}>{n.body}</div>
        </div>
      ))}
    </div>
  );
};
