# Ant Design Admin Boilerplate

Vite + React 19 + Ant Design 5 admin starter with Pro Components. Every data call is mocked in memory, so it runs with no backend.

## Requirements

- Node.js `^20.19` or `>=22.12` (required by Vite 8)
- pnpm 11 — `corepack enable` picks up the version pinned in `package.json`

## Getting started

```bash
pnpm install
pnpm dev
```

Open the printed URL, then sign in with any valid email and a password of at least six characters. No credentials are checked.

## Scripts

| Script              | What it does                       |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | Vite dev server with HMR           |
| `pnpm build`        | Type-check, then build to `dist/`  |
| `pnpm preview`      | Serve the built `dist/` locally    |
| `pnpm type-check`   | `tsc --noEmit`                     |
| `pnpm lint`         | ESLint over the repo               |
| `pnpm lint:fix`     | ESLint with autofix                |
| `pnpm format`       | Prettier, writing changes          |
| `pnpm format:check` | Prettier, check only (CI-friendly) |

`pnpm build` runs `tsc --noEmit` first, so type errors fail the build.

## How it fits together

### Data flows through three layers

1. `src/mocks/api.ts` — the only stateful module. The `users` array lives in memory, every call resolves after 250 ms, nothing touches the network.
2. `src/api/modules/*.api.ts` — adapters that call the mock and shape the result into `PaginatedResponse<T>`.
3. Pages — import from `@/api/modules/*`, never from the mock directly.

To use a real backend, rewrite layer 2 and keep the `PaginatedResponse<T>` contract. `useProTable` and the tables keep working unchanged.

### Routes are declared once

`src/routes/routeDefinitions.tsx` holds `protectedRoutes` and `authRoutes`, all lazy-loaded. `src/routes/index.tsx` turns them into `<Routes>`; `src/layouts/MainLayout.tsx` independently reads `protectedRoutes` to build the sidebar. Adding a page means adding one entry to that file.

Paths are relative (`users`, not `/users`) because they nest under a layout route; `MainLayout` re-prefixes them with `/` for menu keys. `AuthGuard` wraps the whole authenticated branch and redirects to `/login` when there is no user.

### Auth is a stub

`src/contexts/AuthContext.tsx` keeps `{ name, email }` in `sessionStorage` — no token, no server call, no role enforcement. `UserRole` exists only for display. Replace the context when you add real auth.

### Tables

`src/hooks/useProTable.ts` centralizes the ProTable setup — pagination, search, toolbar options, `PaginatedResponse` unwrapping — and reads `message` from `App.useApp()` so toasts inherit the configured theme. Use it for new list screens. Columns for the users table live in `src/pages/users/UserColumn.tsx`.

## Theming

Two places to change, and they are not linked to each other:

- `src/constants/app.ts` — `APP_CONFIG` (name, logo, version, brand colors) plus `appTheme`, the Ant Design `ThemeConfig` passed to `ConfigProvider`. This is the rebrand entry point.
- `src/styles/variables.less` — LESS variables duplicating the palette for hand-written CSS.

`src/styles/index.less` is the only stylesheet entry point, imported once in `src/main.tsx`. It imports `variables.less` first; the other partials depend on that ordering and do not import variables themselves, so keep new `@import` lines below it.

`@/` resolves to `src/` and is declared in both `vite.config.ts` and `tsconfig.json`.

## Code style

Prettier owns formatting, ESLint owns correctness, `.editorconfig` covers editors that read neither. `pnpm format` and `pnpm lint:fix` fix most issues in place.

ESLint runs typescript-eslint's type-checked rules, so floating promises, misused promises in handlers, and hook dependency mistakes are caught statically. Two deliberate rule adjustments live in `eslint.config.js`, each with a comment explaining why.

## Known gaps

- No test runner and no CI configuration.
- No error boundary — an unexpected render error blanks the page.
- The mock `users` array is module state, so it is shared across tabs and reset on reload.
