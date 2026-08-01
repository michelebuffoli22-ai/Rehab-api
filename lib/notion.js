import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default notion;

export const databaseId = process.env.NOTION_DATABASE_ID;