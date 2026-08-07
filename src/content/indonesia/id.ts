import type { IndoContent } from "./types";
import { EN_PATH } from "./locale";

/**
 * SecurePuls Indonesia — Bahasa Indonesia.
 *
 * Ditulis langsung dalam ragam formal untuk audiens kepatuhan, hukum, risiko
 * dan audit di sektor jasa keuangan — bukan terjemahan kata per kata. Istilah
 * teknis yang lazim dipakai dalam bahasa Inggris di lingkungan perusahaan
 * Indonesia dipertahankan (gap, deployment, endpoint, spreadsheet, email,
 * PDF, Word, fintech, AI), begitu pula label bukti pada antarmuka produk
 * (VERIFIED / PARTIAL / INFERRED / GAP).
 *
 * Disiplin klaim mengikuti `en.ts`: tidak ada regulasi, regulator, kerangka
 * atau undang-undang Indonesia yang disebut namanya; tidak ada sertifikasi,
 * persentase, atau nama pelanggan. Contoh pada bagian ketertelusuran diberi
 * label ilustratif.
 */
export const ID: IndoContent = {
  locale: "id",
  meta: {
    title: "SecurePuls Indonesia — asesmen kepatuhan lengkap dengan buktinya",
    description:
      "SecurePuls menyusun asesmen kepatuhan untuk bank, fintech, dan perusahaan asuransi di Indonesia: setiap ketentuan terjawab, setiap temuan tertelusur ke sumbernya, dan laporan disahkan oleh penelaah Anda sendiri.",
    ogLocale: "id_ID",
  },
  chrome: {
    skip: "Langsung ke konten",
    kaibreHome: "Kaibre — situs perusahaan",
    marketLabel: "Indonesia",
    toggle: {
      navLabel: "Bahasa",
      en: "English",
      id: "Bahasa Indonesia",
    },
    cta: { label: "Diskusikan asesmen", href: "#contact" },
  },
  hero: {
    audience: "Untuk bank, fintech, dan perusahaan asuransi di Indonesia",
    headline: "Asesmen kepatuhan, lengkap dengan buktinya.",
    body: "SecurePuls mengubah seperangkat ketentuan dan bukti dari organisasi Anda menjadi asesmen terstruktur yang siap ditelaah: setiap ketentuan terjawab, setiap temuan diberi peringkat keparahan dan tertelusur ke sumbernya, dan laporannya disahkan oleh penelaah Anda sendiri.",
    cta: { label: "Diskusikan asesmen Anda", href: "#contact" },
    secondary: { label: "Lihat alur kerjanya", href: "#workflow" },
    panel: {
      alt: "Draf temuan asesmen untuk tinjauan pengendalian internal; setiap baris menampilkan status buktinya dan menunggu pengesahan penelaah.",
      caption: "Draf temuan — asesmen pengendalian internal",
      rows: [
        { label: "Manajemen akses", status: "Terverifikasi", tone: "positive" },
        { label: "Kelangsungan usaha", status: "Parsial", tone: "neutral" },
        { label: "Pengawasan pihak ketiga", status: "Gap", tone: "attention" },
      ],
      footnote:
        "Temuan tetap berupa draf sampai disahkan oleh penelaah yang ditunjuk.",
    },
    illustrationNote: "Ilustrasi antarmuka.",
  },
  inOut: {
    heading: "Apa yang masuk. Apa yang keluar.",
    give: {
      title: "Yang Anda berikan",
      items: [
        "Seperangkat ketentuan yang menjadi acuan asesmen — ketentuan regulasi dan kebijakan internal, dikonfigurasi per penugasan",
        "Bukti untuk setiap ketentuan: jawaban tim Anda, catatan, dan lampiran pendukung",
        "Penelaah yang memegang kewenangan pengesahan",
      ],
    },
    get: {
      title: "Yang dihasilkan SecurePuls",
      items: [
        "Asesmen terstruktur lintas domain yang konsisten — setiap ketentuan dirumuskan sebagai pertanyaan yang dapat diverifikasi tim Anda",
        "Temuan hanya bila ada kesenjangan atau ketidakpastian yang nyata, dengan peringkat Kritis hingga Informasional",
        "Setiap referensi regulasi diberi label sesuai kekuatan bukti di baliknya",
        "Rekomendasi yang melekat pada setiap temuan — tindakan segera, jangka pendek, dan jangka panjang",
        "Laporan siap telaah — temuan, matriks risiko, peta jalan — diekspor ke PDF atau Word",
      ],
    },
  },
  workflow: {
    heading: "Dari seperangkat ketentuan menjadi laporan yang disahkan.",
    steps: [
      {
        n: "01",
        title: "Konfigurasikan penugasan",
        body: "Seperangkat ketentuan yang berlaku dikonfigurasi untuk penugasan itu, diambil dari basis pengetahuan yang terpelihara — bukan dihasilkan secara bebas.",
      },
      {
        n: "02",
        title: "Susun asesmennya",
        body: "SecurePuls menyusun ketentuan ke dalam domain-domain yang konsisten, masing-masing dirumuskan sebagai pertanyaan yang dapat diverifikasi tim Anda.",
      },
      {
        n: "03",
        title: "Rekam buktinya",
        body: "Status, catatan, dan lampiran pendukung direkam pada setiap ketentuan selagi tim Anda mengerjakannya.",
      },
      {
        n: "04",
        title: "Susun draf temuan",
        body: "Temuan hanya diangkat bila ada kesenjangan atau ketidakpastian yang nyata — diberi peringkat keparahan, dengan rekomendasi yang menyertainya.",
      },
      {
        n: "05",
        title: "Telaah dan sahkan",
        body: "Penelaah Anda menerima atau mengoreksi setiap temuan. Tidak ada yang final tanpa pengesahan dari penelaah yang ditunjuk.",
      },
      {
        n: "06",
        title: "Ekspor laporannya",
        body: "Laporan terstruktur memuat temuan, matriks risiko, dan peta jalan — diekspor ke PDF atau Word.",
      },
    ],
  },
  trace: {
    heading: "Tidak ada temuan tanpa sumber.",
    body: "Kesimpulan yang tidak dapat ditelusuri adalah kesimpulan yang tidak dapat dipertanggungjawabkan. SecurePuls menjaga rantainya tetap utuh — dari ketentuan, ke bukti yang direkam terhadapnya, ke sumber di baliknya, hingga penelaah yang mengesahkannya.",
    chain: [
      {
        label: "Ketentuan",
        text: "Hak akses ke data nasabah ditinjau sesuai jadwal yang ditetapkan.",
      },
      {
        label: "Bukti yang terekam",
        text: "Status: gap — tidak ada catatan tinjauan untuk dua siklus terakhir.",
      },
      {
        label: "Sumber",
        text: "Kebijakan internal manajemen akses, bagian peninjauan.",
        meta: "Label bukti: VERIFIED",
      },
      {
        label: "Draf temuan",
        text: "Tinjauan akses berkala tidak terbukti dilaksanakan.",
        meta: "Keparahan: Tinggi",
        accent: true,
      },
      {
        label: "Keputusan penelaah",
        text: "Dikonfirmasi dan disahkan oleh penelaah yang ditunjuk.",
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
  comparison: {
    heading: "Asesmen yang sama, tanpa proses yang terpecah.",
    before: {
      title: "Proses manual",
      items: [
        "Ketentuan dilacak di spreadsheet",
        "Bukti dikejar lewat email dan folder bersama",
        "Temuan disalin antar dokumen",
        "Sumber diperiksa ulang secara manual saat telaah",
        "Laporan dirakit paling akhir, di bawah tenggat",
      ],
    },
    after: {
      title: "Dengan SecurePuls",
      items: [
        "Satu struktur memuat ketentuan, bukti, dan temuan",
        "Bukti direkam tepat pada ketentuannya",
        "Sumber tetap melekat saat temuan berpindah",
        "Telaah berlangsung di dalam alur kerja yang sama",
        "Laporan dihasilkan dari apa yang telah ditelaah",
      ],
    },
    review: {
      heading: "SecurePuls menyusun draf. Tim Anda yang memutuskan.",
      body: [
        "SecurePuls adalah perangkat kerja profesional untuk pekerjaan kepatuhan — bukan opini hukum, bukan audit, dan bukan sertifikasi. Analisis berbantuan AI mempercepat pembacaan, penstrukturan, dan referensi silang; pertimbangan tetap berada di tangan tim Anda.",
        "Temuan tetap berupa draf sampai diterima oleh penelaah yang kompeten, dan setiap laporan memuat pengesahan itu.",
      ],
    },
  },
  useCases: {
    heading: "Dibangun untuk pekerjaan yang teregulasi.",
    body: "Struktur asesmen yang sama menampung pekerjaan berulang dan sarat bukti yang sudah dijalankan setiap lembaga.",
    groups: [
      {
        title: "Bank",
        items: [
          "Asesmen berkala atas ketentuan regulasi dan pengendalian internal",
          "Pemetaan kebijakan terhadap ketentuan menjelang tinjauan regulator",
          "Pengumpulan bukti yang tetap melekat pada ketentuannya",
        ],
      },
      {
        title: "Fintech",
        items: [
          "Menyiapkan bukti untuk tinjauan regulator",
          "Menjaga dokumentasi kepatuhan tetap mutakhir di tengah perubahan produk yang cepat",
          "Mengulang asesmen pengendalian tanpa menyusunnya dari awal",
        ],
      },
      {
        title: "Perusahaan asuransi",
        items: [
          "Melacak kewajiban regulasi dan kebijakan internal dalam satu struktur",
          "Pelaporan tata kelola dan kepatuhan secara berkala",
          "Bukti asesmen ditelaah sebelum masuk ke laporan",
        ],
      },
    ],
  },
  trust: {
    heading: "Siap untuk lingkungan Anda.",
    items: [
      {
        title: "Deployment mandiri",
        note: "SecurePuls berjalan sebagai deployment tersendiri dengan basis data sendiri, dan dapat dioperasikan di dalam lingkungan Anda.",
      },
      {
        title: "Akses terkendali",
        note: "Akun dibuat oleh administrator Anda. Tidak ada pendaftaran publik.",
      },
      {
        title: "Endpoint model dapat dikonfigurasi",
        note: "Model analisis dikonfigurasi per deployment dan dapat diarahkan ke endpoint kompatibel OpenAI yang Anda setujui.",
      },
      {
        title: "Konten asesmen tertelusur",
        note: "Setiap temuan tetap terhubung ke bukti dan jawaban asalnya.",
      },
    ],
    status: {
      heading: "Posisi SecurePuls di Indonesia",
      body: [
        "SecurePuls dibangun dan dioperasikan oleh Kaibre, serta sedang dalam pengembangan dan demonstrasi aktif bersama organisasi-organisasi yang teregulasi. Seperangkat ketentuan yang menjadi acuan asesmen dikonfigurasi per penugasan — dan halaman ini baru akan menyebut kerangka regulasi Indonesia setelah dukungannya terverifikasi.",
        "Jika tim Anda melakukan asesmen terhadap ketentuan regulasi atau ketentuan internal di Indonesia, kami ingin memperlihatkan versi terkini produk ini kepada Anda.",
      ],
    },
  },
  contact: {
    heading: "Diskusikan asesmen Anda.",
    body: "Ceritakan pekerjaan asesmen tim Anda — ketentuan apa yang menjadi acuan, seberapa sering dilakukan, dan siapa yang menelaahnya. Pesan Anda sampai langsung ke tim yang membangun SecurePuls.",
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
