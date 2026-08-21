/**
 * The product's screens, in the product's language.
 *
 * One source for both locales, and it is Bahasa Indonesia in both. The
 * regulation is Indonesian, the company's documents are Indonesian, and the
 * officer who reviews the analysis reads it in Indonesian — so the screens
 * this site reproduces are the screens that exist, not translations of them.
 * An English-speaking reader gets the argument from the copy around them and
 * the accessible description on each one; what they are looking at is the
 * real thing rather than a mock-up made legible to the wrong audience.
 *
 * Every string is transcribed from `apps/regulatory-web` and its analysis
 * snapshot: obligation no. 4 of POJK 40/2024 read against the demo's openly
 * fictional company. Nothing here is written for the website.
 *
 * The one thing that does localise is `alt`: an accessible description is
 * read *instead of* the screen, so it belongs to the reader, not to the
 * product. Each dictionary supplies its own.
 */
export const SCREENS = {
  regulation: {
    meta: "OJK · Diterima 14 Agustus 2026",
    title: "POJK 40 Tahun 2024: Layanan Pendanaan Bersama Berbasis Teknologi Informasi",
    replaces:
      "Menggantikan POJK 10/POJK.05/2022. Penggantian menyeluruh rezim LPBBTI (P2P lending), dianalisis terhadap 18 dokumen perusahaan.",
    lines: [
      { text: "49 kewajiban belum Anda tinjau" },
      { text: "4 tenggat sudah lewat", tone: "gap" },
      { text: "Tenggat berikutnya 10 September 2026" },
    ],
  },
  obligation: {
    tag: "Ilustrasi",
    mark: "Tuntas",
    no: "Kewajiban no. 4",
    chip: "Perlu tindakan dari Anda",
    chipTone: "gap",
    label: "Kewajiban (peraturan baru)",
    text: "Penyelenggara wajib memastikan anggota Direksi dan anggota Dewan Komisaris memiliki sertifikat kompetensi kerja dari lembaga sertifikasi profesi di bidang teknologi finansial yang terdaftar di Otoritas Jasa Keuangan.",
    cite: "POJK 40/2024 · Ps. 51 (1)",
    oldLabel: "Aturan lama (POJK 10/2022, dicabut)",
    oldText: "Berubah — kewajiban ini sudah ada, isinya berubah. Rumusan lama membebankan kewajiban langsung kepada tiap pengurus; rumusan baru menempatkan Penyelenggara sebagai pihak yang wajib memastikan.",
    oldCite: "POJK 10/2022 · Ps. 16 (1)",
    conclusion: {
      tone: "gap",
      title: "Belum dipenuhi.",
      basisLabel: "Dasar kesimpulan",
      basis: [
        "Memo SDM Sertifikasi (2025) mencantumkan masa berlaku sertifikat Komisaris Utama dan Komisaris Independen sampai 22 Agustus 2025 dan Direktur Teknologi sampai 9 Maret 2026; tidak ada dokumen yang diserahkan yang membuktikan perpanjangan setelah tanggal-tanggal tersebut.",
        "Register Kepatuhan (2025) baris R-06 sendiri menandai status kewajiban ini sebagai Sebagian.",
        "Kesenjangan bukti perpanjangan bersifat terbukti dari dokumen internal, bukan sekadar ketiadaan informasi.",
      ],
      docsLabel: "Dokumen perusahaan yang diperiksa untuk kesimpulan ini:",
      docs: [
        "Memo SDM Sertifikasi (2025)",
        "Register Kepatuhan (2025)",
        "Struktur Organisasi (2026)",
      ],
    },
    action: {
      label: "Yang perlu dilakukan perusahaan",
      text: "Memutakhirkan memo status sertifikasi, menyelesaikan perpanjangan yang tertunda, dan menetapkan pemantauan masa berlaku dalam kalender kepatuhan dengan pengingat sebelum jatuh tempo.",
      unit: "Usulan unit pelaksana: Divisi SDM & Umum dengan pemantauan Divisi Kepatuhan & Legal (perusahaan yang menentukan — usulan ini terbuka didiskusikan).",
    },
    deadline: {
      label: "Tenggat",
      text: "Segera; sertifikat Komisaris Utama dan Komisaris Independen tercatat berakhir 22 Agustus 2025 dan Direktur Teknologi 9 Maret 2026.",
    },
  },
  register: {
    columns: {
      no: "No.",
      obligation: "Kewajiban (peraturan baru)",
      article: "Pasal",
      action: "Tindakan",
    },
    chapter: { title: "BAB VI — SUMBER DAYA MANUSIA", count: "3 kewajiban" },
    rows: [
      {
        no: "4",
        obligation:
          "Penyelenggara wajib memastikan anggota Direksi dan anggota Dewan Komisaris memiliki sertifikat kompetensi kerja dari lembaga sertifikasi profesi di bidang teknologi finansial yang terdaftar di Otoritas Jasa Keuangan.",
        article: "Ps. 51 (1)",
        action: "Perlu tindakan dari Anda",
        tone: "gap",
      },
      {
        no: "5",
        obligation:
          "Penyelenggara wajib memastikan pejabat 1 (satu) tingkat di bawah Direksi memiliki sertifikat kompetensi kerja dari lembaga sertifikasi profesi di bidang teknologi finansial yang terdaftar di Otoritas Jasa Keuangan.",
        article: "Ps. 51 (1)",
        action: "Perlu tindakan dari Anda",
        tone: "gap",
      },
      {
        no: "6",
        obligation:
          "Anggota Direksi yang merupakan warga negara asing wajib memiliki sertifikasi Bahasa Indonesia paling lambat 1 tahun sejak tanggal persetujuan sebagai anggota Direksi oleh Otoritas Jasa Keuangan.",
        article: "Ps. 51 (2)",
        action: "Tidak berlaku",
        tone: "na",
      },
    ],
    note: "Tuntas adalah alat bantu analisis, bukan nasihat hukum.",
  },
  memo: {
    title: "MEMORANDUM",
    head: [
      { label: "Kepada", value: "Direksi dan Dewan Komisaris" },
      { label: "Dari", value: "Fungsi Kepatuhan" },
      { label: "Tanggal", value: "14 Agustus 2026" },
      {
        label: "Perihal",
        value:
          "Ringkasan awal hasil analisis dampak POJK 40 Tahun 2024, yang mencabut POJK 10/POJK.05/2022, terhadap kewajiban regulasi PT Benderang Dana Teknologi selaku Penyelenggara LPBBTI konvensional berizin.",
      },
    ],
    body: [
      {
        lead: "Identitas regulasi.",
        text: "POJK 40 Tahun 2024 berlaku sejak diundangkan pada 27 Desember 2024 dan mencabut POJK 10/POJK.05/2022 melalui Pasal 236; peraturan yang dicabut dirujuk semata-mata sebagai pembanding.",
      },
      {
        lead: "Hasil analisis.",
        text: "Analisis bertanggal 14 Agustus 2026 mencakup 50 baris kewajiban: 18 kesenjangan yang terbukti, 13 kewajiban yang baru terpenuhi sebagian, 15 kewajiban yang belum dapat dinilai karena bukti belum memadai, 1 kewajiban yang telah didukung bukti, 1 pertentangan bukti, dan 2 ketentuan yang tidak berlaku bagi Perseroan.",
      },
    ],
    footnote:
      "Disusun oleh Tuntas untuk Direksi dan Dewan Komisaris. Draf — ditelaah, disunting, dan diputuskan oleh fungsi kepatuhan Anda.",
  },
} as const;
