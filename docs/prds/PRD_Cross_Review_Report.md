# PRD 交叉比對 Review Report

**比對日期：** 2026-04-17
**比對文件：**

| 代號 | 文件 | 狀態 |
|------|------|------|
| **E** | 統一流水引擎 PRD V1.2 | 定案 |
| **P** | 活動設定管理（Promotion Management） | Clement reviewing |
| **R** | 玩家獎勵紀錄總表（Reward History） | 定案 |

---

## 1. 術語一致性

三份 PRD 術語是否完全對齊 V1.2 統一用語。

| 檢查項 | E 引擎 | P 活動設定 | R 紀錄總表 | 結果 |
|--------|--------|-----------|-----------|------|
| 存款流水 = Deposit Turnover | ✅ | N/A（不涉及） | N/A（不涉及） | ✅ |
| 獎勵流水 = Bonus Turnover | ✅ | ✅ | ✅ | ✅ |
| 獎勵流水模型 = Bonus Turnover Model (A/B/C) | ✅ §5.6 | ✅ Step 3 | ✅ §5.2 Drawer | ✅ |
| 獎勵流水倍數 = Bonus Turnover Multiplier | ✅ §5.2 | ✅ Step 3 | ✅ §5.2 Drawer | ✅ |
| CANCELLED（非 CLOSED） | ✅ 全文 | ✅ Notice | ✅ §2.3 / §4 | ✅ |
| 低餘額重置（非 OOB / Bustout） | ✅ §4.5 | N/A | ✅ §2.3 | ✅ |
| WR / TR 殘留 | 無 | 無 | 無 | ✅ |

**結論：術語完全一致，無殘留問題。**

---

## 2. 狀態定義一致性

### 2.1 Bonus Turnover Status（獎勵流水狀態）

| 狀態 | E 引擎 §7.2 | R 紀錄總表 §2.3 | 一致？ |
|------|-------------|----------------|--------|
| PENDING | 排隊等待遞補 | 已建立，排隊等待遞補為 ACTIVE | ✅ |
| ACTIVE | 進行中，投注推進獎勵流水 | 正在累積獎勵流水 | ✅ |
| COMPLETED | 獎勵流水達標完成 | 獎勵流水已達標完成 | ✅ |
| OUT_OF_BALANCE | 低餘額重置觸發 | 因低餘額重置自然結束 | ✅ |
| CANCELLED | 營運手動取消 | 被後台強制取消 | ✅ |

### 2.2 Reward Status（獎勵狀態）

| 狀態 | R 紀錄總表 §2.2 | E 引擎 | 備註 |
|------|-----------------|--------|------|
| CLAIMABLE | ✅ | 未定義 | 引擎不管獎勵發放狀態，合理 |
| GRANTED | ✅ | 未定義 | 同上 |
| EXPIRED | ✅ | 未定義 | 同上 |
| REVOKED | ✅ | 未定義 | 同上 |

**結論：狀態定義一致。Reward Status 屬後台展示層，引擎不涉及，分工正確。**

---

## 3. CANCELLED 行為一致性（D27 + D33）

| 檢查項 | E 引擎 §7.5 | R 紀錄總表 §4.3 | 一致？ |
|--------|-------------|-----------------|--------|
| 可取消 ACTIVE | ✅ | ✅ | ✅ |
| 可取消 PENDING | ✅ | ✅ | ✅ |
| 逐筆獨立，不連帶 | ✅ | ✅ | ✅ |
| 支援多選批次 | ✅ | ✅（Batch Cancel） | ✅ |
| 取消 ACTIVE 後 FIFO 遞補 | ✅ §7.3 | ✅ 警示文案 + 系統行為 | ✅ |
| 餘額不動 | ✅ | ✅ | ✅ |
| Bonus 不自動扣回 | ✅ | ✅ | ✅ |
| DB Transaction 回滾 | ✅ | 未提及 | ⚠️ 見 F-1 |
| Audit Log 記錄 | ✅（操作前狀態） | 未提及 | ⚠️ 見 F-2 |

---

## 4. 活動設定欄位 vs 引擎欄位對照

活動設定管理 Step 3 設定的欄位，是否與引擎計算所需欄位完全對應。

| P 活動設定 Step 3 欄位 | E 引擎對應欄位 | 引擎使用位置 | 一致？ |
|------------------------|---------------|-------------|--------|
| Bonus Value Type（Fixed/Percentage） | — | 引擎不關心計算方式，只接 Bonus Amount | ✅ 合理分工 |
| Bonus Amount / Bonus Percentage / Bonus Cap | → Bonus Amount（算完後寫入） | §5.2 Instance | ✅ |
| Bonus Turnover Model (A/B/C) | BonusTurnoverModel | §5.6 公式選擇 | ✅ |
| Bonus Turnover Multiplier | BonusTurnoverMultiplier | §5.6 計算 Target | ✅ |
| Exclude From Rebate Calculation | Exclude From Rebate | §5.2 Instance | ✅ |
| Category Default (6 類) | §5.8 Category Default | §5.8 三層覆寫 | ✅ |
| Provider Override | §5.8 Provider Override | §5.8 三層覆寫 | ✅ |
| Game Override | §5.8 Game ID Override | §5.8 三層覆寫 | ✅ |
| Contribution Rate 0%-100% | §5.8 貢獻度 | §5.7 推進公式 | ✅ |
| Min Deposit | §5.3 資格檢查 | `Min Deposit <= 金額` | ✅ |
| Max Deposit | §5.3 資格檢查 | `金額 <= Max Deposit` | ✅ |
| Max Claims Per User | §5.3 資格檢查 | 領取次數未達上限 | ✅ |
| Player Scope | §5.3 資格檢查 | All/Include/Exclude/AB Test | ✅ |
| Eligible Payment Methods | §5.3 資格檢查 | 支付方式篩選 | ✅ |

**結論：活動設定欄位與引擎所需欄位完全對應，無遺漏。**

---

## 5. 獎勵紀錄 Drawer vs 引擎 Instance 欄位對照

紀錄總表 Drawer 展示的欄位，是否能從引擎的 Player Promotion Instance 取得。

| R Drawer 欄位 | E 引擎 Instance §5.2 | 可取得？ |
|---------------|----------------------|---------|
| Bonus Turnover Status | Current State | ✅ |
| Bonus Turnover Model | BonusTurnoverModel | ✅ |
| Bonus Turnover Multiplier | BonusTurnoverMultiplier | ✅ |
| Principal Amount | Principal Amount | ✅ |
| Bonus Amount | Bonus Amount | ✅ |
| Bonus Turnover Target | BonusTurnoverTarget | ✅ |
| Bonus Turnover Progress | BonusTurnoverProgress | ✅ |
| Bonus Turnover Remaining | 計算值 Target - Progress | ✅ |
| Exclude From Rebate | Exclude From Rebate | ✅ |
| Cancel Reason | Remark / 操作紀錄 | ✅ |
| Operator | Remark / 操作紀錄 | ✅ |
| Cancelled At | 操作紀錄 action_time | ✅ |

**結論：Drawer 欄位皆可從 Instance 資料取得，無需額外資料來源。**

---

## 6. 貢獻度三層覆寫一致性

| 檢查項 | E 引擎 §5.8 | P 活動設定 Step 3 | 一致？ |
|--------|-------------|-------------------|--------|
| 優先度 1（最高）= Game ID | ✅ | ✅（覆寫優先度：最高） | ✅ |
| 優先度 2 = Provider | ✅ | ✅（覆寫優先度：中） | ✅ |
| 優先度 3（最低）= Category Default | ✅ | ✅（覆寫優先度：最低） | ✅ |
| Category 固定 6 類 | SLOT/FISH/TABLE/ARCADE/EGAME/LIVE | 同 | ✅ |
| Category Default 必填 | ✅ | ✅ | ✅ |
| Provider/Game 不可重複 | 未明確寫，但邏輯隱含 | ✅ 明確寫 | ✅ |

---

## 7. 跨頁面導航一致性

| 導航路徑 | 來源 | 目標 | 機制 | 一致？ |
|----------|------|------|------|--------|
| 獎勵紀錄 → 活動設定 | R 主表 Promotion ID | P 活動設定 View | 可點擊跳轉 | ✅ |
| 獎勵紀錄 Drawer → 活動設定 | R §5.1 Promotion ID | P 活動設定 View | 可點擊跳轉 | ✅ |
| 活動設定 → 獎勵紀錄 | P Disabled 確認 Notice | R 頁面 | 文案引導 | ✅ |

---

## 8. 發現的問題（Findings）

### 嚴重度定義

| 等級 | 意義 |
|------|------|
| 🔴 Critical | 三份 PRD 之間有邏輯衝突，會影響開發 |
| 🟡 Warning | 某份 PRD 缺少另一份提到的資訊，RD 可能會問 |
| 🔵 Suggestion | 可優化但不影響開發 |

### Findings 清單

| # | 等級 | 文件 | 問題 | 建議 | 狀態 |
|---|------|------|------|------|------|
| **F-1** | 🟡 | R 紀錄總表 §4.3 | Cancel 系統行為未提及 **DB Transaction 回滾**機制 | 在 §4.3 加上 DB Transaction 說明 | ✅ 已修復 |
| **F-2** | 🟡 | R 紀錄總表 §4.3 | Cancel 記錄未提及 **Audit Log 需記錄操作前狀態** | 在 §4.3 記錄項下補上 Audit Log 需求 | ✅ 已修復 |
| **F-3** | 🟡 | R 紀錄總表 §4.3 | Cancel Reason 格式不一致（free text vs Dropdown） | 統一為 Dropdown 選項 + Remark，並定義 5 個選項 | ✅ 已修復 |
| **F-4** | 🔵 | P 活動設定 | 缺少版本紀錄區塊 | 加上版本紀錄 | ✅ 已修復 |
| **F-5** | 🔵 | R 紀錄總表 | 缺少版本紀錄區塊 | 加上版本紀錄 | ✅ 已修復 |
| **F-6** | 🔵 | P 活動設定 | Bonus Turnover Model 下拉選單顯示值未明確定義 | 補上 Model A/B/C 顯示格式表 | ✅ 已修復 |
| **F-7** | 🔵 | E 引擎 §5.3 | 資格檢查提到 `Eligible Payment Methods`「若有限制」，但 P 活動設定 Step 2 寫「目前只有一種支付」 | 無衝突，僅確認 V1 暫不實作支付方式篩選邏輯 |
| **F-8** | 🔵 | R 紀錄總表 | 匯出 CSV（§6）未定義匯出檔案的時間格式、編碼（UTF-8 BOM？）、欄位分隔符 | 可後續補充，不影響核心功能 |

---

## 9. 總結

| 維度 | 結果 |
|------|------|
| 術語一致性 | ✅ 三份完全對齊，無 WR/TR/CLOSED 殘留 |
| 狀態定義一致性 | ✅ 5 個 Bonus Turnover Status + 4 個 Reward Status 完全一致 |
| CANCELLED 行為（D27+D33） | ✅ 邏輯一致（逐筆、不連帶、FIFO 遞補、餘額不動） |
| 欄位對應 | ✅ 活動設定 → 引擎 Instance → Drawer 展示，鏈路完整 |
| 貢獻度覆寫 | ✅ 三層優先度完全對齊 |
| 跨頁面導航 | ✅ 雙向可達 |
| 問題數量 | 🔴 0 個 / 🟡 3 個 / 🔵 5 個 |
| F-1~F-6 修復狀態 | ✅ 全部已修復（2026-04-17） |
| 剩餘未處理 | F-7（V1 不實作支付篩選，無需動作）、F-8（CSV 格式可後續補充） |

**三份 PRD 之間無 Critical 衝突。F-1~F-6 已全部修復，F-7/F-8 無需立即處理。**
