import { BrowserContext, expect } from "@playwright/test";

export const maildrop_goto_inbox = async (
  context: BrowserContext,
  email: string
) => {
  const [username, domain] = email.split("@");
  expect(domain).toBe("maildrop.cc");
  const page = await context.newPage();
  await page.goto(`https://maildrop.cc/inbox/?mailbox=${username}`);
};
