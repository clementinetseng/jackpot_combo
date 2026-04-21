# iGaming Turnover Engine — 專案詳情

## 核心架構

### 雙層共存
- **存款流水（Deposit Turnover / AML 層）**：每筆存款 × DepositTurnoverMultiplier(1x) = 存款流水債務。Config 設定，flat 貢獻度。
- **獎勵流水（Bonus Turnover）**：玩家勾選活動後建立實例，BonusTurnoverTarget 一次算定。三層覆寫貢獻度（Game ID > Provider > Category）。
- 同一筆有效投注同時餵兩層，各自貢獻度獨立計算。

### 低餘額重置（Bustout Reset）
- 條件：Balance < ComebackThreshold(₱1) AND 無未結算注單
- 時機：注單結算後 + 存款入帳前
- 效果：存款流水歸零 + 若有 ACTIVE 獎勵流水則 OUT_OF_BALANCE
- 合併了原本分開的 comeback 和 OOB 機制

### 歸零觸發（僅 2 個）
1. 低餘額重置 — 玩家沒錢了
2. 成功提款 — 週期結束，帳務整理

### CANCELLED（取代 CLOSED）
- 逐筆取消（ACTIVE 或 PENDING 皆可），不連帶影響其他獎勵流水
- 支援多選批次取消
- 取消 ACTIVE 後 FIFO 自動遞補下一筆 PENDING
- 餘額不動、Bonus 不自動扣回
- 營運手動處理後續（手動調整流水）
- 適用：活動設錯、玩家請求、營運調整
- 作弊場景：CANCELLED + 手動提款/調整

### 提款判斷（全部須通過）
存款流水已清 + 無 ACTIVE 獎勵流水 + KYC/AML/Risk

### 前台顯示
- 單一進度條策略：獎勵流水優先 > 存款流水 > 可提款
- 6 種狀態組合（A~F），見 §10.2
- V1 只做切換邏輯，過渡動畫留 V2

## 已確認的邊界規則
- 每筆存款永遠產生存款流水（不因促銷豁免）
- Bonus 入帳不產生存款流水
- 手動調整不產生存款流水
- 補單（成功）產生存款流水
- 後台手動提款不檢查流水，直接處理後歸零
- 手動調整流水已實作（僅調整 DepositTurnoverTarget，Progress 不動）
- BonusTurnoverProgress 僅系統推進，不可手動改
- P2P 等遊戲用 Game Code 排除清單
- 0% 貢獻度遊戲可進入但顯示警告
- PENDING 不可能在沒有 ACTIVE 時單獨存在
- 儲值 Min/Max 不符 → Submit Disable
- 提款條件不符 → Withdraw Disable

## V1.2 已完成項目
- [x] 低餘額重置統一機制（§4.5）
- [x] CANCELLED 取代 CLOSED（§7.1 狀態圖、§7.2 定義、§7.5 操作規則）
- [x] DepositTurnoverTarget 生命週期圖（§4.1）
- [x] 歸零觸發簡化為 2 個（§4.6）
- [x] 6 個計算範例（§9.1-9.6）
- [x] 38+ 項 QA checklist（§11）
- [x] 前台顯示規則 + 狀態×顯示矩陣（§10）

## Phase 計畫
1. ~~Phase 1-1: 統一流水引擎 PRD~~ → **V1.2 定案**
2. ~~Phase 2-1: 後台-活動設定管理 PRD~~ → **Clement reviewing**
3. ~~Phase 2-2: 後台-獎勵紀錄總表 PRD~~ → **定案**
4. Phase 3: Prototype 重製（需 Figma，前台合併促銷一起做）

## 多 Agent 治理
本專案後續分 PRD → Dev → QA 三階段，各由不同 Agent 執行。
詳見 `memory/governance/multi-agent-plan.md`
