# Consegna studenti - Lab 16

## Missione

Proteggere questa regressione:

```txt
stesso title normalizzato
+ stesso customer normalizzato
+ stesso giorno UTC
-> 409 DUPLICATE_TICKET
-> nessun duplicato creato
-> messaggio comprensibile nell'interfaccia
```

## Procedura

1. Esegui `pnpm test` e `pnpm test:e2e`: la baseline deve essere verde, con gli eventuali `test.fixme` didattici ancora visibili come non eseguiti.
2. Riproduci il bug nello stesso giorno UTC con `Errore fattura / Alfa S.r.l.` e `  ERRORE   FATTURA  /  alfa s.r.l. `.
3. In `tests/api/create-ticket.test.js` scrivi un test API che invia le due request.
4. Controlla nel test `409`, `code: DUPLICATE_TICKET` e che la lista contenga ancora un solo ticket.
5. Esegui il test e conserva il rosso utile.
6. Applica il fix server-side minimo.
7. Riesegui `pnpm test:api`.
8. Riesegui `pnpm test:all`.
9. Arresta e riavvia `pnpm dev`, usa un titolo nuovo e controlla nel browser che la prima creazione riesca e la variante normalizzata venga rifiutata senza aggiungere una seconda riga. Se il browser e' bloccato da un problema di ambiente, usa come fallback la response API.

## Lavoro a coppie

- Il driver esegue prompt, comandi e modifiche e mostra il diff prima di proseguire.
- Il reviewer controlla contratto e rosso, ferma scope extra e verifica verde mirato e suite.
- Scambiate i ruoli dopo l'approvazione del rosso.

## Uso guidato dell'AI

### 1. Piano del test, nessuna modifica

```txt
Analizza il contratto DUPLICATE_TICKET, i test API esistenti e
tests/helpers/ticket-api.js.

Non modificare file.

Proponi un test che dimostri:
- prima POST -> 201;
- seconda POST equivalente nello stesso giorno UTC -> 409;
- code -> DUPLICATE_TICKET;
- dopo entrambe le request resta un solo ticket.

Indica file, preparazione, azioni e controlli.
Fermati dopo il piano.
```

### 2. Implementazione del solo test

```txt
Implementa il piano approvato modificando soltanto
tests/api/create-ticket.test.js.

Non modificare server, client, schema o dipendenze.
Esegui pnpm test:api.

Fermati quando ottieni il rosso corretto:
Expected 409, Actual 201.

Se fallisce per setup o sintassi, correggi soltanto il test.
```

Il fix di produzione e' autorizzato soltanto dopo aver letto il rosso corretto.

### 3. Fix dopo il rosso approvato

```txt
Il test di regressione fallisce per il motivo corretto.

Proponi e applica il fix server-side minimo:
- normalizza title e customer senza modificare i valori originali;
- confronta ticket dello stesso giorno UTC;
- controlla prima dell'INSERT;
- restituisci 409, code DUPLICATE_TICKET e il messaggio concordato;
- non aggiungere schema, dipendenze o refactor generali.

Esegui prima pnpm test:api.
Solo dopo il verde esegui pnpm test:all.
```

## Regole di normalizzazione

Per `title` e `customer`:

- rimuovi spazi esterni;
- converti in minuscolo;
- riduci gli spazi consecutivi a uno.

La forma normalizzata serve soltanto al confronto: conserva nel ticket i valori originali.

Il giorno viene ricavato dal timestamp UTC prodotto dal server, non dalla data locale del browser.

## Contratto di errore

```txt
status: 409
code: DUPLICATE_TICKET
message: Ticket gia' presente per questo cliente nella giornata corrente.
```

## Output

Mostra dalla repo:

```txt
rosso corretto osservato
fix server-side minimo
test API verde
suite completa verde
messaggio visibile e nessun secondo ticket
```

Per il controllo browser usa un titolo mai creato prima, per esempio:

```txt
prima:   title "Errore fattura finale AB", customer "Alfa S.r.l."
seconda: title "  ERRORE   FATTURA FINALE AB  ", customer " alfa s.r.l. "
```

Solo se il browser e' bloccato, mostra come fallback response `409`, code,
message e lista con un solo ticket.

Il caso duplicato e il mancato inserimento sono obbligatori. Titolo o cliente
diversi si aggiungono dopo il verde principale; il giorno diverso resta
un'estensione di riferimento.

`pnpm test:api` deve essere verde prima di `pnpm test:all`. Il verde finale e'
valido soltanto se avete osservato e compreso il rosso iniziale.

Non compilare report separati.
