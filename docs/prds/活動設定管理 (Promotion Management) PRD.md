# 活動設定管理 (Promotion Management) PRD

**用途：** 管理活動設定，提供查詢、篩選、查看、複製、編輯（僅 Disabled）、啟用 / 停用。

## 版本紀錄

| 版本 | 日期 | 變更摘要 |
| --- | --- | --- |
| V1.0 | 2026-04-17 | 初版 |

---

## 頁面結構

| 區塊 | 元件 | 內容 / 說明 |
| --- | --- | --- |
| Header | Title + Description | 顯示 `Promotion Management` 與頁面簡述 |
| Header | Create Promotion Button | 進入 Promotion Wizard 建立模式 |
| Filter Area | Search / Filters / Apply Filters | 篩選活動列表 |
| Table Area | Promotion Table | 顯示活動資料 |
| Table Area | Status Toggle | 直接切換 `Enabled / Disabled` |
| Table Area | Actions | `View / Duplicate / Edit` |

---

## 搜尋與 Filter

### Search

| 欄位 | 類型 | 規則 |
| --- | --- | --- |
| Search Field | Dropdown | 先選搜尋欄位 |
| Search Text | Text Input | 再輸入文字進行模糊比對 |

**Search Field 選項**：`promotion_id` / `promotion_name`

### Filters

| Filter 名稱 | 類型 | 規則 |
| --- | --- | --- |
| Promotion Type | Dropdown | V1 選項：`All`、`Deposit Bonus`；後續持續新增 |
| Status | Dropdown | 選項：`All`、`Enabled`、`Disabled` |
| Start From | Date Picker | 篩選 `start_time >= start_from` |
| End Before | Date Picker | 篩選 `end_time < end_before`；若活動無 end_time，預設不命中 |

> **預設排序**：`Last Updated DESC`　**每頁筆數**：20
> 

---

## Table 欄位

| 欄位名稱 | 中文 | 顯示規則 |
| --- | --- | --- |
| Promotion ID | 活動 ID | 唯一識別碼，例如 `PRM-20260408-0001` |
| Promotion Name | 活動名稱 | 後台內部名稱，與前台顯示無關 |
| Type | 活動類型 | V1 固定 `Deposit Bonus`；後續持續新增 |
| Period | 活動時間 | 有起訖：`YYYY-MM-DD ~ YYYY-MM-DD`；無結束：`YYYY-MM-DD ~ Long-term` |
| Bonus Cost | 派獎費用 | 該活動累計已發放 Bonus 總額 |
| Claims / Participants | 領取次數 / 參與人數 | 格式 `Claims / Participants`；Claims = 領取次數，Participants = 去重玩家數 |
| Status | 狀態 | `Enabled / Disabled` |
| Created By | 建立人 | 建立該活動設定的後台操作人 |
| Remark | 備註 | 後台內部備註，不對前台顯示（調整開關後必填） |
| Last Updated | 最後更新 | 最後更新時間 |
| Actions | 操作 | `View / Duplicate / Edit` |

---

## 操作規則

| 操作 | 顯示條件 | 行為 | 邏輯 / 邊界 |
| --- | --- | --- | --- |
| Create Promotion | 永遠顯示 | 進入 Wizard 建立模式 | V1 直接建立 `Deposit Bonus`，不做模板選擇視窗 |
| View | 所有活動 | 進入唯讀模式 | 可查看完整設定，不可修改 |
| Duplicate | 所有活動 | 建立一筆新活動 | 帶入原活動 Step 1–4 所有欄位設定（含 Contribution Rules）；新名稱加 `(Copy)`；新狀態一律 `Disabled`；不繼承 KPI / 玩家活動實例 / 歷史 |
| Edit | 僅 `Disabled` | 進入編輯模式 | `Enabled` 活動不可直接編輯 |
| Disabled → Enabled | `Disabled` 活動 | 切換為 `Enabled` | 必須完成 Basic Setup、Condition、Reward & Turnover、Info / Announcement 必要欄位 |
| Enabled → Disabled | `Enabled` 活動 | 切換為 `Disabled` | 需二次確認（見下方）；只影響新玩家是否可接到活動，不影響既有玩家實例 |

---

## 狀態與有效性規則

活動設定狀態僅有 `Enabled` / `Disabled`，不存在其他狀態。

### Enabled 時

- 活動可對新玩家開放，但仍需符合活動時間
- 系統不會自動判斷時間是否符合；活動時間到期後也不會自動切成 Disabled
- 不可直接 Edit；若需修改，必須 Duplicate 後修改副本

### Disabled 時

- 停止對新玩家開放，但既有玩家活動實例照原規則持續到終態
- 可完整編輯
- Duplicate 的新活動、Create 的新活動統一預設為 Disabled

### 活動可被新玩家接到的條件

同時滿足：`status = Enabled` + `current_time >= start_time` + 若有 `end_time` 則 `current_time < end_time`

> **注意**：時間已過但仍為 Enabled 的活動，不得再對新玩家生效。後端不可只看 status，必須同時檢查活動時間。
> 

---

## Enabled → Disabled 二次確認

當使用者將一筆 `Enabled` 活動切換為 `Disabled` 時，系統必須先彈出二次確認視窗。

| 中文 | 英文 | 互動邏輯 |
| --- | --- | --- |
| 視窗標題 | Confirm Deactivation |  |
| 確認問題 | Are you sure you want to deactivate “{Promotion Name}”? |  |
| 影響說明 1 | Immediate stop for new player participation |  |
| 影響說明 2 | Prevent creation of new promotion instances |  |
| 影響說明 3 | Existing active instances will NOT be affected and can still be completed |  |
| 原因欄位標題 | Remark * | 至少 2 字元，必填 |
| 原因輸入框 | Explain why this promotion is being disabled… (Min 2 chars) | placeholder |
| Notice 標題 | Notice: |  |
| Notice 內容 | Disabling a promotion does NOT terminate active player instances. 
To cancel specific player bonus turnover, please use the Reward History page. |  |
| 取消按鈕 | Cancel | 關閉視窗，不改變活動狀態 |
| 確認按鈕 | Confirm Disable | 執行並寫入 remark |

---

# Create Promotion - 活動設定頁

**頁面名稱：** Create Promotion

**用途：** 建立 / 查看 / 編輯一筆 `Deposit Bonus` 活動設定。

**模式：** `Create / Edit / View`

## 頁面結構

| 區塊 | 元件 | 內容 | 說明 / 規則 |
| --- | --- | --- | --- |
| Back Navigation | Back Link | `← Back to Promotion Management` | 點擊返回列表頁；若有未儲存內容，需彈出 Unsaved Changes 二次確認 |
| Page Header | Page Title | `Create Promotion` |  |
| Page Header | Page Description | `Complete the following steps to set up your promotion` |  |
| Stepper | Step Indicator | `1. Basic Setup` / `2. Condition` / `3. Reward & Turnover` / `4. Info / Announcement` | 固定 4 步；Create / Edit / View 都顯示 |
| Form Content Area | Step Title | 當前 step 名稱 |  |
| Form Content Area | Step Description | 見下方各 step 描述 |  |
| Bottom Action Bar | Cancel | `Cancel` | 離開頁面；若有未儲存內容需二次確認 |
| Bottom Action Bar | Save | `Save` | 儲存目前內容；允許存半成品；不要求完整必填 |
| Bottom Action Bar | Back | `Back` | 回上一個 step；不做必填擋控；保留當前輸入 |
| Bottom Action Bar | Next | `Next` | 到下一個 step；不做必填擋控；保留當前輸入 |

> 活動啟用狀態不在 Wizard 內設定，Wizard 只負責儲存內容；實際開關回到 Promotion Management 處理。
> 

---

> **前台對應欄位圖例**：`X` = 不對玩家顯示　`O` = 間接影響前台顯示　`Direct` = 直接顯示於前台
> 

## Step 1：Basic Setup

> Define the basic information and timeline for this promotion
> 

| 中文 | 英文 | 必填 | 前台對應 | 內容 / 定義 | 規則 |
| --- | --- | --- | --- | --- | --- |
| 活動名稱 | Promotion Name | Yes | X | 活動主名稱 | Save 可先存半成品，但 Enable 前必須完整 |
| 活動類型 | Promotion Type | Yes | X | 固定為 `Deposit Bonus` | 建立後不可修改 |
| 活動時間類型 | Promotion Period Type | Yes | X | `No End Date (Long-term)` / `Custom Period` | 決定是否顯示 End Time |
| 開始時間 | Start Time | Yes | X | 活動開始時間 | Enable 前必填 |
| 結束時間 | End Time | Conditional | X | 活動結束時間 | `Custom Period` 時必填，且需晚於 `Start Time` |
| 內部備註 | Internal Remark | No | X | 後台備註 | 不對玩家顯示 |

---

## Step 2：Condition

> Define eligibility criteria and player scope for this promotion
> 

### 觸發條件（Toggle 開關，啟用的條件之間 AND）

每個條件獨立開關。關閉 = 不檢查該條件。啟用的條件全部同時滿足才觸發。

| # | 中文 | 英文 | Toggle 預設 | 欄位 | 規則 | 備註 |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | 當日第 N 筆存款 | Nth Daily Deposit | OFF | 數字 N | 必須 `>= 1`；N=1 = 每日首存 | 以每日 00:00 (GMT+8) 重置計數 |
| C2 | 累計第 N 筆存款 | Nth Lifetime Deposit | OFF | 數字 N | 必須 `>= 1`；N=1 = 首儲 | 玩家帳戶生命週期計算，不重置 |
| C3 | 當日累計存款 | Daily Cumulative Deposit | OFF | 金額 X | 必須 `> 0`；當日所有成功存款加總 ≥ X | 以每日 00:00 (GMT+8) 重置累計 |
| C4 | 註冊天數限制 | Registration Window | OFF | 天數 X | 必須 `>= 1`；註冊時間 + X 天 > 當前時間 | 例如 X=7 → 註冊 7 天內的玩家才符合 |
| C5 | 首存後時限 | First Deposit Window | OFF | 小時 X | 必須 `>= 1`；首存時間 + X 小時 > 當前時間 | 首存 = 玩家帳戶第一筆成功存款 |

### 交易條件

| 中文 | 英文 | 必填 | 前台對應 | 內容 / 定義 | 規則 |
| --- | --- | --- | --- | --- | --- |
| 最低儲值金額 | Min Deposit | Yes | O | 單筆最低儲值門檻 | 必須 `> 0` |
| 最高儲值金額 | Max Deposit | No | O | 單筆最高儲值門檻 | 若有填，需 `>= Min Deposit` |

### 參與限制

| 中文 | 英文 | 必填 | 前台對應 | 內容 / 定義 | 規則 |
| --- | --- | --- | --- | --- | --- |
| 可領取次數上限 | Max Claims Per User | Yes | X | 單一玩家最多可領幾次 | 必須 `>= 1` |
| 適用支付方式 | Eligible Payment Methods | No | 間接 | 例如 Epay、Bank Transfer、Crypto、Other | 目前只有一種支付 |
| 玩家範圍 | Player Scope | Yes | X | `All Players` / `Include Specific Players` / `Exclude Specific Players` / `AB Test (Account Suffix)` | 必須四選一；`All Players` 不顯示 Player ID Input；`AB Test` = 依玩家帳號最後 1 碼分組，輸入數字如 `0,1,2` |
| 玩家 ID 輸入區 | Player ID Input | Conditional | X | 一行一個 Player ID | `Include / Exclude / AB Test` 時才顯示並必填 |

---

## Step 3：Reward & Turnover

> Configure bonus rewards, bonus turnover, and game contribution rates
> 

| 中文 | 英文 | 必填 | 前台對應 | 內容 / 定義 | 規則 |
| --- | --- | --- | --- | --- | --- |
| 紅利模式 | Bonus Value Type | Yes | X | `Fixed Amount` / `Percentage` | 決定 bonus 欄位必填邏輯 |
| 固定紅利金額 | Bonus Amount | Conditional | X | 固定金額 bonus | `Fixed Amount` 時必填 |
| 紅利百分比 | Bonus Percentage | Conditional | X | 百分比 bonus | `Percentage` 時必填 |
| 紅利上限 | Bonus Cap | No | X | 百分比 bonus 的上限金額 | 可空 |
| 獎勵流水模型 | Bonus Turnover Model | Yes | X | 下拉選單，見下方顯示格式 | 必填 |
| 獎勵流水倍數 | Bonus Turnover Multiplier | Yes | X | 流水倍數 | 必須 `> 0` |
| 排除反水計算 | Exclude From Rebate Calculation | No | X | 勾選後，此活動 `ACTIVE` 期間的流水不納入其他回饋計算（例如 VIP 的 cashback 累計） |  |

### Bonus Turnover Model 下拉選單顯示格式

| 選項顯示值 | 引擎公式（§5.6） |
| --- | --- |
| Model A: Principal + Bonus | Target = (Principal + Bonus) × Multiplier |
| Model B: Principal Only | Target = Principal × Multiplier |
| Model C: Bonus Only | Target = Bonus × Multiplier |

### Contribution Rules

| 區塊 | 中文 | 英文 | 必填 | 欄位 | 規則 | 覆寫優先度 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 類別預設值 | Category Default | Yes | `Category` + `Contribution Rate`；Category 固定 6 類：`SLOT / FISH / TABLE / ARCADE / EGAME / LIVE` | Category 類別寫死 | 最低 |
| 2 | 供應商覆寫 | Provider Override | No | `Provider` + `Contribution Rate` | 同一 Provider 不可重複 | 中 |
| 3 | 遊戲覆寫 | Game Override | No | `Game ID` + `Game Name` + `Contribution Rate` | 同一 Game ID 不可重複 | 最高 |

> **Contribution Rate**：整數 `0%–100%`。`0%` = 該類別 / 供應商 / 遊戲的投注完全不貢獻流水。
> 

---

## Step 4：Info / Announcement

> Customize promotion appearance and detailed terms
> 

| 中文 | 英文 | 必填 | 前台對應 | 內容 / 定義 | 規則 |
| --- | --- | --- | --- | --- | --- |
| 活動標籤 | Promotion Tag | No | Direct | 活動角標，例如 `FIRST DEPOSIT` / `RELOAD` | 顯示於活動卡片 |
| 卡片圖示 | Card Icon | Yes | Direct | 活動卡片 icon | 顯示於活動卡片 |
| 主標題 | Main Title | Yes | Direct | 活動主標題 | 前台主要名稱 |
| 副標 / 摘要 | Subtext / Summary | Yes | Direct | 活動次標 / 核心摘要 | 例如 `Up to ₱5,000 · 40x Turnover` |
| 儲值頁資訊框 | Deposit Page Info Box | No | Direct | 顯示於儲值頁 info box | 用於簡短提示 |
| 條款內容 | Detailed T&C | Yes | Direct | 活動完整條款與說明 | 顯示於詳細資訊頁 |
| 整體預覽 | Overall Preview | Yes | Direct | 右側即時預覽活動卡片、info box、詳細條款 | 依左側輸入即時更新 |

### Detailed T&C 文字編輯器功能

| 優先級 | 功能 |
| --- | --- |
| **必要** | 粗體、標題（H1/H2/H3）、段落、有序清單、無序清單、超連結 |
| **建議** | 引用 / 提示框、分隔線、文字顏色、斜體 |
| **可選** | 圖片插入、Markdown 語法支援 |

---

## Wizard 操作規則

| 操作 | 驗證層級 | 二次確認 | 成功文案 | 失敗文案 | 規則 |
| --- | --- | --- | --- | --- | --- |
| Save | 不做完整商業驗證 | No | `Saved successfully.` | — | 允許存半成品；不要求完整必填 |
| Next | 驗證重複內容 | No | — | `Please remove repeated Category, Provider, or Game settings.` | 保留當前輸入狀態；重複 Category / Provider / Game 不允許 |
| Back | 不做完整商業驗證 | No | — | — | 僅切換 step |
| Cancel / Back to List | — | Yes（有未儲存內容時） | — | — | 離開頁面前需判斷是否有未儲存內容
若有則跳Unsaved Changes二次確認 |

### Unsaved Changes 二次確認文案

| 項目 | 文案 |
| --- | --- |
| Title | `Unsaved Changes` |
| Message | `You have unsaved changes. Are you sure you want to leave this page?` |
| Buttons | `Stay` / `Leave` |