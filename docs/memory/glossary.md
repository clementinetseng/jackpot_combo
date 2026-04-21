# Glossary — iGaming Turnover Engine

> 統一命名原則：兩層皆用「Turnover」體系，用前綴區分來源。
> - 存款層 → Deposit Turnover（存款流水）
> - 獎勵層 → Bonus Turnover（獎勵流水）

## 系統術語（中英對照）

### 存款流水（Deposit Turnover）
| 中文 | 英文欄位 | 前台顯示 | 定義 |
|------|---------|---------|------|
| 存款流水目標 | DepositTurnoverTarget | Deposit Turnover | 所有存款累加的流水目標總額 |
| 存款流水進度 | DepositTurnoverProgress | Turnover Progress | 自上次重置後累積的有效投注額 |
| 存款剩餘流水 | DepositTurnoverRemaining | Remaining Turnover | MAX(Target - Progress, 0) |
| 存款流水倍數 | DepositTurnoverMultiplier | — | 平台 config，預設 1x |
| 返場門檻 | ComebackThreshold | — | 平台 config，預設 ₱1 |

### 獎勵流水（Bonus Turnover）
| 中文 | 英文欄位 | 前台顯示 | 定義 |
|------|---------|---------|------|
| 活動設定 | Promotion Event | — | 後台建立的活動主檔 |
| 玩家活動實例 | Player Promotion Instance | — | 玩家參加後建立的獨立紀錄 |
| 本金金額 | Principal Amount | — | 獎勵流水計算用本金 |
| 紅利金額 | Bonus Amount | Bonus | 活動發放的 bonus |
| 獎勵流水目標 | BonusTurnoverTarget | Bonus Turnover | 建立時固定 |
| 獎勵流水進度 | BonusTurnoverProgress | Bonus Turnover Progress | 僅系統結算推進 |
| 獎勵流水倍數 | BonusTurnoverMultiplier | — | 後台活動設定 |
| 獎勵流水模型 | BonusTurnoverModel | — | A / B / C |
| 有效投注金額 | ValidTurnover | Valid Turnover | 通過 §6 全部條件的投注額 |

### 共用
| 中文 | 英文欄位 | 前台顯示 | 定義 |
|------|---------|---------|------|
| 餘額 | Total Balance | Total Balance | 玩家錢包總金額 |
| 可提款餘額 | Available Balance | Withdrawable | 兩層皆清 = Total Balance，否則 0 |
| 低餘額重置 | Bustout Reset | — | 餘額 < 門檻時清存款流水 + OOB 獎勵流水 |

## 活動狀態
| 後端 State | 中文說明 | 前台顯示 | Badge 色 |
|------|---------|---------|---------|
| PENDING | 排隊等待 FIFO 遞補 | Pending | Grey |
| ACTIVE | 進行中，投注推進獎勵流水 | Active | Primary Blue |
| COMPLETED | 獎勵流水達標（終態） | Completed 🎉 | Green |
| OUT_OF_BALANCE (OOB) | 餘額不足（終態），由 Bustout Reset 觸發 | Ended (low balance) | Yellow |
| CANCELLED | 營運手動取消（終態），餘額不動，Bonus 不自動扣回 | Cancelled | Orange |

## 獎勵流水計算模型
| 模型 | 公式 |
|------|------|
| A | (Principal + Bonus) × BonusTurnoverMultiplier |
| B | Principal × BonusTurnoverMultiplier |
| C | Bonus × BonusTurnoverMultiplier |

## 遊戲分類
SLOT / FISH / TABLE / ARCADE / EGAME / LIVE（共 6 類）

## 縮寫
| 縮寫 | 全稱 |
|------|------|
| OOB | OUT_OF_BALANCE |
| MA | Manual Adjustment |
| AML | Anti-Money Laundering |
| FIFO | First In First Out |
| PRD | Product Requirements Document |
| PH | Philippines |
