/* global React */
const { useState } = React;

window.Wizard = function Wizard({ onExit, onFinish, onRequestUnsaved }) {
  const [step, setStep] = useState(1);
  const [dirty, setDirty] = useState(false);
  const steps = ['Basic Setup', 'Condition', 'Reward & Turnover', 'Info / Announcement'];

  const StepHead = (
    <div style={{display:'flex', alignItems:'center', gap:10, background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:'16px 20px', marginBottom:16}}>
      {steps.map((s, i) => {
        const n = i + 1;
        const done = n < step, cur = n === step;
        return (
          <React.Fragment key={n}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <div style={{width:26, height:26, borderRadius:'50%', display:'grid', placeItems:'center', color:'#fff', fontSize:11, fontWeight:600,
                background: done ? '#16A34A' : cur ? '#2563EB' : '#DFE2E8', color: (done||cur) ? '#fff' : '#6B7280'}}>{done ? '✓' : n}</div>
              <span style={{fontSize:12, color: cur ? '#2563EB' : '#6B7280', fontWeight: cur ? 600 : 500}}>{s}</span>
            </div>
            {i < steps.length-1 && <div style={{height:2, flex:1, background: done ? '#16A34A' : '#DFE2E8'}} />}
          </React.Fragment>
        );
      })}
    </div>
  );

  const field = (label, input) => (
    <label style={{display:'block', marginBottom:14}}>
      <div style={{fontSize:11, fontWeight:600, color:'#6B7280', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.03em'}}>{label}</div>
      {input}
    </label>
  );
  const inp = {width:'100%', padding:'8px 12px', border:'1px solid #DFE2E8', borderRadius:6, fontSize:13, fontFamily:'Inter', boxSizing:'border-box', outline:'none', background:'#fff'};

  const onChange = () => setDirty(true);

  const Body = () => {
    if (step === 1) return (
      <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:24}}>
        {field('Promotion Name', <input onChange={onChange} defaultValue="100% First Deposit Bonus" style={inp} />)}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
          {field('Promotion Type', <select onChange={onChange} style={inp}><option>Deposit Bonus</option><option>Cashback</option><option>Rebate</option></select>)}
          {field('Max Claims', <input onChange={onChange} type="number" defaultValue={10000} style={inp} />)}
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
          {field('Start Time', <input onChange={onChange} type="datetime-local" defaultValue="2026-04-10T00:00" style={inp} />)}
          {field('End Time',   <input onChange={onChange} type="datetime-local" defaultValue="2026-04-30T23:59" style={inp} />)}
        </div>
      </div>
    );
    if (step === 2) return (
      <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:24}}>
        <div style={{fontSize:13, fontWeight:600, marginBottom:12, color:'#1A1D26'}}>Trigger Conditions (AND combination)</div>
        {[
          ['C1 · When deposit is the Nth of day', true, '1'],
          ['C2 · When cumulative deposit count reaches N', false, ''],
          ['C3 · Cumulative daily deposit amount', false, ''],
          ['C4 · Days since registration within N', true, '30'],
          ['C5 · Time limit after first deposit', false, ''],
        ].map(([lbl, on, val]) => (
          <div key={lbl} style={{display:'flex', gap:12, alignItems:'center', padding:'10px 0', borderBottom:'1px solid #F0F1F3'}}>
            <input type="checkbox" defaultChecked={on} onChange={onChange} />
            <div style={{flex:1, fontSize:12}}>{lbl}</div>
            <input defaultValue={val} placeholder="N" style={{...inp, width:80, padding:'6px 10px'}} onChange={onChange} />
          </div>
        ))}
      </div>
    );
    if (step === 3) return (
      <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:24}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
          {field('Bonus Value Type', <select onChange={onChange} style={inp}><option>Percentage</option><option>Fixed</option></select>)}
          {field('Percentage', <input onChange={onChange} type="number" defaultValue={100} style={inp} />)}
          {field('Turnover Model', <select onChange={onChange} style={inp}><option>Bonus × Multiplier</option><option>(Deposit + Bonus) × Multiplier</option></select>)}
          {field('Multiplier', <input onChange={onChange} type="number" defaultValue={30} style={inp} />)}
        </div>
        <div style={{background:'#EFF3FF', border:'1px solid #BFDBFE', borderRadius:6, padding:'10px 14px', fontSize:12, color:'#1E40AF', marginTop:8}}>
          Formula preview: <strong>Bonus Turnover = Bonus × 30</strong> · Example: ₱1,500 bonus → bet ₱45,000 to withdraw
        </div>
      </div>
    );
    return (
      <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:24, display:'grid', gridTemplateColumns:'1fr 300px', gap:24}}>
        <div>
          {field('Display Tag', <input onChange={onChange} defaultValue="FIRST DEPOSIT" style={inp} />)}
          {field('Title', <input onChange={onChange} defaultValue="100% First Deposit Bonus" style={inp} />)}
          {field('Subtext', <input onChange={onChange} defaultValue="Up to ₱5,000 · Bet ₱45,000 to withdraw" style={inp} />)}
          {field('T&C (Markdown)', <textarea onChange={onChange} rows={5} defaultValue="1. Only first deposit is eligible.&#10;2. Min deposit ₱500.&#10;3. Bonus expires in 30 days." style={{...inp, fontFamily:'Inter', resize:'vertical'}} />)}
        </div>
        <div>
          <div style={{fontSize:11, fontWeight:600, color:'#6B7280', marginBottom:6, textTransform:'uppercase'}}>Preview</div>
          <div style={{borderRadius:14, overflow:'hidden', border:'1px solid #DFE2E8', fontFamily:'Poppins'}}>
            <div style={{background:'var(--player-gradient-banner)', color:'#fff', padding:14, display:'flex', gap:10, alignItems:'center'}}>
              <div style={{width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.2)', display:'grid', placeItems:'center', fontSize:18}}>🎁</div>
              <div>
                <div style={{fontSize:9, fontWeight:700, opacity:0.85}}>FIRST DEPOSIT</div>
                <div style={{fontSize:13, fontWeight:700}}>100% First Deposit Bonus</div>
                <div style={{fontSize:10, opacity:0.85}}>Up to ₱5,000 · Bet ₱45,000 to withdraw</div>
              </div>
            </div>
            <div style={{padding:10, background:'#fff', textAlign:'center'}}>
              <button style={{background:'var(--player-gradient-cta)', color:'#fff', padding:'7px 18px', borderRadius:9999, border:0, fontSize:11, fontWeight:600, fontFamily:'Poppins'}}>Claim Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const exit = () => { if (dirty) onRequestUnsaved(onExit); else onExit(); };

  return (
    <div>
      {StepHead}
      <Body />
      <div style={{display:'flex', justifyContent:'space-between', marginTop:20}}>
        <button onClick={exit} style={btnOut}>Cancel</button>
        <div style={{display:'flex', gap:8}}>
          {step > 1 && <button onClick={() => setStep(s => s-1)} style={btnOut}>← Back</button>}
          <button style={btnOut}>Save Draft</button>
          {step < 4 ? (
            <button onClick={() => setStep(s => s+1)} style={btnPri}>Next →</button>
          ) : (
            <button onClick={() => onFinish()} style={btnPri}>Publish</button>
          )}
        </div>
      </div>
    </div>
  );
};

const btnPri = {background:'#2563EB', color:'#fff', border:0, padding:'9px 20px', borderRadius:6, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter'};
const btnOut = {background:'#fff', color:'#6B7280', border:'1px solid #DFE2E8', padding:'9px 16px', borderRadius:6, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter'};
