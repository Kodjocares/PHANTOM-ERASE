// ── useStorage: Encrypted localStorage with JSON support ────────────────────
import { useState, useCallback } from 'react';

const STORAGE_KEY_PREFIX = 'pe_';

// Simple XOR obfuscation (client-side only — not cryptographic)
function obfuscate(str, key = 42) {
  return str.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ key)).join('');
}
function deobfuscate(str, key = 42) { return obfuscate(str, key); }

export function useStorage(namespace) {
  const storageKey = STORAGE_KEY_PREFIX + namespace;

  const get = useCallback(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return null;
      return JSON.parse(deobfuscate(raw));
    } catch { return null; }
  }, [storageKey]);

  const set = useCallback((value) => {
    try {
      localStorage.setItem(storageKey, obfuscate(JSON.stringify(value)));
      return true;
    } catch { return false; }
  }, [storageKey]);

  const remove = useCallback(() => {
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return { get, set, remove };
}

// ── useProfile: Multi-profile state management ───────────────────────────────
export function useProfile() {
  const profileStorage = useStorage('profiles');
  const activeStorage  = useStorage('active_profile');

  const [profiles, setProfilesState] = useState(() => {
    const saved = profileStorage.get();
    return saved || [{ id: 'default', name: 'My Profile', createdAt: Date.now() }];
  });

  const [activeId, setActiveIdState] = useState(() => {
    const saved = activeStorage.get();
    return saved || 'default';
  });

  const activeProfile = profiles.find(p => p.id === activeId) || profiles[0];

  const addProfile = (name) => {
    const newProfile = { id: Date.now().toString(), name, createdAt: Date.now() };
    const updated = [...profiles, newProfile];
    setProfilesState(updated);
    profileStorage.set(updated);
    return newProfile;
  };

  const switchProfile = (id) => {
    setActiveIdState(id);
    activeStorage.set(id);
  };

  const removeProfile = (id) => {
    if (id === 'default') return;
    const updated = profiles.filter(p => p.id !== id);
    setProfilesState(updated);
    profileStorage.set(updated);
    if (activeId === id) switchProfile('default');
  };

  return { profiles, activeProfile, activeId, addProfile, switchProfile, removeProfile };
}

// ── useTimeline: Persistent action log ───────────────────────────────────────
export function useTimeline() {
  const storage = useStorage('timeline');
  const [entries, setEntries] = useState(() => storage.get() || []);

  const addEntry = useCallback((action, detail, module) => {
    const entry = {
      id: Date.now(),
      action,
      detail,
      module,
      ts: new Date().toISOString(),
    };
    setEntries(prev => {
      const updated = [entry, ...prev].slice(0, 500); // cap at 500
      storage.set(updated);
      return updated;
    });
  }, [storage]);

  const clearTimeline = useCallback(() => {
    setEntries([]);
    storage.remove();
  }, [storage]);

  return { entries, addEntry, clearTimeline };
}
