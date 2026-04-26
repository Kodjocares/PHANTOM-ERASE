import React, { useState, useEffect } from 'react';

export default function Header({ activeTab, setActiveTab, profile, allTabs }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(new Date().toISOString().slice(11,19) + ' UTC');
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <div className="logo-icon">P/E</div>
          <div>
            <div className="logo-text"><span>PHANTOM</span> ERASE</div>
            <div className="logo-sub">DIGITAL FOOTPRINT ELIMINATION SUITE v3.0</div>
          </div>
        </div>
        <div className="status-bar">
          {profile && (
            <span className="mono" style={{ fontSize: 11, color: 'var(--accent2)', marginRight: 12 }}>
              ◈ {profile.name}
            </span>
          )}
          <span><span className="status-dot" />SYSTEM ACTIVE</span>
          <span className="mono" style={{ fontSize: 11 }}>{time}</span>
        </div>
      </div>

      <nav className="tabs" role="tablist">
        {allTabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
          >
            {tab.icon && <span style={{ marginRight: 5 }}>{tab.icon}</span>}
            {tab.label}
            {tab.badge && <span className="tab-badge">{tab.badge}</span>}
          </button>
        ))}
      </nav>
    </header>
  );
}
