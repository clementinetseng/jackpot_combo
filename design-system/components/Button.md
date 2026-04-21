# `<Button>`

圓角 pill 按鈕，遵循 PP 實機風格。

## Variants

| Variant | Class in Prototype | 用途 |
| --- | --- | --- |
| `primary` | `.btn-primary` | 主 CTA：紫漸層 + 白字（Submit / Play Now / Claim Now）|
| `outline` | `.btn-outline` | 次要：白底 + 淡紫邊（View T&C）|
| `ghost` | `.btn-ghost` | 弱動作：透明 + 灰字（Cancel）|
| `yellow` | （header Deposit） | Highlight CTA：黃底 + 深紫字（Header Deposit primary）|
| `danger` | `.btn-danger` | 危險：白底 + 紅邊（未實際使用）|

## Sizes

| Size | Padding | Font |
| --- | --- | --- |
| `sm` | `py-1.5 px-3` | 12px medium |
| `md`（default） | `py-2.5 px-4` | 14px semibold |
| `lg` | `py-3.5 px-6` | 16px bold |

## States

- `default`
- `hover` — `primary` 加 shadow-pill，`outline` 邊框換主色
- `disabled` — 灰漸層 + cursor-not-allowed + shadow 消失
- `loading` — 替換文字為 Spinner + `Processing...`

## Guidelines

- 主 CTA **永遠**用 `primary`（紫漸層）
- 一個頁面**最多一個**主 CTA（除非是多步驟表單）
- 阻擋狀態下的 disabled 主 CTA 文案要說明「為什麼 disabled」，例如 `🔒 Locked — Complete the requirements above`
- 不要同時用 `primary` + `yellow`（視覺爭搶）
- 圓角一律 pill；方形按鈕違反設計語言

## Do / Don't

**✅ Do**
```html
<button class="btn-primary">Claim Now</button>
<button class="btn-outline">View T&C</button>
```

**❌ Don't**
```html
<!-- 方形 radius -->
<button class="rounded-lg bg-brand-purple text-white">Submit</button>
<!-- 同時多個 primary -->
<button class="btn-primary">Save</button> <button class="btn-primary">Submit</button>
```
