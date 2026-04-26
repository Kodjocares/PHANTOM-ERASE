/**
 * PHANTOM ERASE — Module Collection Part 5
 * CleanupChecklist, PrivacyChallenges, MultiProfileManager, PrivacyArsenal, AIAdvisor
 */
import React, { useState, useEffect, useRef } from 'react';
import { InfoBox, ProgressBar, StatsBar } from '../shared/index.jsx';
import { useStorage } from '../../hooks/useStorage.js';
import { REMOVAL_CHECKLIST, PRIVACY_CHALLENGES } from '../../data/checklist.js';
import { PRIVACY_TOOLS } from '../../data/tools.js';

export function CleanupChecklist() {
  const [checked, setChecked] = useStorage('pe_checklist', {});
  const toggle = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneCount / REMOVAL_CHECKLIST.length) * 100);
  return (
    <div className="fade-in">
      <StatsBar stats={[
        { val: `${pct}%`, label: 'COMPLETE', color: pct === 100 ? 'var(--accent)' : 'var(--accent4)' },
        { val: doneCount, label: 'DONE' },
        { val: REMOVAL_CHECKLIST.filter((t,i) => t.priority === 1 && !checked[i]).length, label: 'CRITICAL LEFT', color: 'var(--accent3)' },
        { val: REMOVAL_CHECKLIST.length - doneCount, label: 'TOTAL LEFT', color: 'var(--accent4)' },
      ]} />
      <ProgressBar value={pct} height={6} />
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        {[['var(--accent3)','PRIORITY 1 — CRITICAL'],['var(--accent4)','PRIORITY 2 — HIGH'],['var(--text3)','PRIORITY 3 — MEDIUM']].map(([c,l],i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, background: c, display: 'inline-block' }} />
            <span className="mono" style={{ fontSize: 11, color: 'var(--text3)' }}>{l}</span>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {REMOVAL_CHECKLIST.map((item, i) => (
          <div key={i} className={`checklist-item priority-${item.priority} ${checked[i] ? 'done' : ''}`} onClick={() => toggle(i)} style={{ cursor: 'pointer' }}>
            <div className="check-box">{checked[i] && <span style={{ color: 'var(--accent)', fontSize: 11 }}>✓</span>}</div>
            <span className="check-task">{item.task}</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--text3)', minWidth: 60, textAlign: 'right' }}>{item.module}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PrivacyChallenges() {
  const [completed, setCompleted] = useStorage('pe_challenges', {});
  const complete = (id) => setCompleted(prev => ({ ...prev, [id]: true }));
  const totalXP = PRIVACY_CHALLENGES.filter(c => completed[c.id]).reduce((s, c) => s + c.xp, 0);
  const maxXP   = PRIVACY_CHALLENGES.reduce((s, c) => s + c.xp, 0);
  const pct     = Math.round((totalXP / maxXP) * 100);
  const RANKS = [
    { min: 0, label: 'NOVICE', color: 'var(--text3)' },
    { min: 200, label: 'AWARE', color: 'var(--accent2)' },
    { min: 500, label: 'PROTECTED', color: 'var(--accent)' },
    { min: 900, label: 'PHANTOM', color: 'var(--accent5)' },
    { min: 1400, label: 'GHOST', color: 'var(--accent3)' },
  ];
  const rank = [...RANKS].reverse().find(r => totalXP >= r.min) || RANKS[0];
  return (
    <div className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div className="display" style={{ fontSize: 48, fontWeight: 800, color: rank.color, lineHeight: 1 }}>{rank.label}</div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: 2, marginTop: 4 }}>{totalXP} / {maxXP} XP</div>
        <ProgressBar value={pct} height={6} />
      </div>
      <div className="card-grid">
        {PRIVACY_CHALLENGES.map((c, i) => (
          <div key={i} className="tool-card" style={{ opacity: completed[c.id] ? 0.6 : 1, borderLeft: completed[c.id] ? '3px solid var(--accent)' : '3px solid var(--border)', cursor: completed[c.id] ? 'default' : 'pointer' }} onClick={() => !completed[c.id] && complete(c.id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 28 }}>{c.icon}</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--accent4)' }}>{c.xp} XP</span>
            </div>
            <div className="tool-name" style={{ color: completed[c.id] ? 'var(--accent)' : 'var(--text)', marginBottom: 4 }}>{completed[c.id] ? '✓ ' : ''}{c.title}</div>
            <div className="tool-desc">{c.desc}</div>
            {!completed[c.id] && <button className="btn btn-sm" style={{ marginTop: 10 }} onClick={e => { e.stopPropagation(); complete(c.id); }}>MARK COMPLETE</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MultiProfileManager() {
  const [profiles, setProfiles] = useStorage('pe_profiles', []);
  const [activeId, setActiveId] = useStorage('pe_active_profile', null);
  const [newName, setNewName] = useState('');
  const AVATARS = ['👤','👩','🧑','👨','🧓','👴','👵','🕵','🧙','🦸'];
  const add = () => {
    if (!newName.trim()) return;
    const id = Date.now().toString();
    setProfiles(prev => [...prev, { id, name: newName.trim(), created: new Date().toLocaleDateString() }]);
    if (!activeId) setActiveId(id);
    setNewName('');
  };
  const remove = (id) => { setProfiles(prev => prev.filter(p => p.id !== id)); if (activeId === id) setActiveId(null); };
  return (
    <div className="fade-in">
      <InfoBox><strong className="text-blue">MULTI-PROFILE MANAGER</strong> — Track digital cleanup for multiple people. Each profile label persists independently in your browser.</InfoBox>
      <div className="input-row">
        <input className="input-field" placeholder="Profile name (e.g. Myself, Partner, Child)..." value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} />
        <button className="btn" onClick={add} disabled={!newName.trim()}>ADD PROFILE</button>
      </div>
      {profiles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>NO PROFILES YET</div>
      ) : (
        <div className="card-grid">
          {profiles.map((p, i) => (
            <div key={p.id} className="tool-card" style={{ cursor: 'pointer', borderLeft: activeId === p.id ? '3px solid var(--accent)' : '3px solid var(--border)', background: activeId === p.id ? 'rgba(0,255,136,0.04)' : 'var(--surface2)' }} onClick={() => setActiveId(p.id)}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{AVATARS[i % AVATARS.length]}</div>
              <div className="tool-name" style={{ color: activeId === p.id ? 'var(--accent)' : 'var(--text)' }}>{activeId === p.id ? '◎ ' : ''}{p.name}</div>
              <div className="tool-desc">Added {p.created}</div>
              {activeId === p.id && <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', marginTop: 6, letterSpacing: 1 }}>ACTIVE</div>}
              <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                {activeId !== p.id && <button className="btn btn-sm" onClick={e => { e.stopPropagation(); setActiveId(p.id); }}>SET ACTIVE</button>}
                <button className="btn btn-sm danger" onClick={e => { e.stopPropagation(); remove(p.id); }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PrivacyArsenal() {
  return (
    <div className="fade-in">
      <InfoBox><strong className="text-blue">PRIVACY ARSENAL</strong> — Curated tools across anonymity, secure comms, passwords, browser hardening, monitoring, and legal resources.</InfoBox>
      {PRIVACY_TOOLS.map((cat, ci) => (
        <div key={ci} style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span className="mono" style={{ color: 'var(--accent)', fontSize: 11, letterSpacing: 2 }}>{cat.cat}</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--border2), transparent)' }} />
          </div>
          <div className="card-grid">
            {cat.items.map((tool, ti) => (
              <div key={ti} className="tool-card">
                <div className="tool-name">{tool.name}</div>
                <div className="tool-desc" style={{ marginTop: 6 }}>{tool.desc}</div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 10 }}>
                  <button className="btn btn-sm">OPEN →</button>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const SYSTEM_PROMPT = `You are PHANTOM ERASE AI, an elite digital privacy and OSINT specialist. You specialize in: digital footprint removal, OSINT/counter-OSINT, data broker opt-outs, GDPR/CCPA rights, social media deletion, dark web monitoring, facial recognition countermeasures, browser fingerprinting, VPN/Tor, identity protection, and DMCA takedowns. Be terse, expert, and actionable. No fluff.`;

const QUICK_PROMPTS = [
  "How do I remove myself from Google search?",
  "Best VPN for privacy 2025?",
  "How to permanently delete Facebook data?",
  "What is GDPR right to erasure?",
  "How to check if I'm on the dark web?",
  "How do I scrub EXIF from photos?",
  "What is browser fingerprinting?",
  "How to write a DMCA takedown notice?",
];

export function AIAdvisor() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'PHANTOM ERASE AI ONLINE.\n\nI\'m your digital privacy specialist. Ask anything about footprint removal, OSINT, GDPR, dark web monitoring, or counter-surveillance.' }]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages, loading]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const history = [...messages, { role: 'user', content: msg }];
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system: SYSTEM_PROMPT, messages: history.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content?.[0]?.text || 'Error — check your API key in .env' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Ensure VITE_ANTHROPIC_API_KEY is set in .env' }]);
    }
    setLoading(false);
  };

  return (
    <div className="fade-in">
      <InfoBox><strong className="text-blue">AI PRIVACY ADVISOR</strong> — Powered by Claude Sonnet. Ask anything about digital privacy, data removal, OSINT, GDPR/CCPA, or counter-surveillance.</InfoBox>
      <div className="chat-container" ref={chatRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="msg-label">{m.role === 'user' ? 'YOU' : 'PHANTOM AI'}</div>
            <div className="msg-bubble" style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
          </div>
        ))}
        {loading && <div className="msg assistant"><div className="msg-label">PHANTOM AI</div><div className="msg-bubble"><div className="typing"><span /><span /><span /></div></div></div>}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '10px 0' }}>
        {QUICK_PROMPTS.map((q, i) => <button key={i} className="filter-btn" style={{ fontSize: 11 }} onClick={() => send(q)}>{q.length > 38 ? q.slice(0,38)+'…' : q}</button>)}
      </div>
      <div className="input-row">
        <input className="input-field" placeholder="Ask PHANTOM AI..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !loading && send()} />
        <button className="btn blue" onClick={() => send()} disabled={loading || !input.trim()}>{loading ? '...' : 'SEND'}</button>
      </div>
    </div>
  );
}
