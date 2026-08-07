import type { IndoContent } from "./types";
import { EN_PATH } from "./locale";

/**
 * SecurePuls Indonesia — Bahasa Indonesia.
 *
 * Ditulis langsung dalam ragam formal untuk eksekutif kepatuhan, hukum,
 * risiko dan audit — bukan terjemahan kata per kata, dan tidak lebih panjang
 * dari versi Inggrisnya. Istilah yang lazim dipakai dalam bahasa Inggris di
 * praktik kepatuhan Indonesia dipertahankan (gap analysis, gap, deployment,
 * endpoint, spreadsheet, fintech, AI, PDF, Word, label bukti VERIFIED /
 * PARTIAL / INFERRED / GAP); selebihnya memakai istilah baku: kepatuhan,
 * ketentuan, temuan, keparahan, remediasi, verifikasi penelaah, jejak bukti,
 * korpus regulasi.
 *
 * Disiplin klaim mengikuti `en.ts`: angka ±30 menit selalu dengan kualifikasi
 * ("sekitar", "untuk asesmen yang telah dikonfigurasi"); OJK, Bank Indonesia,
 * dan sektor asuransi disebut hanya sebagai kategori korpus yang
 * dikonfigurasi per penugasan — tanpa klaim persetujuan atau cakupan penuh;
 * angka di dalam mockup diberi label "Ilustratif".
 */
export const ID: IndoContent = {
  locale: "id",
  meta: {
    title: "SecurePuls Indonesia — asesmen kepatuhan berbantuan AI",
    description:
      "Analisis kesenjangan, temuan berperingkat keparahan, rencana remediasi, dan draf laporan siap telaah dalam sekitar 30 menit — berlandaskan korpus regulasi yang dikonfigurasi untuk penugasan, tertelusur ke sumber, dan diverifikasi penelaah Anda.",
    ogLocale: "id_ID",
  },
  chrome: {
    skip: "Langsung ke konten",
    kaibreHome: "Kaibre — situs perusahaan",
    marketLabel: "Indonesia",
    toggle: { navLabel: "Bahasa", en: "English", id: "Bahasa Indonesia" },
    cta: { label: "Diskusikan asesmen", href: "#contact" },
  },
  hero: {
    kicker:
      "Asesmen kepatuhan berbantuan AI — untuk bank, fintech, dan perusahaan asuransi di Indonesia",
    headline: "Draf asesmen kepatuhan dalam sekitar 30 menit, bukan berminggu-minggu.",
    body: "SecurePuls membaca korpus regulasi yang dikonfigurasi untuk penugasan beserta kebijakan dan bukti institusi Anda, memetakan setiap ketentuan ke buktinya, menyusun analisis kesenjangan — temuan berperingkat keparahan, rencana remediasi — dan menghasilkan draf laporan siap telaah. Penelaah Anda memverifikasi dan mengesahkannya.",
    timingNote:
      "Durasi bervariasi menurut cakupan asesmen, volume bukti, dan konfigurasi.",
    cta: { label: "Diskusikan asesmen Anda", href: "#contact" },
    secondary: { label: "Lihat alur kerjanya", href: "#workflow" },
    panel: {
      alt: "Ikhtisar asesmen ilustratif: jumlah ketentuan yang dinilai, distribusi statusnya, temuan terbuka, dan status telaah.",
      tag: "Ilustratif",
      caption: "Asesmen regulasi — perbankan",
      headline: { value: "42", label: "ketentuan dinilai" },
      bar: [
        { label: "Patuh", count: 31, tone: "positive" },
        { label: "Parsial", count: 6, tone: "neutral" },
        { label: "Gap", count: 5, tone: "attention" },
      ],
      rows: [
        { label: "5 temuan — 1 kritis, 2 tinggi", tone: "attention" },
        { label: "Bukti terpetakan ke sumbernya", tone: "positive" },
        { label: "Menunggu verifikasi penelaah", tone: "neutral" },
      ],
      footnote:
        "Temuan tetap berupa draf sampai disahkan oleh penelaah yang ditunjuk.",
    },
    illustrationNote: "Ilustrasi antarmuka.",
  },
  inOut: {
    heading: "Apa yang masuk. Apa yang keluar.",
    reads: {
      title: "Yang dibaca SecurePuls",
      items: [
        {
          icon: "corpus",
          label: "Korpus regulasi yang berlaku",
          note: "dikurasi dan dikonfigurasi untuk penugasan",
        },
        { icon: "policy", label: "Kebijakan dan prosedur internal" },
        { icon: "evidence", label: "Bukti dan dokumentasi pendukung" },
        { icon: "history", label: "Temuan terdahulu, bila relevan" },
      ],
    },
    produces: {
      title: "Yang dihasilkan SecurePuls",
      items: [
        { icon: "assessment", label: "Asesmen pengendalian ketentuan demi ketentuan" },
        { icon: "map", label: "Peta bukti dengan rujukan sumber yang persis" },
        { icon: "gap", label: "Analisis kesenjangan (gap analysis)" },
        { icon: "severity", label: "Temuan berperingkat keparahan" },
        { icon: "remediation", label: "Rencana remediasi beserta rekomendasi" },
        { icon: "report", label: "Draf laporan siap telaah — PDF atau Word" },
      ],
    },
  },
  workflow: {
    heading: "Empat tahap. Satu jejak bukti.",
    stages: [
      {
        n: "01",
        icon: "ground",
        title: "Landasan",
        body: "Korpus regulasi, kebijakan, dan bukti Anda — dalam satu tempat.",
      },
      {
        n: "02",
        icon: "assess",
        title: "Asesmen",
        body: "AI memetakan ketentuan ke bukti dan menyusun analisis kesenjangannya.",
      },
      {
        n: "03",
        icon: "remediation",
        title: "Remediasi",
        body: "Temuan diperingkat keparahannya, masing-masing dengan tindakan remediasi.",
      },
      {
        n: "04",
        icon: "review",
        title: "Telaah & laporkan",
        body: "Penelaah Anda memverifikasi kesimpulannya. SecurePuls menghasilkan laporannya.",
      },
    ],
  },
  trace: {
    heading: "Tidak ada temuan tanpa sumber.",
    body: "Setiap temuan tetap terhubung ke buktinya, sumber di baliknya, dan penelaah yang memverifikasinya.",
    chain: [
      {
        label: "Ketentuan regulasi",
        text: "Hak akses ke data nasabah ditinjau sesuai jadwal yang ditetapkan.",
      },
      {
        label: "Bukti yang ditemukan",
        text: "Kebijakan mewajibkan tinjauan triwulanan — tidak ada catatan tinjauan untuk dua triwulan terakhir.",
        meta: "Sumber: kebijakan manajemen akses, bagian peninjauan",
      },
      {
        label: "Kesenjangan (gap)",
        text: "Tinjauan akses berkala tidak terbukti dilaksanakan.",
        meta: "Keparahan: Tinggi",
        accent: true,
      },
      {
        label: "Remediasi",
        text: "Pulihkan siklus tinjauan dan simpan catatan pengesahannya.",
      },
      {
        label: "Verifikasi penelaah",
        text: "Dikonfirmasi oleh penelaah yang ditunjuk.",
      },
    ],
    caption: "Contoh ilustratif — tidak diambil dari regulasi tertentu.",
    labelsHeading: "Setiap referensi regulasi disertai tingkat keyakinannya.",
    labels: [
      {
        code: "VERIFIED",
        note: "Terkonfirmasi dari peraturan yang berlaku, sumber resmi otoritas, atau badan standar.",
      },
      {
        code: "PARTIAL",
        note: "Didukung sumber sekunder yang tepercaya; sumber primernya belum dikonfirmasi secara independen.",
      },
      {
        code: "INFERRED",
        note: "Disimpulkan dari referensi silang yang konsisten; tanpa satu sumber primer.",
      },
      {
        code: "GAP",
        note: "Belum terjawab. Dinyatakan sebagai belum terjawab dan dieskalasi — tidak pernah disajikan seolah-olah pasti menjadi ketentuan.",
      },
    ],
  },
  deliverables: {
    heading: "Yang Anda terima.",
    remediation: {
      caption: "Rencana remediasi — cuplikan. Ilustratif.",
      columns: {
        finding: "Temuan",
        severity: "Keparahan",
        action: "Remediasi",
        target: "Target",
      },
      rows: [
        {
          finding: "Tinjauan akses tidak terbukti",
          severity: "Tinggi",
          tone: "attention",
          action: "Pulihkan siklus tinjauan triwulanan",
          target: "30 hari",
        },
        {
          finding: "Eskalasi insiden belum teruji",
          severity: "Sedang",
          tone: "neutral",
          action: "Laksanakan dan dokumentasikan latihan eskalasi",
          target: "60 hari",
        },
        {
          finding: "Jadwal retensi tidak mutakhir",
          severity: "Rendah",
          tone: "positive",
          action: "Selaraskan dengan kebijakan berjalan",
          target: "90 hari",
        },
      ],
    },
    report: {
      caption: "Draf laporan — struktur",
      title: "Laporan asesmen kepatuhan",
      sections: [
        "Ringkasan eksekutif",
        "Analisis kesenjangan",
        "Temuan dan keparahan",
        "Rencana remediasi",
        "Rujukan sumber",
        "Pengesahan penelaah",
      ],
    },
  },
  comparison: {
    heading: "Apa yang berubah.",
    before: {
      title: "Asesmen manual",
      steps: [
        "Membaca regulasi satu per satu",
        "Spreadsheet dan pelacak",
        "Mengejar bukti",
        "Analisis kesenjangan manual",
        "Menulis laporan",
      ],
      outcome: "Berhari-hari hingga berminggu-minggu",
    },
    after: {
      title: "Dengan SecurePuls",
      steps: [
        "Korpus, kebijakan, dan bukti dalam satu tempat",
        "Asesmen berbantuan AI",
        "Analisis kesenjangan dan rencana remediasi",
        "Verifikasi penelaah",
        "Draf laporan siap telaah",
      ],
      outcome: "Sekitar 30 menit menuju draf pertama",
    },
    note: "Durasi bervariasi menurut cakupan asesmen, volume bukti, dan konfigurasi.",
    review: {
      heading: "SecurePuls menyusun draf. Tim Anda yang memutuskan.",
      body: [
        "AI mempercepat pembacaan, pemetaan, dan referensi silang — dan setiap kesimpulan tetap terlihat, dapat digugat, dan tertelusur ke buktinya.",
        "SecurePuls adalah perangkat kerja profesional — bukan opini hukum, audit, atau sertifikasi. Temuan tetap berupa draf sampai diverifikasi penelaah yang kompeten, dan setiap laporan memuat pengesahan itu.",
      ],
    },
  },
  useCases: {
    heading: "Dibangun untuk pekerjaan yang teregulasi.",
    groups: [
      {
        title: "Bank",
        items: [
          "Asesmen berkala atas ketentuan regulasi dan pengendalian internal",
          "Pemetaan kebijakan ke ketentuan dengan analisis kesenjangan pengendalian",
          "Temuan berbasis bukti dan pemantauan remediasi",
        ],
      },
      {
        title: "Fintech",
        items: [
          "Kesiapan regulasi menjelang perizinan atau tinjauan",
          "Bukti tetap mutakhir di tengah perubahan produk yang cepat",
          "Asesmen kebijakan dan pengendalian dengan remediasi kesenjangan",
        ],
      },
      {
        title: "Perusahaan asuransi",
        items: [
          "Asesmen kewajiban regulasi",
          "Tinjauan tata kelola dan kebijakan",
          "Pelaporan kepatuhan berkala dengan temuan dan remediasinya",
        ],
      },
    ],
  },
  indonesia: {
    heading: "Dibangun di sekitar regulasi yang berlaku bagi institusi Anda.",
    items: [
      {
        title: "Basis pengetahuan regulasi Indonesia yang terkurasi",
        note: "Deployment di Indonesia dikonfigurasi dengan korpus regulasi untuk penugasan — ketentuan OJK, Bank Indonesia, dan sektor asuransi sesuai relevansinya — lengkap dengan rujukan sumber.",
      },
      {
        title: "Pemuatan dokumen untuk penugasan",
        note: "SecurePuls dapat dikonfigurasi untuk memuat korpus regulasi yang berlaku beserta kebijakan, prosedur, dan bukti institusi Anda.",
      },
      {
        title: "Deployment mandiri",
        note: "Basis data sendiri, akun dibuat administrator, tanpa pendaftaran publik — dan dapat dioperasikan di dalam lingkungan Anda.",
      },
      {
        title: "Endpoint model dapat dikonfigurasi",
        note: "Analisis dapat dijalankan pada endpoint kompatibel OpenAI yang Anda setujui.",
      },
    ],
    note: "SecurePuls tidak mengklaim persetujuan regulator. Cakupan korpus ditetapkan dan diverifikasi per penugasan.",
  },
  contact: {
    heading: "Diskusikan asesmen Anda.",
    body: "Sampaikan ketentuan apa yang menjadi acuan asesmen tim Anda dan siapa yang menelaah hasilnya. Pesan Anda sampai langsung ke tim yang membangun SecurePuls.",
    form: {
      name: { label: "Nama", error: "Mohon isi nama Anda." },
      email: {
        label: "Email kantor",
        errorMissing: "Mohon isi alamat email.",
        errorInvalid: "Alamat email tersebut tampaknya tidak valid.",
      },
      company: { label: "Perusahaan", error: "Mohon isi nama perusahaan Anda." },
      role: { label: "Jabatan" },
      orgType: {
        label: "Jenis organisasi",
        options: [
          { value: "bank", label: "Bank" },
          { value: "fintech", label: "Fintech" },
          { value: "insurer", label: "Perusahaan asuransi" },
          { value: "regulated-other", label: "Lembaga teregulasi lainnya" },
          { value: "other", label: "Lainnya" },
        ],
      },
      need: {
        label: "Ceritakan kebutuhan asesmen Anda",
        hint: "Ketentuan apa yang menjadi acuan asesmen tim Anda, seberapa sering, dan siapa yang menelaah hasilnya?",
        placeholder:
          "cth. Kami menjalankan asesmen pengendalian internal secara berkala di beberapa entitas. Ketentuan tercatat di spreadsheet, bukti tersebar di folder bersama, dan dua penelaah merakit laporannya secara manual setiap siklus.",
        error:
          "Tambahkan satu-dua kalimat lagi agar kami dapat memberi jawaban yang berguna.",
      },
      submit: "Kirim",
      sending: "Mengirim…",
      sent: {
        heading: "Terima kasih — pesan Anda sudah sampai.",
        body: "Pesan Anda ada di kotak masuk kami. Anda akan mendapat balasan dari tim yang membangun SecurePuls.",
      },
      fallback: {
        heading: "Satu langkah lagi.",
        body: "Kami mencoba mengirimkannya dan belum berhasil, jadi pesan yang sudah terisi kami serahkan ke aplikasi email Anda. Tekan kirim di sana, dan pesan itu sampai kepada kami.",
        noMail:
          "Jika tidak ada yang terbuka, kemungkinan peramban Anda belum memiliki aplikasi email. Tulis langsung kepada kami — detail yang sama sudah cukup.",
        back: "Kembali ke formulir",
      },
    },
  },
  footer: {
    tagline: "SecurePuls adalah produk Kaibre.",
    links: [
      { label: "Kaibre", href: "/" },
      { label: "SecurePuls — ikhtisar produk", href: "/securepuls" },
      { label: "Kontak", href: "#contact" },
    ],
    languageLink: { label: "Read in English", href: EN_PATH },
  },
};
