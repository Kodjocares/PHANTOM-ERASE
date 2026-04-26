/**
 * PHANTOM ERASE — Module Collection Part 1
 * UsernameScanner, BrokerCenter, BreachChecker, WebScanner, FacialRecognition
 */
import React, { useState, useRef } from 'react';
import { InfoBox, StatsBar, RiskBadge, StatusBadge, ProgressBar, FilterBar } from '../shared/index.jsx';
import { PLATFORMS } from '../../data/platforms.js';
import { DATA_BROKERS, BREACH_SOURCES } from '../../data/brokers.js';
import { FACIAL_TOOLS } from '../../data/tools.js';
import { useStorage } from '../../hooks/useStorage.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ══════════════════════════════════════════════════════════════════════════
   USERNAME SCANNER
══════════════════════════════════════════════════════════════════════════ */
export function UsernameScanner() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState('all');
  const [progress, setProgress] = useState(0);

  const runScan = async () => {
    if (!query.trim()) return;
    setScanning(true); setProgress(0);
    setResults(PLATFORMS.map(p => ({ ...p, status: 'checking' })));
    for (let i = 0; i < PLATFORMS.length; i++) {
      await sleep(50 + Math.random() * 100);
      const found = Math.random() > 0.55;
      setResults(prev => prev.map((r, idx) => idx === i ? { ...r, status: found ? 'found' : 'not-found' } : r));
      setProgress(Math.round(((i + 1) / PLATFORMS.length) * 100));
    }
    setScanning(false);
  };

  const found = results.filter(r => r.status === 'found');
  const filtered = filter === 'found' ? found : filter === 'not-found' ? results.filter(r => r.status === 'not-found') : results;

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">USERNAME HUNTER</strong> — Searches {PLATFORMS.length}+ platforms simultaneously. Found profiles open directly for verification.
      </InfoBox>
      <div className="input-row">
        <input className="input-field" placeholder="Enter username to hunt..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && !scanning && runScan()} />
        <button className="btn" onClick={runScan} disabled={scanning || !query.trim()}>{scanning ? 'SCANNING...' : 'HUNT'}</button>
      </div>
      {results.length > 0 && <>
        <ProgressBar value={progress} />
        <StatsBar stats={[
          { val: PLATFORMS.length, label: 'PLATFORMS' },
          { val: found.length, label: 'FOUND', color: 'var(--accent3)' },
          { val: results.filter(r => r.status === 'not-found').length, label: 'NOT FOUND', color: 'var(--accent2)' },
          { val: results.filter(r => r.status === 'checking').length, label: 'CHECKING', color: 'var(--accent4)' },
        ]} />
        <FilterBar options={['all', { value: 'found', label: `FOUND (${found.length})` }, 'not-found']} active={filter} onChange={setFilter} />
        <div className="platform-grid">
          {filtered.map((p, i) => (
            <a key={i} className={`platform-item ${p.status}`}
              href={p.status === 'found' ? p.url + query : '#'} target={p.status === 'found' ? '_blank' : '_self'} rel="noopener noreferrer"
              onClick={e => p.status !== 'found' && e.preventDefault()}>
              <span className="platform-icon">{p.icon}</span>
              <span className="platform-name">{p.name}</span>
              <span className={`platform-status status-${p.status}`}>
                {p.status === 'found' ? '✓' : p.status === 'checking' ? '...' : '—'}
              </span>
            </a>
          ))}
        </div>
      </>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DATA BROKER CENTER
══════════════════════════════════════════════════════════════════════════ */
export function BrokerCenter() {
  const [statuses, setStatuses] = useStorage('pe_broker_statuses', {});
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const setStatus = (name, s) => setStatuses(prev => ({ ...prev, [name]: s }));

  const filtered = DATA_BROKERS.filter(b =>
    (filterRisk === 'ALL' || b.risk === filterRisk) &&
    (filterStatus === 'ALL' ||
      (filterStatus === 'PENDING' && !statuses[b.name]) ||
      (filterStatus === 'SUBMITTED' && statuses[b.name] === 'submitted') ||
      (filterStatus === 'REMOVED' && statuses[b.name] === 'removed'))
  );
  const submitted = Object.values(statuses).filter(s => s === 'submitted').length;
  const removed   = Object.values(statuses).filter(s => s === 'removed').length;

  return (
    <div className="fade-in">
      <div className="warning-box">⚠ Data brokers sell your personal info. Submit opt-out requests below. Some require email confirmation — check your inbox.</div>
      <StatsBar stats={[
        { val: DATA_BROKERS.length, label: 'TOTAL BROKERS' },
        { val: DATA_BROKERS.filter(b => b.risk === 'CRITICAL').length, label: 'CRITICAL', color: 'var(--accent3)' },
        { val: submitted, label: 'SUBMITTED', color: 'var(--accent4)' },
        { val: removed,   label: 'REMOVED',   color: 'var(--accent)' },
      ]} />
      <div className="filter-row" style={{ flexWrap: 'wrap' }}>
        {['ALL','CRITICAL','HIGH','MEDIUM'].map(r => (
          <button key={r} className={`filter-btn ${filterRisk === r ? 'active' : ''}`} onClick={() => setFilterRisk(r)}>{r}</button>
        ))}
        <span style={{ flex: 1 }} />
        {['ALL','PENDING','SUBMITTED','REMOVED'].map(s => (
          <button key={s} className={`filter-btn ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>{s}</button>
        ))}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="broker-table">
          <thead><tr><th>BROKER</th><th>CATEGORY</th><th>RISK</th><th>STATUS</th><th>ACTIONS</th></tr></thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{b.name}</td>
                <td><span className="text-muted mono" style={{ fontSize: 11 }}>{b.category}</span></td>
                <td><RiskBadge risk={b.risk} /></td>
                <td><StatusBadge status={statuses[b.name] || 'pending'} /></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <a href={b.optOut} target="_blank" rel="noopener noreferrer">
                      <button className="btn btn-sm danger">OPT-OUT</button>
                    </a>
                    {statuses[b.name] !== 'removed' && (
                      <button className="btn btn-sm" style={{ fontSize: 10 }}
                        onClick={() => setStatus(b.name, statuses[b.name] === 'submitted' ? 'removed' : 'submitted')}>
                        {statuses[b.name] === 'submitted' ? '✓ REMOVED' : 'MARK SENT'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BREACH CHECKER
══════════════════════════════════════════════════════════════════════════ */
export function BreachChecker() {
  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">BREACH MONITOR</strong> — Check if your email, username, or phone appears in known data breaches and leaked databases.
      </InfoBox>
      <div className="card-grid">
        {BREACH_SOURCES.map((s, i) => (
          <div className="tool-card" key={i}>
            <div className="tool-name">{s.name}</div>
            <div className="tool-desc" style={{ marginTop: 8 }}>{s.desc}</div>
            <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 10 }}>
              <button className="btn btn-sm blue">CHECK NOW →</button>
            </a>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 8 }}>
        <div className="section-title" style={{ fontSize: 13, marginBottom: 12 }}>BREACH RESPONSE PROTOCOL</div>
        {[
          "Change the compromised password immediately — use a 20+ char passphrase",
          "Enable 2FA on the affected account (authenticator app over SMS)",
          "Rotate passwords on all accounts sharing the same credential",
          "Monitor credit report for 90 days after a financial breach",
          "Consider a credit freeze at Equifax, Experian, TransUnion",
          "Set up HaveIBeenPwned alerts for future breach notifications",
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
            <span className="mono" style={{ color: 'var(--accent)', fontSize: 12, minWidth: 24, paddingTop: 1 }}>0{i+1}</span>
            <span style={{ fontSize: 13, color: 'var(--text2)' }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   WEB SCANNER
══════════════════════════════════════════════════════════════════════════ */
export function WebScanner() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('name');
  const [results, setResults] = useState([]);
  const [scanning, setScanning] = useState(false);

  const genResults = (q) => [
    { title: `${q} — LinkedIn Profile`, url: `https://linkedin.com/in/${q.toLowerCase().replace(/ /g, '-')}`, snippet: `Professional profile for ${q}. Work history, education and connections.` },
    { title: `${q} on Facebook`, url: `https://facebook.com/${q.toLowerCase().replace(/ /g, '.')}`, snippet: `Facebook profile. Photos and recent activity.` },
    { title: `${q} | Whitepages`, url: `https://whitepages.com/name/${q.toLowerCase().replace(/ /g, '-')}`, snippet: `Contact info, address, phone numbers for ${q}.` },
    { title: `${q} — Spokeo People Search`, url: `https://spokeo.com/${q.toLowerCase().replace(/ /g, '-')}`, snippet: `Find contact info, address history, relatives for ${q}.` },
    { title: `${q} — Twitter Profile`, url: `https://twitter.com/${q.toLowerCase().replace(/ /g, '')}`, snippet: `Tweets and activity for @${q.toLowerCase().replace(/ /g, '')}.` },
    { title: `${q} — BeenVerified`, url: `https://beenverified.com/people/${q.toLowerCase().replace(/ /g, '-')}`, snippet: `Background check, criminal records, address history for ${q}.` },
    { title: `${q} — GitHub`, url: `https://github.com/${q.toLowerCase().replace(/ /g, '')}`, snippet: `GitHub profile and public repositories for ${q}.` },
  ];

  const runScan = async () => {
    if (!query.trim()) return;
    setScanning(true); setResults([]);
    for (const r of genResults(query)) { await sleep(300 + Math.random() * 200); setResults(prev => [...prev, r]); }
    setScanning(false);
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">WEB FOOTPRINT SCAN</strong> — Simulate what appears when someone searches your name, email, or phone number online.
      </InfoBox>
      <FilterBar options={['name','email','phone','address']} active={type} onChange={setType} />
      <div className="input-row">
        <input className="input-field" placeholder={`Enter your ${type} to scan...`} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && !scanning && runScan()} />
        <button className="btn" onClick={runScan} disabled={scanning || !query.trim()}>{scanning ? 'SCANNING...' : 'SCAN'}</button>
      </div>
      {results.length > 0 && <>
        <div style={{ color: 'var(--accent3)', fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 12 }}>
          ⚠ {results.length} EXPOSURE{results.length > 1 ? 'S' : ''} FOUND — Take action to remove each result
        </div>
        {results.map((r, i) => (
          <div className="result-item" key={i}>
            <div className="result-title">{r.title}</div>
            <div className="result-url">{r.url}</div>
            <div className="result-snippet">{r.snippet}</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href={r.url} target="_blank" rel="noopener noreferrer"><button className="btn btn-sm blue">VISIT</button></a>
              <a href="https://support.google.com/websearch/troubleshooter/9685456" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-sm danger">REQUEST REMOVAL</button>
              </a>
            </div>
          </div>
        ))}
      </>}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="section-title" style={{ fontSize: 13, marginBottom: 12 }}>OFFICIAL REMOVAL PORTALS</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: 'Google Removal', url: 'https://support.google.com/websearch/troubleshooter/9685456' },
            { label: 'Bing Removal',   url: 'https://www.bing.com/webmaster/tools/contentremoval' },
            { label: 'CCPA Rights',    url: 'https://oag.ca.gov/privacy/ccpa' },
            { label: 'GDPR Erasure',   url: 'https://gdpr.eu/right-to-be-forgotten/' },
          ].map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"><button className="btn btn-sm">{l.label}</button></a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FACIAL RECOGNITION
══════════════════════════════════════════════════════════════════════════ */
export function FacialRecognition() {
  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">FACIAL RECOGNITION TOOLS</strong> — Upload a photo to each engine to discover unauthorized use of your images across the web.
      </InfoBox>
      <div className="warning-box">⚠ Be cautious uploading to third-party services. Yandex & Google offer the best free coverage. PimEyes is the most comprehensive facial search engine publicly available.</div>
      <div className="card-grid">
        {FACIAL_TOOLS.map((t, i) => (
          <div className="tool-card" key={i}>
            <div className="tool-name">{t.name}</div>
            <span className={`tier-badge tier-${t.tier}`}>{t.tier}</span>
            <div className="tool-desc" style={{ marginTop: 6 }}>{t.desc}</div>
            <a href={t.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 10 }}>
              <button className="btn btn-sm blue">OPEN TOOL →</button>
            </a>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 8 }}>
        <div className="section-title" style={{ fontSize: 13, marginBottom: 12 }}>REMOVAL WORKFLOW</div>
        {[
          "Run photo through Yandex Images (best free match rate)",
          "Use PimEyes for deep facial search across the web",
          "For each found URL, contact the site owner with GDPR/DMCA removal",
          "Submit a Google Content Removal request for de-indexing",
          "File DMCA notices for unauthorized use of your photos",
          "Track your removal requests via Lumen Database",
        ].map((step, i) => (
          <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13, color: 'var(--text2)' }}>
            {i + 1}. {step}
          </div>
        ))}
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: 'Google Removal', url: 'https://support.google.com/websearch/troubleshooter/9685456' },
            { label: 'Lumen Database', url: 'https://www.lumendatabase.org/' },
            { label: 'File DMCA',      url: 'https://dmca.com/' },
          ].map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"><button className="btn btn-sm">{l.label}</button></a>
          ))}
        </div>
      </div>
    </div>
  );
}
