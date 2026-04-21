# Session Handoff — 2026-04-21（Session 8 結束）

> 此文件給**新開啟的 Claude session** 使用。請新 session 先讀這份 + `CLAUDE.md`，再開始工作。

## 🎯 專案當前狀態（Snapshot）

| 項目 | 狀態 |
| --- | --- |
| **GitHub Repo** | https://github.com/clementinetseng/jackpot_combo |
| **後台 Prototype（已部署，Session 8 完成 P0 修復 + Enable 驗證）** | https://jackpot-backoffice-prototype.onrender.com/ |
| **前台 Prototype（已部署）** | https://jackpot-player-prototype.onrender.com/ |
| **PRD 狀態** | 4 份皆定案；**前台 PRD 需反向同步 D62~D81 / 後台 Promotion Management PRD 需反向同步 D82~D87** |
| **Decision Log** | D1~D87（Session 1~8）|
| **設計 Token** | `design-system/tokens/*.json` 已建立 |

## 📂 Monorepo 結構一覽

```
jackpot-igaming/
├── apps/
│   ├── backoffice/          ← 後台 HTML Prototype（Session 8 P0 修復完）
│   └── player/              ← 前台 HTML Prototype（糖果紫主題）
├── design-system/
│   ├── tokens/              ← colors/typography/spacing/radius JSON
│   ├── components/          ← Button / Card / TurnoverStatus .md
│   ├── styles/              ← tailwind.config.js
│   └── README.md
├── docs/
│   ├── prds/                ← 4 PRDs + 2 Review Reports
│   └── memory/
│       ├── glossary.md
│       ├── design-system.md
│       ├── context/decision-log.md   ← D1~D87
│       └── governance/
├── CLAUDE.md                ← AI 協作主脈絡
├── SESSION-HANDOFF.md       ← 本文件
├── README.md
└── render.yaml
```

## 🔑 必記的 5 個原則（不能偏離）

1. **設計視覺 = 糖果紫**（PP 實機），非藍底也非深色 Stake
   - 背景：淡紫漸層 `linear-gradient(140deg, #EBE3F7 0%, #D5C5EA 60%, #BFA8E1 100%)`
   - 主 CTA：藍紫漸層 `#6FB1FC → #8E66FF`
   - Balance 強調：黃 `#FFC107`
   - 字型：Poppins
2. **術語嚴謹** — 只用 `Bet`（動詞）+ `Turnover`（名詞）
   - ❌ 禁用：`wager`, `wagered`, `wagering`, `WR`, `bet target`, `bet requirement`
   - ✅ 標準文案：`Bet ₱X,XXX more to withdraw`（絕對金額）
   - 首次出現 Turnover 附 tooltip：`The total amount you need to bet before you can withdraw.`
3. **一個進度條原則**（D53）— 玩家任何時刻只看一個 Turnover 狀態
   - 優先序：Bonus Turnover > Deposit Turnover > Withdrawable
   - 五處同步（Deposit / Withdraw / Reward Center / Gift Box / Wallet），資料同源
4. **UI 命名分層**
   - Player-facing：`Rewards` / `Reward Center`
   - Internal / PRD / RD 溝通：`Gift Box Dropdown` / `Gift Box Panel`
   - 後台實體：`Promotion Event`（活動主檔）/ `Player Promotion Instance`（玩家實例）
5. **Mobile-first** — PH 玩家 80%+ 手機
   - `grid-cols` 永遠 `flex flex-col md:grid md:grid-cols-[...]`
   - Header 右側在 mobile 要 compact（Balance pill 去 ↻）
   - ☰ 按鈕必須連到 Mobile Drawer

## 🛠️ 下一步優先續辦（按順序）

### 🔴 P0 — PRD 反向同步（D62~D87）

**狀態**：Clement 明確指示「下個任務」；將在**新 session** 開啟
**要做**：把 **Session 7 前台決策（D62~D81）** + **Session 8 後台決策（D82~D87）** 寫回對應 PRD 章節，讓 RD 看單一 PRD 就完整
**推薦 skill**：`engineering:documentation` + `product-management:write-spec`

#### D62~D81 → 前台 PRD（`docs/prds/前台-玩家端 (Frontend) PRD.md`）

| 章節 | 要補的決策 |
| --- | --- |
| §0（通用原則）| D77 術語 / D78 UI 命名分層 / D80 Mobile-first |
| §1 Deposit | D62 糖果紫 / D63 PP 骨架 / D64 不放 TurnoverStatus / D65 Choose your bonus / D66 Dropdown / D67 Claim Now / D68 Summary 精簡 / D74 OOB Welcome 移除 |
| §2 Withdraw | D69 form 灰掉 / D70 移除 ⓘ / D71 Learn more Modal / D79 KYC scenario |
| §3 Gift Box / §4 Reward Center | D72 三狀態互斥 / D73 Pending 不詳列 |
| §5 Record | D75 卡片結構 / D76 Filter Popover |
| §6 基礎設施 | D81 Monorepo |

#### D82~D87 → 後台 Promotion Management PRD（`docs/prds/活動設定管理 (Promotion Management) PRD.md`）

| 章節 | 要補的決策 |
| --- | --- |
| §頁面結構 / Table 欄位 | D82 Sidebar 縮減（影響 Prototype 範圍聲明）|
| §操作規則 line 77（Disabled → Enabled）| **D87：補「系統行為」— 不跳確認視窗；不齊時 Toast 列缺項 + 自動跳第一個缺項 step 的 Edit wizard**；**完整必填欄位清單**（四步驟逐條列出）|
| §Enabled → Disabled 二次確認 | D86 文案逐字對齊（impact #3 + Remark placeholder + Min 2 chars）|
| §Create Promotion - Wizard | D83 Status Toggle 實作注意事項（給 RD 避坑）/ D84 Create/Edit/View 三模式 Page Title + Button 行為 / D85 Category Default 擋 Next 規則 |

### 🟢 P1 — 未來擴充（V2 範圍）

- Reward Center 的 V2 Sections：Claim Now（Daily/Weekly）/ VIP Tier / Rakeback / Total Rewards
- 後台新增：活動類型擴充（非 Deposit Bonus）
- 玩家 Profile 頁 / 交易詳細頁
- 前後台打通 API spec 文件（給 RD 寫實作）

## 🎨 各類任務推薦 skills

| 任務類型 | 推薦 skill |
| --- | --- |
| 改 prototype 視覺 | `design:design-critique` + `design:ux-copy` |
| 改 prototype 互動 | `design:ux-copy`（文案）+ 自己寫 HTML |
| 檢查 a11y | `design:accessibility-review` |
| 寫 / 更 PRD | `engineering:documentation` / `product-management:write-spec` |
| 修 bug | `engineering:debug` |
| 交付 RD 文件 | `design:design-handoff` |
| 新增活動類型 | `product-management:write-spec` + `design:design-system` |

## 💬 Clement 個人偏好（累積自 Session 1~8）

| 偏好 | 備註 |
| --- | --- |
| 表格 > 大段文字 | 回覆時優先用表格 |
| Mermaid 圖表盡量用 | 複雜邏輯用圖 |
| 待決議的問題先討論 | 不要直接改 |
| RD 很懶得讀文字 | 給 RD 的文件要簡潔 + 視覺化 |
| 前台用語菲律賓玩家友善 | 英文口語、簡單直覺 |
| 用語不要太多簡稱 | 例如 `OOB` 在玩家面要叫 `Ended (low balance)` |
| 反饋風格 | 直接、簡短；AI 要先主動分析再動手 |
| 節制 | 不要過度優化 / 自作主張（例：pending 文案、多餘 banner 都會被退）|
| 指令是 Windows PowerShell | 不要用 bash heredoc / 不要用 `\` 續行（用 backtick `` ` ``）|

## 🚀 部署流程（萬一要重新部署）

```powershell
# 本地修改後推上去，Render 自動部署
git add .
git commit -m "..."
git push

# 新增 service 要手動：Render Dashboard → Blueprint → 重新同步
```

## 🧭 新 session 啟動建議步驟

1. 讀 `CLAUDE.md`
2. 讀本文件（`SESSION-HANDOFF.md`）
3. 讀 `docs/memory/context/decision-log.md` 的 **Session 7 + Session 8**（D62~D87）了解最新狀態
4. P0 任務若是 PRD 反向同步：
   - Read 對應 PRD（前台 or 後台 Promotion Management）
   - 對照 decision-log 逐條補回章節
   - Read prototype 源碼確認實作細節與 PRD 措辭一致
5. 確認 Clement 的當前任務後再動手

## ⚠️ 容易踩坑的點（前任 AI 血淚史）

1. **不要用 `wager`** — 即使 Stake / BC.GAME 這樣用，我們 PRD 堅持 `bet`/`turnover`
2. **不要在 Deposit 頁放 TurnoverStatus 卡** — D64 明訂冗餘
3. **Gift Box 三狀態互斥** — 不要同時顯示 TurnoverStatus row + Active Promotion section
4. **Mobile Header 不能滿** — Balance pill + Deposit + 🎁 + Avatar 已是上限
5. **術語「Claim Now」不是「Deposit to Join」** — 已統一
6. **Pending 活動只在 Reward Center 顯示**，Gift Box 只一行提示
7. **sidebar Logout icon 用 🚪 不是 ↗️**
8. **節制！** — Clement 反饋不要過度優化
9. **Wizard 只儲存不啟用** — Finish toast 不可寫「Promotion Published」，要寫「saved as Disabled, enable from list」(D84)
10. **`<label><input type=checkbox>` 必須雙層 preventDefault** — 否則 Status Toggle 會漂移 (D83)
11. **PowerShell 環境** — 給 Clement 的 git 指令不能用 bash heredoc / `\` 續行；用 backtick `` ` `` 續行 + 多個 `-m` flag
