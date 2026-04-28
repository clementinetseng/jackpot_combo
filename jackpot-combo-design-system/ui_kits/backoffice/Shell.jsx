/* global React */
const { useState } = React;

window.Shell = function Shell({ page, setPage, children, title, action }) {
  const nav = [
    {id:'promotions', icon:'📢', label:'Promotions'},
    {id:'rewards',    icon:'🎁', label:'Reward History'},
    {id:'players',    icon:'👤', label:'Players', disabled:true},
    {id:'reports',    icon:'📊', label:'Reports', disabled:true},
    {id:'settings',   icon:'⚙️', label:'Settings', disabled:true},
  ];
  return (
    <div style={{display:'flex', minHeight:'100vh', background:'#F5F6FA', fontFamily:'Inter, sans-serif'}}>
      <aside style={{width:240, background:'#1E2433', color:'#A0A8B8', display:'flex', flexDirection:'column', flexShrink:0}}>
        <div style={{padding:'20px 20px 24px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #2D3548'}}>
          <div style={{width:30, height:30, borderRadius:8, background:'var(--player-gradient-pill)', display:'grid', placeItems:'center', color:'#fff', fontWeight:800, fontSize:16, fontFamily:'Poppins'}}>J</div>
          <div>
            <div style={{fontWeight:700, color:'#fff', fontSize:13, lineHeight:1.2}}>jackpot combo</div>
            <div style={{fontSize:10, color:'#6B7280'}}>Backoffice</div>
          </div>
        </div>
        <nav style={{padding:'14px 10px', display:'flex', flexDirection:'column', gap:2, flex:1}}>
          {nav.map(n => {
            const active = page === n.id || (n.id === 'promotions' && page === 'wizard');
            return (
              <button key={n.id} onClick={() => !n.disabled && setPage(n.id)} disabled={n.disabled} style={{
                background: active ? '#3A4560' : 'transparent', border:0, color: active ? '#fff' : (n.disabled ? '#4A5068' : '#A0A8B8'),
                padding:'9px 12px', borderRadius:6, cursor: n.disabled ? 'not-allowed' : 'pointer',
                textAlign:'left', display:'flex', alignItems:'center', gap:10, fontSize:13, fontWeight: active ? 600 : 500, fontFamily:'Inter'
              }}>
                <span style={{fontSize:14, opacity: n.disabled ? 0.5 : 1}}>{n.icon}</span>
                <span>{n.label}</span>
              </button>
            );
          })}
        </nav>
        <div style={{padding:14, borderTop:'1px solid #2D3548', fontSize:11}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <div style={{width:28, height:28, borderRadius:'50%', background:'#3A4560', display:'grid', placeItems:'center', color:'#fff', fontWeight:600, fontSize:11}}>C</div>
            <div><div style={{color:'#fff', fontWeight:600}}>Clement</div><div style={{color:'#6B7280', fontSize:10}}>Promo Ops</div></div>
          </div>
        </div>
      </aside>
      <main style={{flex:1, minWidth:0, display:'flex', flexDirection:'column'}}>
        <header style={{background:'#fff', borderBottom:'1px solid #DFE2E8', padding:'16px 28px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <h1 style={{margin:0, fontSize:20, fontWeight:700, color:'#1A1D26'}}>{title}</h1>
          {action}
        </header>
        <div style={{flex:1, padding:'24px 28px', overflow:'auto'}}>{children}</div>
      </main>
    </div>
  );
};
