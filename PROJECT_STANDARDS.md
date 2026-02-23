# Project standards

Use these conventions for all current and future work. They are the source of truth for structure and where things live.

---

## Data

- **All mock data, constants, fixtures, mock responses, and sample datasets go in `src/data`** (or `src/db` if you introduce a database layer).
- Keep JSON datasets, form templates, and any mock API data under `src/data`. Use `src/data.js` as the main re-export for app data if you want a single entry point; individual modules (e.g. `src/data/messaging.js`, `src/data/layout.js`) are fine for feature-specific mocks.

---

## Components

- **Components live in the components structure, with Playbook Components first.**
- Prefer **Playbook Components** (`src/playbook-components`) whenever they provide an equivalent. Use the barrel or `@kitman/playbook` aliases.
- App-level React components live under `src/components/` (layout, navigation, pages-specific UI). Do not add new one-off components at the repo root; keep them under `src/components` or the appropriate subfolder.

---

## Design / UI

- **The design and UI layer follows the component system and wrappers, with Playbook Components as the first choice.**
- Use Playbook wrappers (e.g. Button, DataGrid, DatePicker, Drawer, Toasts) before reaching for raw MUI. See `DESIGN_SYSTEM.md` for tokens, buttons, icons, and text rules.

---

## Quick reference

| What                | Where                                      |
|---------------------|--------------------------------------------|
| Mock data / fixtures| `src/data` (or `src/db`)                   |
| Components          | `src/components`; prefer `src/playbook-components` |
| Design tokens       | `src/styles/design-tokens.css`            |
| Design rules        | `DESIGN_SYSTEM.md`                        |
| Dev setup           | `DEV_GUIDE.md`                            |
