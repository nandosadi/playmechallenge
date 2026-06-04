# PlayMe — Claude Code Build Brief
## PWA · Vercel · Know Me Challenge

---

## What you're building

A mobile-first Progressive Web App (PWA) that runs two sequential interactive prototype flows for a financial AI product called **PlayMe**. It is a design prototype — no real backend, no auth, no real money movement. All data is hardcoded.

The app must feel native on a smartphone: installable from the browser, full-screen, smooth transitions, no visible browser chrome once added to the home screen.

---

## Tech stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS with a custom theme extending the design tokens below
- **Fonts:** Inter (400, 600, 700) + JetBrains Mono (500) via `next/font/google`
- **PWA:** `next-pwa` package for service worker and manifest generation
- **Deployment:** Vercel (connect GitHub repo → auto-deploy on push to `main`)
- **No backend required.** No database, no API routes, no auth.

---

## Project structure

```
playme/
├── app/
│   ├── layout.tsx          # Root layout: fonts, viewport meta, PWA meta tags
│   ├── page.tsx            # Entry point — renders <AppShell />
│   └── globals.css         # Tailwind base + CSS custom properties
├── components/
│   ├── AppShell.tsx        # Top-level state machine: controls which flow is active
│   ├── flows/
│   │   ├── FlowA.tsx       # Purchase moment intercept (5 screens)
│   │   └── FlowB.tsx       # Idle cash investment (5 screens)
│   └── ui/
│       ├── Card.tsx
│       ├── Button.tsx
│       ├── NotifCard.tsx
│       ├── Row.tsx
│       ├── Toggle.tsx
│       └── StepDots.tsx
├── public/
│   ├── manifest.json
│   ├── icon-192.png        # App icon (generate a simple blue square with "P")
│   └── icon-512.png
├── next.config.js          # next-pwa config
├── tailwind.config.js      # Custom theme tokens
└── package.json
```

---

## PWA requirements

### `public/manifest.json`
```json
{
  "name": "PlayMe",
  "short_name": "PlayMe",
  "description": "AI-powered financial optimization — Know Me Challenge prototype",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F4F6FA",
  "theme_color": "#2D6BFF",
  "orientation": "portrait",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

### `app/layout.tsx` — required meta tags
```tsx
<meta name="application-name" content="PlayMe" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="PlayMe" />
<meta name="theme-color" content="#2D6BFF" />
<link rel="apple-touch-icon" href="/icon-192.png" />
<link rel="manifest" href="/manifest.json" />
```

### `next.config.js`
```js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  // no other config needed
})
```

---

## Design system — Tailwind theme

Extend `tailwind.config.js` with these exact tokens. Do not use arbitrary values in JSX — always use the named tokens.

```js
theme: {
  extend: {
    colors: {
      primary:          '#2D6BFF',
      'primary-active': '#1F52CC',
      'primary-dis':    '#B9CCFF',
      secondary:        '#0E1F44',
      canvas:           '#F4F6FA',
      soft:             '#EEF3FF',
      card:             '#FFFFFF',
      dark:             '#0E1F44',
      ink:              '#0E1116',
      body:             '#3A4151',
      muted:            '#6B7280',
      'muted-soft':     '#9AA3B2',
      hairline:         '#E5E9F0',
      'hairline-soft':  '#EEF0F4',
      success:          '#3CCB7F',
      error:            '#E5484D',
    },
    borderRadius: {
      sm:   '8px',
      md:   '12px',
      lg:   '16px',
      xl:   '20px',
      full: '9999px',
    },
    fontFamily: {
      sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
    },
    fontSize: {
      'display':    ['28px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
      'headline-lg':['22px', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '700' }],
      'headline-md':['17px', { lineHeight: '1.3',  fontWeight: '600' }],
      'body-lg':    ['16px', { lineHeight: '1.5',  fontWeight: '400' }],
      'body-md':    ['14px', { lineHeight: '1.5',  fontWeight: '400' }],
      'label-sm':   ['12px', { lineHeight: '1.2',  letterSpacing: '0.06em', fontWeight: '600' }],
      'mono-sm':    ['12px', { lineHeight: '1.4',  fontWeight: '500' }],
    },
    boxShadow: {
      card: '0 1px 2px rgba(14,17,22,0.04)',
    },
    spacing: {
      'container': '20px',
    },
  },
}
```

---

## Design rules (enforce throughout)

These come directly from the design system. Violations are bugs, not style choices.

1. **Single-column layout only.** No grid, no flex-row for content. Horizontal flex is allowed inside row components (icon + label + value).
2. **Card = one mental model.** If two ideas want to share a card, they get two cards.
3. **Green (`success: #3CCB7F`) for status dots only.** Never use it as a surface, button fill, or text color.
4. **Navy (`secondary: #0E1F44`) for system-authority moments only.** The rule-setting toggle card in Flow A gets the navy trust treatment.
5. **Buttons:** Primary = solid blue, 52px height, 12px radius. Secondary = white bg + blue border, same 52px height. Always pair them when offering a choice.
6. **Section labels:** Always uppercase, `label-sm` (12px / 600 / tracked), `muted` color.
7. **Shadows:** Max `shadow-card` (`0 1px 2px rgba(14,17,22,0.04)`). Never dramatic.
8. **Screen background is `canvas` (#F4F6FA), not white.** Cards float on canvas.
9. **Promo card (Flow A screen 2 intercept banner):** Full `primary` blue surface, white text. This is the highest-attention moment.
10. **WCAG AA:** 4.5:1 for body text, 3:1 for large text and UI components.

---

## App flow — state machine

The entire app is controlled by a single top-level state machine in `AppShell.tsx`. No routing — everything lives on one page with animated transitions between screens.

```
State shape:
{
  flow: 'A' | 'B',
  step: 0 | 1 | 2 | 3 | 4,
  ruleEnabled: boolean,        // Flow A only
  selectedProduct: string | null  // Flow B only
}
```

**Transition logic:**
- `next()` — advance step within the current flow
- `back()` — go back one step (except step 0)
- When Flow A reaches step 4 (Outcome) and user taps "Back to home":
  - Reset step to 0
  - Switch flow to `'B'`
  - Show a **brief transition screen** (0.8s): canvas background, centered PlayMe wordmark, subtitle "Next up: your idle cash" — then auto-advance into Flow B step 0
- When Flow B reaches step 4 (Outcome) and user taps "Back to home":
  - Reset everything to Flow A step 0 (loop back for demo purposes)

**Screen transition animation:**
- Outgoing screen: `translateX(0) → translateX(-100%)` + `opacity 1 → 0` over 300ms
- Incoming screen: `translateX(100%) → translateX(0)` + `opacity 0 → 1` over 300ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Use `position: absolute; inset: 0` on each screen within a `position: relative; overflow: hidden` container

---

## Flow A — Purchase moment intercept

### Screen data
```ts
const FLOW_A_LABELS = ['Home', 'Intercept', 'Logic', 'Confirm + rule', 'Outcome']
```

---

### Screen 0 — Home

**Section label:** `PlayMe · Mission Engine`
**Balance display:**
- Label: `Wednesday, Jun 3 · 2:14 PM`
- Amount: `$47,840` (display-lg)
- Sub: `across 4 accounts`

**Notification card** (tappable → go to step 1):
- Left border: 3px solid `primary`
- Label: `OPTIMIZATION MISSION READY`
- Text: `You're about to pay your electricity bill. There's a smarter way to do this.`
- Sub: `Tap to see system recommendation`

**Card — Active goals:**
- Row: `Home down payment` / `61% · Mar 2027` (primary)
- Row: `Barcelona trip` / `71% · Nov 2026`

**Card — Upcoming payments:**
- Row: `Electricity bill` / `$148 · Jun 6` (mono)
- Row: `Rent` / `$1,800 · Jun 14` (mono)
- Row: `Subscriptions` / `$47 · Jun 18` (mono)

---

### Screen 1 — Intercept

**Section label:** `Purchase intercept`
**Title:** `Before you pay —` / `here's the smarter path.` (primary)

**Promo card** (full primary blue surface, white text):
- Label: `SYSTEM RECOMMENDATION`
- Headline: `Pay with Rewards Card ending 4821, not your checking account.`
- Sub: `Earn 3x points on utilities. Keep checking buffer intact. Goal stays on track.`

**Compare grid** (two columns):
- Left box (canvas bg, hairline border):
  - Label: `YOUR PLAN`
  - Value: `Checking` (muted, bold)
  - Detail: `Direct debit · $148 / 0 rewards earned / Buffer drops to $4,062`
- Right box (soft bg, primary-dis border):
  - Label: `RECOMMENDED`
  - Value: `Rewards Card` (primary-active, bold)
  - Detail: `3x points · $148 / 444 pts earned / Buffer stays at $4,210`

**Tags row:** `3x utility points` · `buffer preserved` · `goal on track` (green pill)

**Primary CTA:** `See the reasoning` → step 2
**Secondary CTA:** `Apply recommendation` → step 3

---

### Screen 2 — Logic

**Section label:** `System logic`
**Title:** `Why this is the` / `best move right now.` (primary)

**Card — Three signals checked:**

Each row: circular icon container (soft bg) + content block

1. Icon: 💳
   - Title: `Rewards card eligible`
   - Detail: `Your Sapphire card earns 3x on utilities. Bill qualifies as a utility merchant.`
   - Value: `+444 points on $148` (primary)

2. Icon: 🛡️
   - Title: `Cash flow protected`
   - Detail: `Checking stays at $4,210 — well above your $1,200 floor. Rent on Jun 14 unaffected.`
   - Value: `$3,010 above floor after rent` (primary)

3. Icon: 🎯
   - Title: `Goal velocity maintained`
   - Detail: `Keeping checking intact means your $500 goal transfer on Jun 8 executes without risk.`
   - Value: `Down payment on track for Dec 2026` (primary)

**Card — Points value:**
- Row: `Points earned` / `444 pts` (mono)
- Row: `Redemption value (travel)` / `~$6.66` (primary)
- Row: `Annual impact at this rate` / `~$80/yr` (primary)

**Primary CTA:** `Apply recommendation` → step 3
**Secondary CTA:** `Set as rule for utility bills` → step 3

---

### Screen 3 — Confirm + rule

**Section label:** `Confirm + set rule`
**Title:** `Apply this once,` / `or make it automatic.` (primary)

**Card — standard — Applying now:**
- Row: `Payment method` / `Rewards Card · 4821`
- Row: `Amount` / `$148.00` (mono)
- Row: `Points earned` / `444 pts` (primary)
- Row: `Checking buffer after` / `$4,210 (unchanged)`

**Trust card** (navy `#0E1F44` surface, white text):
- Title: `Save as rule`
- Description: `"Always use my Rewards Card for utility payments when the rewards rate is 2x or higher and checking buffer stays above $1,200."`
- Toggle row: label `Enable this rule` + `<Toggle>` component
- When toggle ON: show helper text `Future utility bills will automatically use your Rewards Card. You'll be notified after each action.` (white 60% opacity)
- CTA label changes: OFF → `Confirm this payment` / ON → `Confirm + save rule`
- Hint text changes: OFF → `You can set this as a rule after confirming` / ON → `Rule active from next payment · editable anytime in settings`

**Primary CTA:** dynamic label (see above) → step 4
**Tertiary CTA:** `Pay from checking instead` → step 4

---

### Screen 4 — Outcome

**Success icon:** 52px circle, soft bg, `✓` in primary

**Section label:** `Mission complete` (centered)
**Title:** `Payment made.` / `Rewards captured.` (primary, centered)

**Win strip** (white card, green left-dot status indicator):
- Dot: 8px `success` green
- Main: `+444 points earned`
- Sub: `~$6.66 value · 3x on utilities`

**Card — Payment summary:**
- Row: `Electricity · Jun 3` / `$148.00` (mono)
- Row: `Paid with` / `Rewards Card · 4821`
- Row: `Points earned` / `444 pts` (primary)
- Row: `Checking buffer` / `$4,210 · intact`
- Row: `Down payment goal` / `On track ↑` (success green)

**Card — Running totals · this month:**
- Row: `Total points via PlayMe` / `1,280 pts` (primary)
- Row: `Est. annual rewards value` / `~$80` (primary)
- Row: `Optimization missions run` / `7 this month`

**Primary CTA:** `Back to home` → triggers transition to Flow B (see state machine above)

---

## Flow B — Idle cash investment

### Screen data
```ts
const PRODUCTS = [
  {
    id: 'hysa',
    name: 'High-Yield Savings',
    rate: '4.85%',
    liquidity: 'Instant',
    liquidityVariant: 'green',  // pill color
    risk: 'No risk',
    protection: 'FDIC insured',
    note: 'Fully liquid any time. Best for cash you might need soon.',
    annual: 155.20,
  },
  {
    id: 'cd',
    name: 'No-Penalty CD',
    rate: '5.10%',
    liquidity: '7-day exit',
    liquidityVariant: 'amber',
    risk: 'No risk',
    protection: 'FDIC insured',
    note: 'Slightly better rate. Exit after 7 days with no penalty.',
    annual: 163.20,
  },
  {
    id: 'tbill',
    name: 'T-Bill (3-month)',
    rate: '5.28%',
    liquidity: 'Locked 90d',
    liquidityVariant: 'red',
    risk: 'No risk',
    protection: "Gov't backed",
    note: 'Best rate. US government backed. Locked until Sep 1.',
    annual: 168.96,
  },
]

const AMOUNT = 3200
```

---

### Screen 0 — Home

**Section label:** `PlayMe · Idle Cash`
**Balance display:**
- Label: `Wednesday, Jun 3`
- Amount: `$47,840`
- Sub: `across 4 accounts`

**Notification card** (tappable → step 1):
- Label: `IDLE CASH DETECTED`
- Text: `$3,200 has been sitting in checking for 45 days, earning almost nothing.`
- Sub: `Tap to see what it could be doing`

**Card — Account balances:**
- Row: `Chase Checking` / `$4,210` (mono)
- Row: `High-Yield Pocket` / `$31,400` (mono)
- Row: `Savings` / `$12,230` (mono)

**Card — Upcoming bills · covered:**
- Row: `Rent · Jun 14` / `$1,800` (mono)
- Row: `Utilities + subs` / `$195` (mono)
- Row: `Buffer after bills` / `$2,215 safe` (primary)

---

### Screen 1 — Analysis

**Section label:** `Idle cash analysis`
**Title:** `$3,200 sitting still` / `for 45 days.` (primary)

**Opportunity cost card** (standard card, NOT alarming — uses ink/muted colors only per design system):
- Section label inside: `OPPORTUNITY COST`
- Big number: compute `((3200 * 0.0485) / 365 * 45).toFixed(2)` → displays as `$19.03`
- Right label: `in 45 days`
- Sub text: `At 4.85% APY, this money could have earned $19.03. Instead it earned ~$0.14 in checking.`

**Yield compare (two columns):**
- Left (canvas bg, hairline border):
  - Label: `EARNING NOW`
  - Rate: `0.01%` (muted, large)
  - Sub: `~$0.32/yr`
- Right (soft bg, primary-dis border):
  - Label: `COULD EARN`
  - Rate: `4.85%+` (primary-active, large)
  - Sub: `$155–$169/yr`

**Card — Why $3,200 is moveable:**
- Row: `Checking balance` / `$4,210` (mono)
- Row: `Bills before paycheck` / `$1,010` (mono)
- Row: `Safely moveable` / `$3,200` (primary)

**Primary CTA:** `See where it could go` → step 2

---

### Screen 2 — Choose product

**Section label:** `Choose a destination`
**Title:** `Pick how hard` / `$3,200 works.` (primary)

**Three product option cards** — each is a tappable card component:

```
Product card structure:
- Top row: product name (headline-md, ink) | APY label + rate (primary, bold)
- Pills row: liquidity pill (color by variant) + "No risk" pill (muted) + protection pill (green)
- Bottom row: "Est. gain on $3,200/yr" (muted) | "+$155" (primary, bold)
- Note text (body-md, muted)
- When selected: border-color → primary, bg → soft, "Selected" badge (primary bg, white text, full-radius pill)
```

**Liquidity pill colors:**
- `green` variant: `#EBF9F1` bg, `#1A7A47` text
- `amber` variant: `#FFF7ED` bg, `#B45309` text
- `red` variant: `#FFF1F2` bg, `#BE123C` text

**Primary CTA:** disabled until a product is selected. When selected: `Continue with {product.name}` → step 3
**Hint:** `All three keep your money safe — the tradeoff is liquidity vs. rate.`

---

### Screen 3 — Confirm

**Section label:** `Confirm placement`
**Title:** `$3,200 →` / `{selectedProduct.name}.` (primary)

**Card — Summary:**
- Row: `Amount` / `$3,200` (mono)
- Row: `Product` / `{name}`
- Row: `APY` / `{rate}` (primary, mono)
- Row: `Liquidity` / `{liquidity}`
- Row: `Protected by` / `{protection}`
- Row: `Checking after` / `$1,010 · bills covered` (primary)

**Projection bar chart** (soft bg card):
- Label: `PROJECTED EARNINGS ON $3,200`
- Four rows:

| Period | Earn (computed) | Bar width |
|---|---|---|
| 1 month | `(annual/12).toFixed(2)` | 8% |
| 3 months | `(annual/4).toFixed(2)` | 25% |
| 6 months | `(annual/2).toFixed(2)` | 50% |
| 12 months | `annual.toFixed(2)` | 100% |

Bar: `height: 4px`, bg `primary-dis`, fill `primary`, radius full. Value in JetBrains Mono, primary-active.

**Primary CTA:** `Confirm — place $3,200` → step 4
**Secondary CTA:** `Change product` → step 2
**Hint:** `No fees · reversal available per product terms`

---

### Screen 4 — Outcome

**Success icon:** 52px circle, soft bg, `✓` primary

**Section label:** `Placement confirmed` (centered)
**Title:** `Your money is` / `working now.` (primary, centered)

**Win strip:**
- Dot: `success` green
- Main: `$3,200 placed at {rate} APY`
- Sub: `Est. +${annual.toFixed(0)}/yr vs. ~$0.32/yr in checking`

**Card — Placement details:**
- Row: `Product` / `{name}`
- Row: `Amount placed` / `$3,200` (mono)
- Row: `APY` / `{rate}` (primary, mono)
- Row: `First interest credit` / `Jul 3, 2026`
- Row: `Checking balance` / `$1,010 · covered`

**Card — What happens next:**
- Row: `Jul 3 — first interest` / `+${(annual/12).toFixed(2)}` (success green, mono)
- Row: `Jun 14 — rent auto-pay` / `from checking ✓`
- Row: `Jun 25 — next paycheck` / `checking replenished`

**Primary CTA:** `Back to home` → reset to Flow A step 0 (loop)

---

## Component specs

### `<Toggle />` props
```ts
interface ToggleProps {
  enabled: boolean
  onChange: (val: boolean) => void
}
```
- Track: 40×22px, `border-radius: full`
- Track colors: OFF → `#3A4151` (body, inside navy card), ON → `primary`
- Thumb: 18×18px white circle, `top: 2px`, `left: 2px` (OFF) or `left: 20px` (ON)
- Transition: `left 200ms ease`, `background 200ms ease`
- Thumb shadow: `0 1px 3px rgba(0,0,0,0.2)`

### `<StepDots />` props
```ts
interface StepDotsProps {
  total: number
  current: number
}
```
- Inactive dot: 5×5px circle, `hairline` color
- Active dot: 16×5px, `primary`, `border-radius: full`
- Transition: `all 200ms`

### `<NotifCard />` props
```ts
interface NotifCardProps {
  label: string
  text: string
  sub: string
  onClick: () => void
}
```
- White bg, 1px hairline border, 3px left border `primary`
- Border radius: `lg` (16px), but top-left and bottom-left are `0` (straight left edge due to the colored left border)
- Box shadow: `shadow-card`

### `<Button />` props
```ts
type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
interface ButtonProps {
  variant: ButtonVariant
  label: string
  onClick: () => void
  disabled?: boolean
  fullWidth?: boolean
}
```

### `<Row />` props
```ts
interface RowProps {
  label: string
  value: string
  valueVariant?: 'default' | 'primary' | 'green' | 'mono'
  noBorder?: boolean
}
```

---

## Transition screen between Flow A → Flow B

After Flow A step 4 CTA is tapped:

1. Current screen fades out (300ms)
2. Transition screen appears (canvas bg, centered content):
   - PlayMe wordmark: `12px / 600 / muted-soft / uppercase / tracked`
   - Spacer
   - Title: `Next up` (display-lg, ink)
   - Sub: `Let's look at your idle cash.` (body-md, muted)
   - A small animated loading indicator (three dots pulsing in `primary`, or a thin `primary` line growing across the bottom of the screen — keep it minimal)
3. After 900ms auto-advance to Flow B step 0

---

## Vercel deployment

1. Push repo to GitHub (public or private)
2. Go to [vercel.com](https://vercel.com) → New Project → Import GitHub repo
3. Framework preset: **Next.js** (auto-detected)
4. No environment variables needed
5. Deploy — Vercel assigns a `.vercel.app` URL

**To test as a PWA on iPhone:**
1. Open the Vercel URL in Safari
2. Tap the Share button → `Add to Home Screen`
3. The app installs and opens in standalone mode (no browser chrome)

**To test on Android:**
1. Open in Chrome
2. Tap the three-dot menu → `Add to Home Screen` / `Install app`

---

## Things to not do

- Do not add a back-end, database, or API routes. This is a static prototype.
- Do not use `localStorage` or `sessionStorage`. State lives in React only.
- Do not add animations beyond the specified screen slide transitions and toggle transitions. The design system is intentionally calm.
- Do not add a tab bar. This prototype is a single linear flow — no navigation chrome.
- Do not use arbitrary Tailwind values (e.g., `w-[130px]`). If a value isn't in the theme, add it to `tailwind.config.js` first.
- Do not install unnecessary packages. This app needs: `next`, `react`, `react-dom`, `next-pwa`, `tailwindcss`, `autoprefixer`, `postcss`. Nothing else.
- Do not use green as a surface color, button fill, or text color outside of the win-strip status dot and the "On track ↑" value in Flow A outcome.

---

## Final checklist before deploying

- [ ] App opens in Safari iOS and can be added to home screen
- [ ] Standalone mode hides browser chrome (no address bar visible)
- [ ] Theme color (`#2D6BFF`) shows in the iOS status bar
- [ ] Both flows complete end-to-end without errors
- [ ] Flow A → transition screen → Flow B works sequentially
- [ ] Flow B outcome "Back to home" resets to Flow A (loop)
- [ ] Toggle on Flow A screen 3 changes CTA label and hint text
- [ ] Product selector on Flow B screen 2 enables the CTA when a product is selected
- [ ] Projection values on Flow B screen 3 reflect the selected product's `annual` value
- [ ] Outcome screen on Flow B reflects selected product name, rate, and computed monthly interest
- [ ] Screen transitions are smooth at 60fps on a real device (test on actual hardware, not just simulator)
- [ ] No console errors in production build (`next build && next start`)
