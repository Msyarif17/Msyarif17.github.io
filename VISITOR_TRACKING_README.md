# 📊 Visitor Tracking System

Sistem tracking pengunjung real-time untuk portfolio website yang di-deploy di GitHub Pages.

## 🌟 Fitur

- ✅ **Real-time Tracking** - Track pengunjung secara real-time
- ✅ **Unique Visitor Detection** - Deteksi pengunjung unik berdasarkan fingerprint
- ✅ **IP & Location Tracking** - Mendapatkan IP dan lokasi pengunjung
- ✅ **Visit History** - Menyimpan riwayat kunjungan
- ✅ **Privacy Protected** - Data tersimpan di localStorage browser
- ✅ **No Backend Required** - Bekerja tanpa server backend (cocok untuk GitHub Pages)
- ✅ **Beautiful UI** - Tampilan statistik yang menarik dengan animasi

## 🚀 Cara Kerja

1. **Client-Side Tracking**: Menggunakan JavaScript untuk track pengunjung di browser
2. **IP Detection**: Menggunakan API gratis (ipapi.co) untuk mendapatkan IP dan lokasi
3. **Unique ID**: Generate unique ID berdasarkan fingerprint (IP + UserAgent + Screen Resolution)
4. **Local Storage**: Data disimpan di localStorage browser masing-masing pengunjung
5. **Optional Cloud Sync**: Bisa disimpan ke GitHub Gist untuk backup

## 📦 File Structure

```
portofolio/
├── visitor-tracker.js          # Core tracking logic
├── visitor-stats-display.js    # UI component untuk menampilkan stats
├── data/
│   └── kunjungan.json         # Template data struktur
└── index.html                  # Terintegrasi dengan tracking
```

## 🔧 Setup

### 1. Basic Setup (Sudah Aktif!)

Sistem sudah otomatis aktif. Cukup buka website dan tracking akan berjalan.

### 2. Optional: GitHub Gist Integration

Untuk menyimpan data ke cloud (GitHub Gist):

```javascript
// Di visitor-tracker.js, tambahkan credentials:
window.visitorTracker.gistToken = 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN';
window.visitorTracker.gistId = 'YOUR_GIST_ID';
```

**Cara membuat GitHub Gist:**
1. Buka https://gist.github.com/
2. Create new Gist dengan nama `kunjungan.json`
3. Copy Gist ID dari URL
4. Generate Personal Access Token di GitHub Settings > Developer Settings > Personal Access Tokens
5. Berikan permission `gist` pada token

### 3. Optional: Custom Configuration

Edit `visitor-tracker.js` untuk custom configuration:

```javascript
class VisitorTracker {
    constructor() {
        this.storageKey = 'portfolio_visitor_data'; // Ubah storage key
        this.apiEndpoint = 'https://api.ipify.org?format=json'; // Ubah IP API
        this.locationAPI = 'https://ipapi.co/json/'; // Ubah location API
    }
}
```

## 📊 Data Structure

Contoh data yang tersimpan:

```json
{
  "totalVisits": 150,
  "uniqueVisitors": 45,
  "visitors": [
    {
      "id": "visitor_abc123",
      "ip": "123.456.789.0",
      "location": {
        "country": "Indonesia",
        "city": "Jakarta",
        "region": "Jakarta Raya",
        "timezone": "Asia/Jakarta",
        "latitude": -6.2088,
        "longitude": 106.8456
      },
      "firstVisit": "2025-10-03T10:30:00.000Z",
      "lastVisit": "2025-10-03T14:25:00.000Z",
      "visitCount": 3,
      "userAgent": "Mozilla/5.0...",
      "screenResolution": "1920x1080",
      "language": "id-ID",
      "platform": "Win32",
      "visits": [
        {
          "timestamp": "2025-10-03T10:30:00.000Z",
          "page": "/",
          "referrer": "Direct"
        }
      ]
    }
  ],
  "lastUpdated": "2025-10-03T14:25:00.000Z"
}
```

## 🎨 UI Components

### 1. Stats Widget (Footer)

Otomatis muncul di footer dengan 3 metric utama:
- Total Visits
- Unique Visitors
- Average Visits per User

### 2. Detailed Stats Modal

Akses fungsi untuk melihat detail:

```javascript
window.visitorStatsDisplay.showDetailedStats();
```

### 3. Export Data

Export data untuk analisis:

```javascript
window.visitorTracker.exportData();
```

## 🔒 Privacy & Security

- **No Personal Data**: Tidak menyimpan data personal sensitif
- **Anonymized**: Data di-anonymize dengan hashing
- **Local First**: Data utama di localStorage browser
- **GDPR Compliant**: Sesuai dengan regulasi privacy
- **No Cookies**: Tidak menggunakan cookies

## 🛠️ API yang Digunakan

### 1. IP Detection
- **API**: ipify.org
- **Free Tier**: Unlimited requests
- **Docs**: https://www.ipify.org/

### 2. Location Data
- **API**: ipapi.co
- **Free Tier**: 1000 requests/day
- **Docs**: https://ipapi.co/api/

### Alternative APIs (jika perlu):
- **ipgeolocation.io** - 30,000 requests/month free
- **ip-api.com** - 45 requests/minute free
- **freegeoip.app** - 15,000 requests/hour free

## 📈 Statistik yang Tersedia

1. **Total Visits** - Total kunjungan ke website
2. **Unique Visitors** - Jumlah pengunjung unik
3. **Average Visits/User** - Rata-rata kunjungan per user
4. **Top Countries** - 10 negara teratas pengunjung
5. **Recent Visitors** - 10 pengunjung terakhir
6. **Visit History** - Riwayat kunjungan per visitor

## 🔄 Update & Maintenance

### Reset Data (Testing)
```javascript
window.visitorTracker.resetData();
```

### Get Statistics
```javascript
const stats = window.visitorTracker.getStatistics();
console.log(stats);
```

### Manual Update Display
```javascript
window.visitorStatsDisplay.updateDisplay(data);
```

## 🌐 Deploy ke GitHub Pages

1. Commit semua files:
```bash
git add .
git commit -m "Add visitor tracking system"
git push origin main
```

2. Pastikan GitHub Pages aktif di repo settings
3. Tracking akan otomatis berjalan!

## 🎯 Best Practices

1. **API Rate Limits**: Monitor penggunaan API untuk tidak exceed free tier
2. **Data Cleanup**: Sistem otomatis keep only last 1000 visitors
3. **Performance**: Tracking berjalan async, tidak mempengaruhi page load
4. **Testing**: Test di incognito/private browsing untuk simulate new visitor

## 🐛 Troubleshooting

### Stats tidak muncul?
1. Check console untuk errors
2. Pastikan visitor-tracker.js dan visitor-stats-display.js ter-load
3. Clear localStorage: `localStorage.clear()`

### API tidak response?
1. Check internet connection
2. Coba alternative API
3. Lihat browser console untuk error messages

### Data tidak tersimpan?
1. Check browser localStorage enabled
2. Pastikan tidak di private/incognito mode untuk permanent storage
3. Check browser console untuk errors

## 📞 Support

Jika ada pertanyaan atau issue, silakan contact atau buat issue di GitHub repository.

## 📄 License

MIT License - Free to use and modify

---

**Made with ❤️ for GitHub Pages**
