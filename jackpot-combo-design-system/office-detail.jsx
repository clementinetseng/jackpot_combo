/* global React, JC_DATA */
const { useState, useEffect } = React;

// ============================================================
// Backoffice Detail, Templates, Confirm Modal
// ============================================================

window.OfficeDetail = function OfficeDetail({ msg, onBack, onToggle }) {
  const C = JC_DATA.CATEGORIES[msg.category];
  const [batchProgress, setBatchProgress] = useState(msg.status === 'scheduled' ? 0 : 100);
  const [animating, setAnimating] = useState(false);

  // Animate batch on mount if active
  useEffect(() => {
    if (msg.status === 'active' && msg.sent > 0) {
      setBatchProgress(0);
      setAnimating(true);
      let p = 0;
      const id = setInterval(() => {
        p += 4 + Math.random()*5;
        if (p >= 100) { p = 100; clearInterval(id); setAnimating(false); }
        setBatchProgress(Math.round(p));
      }, 80);
      return () => clearInterval(id);
    }
  }, [msg.id]);

  const sentNow = Math.round(msg.sent * batchProgress / 100);
  const readPct = msg.sent > 0 ? Math.round((msg.read / msg.sent) * 100) : 0;
  const ctaPct = msg.sent > 0 ? Math.round((msg.ctaClicks / msg.sent) * 100) : 0;

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:14}}>
        <button onClick={onBack} style={{background:'#fff', border:'1px solid #DFE2E8', padding:'7px 14px', borderRadius:6, fontSize:12, cursor:'pointer'}}>← Back</button>
        <div style={{fontSize:13, color:'#6B7280'}}>Messaging / <span style={{color:'#1A1D26', fontWeight:500}}>{msg.id}</span></div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:16}}>
        <div>
          {/* Stats */}
          <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:'18px 20px', marginBottom:16}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14}}>
              <div>
                <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:6}}>
                  <span style={catChip(C)}>{C.icon} {C.label}</span>
                  {msg.status === 'active' && <ToggleSwitch on onClick={() => onToggle(msg)} />}
                  {msg.status === 'disabled' && <ToggleSwitch on={false} onClick={() => onToggle(msg)} />}
                  {msg.status === 'scheduled' && <span style={statusPillStyle('#EFF3FF', '#1E40AF')}>⏰ Scheduled</span>}
                  {msg.status === 'draft' && <span style={statusPillStyle('#F3F4F6', '#4B5563')}>✎ Draft</span>}
                </div>
                <h2 style={{margin:0, fontSize:18, fontWeight:700, color:'#1A1D26'}}>{msg.title}</h2>
                <div style={{fontSize:12, color:'#6B7280', marginTop:4}}>Sent by {msg.sentBy} · {msg.sentAt}</div>
              </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12, paddingTop:14, borderTop:'1px solid #F0F1F3'}}>
              <Stat label="Recipients" value={msg.estimated.toLocaleString()} sub={msg.recipientLabel} />
              <Stat label="Sent" value={sentNow.toLocaleString()} sub={`${batchProgress}% of batch`} />
              <Stat label="Read" value={msg.read.toLocaleString()} sub={`${readPct}% open rate`} color="#2563EB" />
              <Stat label="CTA clicks" value={msg.ctaClicks.toLocaleString()} sub={msg.ctaClicks > 0 ? `${ctaPct}% click rate` : '—'} color="#7C3AED" />
            </div>

            {msg.status === 'active' && (
              <div style={{marginTop:14}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'#6B7280', marginBottom:4}}>
                  <span>Batch send progress</span>
                  <span style={{fontVariantNumeric:'tabular-nums', color: animating ? '#2563EB' : '#16A34A', fontWeight:600}}>{animating ? `${sentNow.toLocaleString()} / ${msg.sent.toLocaleString()}` : '✓ Complete'}</span>
                </div>
                <div style={{height:6, background:'#F0F1F3', borderRadius:9999, overflow:'hidden'}}>
                  <div style={{
                    height:'100%', width:`${batchProgress}%`,
                    background: animating ? 'linear-gradient(90deg, #2563EB, #7C3AED)' : '#16A34A',
                    transition:'width 300ms ease',
                  }} />
                </div>
              </div>
            )}
          </div>

          {/* Body preview */}
          <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:'18px 20px', marginBottom:16}}>
            <div style={{fontSize:11, fontWeight:600, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:10}}>Message body</div>
            <div style={{fontSize:13, color:'#1A1D26', lineHeight:1.6, padding:'12px 14px', background:'#F8F9FB', borderRadius:6}}>
              {msg.title === 'Weekend Slots Cashback is live 🎰' ? 'Play your favourite slots from Fri to Sun and earn up to 8% cashback. No claim button — cashback lands automatically every Monday.'
                : msg.title === 'Scheduled maintenance · Apr 30' ? 'Heads up — we\'ll be running platform upgrades on Apr 30 from 03:00 to 04:30 (UTC+8). Slots and live games will be briefly unavailable. Sorry for the bump.'
                : 'Lorem ipsum body content of this message…'}
            </div>
          </div>

          {/* Audit log */}
          <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:'18px 20px'}}>
            <div style={{fontSize:13, fontWeight:600, color:'#1A1D26', marginBottom:12, display:'flex', alignItems:'center', gap:6}}>📋 Audit log <span style={{fontSize:10, color:'#6B7280', fontWeight:500}}>(synced to platform audit system)</span></div>
            {[
              { t:msg.sentAt, who:msg.sentBy, action:`Published message ${msg.id}`, snap:`category=${msg.category}, recipients=${msg.recipientLabel}, est=${msg.estimated.toLocaleString()}` },
              { t:'2026-04-25 16:42', who:msg.sentBy, action:'Updated draft body', snap:'body length 142 → 168' },
              { t:'2026-04-25 16:30', who:msg.sentBy, action:'Created draft', snap:'category=' + msg.category },
            ].map((e, i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'120px 90px 1fr', padding:'10px 0', borderBottom: i < 2 ? '1px solid #F0F1F3' : 0, fontSize:11}}>
                <div style={{color:'#6B7280', fontVariantNumeric:'tabular-nums'}}>{e.t}</div>
                <div style={{color:'#1A1D26', fontWeight:500}}>{e.who}</div>
                <div>
                  <div style={{color:'#1A1D26', fontWeight:500}}>{e.action}</div>
                  <div style={{color:'#9CA3AF', fontSize:10, marginTop:2}}>{e.snap}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Player preview */}
        <div>
          <div style={{fontSize:11, fontWeight:600, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:8}}>Player view</div>
          <div style={{borderRadius:14, overflow:'hidden', border:'1px solid #DFE2E8', fontFamily:'Poppins', background:'#fff'}}>
            <div style={{background:'var(--player-gradient-banner)', color:'#fff', padding:'14px 14px 18px'}}>
              <div style={{display:'inline-flex', alignItems:'center', gap:5, background:'rgba(255,255,255,0.22)', padding:'3px 9px', borderRadius:9999, fontSize:10, fontWeight:600}}>
                <span>{C.icon}</span><span>{C.label}</span>
              </div>
              <div style={{fontSize:14, fontWeight:700, marginTop:8, lineHeight:1.3}}>{msg.title}</div>
              <div style={{fontSize:10, opacity:0.85, marginTop:4}}>{msg.sentAt} · ID {msg.id}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Stat({ label, value, sub, color = '#1A1D26' }) {
  return (
    <div>
      <div style={{fontSize:10, color:'#6B7280', textTransform:'uppercase', fontWeight:600, letterSpacing:'0.04em'}}>{label}</div>
      <div style={{fontSize:22, fontWeight:700, color, marginTop:2, fontVariantNumeric:'tabular-nums'}}>{value}</div>
      <div style={{fontSize:10, color:'#9CA3AF', marginTop:2}}>{sub}</div>
    </div>
  );
}

function ToggleSwitch({ on, onClick }) {
  return (
    <button onClick={onClick} style={{
      background:'transparent', border:0, cursor:'pointer', padding:0,
      display:'inline-flex', alignItems:'center', gap:6,
    }}>
      <span style={{
        width:32, height:18, borderRadius:9999, background: on ? '#16A34A' : '#DFE2E8',
        position:'relative', transition:'background 150ms', display:'inline-block',
      }}>
        <span style={{position:'absolute', top:2, left: on ? 16 : 2, width:14, height:14, background:'#fff', borderRadius:'50%', transition:'left 150ms'}} />
      </span>
      <span style={{fontSize:11, color: on ? '#16A34A' : '#9CA3AF', fontWeight:600}}>{on ? 'Active' : 'Disabled'}</span>
    </button>
  );
}

function catChip(C) { return {display:'inline-flex', alignItems:'center', gap:4, background:`${C.color}15`, color:C.color, padding:'2px 9px', borderRadius:9999, fontSize:11, fontWeight:600, border:`1px solid ${C.color}33`}; }
function statusPillStyle(bg, fg) { return {display:'inline-flex', alignItems:'center', gap:5, background:bg, color:fg, padding:'3px 9px', borderRadius:9999, fontSize:11, fontWeight:600}; }

// ============================================================
// Templates page
// ============================================================
window.OfficeTemplates = function OfficeTemplates() {
  const [active, setActive] = useState(JC_DATA.TEMPLATES[0].id);
  const tpl = JC_DATA.TEMPLATES.find(t => t.id === active);
  const C = JC_DATA.CATEGORIES[tpl.category];
  const rendered = JC_DATA.render(tpl, JC_DATA.SEED_VARS);

  return (
    <div>
      <div style={{padding:'12px 14px', background:'#FFFBEB', border:'1px solid #FCD34D', borderRadius:8, marginBottom:16, display:'flex', alignItems:'flex-start', gap:10}}>
        <span style={{fontSize:18}}>📌</span>
        <div>
          <div style={{fontSize:12, fontWeight:600, color:'#92400E'}}>Read-only · Managed via config</div>
          <div style={{fontSize:11, color:'#92400E', marginTop:2, lineHeight:1.5}}>
            Per PRD §7.4, MVP doesn't ship a template editor. Copy changes go through <code style={{background:'#FEF3C7', padding:'1px 5px', borderRadius:3, fontSize:10}}>jackpot_combo/config/messaging-templates.yaml</code> → ticket → deploy. Hotfix supported.
          </div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'320px 1fr', gap:16}}>
        <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, overflow:'hidden'}}>
          <div style={{padding:'10px 14px', background:'#F8F9FB', borderBottom:'1px solid #DFE2E8', fontSize:11, fontWeight:600, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.04em'}}>12 events</div>
          <div style={{maxHeight:520, overflow:'auto'}}>
            {JC_DATA.TEMPLATES.map(t => {
              const C2 = JC_DATA.CATEGORIES[t.category];
              const on = t.id === active;
              return (
                <button key={t.id} onClick={() => setActive(t.id)} style={{
                  width:'100%', textAlign:'left', border:0,
                  background: on ? '#EFF3FF' : '#fff', cursor:'pointer',
                  padding:'10px 14px', borderBottom:'1px solid #F0F1F3', fontFamily:'Inter',
                  borderLeft: on ? '3px solid #2563EB' : '3px solid transparent',
                }}>
                  <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:2}}>
                    <span style={{fontSize:13}}>{C2.icon}</span>
                    <code style={{fontSize:11, color: on ? '#1E40AF' : '#1A1D26', fontWeight:600, fontFamily:'ui-monospace, Menlo, monospace'}}>{t.id}</code>
                    {t.toast && <span style={{marginLeft:'auto', fontSize:9, background:'#FEF3C7', color:'#92400E', padding:'1px 5px', borderRadius:3, fontWeight:600}}>TOAST</span>}
                  </div>
                  <div style={{fontSize:11, color:'#6B7280', marginLeft:19, lineHeight:1.3}}>{t.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, padding:'18px 20px', marginBottom:14}}>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14}}>
              <span style={catChip(C)}>{C.icon} {C.label}</span>
              {tpl.toast && <span style={statusPillStyle('#FEF3C7', '#92400E')}>🔔 Toast</span>}
              <code style={{marginLeft:'auto', fontSize:11, color:'#6B7280', background:'#F3F4F6', padding:'3px 8px', borderRadius:4, fontFamily:'ui-monospace, Menlo, monospace'}}>{tpl.id}</code>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
              <div>
                <div style={{fontSize:10, color:'#6B7280', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:6}}>Title template</div>
                <div style={codeBlk()}>{tpl.title}</div>

                <div style={{fontSize:10, color:'#6B7280', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em', marginTop:14, marginBottom:6}}>Body template</div>
                <div style={codeBlk()}>{tpl.body}</div>

                <div style={{fontSize:10, color:'#6B7280', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em', marginTop:14, marginBottom:6}}>CTA</div>
                {tpl.cta ? (
                  <div style={codeBlk()}>{tpl.cta.label} → <code>{tpl.cta.url}</code></div>
                ) : <div style={{fontSize:11, color:'#9CA3AF', fontStyle:'italic'}}>None</div>}

                <div style={{fontSize:10, color:'#6B7280', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em', marginTop:14, marginBottom:6}}>Variables</div>
                <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
                  {tpl.vars.map(v => (
                    <code key={v} style={{fontSize:10, padding:'2px 7px', background:'#F0F4FF', color:'#1E40AF', borderRadius:4, fontFamily:'ui-monospace, Menlo, monospace', border:'1px solid #BFDBFE'}}>{`{{${v}}}`}</code>
                  ))}
                </div>
              </div>

              {/* Rendered preview */}
              <div>
                <div style={{fontSize:10, color:'#6B7280', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:8}}>Rendered with sample vars</div>
                <div style={{borderRadius:14, overflow:'hidden', border:'1px solid #DFE2E8', fontFamily:'Poppins', background:'#fff'}}>
                  <div style={{background:'var(--player-gradient-banner)', color:'#fff', padding:'14px 14px 18px'}}>
                    <div style={{display:'inline-flex', alignItems:'center', gap:5, background:'rgba(255,255,255,0.22)', padding:'3px 9px', borderRadius:9999, fontSize:10, fontWeight:600}}>
                      <span>{C.icon}</span><span>{C.label}</span>
                    </div>
                    <div style={{fontSize:14, fontWeight:700, marginTop:8, lineHeight:1.3}}>{rendered.title}</div>
                  </div>
                  <div style={{padding:14}}>
                    <div style={{fontSize:12, color:'#2D1B4E', lineHeight:1.55}}>{rendered.body}</div>
                    {rendered.cta && (
                      <button style={{marginTop:12, width:'100%', background:'var(--player-gradient-cta)', color:'#fff', border:0, padding:'10px 14px', borderRadius:9999, fontSize:12, fontWeight:700, fontFamily:'Poppins', cursor:'pointer'}}>{rendered.cta.label} →</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function codeBlk() { return {fontSize:11.5, color:'#1A1D26', background:'#F8F9FB', border:'1px solid #E5E7EB', padding:'10px 12px', borderRadius:6, fontFamily:'ui-monospace, Menlo, monospace', lineHeight:1.55, whiteSpace:'pre-wrap'}; }

// ============================================================
// Confirm modal
// ============================================================
window.ConfirmModal = function ConfirmModal({ kind, msg, confirm, onCancel }) {
  const isDisable = kind === 'disable';
  return (
    <div style={{
      position:'absolute', inset:0, background:'rgba(45,27,78,0.4)',
      display:'grid', placeItems:'center', zIndex:50, animation:'fadeIn 200ms',
    }}>
      <div style={{
        background:'#fff', borderRadius:10, padding:'24px 28px', maxWidth:440,
        boxShadow:'0 20px 60px rgba(0,0,0,0.25)', fontFamily:'Inter',
        animation:'modalIn 250ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
        <div style={{fontSize:32, marginBottom:8}}>{isDisable ? '⚠️' : '✅'}</div>
        <h2 style={{margin:0, fontSize:17, fontWeight:700, color:'#1A1D26'}}>
          {isDisable ? 'Disable this message?' : 'Re-enable this message?'}
        </h2>
        <div style={{fontSize:13, color:'#6B7280', marginTop:8, lineHeight:1.5}}>
          {isDisable
            ? <>Players will no longer see <strong style={{color:'#1A1D26'}}>{msg.title}</strong> in their inbox. Read history and audit log are preserved. You can re-enable any time.</>
            : <>Players will see <strong style={{color:'#1A1D26'}}>{msg.title}</strong> again. Re-enabling will <strong>not</strong> push a new toast notification — only the inbox visibility is restored.</>}
        </div>
        <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:18}}>
          <button onClick={onCancel} style={{background:'#fff', color:'#6B7280', border:'1px solid #DFE2E8', padding:'8px 16px', borderRadius:6, fontSize:13, fontWeight:500, cursor:'pointer'}}>Cancel</button>
          <button onClick={confirm} style={{
            background: isDisable ? '#EF4444' : '#16A34A', color:'#fff', border:0,
            padding:'8px 18px', borderRadius:6, fontSize:13, fontWeight:600, cursor:'pointer',
          }}>{isDisable ? 'Disable' : 'Re-enable'}</button>
        </div>
      </div>
    </div>
  );
};
