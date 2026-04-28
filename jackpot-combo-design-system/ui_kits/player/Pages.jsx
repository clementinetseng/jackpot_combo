/* global React */
const { useState } = React;

// ============================================================
// PageLobby
// ============================================================
window.PageLobby = function PageLobby({ balance, withdrawable, setPage, promos, joined }) {
  return (
    <div style={{padding:'14px 16px 96px', display:'flex', flexDirection:'column', gap:14}}>
      <WalletBanner balance={balance} withdrawable={withdrawable} onOpenRecords={() => setPage('records')} />
      {joined.length > 0 && (
        <TurnoverStatus kind="bonus" title="100% First Deposit Bonus" current={31800} target={45000} />
      )}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:4}}>
        <h2 style={{margin:0, fontSize:16, fontWeight:700, color:'var(--ink)'}}>Featured Promotions</h2>
        <button onClick={() => setPage('rewards')} style={{background:'none', border:0, color:'var(--player-primary)', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'Poppins'}}>See all →</button>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        {promos.slice(0,2).map(p => (
          <PromotionCard key={p.id} promo={p} joined={joined.includes(p.id)} onClaim={() => setPage('deposit')} />
        ))}
      </div>
      <div style={{marginTop:4}}>
        <h2 style={{margin:'0 0 10px', fontSize:16, fontWeight:700, color:'var(--ink)'}}>Slots</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10}}>
          {['Fortune Tiger','Sugar Rush','Gates of Olympus','Sweet Bonanza','Big Bass','Mahjong Ways'].map((name,i) => (
            <div key={i} style={{
              aspectRatio:'1', borderRadius:14, position:'relative', overflow:'hidden',
              background:`linear-gradient(135deg, hsl(${260 + i*20}, 60%, 65%), hsl(${280 + i*20}, 50%, 45%))`,
              boxShadow:'var(--shadow-card)', display:'flex', alignItems:'flex-end',
              padding:10, color:'#fff', fontWeight:600, fontSize:11, lineHeight:1.15
            }}>
              <div style={{position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)'}} />
              <div style={{position:'relative'}}>{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PageDeposit — D19: `No Promotion` pinned, Eligible-only
// ============================================================
window.PageDeposit = function PageDeposit({ promos, joined, setJoined, addBalance, setPage, showToast }) {
  const [amount, setAmount] = useState(1000);
  const [selectedPromo, setSelectedPromo] = useState('none');
  const chips = [500, 1000, 3000, 5000, 10000, 20000];
  const handleContinue = () => {
    addBalance(amount);
    if (selectedPromo !== 'none' && !joined.includes(selectedPromo)) {
      setJoined([...joined, selectedPromo]);
      showToast(`Claimed! Bonus added. Start playing to clear turnover.`);
    } else {
      showToast(`₱${amount.toLocaleString('en-PH')} deposited`);
    }
    setTimeout(() => setPage('lobby'), 400);
  };
  return (
    <div style={{padding:'14px 16px 96px', display:'flex', flexDirection:'column', gap:14}}>
      <h1 style={{margin:0, fontSize:22, fontWeight:700, color:'var(--ink)'}}>Deposit</h1>

      <div style={{background:'#fff', borderRadius:14, padding:16, boxShadow:'var(--shadow-card)'}}>
        <div style={{fontSize:11, fontWeight:600, color:'var(--ink-muted)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8}}>Amount</div>
        <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value)||0)} style={{
          width:'100%', padding:'14px 18px', borderRadius:9999, border:'1px solid var(--border)',
          background:'#fff', fontSize:18, fontWeight:700, color:'var(--ink)', outline:'none', boxSizing:'border-box',
          fontFamily:'Poppins', fontVariantNumeric:'tabular-nums'
        }} />
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginTop:10}}>
          {chips.map(c => (
            <button key={c} onClick={() => setAmount(c)} style={{
              padding:'12px 6px', borderRadius:10, border: amount === c ? 0 : '2px solid var(--border)',
              background: amount === c ? 'var(--player-gradient-pill)' : '#fff',
              color: amount === c ? '#fff' : 'var(--ink-muted)',
              fontWeight: amount === c ? 800 : 600, fontSize:13, cursor:'pointer', fontFamily:'Poppins',
              boxShadow: amount === c ? 'var(--shadow-pill)' : 'none', transition:'all 150ms'
            }}>₱{c.toLocaleString('en-PH')}</button>
          ))}
        </div>
      </div>

      <div>
        <div style={{fontSize:11, fontWeight:600, color:'var(--ink-muted)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8}}>Choose a Promotion</div>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          <label style={{
            display:'flex', alignItems:'center', gap:10, padding:'12px 14px',
            background:'#fff', borderRadius:14, border: selectedPromo === 'none' ? '2px solid var(--player-primary)' : '1px solid var(--border)',
            cursor:'pointer'
          }}>
            <input type="radio" checked={selectedPromo === 'none'} onChange={() => setSelectedPromo('none')} style={{accentColor:'#8E66FF'}} />
            <div style={{flex:1}}>
              <div style={{fontWeight:700, fontSize:13, color:'var(--ink)'}}>No Promotion</div>
              <div style={{fontSize:11, color:'var(--ink-muted)'}}>Deposit without joining a promotion</div>
            </div>
          </label>
          {promos.filter(p => p.eligible).map(p => (
            <label key={p.id} style={{
              display:'flex', alignItems:'center', gap:10, padding:'12px 14px',
              background:'#fff', borderRadius:14, border: selectedPromo === p.id ? '2px solid var(--player-primary)' : '1px solid var(--border)',
              cursor:'pointer'
            }}>
              <input type="radio" checked={selectedPromo === p.id} onChange={() => setSelectedPromo(p.id)} style={{accentColor:'#8E66FF'}} />
              <div style={{fontSize:20}}>{p.icon}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontWeight:700, fontSize:13, color:'var(--ink)'}}>{p.title}</div>
                <div style={{fontSize:11, color:'var(--ink-muted)'}}>{p.subtitle}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button onClick={handleContinue} disabled={!amount} style={{
        padding:'14px', borderRadius:9999, border:0,
        background: amount ? 'var(--player-gradient-cta)' : 'linear-gradient(90deg,#d1d5db,#9ca3af)',
        color:'#fff', fontWeight:700, fontSize:15, fontFamily:'Poppins',
        cursor: amount ? 'pointer' : 'not-allowed', boxShadow: amount ? 'var(--shadow-pill)' : 'none'
      }}>Continue →</button>
    </div>
  );
};

// ============================================================
// PageRewards — full reward center, sectioned
// ============================================================
window.PageRewards = function PageRewards({ promos, joined, setPage }) {
  const active = promos.filter(p => joined.includes(p.id));
  const forYou = promos.filter(p => !joined.includes(p.id));
  return (
    <div style={{padding:'14px 16px 96px', display:'flex', flexDirection:'column', gap:16}}>
      <h1 style={{margin:0, fontSize:22, fontWeight:700, color:'var(--ink)'}}>Reward Center</h1>
      {active.length > 0 && (
        <section>
          <div style={{fontSize:12, fontWeight:700, color:'var(--ink-muted)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8}}>Active Promotion</div>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {active.map(p => <PromotionCard key={p.id} promo={p} joined={true} onClaim={() => {}} />)}
          </div>
        </section>
      )}
      <section>
        <div style={{fontSize:12, fontWeight:700, color:'var(--ink-muted)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8}}>For You</div>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {forYou.map(p => <PromotionCard key={p.id} promo={p} onClaim={() => setPage('deposit')} />)}
        </div>
      </section>
      <div style={{textAlign:'center', padding:'16px 0', fontSize:11, color:'var(--ink-muted)'}}>
        Need help? <span style={{color:'var(--player-primary)', fontWeight:600, cursor:'pointer'}}>Contact Support</span> · <span style={{color:'var(--player-primary)', fontWeight:600, cursor:'pointer'}}>FAQ</span>
      </div>
    </div>
  );
};

// ============================================================
// PageRecords — Promotion tab per D61
// ============================================================
window.PageRecords = function PageRecords() {
  const [tab, setTab] = useState('Promotions');
  const records = [
    {title:'100% First Deposit Bonus', icon:'🎁', status:'Active', joined:'2026/04/14', current:31800, target:45000},
    {title:'50% Reload Bonus', icon:'💰', status:'Completed 🎉', joined:'2026/03/22', current:30000, target:30000},
    {title:'₱200 Slots Cashback', icon:'🎰', status:'Ended (low balance)', joined:'2026/03/10', current:2200, target:4000},
    {title:'Daily Bonus', icon:'🎁', status:'Cancelled', joined:'2026/02/28', current:8500, target:12000},
    {title:'Weekend Reload', icon:'🎰', status:'Pending', joined:'2026/04/19', current:0, target:15000},
  ];
  return (
    <div style={{padding:'14px 16px 96px', display:'flex', flexDirection:'column', gap:14}}>
      <h1 style={{margin:0, fontSize:22, fontWeight:700, color:'var(--ink)'}}>Records</h1>
      <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
        {['Promotions', 'Transactions', 'Game'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:'8px 18px', borderRadius:9999, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Poppins',
            border: tab === t ? 0 : '1px solid var(--border)',
            background: tab === t ? 'var(--player-gradient-pill)' : '#fff',
            color: tab === t ? '#fff' : 'var(--ink-muted)',
            boxShadow: tab === t ? 'var(--shadow-pill)' : 'none'
          }}>{t}</button>
        ))}
      </div>
      {tab === 'Promotions' ? (
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {records.map((r,i) => <RecordRow key={i} rec={r} />)}
        </div>
      ) : (
        <div style={{textAlign:'center', padding:'40px 20px', color:'var(--ink-muted)', fontSize:13}}>
          <div style={{fontSize:36, marginBottom:8}}>📋</div>
          <div style={{fontWeight:600, marginBottom:6, color:'var(--ink)'}}>Provided by the platform</div>
          <div style={{fontSize:12}}>Per PRD D61 — only Promotions tab is in scope for this prototype.</div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// PageSupport — simple help
// ============================================================
window.PageSupport = function PageSupport() {
  return (
    <div style={{padding:'14px 16px 96px', display:'flex', flexDirection:'column', gap:14}}>
      <h1 style={{margin:0, fontSize:22, fontWeight:700, color:'var(--ink)'}}>Support</h1>
      {[
        {icon:'🎧', title:'Live Chat', sub:'Average wait ~2 min'},
        {icon:'❓', title:'FAQ', sub:'Deposit, withdraw, KYC'},
        {icon:'📧', title:'Email', sub:'support@jackpotcombo.ph'},
      ].map((o,i) => (
        <div key={i} style={{
          background:'#fff', borderRadius:14, padding:'14px 16px', boxShadow:'var(--shadow-card)',
          display:'flex', alignItems:'center', gap:14, cursor:'pointer'
        }}>
          <div style={{fontSize:28}}>{o.icon}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700, fontSize:14, color:'var(--ink)'}}>{o.title}</div>
            <div style={{fontSize:11, color:'var(--ink-muted)'}}>{o.sub}</div>
          </div>
          <div style={{color:'var(--ink-muted)', fontSize:18}}>→</div>
        </div>
      ))}
    </div>
  );
};
