# CLAUDE.md — Ice Pak Roster Planning

This document describes the codebase structure, conventions, and development workflows for AI assistants working on this project.

## Project Overview

**Ice Pak Roster Planning** is a client-side roster management tool for an ice hockey team. It lets you manage 38 players across two leagues (SLC County and Mammoth Ice Center), assign league statuses, filter by position, and see real-time cost calculations.

The app is a **zero-dependency vanilla JavaScript SPA** — no frameworks, no build tools, no package manager. Open `index.html` in any modern browser and it works immediately.

## File Structure

```
roster-maker/
├── index.html     # App shell (20 lines) — mounts styles, script, and layout skeleton
├── script.js      # All application logic (~792 lines) — data, rendering, events
├── styles.css     # All styling (~460 lines) — CSS custom properties, dark theme
└── .gitignore     # Standard Node.js template (copied; no build tooling actually used)
```

There is no `package.json`, no `node_modules`, no build step, and no test suite.

## Running Locally

Serve the root directory with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code Live Server extension also works
```

Then open `http://localhost:8080` in a browser. No compilation required.

## Architecture: script.js

All logic lives in a single flat file. There are no classes, modules, or imports — just plain functions and a few top-level constants.

### Data

**`LEAGUES`** (top of file) — two leagues with their costs and game counts:
```js
LEAGUES.county  // SLC County:          $2,750 total cost, 11 guaranteed games
LEAGUES.mic     // Mammoth Ice Center:  $3,600 total cost, 16 guaranteed games
```

**`players`** array — 38 player objects. Each player has:

| Field | Type | Values |
|---|---|---|
| `id` | string | `"p6"` – `"p38"` (IDs p1–p5 were removed historically; do not reuse them) |
| `name` | string | Full name, e.g. `"Troy Johnson"` |
| `notes` | string | Optional context note shown in the player accordion |
| `primaryPosition` | string | `"F"`, `"D"`, or `"G"` |
| `secondaryPosition` | string | `"F"`, `"D"`, or `"G"` |
| `priorityTier` | string | `"Tier 1"`, `"Tier 2"`, or `"Tier 3"` |
| `leagueStatus` | object | `{ county: "full time"\|"part time"\|"non-roster", mic: … }` |
| `isInjuredReserve` | boolean | Shows red IR badge in player list |
| `isOnVacation` | boolean | Shows yellow vacation badge in player list |

**Constants** (defined near the top):
- `POSITION_OPTIONS` — `["F", "D", "G"]`
- `LEAGUE_STATUS_OPTIONS` — `["full time", "part time", "non-roster"]`
- `PRIORITY_TIER_OPTIONS` — `["Tier 1", "Tier 2", "Tier 3"]`
- `LEAGUE_STATUS_PRIORITY` — numeric sort weights: `full time=0`, `part time=1`, `non-roster=2`

**`uiState`** — only one piece of transient state: `{ filters: { position: "all" } }`.

### Rendering Pipeline

The app uses a **full-redraw pattern**: every state change calls `renderBoard()`, which rebuilds the entire DOM for `#board` and `#board-controls` from scratch.

```
renderBoard()
  └── renderToolbar()             → rebuilds #board-controls
  └── buildPlayerManagementColumn()  → left column: player list with accordions
  └── buildLeagueColumn("county")    → middle column: SLC County roster
  └── buildLeagueColumn("mic")       → right column: MIC roster
```

`renderBoard()` is also called on `window.resize` to handle responsive name formatting.

**Key rendering functions:**

| Function | Purpose |
|---|---|
| `buildPlayerManagementColumn(players)` | Left panel. Renders each player as a `<details>` accordion with dropdowns for position, league status, and priority tier. |
| `buildLeagueColumn(leagueKey, players)` | Right panels. Groups assigned players by Forward/Defense/Goalie/Part Time; calculates FT/HT cost. |
| `buildRosterSection(title, players, class, playersPerLine)` | Renders a single positional group (e.g. "Forward") inside a league column. |
| `chunkPlayers(players, size)` | Splits player array into lines (3 forwards/line, 2 defensemen/line, 1 goalie/line). |
| `renderToolbar()` | Position filter dropdown + player count display. |
| `setupTooltipBehavior()` | Ensures only one info tooltip is open at a time (called once at startup). |

### Cost Calculation

Part-time players count as 0.5 in the weighted roster size:

```js
const weightedPlayerCount = fullTimePlayers.length + partTimePlayers.length * 0.5;
const fullTimeCost = league.totalCost / weightedPlayerCount;
const halfTimeCost = fullTimeCost / 2;
const fullTimeCostPerGame = fullTimeCost / league.guaranteedGames;
```

### Sorting

- **Player management column**: alphabetical by last name (`sortPlayersByLastName`)
- **League columns**: by status priority (FT → PT), then primary position (F → D → G), then last name (`sortRosterPlayers`)

### Responsive Name Formatting

At `≤768px`, `getRosterDisplayName()` switches to first-initial + last-name format (e.g. `"T. Johnson"`). This is evaluated via `window.matchMedia` on every render, which is why `renderBoard` is bound to `resize`.

## Architecture: styles.css

Uses CSS custom properties for the entire color system:

```css
--bg: #2b2f36          /* page background */
--surface: #1f242d     /* card/column background */
--surface-2: #2a303a   /* tertiary surface */
--text: #f4f7fb        /* primary text */
--muted: #c6cfdb       /* secondary text */
--border: #465061      /* borders */
```

**Layout breakpoints:**
- `>1181px` — 3-column board grid (`1.35fr 1fr 1fr`)
- `≤1181px` — narrower columns, form controls wrap
- `≤768px` — abbreviated player names in roster display

**Color coding:**
- County league accents: red/maroon (`#6f1d1b`)
- MIC league accents: blue (`#8ecbff`)
- Injured Reserve badge: red (`#f26b6b`)
- On Vacation badge: yellow (`#f2c26b`)
- Tier 1 "IP" superscript: muted gold

**Tooltip `<details>` elements** use the classes `.league-info`, `.roster-size-info`, and `.cost-info`. Their `<summary>` triggers open popups; `setupTooltipBehavior()` manages mutual exclusion.

## Git Workflow

- **Branch naming**: `codex/[feature-description]` or `[user]/[description]` for non-Claude branches; `claude/[description]-[id]` for Claude branches
- **PR-based workflow**: all changes go through pull requests into `main` (or `master`)
- **Commit style**: short, imperative, lower-case — e.g. `"Set Ned White MIC status to full time"`, `"Consolidate tooltip styles into shared CSS rules"`
- **Signed commits**: enabled via SSH signing key at `/tmp/code-sign`

## Common Tasks

### Adding a new player

Add an entry to the `players` array in `script.js`. Use the next available ID (currently `p39`, incrementing from the last in the array). Match the existing object shape exactly:

```js
{
  id: "p39",
  name: "First Last",
  notes: "",
  primaryPosition: "F",   // "F", "D", or "G"
  secondaryPosition: "F",
  priorityTier: "Tier 1", // "Tier 1", "Tier 2", or "Tier 3"
  leagueStatus: { county: "non-roster", mic: "non-roster" },
  isInjuredReserve: false,
  isOnVacation: false,
}
```

### Removing a player

Delete their entry from the `players` array. Do **not** reuse the removed player's ID.

### Updating league costs or game counts

Edit the `LEAGUES` constant at the top of `script.js`. Cost calculations are derived dynamically on every render.

### Adding a new CSS component

Follow the existing pattern: add a descriptive class name, use `var(--token)` for all colors, and add it near related components in `styles.css`. No scoping or specificity tricks — the file is structured by component order.

## What This Project Does Not Have

- No tests (no Jest, Vitest, or any test runner)
- No build step (no Webpack, Vite, Rollup, etc.)
- No TypeScript
- No CSS preprocessor
- No linter or formatter configuration
- No backend or API — all data is hardcoded in `script.js`
- No persistence — changes are lost on page refresh

When making changes, do not introduce any of the above unless explicitly requested. Keep the project dependency-free.
