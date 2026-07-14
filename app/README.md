# AICU M04 - Ticketing quality

Repo docente per la demo L15 del modulo Testing & Quality.

Il copione operativo completo e' in [`L15_LIVE_DEMO.md`](./L15_LIVE_DEMO.md).

La verticale L12 e' completa:

```txt
priority + sourceChannel -> urgencyLabel
```

Il server valida i dati, calcola `urgencyLabel`, salva il ticket in SQLite e restituisce il campo alla UI. Da questa base aggiungiamo test piccoli, evidenza browser e una regressione protetta.

## Requisiti

- Node.js 26 o superiore;
- pnpm.

Non serve un database esterno. SQLite crea `data/tickets.sqlite` al primo avvio.

## Avvio

```bash
pnpm install
pnpm setup:browsers
pnpm dev
```

Apri `http://127.0.0.1:4173`.

## Test disponibili a inizio L14

```bash
pnpm test:unit
pnpm test:api
pnpm test
```

- `test:unit` protegge regola e validazione;
- `test:api` attraversa HTTP e persistenza SQLite in-memory;
- `test` esegue entrambi i livelli.

I test API non modificano `data/tickets.sqlite`.

## Test browser da L15

Dopo il setup iniziale del browser:

```bash
pnpm setup:browsers
pnpm test:e2e
```

Playwright avvia automaticamente un server isolato su `127.0.0.1:4174` con database SQLite in-memory. `pnpm test:all` esegue test unit, API e browser.

Il `test.fixme` Playwright e' il punto di lavoro intenzionale per L15. Playwright lo segnala ma non lo esegue; i test unit/API sono invece completi e verdi.

## Struttura utile

```txt
server/
  index.js
  app.js
  ticket-rules.js
  validation.js
tests/
  unit/
  api/
  e2e/
src/
  main.js
```

## Formula prodotto

| priority | sourceChannel | urgencyLabel |
| --- | --- | --- |
| alta | telefono | intervento rapido |
| alta | chat | prioritario |
| alta | email | prioritario |
| normale | telefono | da gestire |
| normale | chat | da gestire |
| normale | email | standard |
| bassa | telefono | monitorare |
| bassa | chat | monitorare |
| bassa | email | monitorare |

Caso invalido protetto:

```txt
sourceChannel = whatsapp
-> 400 fieldErrors.sourceChannel
```

## Progressione didattica

```txt
L14: test unit e API con node:test
L15: evidenza browser con Playwright
L16: bug -> test rosso -> fix minimo -> test verde
```

`DUPLICATE_TICKET` non e' implementato nella baseline: e' la regressione del laboratorio L16.

## Confini

Non aggiungere auth, notifiche, assegnazioni, analytics o `responseDueAt`. Non calcolare `urgencyLabel` nel client.
