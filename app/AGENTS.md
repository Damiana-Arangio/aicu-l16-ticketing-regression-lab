# Repository Instructions

This repository is the L15 teacher demo baseline for a small full-stack ticketing application.

## Product behavior

The server owns this rule:

```txt
priority + sourceChannel -> urgencyLabel
```

Supported priorities are `bassa`, `normale`, and `alta`. Supported source channels are `email`, `telefono`, and `chat`. `whatsapp` must return `400` with `fieldErrors.sourceChannel`.

## Testing workflow

- Use `pnpm` only.
- Run `pnpm test:unit` for pure rules and validation.
- Run `pnpm test:api` for HTTP and persistence behavior.
- Run `pnpm test:e2e` for user-visible browser behavior.
- Run `pnpm test:all` before reporting completion of L15 or L16 work.
- Test observable behavior through exported functions or HTTP responses.
- Keep each test focused on one risk and use specific checks.
- Read red output before changing production code.
- Keep the existing smoke test green with expected label `prioritario` before and after the demo.
- Keep the `test.fixme` incomplete: `alta + telefono -> intervento rapido` is student work.

## Boundaries

- Do not calculate `urgencyLabel` in `src/main.js`.
- Do not implement `responseDueAt`.
- Do not add auth, assignments, notifications, analytics, or advanced filters.
- `DUPLICATE_TICKET` is intentionally absent at the start of M04 and belongs to the L16 regression lab.
- Keep the UI copy in Italian and preserve the existing dark dashboard style.

## Safety

Never read, create, paste, or commit credentials, tokens, `.env` files, personal data, private screenshots, or generated SQLite files.
