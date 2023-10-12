import { test, expect } from "@playwright/test";
import { randomIdentity } from "../utils/identity-generator";
import { yousign_sign } from "../utils/yousign";
import { stripe_pay } from "../utils/stripe";
import { maildrop_goto_inbox } from "../utils/maildrop";

test("first journey", async ({ context, page }) => {
  const { firstName, lastName, email, phone } = randomIdentity();

  await page.goto(
    "https://journey.seyna.eu/sandboxed/start/d29aabb5-4dcb-4cc5-9405-22cfe03c4a3f"
  );
  await page.getByPlaceholder("DD/MM/YYYY").nth(0).fill("01/01/2025");
  await page.getByPlaceholder("DD/MM/YYYY").nth(1).fill("05/01/2025");
  await page.getByLabel("​", { exact: true }).click();
  await page.getByRole("option", { name: "Coupé" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator("#root_vehiculeRecoveryCountry").click();
  await page.getByRole("option", { name: "Andorre" }).click();
  await page
    .getByLabel("Ville du lieu de remise du véhicule *")
    .fill("Andorre");
  await page.getByLabel("​", { exact: true }).click();
  await page.getByRole("option", { name: "Getaround" }).click();
  await page
    .getByLabel("Référence de la réservation ou du contrat de location *")
    .fill("Ref");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("Prénom *").fill(firstName);
  await page.getByLabel("Nom *", { exact: true }).fill(lastName);
  await page.getByPlaceholder("DD/MM/YYYY").fill("01/01/1980");
  await page.getByLabel("Adresse *").fill("10 rue du faubou");
  await page
    .getByRole("option", { name: "10Rue du Faubourg Montmartre Paris" })
    .click();
  await page.getByLabel("Email *").click();
  await page.getByLabel("Email *").fill(email);
  await page.locator('input[type="tel"]').fill(phone);
  await page.getByText("Non").click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continuer" }).click();

  await yousign_sign(page);
  await page.getByRole("button", { name: "Continuer" }).click();
  // This is not an error, there are two buttons to be pushed
  await page.getByRole("button", { name: "Continuer" }).click();
  await stripe_pay(page, firstName, lastName, email);

  await page.getByText("Merci pour votre confiance").waitFor();

  await maildrop_goto_inbox(context, email);
});

test("Second journey", async ({ context, page }) => {
  const { firstName, lastName, email, phone } = randomIdentity();

  await page.goto(
    "https://journey.seyna.eu/sandboxed/start/d29aabb5-4dcb-4cc5-9405-22cfe03c4a3f"
  );
  await page.getByPlaceholder("DD/MM/YYYY").nth(0).fill("18/12/2025");
  await page.getByPlaceholder("DD/MM/YYYY").nth(1).fill("21/12/2025");
  await page.locator("#root_vehicleType").click();
  await page.getByRole("option", { name: "Cabriolet" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator("#root_vehiculeRecoveryCountry").click();
  await page.getByRole("option", { name: "France" }).click();
  await page.getByLabel("Ville du lieu de remise du véhicule *").fill("Paris");
  await page.getByLabel("​", { exact: true }).click();
  await page.getByRole("option", { name: "Autre" }).click();
  await page.getByLabel("Précisez *").fill("GetACar");
  await page
    .getByLabel("Référence de la réservation ou du contrat de location *")
    .fill("34567YHU");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("Prénom *").fill(firstName);
  await page.getByLabel("Nom *", { exact: true }).fill(lastName);
  await page.getByPlaceholder("DD/MM/YYYY").fill("27/08/1993");
  await page.getByLabel("Adresse *").fill("10 rue du lac");
  await page
    .locator("#root_address-option-0")
    .getByText("10 Rue du Lac")
    .click();
  await page.getByLabel("Email *").click();
  await page.getByLabel("Email *").fill(email);
  await page.locator('input[type="tel"]').fill(phone);
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await yousign_sign(page);
  await page.getByRole("button", { name: "Continuer" }).click();
  // This is not an error, there are two buttons to be pushed
  await page.getByRole("button", { name: "Continuer" }).click();
  await stripe_pay(page, firstName, lastName, email);

  await page.getByText("Merci pour votre confiance").waitFor();

  await maildrop_goto_inbox(context, email);
});
