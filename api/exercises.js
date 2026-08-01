import notion from "../lib/notion";

export default async function handler(req, res) {
  try {
    const pageId = "362fa9c7-3e56-80e3-b4e0-f61ed2b2174d";

    const response = await notion.pages.retrieve({
      page_id: pageId,
    });

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      details: error.body ?? null,
    });
  }
}