/* global React */
const { useState } = React;

window.CancelModal = function CancelModal({ row, onClose, onConfirm }) {
  const [reason, setReason] = useState('');
  const [remark, setRemark] = useState('');
  const valid = reason && remark.trim().length >= 2;
  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={e => e.stopPropagation()} style={{...modal, width:460}}>
        <h2 style={{margin:'0 0 8px', fontSize:17, fontWeight:700, color:'#1A1D26'}}>Cancel Reward {row?.id}</h2>
        <p style={{margin:'0 0 16px', fontSize:12, color:'#6B7280'}}>This will mark the reward as <strong>CANCELLED</strong>. The bonus is not auto-deducted — operator handles it manually.</p>
        <label style={lbl}>
          <span>Reason<span style={req}>*</span></span>
          <select value={reason} onChange={e => setReason(e.target.value)} style={inp}>
            <option value="">Select reason…</option>
            <option>Suspected abuse</option><option>Duplicate account</option><option>Operator error</option><option>Player request</option>
          </select>
        </label>
        <label style={lbl}>
          <span>Remark<span style={req}>*</span> <small style={{color:'#6B7280'}}>(min 2 chars)</small></span>
          <textarea value={remark} onChange={e => setRemark(e.target.value)} rows={3} placeholder="Describe the context…" style={{...inp, fontFamily:'Inter', resize:'vertical'}} />
        </label>
        <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:12}}>
          <button onClick={onClose} style={btnOut}>Cancel</button>
          <button onClick={() => valid && onConfirm({reason, remark})} disabled={!valid} style={{...btnDan, opacity:valid?1:0.5, cursor:valid?'pointer':'not-allowed'}}>Confirm Cancel</button>
        </div>
      </div>
    </div>
  );
};

window.DeactivateModal = function DeactivateModal({ row, onClose, onConfirm }) {
  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={e => e.stopPropagation()} style={{...modal, width:420}}>
        <h2 style={{margin:'0 0 8px', fontSize:17, fontWeight:700, color:'#1A1D26'}}>Disable {row?.id}?</h2>
        <p style={{margin:'0 0 20px', fontSize:12, color:'#6B7280'}}>Players already enrolled continue their reward cycle. New players can't join until re-enabled.</p>
        <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
          <button onClick={onClose} style={btnOut}>Cancel</button>
          <button onClick={onConfirm} style={btnDan}>Disable</button>
        </div>
      </div>
    </div>
  );
};

window.UnsavedModal = function UnsavedModal({ onClose, onConfirm }) {
  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={e => e.stopPropagation()} style={{...modal, width:400}}>
        <h2 style={{margin:'0 0 8px', fontSize:17, fontWeight:700, color:'#1A1D26'}}>Discard changes?</h2>
        <p style={{margin:'0 0 20px', fontSize:12, color:'#6B7280'}}>Your edits haven't been saved.</p>
        <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
          <button onClick={onClose} style={btnOut}>Keep Editing</button>
          <button onClick={onConfirm} style={btnDan}>Discard</button>
        </div>
      </div>
    </div>
  );
};

const overlay = {position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:40, display:'grid', placeItems:'center', fontFamily:'Inter'};
const modal = {background:'#fff', borderRadius:10, padding:24, boxShadow:'0 8px 32px rgba(0,0,0,0.2)'};
const lbl = {display:'block', marginBottom:12, fontSize:11, fontWeight:600, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.03em'};
const inp = {width:'100%', padding:'8px 12px', border:'1px solid #DFE2E8', borderRadius:6, fontSize:13, fontFamily:'Inter', boxSizing:'border-box', outline:'none', marginTop:6, background:'#fff'};
const req = {color:'#DC2626', marginLeft:2};
const btnDan = {background:'#DC2626', color:'#fff', border:0, padding:'9px 20px', borderRadius:6, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter'};
const btnOut = {background:'#fff', color:'#6B7280', border:'1px solid #DFE2E8', padding:'9px 16px', borderRadius:6, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter'};
