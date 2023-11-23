import { test, expect } from "@playwright/test";
import { randomIdentity } from "../utils/identity-generator";
import { yousign_sign } from "../utils/yousign";
import { stripe_pay } from "../utils/stripe";
import { maildrop_goto_inbox } from "../utils/maildrop";
import { upload } from "../utils/upload";

test("test", async ({ context, page }) => {
  const { firstName, lastName, email, phone } = randomIdentity();

  await page.goto('https://journey.seyna.eu/sandboxed/start/d26e1232-ee2c-4d5a-ab36-f7169fa086ce');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('Rallye Terre & Course de Côte').click();
  await page.getByRole('option', { name: 'Rallye Terre & Course de Côte' }).click();
  await page.getByLabel('​', { exact: true }).click();
  await page.getByRole('option', { name: 'Rallye National < 120 kms' }).click();
  await page.getByLabel("Nom de l’évènement *").fill('24h');
  await page.getByLabel('​', { exact: true }).click();
  await page.getByRole('option', { name: 'Non' }).click();
  await page.getByPlaceholder('DD/MM/YYYY').nth(0).fill("28/12/2023");
  await page.getByPlaceholder('DD/MM/YYYY').nth(1).fill("30/12/2023");
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('Qui est le propriétaire', {exact: false}).fill(lastName);
  await page.getByLabel('Alpine').click();
  await page.getByRole('option', { name: 'Alpine' }).click();
  await page.getByLabel('​', { exact: true }).click();
  await page.getByRole('option', { name: 'A110 Rallye RGT' }).click();
  await page.getByLabel('Valeur totale du véhicule').fill('150000');
  await page.getByLabel('Année de fabrication', {exact: false}).fill('1996');
  await page.getByLabel("N° de châssis", {exact: false}).fill('TYYU');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('​', { exact: true }).click();
  await page.getByRole('option', { name: '80 000 €' }).click();
  await page.getByLabel('​', { exact: true }).click();
  await page.getByRole('option', { name: '150 000 €' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('Nom du pilote *', { exact: true }).fill(lastName);
  await page.getByLabel('Prénom du pilote *').fill(firstName);
  await page.getByLabel('Âge du pilote *').fill('24');
  await page.getByLabel("Nombre d’épreuves ou de roulages disputés lors de ces deux dernières années *").fill('2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.locator('label').filter({ hasText: 'Non' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByText('Particulier').click();
  await page.locator('label').filter({ hasText: 'Particulier' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('Nom *', { exact: true }).fill(lastName);
  await page.getByLabel('Prénom *').fill(firstName);
  await page.getByPlaceholder('DD/MM/YYYY').fill('17/11/1986');
  await page.getByLabel('Lieu de naissance (Précisez le pays si hors France) *').fill('Suresnes');
  await page.getByLabel('Adresse complète *').fill("10 rue du faubou");
  await page
    .getByRole("option", { name: "10Rue du Faubourg Montmartre Paris" })
    .click();
  await page.locator('input[type="tel"]').fill(phone);
  await page.getByLabel('Adresse email *').fill(email);
  await page.getByLabel('Nationalité *').fill('Francaise');
  await page.getByRole("checkbox").nth(0).check();
  await page.getByRole("checkbox").nth(1).check();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: "Ajouter un carte nationale", exact: false }).click();
  
  await upload(page, ['sample.pdf']);

  await page.getByRole('button', { name: 'Continuer' }).click();
await page.getByRole("checkbox").nth(1).check();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByText("Ne rafraichissez pas votre page").waitFor();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continuer" }).click();

  await page.getByRole("button", { name: "Signer mon contrat avec Yousign" }).click();
  await yousign_sign(page);
  await page.getByRole("button", { name: "Passer au paiement" }).click();

  await page.getByRole("button", { name: "Ajouter mon moyen de paiement" }).click();
  await stripe_pay(page, firstName, lastName, email);
  
  await page.getByRole('button', { name: "Récapitulatif" }).click();
  await page.getByText("Merci").waitFor();

  await maildrop_goto_inbox(context, email);
});