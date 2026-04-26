import React, { useState } from 'react';
import Header from './Layout/Header.jsx';
import Dashboard from './modules/Dashboard.jsx';
import { UsernameScanner, BrokerCenter, BreachChecker, WebScanner, FacialRecognition } from './modules/Modules1.jsx';
import { DarkWebScanner, PhoneOSINT, EmailHeaderParser, IPTracker } from './modules/Modules2.jsx';
import { IdentityVault, DocExposureScanner, AliasGenerator, OptOutDrafter, LegalLetterGenerator } from './modules/Modules3.jsx';
import { NameAlertEngine, PasswordLeakMonitor, PrivacyScoreCard, TimelineTracker, AuditReportExport, MetadataScrubber, VPNChecker, FingerprintAnalyzer } from './modules/Modules4.jsx';
import { CleanupChecklist, PrivacyChallenges, MultiProfileManager, PrivacyArsenal, AIAdvisor } from './modules/Modules5.jsx';
import { useProfiles } from '../hooks/useStorage.js';

const TABS = [
  { id: 'dashboard',   label: 'Overview',       icon: '⬡',  group: 'main' },
  // Intelligence
  { id: 'username',    label: 'Username Hunt',   icon: '◎',  group: 'intel' },
  { id: 'web',         label: 'Web Scan',        icon: '🔍', group: 'intel' },
  { id: 'darkweb',     label: 'Dark Web',        icon: '🌑', group: 'intel' },
  { id: 'phone',       label: 'Phone OSINT',     icon: '📱', group: 'intel' },
  { id: 'email',       label: 'Email Headers',   icon: '✉',  group: 'intel' },
  { id: 'ip',          label: 'IP Tracker',      icon: '🌐', group: 'intel' },
  { id: 'docs',        label: 'Doc Exposure',    icon: '📄', group: 'intel' },
  { id: 'facial',      label: 'Face Search',     icon: '👁',  group: 'intel' },
  // Removal
  { id: 'brokers',     label: 'Data Brokers',    icon: '🗑',  group: 'removal' },
  { id: 'breach',      label: 'Breach Check',    icon: '⚡', group: 'removal' },
  { id: 'drafter',     label: 'Opt-Out Draft',   icon: '✍',  group: 'removal' },
  { id: 'legal',       label: 'Legal Letters',   icon: '⚖',  group: 'removal' },
  // Identity
  { id: 'identity',    label: 'ID Vault',        icon: '🔐', group: 'identity' },
  { id: 'alias',       label: 'Alias Gen',       icon: '🎭', group: 'identity' },
  // Monitoring
  { id: 'alerts',      label: 'Name Alerts',     icon: '🔔', group: 'monitor' },
  { id: 'pwmonitor',   label: 'PW Monitor',      icon: '🔑', group: 'monitor' },
  // Analytics
  { id: 'score',       label: 'Privacy Score',   icon: '📊', group: 'analytics' },
  { id: 'timeline',    label: 'Timeline',        icon: '📅', group: 'analytics' },
  { id: 'audit',       label: 'Audit Export',    icon: '📋', group: 'analytics' },
  // Security
  { id: 'metadata',    label: 'Metadata',        icon: '🧹', group: 'security' },
  { id: 'vpn',         label: 'VPN / Tor',       icon: '🛡',  group: 'security' },
  { id: 'fingerprint', label: 'Fingerprint',     icon: '🖱',  group: 'security' },
  // Platform
  { id: 'checklist',   label: 'Checklist',       icon: '✓',  group: 'platform' },
  { id: 'challenges',  label: 'Challenges',      icon: '🏆', group: 'platform' },
  { id: 'profiles',    label: 'Profiles',        icon: '👥', group: 'platform' },
  { id: 'tools',       label: 'Arsenal',         icon: '🧰', group: 'platform' },
  { id: 'ai',          label: 'AI Advisor',      icon: '◈',  group: 'platform' },
];

const SECTION_LABELS = {
  main:      null,
  intel:     'Intelligence',
  removal:   'Removal',
  identity:  'Identity',
  monitor:   'Monitor',
  analytics: 'Analytics',
  security:  'Security',
  platform:  'Platform',
};

const MODULE_MAP = {
  dashboard:   Dashboard,
  username:    UsernameScanner,
  brokers:     BrokerCenter,
  breach:      BreachChecker,
  web:         WebScanner,
  facial:      FacialRecognition,
  darkweb:     DarkWebScanner,
  phone:       PhoneOSINT,
  email:       EmailHeaderParser,
  ip:          IPTracker,
  identity:    IdentityVault,
  docs:        DocExposureScanner,
  alias:       AliasGenerator,
  drafter:     OptOutDrafter,
  legal:       LegalLetterGenerator,
  alerts:      NameAlertEngine,
  pwmonitor:   PasswordLeakMonitor,
  score:       PrivacyScoreCard,
  timeline:    TimelineTracker,
  audit:       AuditReportExport,
  metadata:    MetadataScrubber,
  vpn:         VPNChecker,
  fingerprint: FingerprintAnalyzer,
  checklist:   CleanupChecklist,
  challenges:  PrivacyChallenges,
  profiles:    MultiProfileManager,
  tools:       PrivacyArsenal,
  ai:          AIAdvisor,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { active: activeProfile } = useProfiles();
  const ActiveModule = MODULE_MAP[activeTab] || Dashboard;
  const activeTabData = TABS.find(t => t.id === activeTab);

  // Group tabs by section for sidebar
  const groups = Object.entries(SECTION_LABELS).map(([key, label]) => ({
    key, label,
    tabs: TABS.filter(t => t.group === key),
  }));

  return (
    <>
      <div className="scanline-overlay" />
      <div className="app-layout">
        {/* ── Sidebar ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon-sm">P/E</div>
            <div>
              <div className="logo-text-sm"><span>PHANTOM</span> ERASE</div>
              <div className="logo-sub-sm">v3.0</div>
            </div>
          </div>
          <nav className="sidebar-nav">
            {groups.map(({ key, label, tabs }) => tabs.length === 0 ? null : (
              <div key={key} className="nav-group">
                {label && <div className="nav-group-label">{label.toUpperCase()}</div>}
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="nav-icon">{tab.icon}</span>
                    <span className="nav-label">{tab.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* ── Main ── */}
        <div className="main-area">
          <div className="top-bar">
            <div className="breadcrumb">
              <span className="mono" style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 1 }}>
                {SECTION_LABELS[activeTabData?.group]?.toUpperCase() || 'MAIN'} /
              </span>
              <span className="mono" style={{ fontSize: 12, color: 'var(--accent)', marginLeft: 8 }}>
                {activeTabData?.icon} {activeTabData?.label?.toUpperCase()}
              </span>
            </div>
            <div className="top-bar-right">
              {activeProfile && (
                <span className="mono" style={{ fontSize: 10, color: 'var(--accent2)', marginRight: 16 }}>
                  ◈ {activeProfile.name}
                </span>
              )}
              <StatusDot />
            </div>
          </div>

          <main className="content">
            <ActiveModule setTab={setActiveTab} />
          </main>
        </div>
      </div>
    </>
  );
}

function StatusDot() {
  const [time, setTime] = React.useState('');
  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date().toISOString().slice(11,19) + ' UTC'), 1000);
    setTime(new Date().toISOString().slice(11,19) + ' UTC');
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span className="status-dot" />
      <span className="mono" style={{ fontSize: 10, color: 'var(--text3)' }}>{time}</span>
    </div>
  );
}
