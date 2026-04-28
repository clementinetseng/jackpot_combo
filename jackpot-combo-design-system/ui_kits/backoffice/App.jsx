/* global React */
const { useState } = React;

const INITIAL = [
  {id:'PR-00412', name:'100% First Deposit Bonus', type:'Deposit Bonus', enabled:true,  period:'Apr 10 ~ Apr 30', claims:'324 / 10,000'},
  {id:'PR-00411', name:'50% Reload Bonus',         type:'Deposit Bonus', enabled:true,  period:'Apr 15 ~ May 15', claims:'89 / 5,000'},
  {id:'PR-00410', name:'₱200 Slots Cashback',      type:'Cashback',      enabled:false, period:'Apr 12 ~ Apr 18', claims:'44 / 1,000'},
  {id:'PR-00409', name:'Daily Bonus',              type:'Deposit Bonus', enabled:true,  period:'Running',         claims:'1,244 / ∞'},
  {id:'PR-00408', name:'Weekend Reload 30%',       type:'Deposit Bonus', enabled:true,  period:'Sat – Sun',       claims:'201 / 3,000'},
];

window.BackofficeApp = function BackofficeApp() {
  const [page, setPage] = useState('promotions');
  const [rows, setRows] = useState(INITIAL);
  const [toast, setToast] = useState(null);
  const [drawerRow, setDrawerRow] = useState(null);
  const [cancelRow, setCancelRow] = useState(null);
  const [deactivateRow, setDeactivateRow] = useState(null);
  const [unsavedCb, setUnsavedCb] = useState(null);
  const [selected, setSelected] = useState([]);

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 2500); };

  const title = page === 'promotions' ? 'Promotions'
              : page === 'wizard'     ? 'Create Promotion'
              : page === 'rewards'    ? 'Reward History'
              : 'Coming soon';
  const action = page === 'promotions' ? (
    <button onClick={() => setPage('wizard')} style={{background:'#2563EB', color:'#fff', border:0, padding:'9px 18px', borderRadius:6, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter'}}>+ Create Promotion</button>
  ) : null;

  let body;
  if (page === 'promotions') {
    body = <PromotionList rows={rows} setRows={setRows} onCreate={() => setPage('wizard')} showToast={showToast} onRequestDisable={r => setDeactivateRow(r)} />;
  } else if (page === 'wizard') {
    body = <Wizard
      onExit={() => setPage('promotions')}
      onFinish={() => { showToast('Promotion Published'); setPage('promotions'); }}
      onRequestUnsaved={(cb) => setUnsavedCb(() => cb)}
    />;
  } else if (page === 'rewards') {
    body = <RewardHistory onOpenDrawer={setDrawerRow} selected={selected} setSelected={setSelected} showToast={showToast} />;
  } else {
    body = <div style={{padding:40, textAlign:'center', color:'#6B7280'}}>Coming soon</div>;
  }

  return (
    <>
      <Shell page={page} setPage={setPage} title={title} action={action}>{body}</Shell>
      <Drawer row={drawerRow} onClose={() => setDrawerRow(null)} onCancelClick={r => setCancelRow(r)} />
      {cancelRow && <CancelModal row={cancelRow} onClose={() => setCancelRow(null)} onConfirm={() => { setCancelRow(null); setDrawerRow(null); showToast('Reward cancelled'); }} />}
      {deactivateRow && <DeactivateModal row={deactivateRow} onClose={() => setDeactivateRow(null)} onConfirm={() => { setRows(rows.map(r => r.id===deactivateRow.id ? {...r, enabled:false} : r)); setDeactivateRow(null); showToast('Promotion disabled'); }} />}
      {unsavedCb && <UnsavedModal onClose={() => setUnsavedCb(null)} onConfirm={() => { unsavedCb(); setUnsavedCb(null); }} />}
      {toast && (
        <div style={{position:'fixed', top:20, right:28, background:'#1A1D26', color:'#fff', padding:'12px 20px', borderRadius:6, fontSize:13, fontFamily:'Inter', boxShadow:'0 4px 16px rgba(0,0,0,0.2)', zIndex:50}}>{toast}</div>
      )}
    </>
  );
};
