import notion, { databaseId } from "../lib/notion";

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return res.status(200).json(response.results);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
      details: error.body ?? null,
    });
  }
}