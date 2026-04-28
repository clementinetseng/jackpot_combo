/* global */
// ============================================================
// Sample data — 12 event templates + seed messages
// ============================================================

window.JC_DATA = (function () {
  const now = new Date('2026-04-28T14:30:00+08:00').getTime();
  const m = (mins) => new Date(now - mins * 60000).toISOString();
  const fmt = (iso) => {
    const d = new Date(iso);
    const diff = (now - d.getTime()) / 60000;
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${Math.round(diff)} min ago`;
    if (diff < 60 * 24) return `${Math.round(diff/60)} hr ago`;
    if (diff < 60 * 24 * 7) return `${Math.round(diff/60/24)} d ago`;
    return d.toLocaleDateString('en-PH', {month:'short', day:'numeric'});
  };

  // Category mapping — Personal | Promo | System
  const CATEGORIES = {
    personal: { label: 'Personal',   color: '#8E66FF', icon: '💬' },
    promo:    { label: 'Promotions', color: '#F36DF3', icon: '🎁' },
    system:   { label: 'System',     color: '#6FB1FC', icon: '📢' },
  };

  // 12 event templates from PRD §7.3
  const TEMPLATES = [
    { id:'deposit.success',       category:'personal', toast:true,  title:'Your deposit is in', body:'Hi {{username}}, your deposit of ₱{{amount}} landed at {{transaction_time}}. Balance is now ₱{{new_balance}}.', cta:{label:'Go to Lobby', url:'/lobby'}, vars:['username','amount','currency','payment_method','transaction_time','new_balance'] },
    { id:'deposit.failed',        category:'personal', toast:true,  title:'Deposit didn\'t go through', body:'Hi {{username}}, your ₱{{amount}} deposit at {{transaction_time}} couldn\'t be completed. Reason: {{failure_reason}}.', cta:{label:'Contact Support', url:'/support'}, vars:['username','amount','currency','transaction_time','failure_reason'] },
    { id:'withdrawal.submitted',  category:'personal', toast:true,  title:'Withdrawal request sent', body:'Hi {{username}}, your ₱{{amount}} withdrawal (ID {{withdrawal_id}}) was submitted at {{submission_time}}. Review usually takes {{estimated_review_hours}} hr.', cta:{label:'Track Request', url:'/withdrawal/{{withdrawal_id}}'}, vars:['username','amount','currency','withdrawal_id','submission_time','estimated_review_hours'] },
    { id:'withdrawal.completed',  category:'personal', toast:true,  title:'Withdrawal complete', body:'Hi {{username}}, your withdrawal (ID {{withdrawal_id}}) of ₱{{amount}} was paid out at {{completion_time}}. Check your receiving account.', cta:null, vars:['username','amount','currency','withdrawal_id','completion_time'] },
    { id:'withdrawal.rejected',   category:'personal', toast:true,  title:'Withdrawal not approved', body:'Hi {{username}}, your withdrawal (ID {{withdrawal_id}}) of ₱{{amount}} wasn\'t approved. Reason: {{rejection_reason}}. Reach out to support if you have questions.', cta:{label:'Contact Support', url:'/support'}, vars:['username','amount','currency','withdrawal_id','rejection_reason'] },
    { id:'kyc.approved',          category:'personal', toast:true,  title:'You\'re verified ✅', body:'Hi {{username}}, your KYC was approved at {{approval_time}}. All platform features are now unlocked.', cta:{label:'Start Playing', url:'/lobby'}, vars:['username','approval_time'] },
    { id:'kyc.rejected',          category:'personal', toast:true,  title:'KYC needs another look', body:'Hi {{username}}, your KYC wasn\'t approved. Reason: {{rejection_reason}}. Please resubmit before {{resubmit_deadline}}.', cta:{label:'Resubmit KYC', url:'/kyc'}, vars:['username','rejection_reason','resubmit_deadline'] },
    { id:'password.changed',      category:'personal', toast:true,  title:'Your password changed', body:'Hi {{username}}, your password was updated at {{change_time}} (IP {{ip_address}}). If this wasn\'t you, contact support immediately to lock the account.', cta:{label:'Contact Support', url:'/support'}, vars:['username','change_time','ip_address'] },
    { id:'user.first_login',      category:'promo',    toast:false, title:'Welcome to Jackpot Combo 🎉', body:'Hi {{username}}, glad you\'re here! Make your first deposit to claim the welcome bonus — we\'ve lined up promotions for you.', cta:{label:'Deposit & Claim', url:'/deposit'}, vars:['username'] },
    { id:'vip.upgraded',          category:'promo',    toast:false, title:'VIP level up ⭐', body:'Hi {{username}}, you levelled up from {{previous_tier}} to {{new_tier}} at {{upgrade_time}}. New perks are unlocked.', cta:{label:'View VIP Perks', url:'/vip'}, vars:['username','previous_tier','new_tier','upgrade_time'] },
    { id:'deposit.turnover_met',  category:'personal', toast:true,  title:'Deposit turnover cleared', body:'Hi {{username}}, you cleared your deposit turnover at {{completion_time}}. Funds are now ready to withdraw.', cta:{label:'Withdraw', url:'/withdrawal'}, vars:['username','completion_time'] },
    { id:'promotion.turnover_met',category:'personal', toast:true,  title:'Promo bonus unlocked 🎉', body:'Hi {{username}}, you cleared turnover for "{{promotion_name}}". Bonus of ₱{{bonus_amount}} unlocked at {{completion_time}} — ready to use or withdraw.', cta:{label:'Withdraw', url:'/withdrawal'}, vars:['username','promotion_name','bonus_amount','currency','completion_time'] },
  ];

  // Render a template's body with variables
  function render(tpl, vars) {
    const sub = (s) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] != null ? vars[k] : `{{${k}}}`);
    return {
      title: sub(tpl.title),
      body: sub(tpl.body),
      cta: tpl.cta ? { label: tpl.cta.label, url: sub(tpl.cta.url) } : null,
      category: tpl.category,
      toast: tpl.toast,
      eventId: tpl.id,
    };
  }

  // Seed inbox — mix of read + unread, all 3 categories
  const SEED_VARS = {
    username:'Juan', amount:'5,000.00', currency:'PHP',
    transaction_time:'Apr 28 14:12', new_balance:'12,540.00',
    payment_method:'GCash', failure_reason:'Insufficient funds at issuer',
    withdrawal_id:'WD-44021', submission_time:'Apr 28 13:05',
    estimated_review_hours:'2', completion_time:'Apr 28 11:48',
    rejection_reason:'Photo blurred — please retake', resubmit_deadline:'May 3',
    approval_time:'Apr 26 09:30', change_time:'Apr 25 22:11', ip_address:'112.198.x.x',
    previous_tier:'Silver', new_tier:'Gold', upgrade_time:'Apr 24 18:00',
    promotion_name:'Weekend Slots Reload', bonus_amount:'1,500',
  };

  const seedMessages = [
    { id:'M-1042', tpl:'withdrawal.completed',  unread:true,  receivedAt: m(2),    source:'event' },
    { id:'M-1041', tpl:'deposit.turnover_met',  unread:true,  receivedAt: m(18),   source:'event' },
    { id:'M-1040', tpl:'deposit.success',       unread:false, receivedAt: m(48),   source:'event' },
    { id:'M-1039', tpl:'vip.upgraded',          unread:true,  receivedAt: m(120),  source:'event' },
    { id:'M-1038', tpl:'promotion.turnover_met',unread:false, receivedAt: m(240),  source:'event' },
    { id:'M-1037', manual:true, category:'system', toast:false, unread:true, receivedAt: m(360),
      title:'Scheduled maintenance · Apr 30',
      body:'Heads up — we\'ll be running platform upgrades on Apr 30 from 03:00 to 04:30 (UTC+8). Slots and live games will be briefly unavailable. Sorry for the bump.',
      cta:null },
    { id:'M-1036', tpl:'kyc.approved',          unread:false, receivedAt: m(2880), source:'event' },
    { id:'M-1035', manual:true, category:'promo', toast:false, unread:false, receivedAt: m(4320),
      title:'Weekend Slots Cashback is live 🎰',
      body:'Play your favourite slots from Fri to Sun and earn up to 8% cashback. No claim button — cashback lands automatically every Monday.',
      cta:{label:'View Promotion', url:'/promo/weekend-cashback'} },
    { id:'M-1034', tpl:'password.changed',      unread:false, receivedAt: m(5760), source:'event' },
    { id:'M-1033', manual:true, category:'system', toast:false, unread:false, receivedAt: m(7200),
      title:'New version 4.8 released',
      body:'We tightened up withdrawal flow and fixed a handful of bugs. Force a refresh to pick up the latest.',
      cta:null },
    { id:'M-1032', tpl:'user.first_login',      unread:false, receivedAt: m(10080),source:'event' },
  ];

  // Expand seed messages by rendering templates
  const messages = seedMessages.map(seed => {
    if (seed.manual) {
      return { ...seed, fmt: fmt(seed.receivedAt), source:'manual' };
    }
    const tpl = TEMPLATES.find(t => t.id === seed.tpl);
    const r = render(tpl, SEED_VARS);
    return {
      id: seed.id,
      title: r.title, body: r.body, cta: r.cta,
      category: r.category, toast: r.toast, eventId: r.eventId,
      unread: seed.unread, receivedAt: seed.receivedAt, fmt: fmt(seed.receivedAt),
      source: 'event',
    };
  });

  // Map category -> tab
  // Personal tab = personal events
  // Promo tab = promo events
  // System tab = system manual
  function tabOf(msg) {
    if (msg.category === 'system') return 'system';
    if (msg.category === 'promo')  return 'promo';
    return 'personal';
  }

  // Backoffice — sample sent messages
  const officeMessages = [
    { id:'BC-2104', title:'Weekend Slots Cashback is live 🎰', category:'promo',
      status:'active', recipientMode:'condition', recipientLabel:'VIP ≥ 3', estimated:8421,
      sent:8421, read:5132, ctaClicks:1840, sentBy:'Clement',
      sentAt:'2026-04-26 12:00', toast:false },
    { id:'BC-2103', title:'Scheduled maintenance · Apr 30', category:'system',
      status:'active', recipientMode:'broadcast', recipientLabel:'All players', estimated:48230,
      sent:48230, read:9120, ctaClicks:0, sentBy:'Clement',
      sentAt:'2026-04-26 09:00', toast:false },
    { id:'BC-2102', title:'New version 4.8 released', category:'system',
      status:'active', recipientMode:'broadcast', recipientLabel:'All players', estimated:48230,
      sent:48230, read:14502, ctaClicks:0, sentBy:'Mei',
      sentAt:'2026-04-23 17:00', toast:false },
    { id:'BC-2101', title:'Sleeper player wake-up offer', category:'promo',
      status:'disabled', recipientMode:'condition', recipientLabel:'Status = Sleeping', estimated:3201,
      sent:3201, read:842, ctaClicks:88, sentBy:'Clement',
      sentAt:'2026-04-22 10:00', toast:false },
    { id:'BC-2100', title:'Reminder · Verify your account', category:'personal',
      status:'scheduled', recipientMode:'condition', recipientLabel:'Not yet verified', estimated:1402,
      sent:0, read:0, ctaClicks:0, sentBy:'Clement',
      sentAt:'2026-04-29 09:00', toast:true },
    { id:'BC-2099', title:'Untitled draft', category:'promo',
      status:'draft', recipientMode:null, recipientLabel:'—', estimated:0,
      sent:0, read:0, ctaClicks:0, sentBy:'Clement',
      sentAt:'2026-04-28 11:42', toast:false },
    { id:'BC-2098', title:'High-roller VIP private offer', category:'promo',
      status:'active', recipientMode:'condition', recipientLabel:'VIP ≥ 5', estimated:124,
      sent:124, read:101, ctaClicks:42, sentBy:'Mei',
      sentAt:'2026-04-21 14:30', toast:false },
    { id:'BC-2097', title:'Account security tip', category:'personal',
      status:'active', recipientMode:'broadcast', recipientLabel:'All players', estimated:48230,
      sent:48230, read:6820, ctaClicks:204, sentBy:'Clement',
      sentAt:'2026-04-19 10:00', toast:true },
  ];

  return {
    CATEGORIES, TEMPLATES, render, fmt,
    seedMessages: messages,
    officeMessages,
    SEED_VARS,
  };
})();
