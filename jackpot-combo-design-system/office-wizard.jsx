/* global React, JC_DATA */
const { useState } = React;

// ============================================================
// Backoffice Wizard — 4-step compose flow
// ============================================================

window.OfficeWizard = function OfficeWizard({ onCancel, onPublish }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [form, setForm] = useState({
    title: 'Weekend Slots Cashback is live 🎰',
    category: 'promo',
    body: 'Play your favourite slots from Fri to Sun and earn up to 8% cashback. No claim button — cashback lands automatically every Monday.',
    ctaEnabled: true,
    ctaLabel: 'View Promotion',
    ctaUrl: '/promo/weekend-cashback',
    toast: false,
    recipientMode: 'condition',
    conditions: [
      { field:'vip_level', op:'≥', value:'3' },
      { field:'status', op:'=', value:'active' },
    ],
    estimated: 8421,
    sendMode: 'now',
    scheduledAt: '2026-04-29T09:00',
  });
  const update = (k, v) => setForm(f => ({...f, [k]: v}));

  const steps = ['Compose', 'Recipients', 'Schedule', 'Review'];

  const goNext = () => { setDirection(1); setStep(s => Math.min(4, s+1)); };
  const goBack = () => { setDirection(-1); setStep(s => Math.max(1, s-1)); };

  return (
    <div>
      <StepHead steps={steps} step={step} />
      <div style={{position:'relative', minHeight:380}}>
        <div key={step} style={{
          animation: `wizardSlide${direction >= 0 ? 'In' : 'InBack'} 280ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        }}>
          {step === 1 && <Step1Compose form={form} update={update} />}
          {step === 2 && <Step2Recipients form={form} update={update} />}
          {step === 3 && <Step3Schedule form={form} update={update} />}
          {step === 4 && <Step4Review form={form} />}
        </div>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:18}}>
        <button onClick={onCancel} style={btnOut}>Cancel</button>
        <div style={{display:'flex', gap:8}}>
          {step > 1 && <button onClick={goBack} style={btnOut}>← Back</button>}
          <button style={btnOut}>Save Draft</button>
          {step < 4 ? (
            <button onClick={goNext} style={btnPri}>Next →</button>
          ) : (
            <button onClick={onPublish} style={btnPub}>📤 Publish</button>
          )}
        </div>
      </div>
    </div>
  );
};

function StepHead({ steps, step }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:'14px 20px', marginBottom:16}}>
      {steps.map((s, i) => {
        const n = i + 1;
        const done = n < step, cur = n === step;
        return (
          <React.Fragment key={n}>
            <div style={{display:'flex', alignItems:'center', gap:8, transition:'all 250ms'}}>
              <div style={{
                width:26, height:26, borderRadius:'50%', display:'grid', placeItems:'center',
                fontSize:11, fontWeight:600,
                background: done ? '#16A34A' : cur ? '#2563EB' : '#DFE2E8',
                color: (done||cur) ? '#fff' : '#6B7280',
                transition:'background 250ms',
                boxShadow: cur ? '0 0 0 4px rgba(37,99,235,0.15)' : 'none',
              }}>{done ? '✓' : n}</div>
              <span style={{fontSize:12, color: cur ? '#2563EB' : done ? '#16A34A' : '#6B7280', fontWeight: cur ? 600 : 500, transition:'color 250ms'}}>{s}</span>
            </div>
            {i < steps.length-1 && <div style={{height:2, flex:1, background: done ? '#16A34A' : '#DFE2E8', transition:'background 350ms'}} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ---------- Step 1: Compose ----------
function Step1Compose({ form, update }) {
  return (
    <div style={cardStyle()}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:24}}>
        <div>
          {field('Title', <input value={form.title} onChange={e => update('title', e.target.value)} style={inp} maxLength={60} />,
            <span style={{fontSize:10, color:'#9CA3AF'}}>{form.title.length}/60</span>)}

          {field('Category',
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
              {['personal','promo','system'].map(c => {
                const C = JC_DATA.CATEGORIES[c];
                const on = form.category === c;
                return (
                  <button key={c} onClick={() => update('category', c)} style={{
                    border: on ? `2px solid ${C.color}` : '1px solid #DFE2E8',
                    background: on ? `${C.color}10` : '#fff',
                    padding:'10px 12px', borderRadius:8, cursor:'pointer',
                    display:'flex', alignItems:'center', gap:8, fontFamily:'Inter',
                    color: on ? C.color : '#1A1D26', fontWeight: on ? 600 : 500, fontSize:12,
                    transition:'all 150ms',
                  }}>
                    <span style={{fontSize:16}}>{C.icon}</span>
                    <span>{C.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {field('Body',
            <div>
              <div style={{display:'flex', gap:4, padding:'4px', border:'1px solid #DFE2E8', borderBottom:0, borderRadius:'6px 6px 0 0', background:'#F8F9FB'}}>
                {['B','I','🔗','🖼','📋'].map(t => (
                  <button key={t} style={{width:26, height:26, border:0, background:'transparent', borderRadius:4, cursor:'pointer', fontSize:11, color:'#6B7280', fontWeight: t==='B'?700:500}}>{t}</button>
                ))}
              </div>
              <textarea value={form.body} onChange={e => update('body', e.target.value)} rows={5}
                style={{...inp, borderRadius:'0 0 6px 6px', resize:'vertical', fontFamily:'Inter'}} />
              <div style={{fontSize:10, color:'#9CA3AF', marginTop:4}}>Markdown subset · No raw HTML for security</div>
            </div>
          )}

          <div style={{display:'flex', gap:14, marginBottom:14}}>
            <label style={{display:'flex', alignItems:'center', gap:8, cursor:'pointer'}}>
              <input type="checkbox" checked={form.ctaEnabled} onChange={e => update('ctaEnabled', e.target.checked)} />
              <span style={{fontSize:12, fontWeight:500}}>Add CTA button</span>
            </label>
            <label style={{display:'flex', alignItems:'center', gap:8, cursor:'pointer'}}>
              <input type="checkbox" checked={form.toast} onChange={e => update('toast', e.target.checked)} />
              <span style={{fontSize:12, fontWeight:500}}>Trigger toast notification</span>
              <span style={{fontSize:10, color:'#9CA3AF'}}>(Personal only)</span>
            </label>
          </div>

          {form.ctaEnabled && (
            <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:10}}>
              {field('Button label', <input value={form.ctaLabel} onChange={e => update('ctaLabel', e.target.value)} style={inp} />)}
              {field('URL (whitelist or internal)', <input value={form.ctaUrl} onChange={e => update('ctaUrl', e.target.value)} style={inp} />)}
            </div>
          )}
        </div>

        {/* Live preview */}
        <div>
          <div style={{fontSize:10, fontWeight:600, color:'#6B7280', textTransform:'uppercase', marginBottom:8, letterSpacing:'0.04em'}}>Live preview · Player view</div>
          <div style={{borderRadius:14, overflow:'hidden', border:'1px solid #DFE2E8', fontFamily:'Poppins', background:'#fff'}}>
            <div style={{background:'var(--player-gradient-banner)', color:'#fff', padding:'14px 14px 18px'}}>
              <div style={{display:'inline-flex', alignItems:'center', gap:5, background:'rgba(255,255,255,0.22)', padding:'3px 9px', borderRadius:9999, fontSize:10, fontWeight:600}}>
                <span>{JC_DATA.CATEGORIES[form.category].icon}</span>
                <span>{JC_DATA.CATEGORIES[form.category].label}</span>
              </div>
              <div style={{fontSize:14, fontWeight:700, marginTop:8, lineHeight:1.3}}>{form.title || 'Title preview'}</div>
              <div style={{fontSize:10, opacity:0.85, marginTop:4}}>Just now · ID M-XXXX</div>
            </div>
            <div style={{padding:14}}>
              <div style={{fontSize:12, color:'#2D1B4E', lineHeight:1.55, whiteSpace:'pre-wrap'}}>{form.body || 'Body preview'}</div>
              {form.ctaEnabled && (
                <button style={{
                  marginTop:12, width:'100%', background:'var(--player-gradient-cta)', color:'#fff',
                  border:0, padding:'10px 14px', borderRadius:9999, fontSize:12, fontWeight:700,
                  fontFamily:'Poppins', boxShadow:'0 4px 14px -4px rgba(139,102,255,0.6)', cursor:'pointer',
                }}>{form.ctaLabel || 'CTA →'}</button>
              )}
            </div>
          </div>
          {form.toast && (
            <div style={{marginTop:10, padding:'8px 10px', background:'#FEF3C7', border:'1px solid #F59E0B', borderRadius:6, fontSize:11, color:'#92400E', display:'flex', gap:6}}>
              <span>⚠️</span>
              <span>Toast will pop on the player's screen if they're online — use sparingly.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Step 2: Recipients ----------
function Step2Recipients({ form, update }) {
  const modes = [
    { id:'single', icon:'👤', label:'Single player', desc:'One user — best for support follow-ups' },
    { id:'manual', icon:'📋', label:'Manual list', desc:'Paste user IDs (comma or newline)' },
    { id:'condition', icon:'🎯', label:'Condition combo', desc:'VIP, status, first deposit, signup window' },
    { id:'broadcast', icon:'🌐', label:'All players', desc:'Site-wide broadcast (needs confirmation)' },
  ];
  return (
    <div style={cardStyle()}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:18}}>
        {modes.map(m => {
          const on = form.recipientMode === m.id;
          return (
            <button key={m.id} onClick={() => update('recipientMode', m.id)} style={{
              border: on ? '2px solid #2563EB' : '1px solid #DFE2E8',
              background: on ? '#EFF3FF' : '#fff',
              padding:'12px 14px', borderRadius:8, cursor:'pointer', textAlign:'left',
              display:'flex', alignItems:'flex-start', gap:10, fontFamily:'Inter',
            }}>
              <span style={{fontSize:18}}>{m.icon}</span>
              <div>
                <div style={{fontSize:13, fontWeight:600, color: on ? '#1E40AF' : '#1A1D26'}}>{m.label}</div>
                <div style={{fontSize:11, color:'#6B7280', marginTop:2}}>{m.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {form.recipientMode === 'condition' && (
        <div>
          <div style={{fontSize:11, fontWeight:600, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:10}}>Conditions (AND)</div>
          {form.conditions.map((c, i) => (
            <div key={i} style={{display:'grid', gridTemplateColumns:'180px 80px 1fr 32px', gap:8, marginBottom:8}}>
              <select value={c.field} style={inp} onChange={e => {
                const conds = [...form.conditions]; conds[i] = {...c, field:e.target.value}; update('conditions', conds);
              }}>
                <option value="vip_level">VIP level</option>
                <option value="status">Player status</option>
                <option value="first_deposit">First deposit</option>
                <option value="signup_within">Signup within</option>
              </select>
              <select value={c.op} style={inp} onChange={e => {
                const conds = [...form.conditions]; conds[i] = {...c, op:e.target.value}; update('conditions', conds);
              }}>
                <option>=</option><option>≥</option><option>≤</option><option>≠</option>
              </select>
              <input value={c.value} style={inp} onChange={e => {
                const conds = [...form.conditions]; conds[i] = {...c, value:e.target.value}; update('conditions', conds);
              }} />
              <button onClick={() => update('conditions', form.conditions.filter((_,j) => j !== i))}
                style={{...iconBtn, color:'#EF4444', borderColor:'#FECACA'}}>×</button>
            </div>
          ))}
          <button onClick={() => update('conditions', [...form.conditions, {field:'vip_level', op:'≥', value:'1'}])}
            style={{...btnOut, fontSize:12, padding:'7px 14px', marginTop:4}}>+ Add condition</button>

          <div style={{marginTop:18, padding:'14px 16px', background:'linear-gradient(90deg, #EFF3FF 0%, #F5F3FF 100%)', border:'1px solid #BFDBFE', borderRadius:8,
            display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize:11, color:'#1E40AF', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em'}}>Estimated reach</div>
              <div style={{fontSize:24, fontWeight:700, color:'#1E40AF', fontVariantNumeric:'tabular-nums', marginTop:2}}>{form.estimated.toLocaleString()} players</div>
              <div style={{fontSize:11, color:'#6B7280', marginTop:2}}>Updated live as conditions change</div>
            </div>
            <button style={{...btnOut, fontSize:12}}>↻ Refresh</button>
          </div>
        </div>
      )}

      {form.recipientMode === 'broadcast' && (
        <div style={{padding:'14px 16px', background:'#FEF3C7', border:'1px solid #F59E0B', borderRadius:8}}>
          <div style={{fontSize:13, fontWeight:600, color:'#92400E', display:'flex', alignItems:'center', gap:8}}>⚠️ Broadcast confirmation required</div>
          <div style={{fontSize:12, color:'#92400E', marginTop:4, lineHeight:1.5}}>
            This will send to <strong>48,230 players</strong>. You'll be asked to confirm again before publishing.
          </div>
        </div>
      )}

      {form.recipientMode === 'manual' && (
        <textarea rows={5} placeholder="Paste user IDs separated by comma or newline" style={{...inp, fontFamily:'Inter', resize:'vertical'}} defaultValue={"U-10042, U-10381, U-22014\nU-39201"} />
      )}

      {form.recipientMode === 'single' && (
        <input style={inp} placeholder="Search by user ID or username…" defaultValue="U-10042 · juan_dlc" />
      )}
    </div>
  );
}

// ---------- Step 3: Schedule ----------
function Step3Schedule({ form, update }) {
  return (
    <div style={cardStyle()}>
      <div style={{fontSize:11, fontWeight:600, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:10}}>Send mode</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:18}}>
        {[
          ['now', '🚀 Send now', 'Goes out as soon as you publish'],
          ['scheduled', '⏰ Schedule for later', 'Editable until send time'],
        ].map(([id, lbl, desc]) => {
          const on = form.sendMode === id;
          return (
            <button key={id} onClick={() => update('sendMode', id)} style={{
              border: on ? '2px solid #2563EB' : '1px solid #DFE2E8',
              background: on ? '#EFF3FF' : '#fff',
              padding:'14px 16px', borderRadius:8, cursor:'pointer', textAlign:'left',
            }}>
              <div style={{fontSize:14, fontWeight:600, color: on ? '#1E40AF' : '#1A1D26'}}>{lbl}</div>
              <div style={{fontSize:11, color:'#6B7280', marginTop:2}}>{desc}</div>
            </button>
          );
        })}
      </div>

      {form.sendMode === 'scheduled' && (
        <div style={{marginBottom:18}}>
          {field('Send at (UTC+8)', <input type="datetime-local" value={form.scheduledAt} onChange={e => update('scheduledAt', e.target.value)} style={{...inp, maxWidth:280}} />)}
        </div>
      )}

      <div style={{padding:'14px 16px', background:'#F8F9FB', border:'1px solid #DFE2E8', borderRadius:8}}>
        <div style={{fontSize:12, fontWeight:600, color:'#1A1D26', marginBottom:8}}>Batch send</div>
        <div style={{fontSize:11, color:'#6B7280', lineHeight:1.55}}>
          Recipient count exceeds 5,000 — system will batch-send at <strong style={{color:'#1A1D26'}}>~2,000 msg / sec</strong> to avoid spikes. Default rate, no config needed. Total ETA: <strong style={{color:'#1A1D26'}}>~4 min</strong>.
        </div>
        <div style={{height:6, background:'#E5E7EB', borderRadius:9999, marginTop:10, overflow:'hidden'}}>
          <div style={{height:'100%', width:'0%', background:'#2563EB', transition:'width 350ms ease'}} />
        </div>
      </div>
    </div>
  );
}

// ---------- Step 4: Review ----------
function Step4Review({ form }) {
  const C = JC_DATA.CATEGORIES[form.category];
  const rows = [
    ['Title', form.title],
    ['Category', `${C.icon} ${C.label}`],
    ['Body length', `${form.body.length} chars`],
    ['CTA', form.ctaEnabled ? `${form.ctaLabel} → ${form.ctaUrl}` : 'None'],
    ['Toast', form.toast ? '✓ Yes (player will see slide-in)' : 'No'],
    ['Recipients', recipientLabel(form)],
    ['Estimated reach', `${form.estimated.toLocaleString()} players`],
    ['Send', form.sendMode === 'now' ? '🚀 Immediately upon publish' : `⏰ Scheduled · ${form.scheduledAt.replace('T', ' ')}`],
  ];
  return (
    <div style={cardStyle()}>
      <div style={{padding:'12px 14px', background:'#F0FDF4', border:'1px solid #86EFAC', borderRadius:8, marginBottom:16, display:'flex', alignItems:'center', gap:10}}>
        <span style={{fontSize:18}}>✅</span>
        <div>
          <div style={{fontSize:13, fontWeight:600, color:'#15803D'}}>Ready to publish</div>
          <div style={{fontSize:11, color:'#166534'}}>Action will be logged to the platform audit trail.</div>
        </div>
      </div>
      <div style={{border:'1px solid #DFE2E8', borderRadius:8, overflow:'hidden'}}>
        {rows.map(([k, v], i) => (
          <div key={k} style={{display:'grid', gridTemplateColumns:'180px 1fr', padding:'12px 16px', borderBottom: i < rows.length-1 ? '1px solid #F0F1F3' : 0,
            background: i % 2 === 0 ? '#fff' : '#F9FAFB'}}>
            <div style={{fontSize:11, color:'#6B7280', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em'}}>{k}</div>
            <div style={{fontSize:12, color:'#1A1D26', fontWeight:500}}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function recipientLabel(form) {
  if (form.recipientMode === 'single') return '👤 Single player · U-10042';
  if (form.recipientMode === 'manual') return '📋 Manual list · 4 IDs';
  if (form.recipientMode === 'broadcast') return '🌐 All players (broadcast)';
  return `🎯 Condition · ${form.conditions.map(c => `${c.field} ${c.op} ${c.value}`).join(' AND ')}`;
}

// shared styles
const inp = {width:'100%', padding:'8px 12px', border:'1px solid #DFE2E8', borderRadius:6, fontSize:13, fontFamily:'Inter', boxSizing:'border-box', outline:'none', background:'#fff'};
const iconBtn = {width:34, height:34, border:'1px solid #DFE2E8', background:'#fff', borderRadius:6, cursor:'pointer', fontSize:14, color:'#6B7280'};
const btnPri = {background:'#2563EB', color:'#fff', border:0, padding:'9px 20px', borderRadius:6, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter'};
const btnPub = {background:'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)', color:'#fff', border:0, padding:'9px 22px', borderRadius:6, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter', boxShadow:'0 2px 8px -2px rgba(37,99,235,0.5)'};
const btnOut = {background:'#fff', color:'#6B7280', border:'1px solid #DFE2E8', padding:'9px 16px', borderRadius:6, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter'};

function cardStyle() { return {background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:24}; }

function field(label, input, hint) {
  return (
    <label style={{display:'block', marginBottom:14}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
        <div style={{fontSize:11, fontWeight:600, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.03em'}}>{label}</div>
        {hint}
      </div>
      {input}
    </label>
  );
}
