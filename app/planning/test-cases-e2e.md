# Casi di test:


## Esempio da red, green refactoring
## Crea due ticket identici e controlla che ci sia un errore di validazione che non permetta la creazione del secondo ticket (quello identico al primo)
Identico si intende che sia: stesso titolo normalizzato, stesso cliente normalizzato, stesso giorno di creazione.
    - Inseriamo tutti i dati corretti per la creazione di un ticket
    - Creiamo il ticket
    - Verifichiamo che il ticket sia presente in dashboard con etichetta di intervento rapido
    - Attendere un feedback
    - Verifica che il ticket non sia stato creato
    - Verifica che sia presente un errore di validazione visibile in ui



## Campo titolo vuoto -> non dovrebbe poter creare il ticket
    - Inserire tutti i dati corretti 
    - Lasciare il campo titolo vuoto
    - Attendere un feedback
    - Verifica che il ticket non sia stato creato
    - Verifica che sia presente un errore di validazione visibile in ui

##  Creato ticket correttamente -> visibile con le stesse informazioni inserite nella lista dei ticket
    - Inseriamo tutti i dati corretti per la creazione di un ticket
    - Creiamo il ticket
    - Verifichiamo che siano correttamente corrispondenti al ticket creato

## Urgenza  alta + telefono = intervento rapido in dashboard
    - Inseriamo tutti i dati corretti per la creazione di un ticket
    - Impostiamo urgenza alta e telefono come metodo di contatto
    - Creiamo il ticket
    - Verifichiamo che il ticket sia presente in dashboard con etichetta di intervento rapido
