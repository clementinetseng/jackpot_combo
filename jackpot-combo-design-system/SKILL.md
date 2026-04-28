---
name: jackpot-combo-design
description: Use this skill to generate well-branded interfaces and assets for Jackpot Combo (菲律賓 iGaming promotions platform operated by The Force), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- Two themes, one system. Player surface = `data-theme="player"` (default) = candy purple + Poppins. Backoffice = `data-theme="office"` = flat blue + Inter. See `colors_and_type.css`.
- Key rules (non-negotiable):
  - Always `Turnover`, never `Wagering`.
  - Absolute ₱ amounts in copy (`Bet ₱45,000 more to withdraw`), not multiplier strings.
  - Emoji iconography only on the player surface, only from the sanctioned bucket.
  - One progress bar at a time (D18): `Bonus Turnover > Deposit Turnover > Withdrawable`.
  - Status strings are sentence case for players: `Completed 🎉`, `Ended (low balance)`.
- Components to copy from: `ui_kits/player/` (lobby, deposit, rewards, records) and `ui_kits/backoffice/` (promotion list, 4-step wizard, reward history drawer).

Ask the user whether the output is for the player surface, the backoffice, or both, before picking a theme.
