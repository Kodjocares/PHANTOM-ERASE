export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
export const rand = arr => arr[Math.floor(Math.random() * arr.length)];

export function getRiskColor(risk) {
  const m = { CRITICAL:'#ff2d55', HIGH:'#ff9f0a', MEDIUM:'#30d158', LOW:'#636366' };
  return m[risk] || '#636366';
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
}

export async function copyToClipboard(text) {
  if (navigator.clipboard) return navigator.clipboard.writeText(text);
  const el = document.createElement('textarea');
  el.value = text; document.body.appendChild(el); el.select();
  document.execCommand('copy'); document.body.removeChild(el);
}

export function generateAlias() {
  const fns = ['Alex','Jordan','Morgan','Riley','Casey','Avery','Drew','Blake','Quinn','Reese'];
  const lns = ['Smith','Johnson','Williams','Brown','Davis','Miller','Wilson','Moore','Taylor'];
  const sts = ['Oak','Maple','Cedar','Pine','Elm','Birch','Cherry','Walnut'];
  const cit = ['Springfield','Riverside','Greenville','Fairview','Madison','Burlington'];
  const sta = ['CA','TX','FL','NY','WA','OR','CO','GA'];
  const dom = ['gmail','yahoo','outlook','proton','tutanota'];
  const fn = rand(fns), ln = rand(lns);
  return {
    name:    `${fn} ${ln}`,
    email:   `${fn.toLowerCase()}.${ln.toLowerCase()}${Math.floor(Math.random()*99)}@${rand(dom)}.com`,
    address: `${Math.floor(Math.random()*9999)+1} ${rand(sts)} St, ${rand(cit)}, ${rand(sta)} ${Math.floor(Math.random()*90000)+10000}`,
    phone:   `+1 (${Math.floor(Math.random()*900)+100}) ${Math.floor(Math.random()*900)+100}-${Math.floor(Math.random()*9000)+1000}`,
    dob:     `${Math.floor(Math.random()*28)+1974}-${String(Math.floor(Math.random()*12)+1).padStart(2,'0')}-01`,
    username:`${fn.toLowerCase()}${ln.toLowerCase().slice(0,3)}${Math.floor(Math.random()*999)}`,
  };
}

export const scoreColor = s => s >= 75 ? '#30d158' : s >= 50 ? '#ff9f0a' : '#ff2d55';
export const scoreLabel = s => s >= 80 ? 'SECURE' : s >= 60 ? 'MODERATE' : s >= 40 ? 'AT RISK' : 'CRITICAL';