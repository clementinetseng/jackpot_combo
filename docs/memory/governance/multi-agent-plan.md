# 多 Agent 治理規劃

## 總覽

iGaming Turnover Engine 專案採三階段 Agent 協作模式，每個階段由專責 Agent 執行，共享 `memory/` 目錄作為狀態同步介面。Clement 為最終決策者。

```
PRD Agent ──產出──→ Dev Agent ──產出──→ QA Agent
   ↑                   ↑                   │
   └── escalate ───────┘── escalate ───────┘
                    Clement（裁決者）
```

---

## Agent 定義

### 1. PRD Agent（需求階段）

| 項目 | 內容 |
|------|------|
| **角色** | 產品需求分析師 |
| **職責** | 需求定義、架構決策、PRD 撰寫、決策紀錄維護 |
| **輸入** | Clement 的需求描述 + 討論 + 既有文件 |
| **輸出** | PRD (.md)、decision-log、glossary、QA checklist |
| **工具** | Read / Write / Edit / Mermaid 圖表 / Web Search |
| **語言** | PRD 用中文（面向台灣 RD）、前台用語英文（面向菲律賓玩家） |

**產出清單（Phase 1-3）**：
- `統一流水引擎PRD_V1.x.md` — 核心引擎 PRD
- `後台-玩家獎勵管理 PRD` — 修改版
- `後台-玩家獎勵紀錄總表 PRD` — 修改版
- Prototype（需 Figma 素材）
- `memory/context/decision-log.md` — 所有決策紀錄
- `memory/glossary.md` — 術語對照表

### 2. Dev Agent（開發階段）

| 項目 | 內容 |
|------|------|
| **角色** | 全端開發工程師 |
| **職責** | 根據 PRD 產出程式碼、API 設計、DB Schema、技術文件 |
| **輸入** | 所有 PRD + decision-log + glossary |
| **輸出** | Source code + API spec + DB migration + dev-notes |
| **必讀文件** | `CLAUDE.md`（架構決策）、`memory/glossary.md`（術語）、各 PRD |

**行為規則**：
- ❌ 不可自行修改 PRD 內容
- ❌ 不可自行變更已確認的架構決策
- ✅ 遇到 PRD 模糊或矛盾 → 寫入 `memory/governance/escalation-log.md` 並通知 Clement
- ✅ 技術選型決策 → 寫入 `memory/context/decision-log.md`（標記為 DEV 決策）
- ✅ 完成模組 → 更新 `memory/governance/dev-progress.md`

### 3. QA Agent（驗收階段）

| 項目 | 內容 |
|------|------|
| **角色** | QA 測試工程師 |
| **職責** | 根據 PRD QA checklist 撰寫測試案例、執行測試、回報 Bug |
| **輸入** | PRD QA checklist (§11) + Dev 的實作代碼 |
| **輸出** | Test cases + test results + bug reports |
| **必讀文件** | `CLAUDE.md`、PRD 的 QA 章節、Dev 的 API spec |

**行為規則**：
- ❌ 不可自行修改 PRD 或 Code
- ✅ Bug 分類回報：
  - **實作偏離 PRD** → 回報給 Dev Agent（或 Clement）
  - **PRD 本身有漏洞** → 回報給 PRD Agent（或 Clement）
- ✅ 測試結果寫入 `memory/governance/qa-results.md`
- ✅ 每輪測試後更新覆蓋率統計

---

## 共享介面（memory/ 目錄結構）

```
memory/
├── glossary.md                    # 術語對照表（PRD Agent 維護）
├── context/
│   └── decision-log.md            # 所有決策紀錄（所有 Agent 可追加）
├── projects/
│   └── turnover-engine.md         # 專案詳情（PRD Agent 維護）
└── governance/
    ├── multi-agent-plan.md        # 本文件
    ├── escalation-log.md          # 待建 — 跨 Agent 問題升級紀錄
    ├── dev-progress.md            # 待建 — Dev 完成進度追蹤
    └── qa-results.md              # 待建 — QA 測試結果
```

---

## Escalation 規則

| 情境 | 處理方式 |
|------|---------|
| Dev 發現 PRD 模糊 | Dev 寫入 escalation-log → Clement 裁決 → PRD Agent 更新 PRD |
| Dev 發現 PRD 矛盾 | 同上 |
| QA 發現實作偏離 PRD | QA 寫入 bug report → Dev 修復 |
| QA 發現 PRD 本身有漏洞 | QA 寫入 escalation-log → Clement 裁決 → PRD Agent 更新 PRD → Dev 修復 |
| 任一 Agent 需要新增架構決策 | 寫入 decision-log（標記來源 Agent）→ Clement 確認 |

---

## 啟動方式

目前 Cowork 沒有跨 session 自動觸發機制，所以階段推進由 Clement 驅動：

1. **啟動 Dev Agent**：Clement 開新 session，指示「讀取 CLAUDE.md + memory/，開始開發」
2. **啟動 QA Agent**：Clement 開新 session，指示「讀取 CLAUDE.md + memory/ + PRD QA checklist，開始測試」
3. 每個 Agent 啟動時第一步都是讀取 `CLAUDE.md`，從中獲取專案脈絡、架構決策、進度狀態

**Clement 只需一句話即可啟動任一階段，不需重新解釋背景。**

---

## 待 PRD 定稿後再建立的項目

以下內容在所有 PRD 完成後再具體化：

- [ ] Dev Agent 的 Skill 定義（技術棧、coding style、API convention）
- [ ] QA Agent 的 Skill 定義（測試框架、測試命名規範、覆蓋率目標）
- [ ] `escalation-log.md` 模板
- [ ] `dev-progress.md` 模板
- [ ] `qa-results.md` 模板
