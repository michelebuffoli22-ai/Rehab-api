import notion, { databaseId } from "../lib/notion";

function getTitle(prop) {
  return prop?.title?.[0]?.plain_text || "";
}

function getRichText(prop) {
  return prop?.rich_text?.map(t => t.plain_text).join("") || "";
}

function getUrl(prop) {
  return prop?.url || "";
}

function getSelect(prop) {
  return prop?.select?.name || "";
}

function getMultiSelect(prop) {
  return prop?.multi_select?.map(v => v.name) || [];
}

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const exercises = response.results.map((page) => {
      const p = page.properties;

     return {
  nome: getTitle(p["Nome Esercizio"]),

  serie: getRichText(p["Serie"]),

  dosaggio: getRichText(p["Dosaggio"]),

  note: getRichText(p["Note Cliniche"]),

  video: getUrl(p["Video Link"]),

  immagine: getUrl(p["Immagine Url"]),

  distretto: getMultiSelect(p["Distretto"]),

  categoria: getMultiSelect(p["Categoria"]),

  strumenti: getMultiSelect(p["Strumenti"]),

  contrazione: getMultiSelect(p["Contrazione"]),

  rom: getMultiSelect(p["ROM"]),

  carico: getMultiSelect(p["Carico"]),

  difficolta: getSelect(p["Difficoltà"]),

  priorita: getSelect(p["Priorità"]),

  indicazioni: getRichText(p["Indicazioni Terapeutiche"]),

  url: page.url
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