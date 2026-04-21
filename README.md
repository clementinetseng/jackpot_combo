# Jackpot Combo — iGaming Monorepo

**目標市場：** 菲律賓（PH）
**產品：** iGaming 平台的促銷活動系統 + 流水引擎
**維護：** The Force 產品團隊

## 目錄結構

```
jackpot-igaming/
├── apps/                     ← 各端實作（可部署）
│   ├── backoffice/           ← 後台 — 營運管理 (Promotion / Reward History)
│   └── player/               ← 前台 — 玩家端 (Deposit / Withdraw / Rewards / Records)
│
├── design-system/            ← 品牌規範與 tokens
│   ├── tokens/               ← 顏色、字型、間距、圓角（JSON）
│   ├── components/           ← 核心元件規格（.md）
│   ├── styles/               ← 共用樣式（tailwind.config.js / base.css）
│   ├── icons/                ← SVG 圖示
│   └── README.md             ← 品牌規範主文件
│
├── docs/                     ← 所有文件
│   ├── prds/                 ← 4 份 PRD + Review Reports
│   └── memory/               ← 決策紀錄、術語、協作脈絡
│
├── CLAUDE.md                 ← AI 協作上下文
├── render.yaml               ← 雙服務部署設定（Render monorepo）
└── .gitignore
```

## 部署

用 [Render](https://render.com/) 的 monorepo 設定，**一個 repo 部署兩個服務**：

| 服務 | URL（建議） | 對應 | Render Service |
| --- | --- | --- | --- |
| 後台 Prototype | `backoffice.<subdomain>.onrender.com` | `apps/backoffice/` | `jackpot-backoffice-prototype` |
| 前台 Prototype | `player.<subdomain>.onrender.com` | `apps/player/` | `jackpot-player-prototype` |

配置已寫在根 `render.yaml`，兩個服務共用一個 repo。

### 本地開發

```bash
# 後台
cd apps/backoffice && npm install && npm start
# 開 http://localhost:10000

# 前台
cd apps/player && npx serve -s . -l 5000
# 開 http://localhost:5000
```

## 快速入口

| 想做的事 | 去哪 |
| --- | --- |
| 看 PRD | `docs/prds/` |
| 查設計 token / 顏色 | `design-system/tokens/` |
| 看 AI 決策紀錄（D1~D61） | `docs/memory/context/decision-log.md` |
| 查中英對照術語 | `docs/memory/glossary.md` |
| 修改前台視覺 | `apps/player/index.html` |
| 修改後台視覺 | `apps/backoffice/index.html` |

## 開發約定

1. **設計 token 變更** — 先改 `design-system/tokens/*.json`；兩個 app 再跟著更新
2. **PRD 決策** — 新決策先加進 `docs/memory/context/decision-log.md`，再回頭更新對應 PRD
3. **術語** — 任何英文對外文案必須先查 `docs/memory/glossary.md`，避免偏離 PRD（例：用 `turnover` 不用 `wager`）
4. **共用元件** — `<TurnoverStatus>` 等共用元件必須在 5 處同步（Deposit / Withdraw / Rewards / Gift Box / Wallet），不可各自實作
