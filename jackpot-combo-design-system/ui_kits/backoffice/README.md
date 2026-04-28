# Backoffice UI Kit — Jackpot Combo

Desktop operator admin for Taiwanese operators. Clean grey canvas, flat blue primary, data-dense tables. Two pages follow the Promotion Management + Reward History PRDs: **Promotion List + 4-step Wizard**, **Reward History List + Drawer + Cancel Modal**.

Open `index.html` for the clickable prototype. Defaults to Promotion List. Click **+ Create Promotion** to open Wizard Step 1. Click any **Reward ID** on Reward History to open the right-side drawer. Click **Cancel Reward** to trigger the cancel modal with Reason + Remark validation.

## Components

| File | What it is |
| --- | --- |
| `App.jsx` | Page router + fake data. |
| `Shell.jsx` | Dark `#1E2433` sidebar + page-title header. |
| `PromotionList.jsx` | Table with Status toggle (Disable confirms), Duplicate, Edit/View action icons. |
| `Wizard.jsx` | 4-step stepper: Basic / Condition / Reward / Info. Save → toast. Finish → toast + return to list. |
| `RewardHistory.jsx` | List with multi-select + Batch Cancel, clickable Promotion ID, detail Drawer, Cancel Modal. |
| `Modals.jsx` | Cancel-Reward (Reason dropdown + Remark ≥2 chars), Deactivate confirm, Unsaved-changes confirm. |

## Source of truth

Visuals match `apps/backoffice/index.html` from the repo (imported to `reference/apps/backoffice/`). Wizard and Drawer structure come from D15–D17, D52, D58–D61 decisions. English only — per PRD, operators read English, PRDs are Chinese.

## What's mocked

- Only one promotion row triggers the drawer/modal; others are static.
- Promotion Wizard steps are UI-only; Next/Back navigates, but no persistence.
- Bulk-cancel shows count + opens the modal but doesn't mutate the list.
