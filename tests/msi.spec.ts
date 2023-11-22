import { test } from "@playwright/test";
import { randomIdentity } from "../utils/identity-generator";

test("test", async ({ page }) => {
  const { firstName, lastName, email } = randomIdentity();

  await page.goto(
    "https://journey.seyna.eu/sandboxed/start/3c3eab30-b19f-4283-9e80-b63fc9fc5daa"
  );
  await page.getByRole("button", { name: "Continuer" }).click();
  await page
    .getByLabel(
      "J’atteste avoir pris connaissance des activités exclues du contrat"
    )
    .check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("​", { exact: true }).click();
  await page.getByRole("option", { name: "TR1UTW" }).click();
  await page
    .getByLabel("Dénomination ou raison sociale *")
    .fill("Courtier TEST");
  await page.getByLabel("Prénom du commercial *").fill(firstName);
  await page.getByLabel("Nom du commercial *", { exact: true }).fill(lastName);
  await page.getByLabel("Email du commercial *").fill(email);
  await page.getByRole("button", { name: "Continuer" }).click();
  await page
    .getByLabel("Raison sociale de l'entreprise *")
    .fill("Seyna Robinetterie");
  await page.getByLabel("Immatriculation au RCS (SIREN) *").fill("987345856");
  await page
    .getByLabel("Nom du représentant légal *", { exact: true })
    .fill("Leguillon");
  await page.getByLabel("Prénom du représentant légal *").fill("Stephen");
  await page
    .getByLabel("Email du représentant légal *")
    .fill("stepleguil@seyna.eu");
  await page.getByLabel("Adresse de l'entreprise *").fill("10 rue du faubourg");
  await page
    .locator("#root_companyAddress-option-0")
    .getByText("Rue du Faubourg")
    .click();
  await page.getByLabel("Code APE de l’entreprise *").fill("robine");
  await page
    .getByRole("option", {
      name: "28.14Z - Fabrication d'autres articles de robinetterie",
    })
    .click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page
    .getByLabel("Chiffre d’affaire annuel de votre client (en euros)  *")
    .fill("789000");
  await page.getByText("Non").click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator("h4").filter({ hasText: "Réseau interne" }).waitFor();
  await page.getByText("Oui").click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator("h4").filter({ hasText: "Supports portables" }).waitFor();
  await page.getByText("Oui").click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator("h4").filter({ hasText: "Données critiques" }).waitFor();
  await page.getByText("Oui").click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator("h4").filter({ hasText: "Sauvegardes" }).waitFor();
  await page.getByText("Oui").click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator("h4").filter({ hasText: "Correctifs" }).waitFor();
  await page.getByText("Oui").click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator("h4").filter({ hasText: "PSI DSS" }).waitFor();
  await page.getByText("Non applicable").click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator("h4").filter({ hasText: "Panne" }).waitFor();
  await page.getByText("Non").click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page
    .getByText(
      "Je certifie que mon client n’a aucun lien avec organisation terroriste et n’est "
    )
    .click();
  await page
    .getByText(
      "Je certifie que mon client n'a aucune connexion financière ou contractuelle en a"
    )
    .click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("​", { exact: true }).click();
  await page.getByRole("option", { name: "500 000 €" }).click();
  await page.getByPlaceholder("DD/MM/YYYY").fill("01/01/2024");
  await page.getByRole("button", { name: "Continuer" }).click();
  await page
    .locator("div")
    .filter({
      hasText:
        "Formulaire d’adhésionBienvenueInformationInformation sur le courtierInformation ",
    })
    .first()
    .click();

  await page.getByText("Votre demande requiert").waitFor();
});
