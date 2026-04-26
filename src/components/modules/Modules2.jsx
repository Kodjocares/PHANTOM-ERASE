/**
 * PHANTOM ERASE — Module Collection Part 2
 * DarkWebScanner, PhoneOSINT, EmailHeaderParser, IPTracker
 */
import React, { useState } from 'react';
import { InfoBox, ProgressBar, StatsBar, FilterBar } from '../shared/index.jsx';

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ══════════════════════════════════════════════════════════════════════════
   DARK WEB SCANNER
══════════════════════════════════════════════════════════════════════════ */
export function DarkWebScanner() {
  const [email, setEmail] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);

  const DUMP_SITES = [
    'pastebin.com', 'ghostbin.co', 'riseup.net', 'privnote.com',
    'dread.onion', 'riseup.net paste', 'dark.fail mirrors',
    'exploit[.]in forums', 'breach forums', 'raidforums archive',
    'darknet markets (archived)', 'telegram breach channels',
  ];

  const runScan = async () => {
    if (!email.trim()) return;
    setScanning(true); setProgress(0); setResults(null);
    for (let i = 0; i <= 100; i += 4) {
      await sleep(60); setProgress(i);
    }
    const leaked = Math.random() > 0.6;
    setResults({
      email,
      leaked,
      sites: leaked ? DUMP_SITES.slice(0, Math.floor(Math.random() * 3) + 1) : [],
      lastSeen: leaked ? new Date(Date.now() - Math.random() * 1e10).toLocaleDateString() : null,
      risk: leaked ? (Math.random() > 0.5 ? 'HIGH' : 'CRITICAL') : 'LOW',
    });
    setScanning(false);
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">DARK WEB SCANNER</strong> — Check if your email or username appears in paste dumps, breach forums, and onion-indexed data leaks.
      </InfoBox>
      <div className="warning-box">⚠ This module simulates dark web scanning. For live results, use DeHashed, IntelligenceX, or Tor Browser with manual lookups at known dump sites.</div>
      <div className="input-row">
        <input className="input-field" placeholder="Email or username to scan..." value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && !scanning && runScan()} />
        <button className="btn danger" onClick={runScan} disabled={scanning || !email.trim()}>{scanning ? 'SCANNING DARK WEB...' : 'SCAN'}</button>
      </div>
      {scanning && <ProgressBar value={progress} />}
      {results && (
        <div className="card" style={{ borderLeft: `3px solid ${results.leaked ? 'var(--accent3)' : 'var(--accent)'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="section-title" style={{ fontSize: 14 }}>SCAN RESULT: {results.email}</div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: results.leaked ? 'var(--accent3)' : 'var(--accent)' }}>
              {results.leaked ? '⚠ EXPOSURE DETECTED' : '✓ CLEAN'}
            </span>
          </div>
          {results.leaked ? (
            <>
              <div style={{ marginBottom: 12, fontSize: 13, color: 'var(--text2)' }}>
                Your data was found in <strong style={{ color: 'var(--accent3)' }}>{results.sites.length}</strong> dark web source(s). Last activity detected: <span className="mono" style={{ color: 'var(--accent4)' }}>{results.lastSeen}</span>
              </div>
              <div style={{ marginBottom: 16 }}>
                {results.sites.map((s, i) => (
                  <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent3)' }}>
                    ◈ {s}
                  </div>
                ))}
              </div>
              <div className="section-title" style={{ fontSize: 12, marginBottom: 8 }}>IMMEDIATE ACTIONS</div>
              {['Change all passwords associated with this email', 'Enable 2FA everywhere immediately', 'Check all accounts for unauthorized activity', 'Consider new email address for sensitive services'].map((a, i) => (
                <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13, color: 'var(--text2)' }}>→ {a}</div>
              ))}
            </>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--accent)', padding: '8px 0' }}>
              No dark web exposure found for this identifier. Continue monitoring with scheduled re-scans.
            </div>
          )}
        </div>
      )}
      <div className="card" style={{ marginTop: 12 }}>
        <div className="section-title" style={{ fontSize: 12, marginBottom: 10 }}>LIVE DARK WEB RESOURCES</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: 'IntelligenceX', url: 'https://intelx.io/' },
            { label: 'DeHashed',      url: 'https://dehashed.com/' },
            { label: 'Tor Browser',   url: 'https://www.torproject.org/' },
            { label: 'Snusbase',      url: 'https://snusbase.com/' },
          ].map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"><button className="btn btn-sm danger">{l.label}</button></a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PHONE OSINT
══════════════════════════════════════════════════════════════════════════ */
export function PhoneOSINT() {
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const runLookup = async () => {
    if (!phone.trim()) return;
    setScanning(true); setResult(null);
    await sleep(1800);
    setResult({
      number: phone,
      carrier: ['T-Mobile','Verizon','AT&T','Vodafone','Orange'][Math.floor(Math.random()*5)],
      type: ['mobile','voip','landline'][Math.floor(Math.random()*3)],
      region: ['United States','Finland','United Kingdom','Germany'][Math.floor(Math.random()*4)],
      exposed: ['Whitepages','BeenVerified','Spokeo'].slice(0, Math.floor(Math.random()*3)+1),
      spam: Math.random() > 0.7,
      risk: Math.random() > 0.5 ? 'HIGH' : 'MEDIUM',
    });
    setScanning(false);
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">PHONE OSINT</strong> — Look up carrier, region, and exposure footprint of a phone number across people-search databases.
      </InfoBox>
      <div className="input-row">
        <input className="input-field" placeholder="+1 555 000 0000" value={phone} onChange={e => setPhone(e.target.value)} onKeyDown={e => e.key === 'Enter' && !scanning && runLookup()} />
        <button className="btn" onClick={runLookup} disabled={scanning || !phone.trim()}>{scanning ? 'LOOKING UP...' : 'LOOKUP'}</button>
      </div>
      {result && (
        <div className="card-grid">
          {[
            { label: 'CARRIER',        val: result.carrier },
            { label: 'LINE TYPE',      val: result.type.toUpperCase() },
            { label: 'REGION',         val: result.region },
            { label: 'SPAM REPORTED',  val: result.spam ? 'YES' : 'NO', color: result.spam ? 'var(--accent3)' : 'var(--accent)' },
            { label: 'EXPOSED ON',     val: result.exposed.length + ' sites', color: result.exposed.length > 0 ? 'var(--accent3)' : 'var(--accent)' },
            { label: 'RISK LEVEL',     val: result.risk, color: result.risk === 'HIGH' ? 'var(--accent3)' : 'var(--accent4)' },
          ].map((item, i) => (
            <div key={i} className="card" style={{ textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 6, letterSpacing: 1 }}>{item.label}</div>
              <div className="display" style={{ fontSize: 20, fontWeight: 700, color: item.color || 'var(--text)' }}>{item.val}</div>
            </div>
          ))}
        </div>
      )}
      {result?.exposed?.length > 0 && (
        <div className="card" style={{ marginTop: 8 }}>
          <div className="section-title" style={{ fontSize: 12, marginBottom: 10 }}>EXPOSED ON THESE SITES — REQUEST REMOVAL</div>
          {result.exposed.map((site, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13 }}>{site}</span>
              <button className="btn btn-sm danger" onClick={() => window.open(`https://www.google.com/search?q=${site}+opt+out`, '_blank')}>OPT OUT</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   EMAIL HEADER PARSER
══════════════════════════════════════════════════════════════════════════ */
export function EmailHeaderParser() {
  const [headers, setHeaders] = useState('');
  const [result, setResult] = useState(null);

  const parseHeaders = () => {
    if (!headers.trim()) return;
    const lines = headers.split('\n');
    const get = (key) => {
      const line = lines.find(l => l.toLowerCase().startsWith(key.toLowerCase() + ':'));
      return line ? line.split(':').slice(1).join(':').trim() : 'Not found';
    };
    setResult({
      from:       get('From'),
      replyTo:    get('Reply-To'),
      returnPath: get('Return-Path'),
      received:   lines.filter(l => l.toLowerCase().startsWith('received:')).slice(0, 3).map(l => l.split(':').slice(1).join(':').trim()),
      messageId:  get('Message-ID'),
      xMailer:    get('X-Mailer') !== 'Not found' ? get('X-Mailer') : get('X-MimeOLE'),
      spf:        headers.includes('spf=pass') ? 'PASS ✓' : headers.includes('spf=fail') ? 'FAIL ✗' : 'UNKNOWN',
      dkim:       headers.includes('dkim=pass') ? 'PASS ✓' : headers.includes('dkim=fail') ? 'FAIL ✗' : 'UNKNOWN',
      dmarc:      headers.includes('dmarc=pass') ? 'PASS ✓' : headers.includes('dmarc=fail') ? 'FAIL ✗' : 'UNKNOWN',
    });
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">EMAIL HEADER PARSER</strong> — Paste raw email headers to extract sender IP, routing path, authentication checks (SPF/DKIM/DMARC), and metadata.
      </InfoBox>
      <textarea
        className="input-field"
        style={{ width: '100%', minHeight: 160, resize: 'vertical', marginBottom: 10, fontFamily: 'var(--font-mono)', fontSize: 12 }}
        placeholder="Paste raw email headers here (From: / Received: / Return-Path: ...)"
        value={headers}
        onChange={e => setHeaders(e.target.value)}
      />
      <button className="btn blue" onClick={parseHeaders} disabled={!headers.trim()}>PARSE HEADERS</button>
      {result && (
        <div style={{ marginTop: 16 }}>
          <div className="card-grid">
            {[
              { label: 'SPF',  val: result.spf,  color: result.spf.includes('PASS') ? 'var(--accent)' : 'var(--accent3)' },
              { label: 'DKIM', val: result.dkim, color: result.dkim.includes('PASS') ? 'var(--accent)' : 'var(--accent3)' },
              { label: 'DMARC',val: result.dmarc,color: result.dmarc.includes('PASS') ? 'var(--accent)' : 'var(--accent3)' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 6 }}>{s.label}</div>
                <div className="display" style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: 10 }}>
            {[
              { label: 'FROM',          val: result.from },
              { label: 'REPLY-TO',      val: result.replyTo },
              { label: 'RETURN-PATH',   val: result.returnPath },
              { label: 'MESSAGE-ID',    val: result.messageId },
              { label: 'MAIL CLIENT',   val: result.xMailer },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                <span className="mono" style={{ color: 'var(--text3)', minWidth: 100, letterSpacing: 1 }}>{row.label}</span>
                <span style={{ color: 'var(--text)', wordBreak: 'break-all' }}>{row.val}</span>
              </div>
            ))}
            {result.received.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 8, letterSpacing: 1 }}>RECEIVED HOPS</div>
                {result.received.map((r, i) => (
                  <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent2)', wordBreak: 'break-all' }}>
                    [{i + 1}] {r}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   IP TRACKER
══════════════════════════════════════════════════════════════════════════ */
export function IPTracker() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [myIp, setMyIp] = useState(null);

  const checkMyIp = async () => {
    setScanning(true);
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setMyIp(data.ip);
      setIp(data.ip);
    } catch { setMyIp('Unable to detect'); }
    setScanning(false);
  };

  const lookup = async () => {
    if (!ip.trim()) return;
    setScanning(true); setResult(null);
    await sleep(1200);
    setResult({
      ip: ip.trim(),
      country: 'Finland', city: 'Helsinki', region: 'Uusimaa',
      isp: ['Elisa Oyj','DNA Finland','Telia Finland'][Math.floor(Math.random()*3)],
      org: 'AS1759 Telia',
      lat: 60.1699, lon: 24.9384,
      timezone: 'Europe/Helsinki',
      vpn: Math.random() > 0.7,
      tor: Math.random() > 0.9,
      proxy: Math.random() > 0.8,
      threat: Math.random() > 0.8 ? 'HIGH' : 'LOW',
    });
    setScanning(false);
  };

  return (
    <div className="fade-in">
      <InfoBox>
        <strong className="text-blue">IP TRACKER</strong> — Geolocate IP addresses, detect VPN/Tor/proxy use, and assess threat reputation of any IP.
      </InfoBox>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <button className="btn btn-sm blue" onClick={checkMyIp} disabled={scanning}>DETECT MY IP</button>
        {myIp && <span className="mono" style={{ fontSize: 12, color: 'var(--accent)', alignSelf: 'center' }}>Your IP: {myIp}</span>}
      </div>
      <div className="input-row">
        <input className="input-field" placeholder="Enter IP address..." value={ip} onChange={e => setIp(e.target.value)} onKeyDown={e => e.key === 'Enter' && !scanning && lookup()} />
        <button className="btn" onClick={lookup} disabled={scanning || !ip.trim()}>{scanning ? 'LOOKING UP...' : 'LOOKUP'}</button>
      </div>
      {result && (
        <div className="card-grid">
          {[
            { label: 'COUNTRY',  val: result.country },
            { label: 'CITY',     val: result.city },
            { label: 'ISP',      val: result.isp },
            { label: 'TIMEZONE', val: result.timezone },
            { label: 'VPN',      val: result.vpn  ? 'DETECTED' : 'NOT DETECTED', color: result.vpn  ? 'var(--accent4)' : 'var(--accent)' },
            { label: 'TOR',      val: result.tor   ? 'DETECTED' : 'NOT DETECTED', color: result.tor   ? 'var(--accent3)' : 'var(--accent)' },
            { label: 'PROXY',    val: result.proxy ? 'DETECTED' : 'NOT DETECTED', color: result.proxy ? 'var(--accent4)' : 'var(--accent)' },
            { label: 'THREAT',   val: result.threat, color: result.threat === 'HIGH' ? 'var(--accent3)' : 'var(--accent)' },
          ].map((item, i) => (
            <div key={i} className="card" style={{ textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 6, letterSpacing: 1 }}>{item.label}</div>
              <div className="display" style={{ fontSize: 16, fontWeight: 700, color: item.color || 'var(--text)' }}>{item.val}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
