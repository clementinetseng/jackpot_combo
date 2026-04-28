/* global React */
const { useState } = React;

window.PromotionList = function PromotionList({ rows, setRows, onCreate, showToast, onRequestDisable }) {
  const duplicate = (row) => {
    const newRow = {...row, id:'PR-0' + Math.floor(Math.random()*10000), name:row.name+' (Copy)', enabled:false};
    setRows([newRow, ...rows]);
    showToast('Duplicated');
  };
  return (
    <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, overflow:'hidden'}}>
      <div style={{padding:'12px 16px', display:'flex', gap:8, alignItems:'center', borderBottom:'1px solid #F0F1F3'}}>
        <input placeholder="Search by name or ID" style={{flex:1, padding:'7px 12px', border:'1px solid #DFE2E8', borderRadius:6, fontSize:12, fontFamily:'Inter', outline:'none'}} />
        <select style={{padding:'7px 12px', border:'1px solid #DFE2E8', borderRadius:6, fontSize:12, fontFamily:'Inter', background:'#fff'}}>
          <option>All types</option><option>Deposit Bonus</option><option>Cashback</option>
        </select>
        <select style={{padding:'7px 12px', border:'1px solid #DFE2E8', borderRadius:6, fontSize:12, fontFamily:'Inter', background:'#fff'}}>
          <option>All statuses</option><option>Enabled</option><option>Disabled</option>
        </select>
      </div>
      <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, fontFamily:'Inter'}}>
        <thead>
          <tr style={{background:'#F8F9FB'}}>
            {['Promotion ID','Name','Type','Status','Period','Claims','Actions'].map(h => (
              <th key={h} style={{textAlign:'left', padding:'10px 16px', fontSize:10, textTransform:'uppercase', letterSpacing:'0.03em', fontWeight:600, color:'#6B7280', borderBottom:'1px solid #DFE2E8'}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} style={{borderBottom:'1px solid #F0F1F3'}}>
              <td style={{padding:'12px 16px', color:'#2563EB', fontWeight:500, cursor:'pointer'}}>{r.id}</td>
              <td style={{padding:'12px 16px', fontWeight:500, color:'#1A1D26'}}>{r.name}</td>
              <td style={{padding:'12px 16px', color:'#6B7280'}}>{r.type}</td>
              <td style={{padding:'12px 16px'}}>
                <label style={{display:'inline-flex', alignItems:'center', gap:6, cursor:'pointer'}}>
                  <input type="checkbox" checked={r.enabled} onChange={() => {
                    if (r.enabled) onRequestDisable(r);
                    else setRows(rows.map(x => x.id===r.id?{...x,enabled:true}:x));
                  }} style={{display:'none'}} />
                  <span style={{
                    width:32, height:18, borderRadius:9999, background: r.enabled ? '#16A34A' : '#DFE2E8',
                    position:'relative', transition:'background 150ms'
                  }}>
                    <span style={{
                      position:'absolute', top:2, left: r.enabled ? 16 : 2, width:14, height:14, background:'#fff', borderRadius:'50%', transition:'left 150ms'
                    }} />
                  </span>
                  <span style={{fontSize:11, color: r.enabled ? '#16A34A' : '#6B7280', fontWeight:500}}>{r.enabled ? 'Enabled' : 'Disabled'}</span>
                </label>
              </td>
              <td style={{padding:'12px 16px', color:'#6B7280', fontVariantNumeric:'tabular-nums'}}>{r.period}</td>
              <td style={{padding:'12px 16px', color:'#6B7280', fontVariantNumeric:'tabular-nums'}}>{r.claims}</td>
              <td style={{padding:'12px 16px'}}>
                <div style={{display:'flex', gap:8}}>
                  <button title="View" style={iconBtn}>👁</button>
                  <button title="Duplicate" onClick={() => duplicate(r)} style={iconBtn}>⎘</button>
                  <button title="Edit" style={iconBtn}>✎</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const iconBtn = {width:28, height:28, border:'1px solid #DFE2E8', background:'#fff', borderRadius:6, cursor:'pointer', fontSize:12, color:'#6B7280'};
