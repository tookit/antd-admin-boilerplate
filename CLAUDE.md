# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install
pnpm dev            # Vite dev server
pnpm build          # tsc --noEmit && vite build
pnpm type-check     # tsc --noEmit
pnpm lint           # eslint .
pnpm lint:fix
pnpm format         # prettier --write .
pnpm format:check
```

pnpm is the package manager (`packageManager` field pins the version; `pnpm-lock.yaml` is the only lockfile). There is no test runner — `pnpm type-check`, `pnpm lint`, and `pnpm build` are the available checks. Run them after changes.

`@vitejs/plugin-react@6` and `vite@8` are required together (the plugin peers on `^8.0.0`). Vite 8 is Rolldown-based — consult rolldown documentation, not esbuild, when touching build config.

## Architecture

### Data flows mock-first, in three layers

1. `src/mocks/api.ts` — the only stateful module. In-memory `users` array, 250 ms artificial latency, no HTTP. Mutations last for the browser session only.
2. `src/api/modules/*.api.ts` — adapters that call the mock and shape responses into `PaginatedResponse<T>` (from `@/types`). Filtering and pagination happen client-side in `getUserList`.
3. Pages — import from `@/api/modules/*`, never from `@/mocks/api`.

To connect a real backend, rewrite layer 2 and keep the `PaginatedResponse<T>` contract so `useProTable` and the tables keep working.

`UserInput` and `UserFormValues` in `src/types/index.ts` are the shared shapes: `UserInput` is the upsert payload (`id` present means update), `UserFormValues` the form subset the client may submit.

### Routes are declared once, consumed twice

`src/routes/routeDefinitions.tsx` is the single source of truth: `protectedRoutes` (with `name`/`icon`/`hideInMenu`) and `authRoutes`, all lazy-loaded. `src/routes/index.tsx` maps them into `<Routes>`; `src/layouts/MainLayout.tsx` independently consumes `protectedRoutes` to build the ProLayout menu.

Adding a page = add one entry to `routeDefinitions.tsx`. Paths are relative (`'users'`, not `'/users'`) because they nest under layout routes; `MainLayout` re-prefixes them with `/` for menu keys.

`AuthGuard` in `routes/index.tsx` wraps the whole `MainLayout` branch and redirects to `/login` when unauthenticated.

### Auth

`src/contexts/AuthContext.tsx` holds a mock user (`{ name, email }`, no token) persisted in **`sessionStorage`** under `STORAGE_KEYS.USER`. The initial state is read synchronously via a lazy `useState` initializer, so there is no loading state and no flash. `sessionStorage` is user-writable, so `readStoredUser` parses defensively.

`login` accepts any email; there is no real validation and no role enforcement — `UserRole` exists for display only.

### Tables

`src/hooks/useProTable.ts` centralizes ProTable props (pagination, search, toolbar, `PaginatedResponse` unwrapping). The `request` callback is wrapped in `useCallback` deliberately: ProTable treats a changed `request` identity as a refetch trigger. It reads `message` from `App.useApp()` rather than importing antd's static `message`, so toasts inherit the `ConfigProvider` theme — any component using `App.useApp()` must render inside the `<AntdApp>` wrapper in `src/App.tsx`.

User table columns live in `src/pages/users/UserColumn.tsx` (a `use*Columns` hook returning `ProColumns<User>[]`), row actions in `src/pages/users/UserActions.tsx`. Drawer CRUD follows `src/pages/users/UserList.tsx`: one `Form.useForm`, an `editing` record in state, `resetFields()` before populating, and `actionRef.current?.reload()` after a mutation.

### Theming and styles — two places to change a color

- `src/constants/app.ts` — `APP_CONFIG` (name, logo, version, brand colors) feeds `appTheme`, the antd `ThemeConfig` passed to `ConfigProvider` in `App.tsx`. This is the rebrand entry point.
- `src/styles/variables.less` — LESS variables duplicating the same palette for hand-written CSS.

`src/styles/index.less` is imported once in `main.tsx` and is the only entry point; it `@import`s `variables.less` first, then `global.less`, `main-layout.less`, `auth-layout.less`. Partial files do **not** import `variables.less` themselves and rely on that ordering — a new `.less` file added to `index.less` before the variables import will fail to compile.

Class names shared between LESS and components (`.header-brand`, `.page-users`, `.auth-switch`, `.route-loader`, `.layout-version`, `.section-card`) are the coupling point; renaming one side breaks the other silently.

## Conventions

- `@/` alias resolves to `src/` and is declared in **both** `vite.config.ts` and `tsconfig.json`; add new aliases to both.
- `tsconfig.json` sets `strict`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, and `esModuleInterop`. `verbatimModuleSyntax` makes `import type` mandatory for type-only imports.
- ESLint runs `typescript-eslint`'s **type-checked** rules. Passing an async function where a void return is expected is an error — wrap call sites as `onClick={() => void handler()}`. `react-router`'s `navigate` returns a promise, so it needs `void` too.
- Prettier owns formatting (100 columns, single quotes, trailing commas). Run `pnpm format` rather than hand-formatting.
- No test framework is configured; do not add test files expecting them to run.
