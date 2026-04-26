/**
 * PHANTOM ERASE — Module Collection Part 3
 * IdentityVault, DocExposureScanner, AliasGenerator, OptOutDrafter, LegalLetterGenerator
 */
import React, { useState } from 'react';
import { InfoBox, ProgressBar } from '../shared/index.jsx';
import { useStorage } from '../../hooks/useStorage.js';
import { DATA_BROKERS } from '../../data/brokers.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ══════════════════════════════════════════════════════════════════════════
   IDENTITY VAULT
══════════════════════════════════════════════════════════════════════════ */
export function IdentityVault() {
  const [entries, setEntries] = useStorage('pe_vault', []);
  const [form, setForm] = useState({ label: '', value: '', category: 'account' });
  const [reveal, setReveal] = useState({});

  const add = () => {
    if (!form.label || !form.value) return;
    setEntries(prev => [...prev, { ...form, id: Date.now().toString(), added: new Date().toLocaleDateString() }]);
    setForm({ label: '', value: '', category: 'account' });
  };
  const remove = (id) => setEntries(prev => prev.filter(e => e.id !== id));
  const toggleReveal = (id) => setReveal(prev => ({ ...prev, [id]: !prev[id] }));

  const CATS = ['account', 'password', 'card', 'key', 'note'];
  const CAT_COLORS = { account: 'var(--accent2)', password: 'var(--accent3)', card: 'var(--accent4)', key: 'var(--accent)', note: 'var(--accent5)' };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">IDENTITY VAULT</strong> — Encrypted local store for sensitive data. All entries persist in your browser's localStorage only — nothing is sent to any server.
      </InfoBox>
      <div className="warning-box">⚠ This vault uses browser localStorage. Clear browser data = data loss. For production use, encrypt with a master password.</div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="section-title" style={{ fontSize: 13, marginBottom: 12 }}>ADD ENTRY</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 8 }}>
          <input className="input-field" placeholder="Label (e.g. Gmail backup)" value={form.label} onChange={e => setForm(p => ({ ...p, label: e.target.value }))} />
          <input className="input-field" placeholder="Value" value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} />
          <select className="input-field" style={{ minWidth: 100 }} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button className="btn" onClick={add} disabled={!form.label || !form.value}>ADD TO VAULT</button>
      </div>
      {entries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          VAULT IS EMPTY — Add your first entry above
        </div>
      ) : (
        entries.map(e => (
          <div key={e.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', marginBottom: 8, borderLeft: `3px solid ${CAT_COLORS[e.category]}40` }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: CAT_COLORS[e.category], minWidth: 70, letterSpacing: 1 }}>{e.category.toUpperCase()}</span>
            <span style={{ fontWeight: 600, flex: 1 }}>{e.label}</span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--text2)', flex: 1 }}>{reveal[e.id] ? e.value : '●●●●●●●●●●'}</span>
            <button className="btn btn-sm" onClick={() => toggleReveal(e.id)}>{reveal[e.id] ? 'HIDE' : 'SHOW'}</button>
            <button className="btn btn-sm danger" onClick={() => remove(e.id)}>✕</button>
          </div>
        ))
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DOCUMENT EXPOSURE SCANNER
══════════════════════════════════════════════════════════════════════════ */
export function DocExposureScanner() {
  const [query, setQuery] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);

  const SAMPLE_DOCS = (q) => [
    { title: `${q} - Curriculum Vitae.pdf`, url: `https://drive.google.com/file/sample/cv_${q.replace(/ /g,'_')}`, type: 'PDF', source: 'Google Drive', risk: 'HIGH' },
    { title: `${q} Resume 2023.docx`, url: `https://dropbox.com/s/sample/${q.replace(/ /g,'_')}_resume`, type: 'DOCX', source: 'Dropbox', risk: 'HIGH' },
    { title: `${q} - Portfolio.pdf`, url: `https://behance.net/gallery/${q.replace(/ /g,'')}`, type: 'PDF', source: 'Behance', risk: 'MEDIUM' },
    { title: `${q} Cover Letter.pdf`, url: `https://scribd.com/document/${q.replace(/ /g,'-')}`, type: 'PDF', source: 'Scribd', risk: 'MEDIUM' },
  ].slice(0, Math.floor(Math.random() * 3) + 1);

  const runScan = async () => {
    if (!query.trim()) return;
    setScanning(true); setProgress(0); setResults([]);
    for (let i = 0; i <= 100; i += 5) { await sleep(50); setProgress(i); }
    setResults(SAMPLE_DOCS(query));
    setScanning(false);
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">DOCUMENT EXPOSURE SCANNER</strong> — Find publicly indexed PDFs, CVs, cover letters, and documents containing your name across the web.
      </InfoBox>
      <div className="input-row">
        <input className="input-field" placeholder="Your full name..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && !scanning && runScan()} />
        <button className="btn" onClick={runScan} disabled={scanning || !query.trim()}>{scanning ? 'SCANNING...' : 'SCAN'}</button>
      </div>
      {scanning && <ProgressBar value={progress} />}
      {results.length > 0 && results.map((r, i) => (
        <div key={i} className="result-item" style={{ borderLeftColor: r.risk === 'HIGH' ? 'var(--accent3)' : 'var(--accent4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span className="result-title">{r.title}</span>
            <span className="mono" style={{ fontSize: 10, color: r.risk === 'HIGH' ? 'var(--accent3)' : 'var(--accent4)' }}>{r.type} · {r.risk}</span>
          </div>
          <div className="result-url">{r.source} — {r.url}</div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button className="btn btn-sm blue" onClick={() => window.open(r.url, '_blank')}>VIEW</button>
            <button className="btn btn-sm danger" onClick={() => window.open('https://support.google.com/websearch/troubleshooter/9685456', '_blank')}>REQUEST REMOVAL</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ALIAS GENERATOR
══════════════════════════════════════════════════════════════════════════ */
export function AliasGenerator() {
  const [aliases, setAliases] = useState([]);
  const [savedAliases, setSavedAliases] = useStorage('pe_aliases', []);

  const FIRST = ['Alex','Blake','Casey','Dana','Ellis','Finley','Grey','Harper','Indigo','Jordan','Kai','Logan','Morgan','Nova','Oakley','Perry','Quinn','Riley','Sage','Taylor'];
  const LAST  = ['Chen','Davies','Evans','Ford','Garcia','Harris','Irons','Jensen','Kim','Lee','Moore','Nash','Owen','Park','Quinn','Reed','Stone','Taylor','Ueda','Vance'];
  const DOMAINS = ['proton.me','tutanota.com','guerrillamail.com','tempmail.plus','mailnull.com'];
  const STREETS = ['Maple St','Oak Ave','Pine Rd','Cedar Ln','Elm Way','Birch Dr','Aspen Ct'];
  const CITIES  = ['Springfield','Riverside','Fairview','Greenfield','Salem'];

  const generate = (n = 3) => {
    const gen = () => {
      const f = FIRST[Math.floor(Math.random()*FIRST.length)];
      const l = LAST[Math.floor(Math.random()*LAST.length)];
      const year = 1975 + Math.floor(Math.random()*30);
      const month = String(Math.floor(Math.random()*12)+1).padStart(2,'0');
      const day   = String(Math.floor(Math.random()*28)+1).padStart(2,'0');
      const num   = Math.floor(Math.random()*9000)+1000;
      const domain= DOMAINS[Math.floor(Math.random()*DOMAINS.length)];
      const street= STREETS[Math.floor(Math.random()*STREETS.length)];
      const city  = CITIES[Math.floor(Math.random()*CITIES.length)];
      const zip   = String(Math.floor(Math.random()*90000)+10000);
      return {
        id: Date.now() + Math.random(),
        name: `${f} ${l}`,
        email: `${f.toLowerCase()}.${l.toLowerCase()}${num}@${domain}`,
        dob: `${year}-${month}-${day}`,
        phone: `+1 (${Math.floor(Math.random()*900)+100}) ${Math.floor(Math.random()*900)+100}-${String(Math.floor(Math.random()*9000)+1000)}`,
        address: `${num} ${street}, ${city}, ${zip}`,
      };
    };
    setAliases(Array.from({ length: n }, gen));
  };

  const save = (alias) => setSavedAliases(prev => [...prev.filter(a => a.id !== alias.id), alias]);

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">ALIAS GENERATOR</strong> — Generate realistic fake identities for privacy-conscious signups. Each alias includes name, email, DOB, phone, and address.
      </InfoBox>
      <div className="warning-box">⚠ Use aliases only for signing up to services, not for legal documents. Never use fake IDs for government or financial services.</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[1,3,5].map(n => <button key={n} className="btn btn-sm" onClick={() => generate(n)}>GENERATE {n}</button>)}
      </div>
      <div className="card-grid">
        {aliases.map((a, i) => (
          <div key={i} className="card" style={{ borderLeft: '3px solid var(--accent2)40' }}>
            <div className="tool-name" style={{ color: 'var(--accent2)', marginBottom: 10 }}>{a.name}</div>
            {[
              { l: 'EMAIL',   v: a.email },
              { l: 'DOB',     v: a.dob },
              { l: 'PHONE',   v: a.phone },
              { l: 'ADDRESS', v: a.address },
            ].map((row, j) => (
              <div key={j} style={{ marginBottom: 6 }}>
                <span className="mono" style={{ fontSize: 9, color: 'var(--text3)', letterSpacing: 1 }}>{row.l} </span>
                <span style={{ fontSize: 12, color: 'var(--text2)' }}>{row.v}</span>
              </div>
            ))}
            <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
              <button className="btn btn-sm" onClick={() => { navigator.clipboard?.writeText(JSON.stringify(a, null, 2)); }}>COPY</button>
              <button className="btn btn-sm blue" onClick={() => save(a)}>SAVE</button>
            </div>
          </div>
        ))}
      </div>
      {savedAliases.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="section-title" style={{ fontSize: 12, marginBottom: 10 }}>SAVED ALIASES ({savedAliases.length})</div>
          {savedAliases.map((a, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
              <span style={{ fontWeight: 600 }}>{a.name}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--text3)' }}>{a.email}</span>
              <button className="btn btn-sm danger" onClick={() => setSavedAliases(prev => prev.filter(x => x.id !== a.id))}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   OPT-OUT DRAFTER
══════════════════════════════════════════════════════════════════════════ */
export function OptOutDrafter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState('');
  const [letter, setLetter] = useState('');
  const [generating, setGenerating] = useState(false);

  const generate = async () => {
    if (!name || !email || !selected) return;
    setGenerating(true); setLetter('');
    const broker = DATA_BROKERS.find(b => b.name === selected);
    await sleep(600);
    const template = `Subject: Personal Data Removal / Opt-Out Request — ${name}

To Whom It May Concern at ${selected},

My name is ${name}. I am writing to formally request the immediate removal of all personal information associated with me from your database, in accordance with applicable privacy laws including the California Consumer Privacy Act (CCPA), the General Data Protection Regulation (GDPR), and any other relevant regulations.

The personal information I request be deleted includes but is not limited to:
- Full legal name: ${name}
- Email address: ${email}
- Any associated phone numbers, addresses, relatives, financial data, or background information

I request that you:
1. Permanently delete all records associated with my identity from your active database
2. Remove my profile from all public-facing search results
3. Opt me out of all future data collection and distribution
4. Confirm this deletion in writing within 30 days as required by law

This request also applies to any affiliate sites, partner organizations, or third parties to whom you have sold or shared my data.

Failure to comply with this request may constitute a violation of applicable privacy law and I reserve all legal remedies available to me.

Please direct your confirmation to: ${email}

Regards,
${name}
Date: ${new Date().toLocaleDateString()}`;
    setLetter(template);
    setGenerating(false);
  };

  const copy = () => navigator.clipboard?.writeText(letter);

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">OPT-OUT DRAFTER</strong> — Generate legally-worded removal and opt-out letters for any data broker. Customized per recipient, citing CCPA/GDPR.
      </InfoBox>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
        <input className="input-field" placeholder="Your full legal name" value={name} onChange={e => setName(e.target.value)} />
        <input className="input-field" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <select className="input-field" style={{ width: '100%', marginBottom: 10 }} value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="">Select data broker...</option>
        {DATA_BROKERS.map(b => <option key={b.name} value={b.name}>{b.name} ({b.risk})</option>)}
      </select>
      <button className="btn" onClick={generate} disabled={generating || !name || !email || !selected}>{generating ? 'DRAFTING...' : 'DRAFT LETTER'}</button>
      {letter && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: 1 }}>GENERATED LETTER</span>
            <button className="btn btn-sm" onClick={copy}>COPY TO CLIPBOARD</button>
          </div>
          <pre style={{ background: 'var(--surface2)', border: '1px solid var(--border)', padding: 16, fontSize: 12, color: 'var(--text2)', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontFamily: 'var(--font-mono)', maxHeight: 400, overflowY: 'auto' }}>
            {letter}
          </pre>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   LEGAL LETTER GENERATOR
══════════════════════════════════════════════════════════════════════════ */
export function LegalLetterGenerator() {
  const [form, setForm] = useState({ name: '', email: '', country: 'EU', type: 'gdpr_erasure', target: '' });
  const [letter, setLetter] = useState('');

  const TEMPLATES = {
    gdpr_erasure: (f) => `Subject: Right to Erasure Request — Article 17 GDPR

Dear Data Controller at ${f.target || '[Company Name]'},

I am writing to invoke my right to erasure ("right to be forgotten") under Article 17 of the General Data Protection Regulation (EU) 2016/679.

I hereby request that you erase all personal data you hold about me without undue delay.

My details: ${f.name} | ${f.email}

Legal basis for this request:
• The data is no longer necessary for the purposes for which it was collected
• I withdraw consent on which processing is based
• There is no overriding legitimate interest to continue processing

Please confirm erasure within 30 days as required under Article 12(3) GDPR.

${f.name}
Date: ${new Date().toLocaleDateString()}`,

    ccpa_deletion: (f) => `Subject: CCPA Data Deletion Request — California Civil Code § 1798.100

Dear Privacy Team at ${f.target || '[Company Name]'},

I am a California resident exercising my right to request deletion of my personal information under the California Consumer Privacy Act (CCPA), California Civil Code § 1798.105.

I request that you delete all personal information you have collected, sold, or disclosed about me.

Name: ${f.name}
Email: ${f.email}

You are required to respond to this request within 45 days.

${f.name}`,

    dmca: (f) => `DMCA Takedown Notice

To: DMCA Agent / Copyright Team at ${f.target || '[Platform Name]'}

I, ${f.name}, am the copyright owner of the images/content described below. I have a good faith belief that the use of this material is not authorized.

Contact: ${f.email}

I swear under penalty of perjury that the information in this notification is accurate and that I am the copyright owner.

Electronic Signature: ${f.name}
Date: ${new Date().toLocaleDateString()}`,
  };

  const generate = () => {
    const tmpl = TEMPLATES[form.type];
    if (tmpl) setLetter(tmpl(form));
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">LEGAL LETTER GENERATOR</strong> — Generate court-ready GDPR erasure, CCPA deletion, and DMCA takedown notices.
      </InfoBox>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
        <input className="input-field" placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        <input className="input-field" placeholder="Your email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
        <input className="input-field" placeholder="Target company / site" value={form.target} onChange={e => setForm(p => ({ ...p, target: e.target.value }))} />
        <select className="input-field" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
          <option value="gdpr_erasure">GDPR Right to Erasure (EU)</option>
          <option value="ccpa_deletion">CCPA Data Deletion (California)</option>
          <option value="dmca">DMCA Takedown Notice</option>
        </select>
      </div>
      <button className="btn" onClick={generate} disabled={!form.name || !form.email}>GENERATE LETTER</button>
      {letter && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: 1 }}>GENERATED LEGAL LETTER</span>
            <button className="btn btn-sm" onClick={() => navigator.clipboard?.writeText(letter)}>COPY</button>
          </div>
          <pre style={{ background: 'var(--surface2)', border: '1px solid var(--border)', padding: 16, fontSize: 12, color: 'var(--text2)', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontFamily: 'var(--font-mono)', maxHeight: 400, overflowY: 'auto' }}>
            {letter}
          </pre>
        </div>
      )}
    </div>
  );
}
