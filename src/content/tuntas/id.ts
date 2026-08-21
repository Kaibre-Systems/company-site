import type { TuntasContent } from "./types";
import { EN_PATH } from "./locale";
import { SCREENS } from "./screens";

/**
 * Tuntas — Bahasa Indonesia.
 *
 * Not a translation of `en.ts`: Bahasa is the buyer's language, and this page
 * is the one the compliance officer actually reads. The vocabulary is the
 * product's own, taken from `apps/regulatory-web/src/lib/terminology.ts` in
 * the product repository so a visitor meets the same words here and on the
 * screen — kewajiban, tenggat, "Sudah dipenuhi", "Belum dipenuhi",
 * "Terpenuhi sebagian", "Belum dapat dinilai", "Tidak berlaku", "Perlu
 * tindakan dari Anda", "Perlu dokumen dari Anda", "Memo Direksi".
 *
 * The same claim discipline as the English dictionary applies, with one
 * addition that only exists in this language: never "patuh" or "sudah patuh"
 * as an outcome Tuntas confers. Tuntas menyimpulkan menurut dokumen; petugas
 * kepatuhan yang memutuskan.
 */
export const ID: TuntasContent = {
  locale: "id",
  meta: {
    title: "Tuntas — perubahan regulasi, kewajiban demi kewajiban",
    description:
      "Regulasi baru terbit. Tuntas memetakan apa yang berubah terhadap dokumen perusahaan Anda dan menyatakan apa yang harus dilakukan — kewajiban demi kewajiban, dengan setiap kesimpulan menunjuk pasal dan dokumen sumbernya.",
    ogLocale: "id_ID",
  },
  chrome: {
    skip: "Lompat ke konten",
    home: "Tuntas — beranda",
    kaibreHome: "Kaibre",
    tagline: "Perubahan regulasi",
    marketLabel: "Indonesia",
    toggle: { navLabel: "Bahasa", en: "English", id: "Bahasa Indonesia" },
    cta: { label: "Lihat contoh lengkapnya", href: "#contact" },
  },
  hero: {
    headline: "Regulasi baru terbit. Tuntas menghitung apa yang berubah di perusahaan Anda.",
    body: "Untuk Kepatuhan dan Hukum di lembaga jasa keuangan Indonesia. Sebutkan regulasinya, unggah dokumen yang ada, dan Tuntas mengembalikan analisis kesenjangannya kewajiban demi kewajiban — setiap kesimpulan menunjuk pasal dan dokumen yang mendasarinya.",
    cta: { label: "Lihat contoh lengkapnya", href: "#contact" },
    secondary: { label: "Bagaimana cara kerjanya", href: "#workflow" },
    note: "Tuntas adalah alat bantu analisis, bukan nasihat hukum.",
    panelNote: "Perusahaan fiktif, regulasi asli.",
  },
  screens: {
    regulation: { ...SCREENS.regulation, alt: "Layar pembuka satu perkara di Tuntas: POJK 40 Tahun 2024 diterima dari OJK pada 14 Agustus 2026, menggantikan POJK 10/POJK.05/2022, dianalisis terhadap 18 dokumen perusahaan fiktif. Tercatat 49 kewajiban yang belum ditinjau, 4 tenggat yang sudah lewat, dan tenggat berikutnya pada 10 September 2026." },
    obligation: { ...SCREENS.obligation, alt: "Panel rincian satu kewajiban di Tuntas: kewajiban nomor 4 dari POJK 40 Tahun 2024 mewajibkan Penyelenggara memastikan anggota Direksi dan anggota Dewan Komisaris memiliki sertifikat kompetensi kerja. Tuntas menyimpulkan kewajiban ini belum dipenuhi, menyebut dokumen perusahaan yang menjadi dasarnya, menuliskan yang perlu dilakukan perusahaan, dan menyatakan tenggatnya. Perusahaannya fiktif; regulasinya asli." },
    register: { ...SCREENS.register, alt: "Register kewajiban di Tuntas: tiga kewajiban dari BAB VI POJK 40 Tahun 2024, masing-masing dengan nomor, rumusan kewajibannya, pasalnya, dan satu keterangan tindakan — dua bertanda perlu tindakan dari Anda, satu bertanda tidak berlaku." },
    memo: { ...SCREENS.memo, alt: "Memorandum yang disusun Tuntas untuk Direksi dan Dewan Komisaris perusahaan fiktif, tertanggal 14 Agustus 2026, mengenai dampak POJK 40 Tahun 2024 yang mencabut POJK 10/POJK.05/2022." },
  },
  problem: {
    heading: "Pekerjaan yang sudah Anda kenal.",
    body: [
      "Satu POJK baru bisa memuat dua ratus pasal atau lebih. Seseorang harus menetapkan apa yang berubah, apa artinya bagi perusahaan ini, SOP, kebijakan, perjanjian, dan syarat mana yang harus diperbarui, siapa yang memperbaruinya, dan kapan tenggatnya.",
      "Semua dikerjakan manual, di sela pekerjaan harian, oleh orang yang akan ditanya jika ada yang terlewat. Lalu dikerjakan sekali lagi: unit merevisi dokumennya, dan setiap revisi harus dibaca ulang terhadap pasal yang seharusnya dipenuhinya.",
    ],
    facts: [
      {
        title: "Pemeriksa membaca dokumennya.",
        note: "SOP dibandingkan dengan regulasi, lalu praktik dibandingkan dengan SOP. Setiap selisih di antaranya dicatat sebagai temuan.",
      },
      {
        title: "Temuan membawa konsekuensi.",
        note: "Sanksi administratif, biaya reputasi, pembatasan kegiatan usaha — dan catatan pengawasan yang harus dijawab Dewan Komisaris.",
      },
      {
        title: "Tenggat tidak menunggu kapasitas.",
        note: "Regulasi yang menetapkan tanggalnya. Pekerjaan harian mengambil minggu-minggu di antaranya, dan pekerjaan ini muncul saat waktunya tinggal sebulan.",
      },
    ],
  },
  inOut: {
    heading: "Sekarang serahkan kepada Tuntas.",
    reads: {
      title: "Yang Anda berikan kepada Tuntas",
      items: [
        {
          icon: "corpus",
          label: "Regulasi yang Anda sebutkan",
          note: "hanya itu — Tuntas sendiri yang mencari peraturan yang digantikannya beserta catatan sumber resmi keduanya",
        },
        { icon: "policy", label: "SOP, kebijakan, dan prosedur internal Anda" },
        { icon: "evidence", label: "Perjanjian, syarat dan ketentuan, dokumen produk, bukti" },
        {
          icon: "history",
          label: "Apa pun yang sudah ada hari ini",
          note: "yang belum ada menjadi permintaan dokumen, bukan penghalang",
        },
      ],
    },
    produces: {
      title: "Yang dikembalikan Tuntas",
      items: [
        {
          icon: "assessment",
          label: "Setiap kewajiban regulasi baru, bersanding dengan ketentuan yang digantikannya",
        },
        {
          icon: "map",
          label: "Analisis kesenjangan: sudah dipenuhi, belum dipenuhi, terpenuhi sebagian, atau belum dapat dinilai — masing-masing beserta alasannya",
        },
        {
          icon: "gap",
          label: "Permintaan dokumen yang menyebut namanya bila buktinya tidak ada",
        },
        {
          icon: "severity",
          label: "Pertentangan antar dokumen Anda sendiri, dengan kedua sumbernya",
        },
        {
          icon: "remediation",
          label: "Perubahan spesifik, pada dokumen spesifik, dengan penanggung jawabnya",
        },
        {
          icon: "draft",
          label: "Draf revisinya sendiri untuk Anda telaah — teks lama, teks baru, dan pasal yang mendasarinya",
        },
        {
          icon: "report",
          label: "Tenggat, yang sudah lewat lebih dulu — dan Memo Direksi yang dapat Anda sunting dan kirim",
        },
      ],
    },
  },
  workflow: {
    heading: "Satu regulasi, dari terbit sampai tuntas.",
    stages: [
      {
        n: "01",
        icon: "ground",
        title: "Sebutkan regulasinya",
        body: "Tuntas menyebutkan dokumen yang diperkirakan diperlukan. Unggah yang ada.",
      },
      {
        n: "02",
        icon: "assess",
        title: "Tuntas menganalisis",
        body: "Register kewajiban, Memo Direksi, permintaan dokumen, tindakan, dan tenggatnya.",
      },
      {
        n: "03",
        icon: "review",
        title: "Tim Anda menelaah",
        body: "Setujui, sunting kalimatnya, atau kembalikan. Serahkan dokumen yang diminta dan kewajiban terkait dianalisis ulang.",
      },
      {
        n: "04",
        icon: "remediation",
        title: "Perbaiki dokumennya",
        body: "Unit Anda merevisi, atau Tuntas yang menyusun drafnya. Keduanya tetap diperiksa butir demi butir terhadap pasal yang seharusnya dipenuhinya.",
      },
      {
        n: "05",
        icon: "conclude",
        title: "Selesaikan",
        body: "Apa yang tersisa, siapa yang bertindak berikutnya, dan kapan. Penyelesaian mencatat posisinya, termasuk butir yang masih terbuka.",
      },
    ],
  },
  trace: {
    heading: "Tidak ada kesimpulan tanpa pasal dan dokumennya.",
    body: "Setiap kesimpulan tetap terhubung pada ketentuan yang mendasarinya, dokumen perusahaan tempat ia dibaca, dan penelaah yang menerimanya. Bila dokumen tidak menjawab, Tuntas mengatakannya dan meminta — ia tidak menebak, dan ia tidak memihak di antara dua dokumen Anda sendiri.",
    labelsHeading: "Lima kesimpulan, tidak ada yang keenam.",
    labels: [
      {
        code: "SUDAH DIPENUHI",
        note: "Dokumen menunjukkan bagaimana kewajiban itu dipenuhi, dan menyebut di mana.",
      },
      {
        code: "BELUM DIPENUHI",
        note: "Dokumen menunjukkan kewajiban itu belum dipenuhi. Perubahan dan dokumennya disebutkan setelahnya.",
      },
      {
        code: "TERPENUHI SEBAGIAN",
        note: "Sebagian terbukti; sisanya belum, dan dibawa sebagai butir terbuka.",
      },
      {
        code: "BELUM DAPAT DINILAI",
        note: "Buktinya tidak ada pada dokumen yang diserahkan. Tuntas meminta dokumen yang diperlukannya, dengan menyebut namanya, dan menyatakan alasannya. Ini bukan kesimpulan bahwa perusahaan melanggar.",
      },
      {
        code: "TIDAK BERLAKU",
        note: "Kewajiban itu tidak berlaku bagi perusahaan, dan alasannya selalu dinyatakan.",
      },
    ],
  },
  deliverables: {
    heading: "Yang Anda terima.",
    body: "Dua layar yang sama dengan yang dipakai tim Anda: perkaranya, dan memo untuk Direksi yang dapat disunting lalu dikirim.",
    captions: {
      regulation: "Layar pembuka satu perkara.",
      memo: "Memo Direksi, dapat disunting, diunduh sebagai Word atau dicetak sebagai PDF.",
    },
  },
  packages: {
    heading: "Dua paket, dihitung per regulasi.",
    items: [
      {
        name: "Analisis",
        body: "Semua yang di atas. Tim Anda sendiri yang merevisi dokumennya, dan Tuntas memeriksa setiap revisi yang diserahkan butir demi butir: terpenuhi, masih terbuka, salah menunjuk pasal, atau menimbulkan masalah baru.",
      },
      {
        name: "Analisis + Penyusunan draf",
        body: "Tuntas juga menyusun draf tiap revisinya — teks lama, teks baru, dan pasal yang mendasarinya. Telaah, sunting, unduh sebagai Word. Bila analisis atau dokumennya berubah, drafnya ditandai dan disusun ulang.",
      },
    ],
    note: "Satu regulasi adalah satu perkara, sejak hari ia terbit sampai hari posisinya dicatat.",
  },
  comparison: {
    heading: "Apa yang berubah.",
    before: {
      title: "Manual, hari ini",
      steps: [
        "Membaca dua ratus pasal",
        "Menyusun tabel perbandingan",
        "Mengejar dokumennya",
        "Membagikan ke unit-unit",
        "Membaca ulang setiap revisi",
      ],
      outcome: "Tenggatnya tiba sebelum pekerjaannya selesai",
    },
    after: {
      title: "Dengan Tuntas",
      steps: [
        "Sebutkan regulasinya, unggah yang ada",
        "Setiap kewajiban, dengan kesimpulan dan sumbernya",
        "Dokumen yang kurang diminta dengan menyebut namanya",
        "Perubahan spesifik, pada dokumen spesifik",
        "Draf revisinya disusun, lalu diperiksa butir demi butir",
      ],
      outcome: "Setiap kewajiban punya posisi, penanggung jawab, dan tanggal",
    },
    note: "Cakupan dan beban kerjanya bergantung pada regulasinya, jumlah dokumennya, dan paket yang dipilih.",
    review: {
      heading: "Tuntas menyimpulkan menurut dokumen. Petugas Anda yang memutuskan.",
      body: [
        "Penilaian tetap ada pada Kepatuhan. Tuntas menyatakan posisi beserta bukti yang mendasarinya; petugas Anda menelaah tiap kesimpulan, menyuntingnya, dan memutuskan. Tidak ada yang selesai hanya karena diklik — status bergerak mengikuti bukti.",
        "Tuntas adalah alat bantu analisis. Ia tidak menyatakan perusahaan patuh dan tidak memberikan nasihat hukum. Setiap keputusan dicatat dengan nama dan waktunya, sehingga catatan itu menunjukkan siapa menerima apa, dan atas dasar apa.",
      ],
    },
  },
  useCases: {
    heading: "Dibangun untuk lembaga yang terkena aturannya.",
    groups: [
      {
        title: "Bank",
        items: [
          "Regulasi baru yang terbit hampir tiap bulan",
          "SOP, syarat produk, dan perjanjian yang harus ikut menyesuaikan",
          "Catatan pengawasan yang harus dijawab Dewan Komisaris",
        ],
      },
      {
        title: "Fintech dan multifinance",
        items: [
          "Rezim yang diganti menyeluruh, bukan diubah sebagian",
          "Perubahan produk yang cepat berhadapan dengan tanggal yang ditetapkan",
          "Fungsi kepatuhan yang hanya berisi satu atau dua orang",
        ],
      },
      {
        title: "Asuransi",
        items: [
          "Kewajiban yang tersebar di polis, perjanjian, dan syarat",
          "Kewajiban pelaporan berkala dan yang dipicu peristiwa",
          "Revisi yang harus diperiksa ulang di beberapa unit",
        ],
      },
    ],
  },
  indonesia: {
    heading: "Apa yang termasuk dalam penerapannya.",
    items: [
      {
        title: "Regulasinya, dan regulasi yang dicabutnya",
        note: "Tuntas memegang keduanya beserta catatan sumber resmi masing-masing, dan menyatakan mana yang berlaku. Tidak ada kesimpulan yang diambil di atas ketentuan yang sudah dicabut — regulasi lama hanya muncul sebagai pembanding.",
      },
      {
        title: "Dokumen Anda, dan tidak untuk hal lain",
        note: "Disimpan terenkripsi, hanya terlihat oleh organisasi Anda, tidak dipakai untuk keperluan lain, dihapus atas permintaan. Tanpa integrasi TI: satu akun untuk petugas kepatuhan Anda, regulasinya, dan dokumen Anda.",
      },
      {
        title: "Catatan yang dapat dipertanggungjawabkan",
        note: "Setiap keputusan dicatat dengan nama dan waktunya. Penyelesaian mencatat posisinya berikut butir yang masih terbuka, bukan menutupinya.",
      },
      {
        title: "Bahasa Indonesia, dari awal sampai akhir",
        note: "Register, memo, dan permintaan dokumennya ditulis dalam Bahasa Indonesia — bahasa yang dipakai untuk menelaah dan mengarsipkan pekerjaan ini.",
      },
    ],
    note: "Tuntas tidak mengklaim persetujuan regulator, dan cakupannya ditetapkan per regulasi. Tuntas adalah alat bantu analisis: ia tidak menyatakan perusahaan patuh dan tidak memberikan nasihat hukum.",
  },
  contact: {
    heading: "Telusuri satu contoh yang sudah selesai.",
    body: "Regulasi nyata, dianalisis dari awal sampai akhir terhadap dokumen sebuah perusahaan fiktif: analisis kesenjangannya kewajiban demi kewajiban, dokumen yang diminta Tuntas, pertentangan dokumen yang tidak diputuskannya sendiri, draf revisi untuk ditelaah, dan memorandum untuk Direksi. Sekitar dua puluh menit, dan Anda akan tahu apakah ini menyerupai pekerjaan tim Anda.",
    form: {
      name: { label: "Nama", error: "Mohon isi nama Anda." },
      email: {
        label: "Email kantor",
        errorMissing: "Mohon isi alamat email.",
        errorInvalid: "Sepertinya itu bukan alamat email.",
      },
      company: { label: "Perusahaan", error: "Mohon isi nama perusahaan Anda." },
      role: { label: "Jabatan" },
      orgType: {
        label: "Jenis institusi",
        options: [
          { value: "bank", label: "Bank" },
          { value: "fintech", label: "Fintech atau multifinance" },
          { value: "insurer", label: "Asuransi" },
          { value: "regulated-other", label: "Lembaga terregulasi lainnya" },
          { value: "other", label: "Lainnya" },
        ],
      },
      need: {
        label: "Perubahan regulasi mana yang sedang ada di meja Anda?",
        hint: "Satu baris sudah cukup.",
        placeholder:
          "mis. POJK baru yang menggantikan aturan yang mendasari SOP kami",
        error: "Tuliskan beberapa kata tentang perubahannya, supaya penelusurannya relevan.",
      },
      submit: "Kirim",
      sending: "Mengirim…",
      sent: {
        heading: "Terima kasih — pesan Anda sampai.",
        body: "Pesan Anda ada di kotak masuk kami. Tim yang membangun Tuntas akan menghubungi Anda untuk mengatur penelusurannya.",
      },
      fallback: {
        heading: "Satu langkah lagi.",
        body: "Kami mencoba mengirimkannya untuk Anda dan tidak berhasil, jadi kami menyiapkan pesan yang sudah terisi di aplikasi email Anda. Tekan kirim di sana dan pesannya sampai kepada kami.",
        noMail:
          "Jika tidak ada yang terbuka, peramban Anda mungkin belum punya aplikasi email terdaftar. Tulis langsung kepada kami — keterangan yang sama sudah cukup.",
        back: "Kembali ke formulir",
      },
    },
  },
  footer: {
    tagline: "Tuntas dibangun dan dioperasikan oleh Kaibre.",
    links: [
      { label: "Kaibre", href: "/" },
      { label: "Kaibre — produk lainnya", href: "/#products" },
      { label: "Kontak", href: "#contact" },
    ],
    languageLink: { label: "Read in English", href: EN_PATH },
  },
};
