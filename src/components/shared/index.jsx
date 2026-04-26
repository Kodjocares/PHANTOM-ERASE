/* ─── Shared UI Primitives ─────────────────────────────────────────────── */

import React from 'react';

/* ── Button ── */
export function Btn({ children, variant = 'default', size = 'md', disabled, onClick, href, target, className = '' }) {
  const base = `btn btn-${variant} btn-${size} ${className}`;
  if (href) return <a href={href} target={target} rel="noopener noreferrer"><button className={base} disabled={disabled}>{children}</button></a>;
  return <button className={base} disabled={disabled} onClick={onClick}>{children}</button>;
}

/* ── Card ── */
export function Card({ children, className = '', style }) {
  return <div className={`card ${className}`} style={style}>{children}</div>;
}

/* ── Input ── */
export function Input({ value, onChange, onKeyDown, placeholder, disabled, className = '' }) {
  return (
    <input
      className={`input-field ${className}`}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

/* ── Risk Badge ── */
export function RiskBadge({ risk }) {
  const colors = { CRITICAL: '#ff2d55', HIGH: '#ff9f0a', MEDIUM: '#30d158', LOW: '#636366' };
  const c = colors[risk] || colors.LOW;
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px',
      fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: 1,
      borderRadius: 2, background: `${c}20`, color: c, border: `1px solid ${c}40`
    }}>{risk}</span>
  );
}

/* ── Status Badge ── */
export function StatusBadge({ status }) {
  const map = {
    pending:   { label: '● PENDING',   bg: 'rgba(80,80,100,0.2)',  c: 'var(--text3)' },
    submitted: { label: '◉ SUBMITTED', bg: 'rgba(255,159,10,0.1)', c: 'var(--accent4)' },
    removed:   { label: '✓ REMOVED',   bg: 'rgba(0,255,136,0.1)',  c: 'var(--accent)' },
    found:     { label: '✓ FOUND',     bg: 'rgba(0,255,136,0.08)', c: 'var(--accent)' },
    clean:     { label: '— CLEAN',     bg: 'rgba(80,80,100,0.1)',  c: 'var(--text3)' },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px',
      fontFamily: 'var(--font-mono)', fontSize: 10, borderRadius: 2,
      background: s.bg, color: s.c
    }}>{s.label}</span>
  );
}

/* ── Stats Bar ── */
export function StatsBar({ stats }) {
  return (
    <div className="stats-bar">
      {stats.map((s, i) => (
        <div key={i} className="stat">
          <div className="stat-val" style={s.color ? { color: s.color } : {}}>{s.val}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Info Box ── */
export function InfoBox({ children, variant = 'info' }) {
  const c = variant === 'warn' ? 'rgba(255,159,10,0.3)' : 'rgba(0,200,255,0.2)';
  const bg = variant === 'warn' ? 'rgba(255,159,10,0.04)' : 'rgba(0,200,255,0.04)';
  const tc = variant === 'warn' ? 'var(--accent4)' : 'var(--text2)';
  return (
    <div style={{ border: `1px solid ${c}`, background: bg, padding: '12px 16px', fontSize: 13, color: tc, lineHeight: 1.6, marginBottom: 16 }}>
      {children}
    </div>
  );
}

/* ── Progress Bar ── */
export function ProgressBar({ value, height = 4 }) {
  return (
    <div style={{ height, background: 'var(--border)', margin: '12px 0', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${value}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent2))', transition: 'width 0.4s ease' }} />
    </div>
  );
}

/* ── Section Header ── */
export function SectionHeader({ title, sub }) {
  return (
    <div className="section-header">
      <div>
        <div className="section-title">{title}</div>
        {sub && <div className="section-sub">{sub}</div>}
      </div>
      <div className="section-line" />
    </div>
  );
}

/* ── Filter Buttons ── */
export function FilterBar({ options, active, onChange }) {
  return (
    <div className="filter-row">
      {options.map(opt => (
        <button
          key={opt.value ?? opt}
          className={`filter-btn ${(active === (opt.value ?? opt)) ? 'active' : ''}`}
          onClick={() => onChange(opt.value ?? opt)}
        >
          {opt.label ?? opt}
        </button>
      ))}
    </div>
  );
}
