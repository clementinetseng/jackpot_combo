# `<TurnoverStatus>` — 共用流水狀態元件

> **最重要的共用元件。** 依《流水引擎 PRD §10.1》和《前台 PRD §0.1》，玩家在任何時刻只能看到**一個**流水狀態；此元件就是那個唯一顯示器。

## 出現位置

| 處 | 用途 |
| --- | --- |
| Deposit 頁 | ❌ **不顯示**（Clement 反饋：冗餘；禮物盒 / Wallet pill 已可見） |
| Withdraw 頁 | ✅ 阻擋狀態下作為 blocker card 顯示 |
| Reward Center 頁 | ✅ Active Promotion 卡片內建進度條（同個資訊源） |
| 🎁 Gift Box Dropdown | ✅ 最上方 status block（僅 Active 或 Deposit Turnover 有進度時）|
| Header Wallet Banner | ✅ 顯示 Balance + Withdrawable |

**5 處資料同源（全域狀態 / 同一個 API）**，RD 不得各自實作。

## 狀態與顯示

| 狀態 | 判定邏輯 | 顯示 |
| --- | --- | --- |
| A. 有 ACTIVE 促銷 | `state.activePromo !== null` | `🎰 <活動名稱>` + 進度條 + `Bet ₱X more to withdraw` |
| B. Deposit Turnover 未清（無 ACTIVE）| `depositTurnover.target > depositTurnover.progress` | `💰 Deposit Turnover` + 進度條 + `Bet ₱X more to withdraw` |
| C. 兩層皆清 | 以上皆否 | `✅ Ready to withdraw` + `Withdrawable: ₱X,XXX.XX` |

> Gift Box 的 C 狀態**不顯示** status block（Clement 反饋：沒進度就不佔位置）

## Props（建議 API）

```ts
type TurnoverStatusProps = {
  variant?: 'card' | 'row' | 'compact';        // 依放置位置調整密度
  showBackdrop?: boolean;                      // 是否含外層卡片背景
  onPlayClick?: () => void;                    // 「Play Now」點擊行為
  onWithdrawClick?: () => void;                // Ready 狀態的「Withdraw」
  onLearnMoreClick?: () => void;               // 阻擋狀態的「Learn more」
};
```

## Anatomy

```
┌─────────────────────────────────────────┐
│ [Icon] [Title]                    [%]   │  ← 狀態類型 + 百分比
│ ▰▰▰▰▰▰▰▱▱▱ (progress bar)               │
│ Bet ₱X,XXX more to withdraw             │  ← 絕對金額（D48）
│                            [Play Now →] │  ← CTA（阻擋時）
└─────────────────────────────────────────┘
```

## 互動狀態

| 狀態 | 行為 |
| --- | --- |
| ACTIVE + 進度增加 | 進度條即時更新（PRD §10.3）|
| ACTIVE → COMPLETED | 顯示變為 `Completed 🎉`（2 秒後可切到 C 狀態）|
| ACTIVE → OUT_OF_BALANCE | 進度條消失 + Toast 提示（PRD D41）|
| CANCELLED | 進度條消失，切到 B 或 C 狀態 |

## 文案規則（必須對齊 PRD）

| ✅ 用 | ❌ 不用 |
| --- | --- |
| `Turnover` | ~~Wagering~~, ~~WR~~, ~~Play-through~~ |
| `Bet ₱X more to withdraw` | ~~Bet target~~, ~~Bet requirement~~ |
| `Bonus Turnover` / `Deposit Turnover` | ~~Wager requirement~~ |
| `Complete the turnover` | ~~Clear the wagering~~ |

## Accessibility

- Progress bar 需有 `role="progressbar"` + `aria-valuenow` / `aria-valuemin` / `aria-valuemax`
- 狀態變化（A → C）需發出 ARIA live region announcement：「Promotion completed. Your balance is now withdrawable.」
- 阻擋狀態下主 CTA `Play Now` 至少 44×44 px 觸控目標
