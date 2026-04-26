import React, { useState } from 'react';
import Header from './components/Layout/Header.jsx';
import Dashboard from './components/modules/Dashboard.jsx';
import { UsernameScanner, BrokerCenter, BreachChecker, WebScanner, FacialRecognition } from './components/modules/Modules1.jsx';
import { DarkWebScanner, PhoneOSINT, EmailHeaderParser, IPTracker } from './components/modules/Modules2.jsx';
import { IdentityVault, DocExposureScanner, AliasGenerator, OptOutDrafter, LegalLetterGenerator } from './components/modules/Modules3.jsx';
import {
  NameAlertEngine, PasswordLeakMonitor, PrivacyScoreCard,
  TimelineTracker, AuditReportExport, MetadataScrubber,
  VPNChecker, FingerprintAnalyzer,
} from './components/modules/Modules4.jsx';
import { CleanupChecklist, PrivacyChallenges, MultiProfileManager, PrivacyArsenal, AIAdvisor } from './components/modules/Modules5.jsx';
import { useStorage } from './hooks/useStorage.js';
import './styles/globals.css';
import './styles/components.css';

const ALL_TABS = [
  { id: 'dashboard',   label: 'OVERVIEW',       icon: '◎' },
  { id: 'username',    label: 'USERNAME HUNT',   icon: '🔍' },
  { id: 'brokers',     label: 'DATA BROKERS',    icon: '🗑' },
  { id: 'web',         label: 'WEB SCAN',        icon: '🌐' },
  { id: 'breach',      label: 'BREACH CHECK',    icon: '⚡' },
  { id: 'facial',      label: 'FACE SEARCH',     icon: '👁' },
  { id: 'darkweb',     label: 'DARK WEB',        icon: '🌑' },
  { id: 'phone',       label: 'PHONE OSINT',     icon: '📱' },
  { id: 'email',       label: 'EMAIL HEADERS',   icon: '✉' },
  { id: 'ip',          label: 'IP TRACKER',      icon: '📍' },
  { id: 'identity',    label: 'VAULT',           icon: '🔐' },
  { id: 'docs',        label: 'DOC SCAN',        icon: '📄' },
  { id: 'alias',       label: 'ALIAS GEN',       icon: '🎭' },
  { id: 'drafter',     label: 'OPT-OUT DRAFTER', icon: '✍' },
  { id: 'legal',       label: 'LEGAL LETTERS',   icon: '⚖' },
  { id: 'alerts',      label: 'NAME ALERTS',     icon: '🔔' },
  { id: 'pwmonitor',   label: 'PWD MONITOR',     icon: '🔑' },
  { id: 'score',       label: 'PRIVACY SCORE',   icon: '📊' },
  { id: 'timeline',    label: 'TIMELINE',        icon: '📅' },
  { id: 'audit',       label: 'AUDIT REPORT',    icon: '📋' },
  { id: 'metadata',    label: 'METADATA',        icon: '🧹' },
  { id: 'vpn',         label: 'VPN CHECKER',     icon: '🛡' },
  { id: 'fingerprint', label: 'FINGERPRINT',     icon: '🖱' },
  { id: 'profiles',    label: 'PROFILES',        icon: '👥' },
  { id: 'challenges',  label: 'CHALLENGES',      icon: '🏆' },
  { id: 'checklist',   label: 'CHECKLIST',       icon: '✓' },
  { id: 'tools',       label: 'ARSENAL',         icon: '🧰' },
  { id: 'ai',          label: 'AI ADVISOR',      icon: '◈' },
];

function renderModule(tab, setTab) {
  switch (tab) {
    case 'dashboard':   return <Dashboard setTab={setTab} />;
    case 'username':    return <UsernameScanner />;
    case 'brokers':     return <BrokerCenter />;
    case 'web':         return <WebScanner />;
    case 'breach':      return <BreachChecker />;
    case 'facial':      return <FacialRecognition />;
    case 'darkweb':     return <DarkWebScanner />;
    case 'phone':       return <PhoneOSINT />;
    case 'email':       return <EmailHeaderParser />;
    case 'ip':          return <IPTracker />;
    case 'identity':    return <IdentityVault />;
    case 'docs':        return <DocExposureScanner />;
    case 'alias':       return <AliasGenerator />;
    case 'drafter':     return <OptOutDrafter />;
    case 'legal':       return <LegalLetterGenerator />;
    case 'alerts':      return <NameAlertEngine />;
    case 'pwmonitor':   return <PasswordLeakMonitor />;
    case 'score':       return <PrivacyScoreCard />;
    case 'timeline':    return <TimelineTracker />;
    case 'audit':       return <AuditReportExport />;
    case 'metadata':    return <MetadataScrubber />;
    case 'vpn':         return <VPNChecker />;
    case 'fingerprint': return <FingerprintAnalyzer />;
    case 'profiles':    return <MultiProfileManager />;
    case 'challenges':  return <PrivacyChallenges />;
    case 'checklist':   return <CleanupChecklist />;
    case 'tools':       return <PrivacyArsenal />;
    case 'ai':          return <AIAdvisor />;
    default:            return <Dashboard setTab={setTab} />;
  }
}

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [profiles] = useStorage('pe_profiles', []);
  const [activeId] = useStorage('pe_active_profile', null);
  const activeProfile = profiles.find(p => p.id === activeId) ?? null;

  return (
    <>
      <div className="scanline-overlay" />
      <div className="app">
        <Header activeTab={tab} setActiveTab={setTab} profile={activeProfile} allTabs={ALL_TABS} />
        <main className="main" key={tab}>
          <div className="section-header">
            <div>
              <div className="section-title">{ALL_TABS.find(t => t.id === tab)?.label || 'OVERVIEW'}</div>
              <div className="section-sub mono">PHANTOM ERASE v3.0 — {tab.toUpperCase()}</div>
            </div>
            <div className="section-line" />
          </div>
          {renderModule(tab, setTab)}
        </main>
      </div>
    </>
  );
}
