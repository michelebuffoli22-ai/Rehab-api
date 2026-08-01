import notion, { databaseId } from "../lib/notion";

export default async function handler(req, res) {

  return res.status(200).json({
    sdk: typeof notion,
    databases: typeof notion.databases,
    query: typeof notion.databases?.query,
    retrieve: typeof notion.databases?.retrieve,
    dataSources: typeof notion.dataSources,
    dsQuery: typeof notion.dataSources?.query,
    databaseId
  });

}