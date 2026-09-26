Redesign dan implementasikan UI/UX pada seluruh file `.tsx` di dalam:

`resources/js/pages/dashboard/marketplace/`

Termasuk seluruh subfolder di dalamnya. Terapkan perubahan langsung pada kode, bukan hanya memberikan rekomendasi atau mockup.

Tujuan utama:
- Seluruh halaman marketplace harus terlihat premium, modern, konsisten, kredibel, dan production-ready.
- Kesan “mahal” harus berasal dari presisi, restraint, typography, hierarchy, spacing, consistency, dan kualitas interaksi.
- Jangan menggunakan warna emas, gradient, glow, glassmorphism, atau dekorasi berlebihan sebagai jalan pintas.
- Semua halaman harus terasa sebagai satu produk yang dirancang oleh product designer manusia, bukan kumpulan template atau komponen AI.

Sebelum mengubah kode:
- Baca seluruh file `.tsx` dalam folder marketplace beserta subfoldernya.
- Pelajari layout, shared components, hooks, utilities, state management, API flow, validation, permission, dan business logic yang digunakan.
- Periksa halaman dashboard lain yang sudah matang secara visual sebagai referensi design system.
- Identifikasi pola yang berulang seperti page header, navigation, summary, filters, forms, cards, tables, lists, dialogs, sheets, pagination, loading, empty state, dan error state.
- Identifikasi komponen internal dan shadcn yang sudah tersedia sebelum membuat implementasi baru.
- Gunakan kode aktual sebagai source of truth.
- Jangan mengubah kode sebelum memahami hubungan antarfolder, komponen, state, dan data.

Strategi konsistensi:
- Buat seluruh halaman memiliki bahasa visual yang konsisten.
- Gunakan hierarchy, spacing, typography, radius, border, shadow, icon, dan interaction pattern yang sama.
- Pertahankan karakter masing-masing halaman berdasarkan fungsi dan kepadatan informasinya.
- Jangan memaksakan layout identik ke semua halaman.
- Gunakan komposisi dan pattern yang konsisten tanpa membuat semua halaman terlihat monoton.
- Jika pattern sudah tersedia di shared component, gunakan kembali.
- Hindari menyalin styling yang sama ke banyak file.
- Jangan membuat abstraction baru kecuali benar-benar menghilangkan duplikasi nyata dan sesuai dengan arsitektur existing.
- Jangan membuat file baru jika perubahan masih layak dilakukan melalui komponen existing.

Prinsip desain premium:

1. Hierarki yang jelas
- Setiap halaman hanya memiliki satu focal point utama.
- Pengguna harus langsung memahami tujuan halaman, informasi terpenting, dan action utama.
- Primary action harus jelas tanpa membuat secondary action ikut mendominasi.
- Gunakan heading, grouping, alignment, dan whitespace untuk membangun hierarchy.
- Jangan membuat banyak card, badge, dan tombol saling berebut perhatian.

2. Typography yang presisi
- Gunakan sedikit variasi ukuran font dengan hierarchy yang tegas.
- Bedakan heading, value, label, metadata, helper text, dan status secara jelas.
- Jangan membuat semua teks bold.
- Gunakan `tabular-nums` untuk saldo, harga, quantity, komisi, dan nilai finansial lainnya.
- Pastikan nilai numerik dan mata uang mudah dibandingkan.
- Gunakan line-height dan panjang baris yang nyaman dibaca.

3. Spacing yang sistematis
- Gunakan spacing token project secara konsisten.
- Jika belum tersedia, pertahankan pola skala seperti 4, 8, 12, 16, 24, 32, dan 48 px.
- Gunakan proximity untuk menunjukkan hubungan antar-elemen.
- Berikan ruang yang cukup tanpa membuat halaman terasa kosong atau boros ruang.
- Jaga alignment vertikal dan horizontal dengan disiplin.

4. Warna yang terkendali
- Gunakan warna netral sebagai warna dominan.
- Gunakan satu accent color yang konsisten dengan brand.
- Gunakan warna status hanya jika memiliki makna data.
- Jangan menyampaikan status hanya melalui warna.
- Pastikan contrast memenuhi accessibility.
- Jangan menambahkan variasi warna yang tidak memiliki fungsi.

5. Surface dan depth yang subtle
- Gunakan perbedaan surface, border tipis, divider, dan shadow lembut.
- Jangan membungkus setiap informasi di dalam card.
- Kelompokkan informasi menggunakan spacing, alignment, section, dan divider.
- Gunakan radius secara konsisten dan proporsional.
- Jangan membuat semua elemen berbentuk pill.
- Hindari shadow besar, border bertumpuk, blur, glow, dan efek floating.

6. Penyajian data
- Format mata uang, harga, tanggal, waktu, quantity, status, dan nilai transaksi secara konsisten.
- Pastikan alignment angka dan metadata mudah dipindai.
- Bedakan status secara jelas menggunakan label, icon, dan warna yang proporsional.
- Jangan membuat data, statistik, atau chart yang tidak tersedia.
- Rapikan truncation, wrapping, overflow, pagination, dan responsive behavior.
- Pertahankan precision data dan seluruh aturan bisnis existing.

7. Form dan action
- Pertahankan validation, error message, disabled state, loading state, dan submission flow.
- Gunakan label yang jelas dan spesifik.
- Berikan feedback yang tepat untuk success, error, pending, dan destructive action.
- Pertahankan confirmation flow untuk tindakan berisiko.
- Jangan menambahkan modal atau confirmation yang tidak diperlukan.
- Jangan menyembunyikan action penting di balik menu tanpa alasan.

8. Table dan list
- Buat tabel dan daftar mudah dipindai.
- Gunakan alignment, column width, hierarchy, dan whitespace secara konsisten.
- Prioritaskan informasi yang paling penting.
- Jangan memenuhi setiap row dengan badge dan icon.
- Gunakan hover state yang subtle.
- Gunakan responsive pattern existing untuk tampilan mobile.
- Jangan menghilangkan informasi penting hanya agar tabel terlihat minimalis.

9. Motion
- Gunakan transition halus sekitar 150–250 ms jika sesuai pattern project.
- Animasi hanya boleh memberikan feedback atau menjelaskan perubahan state.
- Jangan menggunakan bounce, floating animation, parallax, atau hover transform berlebihan.
- Hormati `prefers-reduced-motion` jika project mendukungnya.

10. Responsive design
- Jangan hanya mengecilkan layout desktop.
- Sesuaikan hierarchy, action placement, spacing, navigation, table, dan form untuk setiap ukuran layar.
- Pastikan area klik nyaman digunakan pada perangkat sentuh.
- Hindari horizontal overflow yang tidak diperlukan.
- Tampilan mobile harus terasa sengaja dirancang.

11. Accessibility dan trust
- Gunakan semantic structure yang tepat.
- Pertahankan keyboard navigation dan screen reader behavior.
- Pastikan seluruh interactive element memiliki focus-visible state.
- Pastikan label, helper text, dan error message terhubung dengan benar.
- Jangan menyembunyikan informasi penting demi estetika.
- Seluruh halaman harus terasa aman, stabil, dan kredibel.

Aturan penggunaan komponen:
- Prioritaskan komponen internal project yang sudah tersedia.
- Periksa shared layout, button, card, table, dialog, sheet, dropdown, tabs, badge, skeleton, tooltip, pagination, form controls, dan komponen marketplace.
- Gunakan komponen `shadcn/ui` atau package berbasis shadcn yang sudah terpasang.
- Gunakan urutan prioritas:
  1. Komponen internal project yang sudah digunakan halaman lain.
  2. Komponen shadcn/ui yang sudah tersedia.
  3. Komponen dari package turunan shadcn yang sudah terpasang.
  4. Implementasi minimal jika tidak tersedia komponen yang sesuai.
- Jangan membuat ulang primitive yang sudah disediakan shadcn/Radix.
- Gunakan variant dan design token existing.
- Gunakan icon library existing dengan ukuran dan stroke yang konsisten.
- Jangan menggunakan emoji sebagai icon.
- Jangan menambahkan dependency atau icon library baru.
- Jangan menggunakan tampilan default shadcn tanpa menyesuaikannya dengan design system project.
- Jangan mengubah shared component jika berisiko menyebabkan regresi pada halaman di luar scope.
- Jika shared component harus diubah, pastikan backward-compatible.

Anti AI-slop:
- Jangan menghasilkan dashboard generik seperti template buatan AI.
- Jangan menggunakan gradient mencolok, glassmorphism, glow, aurora, decorative blob, noise, atau grid dekoratif.
- Jangan menggunakan warna emas sebagai simbol kemewahan.
- Jangan membungkus semua informasi dalam card.
- Jangan membuat semua elemen berbentuk pill.
- Jangan menggunakan terlalu banyak badge, icon, radius, shadow, atau variasi button.
- Jangan membuat hero section besar yang membuang ruang.
- Jangan menambahkan ilustrasi, statistik, chart, atau teks marketing tanpa fungsi dan data aktual.
- Jangan menambahkan icon pada setiap label.
- Jangan menggunakan animasi dekoratif.
- Jangan meniru desain Dribbble yang menarik tetapi tidak praktis.
- Jangan menambahkan subtitle generik hanya untuk mengisi ruang.
- Jangan menciptakan bahasa desain baru yang bertentangan dengan halaman lain.
- Jangan membuat perubahan visual besar yang tidak meningkatkan usability.
- Jika sebuah elemen tidak meningkatkan pemahaman, kepercayaan, atau efisiensi pengguna, jangan tambahkan.

Batasan implementasi:
- Pertahankan business logic, API contract, route, schema, tipe data, permission, dan public interface.
- Jangan menghapus atau mengurangi fitur existing.
- Jangan membuat data dummy atau placeholder palsu.
- Jangan mengubah behavior hanya untuk menyesuaikan desain.
- Jangan melakukan refactor di luar folder marketplace kecuali benar-benar diperlukan untuk menggunakan shared component existing.
- Jangan membuat helper, abstraction, atau file baru jika belum dibutuhkan.
- Jangan membuat test file.
- Jangan membuat dokumentasi, komentar kode, TODO, FIXME, atau NOTE.
- Jangan menjalankan build, development server, atau validasi berat.
- Jangan menambahkan dependency baru.
- Gunakan TypeScript secara strict.
- Ikuti naming convention, architecture, dan formatting existing.
- Pertahankan diff seminimal mungkin.
- Jangan menyentuh file yang tidak relevan.

Kriteria keberhasilan:
- Seluruh halaman marketplace memiliki bahasa visual yang konsisten.
- Tujuan dan primary action setiap halaman dapat dipahami dalam tiga detik.
- Hierarchy tetap kuat tanpa gradient, ilustrasi, atau dekorasi.
- Tampilan terasa premium hanya melalui typography, alignment, spacing, contrast, dan composition.
- Data mudah dibaca dan dibandingkan.
- Loading, empty, error, success, disabled, dan responsive state terasa konsisten.
- Tampilan mobile terasa dirancang secara khusus.
- Tidak ada elemen yang terlihat ditambahkan hanya untuk memenuhi ruang.
- Tidak ada halaman yang terlihat seperti shadcn default atau template dashboard generik.
- Seluruh perubahan terasa sebagai evolusi alami dari aplikasi existing.
- Seluruh fitur dan flow existing tetap berfungsi.

Kerjakan seluruh file `.tsx` secara menyeluruh dan konsisten. Mulai dengan menginventarisasi semua halaman dan pattern existing, lalu implementasikan perubahan langsung pada kode. Jangan berhenti pada analisis, rekomendasi, penjelasan, atau mockup.

Hasil akhir harus terlihat seperti produk marketplace dan fintech matang yang dirancang manusia: restrained, intentional, credible, polished, accessible, cohesive, dan usable.