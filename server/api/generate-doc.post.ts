import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { title } from "radash";
import { SendMailClient } from "zeptomail";
import * as fs from "fs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    console.log(body);
    // Create a new document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            createHeading("Solar Provider On-boarding Information"),
            ...writeJSONIntoParagraph(body),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    fs.writeFileSync("My Document.docx", buffer);

    return buffer;
  } catch (e) {
    console.log(e);
  }
});

function createHeading(text: string): Paragraph {
  return new Paragraph({
    text: text,
    heading: "Heading1",
    thematicBreak: true,
  });
}
function writeJSONIntoParagraph(formData: Object): Paragraph[] {
  const eachEntry = Object.entries(formData);

  let children = [];

  for (const [key, value] of eachEntry) {
    const newLine = new Paragraph({
      children: [new TextRun(`${title(key)}: ${title(String(value))}`)],
      heading: HeadingLevel.HEADING_1,
    });

    children.push(newLine);
  }

  return children;
}
