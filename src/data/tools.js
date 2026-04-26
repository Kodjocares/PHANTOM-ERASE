export const FACIAL_TOOLS = [
  { name: "PimEyes",          url: "https://pimeyes.com/",                          desc: "Facial search engine — reverse image facial lookup", tier: "PRO" },
  { name: "Google Images",    url: "https://images.google.com/",                    desc: "Reverse image search via upload or URL",            tier: "FREE" },
  { name: "TinEye",           url: "https://tineye.com/",                           desc: "Reverse image with exact match tracking",           tier: "FREE" },
  { name: "Yandex Images",    url: "https://yandex.com/images/",                    desc: "Best reverse image for face matching",              tier: "FREE" },
  { name: "Bing Visual",      url: "https://www.bing.com/visualsearch",             desc: "Microsoft facial & object recognition",             tier: "FREE" },
  { name: "FaceCheck.ID",     url: "https://facecheck.id/",                         desc: "Search the web for matching faces",                 tier: "FREEMIUM" },
  { name: "Social Catfish",   url: "https://socialcatfish.com/",                    desc: "Reverse face + identity verification",              tier: "PAID" },
  { name: "KarmaDecay",       url: "http://karmadecay.com/",                        desc: "Reverse image search within Reddit",                tier: "FREE" },
];

export const PRIVACY_TOOLS = [
  { cat: "ANONYMITY", items: [
    { name: "Tor Browser",    url: "https://www.torproject.org/",         desc: "Anonymous browsing via onion routing" },
    { name: "Mullvad VPN",    url: "https://mullvad.net/",                desc: "No-log VPN with anonymous accounts" },
    { name: "ProtonVPN",      url: "https://protonvpn.com/",              desc: "Swiss-based encrypted VPN" },
    { name: "I2P Network",    url: "https://geti2p.net/",                 desc: "Anonymous overlay network" },
  ]},
  { cat: "SECURE COMMS", items: [
    { name: "Signal",         url: "https://signal.org/",                 desc: "E2E encrypted messaging & calls" },
    { name: "ProtonMail",     url: "https://protonmail.com/",             desc: "Encrypted email in Switzerland" },
    { name: "Tutanota",       url: "https://tutanota.com/",               desc: "End-to-end encrypted email" },
    { name: "SimpleX Chat",   url: "https://simplex.chat/",              desc: "No user IDs — maximum privacy" },
  ]},
  { cat: "PASSWORD & 2FA", items: [
    { name: "Bitwarden",      url: "https://bitwarden.com/",              desc: "Open-source password manager" },
    { name: "Aegis Auth",     url: "https://getaegisapp.com/",            desc: "Offline TOTP/HOTP 2FA app" },
    { name: "YubiKey",        url: "https://www.yubico.com/",             desc: "Hardware security key" },
    { name: "KeePassXC",      url: "https://keepassxc.org/",              desc: "Local encrypted password vault" },
  ]},
  { cat: "BROWSER PRIVACY", items: [
    { name: "Brave Browser",  url: "https://brave.com/",                  desc: "Built-in ad/tracker blocking" },
    { name: "uBlock Origin",  url: "https://ublockorigin.com/",           desc: "Efficient content blocker extension" },
    { name: "Privacy Badger", url: "https://privacybadger.org/",          desc: "Auto-learns to block trackers" },
    { name: "Firefox+Arkenfox",url: "https://github.com/arkenfox/user.js",desc: "Hardened Firefox config" },
  ]},
  { cat: "MONITORING", items: [
    { name: "Google Alerts",  url: "https://www.google.com/alerts",       desc: "Notified when your name appears" },
    { name: "Mention",        url: "https://mention.com/",                desc: "Real-time web monitoring" },
    { name: "Talkwalker",     url: "https://www.talkwalker.com/alerts",   desc: "Alternative to Google Alerts" },
    { name: "Lumen Database", url: "https://lumendatabase.org/",          desc: "Track DMCA & takedown requests" },
  ]},
  { cat: "LEGAL TOOLS", items: [
    { name: "GDPR Portal",    url: "https://gdpr.eu/",                    desc: "EU Right to Erasure requests" },
    { name: "CCPA Opt-Out",   url: "https://oag.ca.gov/privacy/ccpa",     desc: "California privacy rights" },
    { name: "FTC ID Theft",   url: "https://reportfraud.ftc.gov/",        desc: "File identity theft complaints" },
    { name: "Archive Removal",url: "https://help.archive.org/help/how-do-i-request-to-remove-something-from-archive-org/", desc: "Remove from Wayback Machine" },
  ]},
];
