import notion, { databaseId } from "../lib/notion";

export default async function handler(req, res) {
  return res.status(200).json({
    databaseId,
    notionExists: !!notion,
    databasesExists: !!notion.databases,
    dataSourcesExists: !!notion.dataSources,
    databasesKeys: notion.databases ? Object.keys(notion.databases) : null,
    dataSourcesKeys: notion.dataSources ? Object.keys(notion.dataSources) : null,
  });
}