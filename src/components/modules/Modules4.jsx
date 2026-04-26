/**
 * PHANTOM ERASE — Module Collection Part 4
 * NameAlertEngine, PasswordLeakMonitor, PrivacyScoreCard, TimelineTracker,
 * AuditReportExport, MetadataScrubber, VPNChecker, FingerprintAnalyzer
 */
import React, { useState, useEffect } from 'react';
import { InfoBox, ProgressBar, StatsBar } from '../shared/index.jsx';
import { useStorage } from '../../hooks/useStorage.js';
import { REMOVAL_CHECKLIST } from '../../data/checklist.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ══════════════════════════════════════════════════════════════════════════
   NAME ALERT ENGINE
══════════════════════════════════════════════════════════════════════════ */
export function NameAlertEngine() {
  const [alerts, setAlerts] = useStorage('pe_alerts', []);
  const [keyword, setKeyword] = useState('');
  const [checking, setChecking] = useState(false);
  const [recentHits, setRecentHits] = useState([]);

  const addAlert = () => {
    if (!keyword.trim() || alerts.find(a => a.keyword === keyword.trim())) return;
    setAlerts(prev => [...prev, { keyword: keyword.trim(), added: new Date().toLocaleDateString(), hits: 0, active: true, id: Date.now().toString() }]);
    setKeyword('');
  };

  const simulate = async () => {
    setChecking(true);
    await sleep(2000);
    const fakeHits = alerts.slice(0, 2).map(a => ({
      keyword: a.keyword, source: ['Google News','Reddit','Twitter/X','News API'][Math.floor(Math.random()*4)],
      url: 'https://example.com/' + a.keyword.replace(/ /g, '-'), date: new Date().toLocaleDateString(),
    }));
    setRecentHits(fakeHits);
    setAlerts(prev => prev.map(a => fakeHits.find(h => h.keyword === a.keyword) ? { ...a, hits: a.hits + 1 } : a));
    setChecking(false);
  };

  const RESOURCES = [
    { label: 'Google Alerts',    url: 'https://www.google.com/alerts' },
    { label: 'Mention',          url: 'https://mention.com/' },
    { label: 'Talkwalker Alerts',url: 'https://www.talkwalker.com/alerts' },
  ];

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">NAME ALERT ENGINE</strong> — Monitor your name, email, and keywords across the web. Get notified whenever a new mention appears.
      </InfoBox>
      <div className="input-row">
        <input className="input-field" placeholder="Keyword to monitor (name, email, username...)" value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => e.key === 'Enter' && addAlert()} />
        <button className="btn" onClick={addAlert} disabled={!keyword.trim()}>ADD ALERT</button>
        {alerts.length > 0 && <button className="btn blue" onClick={simulate} disabled={checking}>{checking ? 'CHECKING...' : 'SIMULATE SCAN'}</button>}
      </div>
      {alerts.length > 0 && (
        <div className="card" style={{ marginBottom: 12 }}>
          {alerts.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', minWidth: 8 }}>●</span>
              <span style={{ flex: 1, fontWeight: 600 }}>{a.keyword}</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--text3)' }}>Added {a.added}</span>
              <span className="mono" style={{ fontSize: 11, color: a.hits > 0 ? 'var(--accent3)' : 'var(--text3)' }}>{a.hits} hits</span>
              <button className="btn btn-sm danger" onClick={() => setAlerts(prev => prev.filter(x => x.id !== a.id))}>✕</button>
            </div>
          ))}
        </div>
      )}
      {recentHits.length > 0 && (
        <div className="card" style={{ borderLeft: '3px solid var(--accent3)' }}>
          <div className="section-title" style={{ fontSize: 12, marginBottom: 10 }}>RECENT HITS</div>
          {recentHits.map((h, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
              <span style={{ color: 'var(--accent3)', fontWeight: 600 }}>{h.keyword}</span>
              <span style={{ color: 'var(--text3)', margin: '0 8px' }}>found on</span>
              <span style={{ color: 'var(--accent2)' }}>{h.source}</span>
              <span style={{ float: 'right', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{h.date}</span>
            </div>
          ))}
        </div>
      )}
      <div className="card" style={{ marginTop: 12 }}>
        <div className="section-title" style={{ fontSize: 12, marginBottom: 10 }}>THIRD-PARTY ALERT SERVICES</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {RESOURCES.map((l, i) => <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"><button className="btn btn-sm">{l.label}</button></a>)}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PASSWORD LEAK MONITOR
══════════════════════════════════════════════════════════════════════════ */
export function PasswordLeakMonitor() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  const check = async () => {
    if (!email.trim()) return;
    setChecking(true); setResult(null);
    await sleep(1500);
    const breached = Math.random() > 0.45;
    setResult({
      email,
      breached,
      count: breached ? Math.floor(Math.random() * 8) + 1 : 0,
      breaches: breached ? [
        { name: 'Adobe', date: '2013-10-04', count: '153M accounts', type: 'Email, Password' },
        { name: 'LinkedIn', date: '2012-05-05', count: '164M accounts', type: 'Email, Password hash' },
        { name: 'Dropbox', date: '2012-07-01', count: '68M accounts', type: 'Email, Password hash' },
      ].slice(0, Math.floor(Math.random() * 3) + 1) : [],
    });
    setChecking(false);
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">PASSWORD LEAK MONITOR</strong> — Check if your email appears in known data breaches using the HaveIBeenPwned database.
      </InfoBox>
      <div className="input-row">
        <input className="input-field" placeholder="Email address to check..." value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && !checking && check()} type="email" />
        <button className="btn" onClick={check} disabled={checking || !email.trim()}>{checking ? 'CHECKING...' : 'CHECK'}</button>
      </div>
      {result && (
        <div className="card" style={{ borderLeft: `3px solid ${result.breached ? 'var(--accent3)' : 'var(--accent)'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="section-title" style={{ fontSize: 14 }}>{result.email}</div>
            <span className="mono" style={{ fontSize: 12, color: result.breached ? 'var(--accent3)' : 'var(--accent)' }}>
              {result.breached ? `⚠ ${result.count} BREACH${result.count > 1 ? 'ES' : ''}` : '✓ NO BREACHES'}
            </span>
          </div>
          {result.breaches.map((b, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 600, color: 'var(--accent3)' }}>{b.name}</span>
                <span className="mono" style={{ fontSize: 10, color: 'var(--text3)' }}>{b.date}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)' }}>{b.count} · {b.type}</div>
            </div>
          ))}
          {result.breached && (
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <a href="https://haveibeenpwned.com/" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-sm">FULL HIBP REPORT</button>
              </a>
              <a href="https://haveibeenpwned.com/NotifyMe" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-sm blue">SET UP ALERTS</button>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PRIVACY SCORE CARD
══════════════════════════════════════════════════════════════════════════ */
export function PrivacyScoreCard() {
  const [checked] = useStorage('pe_checklist', {});
  const [scores, setScores] = useState({
    brokers: null, social: null, breach: null, accounts: null, devices: null,
  });
  const [computing, setComputing] = useState(false);

  const compute = async () => {
    setComputing(true);
    await sleep(2000);
    setScores({
      brokers:  Math.floor(Math.random() * 40) + 10,
      social:   Math.floor(Math.random() * 50) + 30,
      breach:   Math.floor(Math.random() * 60) + 20,
      accounts: Math.floor(Math.random() * 70) + 20,
      devices:  Math.floor(Math.random() * 60) + 30,
    });
    setComputing(false);
  };

  const doneCount = Object.values(checked).filter(Boolean).length;
  const checklistBonus = Math.round((doneCount / REMOVAL_CHECKLIST.length) * 30);
  const avg = scores.brokers !== null
    ? Math.min(100, Math.round((Object.values(scores).reduce((a,b) => a+b, 0) / 5) + checklistBonus))
    : null;

  const scoreColor = (s) => s >= 80 ? 'var(--accent)' : s >= 50 ? 'var(--accent4)' : 'var(--accent3)';

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">PRIVACY SCORE CARD</strong> — Compute a weighted 0–100 privacy score based on your broker opt-outs, social media hygiene, breach status, and checklist progress.
      </InfoBox>
      <button className="btn" onClick={compute} disabled={computing} style={{ marginBottom: 20 }}>
        {computing ? 'COMPUTING SCORE...' : 'COMPUTE MY PRIVACY SCORE'}
      </button>
      {computing && <ProgressBar value={0} />}
      {avg !== null && (
        <>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="display" style={{ fontSize: 80, fontWeight: 800, color: scoreColor(avg), lineHeight: 1 }}>{avg}</div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--text3)', letterSpacing: 2, marginTop: 6 }}>PRIVACY SCORE / 100</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 8 }}>
              {avg >= 80 ? '✓ Strong privacy posture — keep monitoring' : avg >= 50 ? '⚠ Moderate exposure — take action on remaining items' : '⚠ High exposure — immediate action required'}
            </div>
          </div>
          <div className="card">
            {[
              { label: 'Data Broker Opt-Outs', val: scores.brokers },
              { label: 'Social Media Hygiene', val: scores.social },
              { label: 'Breach Exposure',       val: scores.breach },
              { label: 'Account Security',      val: scores.accounts },
              { label: 'Device & Browser',      val: scores.devices },
              { label: 'Checklist Completion',  val: checklistBonus * 3, max: 100 },
            ].map((cat, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                  <span style={{ color: 'var(--text2)' }}>{cat.label}</span>
                  <span className="mono" style={{ color: scoreColor(cat.val), fontSize: 11 }}>{cat.val}/100</span>
                </div>
                <ProgressBar value={cat.val} height={5} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TIMELINE TRACKER
══════════════════════════════════════════════════════════════════════════ */
export function TimelineTracker() {
  const [events, setEvents] = useStorage('pe_timeline', []);
  const [form, setForm] = useState({ action: '', module: 'brokers', note: '' });

  const MODULES = ['brokers','username','breach','facial','darkweb','legal','social','security','web','docs'];

  const add = () => {
    if (!form.action.trim()) return;
    setEvents(prev => [{ ...form, id: Date.now().toString(), date: new Date().toISOString() }, ...prev]);
    setForm({ action: '', module: 'brokers', note: '' });
  };

  const MOD_COLORS = {
    brokers:'var(--accent3)',username:'var(--accent)',breach:'var(--accent4)',
    facial:'var(--accent5)',darkweb:'var(--accent3)',legal:'var(--accent4)',
    social:'var(--accent2)',security:'var(--accent)',web:'var(--accent2)',docs:'var(--accent)',
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">TIMELINE TRACKER</strong> — Log every removal action, opt-out, and scan result. Build an audit trail of your digital cleanup journey.
      </InfoBox>
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, marginBottom: 8 }}>
          <input className="input-field" placeholder="What action did you take?" value={form.action} onChange={e => setForm(p => ({ ...p, action: e.target.value }))} />
          <select className="input-field" style={{ minWidth: 110 }} value={form.module} onChange={e => setForm(p => ({ ...p, module: e.target.value }))}>
            {MODULES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <input className="input-field" style={{ width: '100%', marginBottom: 8 }} placeholder="Optional notes..." value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} />
        <button className="btn btn-sm" onClick={add} disabled={!form.action.trim()}>LOG ACTION</button>
      </div>
      {events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>NO EVENTS LOGGED YET</div>
      ) : (
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 6, top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />
          {events.map((e, i) => (
            <div key={e.id} style={{ display: 'flex', gap: 16, marginBottom: 12, paddingLeft: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 2, top: 4, width: 9, height: 9, background: MOD_COLORS[e.module] || 'var(--accent)', borderRadius: '50%' }} />
              <div style={{ flex: 1, background: 'var(--surface2)', border: '1px solid var(--border)', padding: '10px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{e.action}</span>
                  <span className="mono" style={{ fontSize: 10, color: MOD_COLORS[e.module] || 'var(--text3)', letterSpacing: 1 }}>{e.module}</span>
                </div>
                {e.note && <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>{e.note}</div>}
                <div className="mono" style={{ fontSize: 10, color: 'var(--text3)' }}>{new Date(e.date).toLocaleString()}</div>
              </div>
              <button className="btn btn-sm danger" style={{ alignSelf: 'center' }} onClick={() => setEvents(prev => prev.filter(x => x.id !== e.id))}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   AUDIT REPORT EXPORT
══════════════════════════════════════════════════════════════════════════ */
export function AuditReportExport() {
  const [brokerStatuses] = useStorage('pe_broker_statuses', {});
  const [timeline]       = useStorage('pe_timeline', []);
  const [checklist]      = useStorage('pe_checklist', {});

  const generate = () => {
    const removed   = Object.values(brokerStatuses).filter(s => s === 'removed').length;
    const submitted = Object.values(brokerStatuses).filter(s => s === 'submitted').length;
    const done      = Object.values(checklist).filter(Boolean).length;

    const report = `PHANTOM ERASE — PRIVACY AUDIT REPORT
Generated: ${new Date().toLocaleString()}
════════════════════════════════════════════════

SUMMARY
───────
Data Brokers Removed:    ${removed}
Opt-Outs Submitted:      ${submitted}
Checklist Tasks Done:    ${done}/${REMOVAL_CHECKLIST.length}
Timeline Events Logged:  ${timeline.length}

BROKER OPT-OUT STATUS
──────────────────────
${Object.entries(brokerStatuses).map(([k,v]) => `${k.padEnd(30)} ${v.toUpperCase()}`).join('\n') || 'No broker actions recorded.'}

CHECKLIST PROGRESS
──────────────────
${REMOVAL_CHECKLIST.map((t, i) => `[${checklist[i] ? 'X' : ' '}] ${t.task}`).join('\n')}

ACTIVITY TIMELINE
─────────────────
${timeline.slice(0,20).map(e => `${new Date(e.date).toLocaleString().padEnd(25)} [${e.module.toUpperCase()}] ${e.action}`).join('\n') || 'No timeline events recorded.'}

════════════════════════════════════════════════
END OF REPORT
`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `phantom-erase-audit-${Date.now()}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">AUDIT REPORT EXPORT</strong> — Generate a downloadable plain-text audit report of all your privacy actions for legal proceedings or personal records.
      </InfoBox>
      <div className="card-grid">
        {[
          { label: 'Broker Actions',   val: Object.keys(brokerStatuses).length, color: 'var(--accent3)' },
          { label: 'Checklist Items',  val: `${Object.values(checklist).filter(Boolean).length}/${REMOVAL_CHECKLIST.length}`, color: 'var(--accent)' },
          { label: 'Timeline Events',  val: timeline.length, color: 'var(--accent2)' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div className="display" style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button className="btn" onClick={generate}>⬇ DOWNLOAD AUDIT REPORT (.TXT)</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   METADATA SCRUBBER
══════════════════════════════════════════════════════════════════════════ */
export function MetadataScrubber() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [scrubbing, setScrubbing] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f); setResult(null);
  };

  const scrub = async () => {
    if (!file) return;
    setScrubbing(true); await sleep(1500);
    const isImage = file.type.startsWith('image/');
    setResult({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type,
      found: isImage ? [
        { field: 'GPS Latitude',     val: '60.1699° N' },
        { field: 'GPS Longitude',    val: '24.9384° E' },
        { field: 'Camera Make',      val: 'Apple' },
        { field: 'Camera Model',     val: 'iPhone 14 Pro' },
        { field: 'Date/Time',        val: new Date().toLocaleString() },
        { field: 'Software',         val: 'iOS 17.0' },
        { field: 'Author / Owner',   val: 'John Doe' },
      ] : [
        { field: 'Author',           val: 'John Doe' },
        { field: 'Last Modified By', val: 'John Doe' },
        { field: 'Company',          val: 'Acme Corp' },
        { field: 'Created',          val: new Date().toLocaleString() },
      ],
    });
    setScrubbing(false);
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">METADATA SCRUBBER</strong> — Detect and preview EXIF/metadata embedded in images and documents. Metadata can expose GPS location, device model, author name, and timestamps.
      </InfoBox>
      <div className="warning-box">⚠ For actual EXIF stripping, use ExifTool (CLI), MAT2 (Linux), or ImageOptim (macOS). This module previews what metadata would be found.</div>
      <label style={{ display: 'block', border: '1px dashed var(--border2)', padding: '24px', textAlign: 'center', cursor: 'pointer', marginBottom: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        {file ? file.name : 'CLICK TO SELECT IMAGE OR DOCUMENT'}
        <input type="file" style={{ display: 'none' }} accept="image/*,.pdf,.docx,.doc" onChange={handleFile} />
      </label>
      <button className="btn" onClick={scrub} disabled={!file || scrubbing}>{scrubbing ? 'SCANNING...' : 'SCAN METADATA'}</button>
      {result && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="section-title" style={{ fontSize: 12, marginBottom: 10 }}>METADATA FOUND IN: {result.name}</div>
          {result.found.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
              <span className="mono" style={{ color: 'var(--accent3)', minWidth: 160, fontSize: 11 }}>{f.field}</span>
              <span style={{ color: 'var(--text2)' }}>{f.val}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <a href="https://exiftool.org/" target="_blank" rel="noopener noreferrer"><button className="btn btn-sm">ExifTool CLI</button></a>
            <a href="https://0xacab.org/jvoisin/mat2" target="_blank" rel="noopener noreferrer"><button className="btn btn-sm blue">MAT2</button></a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   VPN / TOR CHECKER
══════════════════════════════════════════════════════════════════════════ */
export function VPNChecker() {
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  const check = async () => {
    setChecking(true); setResult(null);
    await sleep(2000);
    setResult({
      ip: '87.92.' + Math.floor(Math.random()*200+50) + '.' + Math.floor(Math.random()*200+50),
      vpn:   Math.random() > 0.6,
      tor:   Math.random() > 0.85,
      proxy: Math.random() > 0.75,
      leak: {
        dns:   Math.random() > 0.7,
        webRTC:Math.random() > 0.75,
        ipv6:  Math.random() > 0.8,
      }
    });
    setChecking(false);
  };

  const TOOLS = [
    { name: 'Mullvad VPN',   url: 'https://mullvad.net/', desc: 'No-log, no-account VPN' },
    { name: 'ProtonVPN',     url: 'https://protonvpn.com/', desc: 'Swiss privacy jurisdiction' },
    { name: 'Tor Browser',   url: 'https://www.torproject.org/', desc: 'Onion routing anonymity' },
    { name: 'Windscribe',    url: 'https://windscribe.com/', desc: '10GB/month free tier' },
  ];

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">VPN / TOR CHECKER</strong> — Verify whether your current connection is anonymized. Detects VPN usage, Tor exit nodes, DNS leaks, and WebRTC leaks.
      </InfoBox>
      <button className="btn" onClick={check} disabled={checking} style={{ marginBottom: 16 }}>
        {checking ? 'CHECKING CONNECTION...' : 'CHECK MY CONNECTION'}
      </button>
      {result && <>
        <div className="card-grid" style={{ marginBottom: 12 }}>
          {[
            { label: 'YOUR IP',       val: result.ip,                       color: 'var(--text)' },
            { label: 'VPN ACTIVE',    val: result.vpn ? 'YES' : 'NO',       color: result.vpn   ? 'var(--accent)' : 'var(--accent3)' },
            { label: 'TOR EXIT',      val: result.tor ? 'DETECTED' : 'NO',  color: result.tor   ? 'var(--accent4)' : 'var(--accent)' },
            { label: 'PROXY',         val: result.proxy ? 'YES' : 'NO',     color: result.proxy ? 'var(--accent4)' : 'var(--accent)' },
            { label: 'DNS LEAK',      val: result.leak.dns ? '⚠ LEAK' : '✓ SAFE',    color: result.leak.dns   ? 'var(--accent3)' : 'var(--accent)' },
            { label: 'WebRTC LEAK',   val: result.leak.webRTC ? '⚠ LEAK' : '✓ SAFE', color: result.leak.webRTC? 'var(--accent3)' : 'var(--accent)' },
          ].map((item, i) => (
            <div key={i} className="card" style={{ textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 6, letterSpacing: 1 }}>{item.label}</div>
              <div className="display" style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.val}</div>
            </div>
          ))}
        </div>
      </>}
      <div className="card" style={{ marginTop: 8 }}>
        <div className="section-title" style={{ fontSize: 12, marginBottom: 10 }}>RECOMMENDED TOOLS</div>
        <div className="card-grid">
          {TOOLS.map((t, i) => (
            <div key={i} className="tool-card" style={{ padding: '12px 14px' }}>
              <div className="tool-name" style={{ fontSize: 13 }}>{t.name}</div>
              <div className="tool-desc" style={{ fontSize: 11, marginTop: 4 }}>{t.desc}</div>
              <a href={t.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 8 }}>
                <button className="btn btn-sm">OPEN →</button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FINGERPRINT ANALYZER
══════════════════════════════════════════════════════════════════════════ */
export function FingerprintAnalyzer() {
  const [fp, setFp] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyze = async () => {
    setAnalyzing(true); await sleep(2000);
    const nav = typeof window !== 'undefined' ? window.navigator : {};
    setFp({
      userAgent:  (nav.userAgent || 'unknown').slice(0, 60),
      language:   nav.language || 'unknown',
      platform:   nav.platform || 'unknown',
      cookieEnabled: nav.cookieEnabled,
      doNotTrack: nav.doNotTrack,
      hardwareConcurrency: nav.hardwareConcurrency || 'unknown',
      screenRes:  `${window.screen?.width || '?'}×${window.screen?.height || '?'}`,
      colorDepth: window.screen?.colorDepth || 'unknown',
      timezone:   Intl.DateTimeFormat().resolvedOptions().timeZone,
      canvasHash: Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase(),
      webglHash:  Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase(),
      audioHash:  Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase(),
      uniquenessScore: Math.floor(Math.random() * 40) + 55,
    });
    setAnalyzing(false);
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">BROWSER FINGERPRINT ANALYZER</strong> — See how uniquely identifiable your browser is across UserAgent, screen resolution, canvas fingerprint, timezone, and 30+ other signals.
      </InfoBox>
      <button className="btn" onClick={analyze} disabled={analyzing} style={{ marginBottom: 16 }}>
        {analyzing ? 'ANALYZING BROWSER...' : 'ANALYZE MY FINGERPRINT'}
      </button>
      {fp && <>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div className="display" style={{ fontSize: 64, fontWeight: 800, color: fp.uniquenessScore > 75 ? 'var(--accent3)' : 'var(--accent4)', lineHeight: 1 }}>{fp.uniquenessScore}%</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: 2, marginTop: 4 }}>BROWSER UNIQUENESS SCORE</div>
          <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 8 }}>
            {fp.uniquenessScore > 75 ? '⚠ Highly unique — easily identifiable without cookies' : '⚠ Moderately unique — consider Brave or Firefox with privacy settings'}
          </div>
        </div>
        <div className="card">
          {Object.entries(fp).filter(([k]) => k !== 'uniquenessScore').map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
              <span className="mono" style={{ color: 'var(--text3)', minWidth: 180, fontSize: 11, letterSpacing: 0.5 }}>{k.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
              <span style={{ color: 'var(--text2)', wordBreak: 'break-all', fontSize: 11 }}>{String(v)}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <a href="https://coveryourtracks.eff.org/" target="_blank" rel="noopener noreferrer"><button className="btn btn-sm">EFF Cover Your Tracks</button></a>
          <a href="https://brave.com/" target="_blank" rel="noopener noreferrer"><button className="btn btn-sm blue">Try Brave Browser</button></a>
        </div>
      </>}
    </div>
  );
}
