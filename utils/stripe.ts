import { Page } from "@playwright/test";

export const stripe_pay = async (
  page: Page,
  firstName: string,
  lastName: string,
  email: string
) => {
  await page.getByRole("button", { name: "Passer au paiement" }).click();
  await page.getByRole("button", { name: "Ajouter mon moyen de paiement" }).click();
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
};
