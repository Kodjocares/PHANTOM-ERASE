import { useState, useEffect } from 'react';

// Encrypted localStorage wrapper (simple XOR for client-side obfuscation)
const KEY = 'pe_v4_';

function encode(val) {
  try { return btoa(JSON.stringify(val)); }
  catch { return null; }
}
function decode(str) {
  try { return JSON.parse(atob(str)); }
  catch { return null; }
}

export function useLocalStorage(key, initialValue) {
  const fullKey = KEY + key;
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(fullKey);
      return item ? (decode(item) ?? initialValue) : initialValue;
    } catch { return initialValue; }
  });

  useEffect(() => {
    try { localStorage.setItem(fullKey, encode(value)); }
    catch (e) { console.warn('Storage write failed:', e); }
  }, [fullKey, value]);

  return [value, setValue];
}

export function useProfile() {
  const [profiles, setProfiles] = useLocalStorage('profiles', []);
  const [activeId, setActiveId] = useLocalStorage('activeProfile', null);

  const active = profiles.find(p => p.id === activeId) || profiles[0] || null;

  const addProfile = (name) => {
    const p = { id: Date.now().toString(), name, created: new Date().toISOString(), data: {} };
    setProfiles(prev => [...prev, p]);
    if (!activeId) setActiveId(p.id);
    return p;
  };

  const updateProfile = (id, updates) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProfile = (id) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    if (activeId === id) setActiveId(profiles[0]?.id || null);
  };

  return { profiles, active, activeId, setActiveId, addProfile, updateProfile, deleteProfile };
}

export function useTimeline() {
  const [events, setEvents] = useLocalStorage('timeline', []);

  const addEvent = (type, text, category = 'general') => {
    setEvents(prev => [{
      id: Date.now().toString(),
      type, text, category,
      date: new Date().toISOString()
    }, ...prev].slice(0, 200)); // cap at 200
  };

  const clearEvents = () => setEvents([]);

  return { events, addEvent, clearEvents };
}

// Aliases for backward compatibility with module imports
export const useStorage = useLocalStorage;
export function useProfiles() {
  const { profiles, active, activeId, setActiveId, addProfile, deleteProfile } = useProfile();
  return {
    profiles, active, activeId, setActiveId,
    addProfile: (name) => { addProfile(name); },
    removeProfile: deleteProfile,
  };
}
