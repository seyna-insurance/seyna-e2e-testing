import { Page } from "@playwright/test";

export const yousign_sign = async (page: Page) => {
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
    .getByText("Glisser pour signer")
    .press("Enter", { delay: 3000 })
    .catch(() => {});
};
