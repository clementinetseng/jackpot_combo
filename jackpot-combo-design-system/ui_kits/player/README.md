# Player UI Kit — Jackpot Combo

Mobile-first player frontend for Philippine players. Candy-purple theme on lavender gradient background. Five core pages follow the Frontend PRD (V1.0): **Lobby**, **Deposit**, **Gift Box (rewards dropdown)**, **Records**, **Reward Center**.

Open `index.html` to see the clickable prototype. It starts on the **Lobby** page and lets you move between pages via the bottom tab bar + top chrome, open the Gift Box dropdown, pick a promotion on the Deposit page, and claim a reward.

## Components

| File | What it is |
| --- | --- |
| `App.jsx` | Page orchestrator + shared state (balance, active tab, selected promotion). |
| `Chrome.jsx` | Top header (logo + balance pill + Deposit CTA + avatar) and bottom tab bar (5 icons). |
| `WalletBanner.jsx` | Full-width gradient banner showing balance + withdrawable. |
| `TurnoverStatus.jsx` | The shared progress-bar component (D18). Shows bonus-turnover, deposit-turnover, or ready-to-withdraw. |
| `PromotionCard.jsx` | Reward Center / Gift Box card with header gradient, icon, CTA row. |
| `RecordRow.jsx` | Reward-history row with left-border accent matching status color. |
| `PageLobby.jsx` | Home page — wallet, progress, featured promotions, game grid placeholder. |
| `PageDeposit.jsx` | Amount chips, promotion picker ("No Promotion" pinned, Eligible-only per D38/D46), continue CTA. |
| `PageGiftBox.jsx` | Dropdown panel — sectioned list (`Active Promotion` + `For You`), unread badge clear on open. |
| `PageRecords.jsx` | Promotion tab (per D61) with status-accented record cards. |
| `PageRewardCenter.jsx` | All-promotions page, same section grammar as Gift Box. |

## Source of truth

Visuals match `apps/player/index.html` from the `clementinetseng/jackpot_combo` repo (imported to `reference/apps/player/`). Terminology follows `docs/memory/glossary.md` — Turnover (never Wagering), absolute ₱ amounts, player-friendly status strings (`Completed 🎉`, `Ended (low balance)`).

## What's mocked

- Game covers: neutral gradient tiles with centered labels.
- Provider icons: omitted (copyrighted).
- Real backend: none. All state is local React `useState`.
