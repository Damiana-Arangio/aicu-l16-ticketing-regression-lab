# Materiali studenti - Lab 16

## Cosa fai

Proteggi la regressione `DUPLICATE_TICKET` con un ciclo rosso-verde completo.

## File da usare

- `consegna.md` - contratto e procedura;
- `template/duplicate-ticket-cases.md` - riferimento rapido ai casi;
- repo comune - test e fix effettivi.

Non e' richiesta una relazione separata.

## Output atteso

```txt
rosso corretto osservato
fix server-side minimo
test API verde
suite completa verde
messaggio browser e nessun secondo ticket
```

La response API e' il fallback soltanto se il browser e' bloccato da un problema
di ambiente.
