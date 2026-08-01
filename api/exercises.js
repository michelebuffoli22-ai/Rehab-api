import notion, { databaseId } from "../lib/notion";

export default async function handler(req, res) {
  try {
    // Recupera il database (serve per verificare che l'ID sia corretto)
    const db = await notion.databases.retrieve({
      database_id: databaseId,
    });

    // Esegue la query del database
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return res.status(200).json({
      database: db.title,
      count: response.results.length,
      results: response.results,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
      details: error.body ?? null,
    });
  }
}