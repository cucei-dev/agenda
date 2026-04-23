# AGENTS.md

## If you are an agent working in this repository, read this first.

**Next.js WARNING:**
This repo uses Next.js 16+ with major breaking changes. 
APIs, conventions, and file structure likely differ from your Next.js training. Always read the official Next.js 16+ guides in `node_modules/next/dist/docs/` before making changes. If docs or type errors disagree, trust the actual code/config.

**VERIFY ALL BREAKING DEPRECATIONS BEFORE CODE EDITS.**

---

## Quirks and Requirements

- **pnpm required:** Use `pnpm install`, not npm/yarn. Node `^22`, pnpm `10.33.0` minimum.
- **Strict TypeScript + Path Alias:**
  - Strict mode (`tsconfig.json`)
  - Use `@/*` to reference from `src/`
- **App Directory Entrypoints:**
  - Main Next.js entrypoints: `src/app/page.tsx` etc.
  - Components in `src/components` (feature-based folders) and shared code in `src/lib`.
- **No `.env` or test scripts defined.**
  - If you see test-related commands or .env config, verify before assuming it exists. No test, storybook, or extra scripts in `package.json` as of this writing.
- **No CI or automation scripts besides funding.**
- **pnpm-workspace.yaml** just whitelists builds for dependencies; repo is currently a single package.

---

## Basic Commands

- Install deps:  `pnpm install`
- Start in dev:  `pnpm dev`
- Build for prod: `pnpm build`
- Lint: `pnpm lint`

---

## Reference Materials in Repo
- [Official Next.js migration & docs](node_modules/next/dist/docs/)
- If in doubt about architectural patterns, prefer checking actual source over `README.md` (minimal)
- Any CLI/test/deployment changes should be documented here if they diverge from the above or Next.js/pnpm norms.

---

## Add here only the tips that would save future agents from wasting hours!