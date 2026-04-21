# Memory

> **新 session 啟動：請先讀 `SESSION-HANDOFF.md`**（repo 根目錄），再讀本文件。

## 🚀 Live 部署

| 服務 | URL |
| --- | --- |
| GitHub Repo | https://github.com/clementinetseng/jackpot_combo |
| 後台 Prototype | https://jackpot-backoffice-prototype.onrender.com/ |
| 前台 Prototype | https://jackpot-player-prototype.onrender.com/ |

## Me
Clement (clementine.tseng@the-force.com.tw), PM at The Force. 負責 iGaming 平台的促銷活動系統與流水引擎設計。

## Project: iGaming Turnover Engine
| Item | Detail |
|------|--------|
| **目標** | 建立統一流水管理機制（AML 存款流水 + 獎勵流水） |
| **目標市場** | 菲律賓（PH） |
| **用戶** | 菲律賓玩家（前台英文為主） |
| **開發團隊** | 台灣人（PRD 用中文） |
| **後台** | 英文為主（內部營運人員） |

## 文件狀態
| 文件 | 狀態 | 路徑 | 說明 |
|------|------|------|------|
| 流水引擎 PRD | **定案 (V1.2)** | `docs/prds/流水引擎（Turnover Engine）PRD.md` | 核心引擎 PRD；§2.3/§2.4/§10.5/§10.7 已依 D39/D52/D58 補強 |
| 活動設定管理 PRD | **定案** | `docs/prds/活動設定管理 (Promotion Management) PRD.md` | 後台促銷活動設定 |
| 獎勵紀錄總表 PRD | **定案** | `docs/prds/後台-玩家獎勵紀錄總表 (Reward History) PRD.md` | 後台獎勵紀錄查詢+取消 |
| **前台-玩家端 PRD** | **V1.0 定案** (需反向同步 D62~D81) | `docs/prds/前台-玩家端 (Frontend) PRD.md` | 5 頁完整規格；Session 7 prototype 迭代 D62~D81 待寫回 PRD 對應章節 |
| PRD Cross Review Report | 完成 | `docs/prds/PRD_Cross_Review_Report.md` | 三份 PRD 交叉檢查報告 |
| PRD Review Report | 完成 | `docs/prds/PRD_Review_Report.md` | PRD 審查報告 |
| 多 Agent 治理規劃 | 完成 | `docs/memory/governance/multi-agent-plan.md` | 三階段 Agent 協作規範 |
| Figma Wireframe | **v2 完成** | Figma file `ZoALSuVUPFWs0veldFXDbX`（8 頁） | 後台全頁面線框圖 |
| 後台 Prototype (HTML) | **v2 完成 + 已部署** | `apps/backoffice/index.html` | 🐛 Clement 回報有 bug 待修（待細節）|
| **前台 Prototype (HTML)** | **v2 完成 + 已部署** | `apps/player/index.html` | 淡紫糖果主題 + 5 頁完整互動（6 情境 Demo Controls；含 Mobile Drawer）|
| 術語表 | 完成 | `docs/memory/glossary.md` | 中英對照術語；已對齊 D52/D58 狀態翻譯 |
| **Design Agent 工作備忘** | 完成 | `docs/memory/design-system.md` | Design token、金額格式、Clement 反饋（不進 PRD） |
| **Design System Tokens** | **新 (2026-04-21)** | `design-system/tokens/*.json` | colors / typography / spacing / radius |
| **Design System Components** | **新** | `design-system/components/*.md` | Button / Card / TurnoverStatus 規格 |
| **Shared Tailwind Config** | **新** | `design-system/styles/tailwind.config.js` | 兩 app 共用 theme |
| 決策紀錄 | 完成 | `docs/memory/context/decision-log.md` | D1~**D81** 所有架構決策（Session 1~7）|
| **Session Handoff** | **新** | `SESSION-HANDOFF.md` | 新 session 必讀；5 大原則 + 優先續辦 + 踩坑警告 |

## 已確認架構決策（摘要）
| # | 決策 | 備註 |
|---|------|------|
| 1 | 每筆存款永遠產生存款流水（V1.1 邏輯） | 不因參加促銷而豁免，AML 合規 + 開發簡潔 |
| 2 | 雙層共存，同一投注餵兩層 | 存款流水用 config flat 貢獻度，獎勵流水用三層覆寫 |
| 3 | Max Stake 機制已移除 | V1.2 起不再有單注上限 |
| 4 | CANCELLED 取代 CLOSED | Bonus 不自動扣回，營運手動處理 |
| 5 | 低餘額重置統一 comeback + OOB | 一個概念、一個門檻、注單結算+存款前兩時機 |
| 6 | 歸零觸發僅 2 個：低餘額重置 + 成功提款 | 手動調整流水為預留功能 |
| 7 | 返場門檻合併 OOB 門檻 | 單一參數 ComebackThreshold，預設 ₱1 |
| 8 | 存款貢獻度用 config 設定檔 | 非後台 UI，Category % 可調 + Game Code 排除清單 |
| 9 | 獎勵流水進度條優先於存款流水 | 前台永遠只顯示一個進度條 |
| 10 | 沒有後台手動存款 | 已從 PRD 移除 |
| 11 | 後台手動提款不檢查流水 | 直接處理，完成後歸零 |
| 12 | Bonus Turnover Progress 不可手動修改 | 僅系統結算推進 |
| 13 | 多錢包：引擎全錢包，促銷 V1 僅線上 | |
| 14 | 手動調整流水已實作 | 可用於 CANCELLED 後的流水調整 |
| 15 | 術語統一：Deposit Turnover / Bonus Turnover | 全面用 Turnover 體系 + 前綴區分，消除 WR/TR 混用 |
| 16 | CANCELLED 逐筆取消，不連帶 | 營運多選或逐筆 Cancel（ACTIVE/PENDING 皆可）。取消 ACTIVE 後 FIFO 自動遞補。不再連帶取消所有 PENDING |
| 17 | 活動觸發條件改為 Toggle + AND 組合 | V1 實作 C1~C5（當日第N筆存款、累計第N筆存款、當日累計存款、註冊天數限制、首存後時限）；V2 預留 C6~C8（沉睡回歸、連續存款、當日淨虧損）。取代舊 Deposit Count Condition |
| 18 | **前台「一個進度條」原則 + 共用 `<TurnoverStatus>` 元件** | Bonus Turnover > Deposit Turnover > Withdrawable 優先序；Deposit/Withdraw/Reward Center/Gift Box/Wallet 5 處同源，RD 不得各自實作 (D53) |
| 19 | **Deposit 頁只列 Eligible 活動，`No Promotion` 置頂預設選中** | Ineligible 活動不顯示；`No Promotion` 卡為第一選項 (D38/D46) |
| 20 | **所有 Turnover 文案改為絕對金額** | `Bet ₱45,000 to withdraw`（非 30x 倍數字串）；Info Box/Summary/阻擋卡/Progress 副標全面絕對化 (D42/D48) |
| 21 | **Withdraw 頁阻擋狀態主 CTA 轉向** | KYC 未完成→`Start KYC`；存款流水/ACTIVE→`Play Now`；Withdraw 按鈕改灰 Locked (D45/D49) |
| 22 | **🎁 Gift Box 未讀 Badge 4 觸發事件** | 新活動上架 / Bonus 入帳 / ACTIVE 結束 / 活動 <48h 到期；打開 Dropdown 即清零 (D40) |
| 23 | **玩家友善狀態翻譯** | PENDING=Pending / ACTIVE=Active / COMPLETED=Completed 🎉 / OUT_OF_BALANCE=Ended (low balance) / CANCELLED=Cancelled (D52) |
| 24 | **遊戲入口警告顯示位置明定** | 遊戲卡角標 `0%` + 啟動前 Interstitial Modal + Session 級別 `Don't show again` (D39) |
| 25 | **空狀態 / Help 入口統一** | 禁止空白區域（emoji + 一行 + CTA）；Footer 放 FAQ + Contact Support；每活動卡自帶 `View T&C` (D54/D55/D59) |
| 26 | **Gift Box / Reward Center 採 Section 式分類（參考 Rainbet）** | V1：`Active Promotion` + `For You`；V2 預留位：`Claim Now` / `VIP` / `Rakeback` / `Total Rewards`；無資料 Section 整段隱藏 (D60) |
| 27 | **Record 頁僅新增 Promotion Tab** | Transaction / Game 由現有平台提供；本 PRD 不重複寫規格 (D61) |
| 28 | **設計主題 = 糖果紫**（PP 實機）| 淡紫漸層背景 + 白卡 + 藍紫漸層 CTA + 黃 `#FFC107` Balance；非藍非深色 (D62) |
| 29 | **Deposit 沿用 PP 骨架** + 插入促銷模組 | Payment → Choose your bonus → Amount → Summary → Submit (D63) |
| 30 | **選擇促銷用 Dropdown（radio list）** | 取代 card grid；Label 用 `Choose your bonus`（D65/D66） |
| 31 | **所有 Reward 活動卡 CTA = `Claim Now`** | 取代 `Deposit to Join`；對齊 Rainbet (D67) |
| 32 | **Withdraw 阻擋時整個 form 灰掉** + **移除 Available Balance ⓘ** | Blocker Card 負責完整解釋；下方 form `opacity-50 pointer-events-none` (D69/D70) |
| 33 | **Learn more Modal = intro + Progress + FAQ accordion** | 減少客訴；PH 玩家自助查 (D71) |
| 34 | **Gift Box 三狀態互斥** + 不顯示 Pending 詳情 | 可提款狀態 row 不顯示；Pending 改一行 `+ N more pending` (D72/D73) |
| 35 | **OOB Welcome banner 移除** | 走正常流程；Demo KYC scenario 也刪除 (D74/D79) |
| 36 | **Record 卡 Status 放前** + 左側彩色 border | Bonus 金額移右小字；Mobile Filter Popover 仿 PP 圖 (D75/D76) |
| 37 | **術語嚴格對齊 PRD** | 禁 `wager/WR/bet target`；用 `Bet`/`Turnover`；`Bet ₱X more to withdraw` (D77) |
| 38 | **UI 命名分層** | Player 看 `Rewards`/`Reward Center`；內部用 `Gift Box` (D78) |
| 39 | **Mobile-first + Hamburger Drawer** | Header 壓縮；`grid-cols` 改 responsive (D80) |
| 40 | **Monorepo 重組 + 雙 service 部署** | `apps/`+`design-system/`+`docs/`；Render 一 repo 部署兩 service (D81) |
| 41 | **後台 Sidebar 縮減為 2 項** | 僅 `Promotion Management` + `Reward History`；移除未實作入口 (D82) |
| 42 | **Status Toggle bug 修復** | `<label><input>` 原生 click 衝突解法：preventDefault + 強制 re-render (D83) |
| 43 | **Wizard Create/Edit/View 三模式對齊 PRD** | View 隱藏 Save + `Done` 結束；Finish 文案改「saved as Disabled」(D84) |
| 44 | **Step 3 Category Default 全 6 類必填 + 擋 Next** | Contribution Rate 空白擋 Next + 紅框 Toast (D85) |
| 45 | **Deactivate Modal 文案逐字對齊 PRD** | impact #3 補「and can still be completed」；Remark「Min 2 chars」(D86) |
| 46 | **Disabled → Enabled 必填欄位驗證**（PRD L77）| 不跳確認；缺項 → Toast + 跳第一個缺項 step Edit wizard；齊則直接切 (D87) |

> **完整決策紀錄（D1~D87）見** `docs/memory/context/decision-log.md`

## 進度
| Phase | 內容 | 狀態 | 備註 |
|-------|------|------|------|
| 1-1 | 統一流水引擎 PRD | ✅ **V1.2 定案** | 核心引擎規格 |
| 2-1 | 後台-活動設定管理 PRD | ✅ **定案** | Wizard 4 步驟 |
| 2-2 | 後台-獎勵紀錄總表 PRD | ✅ **定案** | List + Drawer + Cancel Modal |
| 3-1 | Figma Wireframe（後台） | ✅ **v2 完成** | 8 頁：Promotion 4 頁 + Reward History 2 頁 + Modals 1 頁 + List 1 頁 |
| 3-2 | HTML Prototype（後台） | ✅ **v3 完成** | Session 8 完成 P0 bug 修復 + Enable 必填驗證；已 deploy |
| 3-3 | 前台 PRD（Design Agent） | ✅ **V1.0 定案**（需反向同步 D62~D81）| `前台-玩家端 (Frontend) PRD.md` 五章完成；Session 7 Prototype 迭代決策待寫回 PRD |
| 3-4 | 前台 HTML Prototype | ✅ **v2 完成 + 已部署** | 糖果紫主題 + 5 頁完整互動 |
| **3-5** | **PRD 反向同步（D62~D87）** | ⏳ **下一步（新 session）** | 前台 PRD 補 D62~D81；後台 Promotion Management PRD 補 D82~D87 |
| 4 | 交付 RD | ⏳ 待 PRD 反向同步完成 | PRD + 後台/前台 Prototype 全部交給工程師照著實作 |

## Prototype 完成狀態（v2）

後台 Prototype 為單一 HTML 檔（`prototype/index.html`），包含完整設計系統（Design Tokens）+ 所有互動功能。

### 已實作頁面
| 頁面 | 功能 |
|------|------|
| Promotion List | 表格、Status Toggle（Enable/Disable + 確認彈窗）、Action Icons（View/Duplicate/Edit）、Duplicate 實際複製一筆 |
| Wizard Step 1 - Basic Setup | Promotion Name/Type/Period、Custom Period 切換 End Time 啟用、Max Claims/Cost |
| Wizard Step 2 - Condition | Trigger Conditions（Toggle + AND 組合 C1~C5）、Player Scope（All/Include/Exclude/AB Test + 動態 textarea）|
| Wizard Step 3 - Reward & Turnover | Bonus Value Type 切換（Fixed/Percentage + 連動必填）、Turnover Model/Multiplier + 公式即時預覽、Contribution Rules 三個 Tab（Category Default / Provider Override 下拉選單 / Game Override 填 Code）|
| Wizard Step 4 - Info / Announcement | Promotion Display（Tag/Icon/Title/Subtext/InfoBox/T&C）即時同步 Activity Card Preview |
| Reward History List | 表格 + 勾選 + Batch Cancel、Promotion ID 可跳轉、Action Icons |
| Reward Detail Drawer | §5.1 Basic Info + §5.2 Bonus Turnover（含進度條）+ §5.3 Cancel Record + §5.4 Cancel 按鈕 |
| Modals | Cancel Confirmation（Reason 下拉 + Remark ≥2字驗證）、Deactivate Confirmation、Unsaved Changes |

### 互動功能清單
| 功能 | 說明 |
|------|------|
| Wizard 導航 | 4 步驟 Stepper + Next/Back/Save/Finish |
| Save | Toast 通知「Saved Successfully」 |
| Finish（Step 4） | Toast 通知「Promotion Published」+ 自動回列表 |
| Cancel（View mode）| 直接回列表，不跳彈窗 |
| Cancel（Edit/Create mode）| 跳 Unsaved Changes 彈窗 |
| Status Toggle | Enable → 直接切換；Disable → 跳確認彈窗 + 確認後才改狀態 |
| Duplicate | 實際複製一筆 row（Disabled 狀態） |
| Batch Cancel | 勾選 → 計數器 → 批量取消 Modal |
| Cancel Reward | 驗證 Reason（必選）+ Remark（≥2字）→ Toast |
| Drawer | 點 Reward ID 開啟右側 Drawer，overlay 點擊關閉 |
| Promotion ID 跳轉 | Reward History 的 Promotion ID 可點擊跳轉到 Promotions 頁 |

### 部署資訊
| Item | Detail |
|------|--------|
| 部署平台 | Render（靜態站點） |
| 設定檔 | `prototype/render.yaml` + `prototype/package.json` |
| 啟動指令 | `npx serve -s . -l $PORT` |
| 部署方式 | 推到 GitHub → Render 自動建置 |

## 專案階段（修正版）

本專案的產出是 **PRD + 後台/前台 Prototype**，交付給 RD 團隊照著實作。Agent 不負責寫後端程式碼。

```
PRD 撰寫 → 後台 Prototype → 前台設計 → 交付 RD
  ✅ 完成     ✅ v2 完成      ⏳ 下一步     ⏳ 待前台完成
```

| 階段 | 內容 | 狀態 | 說明 |
|------|------|------|------|
| PRD 撰寫 | 三份 PRD + 架構決策 D1~D36 | ✅ **完成** | 流水引擎 + 活動設定管理 + 獎勵紀錄總表 |
| 後台 Prototype | HTML 可互動 Prototype | ✅ **v2 完成** | Wizard 4 步、Reward History、Drawer、Modal 全互動 |
| 前台設計 | 基於現有平台風格，加入促銷相關頁面 | ⏳ **下一步** | 需要 Clement 提供現有平台截圖/Figma，由 Design Agent 執行 |
| 交付 RD | PRD + 後台/前台 Prototype 交給工程師 | ⏳ 待前台完成 | RD 照 PRD 規格 + Prototype 畫面實作 |

### 前台設計待辦（Design Agent 下一步）
- **輸入**：Clement 提供的現有平台設計素材（截圖/Figma/URL）
- **任務**：基於現有平台的設計語言，設計「儲值促銷」相關前台畫面
- **預期產出頁面**（依 PRD 規格）：
  - 活動列表頁（玩家看到的促銷活動清單）
  - 活動詳情頁（T&C、參加條件）
  - 儲值頁引導（Info Box 提示促銷）
  - 流水進度條（Deposit Turnover / Bonus Turnover 進度顯示）
  - 前台通知（促銷到期、流水完成等）
- **設計原則**：
  - 風格必須延續現有平台的設計語言
  - 前台用語為英文，面向菲律賓玩家（口語化）
  - 術語依 `memory/glossary.md` 統一

### 必讀文件（新 session 啟動用）
| 優先序 | 文件 | 說明 |
|--------|------|------|
| 1 | `CLAUDE.md`（本文件） | 專案脈絡、架構決策、進度 |
| 2 | `memory/context/decision-log.md` | D1~D36 完整決策紀錄及理由 |
| 3 | `memory/glossary.md` | 中英術語對照 |
| 4 | `流水引擎（Turnover Engine）PRD.md` | 核心引擎規格（前台相關章節） |
| 5 | `活動設定管理 (Promotion Management) PRD.md` | 後台促銷管理（了解活動結構） |
| 6 | `後台-玩家獎勵紀錄總表 (Reward History) PRD.md` | 後台獎勵紀錄 |
| 7 | `prototype/index.html` | 後台 Prototype（參考設計語言） |

## Memory 目錄結構
```
memory/
├── glossary.md                    # 術語對照表（PRD Agent 維護）
├── context/
│   └── decision-log.md            # D1~D36 所有決策紀錄
├── projects/
│   └── turnover-engine.md         # 專案詳情
└── governance/
    ├── multi-agent-plan.md        # 多 Agent 治理規劃
    ├── escalation-log.md          # 待建 — 跨 Agent 問題升級紀錄
    ├── dev-progress.md            # 待建 — Dev 完成進度追蹤
    └── qa-results.md              # 待建 — QA 測試結果
```

## Clement 偏好
- 表格 > 大量文字
- Mermaid 圖表盡量用
- 待決議的問題先討論，不要直接改
- RD 很懶得讀文字
- 前台用語要菲律賓玩家友善（英文口語）
- 用語不要太多簡稱（如 OOB、MA），中文描述優先
