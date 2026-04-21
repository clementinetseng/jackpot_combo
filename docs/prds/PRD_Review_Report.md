# PRD 綜合專業審查報告（第三版 — 含 Prototype 比對）

**審查日期：** 2026-04-15  
**審查人：** Claude (AI Product Review)  
**審查範圍：** iGaming 獎勵與流水系統 — 全套文件 + 2 個 Prototype  

---

## 一、審查摘要

### 文件架構（依你的定位）

| 層級 | 文件 | 定位 |
|------|------|------|
| 引擎底層 | **統一流水引擎 PRD** | 核心業務規則，雙層流水架構的唯一規格來源 |
| 後台 CRUD | **後台-玩家獎勵管理 PRD** | 活動設定的增刪改查 + Wizard |
| 後台 CRUD | **後台-玩家獎勵紀錄總表 PRD** | 獎勵紀錄查詢 + Close 操作 |
| 參考 | **專案交接文件** | 架構決策記錄 + 待辦清單 |
| 已棄用 | ~~金流管理 Turnover PRD~~ | 已整合進統一引擎 |
| 待重新定位 | 促銷活動與流水計算方式 PRD | 與統一引擎大量重疊，需確認保留範圍 |

### Prototype

| Prototype | 網址 | 用途 |
|-----------|------|------|
| 營運後台 | deposit-backoffice.onrender.com | Promotion List + Create Wizard + Reward History |
| 玩家前台 | deposit-frontend.onrender.com | 大廳 + 錢包 + 存提款 + 促銷展示 |

### 整體結論

統一流水引擎 PRD 的品質很高，雙層架構邏輯清晰。兩個 Prototype 的完成度也不錯，大部分核心流程已可互動。但 **Prototype 與 PRD 之間存在若干不一致**，部分屬於 Prototype 領先 PRD（如 Close Reason Dropdown），部分屬於 Prototype 落後或偏離 PRD（如 Category 名稱不一致、缺少欄位）。以下逐一分析。

---

## 二、Prototype vs PRD 差異分析 — 營運後台

### 2.1 Promotion List 頁面

| 項目 | PRD 定義 | Prototype 實際 | 差異嚴重度 |
|------|----------|--------------|-----------|
| Search 機制 | 先選搜尋欄位（name / id / linked_announcement），再輸入文字 | 單一搜尋框「Search name or ID...」，無欄位選擇 | **低** — Prototype 更簡潔，但失去 linked_announcement 搜尋能力 |
| Promotion Type 選項 | V1：`All` / `Deposit Bonus` | `All` / `Deposit Bonus` / `Reload Bonus` | **中** — Prototype 多了 Reload Bonus，PRD 未定義此類型 |
| Status Toggle | PRD 描述為操作行為（含二次確認） | Prototype 用 checkbox toggle，視覺上可直接切換 | **中** — 需確認 toggle 是否有二次確認彈窗 |
| Actions 按鈕 | Edit（僅 Disabled）/ Duplicate / View | Prototype 一致：Disabled 行顯示 Edit + Duplicate + View；Enabled 行僅顯示 Duplicate + View | **符合** |

### 2.2 Create Promotion Wizard

#### Step 1: Basic Setup — **基本符合**

| 項目 | PRD | Prototype | 備註 |
|------|-----|-----------|------|
| Promotion Type | 必填，V1 固定 Deposit Bonus | 顯示「Deposit Bonus」唯讀 + 說明「V1 MVP only supports Deposit Bonus」 | 符合 |
| Period Type | No End Date / Custom Period | 兩個 radio：No End Date (Long-term) / Custom Period | 符合 |
| 底部按鈕 | Cancel / Save / Back / Next | Cancel / Next（無 Save） | **中** — 缺少 Save 按鈕，PRD 明確要求「允許存半成品」 |

#### Step 2: Condition — **大致符合，有小差異**

| 項目 | PRD | Prototype | 差異 |
|------|-----|-----------|------|
| Deposit Count | `Any Deposit` / `First Deposit` | 增加了 `Nth Deposit (Coming soon)` 灰化選項 | **低** — 預留未來功能，合理 |
| Payment Methods | Epay / Bank Transfer / Crypto / Other | Credit Card / E-Wallet / Bank Transfer / Crypto / PayPal / Other | **中** — 選項不一致，需統一 |
| Min Deposit 預設值 | 必須 > 0 | 預設為 0 | **高** — PRD 要求 > 0，Prototype 預設 0 違反驗證規則 |
| Player ID Input | Include/Exclude/AB Test 時顯示文字輸入區 | 選擇非 All Players 時，未看到輸入區顯示 | **中** — 可能需展開才看到，但初始未顯示 |

#### Step 3: Reward & WR — **存在重大差異**

| 項目 | PRD | Prototype | 差異嚴重度 |
|------|-----|-----------|-----------|
| **Category 名稱** | SLOT / FISH / TABLE / ARCADE / EGAME / LIVE (6 類) | Slots / Table Games / Live Casino / Virtual Sports (4 類) | **嚴重** |
| **缺少的 Category** | FISH / ARCADE / EGAME 都是 PRD 定義的類別 | 完全缺失 | **嚴重** |
| **多出的 Category** | 無 Virtual Sports | 多了 Virtual Sports | **中** — 需確認是否為新增類別 |
| Max Stake Limit | 統一引擎 PRD §5.6 明確定義 | Wizard 中無此欄位 | **高** — Drawer 中有顯示但建立時無法設定 |
| Exclude From Rebate | PRD Step 3 有此勾選框 | Wizard 中無此欄位 | **高** — Drawer 中有顯示但建立時無法設定 |

> **這是最嚴重的差異。** Category 是貢獻度計算的基礎，Prototype 的 4 類與 PRD/統一引擎的 6 類完全不同步。若以此 Prototype 交付，工程端會建出錯誤的 schema。

#### Step 4: Info / Announcement — **基本符合**

| 項目 | PRD | Prototype | 備註 |
|------|-----|-----------|------|
| T&C 編輯器 | 要求豐富格式（粗體、標題、清單、超連結等） | 提供 B / I / Heading / Color / Link 基本工具列 | 大致符合，但缺少有序清單、引用框等 |
| Preview 面板 | 右側即時預覽 | 有 App Overall Preview（Promotion Card + Deposit Info Box + Detailed T&C） | **符合且做得更好** — 三種預覽同時呈現 |
| 手機預覽 | PRD 未提及 | 底部有「手機端前台同步預覽（如 Image 3, 4, 5）」提示 | **Prototype 領先** |
| 底部按鈕 | Cancel / Save / Back / Next（最後一步為 Save） | Back / Save | 符合 |

### 2.3 Reward History 頁面

| 項目 | PRD | Prototype | 差異嚴重度 |
|------|-----|-----------|-----------|
| **狀態欄位架構** | 分為 Reward Status + WR Status 兩欄 | 合併為單一 「Current State」欄 | **高** — 架構不同，影響資料模型 |
| **WR Status Filter** | PRD 未定義（交接文件標註為待新增） | Prototype 有 「Current State (Multi)」filter | **Prototype 部分領先** — 但名稱和選項需對齊 |
| Grant Method 欄位 | PRD 定義：Auto-Credited / Claimable / Manual Grant | Prototype 無此欄位，改為 「Created By Type」filter | **中** — 概念相近但命名不同 |
| Username 搜尋 | PRD Search Field 包含 username | Prototype 無 username 選項 | **低** |
| Close 操作按鈕文案 | PRD 用「Closed」 | Prototype 用「Manual Close」 | **低** — Prototype 更清晰 |
| **Close Reason** | PRD 為自由文字（Remark min 2 chars） | Prototype 為 **Dropdown**（Select a reason）+ Internal Remark 文字框 | **Prototype 領先** — 更利於後續分析 |
| Drawer Section B | PRD 列出 WR 相關欄位 | Prototype 分為 Section A (Basic) / B (WR Details) / C (Action & Audit)，且包含 Max Stake Limit、Exclude From Rebate | **Prototype 領先** — 結構更清晰 |
| Drawer 新增欄位 | PRD 無 | Prototype 增加「Source Module」（如 Promotion Engine） | **Prototype 領先** — 為多來源獎勵預留 |

---

## 三、Prototype vs PRD 差異分析 — 玩家前台

### 3.1 首頁 / 大廳

| 項目 | PRD 定義 | Prototype 實際 | 備註 |
|------|----------|--------------|------|
| 促銷 Banner | PRD 未詳細定義 | 輪播 Banner「100% First Deposit Bonus」，有 Tag「FIRST DEPOSIT」 | 與後台 Step 4 的 Promotion Tag / Main Title 對應 |
| 遊戲分類 | 統一引擎 §4.3：SLOT / FISH / TABLE / ARCADE / EGAME / LIVE / P2P | 前台分類：Feature / Slot / Fish / Live / Egame / Combo；側邊有 Casino / Provider | **大致一致**，但前台多了 Feature / Combo 分類 |
| 左側面板 | PRD 未定義 | 顯示 Balance ₱0.00 + Deposit / Withdraw 按鈕 | 合理 |

### 3.2 錢包 / Wallet 頁面

#### Deposit Tab

| 項目 | PRD / 統一引擎 | Prototype | 差異嚴重度 |
|------|--------------|-----------|-----------|
| 活動選擇 | 「玩家在儲值頁主動勾選活動」 | Dropdown「Choose your bonus」+ 顯示活動名稱與最低存款 | **符合** |
| Info Box 文案 | PRD Step 4 定義 Deposit Page Info Box | 顯示「Your deposit amount and bonus will be credited to your **Casino Bonus Wallet** with a **40x wager requirement**.」 | **嚴重矛盾** |
| Payment Methods | PRD 未詳細定義前台 | 顯示 QRPh | 合理 |
| Deposit Amount | PRD 未詳細定義前台 | 快速金額按鈕 + 自訂輸入，範圍 500~50,000 | 合理 |

> **「Casino Bonus Wallet」文案嚴重違反核心原則。** 統一引擎 PRD 固定原則 #1 明確規定「不建立 Bonus Wallet，所有資金體現在 Total Balance」。前台出現「Casino Bonus Wallet」字眼會誤導玩家認為有獨立的紅利錢包，必須修正。

#### Withdraw Tab

| 項目 | 統一引擎 PRD §10 | Prototype | 差異嚴重度 |
|------|-----------------|-----------|-----------|
| Total Balance | 顯示 Balance | 顯示 Total Balance ₱3,600 | **符合** |
| Available to Withdraw | 兩層皆清 = Balance，否則 ₱0 | Available to Withdraw ₱0.00 | **符合** |
| Wager Requirement 區塊 | 「單一 Tracker」策略 | 顯示 Wager Requirement ₱108,000 / 75.00% 進度條 | **符合** |
| 提示文案 | 統一引擎定義三種阻擋提示 | 「Wager ₱108,000 to withdraw」+ 「Learn more →」 | **部分符合** — 未區分基礎流水 vs 促銷 WR 的不同文案 |
| Preview Dropdown | PRD 未定義 | 有「Preview: No Bonus - Not started (0%)」dropdown | **Prototype 領先** — 可能用於切換不同活動的預覽 |
| Payment Methods | PRD 未詳細定義 | GCash / PayMaya + Link Account | 合理 |

### 3.3 前台 vs 統一引擎 PRD §10 對照

| 統一引擎 PRD 規格 | Prototype 是否實作 | 備註 |
|------------------|-------------------|------|
| 有 ACTIVE 促銷 → 只顯示促銷進度 | 是（Wager Requirement 區塊） | 符合 |
| 無促銷但基礎債務 > 0 → 顯示基礎流水進度 | 無法確認（目前顯示的是促銷） | 需測試 |
| 兩層皆清 → 顯示可提款 | 無法確認 | 需測試 |
| Tooltip 提示文字 | 未見到 | **缺失** — PRD 有定義中英文 tooltip |
| 遊戲入口阻擋 | 未見到阻擋效果 | 無法在 prototype 中測試 |
| 提款被阻擋時區分來源文案 | 未見到區分 | **缺失** — PRD 定義了促銷 vs 基礎的不同文案 |

---

## 四、關鍵問題總覽（按嚴重度排序）

### 4.1 嚴重 (Must Fix Before Dev)

| # | 問題 | 來源 | 說明 |
|---|------|------|------|
| **C-1** | **前台「Casino Bonus Wallet」文案違反單一錢包原則** | 前台 Prototype | 統一引擎固定原則 #1：不建立 Bonus Wallet。此文案必須改為例如「Your deposit and bonus will be credited to your account with a 40x wager requirement.」 |
| **C-2** | **Wizard Step 3 Category 名稱與數量與 PRD/引擎完全不同步** | 後台 Prototype | Prototype：4 類（Slots / Table Games / Live Casino / Virtual Sports）。PRD/引擎：6 類（SLOT / FISH / TABLE / ARCADE / EGAME / LIVE）。必須統一，否則影響整套貢獻度計算。 |
| **C-3** | **Wizard Step 3 缺少 Max Stake Limit 設定欄位** | 後台 Prototype | 統一引擎 §5.6 定義了 Max Stake Rule，Reward History Drawer 也有顯示此值，但建立活動時無法設定。 |
| **C-4** | **Wizard Step 3 缺少 Exclude From Rebate 勾選框** | 後台 Prototype | PRD 明確列為 Step 3 欄位，Drawer 也有顯示，但 Wizard 漏掉。 |

### 4.2 高 (Fix Before Sprint)

| # | 問題 | 來源 | 說明 |
|---|------|------|------|
| **H-1** | **Min Deposit 預設值為 0** | 後台 Prototype Step 2 | PRD 要求必須 > 0。建議預設值改為平台最低存款額或留空。 |
| **H-2** | **Reward History 狀態欄位架構不一致** | 後台 Prototype vs PRD | Prototype 合併為「Current State」，PRD 分為 Reward Status + WR Status。需決定以哪個為準，並更新另一方。 |
| **H-3** | **Wizard 缺少 Save 按鈕（Step 1~3）** | 後台 Prototype | PRD 明確要求 Save 允許存半成品。Prototype Step 1~3 只有 Cancel + Next/Back，無法中途儲存。 |
| **H-4** | **促銷 PRD 與統一引擎 PRD 關係未正式定義** | 文件架構 | 兩份文件有大量重疊，需正式聲明引擎層邏輯以統一引擎 PRD 為準。 |
| **H-5** | **CLOSED 操作缺少快照與回滾保護定義** | 統一引擎 PRD | 清零操作高風險，需補充 DB transaction 保護與快照記錄。 |

### 4.3 中 (Should Fix)

| # | 問題 | 來源 | 說明 |
|---|------|------|------|
| M-1 | Payment Methods 選項不一致 | 後台 Step 2 vs PRD | PRD：Epay 等；Prototype：Credit Card / E-Wallet 等 |
| M-2 | 前台提款阻擋文案未區分來源 | 前台 Prototype | 統一引擎定義三種不同文案（促銷 / 基礎 / 金額超限），前台需實作 |
| M-3 | 前台缺少 Tooltip 提示文字 | 前台 Prototype | 統一引擎 §10.2 有定義中英文 tooltip |
| M-4 | Promotion ID 生成規則未定義 | PRD | 格式 `PRM-20260408-0001` 但規則不完整 |
| M-5 | AB Test 帳號尾數功能規格不足 | PRD | 尾數位數、範圍、多選等未定義 |
| M-6 | T&C 編輯器缺少有序清單和引用框 | 後台 Prototype Step 4 | PRD 列出的格式需求部分未實現 |
| M-7 | Exclude From Rebate 受影響模組清單未定義 | 交接文件待辦 | 需列出 VIP Cashback / Rakeback 等受影響模組 |
| M-8 | Reward Status × WR Status 對映矩陣缺失 | PRD | CLOSED → REVOKED？COMPLETED → GRANTED stays？需明確 |
| M-9 | Manual Adjustment 是否觸發低餘額返場 | 統一引擎 PRD | 建議明確：MA 不觸發返場，僅玩家存款觸發 |
| M-10 | 遊戲入口阻擋邏輯需精確化 | 統一引擎 PRD | 0% 貢獻度 vs 明確排除，是否都阻擋？ |

### 4.4 低 / Prototype 領先 PRD 的正面差異

以下為 Prototype 做得比 PRD 更好的地方，**建議反向更新 PRD 以對齊 Prototype**：

| # | Prototype 設計 | PRD 現狀 | 建議 |
|---|---------------|----------|------|
| P-1 | Close Reason 使用 Dropdown + Internal Remark | PRD 僅要求 Remark 文字 | **更新 PRD** 採用 Dropdown 設計 |
| P-2 | Reward Detail Drawer 分三段（Basic / WR Details / Action & Audit） | PRD 為平鋪欄位列表 | **更新 PRD** 採用分段結構 |
| P-3 | Drawer 包含 Source Module 欄位 | PRD 無此欄位 | **更新 PRD** 納入此欄位，為多來源獎勵預留 |
| P-4 | Step 4 App Overall Preview 三種預覽 + 手機端提示 | PRD 僅寫「右側顯示預覽」 | **更新 PRD** 明確三種預覽區塊 |
| P-5 | Manual Close 按鈕文案比「Closed」更清晰 | PRD 用「Closed」 | **更新 PRD** 改用「Manual Close」 |
| P-6 | 前台提款頁 Preview dropdown（切換活動預覽） | PRD 未定義此功能 | 評估是否保留，若保留則**更新 PRD** |

---

## 五、Prototype 截圖紀錄

審查過程中截取了以下畫面供參考：

**營運後台：**
1. Promotion List — 三筆活動，含 Enabled/Disabled toggle、Actions 按鈕
2. Create Wizard Step 1 — Basic Setup（Name / Type / Period / Remark）
3. Create Wizard Step 2 — Condition（Deposit Count / Min-Max / Claims / Payment / Player Scope）
4. Create Wizard Step 3 — Reward & WR（Bonus Config + WR Model + Contribution + Override Priority）
5. Create Wizard Step 4 — Info/Announcement（Card Appearance + T&C Editor + App Overall Preview）
6. Reward History — 三筆紀錄，Current State 顯示 ACTIVE/GRANTED/PENDING
7. Reward Detail Drawer — Section A (Basic) + Section B (WR Details) + Section C (Action & Audit)
8. Manual Close Dialog — 警告文案 + Reason Dropdown + Internal Remark

**玩家前台：**
9. 大廳首頁 — 促銷 Banner + 遊戲分類（Egame / Slot / Fish）
10. Wallet Deposit — Choose Bonus Dropdown + Info Box（⚠️ Casino Bonus Wallet 文案）+ Amount
11. Wallet Withdraw — Total Balance / Available to Withdraw + Wager Requirement 進度條

---

## 六、優先行動清單（最終版）

### Phase 1: 嚴重問題修正（阻擋開發）

1. **修正前台「Casino Bonus Wallet」文案** → 改為不暗示獨立錢包的措辭
2. **統一 Category 定義** → 後台 Wizard 必須與統一引擎 PRD §4.3 的 6 類對齊（SLOT / FISH / TABLE / ARCADE / EGAME / LIVE），並確認是否新增 P2P / Virtual Sports
3. **Wizard Step 3 新增 Max Stake Limit 欄位**
4. **Wizard Step 3 新增 Exclude From Rebate 勾選框**

### Phase 2: 高優先修正（Sprint 前）

5. Min Deposit 預設值改為空或 > 0 驗證
6. 決定 Reward History 狀態欄位架構（單欄 vs 雙欄），更新 PRD 或 Prototype
7. Wizard Step 1~3 增加 Save 按鈕
8. 正式定義促銷 PRD 的保留範圍，與統一引擎 PRD 劃清邊界
9. 統一引擎 PRD 補充 CLOSED 快照/回滾保護

### Phase 3: 中優先修正

10. Payment Methods 選項統一
11. 前台提款阻擋文案區分來源
12. 前台 Tooltip 實作
13. Promotion ID 生成規則 / AB Test 規格 / T&C 編輯器格式補全
14. Exclude From Rebate 受影響模組清單
15. Reward Status × WR Status 對映矩陣
16. 建立專案級 Glossary

### Phase 4: PRD 反向更新（對齊 Prototype 正面改進）

17. Close Reason Dropdown 設計寫入 PRD
18. Drawer 三段式結構 + Source Module 寫入 PRD
19. App Overall Preview 三種預覽寫入 PRD
20. Manual Close 文案替換 Closed 寫入 PRD

---

## 七、評分摘要（最終版）

| 文件 / Prototype | 完整度 | 清晰度 | 與引擎一致性 | 綜合 |
|-----------------|--------|--------|-------------|------|
| **統一流水引擎 PRD** | ★★★★★ | ★★★★★ | — (自身為基準) | **4.5/5** |
| 後台-獎勵管理 PRD | ★★★★☆ | ★★★★☆ | ★★★☆☆ | 3.5/5 |
| 後台-獎勵紀錄總表 PRD | ★★★★☆ | ★★★★☆ | ★★★☆☆ | 3.5/5 |
| 專案交接文件 | ★★★★☆ | ★★★★★ | ★★★★★ | **4.5/5** |
| **後台 Prototype** | ★★★★☆ | ★★★★☆ | ★★☆☆☆ | **3.0/5** |
| **前台 Prototype** | ★★★☆☆ | ★★★★☆ | ★★☆☆☆ | **2.5/5** |

**主要扣分原因：** 兩個 Prototype 與統一引擎 PRD 的 Category 定義不同步是最大問題；前台「Casino Bonus Wallet」文案直接違反核心原則。

**整體系統級評分：3.5 / 5** — 核心引擎規格優秀，但 Prototype 與 PRD 的同步落差若不修正，將在開發階段造成顯著返工。

---

*本報告基於文件內容分析 + Prototype 實際瀏覽，建議在 Sprint 啟動前召開 PM + 工程 + 前端三方對齊會議，以本報告的 Phase 1 清單為議程重點。*
