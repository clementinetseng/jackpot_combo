# Design Agent Working Memory — 前台設計系統

> Clement 指示：以下內容 RD 不在意，留在此處給 Design Agent 自己設計時用，不進 PRD。

## 參考來源（更新：2026-04-17 PP 環境實測）

| 來源 | 用途 |
| --- | --- |
| **https://jackpot-pp.combo.ph/** | **設計系統真正的 source of truth**（已登入 KYC 完成的實際畫面） |
| https://jackpot-uat.combo.ph/ | 早期探測（登出狀態誤判為白底，實際已登入後同 PP 風格） |
| Rainbet / Stake / BC.GAME 競品截圖 | 僅做結構參考（Section 式、radio bonus list、Wager Requirement 卡），**視覺不採用** |

## 設計語言：「淡紫糖果風」Candy Lavender

**不是**白底藍、**不是**深色 Stake 風。整體色調偏**粉紫 / 糖果紫**，白色內容卡懸浮在淡紫背景上，配藍紫漸層作為主 CTA / Banner。

## Design Token（校準到 PP 實機）

| Token | 值 | 用途 |
| --- | --- | --- |
| `--bg-body` | linear-gradient `#E8E0F5` → `#C8B8E5` | 整頁背景漸層（左下深紫、右上淡紫） |
| `--bg-sidebar` | `#A89ACC` ~ `#958AC4` | Sidebar 底色（深淡紫）|
| `--bg-card` | `#FFFFFF` | 白色內容卡 |
| `--bg-surface-tint` | `#F4EFFA` | Tab inactive / chip hover 底 |
| `--color-primary` | `#8E66FF`（近似）| 主 CTA（紫漸層起點） |
| `--color-primary-2` | `#B185FF` | 紫漸層終點 |
| `--color-primary-gradient` | linear-gradient 45° `#6FB1FC` → `#8E66FF` | Balance banner（藍 → 紫） |
| `--color-accent-yellow` | `#FFC107`（黃） | Balance 數字強調 |
| `--color-text-on-purple` | `#FFFFFF` | Sidebar / Banner 上的文字 |
| `--color-text-primary` | `#2D1B4E`（深紫近黑） | 內容卡內主文字 |
| `--color-text-secondary` | `#6B5B8E`（中紫灰） | 次文字 |
| `--color-border-soft` | `#E5DCF5` | 卡片細邊框 |
| `--color-success` | `#10B981` |
| `--color-warning` | `#F59E0B`（橘色）| 例：`Failed` badge |
| `--color-danger` | `#EF4444` |
| `--font-family` | `Poppins` |
| `--radius-pill` | `9999px` | Tab / chip / button pill |
| `--radius-card` | `14px` | 主卡片 |
| `--radius-chip` | `10px` | 金額 chip 方形樣式 |
| `--radius-banner` | `20px` | Balance banner 大圓角 |

## 金額格式

| 項目 | 規則 | 範例 |
| --- | --- | --- |
| 貨幣符號 | 一律 `₱` | `₱6,882.43` |
| 千分位 | 必加 | `₱50,000` |
| Balance 顯示小數 | 2 位（前台強調） | `₱6,882.43` |
| Turnover Target / Progress | 0 位 | `₱45,000` |

## 時間格式

| 項目 | 規則 | 範例 |
| --- | --- | --- |
| 時區 | `UTC+8`（PH 無 DST） | — |
| 日期短 | `YYYY/MM/DD` (PP 風格) 或 `MMM DD` | `2026/04/17` / `Apr 17` |
| 時間 | `YYYY/MM/DD HH:mm:ss` (Record 卡) | `2026/04/14 16:01:53` |
| 期間 | `MMM DD ~ MMM DD` | `Apr 10 ~ Apr 30` |

## PP 實機觀察（Prototype 參考）

### Layout 骨架（所有頁共用）

```
┌───────────────────────────────────────────────────┐
│ [☰] [JC Logo] [Feature Slot Fish Live Egame] │ [₱ Balance pill ↻ 🟨] [Avatar testwc] [🎧] │
├───────────────────────────────────────────────────┤
│ Sidebar (紫底)                 │ Main (淡紫)       │
│ ┌─────────────┐              │ ← [Title]          │
│ │ Avatar      │              │ ====漸層 Divider    │
│ │ name/ID     │              │                    │
│ ├─────────────┤              │ ┌────────────────┐ │
│ │ Balance     │              │ │ Balance Banner │ │
│ │ ₱6,882.43   │              │ │ (藍→紫 gradient)│ │
│ │ [Deposit]   │              │ │ Fund / Rec / KYC│ │
│ │ [Withdraw]  │              │ └────────────────┘ │
│ ├─────────────┤              │                    │
│ │ ☰ Casino    │              │ ┌────────────────┐ │
│ │ ☰ Provider  │              │ │ White Content  │ │
│ │ ☰ Support   │              │ │ Card           │ │
│ │ ☰ About     │              │ └────────────────┘ │
│ │ ☰ Logout    │              │                    │
│ └─────────────┘              │                    │
└───────────────────────────────────────────────────┘
```

### Deposit 頁已有（PP 實機）
- Payment Methods 區塊：單卡 `QR Ph`（paper QR icon, 選中有紫色勾勾）
- Deposit Amount 區塊：6 個金額 chips 2x3 grid（100 / 200 / 500 / 1,000 / 10,000 / 50,000；選中 chip **粗體黑字**）
- 輸入框：`₱ Enter Amount: 500-50,000` placeholder，圓角 pill
- Submit 按鈕：預設灰色 disabled
- 左側 Tab：Deposit（紫漸層 pill 選中）/ Withdraw（淡紫 pill inactive）

### Withdraw 頁已有（PP 實機）
- `Available Balance: ₱ 6,882.43` + ⓘ tooltip
- Payment Method 雙卡橫向：`GCash` / `PayMaya`（帶 logo，選中有紫 outline + ✓）
- `+ Link Account` 全寬按鈕（淡紫 outline）
- Withdrawal Amount 輸入框 + `Max` 按鈕（右側）
- placeholder `Withdrawal Amount min ₱50.00` → **確認最低提款 ₱50**
- Submit（灰 disabled）

### Record Center 已有（PP 實機）
- 頁標 `← Record Center`（非 Wallet）
- **垂直 Tab**（左側）：`Transactions`（紫漸層 pill 選中）/ `Game` / `Promotions`（空 `No Data`）
- 右側：日期範圍 pickers + filter icon
- **紀錄卡樣式**（Transactions）：
  - 上半：紫漸層 header（寬 pill 風格）+ 左 `Deposit` + `ONLINE` badge + 右 `₱+1,000.00`
  - 下半：白底 + `Failed`（橘色 badge）+ 日期時間 + `Detail ›`
- 空狀態：中央 icon + `No Data`

### Header 右上角細節
- Balance pill：紫底圓角 pill，內容 `₱ 6,882.43 ↻ 🟨`（**黃色方塊 = Wallet 快捷**，點擊跳 `/deposit`）
- Avatar + username: 圓形頭像 + 名字 pill
- 🎧 Support icon（右邊）
- **沒有** 🎁 禮物盒入口 → 前台 prototype 需新增

### Sidebar Nav 順序（PP 實機）
Casino → Provider → Support → About Us → Logout
- 🎁 Promotions 入口目前沒有 → 前台 prototype 需新增（放在 Support 上方或 About Us 下方）

## Clement 反饋對齊（累計）

| # | 調整 | 時間 |
| --- | --- | --- |
| 1 | PRD 刪除設計 Token / 金額時間格式章節（RD 不在意，放這份 memory） | 04-17 AM |
| 2 | 狀態翻譯：`PENDING → Pending`；`CANCELLED → Cancelled`；其餘保留 | 04-17 AM |
| 3 | `Total Balance` 前台保留原詞 | 04-17 AM |
| 4 | 阻擋狀態卡右上角**不放 `?` icon**；改 Footer 統一 FAQ + 每活動卡自帶 T&C | 04-17 AM |
| 5 | **Ineligible 活動不顯示** | 04-17 AM |
| 6 | 輸入驗證**即時**隨輸入顯示紅字 | 04-17 AM |
| 7 | `Skip Promotion` → `No Promotion` | 04-17 AM |
| 8 | PRD 盡量精簡 | 04-17 AM |
| 9 | Gift Box / Reward Center 採 Section 式分類（參考 Rainbet）；V2 擴充位；無資料 Section 整段隱藏 | 04-17 PM |
| 10 | Record 頁僅新增 Promotion Tab（Transaction/Game 由現有平台提供） | 04-17 PM |
| 11 | **設計風格要參照現有平台**（PP 實機）— v1 prototype 完全沒對齊，需大改 | 04-17 PM |
| 12 | **沿用 PP 骨架插入促銷模組**（Deposit/Withdraw/Record Promotions tab 只加促銷相關區塊，不重新設計 layout） | 04-17 PM |

## Prototype v2 改動重點

| 項目 | v1（已棄用） | v2（要做） |
| --- | --- | --- |
| 整體風格 | 白底 `#5275E9` 藍 | **淡紫糖果漸層背景 + 白色內容卡 + 藍紫漸層 CTA** |
| Deposit 骨架 | 自定的 §1 Amount / §2 Payment / §3 Promotion / §4 Summary / §5 Submit | **沿用 PP**：Payment Methods → Deposit Amount (6 chips) → 輸入框 → **新增 Choose Promotion 區塊** → **新增 Summary 試算** → Submit |
| Withdraw 骨架 | 自定的 Wallet Card / Amount / Status Card | **沿用 PP**：Available Balance → Payment Method → Link Account → Withdrawal Amount + Max → **若阻擋則頂部加 Status Card**（KYC/ACTIVE/Deposit TO）→ Submit |
| Record | 自定 Promotion Tab + Drawer | **沿用 PP Record Center 佈局**：垂直 Tab (Transactions/Game/**Promotions**) → 右側卡式列表，樣式對齊 Transactions 的「紫漸層 header + 白下半身 + Status badge」 |
| Gift Box | 全新（Rainbet 結構）| 保留 + 視覺切糖果紫 |
| Reward Center | 全新（Rainbet 結構）| 保留 + 視覺切糖果紫，沿用 PP 頁 layout（Title + Banner + Content Card） |
