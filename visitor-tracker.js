/**
 * Visitor Tracker untuk GitHub Pages
 * Menggunakan IPify API untuk IP, IPapi untuk lokasi, dan localStorage untuk unique tracking
 */

class VisitorTracker {
    constructor() {
        this.storageKey = 'portfolio_visitor_data';
        this.apiEndpoint = 'https://api.ipify.org?format=json';
        this.locationAPI = 'https://ipapi.co/json/';
        this.gistToken = null; // Opsional: GitHub Personal Access Token untuk menyimpan ke Gist
        this.gistId = null; // ID Gist untuk menyimpan data
    }

    /**
     * Inisialisasi tracking visitor
     */
    async init() {
        try {
            console.log('🚀 Initializing Visitor Tracker...');
            
            // Ambil data visitor dari localStorage
            const localData = this.getLocalData();
            
            // Dapatkan IP visitor
            const visitorInfo = await this.getVisitorInfo();
            
            // Update atau create visitor data
            const updatedData = await this.updateVisitorData(localData, visitorInfo);
            
            // Simpan ke localStorage
            this.saveLocalData(updatedData);
            
            // Display visitor count
            this.displayVisitorCount(updatedData);
            
            // Opsional: Simpan ke cloud (jika token tersedia)
            if (this.gistToken && this.gistId) {
                await this.saveToGist(updatedData);
            }
            
            console.log('✅ Visitor tracked successfully:', updatedData);
            return updatedData;
            
        } catch (error) {
            console.error('❌ Error tracking visitor:', error);
            return null;
        }
    }

    /**
     * Dapatkan informasi visitor (IP dan lokasi)
     */
    async getVisitorInfo() {
        try {
            // Dapatkan IP
            const ipResponse = await fetch(this.apiEndpoint);
            const ipData = await ipResponse.json();
            const ip = ipData.ip;

            // Dapatkan lokasi dari IP
            let locationData = {
                country: 'Unknown',
                city: 'Unknown',
                region: 'Unknown',
                timezone: 'Unknown'
            };

            try {
                const locationResponse = await fetch(this.locationAPI);
                const locData = await locationResponse.json();
                
                locationData = {
                    country: locData.country_name || 'Unknown',
                    city: locData.city || 'Unknown',
                    region: locData.region || 'Unknown',
                    timezone: locData.timezone || 'Unknown',
                    latitude: locData.latitude || null,
                    longitude: locData.longitude || null
                };
            } catch (locError) {
                console.warn('⚠️ Could not fetch location data:', locError);
            }

            return {
                ip: ip,
                location: locationData,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                screenResolution: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language,
                platform: navigator.platform
            };

        } catch (error) {
            console.error('Error getting visitor info:', error);
            
            // Fallback data
            return {
                ip: 'Unknown',
                location: {
                    country: 'Unknown',
                    city: 'Unknown',
                    region: 'Unknown',
                    timezone: 'Unknown'
                },
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                screenResolution: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language,
                platform: navigator.platform
            };
        }
    }

    /**
     * Dapatkan data dari localStorage
     */
    getLocalData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : this.getDefaultData();
        } catch (error) {
            console.error('Error reading localStorage:', error);
            return this.getDefaultData();
        }
    }

    /**
     * Simpan data ke localStorage
     */
    saveLocalData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    /**
     * Default data structure
     */
    getDefaultData() {
        return {
            totalVisits: 0,
            uniqueVisitors: 0,
            visitors: [],
            lastUpdated: new Date().toISOString()
        };
    }

    /**
     * Generate unique visitor ID berdasarkan fingerprint
     */
    generateVisitorId(visitorInfo) {
        const fingerprint = `${visitorInfo.ip}-${visitorInfo.userAgent}-${visitorInfo.screenResolution}`;
        
        // Simple hash function
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        return 'visitor_' + Math.abs(hash).toString(36);
    }

    /**
     * Update data visitor
     */
    async updateVisitorData(localData, visitorInfo) {
        const visitorId = this.generateVisitorId(visitorInfo);
        
        // Cari apakah visitor sudah ada
        const existingVisitorIndex = localData.visitors.findIndex(v => v.id === visitorId);
        
        if (existingVisitorIndex !== -1) {
            // Update existing visitor
            const visitor = localData.visitors[existingVisitorIndex];
            visitor.visitCount += 1;
            visitor.lastVisit = visitorInfo.timestamp;
            visitor.visits.push({
                timestamp: visitorInfo.timestamp,
                page: window.location.pathname,
                referrer: document.referrer || 'Direct'
            });
            
            // Keep only last 50 visits per visitor
            if (visitor.visits.length > 50) {
                visitor.visits = visitor.visits.slice(-50);
            }
            
            localData.visitors[existingVisitorIndex] = visitor;
            localData.totalVisits += 1;
            
        } else {
            // New visitor
            localData.uniqueVisitors += 1;
            localData.totalVisits += 1;
            
            localData.visitors.push({
                id: visitorId,
                ip: visitorInfo.ip,
                location: visitorInfo.location,
                firstVisit: visitorInfo.timestamp,
                lastVisit: visitorInfo.timestamp,
                visitCount: 1,
                userAgent: visitorInfo.userAgent,
                screenResolution: visitorInfo.screenResolution,
                language: visitorInfo.language,
                platform: visitorInfo.platform,
                visits: [{
                    timestamp: visitorInfo.timestamp,
                    page: window.location.pathname,
                    referrer: document.referrer || 'Direct'
                }]
            });
        }
        
        localData.lastUpdated = new Date().toISOString();
        
        // Keep only last 1000 unique visitors
        if (localData.visitors.length > 1000) {
            localData.visitors = localData.visitors.slice(-1000);
        }
        
        return localData;
    }

    /**
     * Display visitor count di halaman
     */
    displayVisitorCount(data) {
        // Update counter di footer atau header
        const visitorCountElements = document.querySelectorAll('[data-visitor-count]');
        const uniqueVisitorElements = document.querySelectorAll('[data-unique-visitors]');
        
        visitorCountElements.forEach(el => {
            el.textContent = this.formatNumber(data.totalVisits);
        });
        
        uniqueVisitorElements.forEach(el => {
            el.textContent = this.formatNumber(data.uniqueVisitors);
        });
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('visitorDataUpdated', { 
            detail: data 
        }));
    }

    /**
     * Format angka dengan separator
     */
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Simpan data ke GitHub Gist (opsional)
     */
    async saveToGist(data) {
        if (!this.gistToken || !this.gistId) {
            console.warn('⚠️ Gist credentials not configured');
            return;
        }

        try {
            const response = await fetch(`https://api.github.com/gists/${this.gistId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${this.gistToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    files: {
                        'kunjungan.json': {
                            content: JSON.stringify(data, null, 2)
                        }
                    }
                })
            });

            if (response.ok) {
                console.log('✅ Data saved to Gist successfully');
            } else {
                console.error('❌ Failed to save to Gist:', response.status);
            }
        } catch (error) {
            console.error('❌ Error saving to Gist:', error);
        }
    }

    /**
     * Dapatkan statistik visitor
     */
    getStatistics() {
        const data = this.getLocalData();
        
        return {
            totalVisits: data.totalVisits,
            uniqueVisitors: data.uniqueVisitors,
            averageVisitsPerUser: data.uniqueVisitors > 0 
                ? (data.totalVisits / data.uniqueVisitors).toFixed(2) 
                : 0,
            topCountries: this.getTopCountries(data.visitors),
            recentVisitors: data.visitors.slice(-10).reverse(),
            lastUpdated: data.lastUpdated
        };
    }

    /**
     * Dapatkan top countries
     */
    getTopCountries(visitors) {
        const countryCounts = {};
        
        visitors.forEach(visitor => {
            const country = visitor.location.country;
            countryCounts[country] = (countryCounts[country] || 0) + visitor.visitCount;
        });
        
        return Object.entries(countryCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([country, count]) => ({ country, visits: count }));
    }

    /**
     * Export data untuk analisis
     */
    exportData() {
        const data = this.getLocalData();
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `visitor-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    /**
     * Reset data (untuk testing)
     */
    resetData() {
        if (confirm('Are you sure you want to reset all visitor data?')) {
            localStorage.removeItem(this.storageKey);
            console.log('✅ Visitor data reset successfully');
            location.reload();
        }
    }
}

// Export untuk digunakan di script lain
window.VisitorTracker = VisitorTracker;
