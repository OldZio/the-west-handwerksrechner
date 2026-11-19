// ==UserScript==
// @name         Old Zio – Silber- und Goldarbeiten
// @namespace    oldzio.thewest
// @version      1.0.0
// @description  Findet besondere Arbeitsorte und zeigt sie auf der Karte.
// @match        https://*.the-west.de/game.php*
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==
(() => {
  'use strict';
  const game = unsafeWindow;
  const host = document.createElement('div');
  document.body.append(host);
  const root = host.attachShadow({mode:'open'});
  root.innerHTML = `<style>
  :host{position:fixed;bottom:75px;right:12px;z-index:99999;font:14px system-ui;color:#342516}
  button,select{cursor:pointer;padding:5px}dialog{width:min(440px,85vw);color:#342516;background:#fff6df;border:2px solid #816238;border-radius:9px}
  header,li{display:flex;align-items:center;justify-content:space-between;gap:8px}
  ul{padding:0;max-height:45vh;overflow:auto}li{border-top:1px solid #d8cbb0;padding:5px}
  </style><button id="open">Silber / Gold</button><dialog><header><b>Silber- und Goldarbeiten</b><button id="close">Schliessen</button></header>
  <p><button id="scan">Karte durchsuchen</button> <select aria-label="Arbeitsorte filtern"><option>Alle</option><option>Gold</option><option>Silber</option></select></p>
  <p role="status">Starte die Suche nach Arbeitsorten.</p><ul></ul></dialog>`;
  const el = selector => root.querySelector(selector);
  const dialog = el('dialog');
  const status = el('[role=status]');
  const results = new Map();
  el('#open').onclick = () => dialog.showModal();
  el('#close').onclick = () => dialog.close();
  el('select').onchange = render;

  function render() {
    const list = el('ul');
    list.replaceChildren();
    for (const job of results.values()) {
      const type = [true,1,'1','true'].includes(job.gold) ? 'Gold' : 'Silber';
      if (el('select').value !== 'Alle' && el('select').value !== type) continue;
      const name = game.JobList?.getJobById?.(job.job_id)?.name || 'Arbeit ' + job.job_id;
      const row = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = 'Zeigen';
      button.onclick = () => { game.GameMap.center(Number(job.x),Number(job.y)); dialog.close(); };
      row.append(type + ' · ' + name + ' (' + job.x + ', ' + job.y + ')',button);
      list.append(row);
    }
  }

  function readMap(action, params) {
    return new Promise((resolve,reject) => {
      const timeout = setTimeout(() => reject(new Error('Zeitüberschreitung beim Kartenabruf.')),30000);
      function finish(value) {clearTimeout(timeout); resolve(value);}
      try {
        const request = game.Ajax.get('map',action,params,finish);
        request?.fail?.(() => {clearTimeout(timeout); reject(new Error('Kartenabruf fehlgeschlagen.'));});
      } catch (error) {clearTimeout(timeout); reject(error);}
    });
  }

  el('#scan').onclick = async () => {
    const scan = el('#scan');
    scan.disabled = true;
    results.clear();
    render();
    try {
      status.textContent = 'Lade Arbeitsorte …';
      const size = Number(game.GameMap?.tileSize);
      if (!(size > 0) || !game.Ajax?.get) throw new Error('Bitte zuerst die Spielkarte vollständig öffnen.');
      const overview = await readMap('get_minimap',{});
      const tiles = new Set();
      for (const coords of Object.values(overview.job_groups || {})) {
        for (const [x,y] of Object.values(coords)) {
          tiles.add(JSON.stringify([Math.floor(x/size),Math.floor(y/size)]));
        }
      }
      if (!tiles.size) throw new Error('Keine Arbeitsorte in den Kartendaten erkannt.');
      const areas = Array.from(tiles, t => JSON.parse(t));
      for (let i=0;i<areas.length;i+=12) {
        status.textContent = 'Kartensuche: ' + i + ' von ' + areas.length + ' Bereichen';
        const data = await readMap('get_complete_data',{tiles:JSON.stringify(areas.slice(i,i+12))});
        if (!data.dynamic) throw new Error('Unerwartetes Kartenformat.');
        for (const region of Object.values(data.dynamic))
          for (const column of Object.values(region))
            for (const cell of Object.values(column))
              for (const entry of Object.values(cell)) {
                const job = entry?.[1];
                if (job?.job_id && job.x != null && job.y != null)
                  results.set([job.job_id,job.x,job.y].join('/'),job);
              }
      }
      status.textContent = results.size + ' besondere Arbeitsorte gefunden.';
    } catch (error) {status.textContent = 'Suche unvollständig. ' + error.message;}
    finally {scan.disabled = false; render();}
  };
})();
