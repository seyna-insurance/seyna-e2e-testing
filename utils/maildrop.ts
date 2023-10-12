import { BrowserContext } from "@playwright/test";

export const maildrop_goto_inbox = async (
  context: BrowserContext,
  username: string
) => {
  const page = await context.newPage();
  await page.goto(`https://maildrop.cc/inbox/?mailbox=${username}`);
};
