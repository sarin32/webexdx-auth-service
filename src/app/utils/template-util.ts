import * as fs from 'node:fs/promises';
import { compile } from 'handlebars';

export async function generateTemplate(templateName: string, data: unknown) {
  const templateContent = await fs.readFile(
    `./src/assets/templates/${templateName}.html`,
    'utf-8',
  );

  const template = compile(templateContent);

  return template(data);
}
