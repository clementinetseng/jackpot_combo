/* global React */
const { useState } = React;

window.RewardHistory = function RewardHistory({ onOpenDrawer, selected, setSelected, showToast }) {
  const rows = [
    {id:'RW-10284', player:'ph_player_001', promo:'PR-00412', name:'100% First Deposit Bonus', status:'ACTIVE',       bonus:1500, current:31800, target:45000, created:'2026/04/14 09:24:01'},
    {id:'RW-10283', player:'ph_player_002', promo:'PR-00411', name:'50% Reload Bonus',         status:'COMPLETED',    bonus:1200, current:30000, target:30000, created:'2026/03/22 18:02:11'},
    {id:'RW-10282', player:'ph_player_003', promo:'PR-00410', name:'₱200 Slots Cashback',      status:'OUT_OF_BALANCE',bonus:200, current:2200,  target:4000,  created:'2026/03/10 12:41:03'},
    {id:'RW-10281', player:'ph_player_004', promo:'PR-00409', name:'Daily Bonus',              status:'CANCELLED',    bonus:300,  current:8500,  target:12000, created:'2026/02/28 22:17:44'},
    {id:'RW-10280', player:'ph_player_005', promo:'PR-00408', name:'Weekend Reload 30%',       status:'PENDING',      bonus:900,  current:0,     target:15000, created:'2026/04/19 08:00:00'},
  ];
  const statusColors = {
    ACTIVE: {bg:'#EFF3FF', fg:'#1E40AF'},
    COMPLETED: {bg:'#E8FAF0', fg:'#16A34A'},
    OUT_OF_BALANCE: {bg:'#FEF3C7', fg:'#92400E'},
    CANCELLED: {bg:'#FED7AA', fg:'#9A3412'},
    PENDING: {bg:'#F3F4F6', fg:'#6B7280'},
  };
  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  return (
    <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, overflow:'hidden'}}>
      <div style={{padding:'12px 16px', display:'flex', gap:8, alignItems:'center', borderBottom:'1px solid #F0F1F3'}}>
        <input placeholder="Search by Reward ID or player" style={{flex:1, padding:'7px 12px', border:'1px solid #DFE2E8', borderRadius:6, fontSize:12, fontFamily:'Inter', outline:'none'}} />
        <select style={{padding:'7px 12px', border:'1px solid #DFE2E8', borderRadius:6, fontSize:12, fontFamily:'Inter', background:'#fff'}}>
          <option>All statuses</option><option>ACTIVE</option><option>COMPLETED</option>
        </select>
        {selected.length > 0 && (
          <button onClick={() => showToast(`Opened bulk-cancel modal for ${selected.length} records`)} style={{background:'#DC2626', color:'#fff', border:0, padding:'7px 16px', borderRadius:6, fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'Inter'}}>
            Batch Cancel ({selected.length})
          </button>
        )}
      </div>
      <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, fontFamily:'Inter'}}>
        <thead>
          <tr style={{background:'#F8F9FB'}}>
            <th style={th}><input type="checkbox" /></th>
            {['Reward ID','Player','Promotion','Status','Bonus','Progress','Created'].map(h => <th key={h} style={th}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => {
            const sc = statusColors[r.status];
            return (
              <tr key={r.id} style={{borderBottom:'1px solid #F0F1F3'}}>
                <td style={td}><input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggle(r.id)} /></td>
                <td style={{...td, color:'#2563EB', fontWeight:500, cursor:'pointer'}} onClick={() => onOpenDrawer(r)}>{r.id}</td>
                <td style={td}>{r.player}</td>
                <td style={{...td, color:'#2563EB', cursor:'pointer'}}>{r.promo}<div style={{fontSize:10, color:'#6B7280'}}>{r.name}</div></td>
                <td style={td}><span style={{display:'inline-block', padding:'2px 10px', borderRadius:9999, fontSize:10, fontWeight:600, background:sc.bg, color:sc.fg}}>{r.status}</span></td>
                <td style={{...td, fontVariantNumeric:'tabular-nums'}}>₱{r.bonus.toLocaleString('en-PH')}</td>
                <td style={{...td, fontVariantNumeric:'tabular-nums', color:'#6B7280'}}>{r.current.toLocaleString('en-PH')} / {r.target.toLocaleString('en-PH')}</td>
                <td style={{...td, fontVariantNumeric:'tabular-nums', color:'#6B7280'}}>{r.created}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

window.Drawer = function Drawer({ row, onClose, onCancelClick }) {
  if (!row) return null;
  const pct = Math.min(100, (row.current / row.target) * 100);
  return (
    <div onClick={onClose} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:30, display:'flex', justifyContent:'flex-end'}}>
      <div onClick={e => e.stopPropagation()} style={{width:480, background:'#fff', height:'100vh', overflow:'auto', fontFamily:'Inter', animation:'slideIn 250ms ease'}}>
        <div style={{padding:'20px 24px', borderBottom:'1px solid #DFE2E8', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div><div style={{fontSize:10, color:'#6B7280', letterSpacing:'0.05em', textTransform:'uppercase'}}>Reward</div><div style={{fontSize:18, fontWeight:700, color:'#1A1D26'}}>{row.id}</div></div>
          <button onClick={onClose} style={{background:'none', border:0, fontSize:22, color:'#6B7280', cursor:'pointer'}}>×</button>
        </div>
        <div style={{padding:'20px 24px', display:'flex', flexDirection:'column', gap:20}}>
          <section><h3 style={sec}>Basic Info</h3>
            {kv('Player', row.player)}
            {kv('Promotion', <><span style={{color:'#2563EB', fontWeight:500}}>{row.promo}</span> · {row.name}</>)}
            {kv('Status', row.status)}
            {kv('Created', row.created)}
          </section>
          <section><h3 style={sec}>Bonus Turnover</h3>
            <div style={{fontSize:12, color:'#6B7280', marginBottom:6, fontVariantNumeric:'tabular-nums'}}>₱{row.current.toLocaleString('en-PH')} / ₱{row.target.toLocaleString('en-PH')} ({Math.round(pct)}%)</div>
            <div style={{height:8, background:'#F0F1F3', borderRadius:9999, overflow:'hidden'}}><div style={{height:'100%', width:`${pct}%`, background:'#2563EB', borderRadius:9999}} /></div>
            <div style={{fontSize:11, color:'#6B7280', marginTop:6}}>Bonus: ₱{row.bonus.toLocaleString('en-PH')} · Multiplier: 30x</div>
          </section>
          {row.status === 'CANCELLED' && (
            <section><h3 style={sec}>Cancel Record</h3>
              <div style={{background:'#FFF7ED', border:'1px solid #FDBA74', borderRadius:6, padding:12, fontSize:12, color:'#9A3412'}}>
                Cancelled by <strong>clement@the-force.com.tw</strong> on 2026/03/01 10:22<br />
                Reason: <strong>Suspected abuse</strong> · Remark: Multi-account activity flagged by RiskIP.
              </div>
            </section>
          )}
          {row.status !== 'CANCELLED' && (
            <button onClick={() => onCancelClick(row)} style={{background:'#fff', color:'#DC2626', border:'1px solid #DC2626', padding:'10px', borderRadius:6, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter'}}>Cancel Reward</button>
          )}
        </div>
      </div>
      <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
    </div>
  );
};

const th = {textAlign:'left', padding:'10px 16px', fontSize:10, textTransform:'uppercase', letterSpacing:'0.03em', fontWeight:600, color:'#6B7280', borderBottom:'1px solid #DFE2E8'};
const td = {padding:'10px 16px', color:'#1A1D26'};
const sec = {margin:'0 0 8px', fontSize:10, fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.05em'};
const kv = (k, v) => <div style={{display:'flex', padding:'6px 0', fontSize:12, borderBottom:'1px solid #F0F1F3'}}><div style={{width:110, color:'#6B7280'}}>{k}</div><div style={{flex:1, color:'#1A1D26', fontVariantNumeric:'tabular-nums'}}>{v}</div></div>;
