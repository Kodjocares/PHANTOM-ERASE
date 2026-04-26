import React from 'react';
import { StatsBar } from '../shared/index.jsx';
import { PLATFORMS } from '../../data/platforms.js';
import { DATA_BROKERS } from '../../data/brokers.js';
import { FACIAL_TOOLS } from '../../data/tools.js';
import { REMOVAL_CHECKLIST } from '../../data/checklist.js';

const TIPS = [
  "Use a separate email alias for every service you sign up to",
  "Enable 2FA on all critical accounts — authenticator app over SMS",
  "Audit your connected apps quarterly — revoke what you don't use",
  "Use a VPN on public Wi-Fi — always assume networks are monitored",
  "Your phone number is more sensitive than your email — guard it",
  "Search your own name quarterly to catch new data broker listings",
  "Use unique strong passwords — a breach on one site exposes all",
  "Delete accounts instead of deactivating — dormant = exploitable",
  "Scrub EXIF metadata from photos before sharing them online",
  "Check your browser fingerprint — you may be uniquely identifiable",
];

const MODULES = [
  { id: "username",    icon: "◎", label: "Username Hunter",      desc: `Scan ${PLATFORMS.length} platforms for your username`,  color: "var(--accent)" },
  { id: "brokers",     icon: "🗑",  label: "Data Broker Cleanup",  desc: `Opt out from ${DATA_BROKERS.length} data brokers`,       color: "var(--accent3)" },
  { id: "web",         icon: "🔍", label: "Web Footprint Scan",   desc: "Find your name, email & phone online",                   color: "var(--accent2)" },
  { id: "breach",      icon: "⚡", label: "Breach Monitor",       desc: "Check if your data was leaked",                          color: "var(--accent4)" },
  { id: "facial",      icon: "👁",  label: "Facial Recognition",   desc: "Find your face across the web",                          color: "#bf5af2" },
  { id: "darkweb",     icon: "🌑", label: "Dark Web Scanner",     desc: "Check onion sites & paste dumps",                        color: "var(--accent3)" },
  { id: "phone",       icon: "📱", label: "Phone OSINT",          desc: "Carrier, region & exposure lookup",                      color: "var(--accent)" },
  { id: "email",       icon: "✉",  label: "Email Header Parser",  desc: "Trace IP metadata in email headers",                     color: "var(--accent2)" },
  { id: "ip",          icon: "🌐", label: "IP Tracker",           desc: "Geo-locate & assess your IPs",                           color: "var(--accent4)" },
  { id: "identity",    icon: "🔐", label: "Identity Vault",       desc: "Encrypted personal data store",                          color: "#bf5af2" },
  { id: "docs",        icon: "📄", label: "Doc Exposure Scan",    desc: "Find public PDFs & CVs online",                          color: "var(--accent)" },
  { id: "alias",       icon: "🎭", label: "Alias Generator",      desc: "Create privacy-safe fake identities",                    color: "var(--accent2)" },
  { id: "drafter",     icon: "✍",  label: "Opt-Out Drafter",      desc: "AI-written removal emails",                              color: "var(--accent3)" },
  { id: "legal",       icon: "⚖",  label: "Legal Letters",        desc: "GDPR / CCPA / DMCA templates",                           color: "var(--accent4)" },
  { id: "alerts",      icon: "🔔", label: "Name Alert Engine",    desc: "Monitor your name & email online",                       color: "var(--accent)" },
  { id: "pwmonitor",   icon: "🔑", label: "Password Monitor",     desc: "HIBP polling for leaked passwords",                      color: "var(--accent2)" },
  { id: "score",       icon: "📊", label: "Privacy Score",        desc: "Weighted risk score 0–100",                              color: "var(--accent3)" },
  { id: "timeline",    icon: "📅", label: "Timeline Tracker",     desc: "Log of all removals & scans",                            color: "var(--accent4)" },
  { id: "audit",       icon: "📋", label: "Audit Report",         desc: "Export PDF/CSV of all actions",                          color: "#bf5af2" },
  { id: "metadata",    icon: "🧹", label: "Metadata Scrubber",    desc: "Strip EXIF from images & docs",                          color: "var(--accent)" },
  { id: "vpn",         icon: "🛡",  label: "VPN / Tor Checker",    desc: "Verify anonymity status",                                color: "var(--accent2)" },
  { id: "fingerprint", icon: "🖱",  label: "Fingerprint Analyzer", desc: "Browser uniqueness score",                               color: "var(--accent3)" },
  { id: "profiles",    icon: "👥", label: "Multi-Profile",        desc: "Track family / team members",                            color: "var(--accent4)" },
  { id: "challenges",  icon: "🏆", label: "Privacy Challenges",   desc: "Gamified cleanup quests",                                color: "#bf5af2" },
  { id: "checklist",   icon: "✓",  label: "Cleanup Checklist",    desc: `${REMOVAL_CHECKLIST.length}-step erasure protocol`,      color: "var(--accent)" },
  { id: "tools",       icon: "🧰", label: "Privacy Arsenal",      desc: "Curated tools & apps",                                   color: "var(--accent2)" },
  { id: "ai",          icon: "◈",  label: "AI Advisor",           desc: "Ask anything about digital privacy",                     color: "var(--accent3)" },
];

const RISKS = [
  { label: "Social Media Exposure",    val: 78 },
  { label: "Data Broker Listings",     val: 91 },
  { label: "Breach Databases",         val: 65 },
  { label: "Search Engine Indexing",   val: 82 },
  { label: "Facial Recognition Risk",  val: 55 },
  { label: "Dark Web Presence",        val: 44 },
  { label: "Browser Fingerprint",      val: 71 },
];

export default function Dashboard({ setTab }) {
  const [tip] = React.useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);

  return (
    <div className="fade-in">
      <StatsBar stats={[
        { val: PLATFORMS.length,          label: "PLATFORMS COVERED"  },
        { val: DATA_BROKERS.length,       label: "DATA BROKERS",       color: "var(--accent3)" },
        { val: 6,                         label: "BREACH SOURCES",     color: "var(--accent2)" },
        { val: FACIAL_TOOLS.length,       label: "FACIAL TOOLS",       color: "var(--accent4)" },
        { val: REMOVAL_CHECKLIST.length,  label: "CLEANUP TASKS" },
        { val: MODULES.length,            label: "TOTAL MODULES",      color: "var(--accent5)" },
      ]} />

      <div className="warning-box" style={{ marginBottom: 20 }}>
        💡 <strong>OPSEC TIP:</strong> {tip}
      </div>

      <div className="card-grid" style={{ marginBottom: 24 }}>
        {MODULES.map(m => (
          <div
            key={m.id}
            className="tool-card"
            style={{ cursor: 'pointer', borderLeft: `3px solid ${m.color}40` }}
            onClick={() => setTab(m.id)}
          >
            <div style={{ fontSize: 22, marginBottom: 8 }}>{m.icon}</div>
            <div className="tool-name" style={{ color: m.color }}>{m.label}</div>
            <div className="tool-desc">{m.desc}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="section-title" style={{ fontSize: 13, marginBottom: 16 }}>THREAT EXPOSURE ESTIMATE</div>
        {RISKS.map((r, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
              <span style={{ color: 'var(--text2)' }}>{r.label}</span>
              <span className="mono" style={{ color: r.val > 75 ? 'var(--accent3)' : 'var(--accent4)', fontSize: 11 }}>{r.val}%</span>
            </div>
            <div style={{ height: 5, background: 'var(--border)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${r.val}%`, background: 'linear-gradient(90deg, #30d158, #ff9f0a, #ff2d55)', transition: 'width 1s ease' }} />
            </div>
          </div>
        ))}
        <div className="mono" style={{ fontSize: 10, color: 'var(--text3)', marginTop: 10 }}>
          * Indicative only — run a full scan for accurate assessment
        </div>
      </div>
    </div>
  );
}
