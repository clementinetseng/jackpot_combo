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
| D60 | Gift Box / Reward Center 採 **Section 式分類**（參考 Rainbet pattern）：`Active Promotion` + `For You`（V1 核心）+ `Claim Now` / `VIP` / `Rakeback` / `Total Rewards`（V2 預留）；無資料 Section 整段隱藏，不留空列 | 保持 layout 擴充性，V2 加新類型活動時不用重排；Rainbet pattern 驗證過的 UX | ✅ 前台 PRD §3 / §4 | 2026/04 |
| D61 | Record 頁**僅新增 Promotion Tab**，Transaction / Game 由現有平台提供（不重複寫規格） | 避免 PRD 擴散；現有平台已有成熟實作 | ✅ 前台 PRD §5 | 2026/04 |
