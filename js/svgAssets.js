/**
 * Dormitory Simulator - High Quality SVG Vector Assets
 * Crisp, clean, scalable illustrations for all dorm items and UI components.
 */

const SVGAssets = {
  // 1. Bontot (Ompreng / Lunchbox Stainless)
  bontot: `
    <svg viewBox="0 0 120 100" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f0f4f8"/>
          <stop offset="50%" stop-color="#cbd5e1"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
        <linearGradient id="lidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <!-- Base Box -->
      <rect x="15" y="38" width="90" height="48" rx="8" fill="url(#metalGrad)" stroke="#64748b" stroke-width="3"/>
      <!-- Internal Compartment lines -->
      <line x1="48" y1="38" x2="48" y2="86" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3,3"/>
      <line x1="80" y1="38" x2="80" y2="86" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3,3"/>
      <!-- Lid Top -->
      <rect x="12" y="24" width="96" height="18" rx="6" fill="url(#lidGrad)" stroke="#0369a1" stroke-width="3"/>
      <!-- Lid Handle -->
      <path d="M45 24 Q60 10 75 24" fill="none" stroke="#e0f2fe" stroke-width="4" stroke-linecap="round"/>
      <!-- Side Locking Clips -->
      <rect x="8" y="32" width="8" height="18" rx="2" fill="#64748b"/>
      <rect x="104" y="32" width="8" height="18" rx="2" fill="#64748b"/>
      <!-- Label "BONTOT SUD" -->
      <rect x="36" y="55" width="48" height="16" rx="4" fill="#ffffff" opacity="0.9"/>
      <text x="60" y="66" font-family="'Outfit', sans-serif" font-size="8" font-weight="bold" fill="#0f172a" text-anchor="middle">BONTOT</text>
    </svg>
  `,

  // 2. Botol Minum (Tumbler)
  botolMinum: `
    <svg viewBox="0 0 100 120" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#22d3ee"/>
          <stop offset="40%" stop-color="#06b6d4"/>
          <stop offset="100%" stop-color="#0891b2"/>
        </linearGradient>
      </defs>
      <!-- Bottle Body -->
      <path d="M32 35 L32 102 C32 108 38 112 45 112 L55 112 C62 112 68 108 68 102 L68 35 Z" fill="url(#bottleGrad)" stroke="#0e7490" stroke-width="2.5"/>
      <!-- Grip Pattern -->
      <line x1="36" y1="55" x2="64" y2="55" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
      <line x1="36" y1="65" x2="64" y2="65" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
      <line x1="36" y1="75" x2="64" y2="75" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
      <line x1="36" y1="85" x2="64" y2="85" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
      <!-- Neck & Cap -->
      <rect x="38" y="24" width="24" height="12" rx="3" fill="#334155" stroke="#1e293b" stroke-width="2"/>
      <rect x="36" y="12" width="28" height="14" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
      <!-- Carry Loop -->
      <path d="M50 12 C50 4 68 4 68 14" fill="none" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
      <!-- Volume Scale -->
      <circle cx="60" cy="50" r="1.5" fill="#ffffff"/>
      <circle cx="60" cy="70" r="1.5" fill="#ffffff"/>
      <circle cx="60" cy="90" r="1.5" fill="#ffffff"/>
      <text x="50" y="74" font-family="sans-serif" font-size="7" fill="#ffffff" font-weight="bold" opacity="0.9" text-anchor="middle">1000ml</text>
    </svg>
  `,

  // 3. Snack (Biskuit / Makanan Ringan Asrama)
  snack: `
    <svg viewBox="0 0 110 100" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="snackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fb923c"/>
          <stop offset="50%" stop-color="#f97316"/>
          <stop offset="100%" stop-color="#ea580c"/>
        </linearGradient>
      </defs>
      <!-- Bag Body -->
      <path d="M22 18 L88 18 L82 86 L28 86 Z" fill="url(#snackGrad)" stroke="#c2410c" stroke-width="2.5"/>
      <!-- Crimped Tops & Bottoms -->
      <path d="M20 18 L25 12 L30 18 L35 12 L40 18 L45 12 L50 18 L55 12 L60 18 L65 12 L70 18 L75 12 L80 18 L85 12 L90 18" fill="none" stroke="#c2410c" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M26 86 L31 92 L36 86 L41 92 L46 86 L51 92 L56 86 L61 92 L66 86 L71 92 L76 86 L81 92 L84 86" fill="none" stroke="#c2410c" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Snack Badge -->
      <ellipse cx="55" cy="48" rx="22" ry="16" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
      <text x="55" y="47" font-family="'Outfit', sans-serif" font-size="8" font-weight="900" fill="#b45309" text-anchor="middle">SNACK</text>
      <text x="55" y="56" font-family="'Outfit', sans-serif" font-size="6" font-weight="bold" fill="#78350f" text-anchor="middle">CRISPY</text>
      <!-- Cookies Deco -->
      <circle cx="36" cy="72" r="6" fill="#d97706"/>
      <circle cx="34" cy="70" r="1" fill="#78350f"/>
      <circle cx="38" cy="73" r="1" fill="#78350f"/>
      <circle cx="74" cy="72" r="6" fill="#d97706"/>
      <circle cx="72" cy="71" r="1" fill="#78350f"/>
      <circle cx="76" cy="74" r="1" fill="#78350f"/>
    </svg>
  `,

  // 4. Jam Waker (Jam Weker Alarm)
  jamWaker: `
    <svg viewBox="0 0 100 110" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Bells & Hammer -->
      <ellipse cx="25" cy="25" rx="14" ry="10" transform="rotate(-30 25 25)" fill="#e11d48" stroke="#9f1239" stroke-width="2.5"/>
      <ellipse cx="75" cy="25" rx="14" ry="10" transform="rotate(30 75 25)" fill="#e11d48" stroke="#9f1239" stroke-width="2.5"/>
      <rect x="47" y="10" width="6" height="16" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
      <circle cx="50" cy="10" r="5" fill="#e11d48"/>
      <!-- Legs -->
      <line x1="28" y1="88" x2="16" y2="104" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
      <line x1="72" y1="88" x2="84" y2="104" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
      <!-- Clock Main Body -->
      <circle cx="50" cy="58" r="34" fill="#f43f5e" stroke="#be123c" stroke-width="3"/>
      <!-- Dial White -->
      <circle cx="50" cy="58" r="26" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <!-- Clock Markers -->
      <circle cx="50" cy="36" r="2" fill="#0f172a"/>
      <circle cx="72" cy="58" r="2" fill="#0f172a"/>
      <circle cx="50" cy="80" r="2" fill="#0f172a"/>
      <circle cx="28" cy="58" r="2" fill="#0f172a"/>
      <!-- Hands: 05:00 (Waktu Bangun Asrama) -->
      <line x1="50" y1="58" x2="35" y2="46" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
      <line x1="50" y1="58" x2="50" y2="38" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="50" y1="58" x2="62" y2="68" stroke="#e11d48" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="50" cy="58" r="3" fill="#e11d48"/>
    </svg>
  `,

  // 5. Gelas Stainless
  gelasStainless: `
    <svg viewBox="0 0 100 110" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f8fafc"/>
          <stop offset="30%" stop-color="#cbd5e1"/>
          <stop offset="70%" stop-color="#94a3b8"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
      </defs>
      <!-- Mug Handle -->
      <path d="M64 40 C85 40 85 80 64 82" fill="none" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
      <path d="M64 40 C82 40 82 80 64 82" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
      <!-- Mug Body -->
      <path d="M28 28 L32 94 C32 98 36 102 42 102 L58 102 C64 102 68 98 68 94 L72 28 Z" fill="url(#steelGrad)" stroke="#64748b" stroke-width="2.5"/>
      <!-- Rim Top -->
      <ellipse cx="50" cy="28" rx="22" ry="5" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
      <ellipse cx="50" cy="28" rx="19" ry="3.5" fill="#334155"/>
      <!-- Gloss shine -->
      <path d="M38 34 L40 92" stroke="#ffffff" stroke-width="3" opacity="0.6" stroke-linecap="round"/>
    </svg>
  `,

  // 6. Kotak Susu Bubuk
  kotakSusuBubuk: `
    <svg viewBox="0 0 110 110" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="milkBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#60a5fa"/>
          <stop offset="60%" stop-color="#3b82f6"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
      </defs>
      <!-- Carton Shape -->
      <path d="M30 30 L55 16 L80 30 L80 94 L30 94 Z" fill="url(#milkBoxGrad)" stroke="#1e40af" stroke-width="2.5"/>
      <!-- Gable Top fold -->
      <path d="M30 30 L55 35 L80 30" fill="none" stroke="#1e40af" stroke-width="2"/>
      <path d="M55 16 L55 35" stroke="#1e40af" stroke-width="2"/>
      <!-- Milk Splash Graphic -->
      <path d="M30 65 Q45 55 55 68 Q65 52 80 62 L80 94 L30 94 Z" fill="#ffffff"/>
      <!-- Cow / Label badge -->
      <circle cx="55" cy="50" r="12" fill="#ffffff" stroke="#93c5fd" stroke-width="2"/>
      <text x="55" y="49" font-family="'Outfit', sans-serif" font-size="6.5" font-weight="900" fill="#1d4ed8" text-anchor="middle">SUSU</text>
      <text x="55" y="56" font-family="'Outfit', sans-serif" font-size="5" font-weight="bold" fill="#0284c7" text-anchor="middle">BUBUK</text>
      <text x="55" y="82" font-family="'Outfit', sans-serif" font-size="7" font-weight="bold" fill="#1e3a8a" text-anchor="middle">HIGH CALCIUM</text>
    </svg>
  `,

  // 7. Baju Lipat (Untuk Lemari Tengah Kiri)
  bajuLipat: `
    <svg viewBox="0 0 110 90" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <!-- Stack of 3 Folded Shirts -->
      <!-- Bottom shirt (White) -->
      <rect x="20" y="48" width="70" height="26" rx="5" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
      <!-- Middle shirt (Navy) -->
      <rect x="18" y="34" width="74" height="26" rx="5" fill="#1e3a8a" stroke="#0f172a" stroke-width="2"/>
      <!-- Top shirt (Light Blue Del) -->
      <rect x="16" y="20" width="78" height="28" rx="5" fill="url(#shirtGrad)" stroke="#0369a1" stroke-width="2.5"/>
      <!-- Collar on top shirt -->
      <path d="M42 20 L55 32 L68 20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <polygon points="42,20 50,30 38,28" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
      <polygon points="68,20 60,30 72,28" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
      <!-- SUD Logo/Pocket -->
      <rect x="62" y="32" width="10" height="10" rx="2" fill="#ffffff" opacity="0.8"/>
      <text x="55" y="80" font-family="'Outfit', sans-serif" font-size="7.5" font-weight="bold" fill="#ffffff" text-anchor="middle">BAJU RAPI</text>
    </svg>
  `,

  // 8. Jaket Lipat (Untuk Lemari Tengah)
  jaketLipat: `
    <svg viewBox="0 0 110 90" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#475569"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
      <!-- Stack of Folded Jackets -->
      <!-- Under Jacket (Maroon) -->
      <rect x="18" y="44" width="74" height="30" rx="6" fill="#881337" stroke="#4c0519" stroke-width="2"/>
      <!-- Top Jacket (SUD Navy/Grey Hoodie) -->
      <rect x="15" y="22" width="80" height="34" rx="7" fill="url(#jacketGrad)" stroke="#0f172a" stroke-width="2.5"/>
      <!-- Zipper down middle -->
      <line x1="55" y1="22" x2="55" y2="56" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="2,2"/>
      <!-- Zipper pull -->
      <rect x="53" y="26" width="4" height="6" fill="#e2e8f0"/>
      <!-- Hoodie Hood Fold -->
      <path d="M38 22 Q55 30 72 22" fill="#334155" stroke="#1e293b" stroke-width="2"/>
      <!-- Drawstrings -->
      <path d="M46 28 Q44 38 46 44" stroke="#ffffff" stroke-width="1.5" fill="none"/>
      <path d="M64 28 Q66 38 64 44" stroke="#ffffff" stroke-width="1.5" fill="none"/>
      <text x="55" y="80" font-family="'Outfit', sans-serif" font-size="7.5" font-weight="bold" fill="#ffffff" text-anchor="middle">JAKET RAPI</text>
    </svg>
  `,

  // 9. Celana Lipat (Untuk Lemari Tengah Kanan)
  celanaLipat: `
    <svg viewBox="0 0 110 90" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <!-- Stack of Folded Trousers/Pants -->
      <!-- Bottom Khaki Pants -->
      <rect x="20" y="50" width="70" height="24" rx="4" fill="#a16207" stroke="#713f12" stroke-width="2"/>
      <!-- Middle Grey Slacks -->
      <rect x="18" y="36" width="74" height="24" rx="4" fill="#64748b" stroke="#334155" stroke-width="2"/>
      <!-- Top Dark Blue Uniform Pants -->
      <rect x="16" y="20" width="78" height="26" rx="4" fill="url(#pantsGrad)" stroke="#020617" stroke-width="2.5"/>
      <!-- Waistband & Belt loop -->
      <rect x="16" y="20" width="78" height="7" fill="#334155"/>
      <rect x="30" y="20" width="3" height="7" fill="#94a3b8"/>
      <rect x="53" y="20" width="4" height="7" fill="#e2e8f0"/> <!-- Buckle -->
      <rect x="77" y="20" width="3" height="7" fill="#94a3b8"/>
      <text x="55" y="80" font-family="'Outfit', sans-serif" font-size="7.5" font-weight="bold" fill="#ffffff" text-anchor="middle">CELANA RAPI</text>
    </svg>
  `,

  // 10. Tas (Ransel Asrama Rak Bawah)
  tas: `
    <svg viewBox="0 0 140 130" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e3a8a"/>
          <stop offset="60%" stop-color="#172554"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
      </defs>
      <!-- Top Handle -->
      <path d="M52 28 C52 14 88 14 88 28" fill="none" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
      <!-- Shoulder Straps visible behind -->
      <path d="M36 40 C24 65 24 105 32 115" fill="none" stroke="#334155" stroke-width="7" stroke-linecap="round"/>
      <path d="M104 40 C116 65 116 105 108 115" fill="none" stroke="#334155" stroke-width="7" stroke-linecap="round"/>
      <!-- Main Backpack Body -->
      <rect x="30" y="28" width="80" height="90" rx="20" fill="url(#bagGrad)" stroke="#1e293b" stroke-width="3"/>
      <!-- Front Pocket -->
      <rect x="40" y="65" width="60" height="45" rx="10" fill="url(#pocketGrad)" stroke="#1e40af" stroke-width="2.5"/>
      <!-- Pocket Zipper -->
      <line x1="44" y1="72" x2="96" y2="72" stroke="#93c5fd" stroke-width="2.5"/>
      <circle cx="70" cy="72" r="3" fill="#ffffff"/>
      <!-- Upper Compartment Zipper Curve -->
      <path d="M38 42 Q70 32 102 42" fill="none" stroke="#60a5fa" stroke-width="3"/>
      <!-- SUD Emblem on Backpack -->
      <polygon points="70,48 76,58 64,58" fill="#fbbf24"/>
      <text x="70" y="94" font-family="'Outfit', sans-serif" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">DEL BAG</text>
    </svg>
  `,

  // Alkitab (Holy Bible with golden cross & red ribbon)
  alkitab: `
    <svg viewBox="0 0 100 120" class="item-svg alkitab-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bibleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#27272a"/>
          <stop offset="50%" stop-color="#18181b"/>
          <stop offset="100%" stop-color="#09090b"/>
        </linearGradient>
      </defs>
      <!-- Leather Cover -->
      <rect x="20" y="16" width="64" height="88" rx="6" fill="url(#bibleGrad)" stroke="#3f3f46" stroke-width="2.5"/>
      <!-- Pages thickness gold edge -->
      <rect x="78" y="20" width="6" height="80" rx="2" fill="#fbbf24" stroke="#d97706" stroke-width="1"/>
      <line x1="79" y1="26" x2="83" y2="26" stroke="#b45309" stroke-width="1"/>
      <line x1="79" y1="46" x2="83" y2="46" stroke="#b45309" stroke-width="1"/>
      <line x1="79" y1="66" x2="83" y2="66" stroke="#b45309" stroke-width="1"/>
      <line x1="79" y1="86" x2="83" y2="86" stroke="#b45309" stroke-width="1"/>
      <!-- Spine crease -->
      <line x1="28" y1="16" x2="28" y2="104" stroke="#52525b" stroke-width="2"/>
      <!-- Embossed Gold Cross -->
      <rect x="48" y="38" width="8" height="34" rx="2" fill="#fbbf24" stroke="#d97706" stroke-width="1"/>
      <rect x="39" y="47" width="26" height="8" rx="2" fill="#fbbf24" stroke="#d97706" stroke-width="1"/>
      <!-- Red Bookmark Ribbon -->
      <path d="M52 16 L52 110 L56 104 L60 110 L60 16 Z" fill="#e11d48"/>
      <!-- Text ALKITAB -->
      <text x="52" y="86" font-family="'Outfit', sans-serif" font-size="7" font-weight="bold" fill="#fef08a" text-anchor="middle" letter-spacing="1">ALKITAB</text>
    </svg>
  `,

  // Bantal Empuk
  bantal: `
    <svg viewBox="0 0 140 90" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pillowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="60%" stop-color="#f1f5f9"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </linearGradient>
      </defs>
      <!-- Pillow body -->
      <rect x="15" y="15" width="110" height="60" rx="22" fill="url(#pillowGrad)" stroke="#94a3b8" stroke-width="2.5"/>
      <!-- Stitch flange edge -->
      <rect x="20" y="20" width="100" height="50" rx="16" fill="none" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="4,4"/>
      <!-- Pillow Dimple Center -->
      <ellipse cx="70" cy="45" rx="14" ry="7" fill="#e2e8f0" opacity="0.6"/>
    </svg>
  `,

  // Selimut Lipat Rapi
  selimutLipat: `
    <svg viewBox="0 0 140 90" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blanketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1d4ed8"/>
          <stop offset="50%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#1e40af"/>
        </linearGradient>
      </defs>
      <!-- Layer 3 (Bottom fold) -->
      <rect x="15" y="45" width="110" height="32" rx="6" fill="#1e3a8a" stroke="#0f172a" stroke-width="2"/>
      <!-- Layer 2 (Middle fold) -->
      <rect x="18" y="32" width="104" height="28" rx="6" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="2"/>
      <!-- Layer 1 (Top fold) -->
      <rect x="20" y="18" width="100" height="28" rx="6" fill="url(#blanketGrad)" stroke="#1e40af" stroke-width="2"/>
      <!-- Stripe Pattern on Blanket -->
      <line x1="35" y1="18" x2="35" y2="46" stroke="#fbbf24" stroke-width="4"/>
      <line x1="45" y1="18" x2="45" y2="46" stroke="#ffffff" stroke-width="2"/>
      <line x1="95" y1="18" x2="95" y2="46" stroke="#ffffff" stroke-width="2"/>
      <line x1="105" y1="18" x2="105" y2="46" stroke="#fbbf24" stroke-width="4"/>
    </svg>
  `,

  // Sapu Ijuk / Nylon
  sapu: `
    <svg viewBox="0 0 80 160" class="item-svg broom-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="50%" stop-color="#94a3b8"/>
          <stop offset="100%" stop-color="#64748b"/>
        </linearGradient>
        <linearGradient id="bristlesGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#d97706"/>
          <stop offset="50%" stop-color="#b45309"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
      </defs>
      <!-- Broom Handle -->
      <rect x="36" y="8" width="8" height="100" rx="3" fill="url(#handleGrad)" stroke="#334155" stroke-width="1.5"/>
      <circle cx="40" cy="12" r="3" fill="#e11d48"/>
      <!-- Joint / Binding -->
      <path d="M28 102 L52 102 L56 114 L24 114 Z" fill="#e11d48" stroke="#9f1239" stroke-width="2"/>
      <!-- Broom Bristles -->
      <path d="M24 114 L56 114 L68 152 L12 152 Z" fill="url(#bristlesGrad)" stroke="#451a03" stroke-width="2"/>
      <!-- Bristle Lines -->
      <line x1="20" y1="120" x2="18" y2="152" stroke="#fbbf24" stroke-width="1.5" opacity="0.6"/>
      <line x1="30" y1="116" x2="28" y2="152" stroke="#451a03" stroke-width="1.5"/>
      <line x1="40" y1="116" x2="40" y2="152" stroke="#451a03" stroke-width="1.5"/>
      <line x1="50" y1="116" x2="52" y2="152" stroke="#451a03" stroke-width="1.5"/>
      <line x1="60" y1="120" x2="62" y2="152" stroke="#fbbf24" stroke-width="1.5" opacity="0.6"/>
    </svg>
  `,

  // Serokan Sampah / Dustpan
  pengki: `
    <svg viewBox="0 0 100 90" class="item-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Handle -->
      <rect x="46" y="6" width="8" height="30" rx="2" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
      <!-- Pan Body -->
      <path d="M20 36 L80 36 L92 80 L8 80 Z" fill="#0284c7" stroke="#0369a1" stroke-width="2.5"/>
      <path d="M20 36 L28 72 L72 72 L80 36 Z" fill="#0369a1" opacity="0.5"/>
      <!-- Rubber lip edge -->
      <rect x="6" y="80" width="88" height="5" rx="1.5" fill="#1e293b"/>
    </svg>
  `
};

window.SVGAssets = SVGAssets;
