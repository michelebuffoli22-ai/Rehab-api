import notion, { databaseId } from "../lib/notion";

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const exercises = response.results.map((page) => {
      const p = page.properties;

      return {
        id: page.id,

        nome:
          p["Nome Esercizio"]?.title?.[0]?.plain_text || "",

        categoria:
          p["Categoria"]?.multi_select?.map((x) => x.name) || [],

        distretto:
          p["Distretto"]?.multi_select?.map((x) => x.name) || [],

        contrazione:
          p["Contrazione"]?.multi_select?.map((x) => x.name) || [],

        strumenti:
          p["Strumenti"]?.multi_select?.map((x) => x.name) || [],

        difficolta:
          p["Difficoltà"]?.select?.name || "",

        serie:
          p["Serie"]?.rich_text?.[0]?.plain_text || "",

        dosaggio:
          p["Dosaggio"]?.rich_text?.[0]?.plain_text || "",

        video:
          p["Video Link"]?.url || "",

        immagine:
          p["Immagine Url"]?.url || "",

        note:
          p["Note Cliniche"]?.rich_text?.[0]?.plain_text || ""
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