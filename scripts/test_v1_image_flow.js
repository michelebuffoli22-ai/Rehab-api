function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function buildBlockHtml({nome, ser, rep, rec, link, note, immagine}){
  return `
      <div class="ex-block-header">
        <div class="ex-block-left">
          <span class="drag-handle" title="Trascina per riordinare">
            <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
              <circle cx="3" cy="2"  r="1.4"/><circle cx="9" cy="2"  r="1.4"/>
              <circle cx="3" cy="8"  r="1.4"/><circle cx="9" cy="8"  r="1.4"/>
              <circle cx="3" cy="14" r="1.4"/><circle cx="9" cy="14" r="1.4"/>
            </svg>
          </span>
          <span class="ex-block-num">Esercizio #${1}</span>
        </div>
        <button class="btn-remove" onclick="rimuoviEsercizio(${1})">Elimina</button>
      </div>
      <div class="form-group">
        <label>Nome esercizio</label>
        <input type="text" class="ex-input-name" value="${escapeAttr(nome)}" placeholder="Es. Squat al muro in isometria" oninput="aggiorna()">
      </div>
      <div class="grid3">
        <div class="form-group"><label>Serie</label><input type="text" class="ex-input-ser" value="${escapeAttr(ser)}" oninput="aggiorna()"></div>
        <div class="form-group"><label>Ripetizioni</label><input type="text" class="ex-input-rep" value="${escapeAttr(rep)}" oninput="aggiorna()"></div>
        <div class="form-group"><label>Recupero</label><input type="text" class="ex-input-rec" value="${escapeAttr(rec)}" oninput="aggiorna()"></div>
      </div>
      <div class="form-group">
        <label>Video URL</label>
        <input type="text" class="ex-input-link" value="${escapeAttr(link)}" placeholder="https://youtu.be/..." oninput="aggiorna()">
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>Note specifiche ed esecuzione</label>
        <textarea class="ex-input-note" placeholder="Es. Mantieni la schiena ben aderente..." oninput="aggiorna()">${escapeHtml(note)}</textarea>
      </div>
      <input type="hidden" class="ex-input-image" value="${escapeAttr(immagine || '')}">
    `;
}

// Test
const exercise = {
  nome: 'Single Leg Hop',
  serie: '3',
  ripetizioni: '10',
  recupero: '60s',
  video: 'https://youtu.be/dummy',
  note: 'Test note',
  immagine: 'https://example.com/single-leg-hop.jpg'
};

const html = buildBlockHtml({
  nome: exercise.nome,
  ser: exercise.serie,
  rep: exercise.ripetizioni,
  rec: exercise.recupero,
  link: exercise.video,
  note: exercise.note,
  immagine: exercise.immagine
});

console.log('Generated block HTML snippet includes hidden image input:');
const m = html.match(/class=\"ex-input-image\" value=\"([^\"]*)\"/);
if (m) {
  console.log('hidden input value (escaped):', m[1]);
  // unescape basic HTML entities for demonstration
  const unescaped = m[1].replace(/&amp;/g, '&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
  console.log('hidden input value (unescaped):', unescaped);
  if (unescaped === exercise.immagine) {
    console.log('TEST PASSED: immagine preserved to hidden input');
    process.exit(0);
  } else {
    console.error('TEST FAILED: mismatch');
    process.exit(2);
  }
} else {
  console.error('TEST FAILED: hidden input not found');
  process.exit(2);
}
