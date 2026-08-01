import notion, { databaseId } from "../lib/notion";

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const exercises = response.results.map((page) => {
      const p = page.properties;

      return {
        nome: p["Nome Esercizio"]?.title?.[0]?.plain_text || "",
        serie: p["Serie"]?.rich_text?.[0]?.plain_text || "",
        dosaggio: p["Dosaggio"]?.rich_text?.[0]?.plain_text || "",
        video: p["Video Link"]?.url || "",
      };
    });

    res.status(200).json(exercises);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
}