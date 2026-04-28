/* global React, JC_DATA */
const { useState, useEffect } = React;

// ============================================================
// Backoffice — Messaging Center
// ============================================================

window.OfficeApp = function OfficeApp({ tweaks }) {
  const [page, setPage] = useState('list'); // list | wizard | detail | templates
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState(() => JC_DATA.officeMessages.map(m => ({...m})));
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(null), 2400);
  }

  function toggleStatus(id) {
    setMessages(prev => prev.map(m => {
      if (m.id !== id) return m;
      const next = m.status === 'active' ? 'disabled' : 'active';
      return { ...m, status: next };
    }));
  }

  const active = messages.find(m => m.id === activeId);

  return (
    <div style={{
      width:'100%', minWidth:1200, height:760,
      background:'#F5F6FA',
      borderRadius:14, overflow:'hidden',
      boxShadow:'0 20px 60px -10px rgba(45,27,78,0.3)',
      fontFamily:'Inter, sans-serif',
      display:'flex',
      border:'1px solid #DFE2E8',
    }}>
      <OfficeSidebar page={page} setPage={setPage} />
      <main style={{flex:1, minWidth:0, display:'flex', flexDirection:'column'}}>
        <OfficeHeader page={page} setPage={setPage} />
        <div style={{flex:1, padding:'20px 28px', overflow:'auto', position:'relative'}}>
          {page === 'list' && (
            <OfficeList messages={messages}
              onCreate={() => setPage('wizard')}
              onOpen={(id) => { setActiveId(id); setPage('detail'); }}
              onToggle={(m) => setConfirm({
                kind: m.status === 'active' ? 'disable' : 'enable',
                msg: m,
                confirm: () => { toggleStatus(m.id); showToast(m.status === 'active' ? 'Message disabled' : 'Message re-enabled'); setConfirm(null); }
              })}
            />
          )}
          {page === 'wizard' && (
            <OfficeWizard
              onCancel={() => setPage('list')}
              onPublish={() => {
                showToast('Promotion published — sending in batches');
                setPage('list');
              }}
            />
          )}
          {page === 'detail' && active && (
            <OfficeDetail msg={active} onBack={() => setPage('list')}
              onToggle={(m) => setConfirm({
                kind: m.status === 'active' ? 'disable' : 'enable',
                msg: m,
                confirm: () => { toggleStatus(m.id); showToast(m.status === 'active' ? 'Message disabled' : 'Message re-enabled'); setConfirm(null); }
              })}
            />
          )}
          {page === 'templates' && <OfficeTemplates />}

          {toast && (
            <div style={{
              position:'absolute', top:14, left:'50%', transform:'translateX(-50%)',
              background:'#1A1D26', color:'#fff', padding:'10px 18px',
              borderRadius:6, fontSize:13, fontWeight:500,
              boxShadow:'0 8px 24px rgba(0,0,0,0.2)', animation:'toastDrop 280ms',
            }}>{toast}</div>
          )}
        </div>
      </main>
      {confirm && <ConfirmModal {...confirm} onCancel={() => setConfirm(null)} />}
    </div>
  );
};

// ---------- Sidebar ----------
function OfficeSidebar({ page, setPage }) {
  const nav = [
    {id:'promotions', icon:'📢', label:'Promotions', disabled:true},
    {id:'list', icon:'✉️', label:'Messaging', match:['list','wizard','detail']},
    {id:'templates', icon:'📋', label:'Event Templates'},
    {id:'rewards', icon:'🎁', label:'Reward History', disabled:true},
    {id:'players', icon:'👤', label:'Players', disabled:true},
    {id:'reports', icon:'📊', label:'Reports', disabled:true},
  ];
  return (
    <aside style={{width:220, background:'#1E2433', color:'#A0A8B8', display:'flex', flexDirection:'column', flexShrink:0}}>
      <div style={{padding:'18px 18px 22px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #2D3548'}}>
        <div style={{width:30, height:30, borderRadius:8, background:'var(--player-gradient-pill)', display:'grid', placeItems:'center', color:'#fff', fontWeight:800, fontSize:16, fontFamily:'Poppins'}}>J</div>
        <div>
          <div style={{fontWeight:700, color:'#fff', fontSize:13, lineHeight:1.2}}>jackpot combo</div>
          <div style={{fontSize:10, color:'#6B7280'}}>Backoffice</div>
        </div>
      </div>
      <nav style={{padding:'12px 10px', display:'flex', flexDirection:'column', gap:2, flex:1}}>
        {nav.map(n => {
          const active = (n.match || [n.id]).includes(page);
          return (
            <button key={n.id} onClick={() => !n.disabled && setPage(n.id)} disabled={n.disabled} style={{
              background: active ? '#3A4560' : 'transparent', border:0,
              color: active ? '#fff' : (n.disabled ? '#4A5068' : '#A0A8B8'),
              padding:'9px 12px', borderRadius:6, cursor: n.disabled ? 'not-allowed' : 'pointer',
              textAlign:'left', display:'flex', alignItems:'center', gap:10, fontSize:13,
              fontWeight: active ? 600 : 500, fontFamily:'Inter'
            }}>
              <span style={{fontSize:14, opacity: n.disabled ? 0.5 : 1}}>{n.icon}</span>
              <span>{n.label}</span>
              {n.id === 'list' && !n.disabled && (
                <span style={{marginLeft:'auto', background:'#2563EB', color:'#fff',
                  padding:'1px 6px', borderRadius:9999, fontSize:9, fontWeight:600}}>NEW</span>
              )}
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
  );
}

// ---------- Header ----------
function OfficeHeader({ page, setPage }) {
  const titles = {
    list: 'In-App Messaging',
    wizard: 'New Message',
    detail: 'Message Detail',
    templates: 'Event Templates',
  };
  const subs = {
    list: 'Compose, schedule, and audit player-facing messages',
    wizard: 'Compose → Recipients → Schedule → Review',
    detail: 'Live status, batch progress, and audit log',
    templates: '12 event-driven templates managed via config',
  };
  return (
    <header style={{background:'#fff', borderBottom:'1px solid #DFE2E8', padding:'14px 28px',
      display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <div>
        <h1 style={{margin:0, fontSize:20, fontWeight:700, color:'#1A1D26', letterSpacing:'-0.005em'}}>{titles[page]}</h1>
        <div style={{fontSize:12, color:'#6B7280', marginTop:2}}>{subs[page]}</div>
      </div>
      {page === 'list' && (
        <button onClick={() => setPage('wizard')} style={{
          background:'#2563EB', color:'#fff', border:0, padding:'9px 18px', borderRadius:6,
          fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter',
          display:'flex', alignItems:'center', gap:6,
        }}>
          <span>+</span><span>New Message</span>
        </button>
      )}
    </header>
  );
}

// ---------- List ----------
function OfficeList({ messages, onCreate, onOpen, onToggle }) {
  const [filter, setFilter] = useState('all');
  const filtered = messages.filter(m => filter === 'all' ? true : m.status === filter);
  const stats = {
    total: messages.length,
    active: messages.filter(m => m.status === 'active').length,
    scheduled: messages.filter(m => m.status === 'scheduled').length,
    draft: messages.filter(m => m.status === 'draft').length,
    disabled: messages.filter(m => m.status === 'disabled').length,
  };

  return (
    <div>
      {/* KPI strip */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:12, marginBottom:16}}>
        {[
          ['Total', stats.total, '#1A1D26'],
          ['Active', stats.active, '#16A34A'],
          ['Scheduled', stats.scheduled, '#2563EB'],
          ['Draft', stats.draft, '#6B7280'],
          ['Disabled', stats.disabled, '#F59E0B'],
        ].map(([lbl, n, c]) => (
          <div key={lbl} style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:8, padding:'14px 16px'}}>
            <div style={{fontSize:11, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.04em', fontWeight:600}}>{lbl}</div>
            <div style={{fontSize:24, fontWeight:700, color:c, marginTop:4, fontVariantNumeric:'tabular-nums'}}>{n}</div>
          </div>
        ))}
      </div>

      <div style={{background:'#fff', border:'1px solid #DFE2E8', borderRadius:10, overflow:'hidden'}}>
        <div style={{padding:'12px 16px', display:'flex', gap:8, alignItems:'center', borderBottom:'1px solid #F0F1F3'}}>
          <input placeholder="Search by title or message ID" style={{flex:1, padding:'7px 12px', border:'1px solid #DFE2E8', borderRadius:6, fontSize:12, fontFamily:'Inter', outline:'none'}} />
          <select style={selStyle()}>
            <option>All categories</option><option>Personal</option><option>Promotions</option><option>System</option>
          </select>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={selStyle()}>
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, fontFamily:'Inter'}}>
          <thead>
            <tr style={{background:'#F8F9FB'}}>
              {['ID','Title','Category','Recipients','Sent / Read','CTA','Status','Sent at','Actions'].map(h => (
                <th key={h} style={thStyle()}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => {
              const C = JC_DATA.CATEGORIES[r.category];
              const readPct = r.sent > 0 ? Math.round((r.read / r.sent) * 100) : 0;
              const ctaPct = r.sent > 0 ? Math.round((r.ctaClicks / r.sent) * 100) : 0;
              return (
                <tr key={r.id} style={{borderBottom:'1px solid #F0F1F3'}}>
                  <td style={tdStyle('#2563EB',500,'pointer')} onClick={() => onOpen(r.id)}>{r.id}</td>
                  <td style={tdStyle('#1A1D26',500)}>
                    <div style={{display:'flex', alignItems:'center', gap:6}}>
                      <span>{r.title}</span>
                      {r.toast && <span title="Triggers toast" style={{fontSize:10, background:'#FEF3C7', color:'#92400E', padding:'1px 6px', borderRadius:4, fontWeight:600}}>TOAST</span>}
                    </div>
                  </td>
                  <td style={{padding:'10px 14px'}}>
                    <span style={catChipStyle(C)}>{C.icon} {C.label}</span>
                  </td>
                  <td style={tdStyle('#6B7280')}>
                    <div style={{fontWeight:500, color:'#1A1D26'}}>{r.recipientLabel}</div>
                    <div style={{fontSize:10, color:'#9CA3AF', fontVariantNumeric:'tabular-nums'}}>est. {r.estimated.toLocaleString()}</div>
                  </td>
                  <td style={tdStyle('#1A1D26',500)}>
                    {r.sent > 0 ? (
                      <div>
                        <div style={{fontVariantNumeric:'tabular-nums'}}>{r.read.toLocaleString()} / {r.sent.toLocaleString()}</div>
                        <div style={{height:3, background:'#F0F1F3', borderRadius:9999, marginTop:3, overflow:'hidden', width:120}}>
                          <div style={{height:'100%', width:`${readPct}%`, background:'#2563EB', transition:'width 350ms ease'}} />
                        </div>
                        <div style={{fontSize:10, color:'#6B7280', marginTop:2, fontVariantNumeric:'tabular-nums'}}>{readPct}% read</div>
                      </div>
                    ) : <span style={{color:'#9CA3AF'}}>—</span>}
                  </td>
                  <td style={tdStyle('#6B7280')}>
                    {r.ctaClicks > 0 ? <span style={{fontVariantNumeric:'tabular-nums'}}>{r.ctaClicks.toLocaleString()} <span style={{color:'#9CA3AF'}}>({ctaPct}%)</span></span> : <span style={{color:'#9CA3AF'}}>—</span>}
                  </td>
                  <td style={{padding:'10px 14px'}}>
                    {r.status === 'active' || r.status === 'disabled' ? (
                      <ToggleSwitch on={r.status === 'active'} onClick={() => onToggle(r)} />
                    ) : <StatusPill status={r.status} />}
                  </td>
                  <td style={tdStyle('#6B7280')}><span style={{fontVariantNumeric:'tabular-nums', fontSize:11}}>{r.sentAt}</span></td>
                  <td style={{padding:'10px 14px'}}>
                    <div style={{display:'flex', gap:6}}>
                      <button title="View" onClick={() => onOpen(r.id)} style={iconBtnStyle()}>👁</button>
                      <button title="Duplicate" style={iconBtnStyle()}>⎘</button>
                      <button title="Audit log" style={iconBtnStyle()}>📋</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
        <span style={{
          position:'absolute', top:2, left: on ? 16 : 2, width:14, height:14, background:'#fff', borderRadius:'50%', transition:'left 150ms',
        }} />
      </span>
      <span style={{fontSize:11, color: on ? '#16A34A' : '#9CA3AF', fontWeight:600}}>{on ? 'Active' : 'Disabled'}</span>
    </button>
  );
}

function StatusPill({ status }) {
  const map = {
    scheduled: {bg:'#EFF3FF', fg:'#1E40AF', label:'Scheduled', icon:'⏰'},
    draft:     {bg:'#F3F4F6', fg:'#4B5563', label:'Draft', icon:'✎'},
  };
  const s = map[status] || {bg:'#F3F4F6', fg:'#4B5563', label:status, icon:''};
  return (
    <span style={{display:'inline-flex', alignItems:'center', gap:5, background:s.bg, color:s.fg, padding:'3px 9px', borderRadius:9999, fontSize:11, fontWeight:600}}>
      <span>{s.icon}</span><span>{s.label}</span>
    </span>
  );
}

function selStyle() { return {padding:'7px 12px', border:'1px solid #DFE2E8', borderRadius:6, fontSize:12, fontFamily:'Inter', background:'#fff'}; }
function thStyle() { return {textAlign:'left', padding:'10px 14px', fontSize:10, textTransform:'uppercase', letterSpacing:'0.03em', fontWeight:600, color:'#6B7280', borderBottom:'1px solid #DFE2E8'}; }
function tdStyle(color, weight, cursor) { return {padding:'10px 14px', color: color || '#6B7280', fontWeight: weight || 400, cursor: cursor || 'default'}; }
function iconBtnStyle() { return {width:26, height:26, border:'1px solid #DFE2E8', background:'#fff', borderRadius:6, cursor:'pointer', fontSize:11, color:'#6B7280'}; }
function catChipStyle(C) { return {display:'inline-flex', alignItems:'center', gap:4, background:`${C.color}15`, color:C.color, padding:'2px 8px', borderRadius:9999, fontSize:11, fontWeight:600, border:`1px solid ${C.color}33`}; }

window.OfficeAppHelpers = { ToggleSwitch, StatusPill, thStyle, tdStyle, iconBtnStyle, catChipStyle, selStyle };
