/**
 * GAME DETEKTIF KRIMINAL - DATABASE 15 KASUS LENGKAP
 * Setiap kasus memiliki Kronologi, 3 Tersangka (Suspects) dengan Alibi & Pembelaan,
 * Pelaku Sebenarnya, Bukti Kunci, Motif, Modus Operandi, dan Kata Kunci Evaluasi AI.
 */

const DetectiveCasesData = [
  // =========================================================================
  // KASUS 1
  // =========================================================================
  {
    id: 1,
    title: "Misteri Racun Teh di Villa Puncak",
    category: "Pembunuhan Terencana",
    difficulty: "Mudah",
    victim: "Tuan Hartawan (Konglomerat Farmasi, 65 Tahun)",
    time: "Jumat Malam, Pukul 21.30 WIB",
    location: "Ruang Santai Villa Pinus, Puncak Bogor",
    chronology: `Tuan Hartawan ditemukan tewas terkulai di kursi goyang ruang santai pribadinya dengan mulut berbusa dan cangkir teh poci porselen yang pecah di lantai. 
Hasil autopsi kilat memastikan korban meninggal akibat racun kalium sianida dalam dosis mematikan.

Di atas meja, ditemukan set teh poci earl grey, stoples gula batu khusus diabetes, dan sepiring kue kering almond yang masih utuh. Pintu dan jendela ruang santai tertutup rapat dari dalam karena malam itu udara sangat dingin dan berkabut. Hanya 3 orang yang berada di dalam villa malam itu.`,
    suspects: [
      {
        id: 1,
        name: "Dokter Adrian",
        role: "Dokter Pribadi Korban",
        avatar: "👨‍⚕️",
        profile: "Dokter pribadi Tuan Hartawan selama 8 tahun. Selalu merawat kesehatan dan menyusun menu diet ketat korban.",
        motive: "Terancam dicabut izin praktiknya karena malpraktik investasi klinis yang diketahui Hartawan.",
        defense: `"Saya yang menyeduh teh earl grey untuk Tuan Hartawan pada pukul 20.45. Setelah itu, saya langsung masuk ke kamar tamu untuk membaca jurnal kedokteran hingga mendengar teriakan pelayan. Saya selalu menggunakan air mendidih murni. Jika tehnya beracun dari awal, pasti saya juga terkena saat mencicipi aroma tehnya!"`,
        clueFlaw: "Dokter Adrian mengaku menyeduh teh dan memasukkan gula batu khusus diabetes dari stoples pribadi yang selalu ia bawa."
      },
      {
        id: 2,
        name: "Clara",
        role: "Anak Tiri Korban",
        avatar: "👩‍💼",
        profile: "Anak tiri yang baru saja pulang dari luar negeri dan diketahui terlilit utang judi miliaran rupiah.",
        motive: "Membutuhkan warisan asuransi jiwa Tuan Hartawan untuk melunasi utang rentenir.",
        defense: `"Malam itu saya berada di teras belakang sedang menelepon teman saya dari pukul 21.00 sampai 21.40. Sinyal di sana buruk jadi saya tidak mendengar suara cangkir pecah. Saya memang butuh uang, tapi ayah tiri saya baru berjanji akan membantu melunasi utang saya minggu depan!"`,
        clueFlaw: "Log panggilan telepon Clara menunjukkan durasi panggilan hanya 4 menit, bukan 40 menit."
      },
      {
        id: 3,
        name: "Pak Bambang",
        role: "Pelayan Setia Villa",
        avatar: "👨‍🍳",
        profile: "Pelayan senior yang telah mengabdi selama 20 tahun di keluarga Hartawan.",
        motive: "Keluarganya dijanjikan rumah peristirahatan di villa tersebut jika Tuan Hartawan meninggal.",
        defense: `"Saya hanya mengantarkan cangkir porselen bersih ke meja ruang santai pada pukul 20.30. Setelah itu saya sibuk membersihkan dapur bawah dan mengunci pintu gerbang depan. Tuan Hartawan sudah seperti ayah saya sendiri, tidak mungkin saya melukainya!"`,
        clueFlaw: "Cangkir porselen yang diantarkan Pak Bambang diambil dari lemari kaca yang disaksikan orang lain."
      }
    ],
    realCulprit: "Dokter Adrian",
    trueMotive: "Menghilangkan barang bukti malpraktik klinik ilegal yang hendak dilaporkan Tuan Hartawan ke dewan kedokteran besok pagi.",
    modusOperandi: "Dokter Adrian memasukkan racun sianida ke dalam gula batu khusus diabetes di stoples pribadi. Korban yang memiliki kebiasaan mengulum gula batu sebelum meminum teh langsung menelan dosis fatal racun secara instan.",
    keyEvidence: "Stoples gula batu diabetes milik Dokter Adrian terbukti terkontaminasi residu sianida pada lapisan gula paling atas, sementara cangkir teh dan air teko murni bersih dari racun sebelum gula dimasukkan.",
    keywords: ["adrian", "dokter", "gula", "diabetes", "stoples", "malpraktik", "sianida", "klinik", "pribadi"]
  },

  // =========================================================================
  // KASUS 2
  // =========================================================================
  {
    id: 2,
    title: "Hilangnya Berlian Black Lotus di Museum Kota",
    category: "Pencurian Mahakarya",
    difficulty: "Sedang",
    victim: "Museum Seni Nasional (Kerugian Berlian 50 Miliar)",
    time: "Sabtu Malam, Pukul 23.00 WIB",
    location: "Ruang Kaca Safir, Museum Seni Nasional",
    chronology: `Berlian langka 'Black Lotus' 80 karat yang dipamerkan di lemari kaca anti-peluru museum lenyap saat pemadaman listrik darurat selama 45 detik.
Ketika lampu darurat menyala, kaca lemari display masih utuh terkunci dengan sensor laser aktif, namun berlian di atas bantalan beludru telah lenyap tanpa bekas sidik jari.

Pintu masuk utama dijaga 2 satpam bersenjata dan tidak ada alarm getaran yang terpicu. Kamera CCTV hanya menangkap bayangan gelap sebelum layar mati total.`,
    suspects: [
      {
        id: 1,
        name: "Satria",
        role: "Kepala Keamanan Museum",
        avatar: "👮‍♂️",
        profile: "Mantan perwira polisi yang memegang kode otoritas pembuka kotak saklar genset cadangan.",
        motive: "Gaji dipotong akibat kelalaian inventaris 3 bulan lalu.",
        defense: `"Saat listrik padam, saya langsung berlari ke ruang genset di lantai basement untuk menyalakan saklar manual. Saya berada di basement selama 2 menit penuh bersama teknisi genset!"`,
        clueFlaw: "Kamera koridor basement merekam Satria baru tiba di ruang genset pada detik ke-50 setelah lampu menyala kembali."
      },
      {
        id: 2,
        name: "Maya",
        role: "Restorator Seni & Ahli Permata",
        avatar: "🔬",
        profile: "Pakar permata yang memiliki akses khusus memeriksa keaslian dan membersihkan wadah kaca pameran setiap sore.",
        motive: "Kolektor bayangan luar negeri menawarinya paspor baru dan 3 juta dolar untuk Black Lotus.",
        defense: `"Saya sudah pulang sejak pukul 18.00 sore setelah selesai memoles kaca luar etalase. Tas kerja saya diperiksa ketat oleh satpam di gerbang depan saat keluar!"`,
        clueFlaw: "Di saku jas lab Maya di ruang restorasi ditemukan kantong beludru berisi debu pemotong berlian sintetis zirkonia."
      },
      {
        id: 3,
        name: "Gavin",
        role: "Kolektor Antik Terkenal",
        avatar: "🧐",
        profile: "Tamu VIP pameran yang bersikeras berada di ruang galeri hingga jam penutupan museum.",
        motive: "Pernah kalah dalam lelang akuisisi Black Lotus 5 tahun silam.",
        defense: `"Saya sedang mengagumi lukisan di sayap timur saat lampu mati. Saya langsung diam di tempat mengangkat kedua tangan agar tidak dicurigai satpam!"`,
        clueFlaw: "Gavin ditemukan membawa kacamata penglihatan malam (night vision) di sakunya."
      }
    ],
    realCulprit: "Maya",
    trueMotive: "Menjual berlian Black Lotus ke sindikat pasar gelap internasional demi imbalan 3 juta dolar.",
    modusOperandi: "Maya tidak mencuri berlian saat listrik padam, melainkan telah menukar berlian asli dengan replika zirkonia identik berlapis fluorosens saat pembersihan sore pukul 17.30. Saat pemadaman 45 detik, ia sengaja memicu lampu UV penguji dari saklar lab yang membuat replika tampak memudar lenyap dalam kegelapan.",
    keyEvidence: "Bantalan beludru display memiliki bekas potongan mikro berlian palsu zirkonia buatan Maya, dan berlian asli disembunyikan di dalam gagang hollow kaca pembesar miliknya.",
    keywords: ["maya", "restorator", "zirkon", "tukar", "replika", "palsu", "sore", "kaca pembesar", "permata"]
  },

  // =========================================================================
  // KASUS 3
  // =========================================================================
  {
    id: 3,
    title: "Kematian Sang Maestro di Balik Kamar Terkunci",
    category: "Locked Room Mystery",
    difficulty: "Sulit",
    victim: "Viktor Mahardika (Komposer Biola Legendaris, 58 Tahun)",
    time: "Minggu Dini Hari, Pukul 01.15 WIB",
    location: "Studio Musik Kedap Suara, Rumah Mewah Viktor",
    chronology: `Viktor ditemukan tewas di depan pianonya dengan luka tusuk di dada. Studio musik kedap suara tempat ia ditemukan berada dalam kondisi terkunci rapat dari dalam menggunakan grendel putar baja ganda.
Kunci kuningan satu-satunya ditemukan tersimpan rapi di dalam saku celana jas korban sendiri.

Jendela kaca studio tebal berlapis dua dan terkunci dari dalam dengan kait pengaman utuh. Tidak ada ventilasi manusia kecuali lubang kabel audio berdiameter 4 cm di sudut plafon atas.`,
    suspects: [
      {
        id: 1,
        name: "Elena",
        role: "Murid Utama & Violonis Pendamping",
        avatar: "🎻",
        profile: "Murid berbakat Viktor yang baru saja dikeluarkan dari daftar pertunjukan tur konser Eropa.",
        motive: "Karya partitur simfoni ciptaannya diklaim sepihak atas nama Viktor.",
        defense: `"Saya sedang berlatih biola di kamar lantai 2 sepanjang malam. Suara biola saya bahkan didengar oleh penjaga rumah hingga pukul 01.30!"`,
        clueFlaw: "Di kamar Elena ditemukan pemutar piringan hitam rekaman biolanya sendiri yang disetel mengulang otomatis (looping)."
      },
      {
        id: 2,
        name: "Damian",
        role: "Manajer Promotor Konser",
        avatar: "💼",
        profile: "Pria ambisius yang baru menandatangani klausul klaim asuransi pembatalan konser Viktor senilai miliaran.",
        motive: "Viktor mengancam akan membatalkan tur konser secara sepihak besok pagi.",
        defense: `"Saya berada di ruang makan sedang merevisi kontrak promotor bersama laptop saya. Saya tidak memiliki kunci cadangan studio musik Viktor!"`,
        clueFlaw: "Damian memiliki luka goresan panjang di telapak tangan kanannya yang ditutupi perban."
      },
      {
        id: 3,
        name: "Pak Jono",
        role: "Teknisi Akustik & Piano",
        avatar: "🔧",
        profile: "Teknisi yang baru selesai menyetel senar grand piano Viktor pada sore hari.",
        motive: "Berselisih pembayaran upah reparasi instrumen antik yang tertunda berbulan-bulan.",
        defense: `"Saya sudah pulang pukul 19.00 malam naik bus terakhir. Saya meninggalkan seluruh peralatan kunci pas saya di lemari bengkel luar!"`,
        clueFlaw: "Tiket bus Pak Jono tertanggal pukul 02.15 dini hari, bukan 19.00 malam."
      }
    ],
    realCulprit: "Elena",
    trueMotive: "Membalas dendam atas pencurian hak cipta partitur simfoninya dan menghentikan Viktor mengumumkan karya itu sebagai miliknya di konser Eropa.",
    modusOperandi: "Elena menusuk korban saat Viktor lengah memainkan piano, lalu keluar dan mengunci grendel pintu dari luar menggunakan benang pancing monofilamen kuat dan magnet neodymium tipis yang ditarik melalui lubang kabel audio plafon, lalu menyetel piringan hitam rekaman biolanya sebagai alibi palsu.",
    keyEvidence: "Di tempat sampah kamar Elena ditemukan gulungan benang monofilamen berbekas gesekan logam grendel dan magnet neodymium dengan residu cat pelapis studio Viktor.",
    keywords: ["elena", "biola", "rekaman", "piringan hitam", "benang", "magnet", "partitur", "grendel", "kabel"]
  },

  // =========================================================================
  // KASUS 4
  // =========================================================================
  {
    id: 4,
    title: "Rahasia Resep Kuno Restoran Warisan",
    category: "Keracunan & Persaingan Bisnis",
    difficulty: "Mudah",
    victim: "Chef Harun (Kepala Koki & Pemilik Restoran Bintang 5)",
    time: "Selasa Malam, Pukul 22.00 WIB",
    location: "Dapur Utama Restoran Warisan Rasa",
    chronology: `Chef Harun ditemukan ambruk di dekat meja peracikan bumbu rahasia restoran keluarganya. Di mulutnya tercium aroma rempah tajam bercampur zat beracun alkaloid dari ekstrak jamur langka.
Di atas meja dapur, wajan sup gulai warisan masih mengepul panas dengan sendok icip kayu yang tergeletak di samping korban.`,
    suspects: [
      {
        id: 1,
        name: "Rian",
        role: "Sous Chef (Wakil Koki)",
        avatar: "👨‍🍳",
        profile: "Asisten utama Chef Harun yang berkali-kali ditolak saat meminta izin memegang resep bumbu utama.",
        motive: "Tawaran kontrak restoran waralaba raksasa mensyaratkan Rian menyerahkan resep asli Harun.",
        defense: `"Saya sedang membersihkan lemari pendingin daging di ruang belakang sejak pukul 21.30. Saya selalu memakai sarung tangan karet saat bekerja di dapur!"`,
        clueFlaw: "Di saku apron Rian ditemukan toples kecil bubuk jamur langka bertuliskan bahasa Latin."
      },
      {
        id: 2,
        name: "Nadine",
        role: "Kritikus Kuliner Terkenal",
        avatar: "👩‍💼",
        profile: "Penulis ulasan makanan yang malam itu datang memesan meja khusus mencicipi menu baru.",
        motive: "Pernah dipermalukan Chef Harun di depan publik karena ulasannya yang dinilai tidak kompeten.",
        defense: `"Saya duduk di meja VIP nomor 1 menunggu hidangan penutup dari pukul 21.15 hingga pelayan berteriak dari dapur!"`,
        clueFlaw: "Nadine sempat tertangkap kamera menuju lorong toilet dekat pintu samping dapur pada 21.45."
      },
      {
        id: 3,
        name: "Bayu",
        role: "Saudara Tiri Harun",
        avatar: "🧔",
        profile: "Ahli waris pemilik gedung restoran yang ingin menjual bangunan ke pengembang mall.",
        motive: "Harun menolak keras menjual restoran warisan leluhur mereka.",
        defense: `"Saya sedang menghitung buku kas di ruang kantor lantai 2 dan tidak pernah menyentuh area kompor dapur!"`,
        clueFlaw: "Ada sidik jari Bayu di gagang pintu masuk dapur."
      }
    ],
    realCulprit: "Rian",
    trueMotive: "Ingin menguasai resep bumbu kuno dan menjualnya ke jaringan waralaba internasional demi kekayaan instan.",
    modusOperandi: "Rian mencampurkan ekstrak jamur beracun ke dalam sendok icip kayu khusus yang selalu digunakan Chef Harun saat mencicipi sup di menit-menit akhir sebelum restoran tutup.",
    keyEvidence: "Sendok kayu icip Harun mengandung konsentrasi racun jamur murni pada bagian cekungannya yang cocok dengan toples ekstrak jamur di saku apron Rian.",
    keywords: ["rian", "sous chef", "koki", "sendok", "jamur", "resep", "waralaba", "apron", "icip"]
  },

  // =========================================================================
  // KASUS 5
  // =========================================================================
  {
    id: 5,
    title: "Tragedi Malam Badai di Menara Suar Karang Hitam",
    category: "Sabotase & Pembunuhan",
    difficulty: "Sedang",
    victim: "Pak Saman (Penjaga Menara Suar Senior, 60 Tahun)",
    time: "Rabu Malam Saat Badai Tropis, Pukul 23.45 WIB",
    location: "Puncak Balkon Menara Suar Karang Hitam",
    chronology: `Di tengah badai dahsyat dan angin kencang di pulau terpencil, lampu suar raksasa tiba-tiba padam. Pak Saman ditemukan tewas terjatuh di atas karang tajam di dasar menara suar setinggi 35 meter.
Pagar pengaman balkon besi di puncak menara ditemukan terlepas bautnya dengan bekas sayatan gergaji logam yang rapi.`,
    suspects: [
      {
        id: 1,
        name: "Kapten Ronald",
        role: "Kapten Kapal Nelayan Terdampar",
        avatar: "⚓",
        profile: "Pelaut yang berlindung di dermaga menara suar karena kapalnya mogok sebelum badai tiba.",
        motive: "Muatan kapalnya adalah barang selundupan yang dicurigai oleh Pak Saman.",
        defense: `"Saya tertidur di ruang tamu lantai dasar menara suar sambil menenggak kopi panas sepanjang malam badai!"`,
        clueFlaw: "Sepatu boot Kapten Ronald basah kuyup oleh air hujan asin di bagian sol atas."
      },
      {
        id: 2,
        name: "Arga",
        role: "Asisten Penjaga Suar",
        avatar: "🧑‍🔧",
        profile: "Pemuda yang bertugas mendampingi Pak Saman dan bertanggung jawab atas perawatan generator oli.",
        motive: "Diancam dilaporkan ke dinas perhubungan laut karena menggelapkan pasokan solar suar.",
        defense: `"Saya sedang memperbaiki genset cadangan di bunker bawah tanah saat lampu suar tiba-tiba mati!"`,
        clueFlaw: "Di saku jaket Arga ditemukan kunci pas bernomor seri yang cocok dengan baut pagar balkon yang digergaji."
      },
      {
        id: 3,
        name: "Silvia",
        role: "Ahli Meteorologi Stasiun Cuaca",
        avatar: "👩‍🔬",
        profile: "Peneliti cuaca yang menumpang pos menara suar untuk mencatat data angin badai siklon.",
        motive: "Pernah berselisih paham mengenai data navigasi pelayaran pulau.",
        defense: `"Saya mengunci diri di ruang monitor lantai 3 mencatat kecepatan angin badai sejak pukul 20.00!"`,
        clueFlaw: "Buku catatan anemometer Silvia berhenti tercatat pada pukul 23.30."
      }
    ],
    realCulprit: "Arga",
    trueMotive: "Mencegah Pak Saman melaporkan penggelapan solar subsidi menara suar yang dilakukannya ke kantor dinas esok hari.",
    modusOperandi: "Arga telah menggergaji setengah baut engsel pagar balkon di sore hari dan mematikan lampu suar sengaja di tengah badai agar Pak Saman panik memeriksa balkon dan jatuh saat bersandar pada pagar yang telah disabotase.",
    keyEvidence: "Serpihan serbuk besi gergaji di balkon cocok dengan mata gergaji besi di kotak perkakas pribadi Arga, serta oli pelumas di tangan Arga cocok dengan noda pada saklar lampu yang sengaja dimatikan.",
    keywords: ["arga", "asisten", "pagar", "gergaji", "solar", "baut", "balkon", "genset", "lampu"]
  },

  // =========================================================================
  // KASUS 6
  // =========================================================================
  {
    id: 6,
    title: "Sandiwara Terakhir Sang Aktor Teater Klasik",
    category: "Insiden Panggung Berdarah",
    difficulty: "Sedang",
    victim: "Kevin Pradipta (Aktor Utama Bintang Panggung, 32 Tahun)",
    time: "Kamis Malam, Pukul 20.45 WIB",
    location: "Panggung Utama Teater Grand Kencana",
    chronology: `Saat pementasan drama babak ke-4 adegan duel pistol klasik, Kevin yang memerankan tokoh pahlawan tersungkur bersimbah darah.
Pistol panggung yang seharusnya hanya berisi peluru hampa (blank cartridge) melepaskan peluru tajam berkaliber 9mm yang menembus dada kiri korban tepat di depan 400 penonton.`,
    suspects: [
      {
        id: 1,
        name: "Sutradara Bram",
        role: "Sutradara & Produser Teater",
        avatar: "🎬",
        profile: "Pemimpin produksi teater yang sedang menghadapi krisis keuangan dan utang produksi besar.",
        motive: "Memiliki polis asuransi jiwa pementasan atas nama seluruh aktor utama senilai 5 miliar rupiah.",
        defense: `"Saya duduk di kursi pengarah penonton baris ke-5 dari awal pertunjukan bersama asisten sutradara!"`,
        clueFlaw: "Bram sempat pergi ke ruang ganti panggung 10 menit sebelum babak ke-4 dimulai."
      },
      {
        id: 2,
        name: "Dion",
        role: "Aktor Pengganti (Understudy)",
        avatar: "🎭",
        profile: "Aktor berbakat yang selama 3 tahun selalu menjadi bayang-bayang pengganti Kevin tanpa pernah tampil.",
        motive: "Keluarnya Kevin akan membuka kesempatan emas Dion menjadi pemeran utama di tur internasional.",
        defense: `"Saya berada di ruang rias lantai 2 mengenakan kostum cadangan sepanjang pementasan babak 3 dan 4!"`,
        clueFlaw: "Di saku jas Dion ditemukan kotak peluru hampa kosong yang tertukar dengan kotak peluru tajam 9mm."
      },
      {
        id: 3,
        name: "Siska",
        role: "Manajer Properti & Senjata Panggung",
        avatar: "👩‍🔧",
        profile: "Petugas yang bertanggung jawab penuh atas penyimpanan, pemuatan peluru hampa, dan serah terima senjata panggung.",
        motive: "Pernah menjalin hubungan asmara dengan Kevin yang berakhir dengan perselingkuhan.",
        defense: `"Saya sendiri yang mengisi 3 butir peluru hampa berujung merah ke silinder pistol pada pukul 19.30 sebelum saya serahkan ke meja properti panggung!"`,
        clueFlaw: "Siska mengakui meja properti sempat ditinggal tanpa pengawasan selama 5 menit saat lampu redup babak 3."
      }
    ],
    realCulprit: "Dion",
    trueMotive: "Menyingkirkan Kevin secara permanen agar ia dapat mengambil alih peran utama dalam pementasan tur internasional di Broadway.",
    modusOperandi: "Dion menyelinap ke meja properti sayap panggung saat transisi lampu redup babak ke-3, membuka silinder pistol properti, dan mengganti salah satu peluru hampa dengan peluru tajam 9mm asli yang ujungnya diwarnai cat merah agar tampak seperti peluru hampa.",
    keyEvidence: "Di ruang rias Dion ditemukan kuas kecil dengan sisa cat merah akrilik yang persis sama dengan cat pada selongsong peluru maut 9mm di dalam pistol.",
    keywords: ["dion", "aktor pengganti", "understudy", "peluru", "cat merah", "properti", "ruang rias", "broadway"]
  },

  // =========================================================================
  // KASUS 7
  // =========================================================================
  {
    id: 7,
    title: "Sabotase Laboratorium Farmasi Bio-Genesis",
    category: "Spionase Industri & Pembunuhan",
    difficulty: "Sulit",
    victim: "Dr. Farhan (Kepala Riset Formulasi Vaksin)",
    time: "Senin Malam, Pukul 22.15 WIB",
    location: "Ruang Steril BSL-3, Laboratorium Bio-Genesis",
    chronology: `Dr. Farhan ditemukan tak bernyawa di dalam ruang steril BSL-3 setelah katup gas nitrogen darurat terbuka dan membanjiri ruangan hingga kadar oksigen drop ke 0%.
Sistem komputer pencatat log menunjukkan katup dibuka secara manual dari terminal server utama di luar ruang steril. Harddisk berisi formula paten vaksin senilai ratusan miliar juga hilang dari brankas server.`,
    suspects: [
      {
        id: 1,
        name: "Dr. Lisa",
        role: "Rekan Peneliti Utama",
        avatar: "👩‍⚕️",
        profile: "Ilmuwan ambisius yang kalah bersaing dalam pengajuan nama penemu tunggal paten formula vaksin.",
        motive: "Ingin merevisi dokumen paten agar hanya mencantumkan namanya sebagai penemu tunggal.",
        defense: `"Saya sedang menganalisis sampel darah di ruang kultur lantai 1 dari pukul 21.00 sampai alarm bahaya berbunyi!"`,
        clueFlaw: "Kartu akses pintu lantai 1 Dr. Lisa tidak tercatat digunakan saat jam tersebut."
      },
      {
        id: 2,
        name: "Tomi",
        role: "Teknisi Sistem Pendingin & Gas",
        avatar: "👨‍🔧",
        profile: "Teknisi outsourcing yang memiliki wewenang memelihara sistem pipa nitrogen dan sensor gedung.",
        motive: "Menerima transfer uang mencurigakan dari perusahaan farmasi asing saingan.",
        defense: `"Saya hanya mengecek pipa luar di atap gedung rooftop. Saya tidak tahu menahu kode sandi terminal server Dr. Farhan!"`,
        clueFlaw: "Di tas kerja Tomi ditemukan flashdisk enkripsi berlabel logo Bio-Genesis."
      },
      {
        id: 3,
        name: "Hendro",
        role: "Kepala Keuangan Perusahaan",
        avatar: "💼",
        profile: "Eksekutif yang dilaporkan Dr. Farhan ke dewan komisaris atas dugaan pemalsuan anggaran riset 12 miliar.",
        motive: "Penyelidikan audit besok pagi akan membongkar penggelapan dana riset yang dilakukannya.",
        defense: `"Saya sudah pulang pukul 20.00 malam dan sedang makan malam di restoran bersama keluarga saya!"`,
        clueFlaw: "Rekaman kamera parkir VIP menunjukkan mobil Hendro baru keluar gerbang lab pada pukul 22.30."
      }
    ],
    realCulprit: "Hendro",
    trueMotive: "Melakukan sabotase untuk melenyapkan Dr. Farhan dan dokumen audit keuangan riset sebelum diserahkan ke dewan komisaris besok pagi.",
    modusOperandi: "Hendro menggunakan login curian dari meja Dr. Farhan untuk memicu katup pelepasan gas nitrogen dari terminal server dan mengambil harddisk audit serta formula vaksin untuk dijual ke pihak luar.",
    keyEvidence: "Sidik jari Hendro teridentifikasi pada panel saklar darurat nitrogen dan harddisk formula vaksin ditemukan disembunyikan di dalam bagasi ban cadangan mobilnya.",
    keywords: ["hendro", "keuangan", "nitrogen", "harddisk", "audit", "bagasi", "parkir", "anggaran", "formula"]
  },

  // =========================================================================
  // KASUS 8
  // =========================================================================
  {
    id: 8,
    title: "Surat Wasiat Palsu Sang Tuan Tanah Perkebunan",
    category: "Pemalsuan Dokumen & Racun Lambat",
    difficulty: "Sedang",
    victim: "Kakek Wirya (Pemilik Perkebunan Kopi 500 Hektar, 78 Tahun)",
    time: "Kamis Pagi, Pukul 06.30 WIB",
    location: "Kamar Tidur Utama Rumah Kolonial Perkebunan",
    chronology: `Kakek Wirya ditemukan meninggal tenang di tempat tidurnya. Semula dikira meninggal wajar karena usia tua, namun hasil pemeriksaan dokter forensik menemukan akumulasi racun arsenik dosis rendah selama berbulan-bulan.
Di atas mejanya ditemukan sebuah 'Surat Wasiat Terbaru' tertanggal 15 Agustus 2018 yang menyerahkan 100% hak tanah perkebunan kepada pengacara keluarga, mencoret semua anak cucunya.`,
    suspects: [
      {
        id: 1,
        name: "Notaris Bagas",
        role: "Pengacara Keluarga Wirya",
        avatar: "⚖️",
        profile: "Pengacara yang mengklaim diserahi surat wasiat asli bersegel resmi sejak 2018.",
        motive: "Mewarisi seluruh tanah perkebunan bernilai ratusan miliar rupiah.",
        defense: `"Surat wasiat ini ditandatangani langsung oleh almarhum Kakek Wirya pada 15 Agustus 2018 di hadapan dua saksi notaris lama saya!"`,
        clueFlaw: "Kertas segel surat wasiat memiliki cetakan tanda air produsen pabrik yang baru beroperasi tahun 2023."
      },
      {
        id: 2,
        name: "Indra",
        role: "Cucu Tertua Kakek Wirya",
        avatar: "🧔",
        profile: "Pengusaha muda yang mengalami kebangkrutan pabrik dan menuntut pembagian warisan tanah segera.",
        motive: "Mendapat bagian warisan untuk melunasi utang bank perusahaannya.",
        defense: `"Saya selalu menemani kakek meminum teh herbal setiap sore. Saya tidak tahu apa-apa tentang surat wasiat pengacara itu!"`,
        clueFlaw: "Indra pernah membeli racun arsenik untuk pembasmi hama tikus gudang kopi bulan lalu."
      },
      {
        id: 3,
        name: "Sari",
        role: "Perawat Pribadi",
        avatar: "👩‍⚕️",
        profile: "Perawat yang tinggal di rumah perkebunan dan meracik obat herbal harian Kakek Wirya.",
        motive: "Diberi janji santunan besar oleh salah satu ahli waris.",
        defense: `"Saya hanya memberikan obat resep dokter dan sup hangat setiap pagi pukul 06.00!"`,
        clueFlaw: "Sari memiliki buku tabungan baru dengan setoran tunai 100 juta rupiah dari rekening Bagas."
      }
    ],
    realCulprit: "Notaris Bagas",
    trueMotive: "Merebut hak kepemilikan seluruh tanah perkebunan bernilai ratusan miliar dengan memalsukan dokumen wasiat dan menyuap perawat.",
    modusOperandi: "Notaris Bagas menyuap perawat Sari untuk memasukkan racun arsenik dosis rendah ke dalam teh herbal kakek selama 3 bulan, lalu memalsukan surat wasiat bertanggal mundur 2018 menggunakan kertas dokumen modern berperekat segel palsu.",
    keyEvidence: "Tanda air (watermark) pada kertas surat wasiat bertanggal cetak 2023 membuktikan dokumen itu baru dibuat tahun ini, ditambah catatan transfer 100 juta dari rekening pribadi Bagas ke rekening perawat Sari.",
    keywords: ["bagas", "notaris", "pengacara", "watermark", "tanda air", "arsenik", "wasiat", "sari", "rekening"]
  },

  // =========================================================================
  // KASUS 9
  // =========================================================================
  {
    id: 9,
    title: "Kematian Novelis Kriminal di Ruang Baca Berdebu",
    category: "Racun Kontak & Dendam Royalti",
    difficulty: "Sedang",
    victim: "Arthur Morgan (Penulis Novel Misteri Best-Seller)",
    time: "Jumat Sore, Pukul 17.00 WIB",
    location: "Ruang Perpustakaan Pribadi Lantai 2",
    chronology: `Novelis Arthur ditemukan tersungkur di atas meja kerjanya dengan manuskrip bab terakhir novelnya yang berserakan. Ujung jari telunjuk dan bibir korban membiru pekat akibat keracunan alkaloid nikotin konsentrasi mematikan.
Tidak ada bekas suntikan atau cangkir minuman di sekitarnya. Satu-satunya barang yang baru disentuh korban adalah naskah manuskrip novel terbarunya.`,
    suspects: [
      {
        id: 1,
        name: "Roni",
        role: "Ghostwriter Rahasia",
        avatar: "✍️",
        profile: "Penulis bayangan yang menuliskan 5 novel terlaris Arthur tanpa pernah dicantumkan namanya di sampul buku.",
        motive: "Arthur menolak memberikan 50% royalti dan mengancam akan menghancurkan karir kepenulisannya.",
        defense: `"Saya yang menyerahkan amplop manuskrip bab terakhir ke meja perpustakaan Arthur pukul 15.00, lalu saya langsung pulang!"`,
        clueFlaw: "Roni mengenakan sarung tangan kulit tipis saat cuaca sore hari sangat gerah dan panas."
      },
      {
        id: 2,
        name: "Bella",
        role: "Editor Utama Penerbit",
        avatar: "👩‍💼",
        profile: "Editor yang mendesak naskah diselesaikan hari ini karena tenggat cetak percetakan nasional.",
        motive: "Penundaan naskah Arthur akan membuat penerbitnya rugi denda miliaran rupiah.",
        defense: `"Saya sedang menunggu di ruang tamu lantai 1 sambil memeriksa proofread naskah buku lain!"`,
        clueFlaw: "Bella membawa botol cairan pelarut tinta kimia di tas kerjanya."
      },
      {
        id: 3,
        name: "Taufik",
        role: "Novelis Saingan",
        avatar: "🧔",
        profile: "Penulis saingan yang bukunya selalu kalah peringkat dari karya Arthur di toko buku.",
        motive: "Kematian Arthur akan memuluskan novelnya memuncaki nominasi penghargaan sastra nasional.",
        defense: `"Saya sedang menghadiri temu pembaca di toko buku kota seberang sejak pukul 14.00!"`,
        clueFlaw: "Alibi temu pembaca Taufik didukung oleh foto media massa."
      }
    ],
    realCulprit: "Roni",
    trueMotive: "Membalas dendam atas perbudakan karya tulisnya selama bertahun-tahun dan mengambil alih hak cipta novel sebelum diterbitkan.",
    modusOperandi: "Roni memanfaatkan kebiasaan unik Arthur yang selalu menjilat ujung jari telunjuknya setiap membalik halaman kertas manuskrip. Roni mengoleskan ekstrak racun nikotin berkonsentrasi tinggi pada sudut kanan bawah lembar manuskrip bab terakhir.",
    keyEvidence: "Di tempat sampah mobil Roni ditemukan botol cairan ekstrak nikotin cair murni dan sarung tangan kulit yang mengandung jejak racun kontak yang sama pada kertas manuskrip.",
    keywords: ["roni", "ghostwriter", "nikotin", "jilat", "halaman", "manuskrip", "sarung tangan", "royalti"]
  },

  // =========================================================================
  // KASUS 10
  // =========================================================================
  {
    id: 10,
    title: "Pencurian Jam Saku Antik Kerajaan Abad ke-18",
    category: "Pencurian Brilian",
    difficulty: "Mudah",
    victim: "Balai Lelang Antik Batavia (Kerugian Jam Saku Emas 15 Miliar)",
    time: "Sabtu Malam, Pukul 21.00 WIB",
    location: "Panggung Utama Balai Lelang Batavia",
    chronology: `Jam saku emas bertatahkan batu rubi peninggalan raja abad ke-18 lenyap saat prosesi pembukaan lelang.
Saat juru lelang mengangkat kotak kaca beludru, jam saku tersebut telah raib dan digantikan oleh replika logam kuningan murah dengan bobot yang hampir sama.
Etalase panggung dikelilingi pagar sensor laser 360 derajat yang tidak pernah terputus.`,
    suspects: [
      {
        id: 1,
        name: "Valerie",
        role: "Juru Lelang Utama",
        avatar: "👩‍💼",
        profile: "Wanita elegan yang memegang kendali panggung dan satu-satunya yang membawa kotak display ke podium.",
        motive: "Keluarganya di ambang kebangkrutan akibat spekulasi saham properti yang anjlok.",
        defense: `"Saya hanya mengambil kotak display dari brankas panitia pada pukul 20.45 dan langsung membawanya ke atas podium di depan mata semua tamu!"`,
        clueFlaw: "Gaun malam Valerie memiliki saku tersembunyi berlapisan timbal tebal di bagian pinggang."
      },
      {
        id: 2,
        name: "Kevin",
        role: "Kolektor Konglomerat",
        avatar: "🧐",
        profile: "Tamu VIP baris terdepan yang sangat terobsesi memiliki jam saku tersebut.",
        motive: "Pernah bersumpah akan mendapatkan jam saku itu dengan cara apa pun.",
        defense: `"Saya duduk di kursi nomor 1 tidak pernah beranjak dari tempat duduk saya sejak lelang dibuka!"`,
        clueFlaw: "Kevin membawa tongkat jalan berkepala magnetik."
      },
      {
        id: 3,
        name: "Rudy",
        role: "Petugas Pembersih Panggung",
        avatar: "🧹",
        profile: "Petugas kebersihan yang menyedot debu karpet merah podium 10 menit sebelum lelang dimulai.",
        motive: "Membutuhkan biaya operasi rumah sakit keluarganya.",
        defense: `"Saya hanya menyedot debu karpet podium dan langsung keluar ke ruang belakang!"`,
        clueFlaw: "Mesin vacuum cleaner Rudy hanya berisi debu karpet biasa tanpa benda logam."
      }
    ],
    realCulprit: "Valerie",
    trueMotive: "Mencuri jam saku antik kerajaan untuk dijual ke penadah luar negeri demi menyelamatkan aset keluarganya dari kebangkrutan.",
    modusOperandi: "Valerie telah menukar jam saku asli dengan replika kuningan saat mengambil kotak di ruang brankas, lalu menyelipkan jam saku asli ke dalam saku gaunnya yang dilapisi timbal agar tidak memicu pemindai logam di pintu keluar.",
    keyEvidence: "Jam saku emas asli ditemukan terbungkus kain sutra di dalam saku berpelindung timbal pada gaun malam Valerie yang disembunyikan di loker ruang riasnya.",
    keywords: ["valerie", "juru lelang", "timbal", "gaun", "replika", "kuningan", "podium", "brankas"]
  },

  // =========================================================================
  // KASUS 11
  // =========================================================================
  {
    id: 11,
    title: "Konspirasi Pembunuhan di Kereta Malam Ekspres",
    category: "Misteri Gerbong Tertutup",
    difficulty: "Sulit",
    victim: "Diplomat Edward Vance (52 Tahun)",
    time: "Senin Dini Hari Saat Melintasi Terowongan Gunung, Pukul 02.15 WIB",
    location: "Kompartemen 1A Gerbong Eksekutif Kereta Nusantara Ekspres",
    chronology: `Saat kereta melaju kencang di tengah terowongan pegunungan gelap gulita selama 3 menit, terdengar suara erangan dari Kompartemen 1A.
Diplomat Edward ditemukan tewas dengan jeratan kawat tipis di lehernya. Pintu kompartemen terkunci dari dalam dan jendela kaca tertutup rapat dari terpaan angin luar terowongan.`,
    suspects: [
      {
        id: 1,
        name: "Konduktur Fajar",
        role: "Kepala Konduktur Kereta",
        avatar: "👮‍♂️",
        profile: "Satu-satunya petugas yang memegang kunci master serbaguna seluruh kompartemen gerbong eksekutif.",
        motive: "Pernah dipecat dari dinas perkeretaapian sebelumnya akibat laporan diplomatik Edward.",
        defense: `"Saat melintasi terowongan, saya berada di pantry gerbong 2 sedang menyeduh kopi bersama pramusaji!"`,
        clueFlaw: "Pramusaji mengaku konduktur sempat pamit ke toilet gerbong 1 selama 4 menit."
      },
      {
        id: 2,
        name: "Baron Leo",
        role: "Penumpang Kompartemen 1B (Sebelah Korban)",
        avatar: "🎩",
        profile: "Pria misterius asal Eropa Timur yang memesan kompartemen tepat bersebelahan dengan korban.",
        motive: "Membawa misi agen spionase untuk merebut flashdisk dokumen perjanjian perbatasan wilayah.",
        defense: `"Saya tertidur pulas mengenakan earplug penutup telinga sepanjang perjalanan malam!"`,
        clueFlaw: "Di ventilasi AC penghubung antara kompartemen 1A dan 1B ditemukan serat benang wol dari jas mahal Baron Leo."
      },
      {
        id: 3,
        name: "Dr. Vania",
        role: "Dokter Penumpang Kompartemen 1C",
        avatar: "👩‍⚕️",
        profile: "Dokter yang pertama kali dimintai tolong memeriksa denyut nadi korban.",
        motive: "Dugaan perseteruan lisensi penelitian medis internasional.",
        defense: `"Saya langsung terbangun saat mendengar jeritan dan bergegas memeriksa kondisi korban bersama konduktur!"`,
        clueFlaw: "Dr. Vania membawa stetoskop dan tas medis standar tanpa benda mencurigakan."
      }
    ],
    realCulprit: "Baron Leo",
    trueMotive: "Merebut dokumen rahasia negara yang disimpan Diplomat Edward sebelum diserahkan ke kedutaan besar besok pagi.",
    modusOperandi: "Baron Leo membongkar kisi ventilasi AC bersama yang menghubungkan kompartemen 1A dan 1B, lalu menggunakan kawat jerat lentur berkait untuk menjerat leher korban dari atas saat kereta melintas dalam kegelapan bising terowongan.",
    keyEvidence: "Di dalam koper Baron Leo ditemukan kawat jerat piano fleksibel dengan noda darah mikroskopis korban dan kisi ventilasi AC kompartemen 1B memiliki bekas congkelan obeng presisi miliknya.",
    keywords: ["baron leo", "ventilasi", "kawat", "kompartemen", "terowongan", "spionase", "dokumen", "earplug"]
  },

  // =========================================================================
  // KASUS 12
  // =========================================================================
  {
    id: 12,
    title: "Teror di Balik Pameran Lukisan Renaisans",
    category: "Vandalisme & Sabotase Seni",
    difficulty: "Mudah",
    victim: "Galeri Seni Merdeka (Lukisan Bersejarah Rusak Disiram Asam)",
    time: "Minggu Siang Saat Hujan Deras, Pukul 14.15 WIB",
    location: "Ruang Pameran Utama Galeri Seni Merdeka",
    chronology: `Sebuah lukisan mahakarya senilai puluhan miliar rupiah dirusak dengan siraman cairan asam korosif pekat saat jam ramai pengunjung pameran.
Seluruh pengunjung telah melalui pintu detektor cairan dan pemindai tas saat memasuki galeri seni. Cairan asam tersebut merusak kanvas hingga melepuh dalam hitungan detik.`,
    suspects: [
      {
        id: 1,
        name: "Felix",
        role: "Kritikus Seni Kontroversial",
        avatar: "🧐",
        profile: "Kritikus yang secara terbuka menulis artikel mengecam pameran lukisan tersebut sebagai pameran palsu.",
        motive: "Membuktikan teorinya bahwa lukisan tersebut tidak layak dipamerkan di museum nasional.",
        defense: `"Saya sedang memotret lukisan lanskap di sisi utara bersama rombongan wartawan saat insiden terjadi!"`,
        clueFlaw: "Felix membawa kamera profesional tanpa cairan apa pun."
      },
      {
        id: 2,
        name: "Mira",
        role: "Kurator Galeri Saingan",
        avatar: "👩‍🎨",
        profile: "Pemilik galeri swasta yang pamerannya sepi pengunjung akibat tersaingi oleh pameran galeri Merdeka.",
        motive: "Menghancurkan reputasi keamanan galeri Merdeka dan mengalihkan sponsor ke galerinya.",
        defense: `"Saya masuk membawa payung basah lipat dan menitipkannya di loker penitipan depan!"`,
        clueFlaw: "Gagang tabung payung lipat Mira terbuat dari kaca polimer anti-asam dengan lubang semprotan nozzle tersembunyi."
      },
      {
        id: 3,
        name: "Agus",
        role: "Petugas Keamanan Galeri",
        avatar: "👮‍♂️",
        profile: "Satpam yang berjaga di dekat tali pembatas lukisan mahakarya.",
        motive: "Pernah diancam PHK karena sering tertidur saat jam tugas jaga.",
        defense: `"Saya berdiri mengawasi pengunjung dari jarak 2 meter dan tiba-tiba melihat kepulan asap di kanvas lukisan!"`,
        clueFlaw: "Agus tidak menyadari siapa yang melintas di dekat tali pembatas karena terdistraksi payung basah."
      }
    ],
    realCulprit: "Mira",
    trueMotive: "Menghancurkan lukisan mahakarya galeri pesaing demi menggagalkan kontrak sponsor internasional mereka.",
    modusOperandi: "Mira memodifikasi gagang payung lipatnya menjadi tabung semprotan bertekanan berisi cairan asam sulfat pekat yang lolos pemeriksaan gerbang karena disamarkan sebagai payung basah hujan, lalu menyemprotkannya ke kanvas saat berjalan mendekati lukisan.",
    keyEvidence: "Di dalam tabung gagang payung lipat milik Mira ditemukan residu cairan asam sulfat konsentrat tinggi dan mekanisme pompa semprot mini bertekanan.",
    keywords: ["mira", "payung", "asam", "sulfat", "gagang", "kurator", "semprot", "kanvas", "galeri"]
  },

  // =========================================================================
  // KASUS 13
  // =========================================================================
  {
    id: 13,
    title: "Jatuhnya Sang Juara Catur di Babak Final",
    category: "Racun Saraf Kontak & Turnamen",
    difficulty: "Sedang",
    victim: "Grandmaster Surya (Juara Bertahan Catur Internasional)",
    time: "Selasa Sore, Langkah ke-35 Babak Final, Pukul 16.30 WIB",
    location: "Panggung Utama Turnamen Catur Grandmaster",
    chronology: `Di tengah pertandingan final catur yang menegangkan dan disiarkan langsung di televisi, Grandmaster Surya tiba-tiba mengalami kejang otot tangan hebat, sesak napas, dan kolaps tak sadarkan diri di atas papan catur.
Pemeriksaan medis darurat membuktikan Surya terpapar racun neurotoksin kontak kulit (nerve agent) yang menyerap melalui pori-pori ujung jari tangannya.`,
    suspects: [
      {
        id: 1,
        name: "GM Alex",
        role: "Lawan Tanding di Final",
        avatar: "♟️",
        profile: "Pecatur tangguh asal Rusia yang selalu menjadi runner-up di bawah bayang-bayang kehebatan Surya.",
        motive: "Mengincar hadiah utama 2 miliar rupiah dan gelar Grandmaster Tertinggi Dunia.",
        defense: `"Saya bermain menggunakan bidak hitam dan tidak pernah menyentuh bidak putih milik Surya sepanjang pertandingan!"`,
        clueFlaw: "Alex memakai perban tipis di jari jempolnya."
      },
      {
        id: 2,
        name: "Pelatih Dimas",
        role: "Pelatih Pribadi Surya",
        avatar: "👨‍💼",
        profile: "Pelatih yang menyiapkan botol air minum dan handuk muka Surya di samping meja pertandingan.",
        motive: "Ditolak bagi hasil kontrak sponsor eksklusif Surya yang bernilai fantastis.",
        defense: `"Saya hanya membawakan botol air mineral bersegel dan handuk bersih dari ruang tunggu atlet!"`,
        clueFlaw: "Botol air dan handuk Surya diperiksa laboratorium dan terbukti 100% steril murni."
      },
      {
        id: 3,
        name: "Wasit Erick",
        role: "Wasit Utama Federasi Catur",
        avatar: "👔",
        profile: "Wasit senior yang memeriksa seluruh set bidak catur di ruang isolasi sebelum pertandingan dimulai.",
        motive: "Terlibat sindikat judi taruhan catur gelap internasional yang bertaruh puluhan miliar atas kekalahan Surya.",
        defense: `"Saya memeriksa kelayakan papan dan 32 bidak catur dengan sarung tangan kain putih resmi federasi!"`,
        clueFlaw: "Di saku jas wasit Erick ditemukan botol pipet tetes berlabel zat kimia pelarut neurotoksin."
      }
    ],
    realCulprit: "Wasit Erick",
    trueMotive: "Memenangkan taruhan judi gelap internasional bernilai puluhan miliar dengan memastikan Grandmaster Surya tumbang di babak final.",
    modusOperandi: "Wasit Erick mengoleskan zat neurotoksin transdermal bening tak berbau pada kepala bidak Menteri Putih (Queen) saat proses inspeksi bidak di ruang isolasi. Karena Surya dikenal memiliki kebiasaan memutar-mutar bidak Menteri Putih saat berpikir di langkah ke-30 ke atas, racun terserap sempurna ke pembuluh darah jarinya.",
    keyEvidence: "Bidak Menteri Putih di papan catur terbukti dilapisi zat neurotoksin aktif, dan pipet tetes di saku jas wasit Erick mengandung formula kimia senyawa racun yang identik.",
    keywords: ["erick", "wasit", "menteri", "queen", "bidak", "catur", "neurotoksin", "pipet", "judi"]
  },

  // =========================================================================
  // KASUS 14
  // =========================================================================
  {
    id: 14,
    title: "Pembunuhan di Kamar Gelap Studio Foto Antik",
    category: "Reaksi Gas Beracun",
    difficulty: "Sedang",
    victim: "Gunawan (Fotografer Senior & Kolektor Klise Foto)",
    time: "Rabu Malam, Pukul 20.00 WIB",
    location: "Kamar Gelap Cuci Cetak Foto Studio Antik",
    chronology: `Gunawan ditemukan tewas terkulai di atas bak pencucian klise foto di dalam kamar gelap kedap udara. Ruangan dipenuhi bau gas asam sianida (HCN) menyengat yang dihasilkan dari percampuran kimia mematikan.
Di atas meja cuci foto, terdapat bak cairan pengembang (developer), bak penghenti (stop bath), dan botol reagen misterius yang tutupnya terbuka.`,
    suspects: [
      {
        id: 1,
        name: "Andre",
        role: "Asisten Fotografer",
        avatar: "📷",
        profile: "Murid magang yang sering dimarahi dan dipaksa bekerja lembur tanpa upah layak.",
        motive: "Ingin mengambil alih kepemilikan studio foto antik dan arsip klise foto bersejarah.",
        defense: `"Saya sedang melayani pelanggan cetak pasfoto kilat di meja kasir depan sejak pukul 19.00 sampai lampu studio berkedip!"`,
        clueFlaw: "Resi pelanggan kasir terakhir menunjukkan waktu pukul 19.15, meninggalkan kekosongan waktu 45 menit."
      },
      {
        id: 2,
        name: "Cantika",
        role: "Model Foto Terkenal",
        avatar: "💃",
        profile: "Model yang fotonya diambil tanpa izin dan diancam akan disebarluaskan oleh Gunawan.",
        motive: "Menghancurkan klise foto rahasia sebelum bocor ke media gosip.",
        defense: `"Saya datang pukul 19.30 untuk meminta klise foto saya di ruang tamu, lalu pulang saat Gunawan menolak bicara!"`,
        clueFlaw: "Cantika tidak memiliki pengetahuan reaksi pencampuran kimia cuci cetak kamar gelap."
      },
      {
        id: 3,
        name: "Pak Kusno",
        role: "Pemasok Bahan Kimia Foto",
        avatar: "🧪",
        profile: "Pemasok cairan asam asetat dan natrium tiosulfat untuk studio Gunawan.",
        motive: "Pernah dituntut ganti rugi karena pasokan bahan kimia yang kedaluwarsa.",
        defense: `"Saya mengantarkan 3 jerigen cairan kimia pukul 16.00 sore dan langsung kembali ke gudang saya!"`,
        clueFlaw: "Surat jalan pengiriman Pak Kusno lengkap dan ditandatangani Gunawan pukul 16.00."
      }
    ],
    realCulprit: "Andre",
    trueMotive: "Membunuh Gunawan untuk merebut studio foto antik dan menghapus catatan utang piutang perjanjian kerja paksanya.",
    modusOperandi: "Andre mencampurkan larutan kalium sianida ke dalam bak asam penghenti (stop bath asam asetat) yang ketika bereaksi di ruang gelap tertutup menghasilkan gas mematikan asam hidrosianat (HCN) saat Gunawan menyalakan lampu merah safir dan mengaduk cairan klise.",
    keyEvidence: "Di loker pribadi Andre ditemukan botol sisa serbuk kalium sianida dan sarung tangan respirator kimia yang terdapat noda asam asetat kamar gelap.",
    keywords: ["andre", "asisten", "kamar gelap", "cuci cetak", "gas", "asam asetat", "sianida", "stop bath", "klise"]
  },

  // =========================================================================
  // KASUS 15
  // =========================================================================
  {
    id: 15,
    title: "Misteri Bobolnya Brankas Baja Bank Kolonial",
    category: "Pencurian Brankas Mastermind",
    difficulty: "Sulit",
    victim: "Bank Sentral Kolonial (Kehilangan Emas Batangan 100 Miliar)",
    time: "Minggu Malam Libur Panjang, Pukul 00.30 WIB",
    location: "Ruang Khazanah Bawah Tanah Bank Sentral Kolonial",
    chronology: `Pintu baja khazanah berbobot 15 ton dibobol tanpa bekas las, dinamit, atau kerusakan fisik pada sistem gerigi kuncinya. Emas batangan senilai 100 miliar raib dari dalam brankas.
Sistem pembuka brankas mensyaratkan 2 nomor kombinasi berbeda: Nomor Kombinasi A yang hanya dihafal Kepala Cabang, dan Kunci Fisik Master B ganda yang dipegang Manajer Brankas.`,
    suspects: [
      {
        id: 1,
        name: "Darmawan",
        role: "Kepala Cabang Bank",
        avatar: "👔",
        profile: "Pimpinan tertinggi cabang bank yang memegang nomor kombinasi rahasia A dan memiliki izin akses lembur.",
        motive: "Investasi kripto dan properti rahasianya di luar negeri bangkrut dan terancam disita bank sentral.",
        defense: `"Sepanjang akhir pekan saya bermain golf di luar kota bersama asosiasi bankir. Saya tidak memegang kunci fisik master B!"`,
        clueFlaw: "Kamera tol luar kota merekam mobil Darmawan kembali ke kota pada pukul 23.30 Minggu malam."
      },
      {
        id: 2,
        name: "Rendy",
        role: "Manajer Brankas Khazanah",
        avatar: "👨‍💼",
        profile: "Pejabat yang menyimpan kunci fisik master ganda di brankas kecil kantornya.",
        motive: "Keluarganya diancam oleh sindikat perampok profesional jika menolak bekerja sama.",
        defense: `"Kunci master B selalu tersimpan di brankas kantor saya yang bersandi ganda dan kuncinya tidak pernah lepas dari leher saya!"`,
        clueFlaw: "Kunci fisik master B milik Rendy tidak menunjukkan bekas duplikasi lilin."
      },
      {
        id: 3,
        name: "Tedi",
        role: "Ahli Sensor & Kamera Pengawas",
        avatar: "💻",
        profile: "Spesialis keamanan TI yang memasang kamera pengawas dan sensor inframerah ruang khazanah.",
        motive: "Memiliki keahlian meretas jaringan CCTV dan mematikan rekaman secara presisi.",
        defense: `"Saya sedang memantau sistem dari ruang kendali server lantai 2 dan melihat rekaman brankas dalam kondisi tenang!"`,
        clueFlaw: "Tedi hanya mengulang rekaman video CCTV (looping) selama 30 menit."
      }
    ],
    realCulprit: "Darmawan",
    trueMotive: "Menyelamatkan dirinya dari kebangkrutan pribadi dengan mencuri emas batangan bank menggunakan kewenangan tertingginya dan menyamar.",
    modusOperandi: "Darmawan diam-diam memasang kamera mikro tersembunyi di lampu gantung ruang kerja Rendy untuk mengintip nomor sandi brankas kecil penyimpanan kunci fisik B. Pada malam libur, ia kembali dari luar kota, membuka brankas dengan sandi A miliknya dan kunci master B curian, lalu membayar Tedi untuk membuat looping video CCTV.",
    keyEvidence: "Di dalam mobil dinas Darmawan ditemukan kamera pengintai mikro nirkabel yang terhubung ke rekaman ruang kantor Rendy, serta cetakan kuitansi sewa gudang penyimpanan kontainer tempat emas batangan disembunyikan.",
    keywords: ["darmawan", "kepala cabang", "kombinasi", "brankas", "kamera mikro", "emas", "gudang", "kunci master", "tol"]
  }
];
