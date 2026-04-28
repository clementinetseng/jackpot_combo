# Jackpot Combo Design System

Shared design language for **Jackpot Combo** — an iGaming promotions platform and turnover engine operated by [The Force](https://the-force.com.tw/) for the Philippines market. This package ships the brand's visual foundations, content guidelines, and ready-to-compose UI kits for both surfaces (Player frontend, Operator backoffice).

> 中文備註：這個 design system 是為 Jackpot Combo（菲律賓 iGaming 促銷活動平台）建立的。包含雙主題（糖果紫 / 商務藍）、流水引擎專用元件、以及 Philippines 玩家友善的英文口語文案規範。

## Sources

| Source | Where | Notes |
| --- | --- | --- |
| Figma file | Force-Jackpot Combo.fig (mounted VFS) | 10 pages / 434 top-level frames — lobby, VIP, tournaments, newbie tasks, outlet inspection, account/KYC. |
| Codebase | [`github.com/clementinetseng/jackpot_combo`](https://github.com/clementinetseng/jackpot_combo) | Monorepo with `apps/player`, `apps/backoffice`, and a canonical `design-system/` token package. Imported into `reference/`. |
| PRDs | `docs/prds/` of the repo | Turnover Engine, Promotion Management, Reward History, Frontend PRD. |
| Decision log | `docs/memory/context/decision-log.md` | D1–D61 — defines terminology (Turnover, not Wagering), status labels, "one progress bar" rule, and copy conventions. |

## Products

Two products share one design language:

1. **Player Frontend** — mobile-first web app for Philippine players. Purple candy theme, Poppins, heavy use of gradient CTAs, emoji in playful copy. Pages: Deposit, Withdraw, Gift Box (rewards dropdown), Reward Center, Records, Wallet.
2. **Operator Backoffice** — desktop admin for Taiwanese operators. Clean grey canvas, flat blue primary, data-dense tables, Wizard flows. Pages: Promotion List + 4-step Wizard, Reward History List + Drawer + Cancel Modal.

---

## Content Fundamentals

### Voice & tone

- **Language:** Player surface = **English (Philippines-friendly, conversational)**. Backoffice = **English (operator-direct, clipped)**.
- **Person:** Addresses the player as **you**; never "the player" or "user". Examples from the prototype: `Bet ₱45,000 more to withdraw`, `Ready to withdraw`, `Start KYC`, `Play Now`, `Need help? Contact Support`.
- **Casing:** **Title Case** for CTAs and nav items (`Claim Now`, `View T&C`, `Reward History`). **Sentence case** for body, hints, and toasts (`Balance refreshed`, `Promotion published`).
- **Brevity:** Short, action-first. Never a full sentence where two words will do. Never instructional ("Please click…").

### Terminology rules (non-negotiable — from decision log D15, D20, D52)

| ✅ Always | ❌ Never |
| --- | --- |
| `Turnover` | ~~Wagering, WR, Play-through, Rollover~~ |
| `Bonus Turnover` / `Deposit Turnover` | ~~Wager requirement, Bet target~~ |
| `Bet ₱45,000 more to withdraw` (absolute ₱) | ~~30x turnover~~ (no multiplier strings) |
| `Active` / `Pending` / `Completed 🎉` / `Ended (low balance)` / `Cancelled` | ~~ACTIVE / PENDING~~ (player-facing — sentence-cased) |
| `Promotion` | ~~Campaign, Offer, Deal~~ |
| `Ready to withdraw` (balance free) | ~~Withdrawable funds available~~ |

### Money & formatting

- Currency is **always ₱** prefixed, Philippine peso, thousands-separated, 2 decimals in tables: `₱5,000.00`. In copy + progress bars, integers only: `Bet ₱45,000 more to withdraw`.
- Dates are `YYYY/MM/DD HH:mm:ss` in operator-facing tables; `Apr 10 ~ Apr 30` (no year, en-dash with `~`) in player-facing promotion periods.
- Timezone is UTC+8 (PH + TW align).

### Emoji — yes, but controlled

Emoji is part of the brand's voice, not decoration. Rules:

- Player surface only. **Never** in the backoffice.
- Used as **categorical glyphs** for promotion types (`🎁 First Deposit`, `💰 Reload`, `🎰 Slots Cashback`, `🎉 Completed`), navigation (`🏠 Casino`, `💳 Deposit`, `💸 Withdraw`, `🎁 Rewards`, `📋 Records`, `🎧 Support`), and status icons (`✅ Ready to withdraw`, `🔒 Locked`).
- Never as body filler. Never two in a row. Never stacked on a CTA.
- Bucket of sanctioned glyphs: `🎁 🎰 💰 💳 💸 🎉 ✅ 🔒 🎧 📋 🏠 ⭐ 👁️ ↻ 🏢`.

### Empty / blocked state rule (D25, D54)

Every empty state is one line + one CTA. Blocked CTAs must explain why they're blocked: `🔒 Locked — Complete the requirements above`. No blank squares.

---

## Visual Foundations

### Two themes, shared neutrals

All spacing, radii, typography, and semantic colors are shared. Only the brand accents differ.

| | Player (糖果紫) | Backoffice (商務藍) |
| --- | --- | --- |
| Primary | `#8E66FF` → `#B185FF` gradient | `#2563EB` flat |
| Accent | `#FFC107` (balance yellow) | — |
| Surface | White on lavender gradient | White on `#F5F6FA` grey |
| Font | Poppins 400/500/600/700/800 | Inter (codebase uses Inter; Figma also uses Poppins — both covered) |
| Corner | Pill everywhere; `14px` cards; `20px` banner/modals | `6–10px` rectangular |
| Shadow | Soft purple-tinted `rgba(139,102,255,0.15)` | Neutral grey `rgba(0,0,0,0.05–0.18)` |

### Color

- **Primary purple** `#8E66FF` drives CTAs, active tabs, progress fills, and sidebar logo. Rarely appears as a solid background — the characteristic look is the **gradient pill** `#8E66FF → #B185FF`.
- **Banner gradient** `#6FB1FC → #8E66FF → #B185FF` spans the wallet banner, featured promotion headers, and modal chrome.
- **Page gradient** `#EBE3F7 → #D5C5EA → #BFA8E1` at 140° is the player canvas. Content sits in white cards floating on it.
- **Accent yellow** `#FFC107` is reserved for *money in motion*: the header `Deposit` CTA and balance numerals. Using it elsewhere breaks the rule "Deposit is the star".
- **Ink scale** (`#2D1B4E / #6B5B8E / #8E7DC0`) replaces neutral grey for text on the player theme — everything leans slightly purple so neutrals never feel cold next to the lavender background.
- **Lavender scale** (50–700) replaces generic greys for player backgrounds, borders, and the inside-sidebar fill.

### Type

- Single family: **Poppins** (400/500/600/700/800). Inter is the backoffice fallback in the shipped repo but both surfaces are safe on Poppins.
- Scale is 10 / 11 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 px.
- Balance uses a **display treatment**: 30 px / 800 / `#FFC107`. Nowhere else is this combination used.
- Body is 14 px 400. Captions are 11 px 400 in `--ink-muted`.
- Line heights: 1.15 tight (balance/hero), 1.25 snug (headings), 1.5 normal (body).

### Spacing

4px base. Container padding steps `12 / 16 / 24` at mobile / tablet / desktop. Card padding is a three-tier `12 / 16 / 24` compact/default/loose. Section gaps are `12` mobile / `20` desktop.

### Corner radii

- **Pill** (9999px) for buttons, inputs, chips, tabs, and the balance pill. The design's signature.
- **14px** for cards.
- **20px** for wallet banner, modals, big promotion cards.
- **10px** for deposit-amount chips (the one rectangular exception).
- Backoffice: buttons `6px`, cards `10px`, modals `10px` — strictly rectangular.

### Shadows & elevation

Player cards carry **purple-tinted** shadows so elevation reads even against the pastel background. Three tiers:

- `card` — `0 4px 20px -6px rgba(139,102,255,0.15)` default.
- `cardHover` — `0 10px 30px -8px rgba(139,102,255,0.25)` on hover.
- `pill` — `0 2px 8px -2px rgba(139,102,255,0.4)` for raised pills.

Backoffice uses standard neutral shadows (`0 1px 2px / 0 2px 8px / 0 4px 16px`).

### Borders

- Player: `1px solid #E5DCF5` (soft lavender) — only at the low end of hierarchy (inputs, separators, subtle dividers). Most surfaces separate via shadow, not border.
- Backoffice: `1px solid #DFE2E8` — used liberally on tables, cards, and inputs.

### Backgrounds & imagery

- **Player canvas** is always the page gradient. No textures, no patterns, no grain.
- **Game cover art** is the busiest imagery: glossy, saturated slot-machine / live-dealer thumbnails in `~200×200` rounded tiles. They're photographed/rendered, never illustrated.
- **Full-bleed hero banners** are rare; when used, they're cropped from provider art and overlaid with a dark/gradient scrim.
- No hand-drawn illustrations. No gradient meshes. The candy-purple gradient is the only "decoration".

### Animation

- **Fast, restrained.** Transitions are 150–350 ms ease. No bouncy springs, no parallax, no scroll-linked animation.
- **Drawer / modal** slide in 250 ms from right / center-scale.
- **Toast** drops from the top in 300 ms and fades out after 3.2 s.
- **Progress bars** animate width on state change (slow = 350 ms ease) — a small but deliberate moment that rewards completing turnover.
- No animated loading states beyond a spinner + `Processing…` label.

### Interaction states

| State | Treatment |
| --- | --- |
| `:hover` (card) | Shadow grows from `card` → `cardHover`. No translate. |
| `:hover` (pill / link) | Brightness 110%, no color swap. |
| `:hover` (outline btn) | Border switches from `softborder` to `brand-purple`. |
| `:active` / press | No shrink. Brief background darken via brightness 95%. |
| `:focus-visible` | 3px `rgba(139,102,255,0.3)` ring on player, `rgba(37,99,235,0.1)` on office. |
| `:disabled` | Gradient becomes grey `#d1d5db → #9ca3af`, shadow removed, `cursor: not-allowed`. Disabled primary CTAs keep an explainer: `🔒 Locked — Complete the requirements above`. |

### Transparency, blur, layering

- **Header** is `rgba(255,255,255,0.7)` + `backdrop-filter: blur(12px)` — the only routine use of backdrop blur.
- **Modal overlay** is `rgba(45,27,78,0.4)` (ink at 40%). Never true black.
- **Glass pills** (balance display) use `bg-primary-pill` + `ring rgba(255,255,255,0.2)` for a subtle inner glow.

### Layout rules

- **Max width** `1440px` centered, `24px` side padding on desktop.
- **Player** has a `220px` sidebar card (itself a rounded gradient block, not a flush column) + a flexible main column. Mobile collapses to a slide-in drawer + 5-icon bottom nav.
- **Backoffice** has a `240px` fixed dark sidebar (`#1E2433`) + full-bleed main with `24/32px` padding. Page titles are `22px / 700` left-aligned.

### Status & progress semantics

Every reward record gets a **4px left-border accent** matching the status color (`Active` purple, `Completed` green, `Pending` lavender, `Ended` orange, `Cancelled` tangerine). This is the only place "accent left border" is used — do not copy it onto other cards.

---

## Iconography

- **No icon font.** The codebase uses **emoji glyphs** as iconography on the player surface and a handful of **inline SVG paths** + emoji on the backoffice (copied from the Figma components). That is intentional, not a gap — see the Content Fundamentals emoji rule.
- When a glyph outside the sanctioned bucket is needed (e.g. for a table action in the backoffice), **Lucide** (`lucide.dev`) is the closest match visually — stroke-based, 1.5 px weight, rounded joins — and is linked from the CDN in the UI kit.
- Logos and brand marks: the recurring logo treatment is **a lowercase `jackpot combo` wordmark** beside a **rounded-square "J" glyph** filled with the purple gradient. Both variants are checked in under `assets/`.
- **Game covers** are raster PNGs from providers. Do not redraw them; placeholder tiles use the lavender gradient + centered caption.

> ⚠️ **Substitution flagged:** The Figma file references several **per-provider PNG icons** (BBIN, JILI, Evolution, etc.) that we did not import — they are copyrighted. If a production mock needs them, copy directly from the Figma VFS into `assets/providers/`.

---

## Index

| File / folder | What it is |
| --- | --- |
| `README.md` | This file. |
| `SKILL.md` | Agent Skill entrypoint — usable by Claude Code. |
| `colors_and_type.css` | CSS variables + semantic classes for both themes. |
| `assets/` | Logos, brand marks, sample promotion glyphs. |
| `preview/` | Design System tab cards (colors, type, components, brand). |
| `ui_kits/player/` | Player frontend UI kit — Deposit, Withdraw, Rewards, Records. |
| `ui_kits/backoffice/` | Operator backoffice UI kit — Promotion list + Wizard, Reward History + Drawer. |
| `reference/` | Upstream design-system package + both prototype apps imported from the repo. |
| `reference/apps/player/index.html` | Canonical player prototype (v2). Source of truth for player patterns. |
| `reference/apps/backoffice/index.html` | Canonical operator prototype (v2). Source of truth for operator patterns. |
| `reference/tokens/*.json` | Upstream design tokens in JSON. |
| `reference/components/*.md` | Canonical component specs (Button, Card, TurnoverStatus). |

## Caveats

- **Poppins + Inter are loaded from Google Fonts.** No local `.ttf` was included. If you need offline rendering, drop `.woff2` files into `fonts/` and point `@font-face` at them.
- **Provider / game-cover artwork** was not copied — the Figma has hundreds of PNGs (game-cover appears 492×), most of which are third-party. The UI kits use neutral placeholder tiles.
- **No sample slide deck was attached.** No `slides/` directory was generated.
- **Tweaks:** the player index.html exposes a **Theme** toggle (Player ↔ Backoffice) so you can preview both in one place.
