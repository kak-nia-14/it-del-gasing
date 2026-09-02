/**
 * SkyViewDel - Celestial Data Catalog
 * Database lengkap planet, bintang, dan rasi bintang dengan data astronomis & edukatif (Bahasa Indonesia)
 */

export const CELESTIAL_DATA = {
  planets: [
    {
      id: 'sun',
      name: 'Matahari (The Sun)',
      category: 'Bintang Induk',
      type: 'star-center',
      azimuth: 120, // derajat dari utara
      altitude: 45, // derajat di atas horizon
      radius: 5.5,
      baseColor: '#ffd700',
      glowColor: '#ff8c00',
      emissive: '#ffaa00',
      coronaSize: 9.0,
      surfaceTemp: '5.500 °C (Permukaan) / 15 Juta °C (Inti)',
      diameter: '1.392.700 km (109x Bumi)',
      distanceFromEarth: '149,6 Juta km (1 SA)',
      mass: '333.000x Massa Bumi (99.86% massa Tata Surya)',
      rotationPeriod: '25-35 Hari Bumi (Rotasi diferensial)',
      orbitalPeriod: '230 Juta Tahun (Mengelilingi Bima Sakti)',
      description: 'Matahari adalah bintang katai kuning (Yellow Dwarf tipe G2V) di pusat Tata Surya kita. Hampir seluruh energi yang menghidupi Bumi berasal dari fusi nuklir hidrogen menjadi helium di dalam inti Matahari.',
      funFacts: [
        'Matahari membakar sekitar 600 juta ton hidrogen setiap detiknya menjadi helium.',
        'Cahaya Matahari membutuhkan waktu sekitar 8 menit 20 detik untuk mencapai permukaan Bumi.',
        'Di dalam Matahari, bisa muat sekitar 1,3 juta planet seukuran Bumi!'
      ],
      mythology: 'Dalam mitologi Yunani, Matahari dipersonifikasikan sebagai dewa Helios (kemudian Apollo) yang mengendarai kereta kuda api melintasi langit setiap hari.',
      tag: 'Pusat Tata Surya'
    },
    {
      id: 'moon',
      name: 'Bulan (The Moon)',
      category: 'Satelit Alami',
      type: 'satellite',
      azimuth: 280,
      altitude: 55,
      radius: 3.2,
      baseColor: '#f1f5f9',
      glowColor: '#cbd5e1',
      surfaceTemp: '-130 °C (Malam) hingga +120 °C (Siang)',
      diameter: '3.474 km (Sekitar 1/4 diameter Bumi)',
      distanceFromEarth: '384.400 km',
      mass: '7,34 × 10²² kg (1.2% massa Bumi)',
      rotationPeriod: '27,3 Hari (Terkunci pasang-surut / Tidal Locking)',
      orbitalPeriod: '27,3 Hari mengelilingi Bumi',
      description: 'Bulan adalah satu-satunya satelit alami Bumi dan benda langit paling terang kedua di langit setelah Matahari. Tarikan gravitasi Bulan menciptakan pasang surut air laut dan menstabilkan kemiringan sumbu Bumi.',
      funFacts: [
        'Karena Tidal Locking, Bulan selalu menghadapkan sisi yang sama ke arah Bumi seumur hidup kita.',
        'Jejak kaki para astronot Apollo di Bulan tidak akan terhapus selama jutaan tahun karena ketiadaan atmosfer dan angin.',
        'Setiap tahun, Bulan perlahan bergerak menjauhi Bumi sekitar 3,8 sentimeter.'
      ],
      mythology: 'Dalam mitologi Romawi dinamai Luna, dan dalam mitologi Yunani adalah Selene, dewi bulan yang bersinar lembut di malam hari.',
      tag: 'Sahabat Sejati Bumi'
    },
    {
      id: 'mercury',
      name: 'Merkurius (Mercury)',
      category: 'Planet Terestrial',
      type: 'planet',
      azimuth: 105,
      altitude: 18,
      radius: 1.8,
      baseColor: '#a8a29e',
      glowColor: '#e7e5e4',
      surfaceTemp: '-180 °C (Malam) hingga +430 °C (Siang)',
      diameter: '4.879 km',
      distanceFromEarth: '77 - 222 Juta km',
      mass: '3,30 × 10²³ kg (0.055 massa Bumi)',
      rotationPeriod: '58,6 Hari Bumi',
      orbitalPeriod: '88 Hari Bumi',
      description: 'Merkurius adalah planet terkecil dan terdekat dengan Matahari di Tata Surya. Permukaannya penuh kawah tubrukan mirip Bulan dan tidak memiliki atmosfer tebal untuk menahan panas, menjadikannya memiliki fluktuasi suhu paling ekstrem.',
      funFacts: [
        'Satu tahun di Merkurius (88 hari) lebih cepat daripada satu hari penuh siang-malamnya (176 hari Bumi)!',
        'Meskipun paling dekat dengan Matahari, Merkurius bukan planet terpanas (gelar terpanas dipegang oleh Venus).',
        'Merkurius memiliki inti besi cair raksasa yang mencakup sekitar 85% dari jari-jari planetnya.'
      ],
      mythology: 'Diberi nama sesuai dewa Romawi pembawa pesan yang bergerak sangat gesit dengan sandal bersayap.',
      tag: 'Planet Tercepat'
    },
    {
      id: 'venus',
      name: 'Venus (Bintang Kejora / Fajar)',
      category: 'Planet Terestrial',
      type: 'planet',
      azimuth: 75,
      altitude: 32,
      radius: 2.5,
      baseColor: '#fbbf24',
      glowColor: '#fef08a',
      surfaceTemp: '465 °C (Stabil siang & malam)',
      diameter: '12.104 km (Kembaran Bumi)',
      distanceFromEarth: '41 - 261 Juta km',
      mass: '4,87 × 10²⁴ kg (0.815 massa Bumi)',
      rotationPeriod: '243 Hari Bumi (Berputar terbalik / Retrograde)',
      orbitalPeriod: '224,7 Hari Bumi',
      description: 'Venus sering dijuluki "Kembaran Bumi" karena ukuran dan massanya yang hampir sama. Namun, atmosfernya dipenuhi gas karbon dioksida pekat dengan efek rumah kaca tak terkendali dan awan asam sulfat yang membuat permukaannya menjadi tempat terpanas di Tata Surya.',
      funFacts: [
        'Venus berputar searah jarum jam (retrograde), artinya Matahari terbit dari barat dan terbenam di timur.',
        'Tekanan udara di permukaan Venus 92 kali lebih kuat dari Bumi, setara dengan berada 900 meter di kedalaman laut.',
        'Venus adalah objek alami paling terang di langit malam setelah Bulan, sehingga sering disebut Bintang Fajar atau Bintang Kejora.'
      ],
      mythology: 'Dinamai menurut dewi cinta dan kecantikan Romawi karena kilaunya yang cemerlang memukau di waktu fajar dan senja.',
      tag: 'Planet Terpanas'
    },
    {
      id: 'mars',
      name: 'Mars (Planet Merah)',
      category: 'Planet Terestrial',
      type: 'planet',
      azimuth: 210,
      altitude: 48,
      radius: 2.0,
      baseColor: '#ef4444',
      glowColor: '#f87171',
      surfaceTemp: '-140 °C hingga +20 °C (Rata-rata -60 °C)',
      diameter: '6.779 km',
      distanceFromEarth: '56 - 401 Juta km',
      mass: '6,42 × 10²³ kg (0.107 massa Bumi)',
      rotationPeriod: '24 Jam 37 Menit (Hampir sama dengan Bumi)',
      orbitalPeriod: '687 Hari Bumi (1,88 Tahun Bumi)',
      description: 'Mars dijuluki Planet Merah karena kandungan mineral besi oksida (karat) yang melimpah di permukaannya. Mars memiliki lembah terdalam dan gunung berapi terbesar di Tata Surya (Olympus Mons) serta menjadi kandidat utama kolonisasi masa depan oleh umat manusia.',
      funFacts: [
        'Gunung Olympus Mons di Mars memiliki ketinggian 21,9 km, hampir 3 kali lipat tinggi Gunung Everest!',
        'Mars memiliki dua bulan mungil berbentuk kentang bernama Phobos (Rasa Takut) dan Deimos (Teror).',
        'Matahari terbenam di Mars terlihat berwarna kebiruan karena hamburan debu halus di atmosfernya yang tipis.'
      ],
      mythology: 'Dinamai sesuai nama dewa perang Romawi karena warnanya yang merah darah tampak berani di langit.',
      tag: 'Kandidat Rumah Kedua'
    },
    {
      id: 'jupiter',
      name: 'Jupiter (Raja Planet / Yupiter)',
      category: 'Raksasa Gas (Gas Giant)',
      type: 'planet',
      azimuth: 160,
      altitude: 68,
      radius: 4.5,
      baseColor: '#d97706',
      glowColor: '#fed7aa',
      hasBands: true,
      surfaceTemp: '-110 °C (Di puncak awan)',
      diameter: '139.820 km (11x diameter Bumi)',
      distanceFromEarth: '588 - 968 Juta km',
      mass: '1,90 × 10²⁷ kg (318x massa Bumi, 2,5x gabungan semua planet lain)',
      rotationPeriod: '9 Jam 55 Menit (Rotasi tercepat di Tata Surya)',
      orbitalPeriod: '11,86 Tahun Bumi',
      description: 'Jupiter adalah planet terbesar di Tata Surya kita. Sebagai raksasa gas, planet ini didominasi oleh gas hidrogen dan helium dengan badai raksasa legendaris "Bintik Merah Raksasa" (Great Red Spot) yang telah berputar selama ratusan tahun.',
      funFacts: [
        'Bintik Merah Raksasa adalah badai antisiklon yang ukurannya lebih besar daripada seluruh planet Bumi.',
        'Jupiter memiliki 95 satelit alami yang diakui resmi, termasuk Ganymede (satelit terbesar di Tata Surya) dan Europa (yang memiliki samudra bawah es).',
        'Gravitasi super kuat Jupiter bertindak seperti "perisai pelindung" Bumi dengan membelokkan atau menyerap komet dan asteroid berbahaya.'
      ],
      mythology: 'Dinamai menurut dewa tertinggi dalam mitologi Romawi (Raja para dewa dan petir).',
      tag: 'Raksasa Tata Surya'
    },
    {
      id: 'saturn',
      name: 'Saturnus (Sang Permata Cincin)',
      category: 'Raksasa Gas (Gas Giant)',
      type: 'planet',
      azimuth: 245,
      altitude: 38,
      radius: 3.8,
      baseColor: '#fde047',
      glowColor: '#fef08a',
      hasRings: true,
      ringInner: 4.8,
      ringOuter: 8.2,
      surfaceTemp: '-140 °C',
      diameter: '116.460 km (9x diameter Bumi)',
      distanceFromEarth: '1,2 - 1,6 Miliar km',
      mass: '5,68 × 10²⁶ kg (95x massa Bumi)',
      rotationPeriod: '10 Jam 33 Menit',
      orbitalPeriod: '29,45 Tahun Bumi',
      description: 'Saturnus adalah planet paling menakjubkan dengan sistem cincin es dan batuan kosmik yang spektakuler. Meskipun berukuran sangat masif, Saturnus adalah planet dengan massa jenis terendah di Tata Surya—begitu ringan sehingga bisa mengapung di atas bak air raksasa!',
      funFacts: [
        'Cincin spektakuler Saturnus memiliki rentang lebar hingga 282.000 km namun ketebalannya rata-rata hanya sekitar 10 meter!',
        'Cincin Saturnus tersusun atas miliaran potongan es air murni berukuran mulai dari butiran debu hingga bongkahan seukuran gunung.',
        'Saturnus memiliki 146 bulan yang diketahui, dengan Titan sebagai satelit beratmosfer tebal dengan danau metana cair.'
      ],
      mythology: 'Diberi nama sesuai dewa pertanian dan waktu Romawi (ayah dari Jupiter).',
      tag: 'Ikon Mahkota Cincin'
    },
    {
      id: 'uranus',
      name: 'Uranus (Raksasa Es Berguling)',
      category: 'Raksasa Es (Ice Giant)',
      type: 'planet',
      azimuth: 310,
      altitude: 25,
      radius: 2.8,
      baseColor: '#38bdf8',
      glowColor: '#7dd3fc',
      hasRings: true,
      ringInner: 3.4,
      ringOuter: 4.6,
      surfaceTemp: '-224 °C (Salah satu tempat terdingin)',
      diameter: '50.724 km (4x diameter Bumi)',
      distanceFromEarth: '2,6 - 3,1 Miliar km',
      mass: '8,68 × 10²⁵ kg (14,5x massa Bumi)',
      rotationPeriod: '17 Jam 14 Menit (Kemiringan sumbu 98°)',
      orbitalPeriod: '84 Tahun Bumi',
      description: 'Uranus adalah raksasa es berwarna biru kehijauan menawan akibat gas metana di atmosfer atasnya. Keunikan paling dramatis Uranus adalah kemiringan rotasinya yang mencapai 98 derajat, membuatnya seolah "menggelinding miring" saat mengitari Matahari.',
      funFacts: [
        'Karena sumbunya miring ekstrem, kutub Uranus mengalami 42 tahun siang hari terus menerus diikuti 42 tahun malam yang gelap gulita!',
        'Uranus adalah planet pertama yang ditemukan menggunakan bantuan teleskop modern oleh William Herschel pada tahun 1781.',
        'Uranus memiliki 27 bulan yang seluruhnya dinamai berdasarkan karakter dalam karya sastra William Shakespeare dan Alexander Pope.'
      ],
      mythology: 'Dinamai menurut dewa langit Yunani kuno, Ouranos, kakek dari Zeus.',
      tag: 'Planet Es Terdingin'
    },
    {
      id: 'neptune',
      name: 'Neptunus (Raksasa Biru Berbadai)',
      category: 'Raksasa Es (Ice Giant)',
      type: 'planet',
      azimuth: 40,
      altitude: 22,
      radius: 2.7,
      baseColor: '#2563eb',
      glowColor: '#60a5fa',
      surfaceTemp: '-214 °C',
      diameter: '49.244 km',
      distanceFromEarth: '4,3 - 4,7 Miliar km',
      mass: '1,02 × 10²⁶ kg (17x massa Bumi)',
      rotationPeriod: '16 Jam 6 Menit',
      orbitalPeriod: '164,8 Tahun Bumi',
      description: 'Neptunus adalah planet terluar yang sah di Tata Surya kita. Berwarna biru samudra pekat yang memesona, planet ini adalah rumah bagi angin tercepat di Tata Surya yang mampu berhembus hingga kecepatan supersonik lebih dari 2.100 km/jam.',
      funFacts: [
        'Neptunus adalah satu-satunya planet yang ditemukan melalui prediksi perhitungan matematika sebelum benar-benar terlihat lewat teleskop.',
        'Semenjak ditemukan pada 1846, Neptunus baru menyelesaikan satu putaran orbit penuh mengelilingi Matahari pada tahun 2011.',
        'Satelit terbesarnya, Triton, memiliki geyser es nitrogen aktif dan mengorbit Neptunus dengan arah berlawanan (retrograde).'
      ],
      mythology: 'Dinamai sesuai nama dewa penguasa lautan Romawi karena warna birunya yang mengingatkan pada samudra raya.',
      tag: 'Penguasa Badai Supersonik'
    }
  ],

  stars: [
    {
      id: 'sirius',
      name: 'Sirius (Alpha Canis Majoris)',
      category: 'Bintang Utama (Deret Utama A1V)',
      type: 'star',
      constellation: 'Canis Major',
      azimuth: 145,
      altitude: 42,
      radius: 2.2,
      baseColor: '#e0f2fe',
      glowColor: '#38bdf8',
      spectralType: 'A1V (Bintang Biner Biru-Putih)',
      magnitude: -1.46,
      distanceFromEarth: '8,6 Tahun Cahaya (Sangat dekat!)',
      surfaceTemp: '9.940 K',
      mass: '2,02x Massa Matahari',
      luminosity: '25,4x Luminositas Matahari',
      description: 'Sirius adalah bintang paling terang di seluruh langit malam Bumi, bersinar dua kali lebih terang dari Canopus. Sirius sebenarnya adalah sistem bintang biner, terdiri dari bintang biru keputihan (Sirius A) dan pendamping katai putih kecil (Sirius B / The Pup).',
      funFacts: [
        'Bangsa Mesir Kuno mengandalkan kemunculan bintang Sirius di fajar sebagai penanda tahun baru dan datangnya banjir berkah Sungai Nil.',
        'Kata Sirius berasal dari bahasa Yunani "Seirios" yang berarti "berkilau menyala-nyala" atau "membara".',
        'Sirius mendekati tata surya kita dengan kecepatan 5,5 km/detik dan akan terus bertambah terang selama 60.000 tahun ke depan.'
      ],
      mythology: 'Dikenal sebagai "Bintang Anjing" (Dog Star) karena merupakan permata utama di rasi bintang Canis Major (Anjing Pemburu Orion).',
      tag: 'Bintang Terang #1'
    },
    {
      id: 'betelgeuse',
      name: 'Betelgeuse (Alpha Orionis)',
      category: 'Bintang Maha Raksasa Merah (Red Supergiant)',
      type: 'star',
      constellation: 'Orion',
      azimuth: 185,
      altitude: 58,
      radius: 2.8,
      baseColor: '#f97316',
      glowColor: '#fb923c',
      spectralType: 'M1-M2Ia-ab',
      magnitude: 0.50,
      distanceFromEarth: '550 - 650 Tahun Cahaya',
      surfaceTemp: '3.500 K',
      mass: '16,5 - 19x Massa Matahari',
      luminosity: '100.000x Luminositas Matahari',
      description: 'Betelgeuse adalah bintang maha raksasa merah spektakuler di pundak rasi bintang Orion. Ukurannya luar biasa masif—jika diletakkan di posisi Matahari kita, permukaannya akan menelan Merkurius, Venus, Bumi, Mars, bahkan hingga orbit Jupiter!',
      funFacts: [
        'Betelgeuse berada di penghujung hidupnya dan diprediksi akan meledak menjadi Supernova dahsyat dalam rentang waktu 100.000 tahun ke depan.',
        'Saat meledak jadi Supernova, Betelgeuse akan bersinar begitu terang hingga bisa terlihat di siang bolong selama beberapa minggu!',
        'Pada akhir tahun 2019, Betelgeuse sempat meredup drastis akibat lontaran debu raksasa yang menutupi pandangan kita (The Great Dimming).'
      ],
      mythology: 'Berasal dari bahasa Arab "Ibt al-Jawza" yang berarti "Ketiak Sang Pemburu Raksasa" (Orion).',
      tag: 'Maha Raksasa Merah'
    },
    {
      id: 'rigel',
      name: 'Rigel (Beta Orionis)',
      category: 'Bintang Maha Raksasa Biru (Blue Supergiant)',
      type: 'star',
      constellation: 'Orion',
      azimuth: 195,
      altitude: 50,
      radius: 2.4,
      baseColor: '#93c5fd',
      glowColor: '#60a5fa',
      spectralType: 'B8Ia',
      magnitude: 0.13,
      distanceFromEarth: '860 Tahun Cahaya',
      surfaceTemp: '12.100 K',
      mass: '21x Massa Matahari',
      luminosity: '120.000x Luminositas Matahari',
      description: 'Rigel adalah bintang maha raksasa biru terang benderang yang menandai kaki kiri Orion sang pemburu. Memancarkan cahaya biru keputihan berenergi tinggi yang menerangi awan nebula di sekitarnya seperti Nebula Kepala Penyihir (Witch Head Nebula).',
      funFacts: [
        'Meskipun menyandang kode "Beta" Orionis, Rigel hampir selalu tampak lebih terang daripada Betelgeuse (Alpha Orionis).',
        'Rigel membakar bahan bakar nuklirnya dengan sangat rakus sehingga umurnya hanya sekitar 8-10 juta tahun sebelum meledak jadi supernova.',
        'Rigel sebenarnya adalah sistem multi-bintang yang terdiri dari setidaknya 4 bintang yang saling terikat gravitasi.'
      ],
      mythology: 'Berasal dari frasa Arab "Rijl Jauzah al-Yusra" yang bermakna "Kaki Kiri Sang Raksasa".',
      tag: 'Maha Raksasa Biru'
    },
    {
      id: 'polaris',
      name: 'Polaris (Bintang Kutub Utara)',
      category: 'Bintang Super Raksasa Kuning (Variabel Cepheid)',
      type: 'star',
      constellation: 'Ursa Minor',
      azimuth: 0,
      altitude: 15,
      radius: 2.0,
      baseColor: '#fef08a',
      glowColor: '#fde047',
      spectralType: 'F7Ib',
      magnitude: 1.98,
      distanceFromEarth: '433 Tahun Cahaya',
      surfaceTemp: '6.015 K',
      mass: '5,4x Massa Matahari',
      luminosity: '2.500x Luminositas Matahari',
      description: 'Polaris adalah Bintang Kutub Utara yang legendaris. Terletak hampir tepat di sumbu rotasi langit kutub utara Bumi, membuatnya tampak diam tak bergerak sementara semua bintang lain berputar mengelilinginya sepanjang malam.',
      funFacts: [
        'Polaris telah menjadi pedoman kompas navigasi andalan para pelaut dan penjelajah samudra selama ribuan tahun.',
        'Karena presesi sumbu Bumi (goyangan poros 26.000 tahunan), Polaris tidak akan selamanya menjadi bintang kutub; posisi ini akan digantikan Vega dalam 12.000 tahun mendatang.',
        'Polaris adalah sistem tiga bintang, di mana bintang utamanya adalah super raksasa kuning yang berdenyut secara periodik.'
      ],
      mythology: 'Dianggap sebagai poros alam semesta atau pasak langit penuntun para musafir di belahan bumi utara.',
      tag: 'Kompas Alami Utara'
    },
    {
      id: 'vega',
      name: 'Vega (Alpha Lyrae)',
      category: 'Bintang Deret Utama Tipe A',
      type: 'star',
      constellation: 'Lyra',
      azimuth: 335,
      altitude: 62,
      radius: 2.1,
      baseColor: '#e0f2fe',
      glowColor: '#7dd3fc',
      spectralType: 'A0Va',
      magnitude: 0.03,
      distanceFromEarth: '25 Tahun Cahaya',
      surfaceTemp: '9.600 K',
      mass: '2,1x Massa Matahari',
      luminosity: '40x Luminositas Matahari',
      description: 'Vega adalah bintang biru-putih cemerlang di rasi Lyra dan salah satu bintang paling penting dalam sejarah astronomi. Vega adalah bintang pertama (selain Matahari) yang pernah difoto oleh manusia pada tahun 1850.',
      funFacts: [
        'Vega berputar pada porosnya dengan luar biasa cepat (236 km/detik), menyebabkan bentuknya memipih di kutub seperti telur.',
        'Vega menjadi jangkar kalibrasi standar skala kecerahan magnitudo astronomis nol (Magnitudo 0.0).',
        'Vega dikelilingi oleh piringan debu sirkumstelar raksasa tempat calon planet baru terbentuk.'
      ],
      mythology: 'Dalam cerita rakyat Asia Timur (Tanabata/Qixi), Vega melambangkan Putri Penenun (Orihime) yang jatuh cinta pada Altair si Penggembala Sapi.',
      tag: 'Bintang Standar Fotometri'
    },
    {
      id: 'antares',
      name: 'Antares (Jantung Kalajengking / Alpha Scorpii)',
      category: 'Maha Raksasa Merah',
      type: 'star',
      constellation: 'Scorpius',
      azimuth: 220,
      altitude: 35,
      radius: 2.6,
      baseColor: '#ea580c',
      glowColor: '#f97316',
      spectralType: 'M1.5Iab-Ib',
      magnitude: 0.96,
      distanceFromEarth: '550 Tahun Cahaya',
      surfaceTemp: '3.600 K',
      mass: '12x Massa Matahari',
      luminosity: '75.000x Luminositas Matahari',
      description: 'Antares adalah bintang maha raksasa merah berapi-api yang menjadi jantung dari rasi kalajengking (Scorpius). Warnanya yang merah pekat sering kali bersaing dengan planet Mars di langit.',
      funFacts: [
        'Nama Antares berasal dari bahasa Yunani "Anti-Ares" yang bermakna "Pesaing Dewa Mars (Ares)" karena kemiripan warna merah menyalanya.',
        'Diameter Antares sekitar 700 kali Matahari; jika di pusat tata surya, permukaannya melampaui orbit Mars.',
        'Antares diselimuti awan nebula gas berwarna-warni yang dikenal sebagai Rho Ophiuchi Cloud Complex.'
      ],
      mythology: 'Dalam astrologi Babilonia dan budaya Polinesia, Antares dipandang sebagai jantung pelindung kalajengking langit raksasa.',
      tag: 'Jantung Kalajengking'
    },
    {
      id: 'alphacentauri',
      name: 'Alpha Centauri (Rigil Kentaurus)',
      category: 'Sistem Bintang Tiga (Triple Star System)',
      type: 'star',
      constellation: 'Centaurus',
      azimuth: 155,
      altitude: 28,
      radius: 2.1,
      baseColor: '#fef3c7',
      glowColor: '#f59e0b',
      spectralType: 'G2V + K1V + M6Ve',
      magnitude: -0.27,
      distanceFromEarth: '4,37 Tahun Cahaya (Tetangga Terdekat!)',
      surfaceTemp: '5.790 K (Rigil A)',
      mass: '1,1x Massa Matahari',
      luminosity: '1,5x Luminositas Matahari',
      description: 'Alpha Centauri adalah sistem bintang paling dekat dengan Bumi dan Tata Surya kita. Sistem ini beranggotakan tiga bintang: Rigil Kentaurus (A), Toliman (B), dan Proxima Centauri (C)—bintang merah redup yang memiliki eksoplanet di zona layak huni.',
      funFacts: [
        'Proxima Centauri berjarak 4,24 tahun cahaya dan merupakan bintang tunggal terdekat ke Bumi setelah Matahari.',
        'Sistem ini menjadi target utama proyek eksplorasi antariksa masa depan "Breakthrough Starshot" menggunakan wahana mikro bertenaga laser.',
        'Dari permukaan planet di Alpha Centauri, Matahari kita akan tampak seperti bintang terang di rasi Cassiopeia.'
      ],
      mythology: 'Menandai kaki depan sosok Centaurus (makhluk mitologi berbadan kuda berkepala manusia yang bijak).',
      tag: 'Tetangga Antariksa Terdekat'
    },
    {
      id: 'aldebaran',
      name: 'Aldebaran (Mata Banteng / Alpha Tauri)',
      category: 'Bintang Raksasa Jingga',
      type: 'star',
      constellation: 'Taurus',
      azimuth: 250,
      altitude: 52,
      radius: 2.3,
      baseColor: '#fb923c',
      glowColor: '#fdba74',
      spectralType: 'K5+III',
      magnitude: 0.85,
      distanceFromEarth: '65 Tahun Cahaya',
      surfaceTemp: '3.900 K',
      mass: '1,16x Massa Matahari',
      luminosity: '440x Luminositas Matahari',
      description: 'Aldebaran adalah bintang raksasa jingga kemerahan yang mencolok sebagai mata dari rasi banteng Taurus. Meskipun tampak berada di tengah gugus bintang Hyades, Aldebaran sebenarnya berada jauh lebih dekat ke Bumi.',
      funFacts: [
        'Nama Aldebaran berasal dari kata Arab "Al-Dabaran" yang artinya "Sang Pengikut", karena bintang ini tampak setia mengikuti gugus bintang Pleiades (Tujuh Bidadari) di langit malam.',
        'Wahana antariksa tak berawak Pioneer 10 milik NASA saat ini sedang meluncur menuju arah umum Aldebaran dan diperkirakan tiba dalam 2 juta tahun.',
        'Aldebaran memiliki planet gas raksasa (Aldebaran b) dengan massa sekitar 6 kali planet Jupiter.'
      ],
      mythology: 'Melambangkan mata berapi-api banteng langit Taurus yang sedang bersiap menghadapi Orion sang pemburu.',
      tag: 'Mata Banteng Taurus'
    }
  ],

  // Bintang tambahan untuk pembentuk rasi bintang
  constellationStars: [
    // Orion stars
    { id: 'bellatrix', name: 'Bellatrix', azimuth: 180, altitude: 63, radius: 1.6, baseColor: '#bae6fd', glowColor: '#38bdf8' },
    { id: 'saiph', name: 'Saiph', azimuth: 182, altitude: 46, radius: 1.5, baseColor: '#bae6fd', glowColor: '#38bdf8' },
    { id: 'alnitak', name: 'Alnitak (Sabuk)', azimuth: 186, altitude: 54, radius: 1.5, baseColor: '#e0f2fe', glowColor: '#38bdf8' },
    { id: 'alnilam', name: 'Alnilam (Sabuk)', azimuth: 189, altitude: 54.5, radius: 1.6, baseColor: '#e0f2fe', glowColor: '#38bdf8' },
    { id: 'mintaka', name: 'Mintaka (Sabuk)', azimuth: 192, altitude: 55, radius: 1.5, baseColor: '#e0f2fe', glowColor: '#38bdf8' },
    
    // Ursa Major stars
    { id: 'dubhe', name: 'Dubhe', azimuth: 15, altitude: 40, radius: 1.6, baseColor: '#fed7aa', glowColor: '#f97316' },
    { id: 'merak', name: 'Merak', azimuth: 12, altitude: 35, radius: 1.5, baseColor: '#e0f2fe', glowColor: '#38bdf8' },
    { id: 'phecda', name: 'Phecda', azimuth: 20, altitude: 31, radius: 1.5, baseColor: '#e0f2fe', glowColor: '#38bdf8' },
    { id: 'megrez', name: 'Megrez', azimuth: 24, altitude: 36, radius: 1.3, baseColor: '#e0f2fe', glowColor: '#38bdf8' },
    { id: 'alioth', name: 'Alioth', azimuth: 29, altitude: 34, radius: 1.6, baseColor: '#e0f2fe', glowColor: '#38bdf8' },
    { id: 'mizar', name: 'Mizar', azimuth: 34, altitude: 31, radius: 1.5, baseColor: '#e0f2fe', glowColor: '#38bdf8' },
    { id: 'alkaid', name: 'Alkaid', azimuth: 40, altitude: 27, radius: 1.6, baseColor: '#bae6fd', glowColor: '#38bdf8' },

    // Scorpius stars
    { id: 'graffias', name: 'Graffias (Acrab)', azimuth: 215, altitude: 40, radius: 1.4, baseColor: '#bae6fd', glowColor: '#38bdf8' },
    { id: 'dschubba', name: 'Dschubba', azimuth: 217, altitude: 38, radius: 1.5, baseColor: '#bae6fd', glowColor: '#38bdf8' },
    { id: 'sargas', name: 'Sargas', azimuth: 226, altitude: 25, radius: 1.5, baseColor: '#fde047', glowColor: '#eab308' },
    { id: 'shaula', name: 'Shaula (Sengat)', azimuth: 229, altitude: 22, radius: 1.7, baseColor: '#bae6fd', glowColor: '#38bdf8' },

    // Crux stars
    { id: 'acrux', name: 'Acrux', azimuth: 175, altitude: 21, radius: 1.7, baseColor: '#bae6fd', glowColor: '#38bdf8' },
    { id: 'mimosa', name: 'Mimosa (Becrux)', azimuth: 172, altitude: 25, radius: 1.6, baseColor: '#bae6fd', glowColor: '#38bdf8' },
    { id: 'gacrux', name: 'Gacrux', azimuth: 176, altitude: 30, radius: 1.5, baseColor: '#fb923c', glowColor: '#f97316' },
    { id: 'delta_crucis', name: 'Delta Crucis', azimuth: 179, altitude: 26, radius: 1.3, baseColor: '#bae6fd', glowColor: '#38bdf8' },

    // Cassiopeia stars
    { id: 'schedar', name: 'Schedar', azimuth: 338, altitude: 22, radius: 1.6, baseColor: '#fed7aa', glowColor: '#f97316' },
    { id: 'caph', name: 'Caph', azimuth: 332, altitude: 23, radius: 1.5, baseColor: '#fef08a', glowColor: '#eab308' },
    { id: 'gamma_cas', name: 'Navi (Gamma Cas)', azimuth: 342, altitude: 25, radius: 1.6, baseColor: '#bae6fd', glowColor: '#38bdf8' },
    { id: 'ruchbah', name: 'Ruchbah', azimuth: 348, altitude: 22, radius: 1.5, baseColor: '#e0f2fe', glowColor: '#38bdf8' },
    { id: 'segin', name: 'Segin', azimuth: 353, altitude: 20, radius: 1.3, baseColor: '#bae6fd', glowColor: '#38bdf8' },

    // Taurus extra stars
    { id: 'elnath', name: 'Elnath', azimuth: 268, altitude: 55, radius: 1.5, baseColor: '#bae6fd', glowColor: '#38bdf8' },
    { id: 'alcyone', name: 'Alcyone (Pleiades)', azimuth: 245, altitude: 58, radius: 1.4, baseColor: '#bae6fd', glowColor: '#38bdf8' },
    { id: 'tianguan', name: 'Tianguan (Zeta Tau)', azimuth: 265, altitude: 48, radius: 1.4, baseColor: '#bae6fd', glowColor: '#38bdf8' }
  ],

  constellations: [
    {
      id: 'orion',
      name: 'Rasi Bintang Orion (Sang Pemburu)',
      englishName: 'Orion the Hunter',
      direction: 'Barat Daya (Tinggi di langit)',
      centerAzimuth: 190,
      centerAltitude: 55,
      lines: [
        ['betelgeuse', 'bellatrix'],
        ['bellatrix', 'mintaka'],
        ['betelgeuse', 'alnitak'],
        ['mintaka', 'alnilam'],
        ['alnilam', 'alnitak'],
        ['alnitak', 'saiph'],
        ['mintaka', 'rigel'],
        ['saiph', 'rigel']
      ],
      description: 'Orion adalah rasi bintang paling terkenal dan mudah dikenali di seluruh dunia. Ciri khas utamanya adalah "Sabuk Orion" (Orion\'s Belt)—tiga bintang sejajar cemerlang (Alnitak, Alnilam, Mintaka) serta tempat singgah Nebula Orion (M42) tempat lahirnya bintang-bintang baru.',
      mythology: 'Dalam mitologi Yunani, Orion adalah pemburu perkasa bertubuh raksasa putra Poseidon. Ia ditempatkan di langit bersama anjing setianya (Canis Major) untuk mengejar banteng Taurus.',
      funFact: 'Tiga bintang sabuk Orion sering digunakan para petani tradisional di Nusantara (disebut Bintang Waluku/Bajak) sebagai penanda mulainya musim tanam padi.',
      accentColor: '#38bdf8'
    },
    {
      id: 'ursamajor',
      name: 'Ursa Major (Beruang Besar / Bintang Biduk)',
      englishName: 'Ursa Major (The Great Bear)',
      direction: 'Langit Utara',
      centerAzimuth: 24,
      centerAltitude: 34,
      lines: [
        ['dubhe', 'merak'],
        ['merak', 'phecda'],
        ['phecda', 'megrez'],
        ['megrez', 'dubhe'],
        ['megrez', 'alioth'],
        ['alioth', 'mizar'],
        ['mizar', 'alkaid']
      ],
      description: 'Ursa Major adalah salah satu rasi bintang tertua dan terbesar. Pola 7 bintang utamanya membentuk "Biduk" (Gayung Besar / The Big Dipper). Dua bintang terdepannya (Dubhe & Merak) bertindak sebagai "Penunjuk" garis lurus langsung menuju Bintang Kutub Utara (Polaris).',
      mythology: 'Dalam mitologi Yunani, melambangkan nimfa Callisto yang dikutuk menjadi beruang oleh dewi Hera yang cemburu, lalu diangkat ke langit abadi oleh Zeus.',
      funFact: 'Di Indonesia dikenal sebagai Bintang Biduk atau Gubuk Penceng Utara, menjadi pedoman arah utara sejati bagi pelaut Bugis dan penjelajah Nusantara.',
      accentColor: '#fbbf24'
    },
    {
      id: 'scorpius',
      name: 'Rasi Bintang Scorpius (Sang Kalajengking)',
      englishName: 'Scorpius the Scorpion',
      direction: 'Langit Selatan / Barat Daya',
      centerAzimuth: 222,
      centerAltitude: 32,
      lines: [
        ['graffias', 'dschubba'],
        ['dschubba', 'antares'],
        ['antares', 'sargas'],
        ['sargas', 'shaula']
      ],
      description: 'Scorpius memiliki bentuk lekukan ekor sengat yang sangat mirip kalajengking asli di langit malam. Dengan Antares menyala merah di dadanya, rasi ini melintasi jalur kaya debu kosmik pusat galaksi Bima Sakti.',
      mythology: 'Kalajengking raksasa yang dikirim oleh dewi Gaia untuk mengalahkan Orion sang pemburu. Oleh karena itu, di langit malam, Orion dan Scorpius tidak pernah muncul bersamaan (saat Scorpius terbit, Orion terbenam).',
      funFact: 'Dalam tradisi Jawa, rasi ini disebut "Lintang Banyak Angrem" (Angsa mengerami telur) atau Kalajengking Penjaga Langit.',
      accentColor: '#f97316'
    },
    {
      id: 'crux',
      name: 'Rasi Crux (Salib Selatan / Pari)',
      englishName: 'The Southern Cross',
      direction: 'Langit Selatan Murni',
      centerAzimuth: 175,
      centerAltitude: 25,
      lines: [
        ['acrux', 'gacrux'],
        ['mimosa', 'delta_crucis']
      ],
      description: 'Meskipun merupakan rasi bintang terkecil dari 88 rasi modern, Crux adalah rasi paling terkenal di belahan bumi selatan. Bentuknya berupa salib empat bintang yang menjadi penunjuk arah kutub selatan bumi.',
      mythology: 'Sangat dihormati oleh masyarakat adat suku Aborigin Australia, suku Maori, dan para pelaut maritim Nusantara sebagai penunjuk arah selatan alami.',
      funFact: 'Rasi Crux terabadikan pada bendera nasional beberapa negara seperti Australia, Selandia Baru, Brasil, Papua Nugini, dan Samoa.',
      accentColor: '#818cf8'
    },
    {
      id: 'cassiopeia',
      name: 'Rasi Cassiopeia (Sang Ratu / Huruf W)',
      englishName: 'Cassiopeia the Queen',
      direction: 'Langit Utara Rendah',
      centerAzimuth: 343,
      centerAltitude: 22,
      lines: [
        ['caph', 'schedar'],
        ['schedar', 'gamma_cas'],
        ['gamma_cas', 'ruchbah'],
        ['ruchbah', 'segin']
      ],
      description: 'Cassiopeia mudah dikenali karena lima bintang terangnya membentuk pola huruf "W" atau "M" yang mencolok di belahan utara, duduk di atas takhtanya di antara jalur Bima Sakti.',
      mythology: 'Ratu Ethiopia yang sombong akan kecantikannya, ibu dari putri Andromeda dalam legenda pahlawan Perseus.',
      funFact: 'Di rasi ini terdapat sisa supernova terkenal Cassiopeia A dan Tycho\'s Star yang meledak pada tahun 1572.',
      accentColor: '#c084fc'
    },
    {
      id: 'taurus',
      name: 'Rasi Taurus (Sang Banteng)',
      englishName: 'Taurus the Bull',
      direction: 'Langit Barat Laut',
      centerAzimuth: 255,
      centerAltitude: 52,
      lines: [
        ['aldebaran', 'elnath'],
        ['aldebaran', 'tianguan'],
        ['aldebaran', 'alcyone']
      ],
      description: 'Taurus adalah rasi zodiak kuno yang megah dengan mata merah Aldebaran dan rumah bagi gugus bintang Pleiades (Tujuh Bidadari / M45) serta Nebula Kepiting (Crab Nebula M1).',
      mythology: 'Wujud penyamaran Zeus menjadi banteng putih bertanduk emas yang memikat putri Europa.',
      funFact: 'Gugus bintang Pleiades di Taurus menjadi inspirasi logo merek mobil terkenal Jepang "Subaru".',
      accentColor: '#eab308'
    }
  ]
};

// Helper untuk menghitung koordinat bola 3D (X, Y, Z) dari Azimuth dan Altitude
export function getCartesianPosition(azimuthDeg, altitudeDeg, distance = 400) {
  const phi = (90 - altitudeDeg) * (Math.PI / 180); // Polar angle dari zenith (atas)
  const theta = (azimuthDeg - 90) * (Math.PI / 180); // Azimuthal angle

  const x = distance * Math.sin(phi) * Math.cos(theta);
  const y = distance * Math.cos(phi); // Y ke atas (langit)
  const z = distance * Math.sin(phi) * Math.sin(theta);

  return { x, y, z };
}
