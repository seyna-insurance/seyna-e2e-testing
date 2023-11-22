import { Page } from "@playwright/test";
import { join } from "node:path"

export const upload = async (page: Page, files: String[]) => {
    const fileChooserPromise  = page.waitForEvent('filechooser');
    await page.getByText('importez-les depuis votre périphérique').click();
  
    const fileChooser = await fileChooserPromise;
    let filePaths = files.map(file => join(__dirname, `../uploads/${file}`));
    await fileChooser.setFiles(filePaths);
  
    await page.getByRole('button', { name: 'Fermer' }).click();
  
};
