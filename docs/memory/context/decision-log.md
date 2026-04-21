# 架構決策紀錄（Decision Log）

按時間順序記錄所有討論過的設計決策及理由。

## Session 1（V1.0 → V1.1）

| # | 決策 | 理由 | 日期 |
|---|------|------|------|
| D1 | CLOSED snapshot 用 audit log 即可 | 不需額外快照機制 | 2026/04 |
| D2 | MA 不觸發 comeback | MA 是人工操作，不應自動清流水 | 2026/04 |
| D3 | 0% 貢獻度遊戲可進入 + 警告 | 不硬擋，因為投注仍可推進基礎流水 | 2026/04 |
| D4 | P2P 用 Provider/Game ID 排除清單 | 不另設 Category | 2026/04 |
| D5 | 6 Category（SLOT/FISH/TABLE/ARCADE/EGAME/LIVE） | 依 PRD 定義 | 2026/04 |
| D6 | 多錢包寫入，V1 僅線上 | 預留架構但不實作 | 2026/04 |
| D7 | QA 擴充為完整 Checklist | | 2026/04 |

## Session 2（V1.1 → V1.2 第一輪）

| # | 決策 | 理由 | 日期 |
|---|------|------|------|
| D8 | 引擎全錢包，促銷 V1 僅線上 | 原則 1 重新定義 | 2026/04 |
| D9 | 移除 Max Stake 機制 | Clement 決定不設此限制 | 2026/04 |
| D10 | 合併 ComebackThreshold + GlobalMinBetAmount | 平台最低押注看遊戲商，非平台參數 | 2026/04 |
| D11 | 移除後台手動存款 | 平台無此功能 | 2026/04 |
| D12 | 基礎貢獻度改 config 設定檔 | 非後台 UI，Category % 可調 + Game Code 排除 | 2026/04 |
| D13 | Glossary 採 PH 市場用語 | Deposit Turnover, Wagering Progress, Withdrawable 等 | 2026/04 |
| D14 | 狀態圖改用 flowchart + 顏色 | stateDiagram-v2 看不懂 | 2026/04 |

## Session 2（V1.2 第二輪 — 促銷儲值免基礎流水的討論）

| # | 決策 | 理由 | 日期 |
|---|------|------|------|
| D15 | 促銷儲值免基礎流水 → **否決，改回 V1.1** | AML 漏洞（低 WR Model C）+ 開發耦合（存款依賴促銷驗證）| 2026/04 |
| D16 | 每筆存款永遠產生基礎流水（最終定案） | 關注點分離 + AML 安全網 + 業界慣例 | 2026/04 |

## Session 2（V1.2 第三輪 — 細節修正）

| # | 決策 | 理由 | 日期 |
|---|------|------|------|
| D17 | 公式改中文描述（不用 +=） | 非 RD 讀者看不懂程式符號 | 2026/04 |
| D18 | 後台手動提款不檢查流水 | 直接處理，完成後歸零 | 2026/04 |
| D19 | 手動調整流水標註 V1 待定 | 已實作但備註預留 | 2026/04 |
| D20 | 儲值 Min/Max 不符 → Submit Disable | 前台表單驗證 | 2026/04 |
| D21 | 提款條件不符 → Withdraw Disable | | 2026/04 |
| D22 | 移除「僅 PENDING」狀態 | 設計上不可能存在 | 2026/04 |
| D23 | 進度條切換動畫留 V2 | V1 只做邏輯 | 2026/04 |
| D24 | 前台 prototype 合併促銷活動一起做 | 同一頁面，拆開看不出完整體驗 | 2026/04 |

## Session 2（V1.2 第四輪 — 架構簡化）

| # | 決策 | 理由 | 日期 |
|---|------|------|------|
| D25 | Bustout Reset 合併 comeback + OOB | 共用條件（餘額<₱1），一個概念一套邏輯 | 2026/04 |
| D26 | 歸零觸發僅 2 個（Bustout + 提款） | 最小化系統負擔 | 2026/04 |
| D27 | CANCELLED 取代 CLOSED | Bonus 不扣回，營運手動處理。手動調整流水已實作可搭配 | 2026/04 |
| D28 | CANCELLED Bonus 處理：方案 B（不動） | 營運手動決定是否扣回 | 2026/04 |
| D29 | 促銷進度條優先於基礎流水（維持） | ACTIVE 促銷是 blocker，玩家行動不變 | 2026/04 |
| D30 | 加 TurnoverRequirement 生命週期圖 | 讓基礎 vs 促銷的歸零邏輯差異一目瞭然 | 2026/04 |
| D31 | 術語全面統一：Deposit Turnover / Bonus Turnover | 前台、後台、欄位名全部用 Turnover 體系，用 Deposit/Bonus 前綴區分。消除 WR/TR 混用。後續 Phase 2 PRD 同步適用 | 2026/04 |
| D32 | 手動調整流水：只改目標，不動進度 | 調 Target 不歸零 Progress。調低=減債/補償，調高=加債。Progress>=Target 即已清 | 2026/04 |
| D33 | CANCELLED 改為逐筆取消，不連帶 | 營運從 Reward History 多選或逐筆 Cancel（ACTIVE / PENDING 皆可）。取消 ACTIVE 後 FIFO 自動遞補下一筆 PENDING。不再自動連帶取消所有 PENDING | 2026/04 |

## Session 4（活動設定管理 — 觸發條件重構）

| # | 決策 | 理由 | 日期 |
|---|------|------|------|
| D34 | 觸發條件改為 Toggle + AND 組合，取代舊 Deposit Count Condition | 支援動態場景（每日首存、累計達標、新客、首存加碼等）。條件各自開關，啟用的 AND 連結 | 2026/04 |
| D35 | V1 實作 C1~C5，V2 預留 C6~C8 | C1 當日第N筆存款、C2 累計第N筆存款、C3 當日累計存款、C4 註冊天數限制、C5 首存後時限。C6 沉睡回歸、C7 連續存款天數、C8 當日淨虧損留 V2（引擎複雜度高） | 2026/04 |
| D36 | 條件時間基準為 GMT+8 00:00 | 菲律賓市場（PH）= GMT+8，每日重置統一用 00:00 | 2026/04 |

## Session 5（前台-玩家端 PRD — Gap Analysis 結論）

> Design Agent 以資深 UIUX + PM 視角審視 PRD 後的結論。Clement 於 2026-04-17 全數採納；實際回溯更新僅採部分（見「執行狀態」欄）。

| # | 決策 | 理由 | 執行狀態 | 日期 |
|---|------|------|---------|------|
| D37 | `MinWithdrawalAmount` 加入 Config（平台最低提款金額） | 避免提款手續費高於金額；PRD 原缺此參數 | 📝 前台 PRD 已納；引擎 PRD 未回改 | 2026/04 |
| D38 | Deposit 頁 Ineligible 活動**不顯示**（從原 Gap 建議「灰階顯示 + 原因」改為完全不顯示） | Clement 偏好：不暴露過多資訊給玩家；只列可參加的活動 | ✅ 前台 PRD | 2026/04 |
| D39 | 遊戲入口警告觸發點明定：遊戲卡角標 + 啟動前 Interstitial Modal + Session 級別 Don't show again | 原 PRD §10.7 未寫顯示位置，RD 無從實作 | ✅ 引擎 PRD §10.7 已補 | 2026/04 |
| D40 | 🎁 未讀 Badge 觸發事件定義：新活動上架、Bonus 入帳、ACTIVE 結束、活動 < 48h 到期 | 原 PRD 未定義；點開 Dropdown 即清零 | ✅ 前台 PRD §3 | 2026/04 |
| D41 | OOB 後首次儲值 Welcome banner + Toast 提示，V1 必做（非 V2 優化） | 玩家看到活動消失會困惑，客訴風險高 | 📝 前台 PRD 已納；引擎 PRD §10.3 未回改 | 2026/04 |
| D42 | Bonus / Turnover 絕對金額試算（Info Box、Summary 一律 `Bet ₱45,000 to withdraw`） | PH 玩家對倍數無感、對絕對金額敏感；不顯示 Model A/B/C | ✅ 前台 PRD §1.7 | 2026/04 |
| D43 | PENDING 活動玩家端可見（Reward Center / Gift Box / Deposit 頁均需呈現） | 玩家需知道排隊順序，不然會誤判平台 bug | ✅ 前台 PRD §1.6/§3/§4 | 2026/04 |
| D44 | Deposit 成功後 3 秒 Toast → 導向大廳 + Total Balance 立即刷新 + 🎁 Badge +1 | 符合 iGaming 慣性，玩家快速回到遊戲 | ✅ 前台 PRD §1.9 | 2026/04 |
| D45 | Withdraw 頁 KYC 前置驗證（頁面載入即檢查，不等玩家填金額） | 避免玩家填完才被擋的挫折感 | ✅ 前台 PRD §2.5 | 2026/04 |
| D46 | `No Promotion` 為 Deposit 頁第一選項（文案：`No Promotion`） | PH 玩家很多純玩不想被鎖；避免預設勾活動 → 客訴 | ✅ 前台 PRD §1.6 | 2026/04 |
| D47 | 選活動後 Summary 區塊顯示 🔒 Lock Warning | AML 合規 + 玩家信任；不藏鎖定條件 | ✅ 前台 PRD §1.7 | 2026/04 |
| D48 | 阻擋提款文案改為**絕對金額** `Bet ₱X,XXX more to withdraw`（非百分比） | 絕對金額 > % 直觀（D42 同原則） | 📝 前台 PRD 已納；引擎 PRD §10.6 未回改 | 2026/04 |
| D49 | Withdraw 頁阻擋狀態主 CTA 改為 `Play Now →`（Withdraw 按鈕灰 Locked） | 給玩家下一步方向，不卡死 | ✅ 前台 PRD §2.6 | 2026/04 |
| D50 | Reward Center / Gift Box 活動卡 CTA 直接 `Deposit to Join` → 自動 preselect 該活動 | 減少流程步數、提升轉化 | ✅ 前台 PRD §4.5 | 2026/04 |
| D51 | Record 頁 Promotion Tab：`ACTIVE` 置頂 → `PENDING` → 其他按 Joined DESC | 玩家最常查當前狀態 | ✅ 前台 PRD §5.5 | 2026/04 |
| D52 | 玩家友善狀態翻譯：PENDING=Pending / ACTIVE=Active / COMPLETED=Completed 🎉 / OOB=Ended (low balance) / CANCELLED=Cancelled | 後端 enum 直接展示給玩家看不懂 | ✅ 引擎 PRD §2.4 + glossary.md + 前台 PRD | 2026/04 |
| D53 | 共用 `<TurnoverStatus>` 元件（5 處同步：Deposit/Withdraw/Reward Center/Gift Box/Wallet） | 資料同源，避免各頁實作導致狀態不一致 | ✅ 前台 PRD §0.1 | 2026/04 |
| D54 | 每張活動卡自帶 `View T&C` 連結 → 點擊開 Modal 顯示 Detailed T&C | 合規 + 每活動條款獨立 | ✅ 前台 PRD §0.4/§1.6/§4.5 | 2026/04 |
| D55 | 每頁 Footer 統一放 `FAQ` + `Need help? Contact Support`；阻擋狀態卡不再放 `?` icon | 統一入口，不分散玩家注意力 | ✅ 前台 PRD §0.4 | 2026/04 |
| D56 | 輸入驗證即時隨輸入顯示紅字（不等 blur、不等 submit） | 即時回饋 > 事後阻擋 | ✅ 前台 PRD §1.4/§2.4 | 2026/04 |
| D57 | Bonus Turnover 首次出現附 tooltip：`The total amount you need to bet before you can withdraw.` | 術語口語化，降低理解門檻 | 📝 前台 PRD 已納；引擎 PRD 未回改 | 2026/04 |
| D58 | `Total Balance` 前台保留原詞，不簡化為 `Balance` | Clement 指示：保留完整術語 | ✅ 引擎 PRD §2.3/§10.5 + glossary.md + 前台 PRD | 2026/04 |
| D59 | 空狀態統一規則：友善 emoji + 一行文案 + 一個 CTA，**禁止留空白** | PH 玩家卡關時需明確下一步 | ✅ 前台 PRD §0.5 | 2026/04 |

**未回溯更新的項目（Clement 2026-04-17 決定暫不動舊 PRD，以前台 PRD 為 source of truth）：**

| 項目 | 說明 |
|---|---|
| D37 / D41 / D42 (Info Box) / D48 / D57 | 屬前台呈現層優化，先寫在《前台-玩家端 PRD》。引擎 PRD 的 §8.1 提款判斷、§10.3 進度條切換、§10.6 阻擋文案、§10.8 Info Box 暫保留原文；未來若 RD 詢問以前台 PRD 為準 |
| D45 (KYC 前置) | 同上，前台流程優化，引擎側無邏輯變動 |

## Session 6（前台 PRD — Gift Box / Reward Center / Record 重構）

> Clement 2026-04-17 下午提供 Rainbet 參考圖，確認 Reward Center / Gift Box 採 Section 式分類、Record 頁範圍限縮。

| # | 決策 | 理由 | 執行狀態 | 日期 |
|---|------|------|---------|------|
| D60 | Gift Box / Reward Center 採 **Section 式分類**（參考 Rainbet pattern）：`Active Promotion` + `For You`（V1 核心）+ `Claim Now` / `VIP` / `Rakeback` / `Total Rewards`（V2 預留）；無資料 Section 整段隱藏，不留空列 | 保持 layout 擴充性，V2 加新類型活動時不用重排 | ✅ 前台 PRD §3 / §4 | 2026/04 |
| D61 | Record 頁**僅新增 Promotion Tab**，Transaction / Game 由現有平台提供（不重複寫規格） | 避免 PRD 擴散；現有平台已有成熟實作 | ✅ 前台 PRD §5 | 2026/04 |

## Session 7（前台 Prototype v2 迭代 — 2026-04-21）

> 基於 PP 實機（已登入 KYC 完成）重新對齊設計語言 + 經 Clement 20 輪反饋迭代。所有決策以最終 prototype 為準。

| # | 決策 | 理由 | 執行狀態 |
|---|------|------|---------|
| D62 | 設計主題從 **UAT 藍 `#5275E9`** 改為 **PP 實機糖果紫**（淡紫漸層背景 + 白色內容卡 + 藍紫漸層 CTA + 黃 `#FFC107` Balance 強調） | 之前誤判 UAT 登出狀態為白底藍；實測 PP 登入後為糖果紫 | ✅ `apps/player` + design-system/tokens |
| D63 | Deposit 頁**沿用 PP 骨架** 插入促銷模組（Payment → Choose bonus → Amount → Summary → Submit） | 降低 RD 改動成本；視覺一致 | ✅ 前台 PRD §1 |
| D64 | Deposit 頁**不顯示 TurnoverStatus 卡**（與 Wallet pill / Gift Box 冗餘） | 專注儲值決策，不分散注意力 | ✅ 前台 PRD §1 |
| D65 | `Choose a Promotion` → **`Choose your bonus`**；`X eligible` → `X available` | PH 玩家對 `eligible` 抽象；BC.GAME pattern 驗證 | ✅ 前台 PRD §1.6 |
| D66 | 選擇促銷改為 **Dropdown (radio list)**（取代 card grid） | Clement 反饋：card grid 視覺複雜；dropdown 省空間 | ✅ 前台 PRD §1.6 |
| D67 | Reward / Gift Box 活動卡主 CTA **`Claim Now`**（取代 `Deposit to Join`） | 和 Rainbet/BC.GAME pattern 一致；簡潔 | ✅ 前台 PRD §3 / §4 |
| D68 | Summary **去 View T&C 連結**（上方 dropdown 已有）+ **去 🔒 Withdrawal locked 副標**（`Bet to withdraw ₱X` 已清楚） | 消除重複 + 精簡 | ✅ 前台 PRD §1.7 |
| D69 | Withdraw 頁**阻擋時整個 form 灰掉**（`opacity-50 pointer-events-none`）；Submit 文案 `🔒 Locked — Complete the requirements above` | 避免玩家在阻擋時可操作底下欄位 | ✅ 前台 PRD §2.5 |
| D70 | Withdraw `Available Balance` 的 **`ⓘ` popover 完全移除** | 阻擋時整個 form 灰掉 ⓘ 點不了；無阻擋時 Balance=Withdrawable 一目了然 | ✅ 前台 PRD §2.4 |
| D71 | Blocker Card 加 **`Why is withdrawal locked?` 簡短 intro + `Learn more →` Modal**；Modal 保留 intro + Progress 方塊 + **FAQ accordion（寫死 + 動態代入）** | 減少客訴；PH 玩家自助查 FAQ | ✅ 前台 PRD §2.5 |
| D72 | Gift Box **三狀態互斥**（只顯示一個 Status block）：A 有 Active → Active 卡含進度；B 僅 Deposit Turnover → Turnover 進度；C 可提款 → **不顯示 status row** | 消除 TurnoverStatus 與 Active Promotion 並列冗餘 | ✅ 前台 PRD §3 |
| D73 | Gift Box **不顯示 Pending 活動詳細**，改一行 `+ N more pending · View in Rewards →` 提示 | Clement 偏好：pending 完整資訊放 Reward Center | ✅ 前台 PRD §3 |
| D74 | **OOB Welcome banner 移除**，OOB 後走正常流程（不特別提示） | Clement 偏好：無需特殊 UI 中斷 | ✅ 前台 PRD §1（刪 §1.10） |
| D75 | Record 卡片重設：**Status badge 放前、活動名主位、Bonus 金額移右小字**；左側彩色 border 依 Status 著色 | 玩家最關心狀態 > Bonus 數字 | ✅ 前台 PRD §5 |
| D76 | Record 頁**日期範圍 + Filter Popover**（仿 PP 圖）：兩 date input + 紫色方塊 Filter icon（SVG 漏斗）+ Popover 含 Status pill grid + Reset / OK | 對齊 PP 實機交互 | ✅ 前台 PRD §5 |
| D77 | **術語嚴格對齊 PRD**：禁用 `wager / wagered / wagering / WR / bet target / bet requirement`；統一用 `Bet`（動詞）+ `Turnover`（名詞）+ `Bet ₱X more to withdraw`（絕對金額） | 避免 Stake 等競品術語污染；維持 PRD 單一 source of truth | ✅ 全 prototype + glossary |
| D78 | `Rewards` / `Reward Center` 為**玩家文案**；`Gift Box Dropdown` / `Gift Box Panel` 為**內部代稱** | 避免與後台 `Promotion Event` 混淆 | ✅ 前台 PRD §0.4 + glossary |
| D79 | **KYC 未完成 scenario** 從 Demo Controls **刪除**（state.kycPassed 預設 true；Withdraw KYC blocker 邏輯保留給 RD V1 實作用） | Clement 偏好：demo 不重現此路徑；邏輯仍在程式碼 | ✅ `apps/player` |
| D80 | **Mobile-first 優化**：Header 壓縮右側（Balance compact + Deposit 黃 CTA + 🎁 + Avatar）；新增 **Hamburger Drawer**；頁面 grid 改為 `flex flex-col md:grid md:grid-cols-[140px_1fr]` | PH 玩家 80%+ 使用手機 | ✅ 全 app |
| D81 | **Monorepo 重組**：`apps/backoffice` + `apps/player` + `design-system/` + `docs/`；根 `render.yaml` 一 repo 部署兩 service；GitHub `clementinetseng/jackpot_combo`；Render 兩 service 已上線 | 前後台共享 design system + PRD | ✅ 已部署 |

### Session 7 重點總結（給新 session handoff 用）

1. **設計視覺 = 糖果紫**（PP 實機），非藍底也非深色
2. **術語嚴謹** = 只用 `Bet` + `Turnover`，禁 `wager/WR/bet target`
3. **UI 元件命名**：Gift Box Dropdown（internal）= Rewards（player-facing）= Reward Center（頁）
4. **三個共用原則**：一個進度條原則（D53）/ 空狀態規則（D59）/ Section 式擴充位（D60）
5. **前後台在同一 repo**，但 theme 拆：`brand.player`（紫）vs `brand.backoffice`（藍）

## Session 8（後台 Prototype P0 Bug 修 + Enable 驗證 — 2026-04-21）

| # | 決策 | 理由 | 執行狀態 |
|---|------|------|---------|
| D82 | **後台 Sidebar 縮減為 2 項**：僅保留 `Promotion Management` + `Reward History`；移除 Dashboard / Transactions / Players / Reports / Settings（未實作也非本專案 scope） | Prototype 要交給 RD，多餘入口造成誤會 | ✅ `apps/backoffice/index.html` |
| D83 | **Status Toggle bug 修復**：`<label><input type=checkbox>` 原生 click 會先翻 checkbox 再跑 onclick，導致取消彈窗後視覺漂移；解法 = label + input 雙重 `event.preventDefault()` + 每次 `togglePromoStatus` 結尾強制 `renderPromoTable()` 重繪 | 解決「enabled/disabled 共用彈窗」現象 | ✅ `apps/backoffice/index.html` |
| D84 | **Wizard 三模式對齊 PRD**：Page title 依 `wizardMode` 切 Create / Edit / View；View 隱藏 Save 按鈕、Step 4 Next 改 `Done`；Finish toast 文案改 `New promotion saved as Disabled. Enable it from the Promotion Management list.`（取代舊 `Promotion Published`） | PRD §Create Promotion 明訂 Wizard 只負責儲存內容；啟用回列表處理 | ✅ PRD 對齊 |
| D85 | **Step 3 Category Default 全 6 類必填**，Next 擋控 + 紅框 + Toast | PRD §Step 3 Contribution Rules Category Default = Yes（6 類寫死） | ✅ `validateStep3()` |
| D86 | **Deactivate Confirmation Modal 文案細節對齊 PRD**：impact #3 補 `and can still be completed`；Remark placeholder 加 `(Min 2 chars)`；Remark <2 字加 `input-error` 紅框 + 錯誤訊息 | PRD §Enabled → Disabled 二次確認 逐字對齊 | ✅ `deactivate-modal` |
| D87 | **Disabled → Enabled 必填欄位驗證**（PRD §操作規則 line 77）：不跳確認視窗；若有缺項 → Toast 列出缺項（`Step N · Field`）+ 500ms 後自動跳到**第一個缺項所在 step 的 Edit wizard**；無缺項直接切 Enabled。mock data 用 `_missing[]` 模擬兩種狀態（`Weekend Special` 完整、`New Player Welcome` 缺 3 項）| PRD 明訂「必須完成 Basic Setup / Condition / Reward & Turnover / Info / Announcement 必要欄位」；Step 1 Promotion Name 規則補一句「Save 可先存半成品，但 Enable 前必須完整」| ✅ `togglePromoStatus` |

### Session 8 重點總結

1. **後台 Prototype P0 bug 全修**（Sidebar 縮減 / Toggle 邏輯 / Category Default 擋 Next / 頁面正名 / Enable 必填驗證）
2. **Wizard 三模式對齊 PRD**（Create / Edit / View；Wizard 只儲存不啟用）
3. **已 deploy**：https://jackpot-backoffice-prototype.onrender.com/
4. **下一任務**（新 session）：把 D62~D81（前台）+ D82~D87（後台）**反向同步**寫回對應 PRD 章節，讓 RD 看單一 PRD 就完整
