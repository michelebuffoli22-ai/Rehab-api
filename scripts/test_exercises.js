function getTitle(prop) {
  return prop?.title?.[0]?.plain_text || "";
}

function getRichText(prop) {
  return prop?.rich_text?.map(t => t.plain_text).join("") || "";
}

function getUrl(prop) {
  return prop?.url || "";
}

function getMultiSelect(prop) {
  return prop?.multi_select?.map(v => v.name) || [];
}

function getSelect(prop) {
  return prop?.select?.name || "";
}

function getImageUrl(prop) {
  const file = prop?.files?.[0];

  if (!file) return "";

  if (file.type === "external") {
    return file.external?.url || "";
  }

  if (file.type === "file") {
    return file.file?.url || "";
  }

  return "";
}

// Mock Notion response with one page: Single Leg Hop
const page = {
  id: 'page_1',
  url: 'https://notion.so/page_1',
  properties: {
    "Nome Esercizio": { title: [ { plain_text: 'Single Leg Hop' } ] },
    "Immagine": { files: [ { type: 'external', external: { url: 'https://example.com/single-leg-hop.jpg' } } ] },
    "Immagine Url": { url: '' },
    "Serie": { rich_text: [ { plain_text: '3' } ] },
  }
};

const p = page.properties;

const exercise = {
  id: page.id,
  nome: getTitle(p["Nome Esercizio"]),
  immagine: getImageUrl(p["Immagine"]),
};

console.log('Exercise:', exercise);
console.log('immagine non vuoto?', exercise.immagine !== '');
if (exercise.nome === 'Single Leg Hop' && exercise.immagine !== '') {
  console.log('TEST PASSED: Single Leg Hop has immagine:', exercise.immagine);
  process.exit(0);
} else {
  console.error('TEST FAILED');
  process.exit(2);
}
