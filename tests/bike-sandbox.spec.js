import { test } from "@playwright/test";
import { randomIdentity } from "../utils/identity-generator";

test("test", async ({ context, page }) => {
  const { firstName, lastName, username, email, phone } = randomIdentity();

  await page.goto(
    "https://journey.seyna.eu/sandboxed/start/1c678290-fa45-4b93-b53e-06ac5087429f"
  );

  await page.getByRole("button", { name: "Continuer" }).click();
  await page.locator("#root_brand").click();
  await page.getByRole("option", { name: "Cannondale" }).click();
  await page.locator("#root_model").click();
  await page.getByRole("option", { name: "Treadwell Neo 2" }).click();
  await page.locator("#root_age").click();
  await page.getByRole("option", { name: "Entre 1 et 2 ans" }).click();
  await page.getByLabel("Prix de votre vélo ? *").fill("100");
  await page
    .getByLabel("Numéro d’identification de votre vélo ? *")
    .fill("xxx");
  await page.getByLabel("​", { exact: true }).click();
  await page.getByRole("option", { name: "Oui" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("Prénom *").fill(firstName);
  await page.getByLabel("Nom *", { exact: true }).fill(lastName);
  await page.getByPlaceholder("DD/MM/YYYY").fill("16/11/1993");
  await page.getByLabel("Lieu de naissance").fill("Paris");
  await page.getByLabel("Adresse *").fill("10 rue du faubourg");
  await page
    .getByRole("option", { name: "10Rue du Faubourg Montmartre Paris" })
    .click();
  await page.getByLabel("Adresse email *").fill(email);
  await page.locator('input[type="tel"]').nth(0).fill(phone);
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("​", { exact: true }).click();
  await page.getByRole("option", { name: "Casse et Vol" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.waitForSelector('iframe[title="Signature page"]');

  await page
    .frameLocator('iframe[title="Signature page"]')
    .locator("#main div[data-document-index] + p")
    .scrollIntoViewIfNeeded();

  await page
    .frameLocator('iframe[title="Signature page"]')
    .getByRole("button", { name: "Signer" })
    .click();
  await page
    .frameLocator('iframe[title="Signature page"]')
    .getByText(
      `${firstName} ${lastName}Glissez ou maintenez Entrée pour signerGlisser pour signerVous allez signerSi`
    )
    .press("Enter", { delay: 3000 })
    .catch(() => {});
  await page.getByLabel("Email").fill(email);
  await page
    .getByPlaceholder("1234 1234 1234 1234")
    .fill("4242 4242 4242 42422");
  await page.getByPlaceholder("MM / YY").fill("02 / 42");
  await page.getByPlaceholder("CVC").fill("242");
  await page
    .getByPlaceholder("Full name on card")
    .fill(`${firstName} ${lastName}`);
  await page.getByTestId("hosted-payment-submit-button").click();

  await page
    .getByText("Votre souscription a bien été prise en compte")
    .waitFor();

  const mailbox = await context.newPage();
  await mailbox.goto(`https://maildrop.cc/inbox/?mailbox=${username}`);
});
