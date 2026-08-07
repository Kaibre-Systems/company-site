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
    cta: { label: "Tunjukkan alur kerja", href: "#contact" },
  },
  hero: {
    headline: "Draf asesmen kepatuhan dalam sekitar 30 menit, bukan berminggu-minggu.",
    body: "SecurePuls AI mengubah ketentuan regulasi, kebijakan, dan bukti lembaga jasa keuangan Indonesia menjadi analisis kesenjangan, rencana remediasi, dan draf siap telaah — diverifikasi dan disahkan oleh penelaah Anda. Durasi bervariasi menurut cakupan, volume bukti, dan konfigurasi.",
    cta: { label: "Tunjukkan alur kerja Anda", href: "#contact" },
    secondary: { label: "Cara kerjanya", href: "#workflow" },
    panel: {
      alt: "Cuplikan asesmen ilustratif: ketentuan yang dinilai, kesenjangan yang ditemukan, keparahan, status remediasi, dan status telaah.",
      tag: "Ilustratif",
      caption: "Asesmen",
      rows: [
        { label: "Ketentuan dinilai", value: "42", tone: "neutral" },
        { label: "Analisis kesenjangan", value: "5 gap", tone: "attention" },
        { label: "Keparahan tinggi", value: "2 temuan", tone: "attention" },
        { label: "Rencana remediasi", value: "Siap", tone: "positive" },
        { label: "Penelaah", value: "Menunggu verifikasi", tone: "neutral" },
      ],
    },
  },
  inOut: {
    heading: "Apa yang masuk. Apa yang keluar.",
    reads: {
      title: "Yang dibaca SecurePuls",
      items: [
        {
          icon: "corpus",
          label: "Korpus regulasi yang berlaku",
          note: "dikurasi dan dipelihara oleh Kaibre — tidak disusun ulang oleh tim Anda",
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
        body: "SecurePuls AI memetakan ketentuan ke bukti dan menyusun analisis kesenjangannya.",
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
        text: "Akses ke data nasabah wajib dibatasi sesuai peran yang berwenang.",
      },
      {
        label: "Bukti yang ditemukan",
        text: "Kebijakan menetapkan akses berbasis peran — catatan tinjauan akses berkala tidak lengkap.",
        meta: "Sumber: kebijakan manajemen akses",
      },
      {
        label: "Asesmen",
        text: "Parsial — tinjauan akses tidak terbukti dilaksanakan.",
        meta: "Keparahan: Tinggi",
        accent: true,
      },
      {
        label: "Remediasi",
        text: "Terapkan tinjauan akses berkala dengan penanggung jawab yang ditunjuk dan catatan yang tersimpan.",
      },
      {
        label: "Penelaah",
        text: "Menunggu verifikasi.",
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
      title: "Rencana remediasi",
      tag: "Ilustratif",
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
      title: "Laporan asesmen kepatuhan",
      sections: [
        "Ringkasan eksekutif",
        "Asesmen ketentuan",
        "Analisis kesenjangan",
        "Temuan dan keparahan",
        "Rencana remediasi",
        "Bukti dan rujukan sumber",
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
        "SecurePuls AI menyusun asesmennya",
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
          "Asesmen regulasi berkala",
          "Analisis kesenjangan pengendalian",
          "Temuan berbasis bukti",
        ],
      },
      {
        title: "Fintech",
        items: [
          "Kesiapan regulasi",
          "Asesmen kebijakan dan pengendalian",
          "Remediasi di tengah perubahan produk yang cepat",
        ],
      },
      {
        title: "Perusahaan asuransi",
        items: [
          "Asesmen kewajiban regulasi",
          "Tinjauan tata kelola dan kebijakan",
          "Pelaporan temuan dan remediasi berkala",
        ],
      },
    ],
  },
  indonesia: {
    heading: "Dibangun di sekitar regulasi yang berlaku bagi institusi Anda.",
    items: [
      {
        title: "Basis pengetahuan regulasi Indonesia yang terkurasi",
        note: "Dikonfigurasi dengan korpus yang berlaku bagi institusi dan cakupan asesmennya — ketentuan OJK, Bank Indonesia, PPATK, dan sektor asuransi sesuai relevansinya — dikurasi, diverifikasi, dan dipelihara sebagai bagian dari deployment.",
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
        title: "Deployment model AI dapat dikonfigurasi",
        note: "Analisis berjalan pada deployment model yang disetujui dan dikendalikan institusi Anda.",
      },
    ],
    note: "SecurePuls tidak mengklaim persetujuan regulator. Cakupan korpus ditetapkan dan diverifikasi per penugasan.",
  },
  contact: {
    heading: "Bawakan kami satu alur kerja kepatuhan.",
    body: "Tunjukkan satu asesmen yang masih dikerjakan tim Anda secara manual — kami akan mendemonstrasikan bagaimana SecurePuls menyusun bukti, analisis kesenjangan, rencana remediasi, dan draf siap telaahnya. Demonstrasi awal tanpa biaya.",
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
        label: "Alur kerja kepatuhan apa yang ingin Anda uji?",
        hint: "Satu kalimat pun cukup.",
        placeholder:
          "cth. asesmen regulasi berkala, tinjauan kebijakan, analisis kesenjangan pengendalian",
        error:
          "Tuliskan sedikit tentang alur kerjanya agar kami dapat menyiapkan demonstrasi yang relevan.",
      },
      submit: "Kirim",
      sending: "Mengirim…",
      sent: {
        heading: "Terima kasih — pesan Anda sudah sampai.",
        body: "Pesan Anda ada di kotak masuk kami. Tim yang membangun SecurePuls akan menghubungi Anda untuk mengatur demonstrasinya.",
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
