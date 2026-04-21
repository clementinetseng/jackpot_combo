# Jackpot Combo Design System

Brand guidelines and shared design tokens for the Jackpot Combo iGaming platform.

## 結構

| 資料夾 | 內容 |
| --- | --- |
| `tokens/` | 原始 design tokens（JSON） — 顏色、字型、間距、圓角 |
| `components/` | 共用元件規格（Markdown，含 anatomy / props / states） |
| `styles/` | 共用樣式：`tailwind.config.js`、`base.css` |
| `icons/` | 品牌 SVG 圖示庫（未來補）|

## 兩種 Brand Theme

| Theme | 用途 | Primary Color | Font |
| --- | --- | --- | --- |
| **Player Theme**（糖果紫）| 前台玩家端（PH 玩家友善） | `#8E66FF` → `#B185FF` (紫漸層) + `#FFC107` (Balance 黃) | Poppins |
| **Backoffice Theme**（商務藍） | 後台營運管理 | `#2563EB` → `#1D4ED8` | Poppins |

兩 theme 共用 tokens 中的 `neutral` / `semantic` / `spacing` / `radius` / `typography`；僅 `brand.player` / `brand.backoffice` 差異。

## 使用方式

### 前端實作引用

1. 讀取 `tokens/colors.json` 等 JSON
2. 注入到 `tailwind.config.js` 的 `theme.extend.colors`
3. 各 app（`apps/backoffice` / `apps/player`）使用 Tailwind utility class

目前 prototype 都採 Tailwind Play CDN，token 直接寫在 HTML 內的 `tailwind.config`。正式 RD 實作建議用：

- **Style Dictionary**（Amazon 開源）— 從 tokens JSON 產出 CSS variables、Tailwind config、iOS / Android 原生格式
- **Figma Tokens Studio** — 設計師端同步（Figma ↔ repo）

## 修改約定

1. **token 變更要走 PR** — 不要直接硬改 app HTML 裡的值
2. **元件規格變更** — 先改 `components/*.md`，再更新實作
3. **新增 theme** — 在 tokens 加 `brand.<theme-name>` 節點，各 app 自行決定是否套用

## 對應的 PRD 條文

- 「一個進度條」原則（Turnover PRD §10.1；前台 PRD §0.1）→ 對應共用 `<TurnoverStatus>` 元件
- 金額格式 `₱X,XXX.XX`（千分位 + 2 位小數）→ `tokens/format.json`（未來補）
- 時區 UTC+8 → `tokens/format.json`
- 狀態翻譯（PENDING → Pending 等）→ `tokens/status.json`（未來補）
