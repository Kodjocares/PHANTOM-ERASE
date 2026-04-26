import { useState, useEffect } from 'react';

const TABS = [
  { id:'dashboard',    label:'OVERVIEW'     },
  { id:'username',     label:'USERNAME'     },
  { id:'darkweb',      label:'DARK WEB'     },
  { id:'phone',        label:'PHONE OSINT'  },
  { id:'email-hdr',    label:'EMAIL HDR'    },
  { id:'ip',           label:'IP TRACKER'   },
  { id:'brokers',      label:'DATA BROKERS' },
  { id:'breach',       label:'BREACH'       },
  { id:'web',          label:'WEB SCAN'     },
  { id:'facial',       label:'FACE SEARCH'  },
  { id:'docs',         label:'DOC SCAN'     },
  { id:'vault',        label:'ID VAULT'     },
  { id:'alias',        label:'ALIAS GEN'    },
  { id:'optout',       label:'AUTO OPT-OUT' },
  { id:'legal',        label:'LEGAL GEN'    },
  { id:'monitoring',   label:'MONITORING'   },
  { id:'score',        label:'PRIV SCORE'   },
  { id:'metadata',     label:'METADATA'     },
  { id:'fingerprint',  label:'FINGERPRINT'  },
  { id:'checklist',    label:'CHECKLIST'    },
  { id:'challenges',   label:'CHALLENGES'   },
  { id:'multiprofile', label:'PROFILES'     },
  { id:'arsenal',      label:'ARSENAL'      },
  { id:'ai',           label:'AI ADVISOR'   },
];

export default function Header({ activeTab, setActiveTab, profiles, activeProfile, switchProfile }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toISOString().slice(0,19).replace('T',' ') + ' UTC');
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="header">
      <div className="header-top">
        <div className="logo">
          <div className="logo-icon">P/E</div>
          <div>
            <div className="logo-name"><span>PHANTOM</span> ERASE</div>
            <div className="logo-sub">DIGITAL FOOTPRINT ELIMINATION SUITE v4.0</div>
          </div>
        </div>
        <div className="status-cluster">
          <span><span className="status-dot" />SYSTEM ACTIVE</span>
          <span className="mono" style={{ fontSize:10 }}>{time}</span>
          <select
            className="profile-select"
            value={activeProfile?.id || 'default'}
            onChange={e => switchProfile(e.target.value)}
          >
            {profiles.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
