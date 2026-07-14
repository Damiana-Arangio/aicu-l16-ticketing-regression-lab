import { expect, test } from "@playwright/test";

test("shows the server-calculated urgency label in the ticket list", async ({
  page
}) => {
  await page.goto("/");

  const ticketRow = page
    .getByRole("row")
    .filter({ hasText: "Impossibile accedere al portale clienti" });
  // il locator ci racconta quali sono gli elementi (o l'elemento in particolare) che stiamo cercando.
  // attenzione: se racconta esclusivamente dove sia nel DOM (come fareste in un programma) 
  // la soluzione e' piu' fragile

  await expect(ticketRow).toContainText("prioritario");
});

test("alta + telefono -> intervento rapido nella riga creata", async ({
  page
}) => {
  const ticketTitle = "Blocco accesso VPN cliente Gamma";

  await page.goto("/");
  await page.getByLabel("Titolo").fill(ticketTitle);
  await page.getByLabel("Cliente").fill("Gamma S.r.l.");
  await page
    .getByRole("group", { name: "Priorita'" })
    .getByRole("radio", { name: "alta", exact: true })
    .check();
  await page
    .getByRole("group", { name: "Canale richiesta" })
    .getByRole("radio", { name: "telefono", exact: true })
    .check();
  await page.getByRole("button", { name: "Salva ticket" }).click();

  const ticketRow = page.getByRole("row").filter({ hasText: ticketTitle });

  await expect(ticketRow).toHaveCount(1);
  await expect(ticketRow.getByText("alta", { exact: true })).toBeVisible();
  await expect(
    ticketRow.getByText("telefono", { exact: true })
  ).toBeVisible();
  await expect(
    ticketRow.getByText("intervento rapido", { exact: true })
  ).toBeVisible();
});
