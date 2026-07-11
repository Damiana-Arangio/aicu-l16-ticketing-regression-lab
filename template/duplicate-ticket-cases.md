# Casi `DUPLICATE_TICKET` - L16

## Regola

```txt
normalize(title) + normalize(customer) + UTC day
```

## Matrice dei casi

| Caso | Titolo | Cliente | Giorno UTC | Risultato | Priorita' |
| --- | --- | --- | --- | --- | --- |
| primo ticket | Errore fattura | Alfa S.r.l. | oggi | `201` | obbligatorio |
| duplicato normalizzato | `  ERRORE   FATTURA  ` | ` alfa s.r.l. ` | oggi | `409 DUPLICATE_TICKET` | obbligatorio |
| titolo diverso | Errore login | Alfa S.r.l. | oggi | `201` | dopo il verde principale |
| cliente diverso | Errore fattura | Beta Consulting | oggi | `201` | dopo il verde principale |
| giorno diverso | Errore fattura | Alfa S.r.l. | domani | `201` | estensione / riferimento |

## Normalizzazione

| Campo | Regola |
| --- | --- |
| `title` | trim + lowercase + spazi consecutivi ridotti a uno |
| `customer` | trim + lowercase + spazi consecutivi ridotti a uno |
| giorno | data UTC del timestamp prodotto dal server |

La normalizzazione serve al confronto e non sostituisce i valori originali salvati nel ticket.

Partite dal caso duplicato. Aggiungete gli altri secondo la priorita' indicata,
solo dopo aver chiuso rosso e verde del rischio principale.
