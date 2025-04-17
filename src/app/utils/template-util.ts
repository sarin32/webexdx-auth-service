import { compile } from 'handlebars';
import * as fs from 'fs/promises';

export async function generateTemplate(templateName: string, data: unknown) {
  const templateContent = await fs.readFile(
    `./src/assets/templates/${templateName}.html`,
    'utf-8'
  );

  const template = compile(templateContent);

  return template(data);
}
