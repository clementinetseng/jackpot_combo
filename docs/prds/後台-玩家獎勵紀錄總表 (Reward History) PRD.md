# 後台-玩家獎勵紀錄總表 (Reward History) PRD

## 版本紀錄

| 版本 | 日期 | 變更摘要 |
| --- | --- | --- |
| V1.0 | 2026-04-17 | 新增VIP專屬欄位 : cashback percentage |

---

## 1. 頁面目的

提供營運 / 客服 / QA 統一查詢玩家所有獎勵紀錄，包含：

- 有獎勵流水的獎勵
- 無獎勵流水的直接發獎
- 需玩家手動領取的獎勵
- 未來 VIP / Cashback / Rebate / Manual Grant 等其他獎勵類型

本頁同時作為：

- 全部獎勵查詢入口
- 個別玩家的獎勵紀錄
- 獎勵流水 `ACTIVE` / `PENDING` 紀錄的取消入口（支援多選批次）

---

## 2. 主表欄位定義

| 欄位名稱 | 中文 | 顯示規則 |
| --- | --- | --- |
| Checkbox | 多選 | 僅獎勵流水狀態為 `ACTIVE` 或 `PENDING` 的紀錄可勾選；終態紀錄禁用 |
| Reward ID | 獎勵紀錄 ID | 唯一識別碼 |
| Promotion ID | 活動設定 ID | 若來自活動設定則顯示，可點擊跳轉活動設定頁；否則為 `-` |
| Player ID | 玩家 ID | 玩家唯一識別碼 |
| Username | 玩家名稱 | 玩家Full name |
| Reward Type | 獎勵類型 | 見下方 §2.1 |
| Reward Status | 獎勵狀態 | 見下方 §2.2 |
| Bonus Turnover Status | 獎勵流水狀態 | 有獎勵流水時顯示狀態值（見 §2.3）；無獎勵流水顯示 `-` |
| Reward Amount | 獎勵金額 | 實際獎勵金額 |
| Bonus Turnover Progress / Target | 獎勵流水進度 | 有獎勵流水時顯示，格式如 `₱10,000 / ₱60,000`；無則顯示 `-` |
| Granted At | 發放時間 | `YYYY-MM-DD HH:mm:ss` |
| Ended At | 結束時間 | 進入終態的時間（`COMPLETED / OUT_OF_BALANCE / CANCELLED / EXPIRED / REVOKED`）；未結束顯示 `-` |
| Actions | 操作 | `View`（永遠顯示）/ `Cancel`（符合 §4.2 條件時顯示） |

> **預設排序**：`Granted At DESC`
> 

### 2.1 Reward Type 選項

V1 先支援以下類型，後續持續新增：

`Deposit Bonus` / `KYC Bonus` / `VIP Daily` / `VIP LevelUp` / `VIP Weekly` / `VIP Monthly` / `VIP Birthday` / `Cashback` / `Rebate`

### 2.2 Reward Status 狀態定義

| 狀態 | 說明 |
| --- | --- |
| CLAIMABLE | 玩家已符合條件，但尚未手動領取 / 尚未入帳 |
| GRANTED | 獎勵已發放 / 已入帳 |
| EXPIRED | 獎勵未領取或未使用即失效 |
| REVOKED | 獎勵被撤銷 / 作廢 |

### 2.3 Bonus Turnover Status 狀態定義

| 狀態 | 說明 |
| --- | --- |
| PENDING | 已建立，排隊等待遞補為 ACTIVE |
| ACTIVE | 正在累積獎勵流水 |
| COMPLETED | 獎勵流水已達標完成 |
| OUT_OF_BALANCE | 因低餘額重置自然結束 |
| CANCELLED | 被後台強制取消 |

---

## 3. 搜尋與 Filter

### 3.1 Search

頁面上方提供兩個搜尋元件：

| 欄位 | 類型 | 規則 |
| --- | --- | --- |
| Search Field | Dropdown | 先選搜尋欄位 |
| Search Text | Text Input | 再輸入文字進行模糊比對 |

**Search Field 選項**：`reward_id` / `player_id` / `username` / `promotion_id`

### 3.2 Filters

| Filter 名稱 | 類型 | 規則 |
| --- | --- | --- |
| Reward Type | Multi-select | 可多選 |
| Reward Status | Multi-select | 可多選 |
| Bonus Turnover Status | Multi-select | 可多選；選項：`PENDING / ACTIVE / COMPLETED / OUT_OF_BALANCE / CANCELLED` |
| Granted At | Date Range | 日期範圍 |

---

## 4. Actions

### 4.1 View

所有獎勵紀錄都必須有 `View`。

- 點擊後開啟 **Reward Detail Drawer**（見 §5）
- Drawer 資料可 lazy load

---

### 4.2 Cancel

### 顯示條件

單筆 Cancel 按鈕在每一列顯示，須同時符合：

1. 有獎勵流水
2. `Bonus Turnover Status = ACTIVE` 或 `PENDING`

### 不顯示 Cancel 的情況

- 無獎勵流水
- CLAIMABLE 但尚未領取
- Bonus Turnover Status 為終態（COMPLETED / OUT_OF_BALANCE / CANCELLED）

### 多選批次取消

主表支援 checkbox 多選，選取多筆後點擊上方 `Batch Cancel` 按鈕執行批次取消。僅符合上述顯示條件的紀錄可被勾選，終態紀錄 checkbox 禁用。

---

### 4.3 Cancel 操作規則

### 用途

逐筆（或批次多選）強制取消 `ACTIVE` 或 `PENDING` 的獎勵流水。每筆獨立處理，不連帶影響同一玩家的其他獎勵流水。

### 二次確認

點擊 `Cancel`（單筆）或 `Batch Cancel`（多選）後，必須開啟確認彈窗。

### 必填欄位

- Cancel Reason
- Remark（min. 2 chars）

### 警示文案

**單筆取消 ACTIVE：**

> This action will:
- Cancel this ACTIVE bonus turnover → CANCELLED
- Player balance remains unchanged — adjust manually if needed
- Next PENDING bonus turnover (if any) will auto-activate per FIFO queue
> 

**單筆取消 PENDING：**

> This action will:
- Cancel this PENDING bonus turnover → CANCELLED
- Remove it from the FIFO queue
> 

**批次取消（多選）：**

> This action will cancel the following {N} selected reward(s):
- {列出選取的 Reward ID + 當前狀態}
- Player balance remains unchanged — adjust manually if needed
- If an ACTIVE item is included, the next PENDING will auto-activate per FIFO queue
> 

### Confirm 後系統行為

針對每一筆被取消的紀錄：

1. 將該筆獎勵流水狀態切為 `CANCELLED`
2. 若被取消的是 `ACTIVE`，引擎依 FIFO 佇列自動將下一筆 `PENDING` 遞補為 `ACTIVE`
3. 玩家餘額維持不變（Bonus / 本金不自動扣回，營運視情況手動調整）
4. 記錄：
    - cancel_reason（Dropdown 選項，見下方）
    - remark
    - operator
    - action_time
5. Audit Log 記錄操作前狀態：
    - 操作前 Total Balance
    - 被取消實例的操作前狀態（ACTIVE / PENDING）
    - 被取消實例的 BonusTurnoverProgress

### Cancel Reason Dropdown 選項

| 選項值 | 說明 |
| --- | --- |
| Promotion Misconfigured | 活動設定錯誤 |
| Player Request | 玩家主動要求取消 |
| Operational Adjustment | 營運調整 |
| Fraud / Abuse | 作弊 / 濫用 |
| Other | 其他（搭配 Remark 說明） |

---

## 5. Reward Detail Drawer

提供單筆獎勵紀錄的完整資訊，點 `View` 才載入。依內容分為三個區塊，條件式顯示。

### 5.1 基本資訊（永遠顯示）

| 欄位名稱 | 中文 | 值 / 定義 |
| --- | --- | --- |
| Reward ID | 獎勵紀錄 ID | 唯一識別碼 |
| Promotion ID | 活動設定 ID | 若來自活動設定，顯示 ID 並可點擊跳轉；否則為 `-` |
| Player ID | 玩家 ID | — |
| Reward Type | 獎勵類型 | 同 §2.1 |
| Reward Name | 獎勵名稱 | 活動名稱或獎勵名稱；若為系統自動獎勵且無獨立名稱，顯示 `-` |
| Grant Method | 發放方式 | `Auto-Credited`（達成條件自動入帳）/ `Claimable`（玩家須手動領取）/ `Manual Grant`（後台手動派獎，暫無此功能） |
| Reward Status | 獎勵狀態 | 同 §2.2 |
| Reward Amount | 獎勵金額 | 實際獎勵金額 |
| Cashback Percantage | Cashback比例 | 僅VIP的反水獎勵適用，不同VIP會有不同的比例 (比例在VIP後台設定)，若非此type則顯示 `-` |
| Granted At | 發放時間 | `Auto-Credited` 為實際入帳時間；`Claimable` 為發放時間 |
| Ended At | 結束時間 | 進入終態的時間；未結束顯示 `-` |

### 5.2 獎勵流水（僅有獎勵流水時顯示此區塊）

| 欄位名稱 | 中文 | 值 / 定義 |
| --- | --- | --- |
| Bonus Turnover Status | 獎勵流水狀態 | 同 §2.3 |
| Bonus Turnover Model | 獎勵流水模型 | `Principal + Bonus (A)` / `Principal (B)` / `Bonus (C)` |
| Bonus Turnover Multiplier | 獎勵流水倍數 | 例如 `30x` |
| Principal Amount | 本金金額 | 與此獎勵關聯的本金 |
| Bonus Amount | 紅利金額 | 與此獎勵關聯的 Bonus 金額 |
| Bonus Turnover Target | 獎勵流水目標 | 需完成的總流水要求 |
| Bonus Turnover Progress | 獎勵流水進度 | 目前已累積的有效流水 |
| Bonus Turnover Remaining | 剩餘獎勵流水 | `Target - Progress`，最小值為 0 |
| Exclude From Rebate Calculation | 排除反水計算 | `Yes / No`；`Yes` 表示此獎勵 ACTIVE 期間的流水不納入返水、返利等模組計算 |

### 5.3 取消紀錄（僅 CANCELLED 時顯示此區塊）

| 欄位名稱 | 中文 | 值 / 定義 |
| --- | --- | --- |
| Cancel Reason | 取消原因 | Dropdown 選項值 |
| Remark | 備註 | 營運輸入的備註文字 |
| Operator | 操作人 | 執行取消的後台操作人 |
| Cancelled At | 取消時間 | 執行取消的時間 `YYYY-MM-DD HH:mm:ss` |

### 5.4 Drawer 操作

| 操作 | 顯示條件 | 說明 |
| --- | --- | --- |
| Cancel | 有獎勵流水且 `Bonus Turnover Status = ACTIVE` 或 `PENDING` | 開啟二次確認彈窗，執行逐筆取消（同 §4.3） |

---

## 6. 匯出

- **按鈕**：`Export CSV`
- **匯出範圍**：當前 filter 結果
- **匯出內容**：主表欄位 + Drawer 全部欄位