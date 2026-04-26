// ── PLATFORMS ──────────────────────────────────────────────────────────────
export const PLATFORMS = [
  { name:"Twitter/X",     url:"https://twitter.com/",                 icon:"𝕏",  color:"#1DA1F2" },
  { name:"Instagram",     url:"https://instagram.com/",               icon:"📸", color:"#E1306C" },
  { name:"Facebook",      url:"https://facebook.com/",                icon:"f",  color:"#1877F2" },
  { name:"TikTok",        url:"https://tiktok.com/@",                 icon:"♪",  color:"#FF0050" },
  { name:"LinkedIn",      url:"https://linkedin.com/in/",             icon:"in", color:"#0A66C2" },
  { name:"GitHub",        url:"https://github.com/",                  icon:"⌥",  color:"#6e40c9" },
  { name:"Reddit",        url:"https://reddit.com/user/",             icon:"🤖", color:"#FF4500" },
  { name:"YouTube",       url:"https://youtube.com/@",                icon:"▶",  color:"#FF0000" },
  { name:"Pinterest",     url:"https://pinterest.com/",               icon:"P",  color:"#E60023" },
  { name:"Snapchat",      url:"https://snapchat.com/add/",            icon:"👻", color:"#FFFC00" },
  { name:"Tumblr",        url:"https://tumblr.com/",                  icon:"t",  color:"#35465C" },
  { name:"Twitch",        url:"https://twitch.tv/",                   icon:"🎮", color:"#9146FF" },
  { name:"Discord",       url:"https://discord.com/users/",           icon:"◈",  color:"#5865F2" },
  { name:"Telegram",      url:"https://t.me/",                        icon:"✈",  color:"#26A5E4" },
  { name:"Medium",        url:"https://medium.com/@",                 icon:"M",  color:"#00AB6C" },
  { name:"Quora",         url:"https://quora.com/profile/",           icon:"Q",  color:"#B92B27" },
  { name:"Patreon",       url:"https://patreon.com/",                 icon:"P",  color:"#FF424D" },
  { name:"Behance",       url:"https://behance.net/",                 icon:"Be", color:"#1769FF" },
  { name:"Dribbble",      url:"https://dribbble.com/",                icon:"⚽", color:"#EA4C89" },
  { name:"DeviantArt",    url:"https://deviantart.com/",              icon:"D",  color:"#05CC47" },
  { name:"Flickr",        url:"https://flickr.com/people/",           icon:"◐",  color:"#FF0084" },
  { name:"Vimeo",         url:"https://vimeo.com/",                   icon:"V",  color:"#1AB7EA" },
  { name:"SoundCloud",    url:"https://soundcloud.com/",              icon:"☁",  color:"#FF5500" },
  { name:"Spotify",       url:"https://open.spotify.com/user/",       icon:"♫",  color:"#1DB954" },
  { name:"Keybase",       url:"https://keybase.io/",                  icon:"🔑", color:"#FF6F21" },
  { name:"GitLab",        url:"https://gitlab.com/",                  icon:"🦊", color:"#FC6D26" },
  { name:"Bitbucket",     url:"https://bitbucket.org/",               icon:"⛓",  color:"#0052CC" },
  { name:"Stack Overflow",url:"https://stackoverflow.com/users/",     icon:"SO", color:"#F58025" },
  { name:"HackerRank",    url:"https://hackerrank.com/",              icon:"⟨⟩", color:"#00EA64" },
  { name:"LeetCode",      url:"https://leetcode.com/",                icon:"LC", color:"#FFA116" },
  { name:"Mastodon",      url:"https://mastodon.social/@",            icon:"M",  color:"#6364FF" },
  { name:"Substack",      url:"https://substack.com/@",               icon:"S",  color:"#FF6719" },
  { name:"Twitch",        url:"https://twitch.tv/",                   icon:"📡", color:"#9146FF" },
  { name:"Chess.com",     url:"https://chess.com/member/",            icon:"♟",  color:"#769656" },
  { name:"Goodreads",     url:"https://goodreads.com/",               icon:"📚", color:"#553B08" },
];

// ── DATA BROKERS ────────────────────────────────────────────────────────────
export const DATA_BROKERS = [
  { name:"Spokeo",            optOut:"https://www.spokeo.com/opt_out/new",                               category:"People Search",    risk:"HIGH",     daysToRemove:7  },
  { name:"BeenVerified",      optOut:"https://www.beenverified.com/app/optout/search",                   category:"Background Check", risk:"HIGH",     daysToRemove:30 },
  { name:"Whitepages",        optOut:"https://www.whitepages.com/suppression-requests",                  category:"People Search",    risk:"HIGH",     daysToRemove:14 },
  { name:"Intelius",          optOut:"https://www.intelius.com/optout",                                  category:"People Search",    risk:"HIGH",     daysToRemove:14 },
  { name:"PeopleFinder",      optOut:"https://www.peoplefinders.com/opt-out",                            category:"People Search",    risk:"HIGH",     daysToRemove:7  },
  { name:"MyLife",            optOut:"https://www.mylife.com/privacy/remove-my-information.pubview",     category:"Profile Aggregator",risk:"CRITICAL", daysToRemove:30 },
  { name:"Radaris",           optOut:"https://radaris.com/control/privacy",                              category:"People Search",    risk:"HIGH",     daysToRemove:7  },
  { name:"Pipl",              optOut:"https://pipl.com/personal-information-removal-request",            category:"Deep Web Search",  risk:"CRITICAL", daysToRemove:21 },
  { name:"ZabaSearch",        optOut:"https://www.zabasearch.com/block_records/",                        category:"People Search",    risk:"MEDIUM",   daysToRemove:7  },
  { name:"PeopleSmart",       optOut:"https://www.peoplesmart.com/optout-go",                            category:"People Search",    risk:"HIGH",     daysToRemove:14 },
  { name:"TruthFinder",       optOut:"https://www.truthfinder.com/opt-out/",                             category:"Background Check", risk:"HIGH",     daysToRemove:30 },
  { name:"Acxiom",            optOut:"https://www.acxiom.com/optout/",                                   category:"Data Aggregator",  risk:"CRITICAL", daysToRemove:45 },
  { name:"LexisNexis",        optOut:"https://optout.lexisnexis.com/",                                   category:"Data Aggregator",  risk:"CRITICAL", daysToRemove:30 },
  { name:"Epsilon",           optOut:"https://www.epsilon.com/us/privacy-policy/opt-out",                category:"Marketing Data",   risk:"HIGH",     daysToRemove:30 },
  { name:"DataLogix",         optOut:"https://datalogix.com/privacy",                                    category:"Marketing Data",   risk:"HIGH",     daysToRemove:30 },
  { name:"Instant Checkmate", optOut:"https://www.instantcheckmate.com/opt-out/",                        category:"Background Check", risk:"HIGH",     daysToRemove:30 },
  { name:"USSearch",          optOut:"https://www.ussearch.com/consumer/ala/landing.do",                 category:"People Search",    risk:"MEDIUM",   daysToRemove:14 },
  { name:"PublicRecordsNow",  optOut:"https://www.publicrecordsnow.com/static/view/optout",              category:"Public Records",   risk:"MEDIUM",   daysToRemove:7  },
  { name:"FastPeopleSearch",  optOut:"https://www.fastpeoplesearch.com/removal",                         category:"People Search",    risk:"HIGH",     daysToRemove:7  },
  { name:"ClustrMaps",        optOut:"https://clustrmaps.com/bl/opt-out",                                category:"Location Data",    risk:"HIGH",     daysToRemove:14 },
  { name:"411.com",           optOut:"https://www.411.com/privacy",                                      category:"Directory",        risk:"MEDIUM",   daysToRemove:7  },
  { name:"AnyWho",            optOut:"https://www.anywho.com/optout",                                    category:"Directory",        risk:"MEDIUM",   daysToRemove:7  },
  { name:"CheckPeople",       optOut:"https://checkpeople.com/opt-out",                                  category:"People Search",    risk:"HIGH",     daysToRemove:14 },
  { name:"Nuwber",            optOut:"https://nuwber.com/removal/link",                                  category:"People Search",    risk:"HIGH",     daysToRemove:14 },
];

// ── BREACH SITES ────────────────────────────────────────────────────────────
export const BREACH_SITES = [
  { name:"HaveIBeenPwned",    url:"https://haveibeenpwned.com/",         desc:"Check email in known data breaches" },
  { name:"DeHashed",          url:"https://dehashed.com/",               desc:"Search leaked databases" },
  { name:"LeakCheck",         url:"https://leakcheck.io/",               desc:"Real-time breach database" },
  { name:"Snusbase",          url:"https://snusbase.com/",               desc:"Breach data search engine" },
  { name:"IntelligenceX",     url:"https://intelx.io/",                  desc:"OSINT search with breach data" },
  { name:"Breach Directory",  url:"https://breachdirectory.org/",        desc:"Open breach notification search" },
];

// ── FACIAL TOOLS ────────────────────────────────────────────────────────────
export const FACIAL_TOOLS = [
  { name:"PimEyes",           url:"https://pimeyes.com/",                desc:"Facial search engine — deep web coverage",  tier:"PRO"      },
  { name:"Google Images",     url:"https://images.google.com/",          desc:"Reverse image search via upload/URL",       tier:"FREE"     },
  { name:"TinEye",            url:"https://tineye.com/",                 desc:"Reverse image — exact match tracking",      tier:"FREE"     },
  { name:"Yandex Images",     url:"https://yandex.com/images/",          desc:"Best free face match rate",                 tier:"FREE"     },
  { name:"Bing Visual Search",url:"https://www.bing.com/visualsearch",   desc:"Microsoft facial & object recognition",     tier:"FREE"     },
  { name:"FaceCheck.ID",      url:"https://facecheck.id/",               desc:"Search the web for matching faces",         tier:"FREEMIUM" },
  { name:"Social Catfish",    url:"https://socialcatfish.com/",          desc:"Reverse face + identity verification",      tier:"PAID"     },
  { name:"KarmaDecay",        url:"http://karmadecay.com/",              desc:"Reverse image search within Reddit",        tier:"FREE"     },
];

// ── CLEANUP CHECKLIST ───────────────────────────────────────────────────────
export const CLEANUP_CHECKLIST = [
  { task:"Run username search on all major platforms",               module:"username",  priority:1 },
  { task:"Check email in breach databases (HIBP)",                   module:"breach",    priority:1 },
  { task:"Submit opt-out to top 5 CRITICAL data brokers",            module:"brokers",   priority:1 },
  { task:"Perform reverse image search on profile photos",           module:"facial",    priority:2 },
  { task:"Delete or deactivate all unused social accounts",          module:"social",    priority:1 },
  { task:"Request Google removal of personal info from search",      module:"web",       priority:2 },
  { task:"Submit opt-out to all HIGH risk data brokers",             module:"brokers",   priority:2 },
  { task:"Enable 2FA on all active accounts (authenticator app)",    module:"security",  priority:1 },
  { task:"Review and tighten privacy settings on active accounts",   module:"social",    priority:2 },
  { task:"Remove personal info from LinkedIn if set to public",      module:"social",    priority:2 },
  { task:"Strip EXIF metadata from all profile photos",              module:"metadata",  priority:2 },
  { task:"Scan for indexed documents containing your name/email",    module:"docs",      priority:2 },
  { task:"Check dark web paste sites for your credentials",          module:"darkweb",   priority:1 },
  { task:"Use VPN for future browsing — verify IP is masked",        module:"security",  priority:2 },
  { task:"Submit removal requests to MEDIUM risk brokers",           module:"brokers",   priority:3 },
  { task:"Set up Google Alerts for your name and email",             module:"monitoring",priority:2 },
  { task:"Review connected third-party app permissions",             module:"security",  priority:2 },
  { task:"Request data deletion from Meta (Facebook/Instagram)",     module:"social",    priority:2 },
  { task:"File GDPR/CCPA removal requests where applicable",         module:"legal",     priority:3 },
  { task:"Audit email forwarding rules for compromise signs",        module:"security",  priority:3 },
  { task:"Run browser fingerprint analysis and reduce uniqueness",   module:"fingerprint",priority:3},
  { task:"Archive removal confirmation emails in secure folder",     module:"legal",     priority:3 },
];

// ── SECURITY TOOLS ──────────────────────────────────────────────────────────
export const SECURITY_TOOLS = [
  { cat:"ANONYMITY", items:[
    { name:"Tor Browser",     url:"https://www.torproject.org/",          desc:"Anonymous browsing via onion routing" },
    { name:"Mullvad VPN",     url:"https://mullvad.net/",                 desc:"No-log VPN with anonymous accounts" },
    { name:"ProtonVPN",       url:"https://protonvpn.com/",               desc:"Swiss-based encrypted VPN" },
    { name:"I2P Network",     url:"https://geti2p.net/",                  desc:"Anonymous overlay network" },
  ]},
  { cat:"SECURE COMMS", items:[
    { name:"Signal",          url:"https://signal.org/",                  desc:"E2E encrypted messaging & calls" },
    { name:"ProtonMail",      url:"https://protonmail.com/",              desc:"Encrypted email in Switzerland" },
    { name:"Tutanota",        url:"https://tutanota.com/",                desc:"End-to-end encrypted email" },
    { name:"SimpleX Chat",    url:"https://simplex.chat/",                desc:"No user IDs — maximum privacy" },
  ]},
  { cat:"PASSWORD & 2FA", items:[
    { name:"Bitwarden",       url:"https://bitwarden.com/",               desc:"Open-source password manager" },
    { name:"Aegis Auth",      url:"https://getaegisapp.com/",             desc:"Offline TOTP/HOTP 2FA (Android)" },
    { name:"YubiKey",         url:"https://www.yubico.com/",              desc:"Hardware security key" },
    { name:"KeePassXC",       url:"https://keepassxc.org/",               desc:"Local encrypted password vault" },
  ]},
  { cat:"BROWSER PRIVACY", items:[
    { name:"Brave Browser",   url:"https://brave.com/",                   desc:"Built-in ad/tracker blocking" },
    { name:"uBlock Origin",   url:"https://ublockorigin.com/",            desc:"Efficient content blocker extension" },
    { name:"Privacy Badger",  url:"https://privacybadger.org/",           desc:"Auto-learns to block trackers" },
    { name:"Arkenfox",        url:"https://github.com/arkenfox/user.js",  desc:"Hardened Firefox config" },
  ]},
  { cat:"MONITORING", items:[
    { name:"Google Alerts",   url:"https://www.google.com/alerts",        desc:"Notify when your name appears online" },
    { name:"Mention",         url:"https://mention.com/",                 desc:"Real-time web monitoring" },
    { name:"Talkwalker",      url:"https://www.talkwalker.com/alerts",    desc:"Alternative to Google Alerts" },
    { name:"Lumen Database",  url:"https://lumendatabase.org/",           desc:"Track DMCA & takedown requests" },
  ]},
  { cat:"LEGAL TOOLS", items:[
    { name:"GDPR Portal",     url:"https://gdpr.eu/",                     desc:"EU Right to Erasure requests" },
    { name:"CCPA Opt-Out",    url:"https://oag.ca.gov/privacy/ccpa",      desc:"California privacy rights" },
    { name:"FTC ID Theft",    url:"https://reportfraud.ftc.gov/",         desc:"File identity theft complaints" },
    { name:"Wayback Removal", url:"https://help.archive.org/help/how-do-i-request-to-remove-something-from-archive-org/", desc:"Remove from Wayback Machine" },
  ]},
];

// ── DARK WEB RESOURCES ──────────────────────────────────────────────────────
export const DARK_WEB_RESOURCES = [
  { name:"Have I Been Pwned",   url:"https://haveibeenpwned.com/",        desc:"Automated breach/paste notifications" },
  { name:"Dehashed",            url:"https://dehashed.com/",              desc:"Comprehensive leaked data search" },
  { name:"IntelX",              url:"https://intelx.io/",                 desc:"OSINT search incl. dark web archives" },
  { name:"Pastebin Monitor",    url:"https://pastebin.com/",              desc:"Manual paste site search" },
  { name:"GhostProject",        url:"https://ghostproject.fr/",           desc:"Leaked credentials search" },
];

// ── ALIAS TEMPLATES ─────────────────────────────────────────────────────────
export const FIRST_NAMES = ["Alex","Jordan","Morgan","Casey","Riley","Avery","Quinn","Taylor","Blake","Cameron","Drew","Emery","Finley","Harper","Indigo","Jaden","Kendall","Logan","Micah","Noel"];
export const LAST_NAMES  = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Wilson","Anderson","Taylor","Thomas","Moore","Jackson","Martin","Lee","White","Harris","Clark","Lewis"];
export const STREETS     = ["Maple","Oak","Cedar","Pine","Elm","Birch","Walnut","Chestnut","Willow","Spruce"];
export const CITIES      = ["Springfield","Riverdale","Fairview","Lakewood","Hillside","Meadowbrook","Clearwater","Maplewood","Sunnyvale","Greenfield"];
export const DOMAINS     = ["protonmail.com","tutanota.com","pm.me","guerrillamail.com","mailinator.com","tempmail.org"];
