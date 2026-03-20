# 👻 PHANTOM ERASE v3.0

**Digital Footprint Elimination Suite** — 28-module OSINT and privacy tool for removing your digital presence.

![version](https://img.shields.io/badge/version-3.0.0-00ff88?style=flat-square&labelColor=040508)
![React](https://img.shields.io/badge/React-18.3-00c8ff?style=flat-square&labelColor=040508)
![License](https://img.shields.io/badge/license-MIT-ff9f0a?style=flat-square&labelColor=040508)

## Quick Start

```bash
git clone https://github.com/yourusername/phantom-erase.git
cd phantom-erase
npm install
cp .env.example .env   # add your VITE_ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000

## Modules (28 total)

**Intelligence:** Username Hunter (36 platforms), Web Footprint Scan, Dark Web Scanner, Phone OSINT, Email Header Parser, IP Tracker

**Identity:** Identity Vault, Document Exposure Scanner, Alias Generator

**Removal:** Data Broker Cleanup (24 brokers), Breach Monitor, Facial Recognition Tools, Opt-Out Letter Drafter, Legal Letter Generator (GDPR/CCPA/DMCA)

**Monitoring:** Name Alert Engine, Password Leak Monitor

**Analytics:** Privacy Score Card, Timeline Tracker, Audit Report Export

**Security:** Metadata Scrubber, VPN/Tor Checker, Browser Fingerprint Analyzer

**Platform:** Multi-Profile Manager, Privacy Challenges (XP system), Cleanup Checklist (24 steps), Privacy Arsenal, AI Privacy Advisor

## Tech Stack

React 18 · Vite 5 · Anthropic Claude API · localStorage (no backend)

## Environment Variables

```env
VITE_ANTHROPIC_API_KEY=sk-ant-...   # Required for AI Advisor
VITE_HIBP_API_KEY=                  # Optional: breach monitoring
VITE_IPINFO_TOKEN=                  # Optional: IP geolocation
```

## Project Structure

```
src/
  components/
    Layout/Header.jsx          # Sticky nav with 28-tab bar
    modules/
      Dashboard.jsx            # Overview + threat meters
      Modules1.jsx             # Username, Brokers, Breach, Web, Facial
      Modules2.jsx             # DarkWeb, Phone, Email, IP
      Modules3.jsx             # Vault, Docs, Alias, OptOut, Legal
      Modules4.jsx             # Alerts, PwMonitor, Score, Timeline, Audit, Metadata, VPN, Fingerprint
      Modules5.jsx             # Checklist, Challenges, Profiles, Arsenal, AI
    shared/index.jsx           # UI primitives
  data/
    platforms.js  brokers.js  tools.js  checklist.js
  hooks/useStorage.js
  styles/globals.css  components.css
  App.jsx  main.jsx
```

## License

MIT — for personal privacy management only. Use in compliance with applicable laws.
