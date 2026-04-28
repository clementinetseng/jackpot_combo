# `<Card>`

## Anatomy

白色底 + 14px 圓角 + `shadow-card`（柔紫色陰影）。

## Variants

| Variant | 用途 | Sample |
| --- | --- | --- |
| `default` | 一般內容卡 | Deposit 頁主內容區、Reward Center 活動卡 |
| `hero` | 顯眼主卡 | Reward Center Active Promotion（含藍紫漸層 header） |
| `record` | 紀錄卡（左彩色 border） | Promotions Tab 的紀錄卡 |
| `blocker` | 阻擋狀態卡 | Withdraw 頁的 KYC / Bonus / Deposit Turnover 阻擋卡 |
| `gradient` | 藍紫漸層 | Wallet Banner、Featured Banner、Record 卡 header |

## Padding

| 尺寸 | Mobile | Desktop |
| --- | --- | --- |
| Compact | 12px | 12px |
| Default | 16px | 20px |
| Loose | 20px | 24px |

## Shadow

- `shadow-card` — `0 4px 20px -6px rgba(139,102,255,0.15)` (默認)
- `shadow-cardHover` — `0 10px 30px -8px rgba(139,102,255,0.25)` (hover)

## 狀態 Border Accent（Record 卡用）

| Status | Left Border |
| --- | --- |
| `ACTIVE` | 4px `brand-purple` |
| `COMPLETED` | 4px `success` (#10B981) |
| `PENDING` | 4px `lavender-400` |
| `OUT_OF_BALANCE` | 4px `warning` (#F59E0B) |
| `CANCELLED` | 4px `orange-500` |

## Mobile 調整

- Mobile 下 padding 降級為 `compact` 或 `default`
- 圓角從 `14px` (desktop) 略降為 `14px`（保持，但避免再縮；太小 card 失去辨識度）
- Banner 類卡可以用 `16px` radius 略收（`rounded-[16px]`）
