import notion from "../lib/notion";

export default async function handler(req, res) {
  return res.status(200).json({
    keys: Object.keys(notion),
    databases: typeof notion.databases,
    dataSources: typeof notion.dataSources,
  });
}