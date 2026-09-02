/**
 * LOMBA BERENANG DANAU TOBA - SPRITES & PROCEDURAL GRAPHICS
 * Vector SVG Avatars, Characters Data, Gears Graphics, and Arena Visuals.
 */

const TobaData = {
  // 5 Playable Characters (3 Cowok, 2 Cewek)
  characters: [
    {
      id: 'toga',
      name: 'Toga',
      gender: 'cowok',
      genderLabel: 'Cowok',
      origin: 'Samosir',
      title: 'Perenang Tangguh Samosir',
      desc: 'Stamina tinggi dan sangat stabil di perairan berombak Danau Toba.',
      stats: { speed: 84, stamina: 98, boost: 82, recovery: 90 },
      color: '#0284c7',
      capColor: '#0369a1',
      skinColor: '#d97706',
      gogglesColor: '#38bdf8'
    },
    {
      id: 'ucuk',
      name: 'Ucuk',
      gender: 'cowok',
      genderLabel: 'Cowok',
      origin: 'Balige',
      title: 'Sprinter Kilat Balige',
      desc: 'Spesialis sprint awal dengan akselerasi kayuhan yang sangat cepat.',
      stats: { speed: 96, stamina: 80, boost: 85, recovery: 78 },
      color: '#d90429',
      capColor: '#990011',
      skinColor: '#b45309',
      gogglesColor: '#fbbf24'
    },
    {
      id: 'poltak',
      name: 'Poltak',
      gender: 'cowok',
      genderLabel: 'Cowok',
      origin: 'Tarutung',
      title: 'Juara Renang Gaya Bebas',
      desc: 'Kayuhan bertenaga besar, menghasilkan pengisian booster lebih cepat.',
      stats: { speed: 88, stamina: 86, boost: 98, recovery: 82 },
      color: '#7c3aed',
      capColor: '#5b21b6',
      skinColor: '#c2410c',
      gogglesColor: '#c084fc'
    },
    {
      id: 'tiur',
      name: 'Tiur',
      gender: 'cewek',
      genderLabel: 'Cewek',
      origin: 'Parapat',
      title: 'Ratu Lumba-lumba Parapat',
      desc: 'Kelincahan luar biasa, kayuhan sangat efisien dan hemat tenaga.',
      stats: { speed: 89, stamina: 92, boost: 86, recovery: 95 },
      color: '#f43f5e',
      capColor: '#be123c',
      skinColor: '#f59e0b',
      gogglesColor: '#fda4af'
    },
    {
      id: 'butet',
      name: 'Butet',
      gender: 'cewek',
      genderLabel: 'Cewek',
      origin: 'Pangururan',
      title: 'Juara Triatlon Toba',
      desc: 'All-rounder tangguh dengan regenerasi stamina super cepat saat lelah.',
      stats: { speed: 90, stamina: 94, boost: 89, recovery: 99 },
      color: '#10b981',
      capColor: '#047857',
      skinColor: '#ea580c',
      gogglesColor: '#6ee7b7'
    }
  ],

  // AI Opponent (Antigravity AI)
  aiOpponent: {
    id: 'antigravity_ai',
    name: 'Antigravity AI (DeepMind)',
    title: 'Google AI Swimmer Champion',
    stats: { speed: 91, stamina: 92, boost: 92, recovery: 92 },
    color: '#a855f7',
    capColor: '#6b21a8',
    skinColor: '#38bdf8',
    gogglesColor: '#00f0ff'
  },

  // 3 Locations (Semua distandarkan pada jarak 400m sesuai instruksi)
  locations: [
    {
      id: 'danau_toba',
      name: 'Danau Toba',
      subtitle: 'Open Water Samosir (400m)',
      desc: 'Danau vulkanik megah dengan ombak alami dan pemandangan bukit hijau Samosir.',
      waveStrength: 1.2,
      waterColor1: '#032b43',
      waterColor2: '#0b6e4f',
      modifier: '🌊 Hambatan Ombak Dinamis (+20%)',
      distance: 400 // Standard 400m
    },
    {
      id: 'bukit_gibeon',
      name: 'Kolam Bukit Gibeon',
      subtitle: 'Sibisa Natural Waterfall Pool (400m)',
      desc: 'Kolam mata air alami segar yang dialiri air terjun bebatuan indah.',
      waveStrength: 0.6,
      waterColor1: '#004e64',
      waterColor2: '#25a18e',
      modifier: '💧 Arus Air Terjun (+15% Recovery Stamina)',
      distance: 400 // Standard 400m
    },
    {
      id: 'labersa_toba',
      name: 'Labersa Toba Pool',
      subtitle: 'Balige Championship Waterpark (400m)',
      desc: 'Kolam renang kompetisi resmi berstandar modern di tepi Danau Toba.',
      waveStrength: 0.2,
      waterColor1: '#0077b6',
      waterColor2: '#00b4d8',
      modifier: '⚡ Lintasan Tenang (+10% Top Speed)',
      distance: 400 // Standard 400m
    }
  ],

  // 3 Equipment / Gears with Special Boosters
  gears: [
    {
      id: 'pelampung',
      name: 'Pelampung Cincin',
      subtitle: 'Swim Ring Float',
      passive: 'Mengurangi efek benturan ombak & menambah buoyancy.',
      boosterName: 'Hydro Glide Shield',
      boosterDesc: 'Meluncur mulus tanpa hambatan ombak selama 4 detik.',
      icon: '🛟',
      type: 'ring'
    },
    {
      id: 'lifejacket',
      name: 'Lifejacket Pro',
      subtitle: 'Rompi Pelampung Dinamis',
      passive: 'Hemat penggunaan stamina sebesar 25%.',
      boosterName: 'Stamina Surge',
      boosterDesc: 'Mengisi penuh energi & anti lelah selama 4 detik.',
      icon: '🦺',
      type: 'vest'
    },
    {
      id: 'fins',
      name: 'Fins Speed Pro',
      subtitle: 'Kaki Katak Sirip Turbo',
      passive: 'Meningkatkan top speed dasar sebesar 20%.',
      boosterName: 'Turbo Jet Propeller',
      boosterDesc: 'Melesat dengan kecepatan 2.5x lipat dengan dorongan pusaran air!',
      icon: '🧜‍♂️',
      type: 'fins'
    }
  ],

  // In-Game AI Banter Dialogues
  aiDialogues: [
    "Jarak 400m adalah ujian ketahanan sejati! Mari kita mulai!",
    "Kalkulasi arus Danau Toba selesai, saatnya menambah kecepatan!",
    "Kayuhanmu sangat bertenaga, tapi stamina AI diatur secara optimal!",
    "Memasuki checkpoint 200m! Separuh jalan lagi!",
    "100m terakhir menuju garis finish! OVERDRIVE BOOST ENGAGED!"
  ]
};

// SVG Icon & Graphic Generators
class TobaSprites {
  static getCharacterSVG(char) {
    const cap = char.capColor || '#0369a1';
    const skin = char.skinColor || '#d97706';
    const gog = char.gogglesColor || '#38bdf8';
    const isGirl = char.gender === 'cewek';

    return `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Body / Shoulders -->
        <path d="M25 88 C25 65 75 65 75 88" fill="${char.color}" stroke="#fff" stroke-width="2.5"/>
        
        <!-- Neck -->
        <rect x="44" y="60" width="12" height="14" rx="3" fill="${skin}"/>
        
        <!-- Head -->
        <circle cx="50" cy="46" r="22" fill="${skin}"/>
        
        <!-- Hair for female -->
        ${isGirl ? `<path d="M26 44 C24 64 32 72 35 75 M74 44 C76 64 68 72 65 75" stroke="${cap}" stroke-width="6" stroke-linecap="round"/>` : ''}

        <!-- Swim Cap -->
        <path d="M28 46 C28 26 72 26 72 46 C72 38 28 38 28 46 Z" fill="${cap}"/>
        <path d="M32 30 Q50 36 68 30" stroke="#ffffff" stroke-width="2.5" opacity="0.6"/>

        <!-- Goggles Strap -->
        <path d="M28 44 Q50 46 72 44" stroke="#111827" stroke-width="3"/>
        
        <!-- Goggles Lenses -->
        <circle cx="41" cy="45" r="7" fill="${gog}" stroke="#0f172a" stroke-width="2"/>
        <circle cx="59" cy="45" r="7" fill="${gog}" stroke="#0f172a" stroke-width="2"/>
        <path d="M48 45 L52 45" stroke="#0f172a" stroke-width="2"/>
        <circle cx="39" cy="43" r="2.5" fill="#fff" opacity="0.8"/>
        <circle cx="57" cy="43" r="2.5" fill="#fff" opacity="0.8"/>

        <!-- Smile / Breathing mouth -->
        <path d="M46 58 Q50 62 54 58" stroke="#7c2d12" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  static getAIAvatarSVG() {
    return `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 88 C25 65 75 65 75 88" fill="#581c87" stroke="#a855f7" stroke-width="2.5"/>
        <rect x="44" y="60" width="12" height="14" rx="3" fill="#0284c7"/>
        <circle cx="50" cy="46" r="22" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
        <path d="M28 46 C28 26 72 26 72 46 C72 38 28 38 28 46 Z" fill="#6b21a8"/>
        
        <!-- Cyber Visor / Goggles -->
        <rect x="30" y="40" width="40" height="12" rx="6" fill="#00f0ff" stroke="#fff" stroke-width="1.5"/>
        <line x1="34" y1="46" x2="66" y2="46" stroke="#fff" stroke-width="2" stroke-dasharray="4 2"/>
        
        <!-- DeepMind Brain Wave -->
        <path d="M42 28 Q50 20 58 28" stroke="#38bdf8" stroke-width="2"/>
        <circle cx="50" cy="22" r="2.5" fill="#00f0ff"/>
      </svg>
    `;
  }

  static getGearSVG(gearId) {
    if (gearId === 'pelampung') {
      return `
        <svg viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="30" stroke="#f43f5e" stroke-width="14"/>
          <circle cx="40" cy="40" r="30" stroke="#fff" stroke-width="14" stroke-dasharray="24 24"/>
          <circle cx="40" cy="40" r="16" fill="#0284c7" opacity="0.3"/>
        </svg>
      `;
    } else if (gearId === 'lifejacket') {
      return `
        <svg viewBox="0 0 80 80" fill="none">
          <path d="M22 20 L34 20 L38 48 L22 58 Z" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
          <path d="M58 20 L46 20 L42 48 L58 58 Z" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
          <rect x="35" y="32" width="10" height="4" fill="#1e293b"/>
          <rect x="35" y="42" width="10" height="4" fill="#1e293b"/>
          <path d="M24 28 L34 28 M46 28 L56 28" stroke="#fff" stroke-width="3"/>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 80 80" fill="none">
          <path d="M20 25 C20 20 30 20 30 25 L34 60 L16 60 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
          <path d="M50 25 C50 20 60 20 60 25 L64 60 L46 60 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
          <line x1="25" y1="35" x2="25" y2="55" stroke="#fff" stroke-width="2"/>
          <line x1="55" y1="35" x2="55" y2="55" stroke="#fff" stroke-width="2"/>
        </svg>
      `;
    }
  }

  static getLocationBannerSVG(locId) {
    if (locId === 'danau_toba') {
      return `
        <svg viewBox="0 0 300 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="skyToba" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#032b43"/>
              <stop offset="100%" stop-color="#0b6e4f"/>
            </linearGradient>
          </defs>
          <rect width="300" height="120" fill="url(#skyToba)"/>
          <path d="M0 80 Q60 40 130 70 T260 50 L300 80 L300 120 L0 120 Z" fill="#04471c" opacity="0.7"/>
          <path d="M-20 90 Q80 60 180 85 T320 65 L320 120 L-20 120 Z" fill="#0b6e4f"/>
          <path d="M0 100 Q40 95 80 100 T160 100 T240 100 T320 100" stroke="#38bdf8" stroke-width="2" fill="none" opacity="0.6"/>
        </svg>
      `;
    } else if (locId === 'bukit_gibeon') {
      return `
        <svg viewBox="0 0 300 120" preserveAspectRatio="none">
          <rect width="300" height="120" fill="#042f2e"/>
          <path d="M0 0 L120 0 L140 120 L0 120 Z" fill="#1f2937"/>
          <path d="M125 0 L135 0 L135 120 L125 120 Z" fill="#38bdf8" opacity="0.9"/>
          <rect x="0" y="85" width="300" height="35" fill="#14b8a6" opacity="0.7"/>
          <circle cx="60" cy="30" r="25" fill="#065f46"/>
          <circle cx="95" cy="40" r="20" fill="#047857"/>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 300 120" preserveAspectRatio="none">
          <rect width="300" height="120" fill="#0c4a6e"/>
          <path d="M20 120 Q60 20 140 50 T280 30" stroke="#f43f5e" stroke-width="12" fill="none"/>
          <rect x="0" y="70" width="300" height="50" fill="#0284c7"/>
          <line x1="0" y1="90" x2="300" y2="90" stroke="#fbbf24" stroke-width="3" stroke-dasharray="10 10"/>
        </svg>
      `;
    }
  }
}
