export const CHECKLIST = [
  { task:"Run username scan on all major platforms",         module:"username",  priority:1 },
  { task:"Check email in breach databases (HIBP etc.)",     module:"breach",    priority:1 },
  { task:"Opt out of all CRITICAL-risk data brokers",       module:"brokers",   priority:1 },
  { task:"Run facial recognition reverse image search",     module:"facial",    priority:2 },
  { task:"Scan dark web for your email / username",         module:"darkweb",   priority:1 },
  { task:"Run phone OSINT for your number",                 module:"phone",     priority:2 },
  { task:"Check IP exposure and geolocation",               module:"ip",        priority:2 },
  { task:"Scan for publicly indexed documents",             module:"docs",      priority:2 },
  { task:"Delete or deactivate unused social accounts",     module:"social",    priority:1 },
  { task:"Request Google de-indexing of personal info",     module:"web",       priority:2 },
  { task:"Opt out of all HIGH-risk data brokers",           module:"brokers",   priority:2 },
  { task:"Strip EXIF metadata from public photos",          module:"metadata",  priority:2 },
  { task:"Check browser fingerprint uniqueness",            module:"finger",    priority:3 },
  { task:"Verify VPN/Tor is active and not leaking",        module:"vpn",       priority:2 },
  { task:"Enable 2FA on all active accounts",               module:"security",  priority:1 },
  { task:"Review and revoke unused app permissions",        module:"security",  priority:2 },
  { task:"Set up name/email monitoring alerts",             module:"alerts",    priority:2 },
  { task:"Generate GDPR erasure requests for EU services",  module:"legal",     priority:3 },
  { task:"Generate CCPA opt-out for US services",           module:"legal",     priority:3 },
  { task:"File DMCA notices for unauthorized photos",       module:"dmca",      priority:3 },
  { task:"Remove personal info from LinkedIn if public",    module:"social",    priority:2 },
  { task:"Opt out of all MEDIUM-risk data brokers",         module:"brokers",   priority:3 },
  { task:"Audit credit bureau files for accuracy",          module:"credit",    priority:2 },
  { task:"Rotate all passwords to unique 20+ char phrases", module:"security",  priority:1 },
  { task:"Remove personal info from Wayback Machine",       module:"web",       priority:3 },
];

export const PRIVACY_ARSENAL = [
  { cat:"ANONYMITY", items:[
    { name:"Tor Browser",     url:"https://www.torproject.org/",           desc:"Anonymous browsing via onion routing" },
    { name:"Mullvad VPN",     url:"https://mullvad.net/",                  desc:"No-log VPN with anonymous accounts" },
    { name:"ProtonVPN",       url:"https://protonvpn.com/",                desc:"Swiss-based encrypted VPN" },
    { name:"I2P Network",     url:"https://geti2p.net/",                   desc:"Anonymous overlay network" },
  ]},
  { cat:"SECURE COMMS", items:[
    { name:"Signal",          url:"https://signal.org/",                   desc:"E2E encrypted messaging & calls" },
    { name:"ProtonMail",      url:"https://protonmail.com/",               desc:"Encrypted email in Switzerland" },
    { name:"Tutanota",        url:"https://tutanota.com/",                 desc:"End-to-end encrypted email" },
    { name:"SimpleX Chat",    url:"https://simplex.chat/",                 desc:"No user IDs — maximum privacy" },
  ]},
  { cat:"PASSWORD & 2FA", items:[
    { name:"Bitwarden",       url:"https://bitwarden.com/",                desc:"Open-source password manager" },
    { name:"Aegis Auth",      url:"https://getaegisapp.com/",              desc:"Offline TOTP/HOTP 2FA app" },
    { name:"YubiKey",         url:"https://www.yubico.com/",               desc:"Hardware security key" },
    { name:"KeePassXC",       url:"https://keepassxc.org/",                desc:"Local encrypted password vault" },
  ]},
  { cat:"BROWSER PRIVACY", items:[
    { name:"Brave Browser",   url:"https://brave.com/",                    desc:"Built-in ad/tracker blocking" },
    { name:"uBlock Origin",   url:"https://ublockorigin.com/",             desc:"Efficient content blocker extension" },
    { name:"Privacy Badger",  url:"https://privacybadger.org/",            desc:"Auto-learns to block trackers" },
    { name:"Firefox + Arkenfox", url:"https://github.com/arkenfox/user.js",desc:"Hardened Firefox config" },
  ]},
  { cat:"MONITORING", items:[
    { name:"Google Alerts",   url:"https://www.google.com/alerts",         desc:"Get notified when your name appears" },
    { name:"Mention",         url:"https://mention.com/",                  desc:"Real-time web monitoring for keywords" },
    { name:"Talkwalker",      url:"https://www.talkwalker.com/alerts",     desc:"Alternative to Google Alerts" },
    { name:"Lumen Database",  url:"https://lumendatabase.org/",            desc:"Track DMCA & takedown requests" },
  ]},
  { cat:"LEGAL TOOLS", items:[
    { name:"GDPR Portal",     url:"https://gdpr.eu/",                      desc:"EU Right to Erasure / data deletion" },
    { name:"CCPA Opt-Out",    url:"https://oag.ca.gov/privacy/ccpa",       desc:"California privacy rights" },
    { name:"FTC ID Theft",    url:"https://reportfraud.ftc.gov/",          desc:"File identity theft complaints" },
    { name:"Archive Removal", url:"https://help.archive.org/help/how-do-i-request-to-remove-something-from-archive-org/", desc:"Remove from Wayback Machine" },
  ]},
];

export const DARK_WEB_RESOURCES = [
  { name:"Tor Project",    url:"https://www.torproject.org/",          desc:"Official Tor Browser download" },
  { name:"OnionScan",      url:"https://github.com/s-rah/onionscan",   desc:"Scan onion services for info leaks" },
  { name:"DarkSearch.io",  url:"https://darksearch.io/",               desc:"Dark web search engine (clearnet)" },
  { name:"OSINT Industries",url:"https://osint.industries/",           desc:"Comprehensive OSINT platform" },
  { name:"Ahmia.fi",       url:"https://ahmia.fi/",                    desc:"Dark web search (clearnet access)" },
];

export const LEGAL_TEMPLATES = {
  gdpr: (name, entity) => `[YOUR NAME]\n[YOUR ADDRESS]\n[DATE]\n\nData Controller: ${entity || '[COMPANY NAME]'}\n[COMPANY ADDRESS]\n\nRe: Right to Erasure Request Under GDPR Article 17\n\nDear Data Controller,\n\nI, ${name || '[YOUR NAME]'}, am writing to request the erasure of all personal data held by your organisation about me, pursuant to Article 17 of the General Data Protection Regulation (EU) 2016/679.\n\nI request that you:\n1. Permanently delete all personal data you hold about me from all systems\n2. Cease all processing of my personal data\n3. Notify all third parties to whom my data has been disclosed\n4. Confirm in writing within 30 days that erasure has been completed\n\nIf you rely on legitimate interests as a legal basis, I contend that my right to privacy and data protection overrides those interests.\n\nFailure to comply within 30 days may result in a complaint to the relevant supervisory authority.\n\nYours faithfully,\n${name || '[YOUR NAME]'}`,
  ccpa: (name, entity) => `[YOUR NAME]\n[YOUR ADDRESS]\n[DATE]\n\nPrivacy Rights Request\nTo: ${entity || '[COMPANY NAME]'}\n\nI am a California resident exercising my rights under the California Consumer Privacy Act (CCPA), Cal. Civ. Code § 1798.100 et seq.\n\nI hereby request that you:\n1. DELETE all personal information you have collected about me\n2. OPT ME OUT of the sale of my personal information to third parties\n3. CONFIRM deletion in writing within 45 days\n\nMy identifying information:\nName: ${name || '[YOUR NAME]'}\n\nPlease confirm receipt of this request and your timeline for compliance.\n\nSincerely,\n${name || '[YOUR NAME]'}`,
  dmca: (name, url) => `DMCA Takedown Notice\n\n[DATE]\n\nTo the Designated DMCA Agent:\n\nI, ${name || '[YOUR NAME]'}, am the copyright owner of the image(s) listed below and have not authorised their use.\n\nInfringing content URL(s):\n${url || '[URL OF INFRINGING CONTENT]'}\n\nI have a good faith belief that the use of this copyrighted work is not authorised by the copyright owner, its agent, or the law.\n\nI swear, under penalty of perjury, that the information in this notification is accurate and that I am the copyright owner.\n\nElectronic Signature: ${name || '[YOUR NAME]'}\nDate: [DATE]\nContact: [YOUR EMAIL]`,
};
