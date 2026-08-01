import notion from "../lib/notion";

export default async function handler(req, res) {
  try {
    const response = await notion.search({
      filter: {
        property: "object",
        value: "database",
      },
    });

    return res.status(200).json(response.results);

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      details: error.body ?? null,
    });
  }
}