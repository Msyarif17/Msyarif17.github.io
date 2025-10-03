/**
 * Visitor Stats Display Component
 * Menampilkan statistik pengunjung dengan animasi real-time
 */

class VisitorStatsDisplay {
    constructor(tracker) {
        this.tracker = tracker;
        this.animationDuration = 2000; // 2 detik
    }

    /**
     * Inisialisasi display
     */
    init() {
        // Tambahkan stats widget ke footer
        this.addStatsToFooter();
        
        // Listen untuk update data
        window.addEventListener('visitorDataUpdated', (e) => {
            this.updateDisplay(e.detail);
        });
    }

    /**
     * Tambahkan widget statistik ke footer
     */
    addStatsToFooter() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        // Cari tempat untuk insert stats (sebelum copyright)
        const copyrightSection = footer.querySelector('.text-center.text-gray-400.text-sm');
        
        if (copyrightSection) {
            const statsHTML = this.createStatsHTML();
            copyrightSection.insertAdjacentHTML('beforebegin', statsHTML);
            
            // Animate stats on load
            setTimeout(() => {
                this.animateCounters();
            }, 500);
        }
    }

    /**
     * Buat HTML untuk stats widget
     */
    createStatsHTML() {
        return `
            <div class="visitor-stats-widget max-w-4xl mx-auto mb-12" data-scroll data-scroll-speed="0.5">
                <div class="glass-effect rounded-2xl p-6 lg:p-8">
                    <div class="text-center mb-6">
                        <h3 class="text-xl lg:text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                            <i data-lucide="activity" class="w-6 h-6 text-blue-400"></i>
                            <span>Live Visitor Statistics</span>
                        </h3>
                        <p class="text-gray-400 text-sm">Real-time tracking powered by your visits</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                        <!-- Total Visits -->
                        <div class="stat-card bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                            <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i data-lucide="eye" class="w-6 h-6 text-blue-400"></i>
                            </div>
                            <div class="text-3xl lg:text-4xl font-bold text-white mb-2" data-visitor-count data-target="0">0</div>
                            <div class="text-gray-400 text-sm">Total Visits</div>
                        </div>
                        
                        <!-- Unique Visitors -->
                        <div class="stat-card bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                            <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i data-lucide="users" class="w-6 h-6 text-green-400"></i>
                            </div>
                            <div class="text-3xl lg:text-4xl font-bold text-white mb-2" data-unique-visitors data-target="0">0</div>
                            <div class="text-gray-400 text-sm">Unique Visitors</div>
                        </div>
                        
                        <!-- Average Visits -->
                        <div class="stat-card bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                            <div class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i data-lucide="trending-up" class="w-6 h-6 text-purple-400"></i>
                            </div>
                            <div class="text-3xl lg:text-4xl font-bold text-white mb-2" data-average-visits data-target="0">0</div>
                            <div class="text-gray-400 text-sm">Avg. Visits/User</div>
                        </div>
                    </div>
                    
                    <!-- Additional Info -->
                    <div class="mt-6 pt-6 border-t border-white/10">
                        <div class="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>Live Tracking Active</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i data-lucide="shield-check" class="w-3 h-3"></i>
                                <span>Privacy Protected</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i data-lucide="clock" class="w-3 h-3"></i>
                                <span class="visitor-last-updated">Updated just now</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Update display dengan data baru
     */
    updateDisplay(data) {
        const stats = this.tracker.getStatistics();
        
        // Update counters dengan animasi
        this.animateCounter('[data-visitor-count]', stats.totalVisits);
        this.animateCounter('[data-unique-visitors]', stats.uniqueVisitors);
        this.animateCounter('[data-average-visits]', parseFloat(stats.averageVisitsPerUser));
        
        // Update last updated time
        this.updateLastUpdatedTime(stats.lastUpdated);
    }

    /**
     * Animate counter dari 0 ke target value
     */
    animateCounter(selector, targetValue) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const startValue = 0;
            const duration = this.animationDuration;
            const startTime = Date.now();
            
            const animate = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (easeOutCubic)
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
                
                if (Number.isInteger(targetValue)) {
                    element.textContent = this.formatNumber(currentValue);
                } else {
                    element.textContent = currentValue.toFixed(2);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    if (Number.isInteger(targetValue)) {
                        element.textContent = this.formatNumber(targetValue);
                    } else {
                        element.textContent = targetValue.toFixed(2);
                    }
                }
            };
            
            animate();
        });
    }

    /**
     * Animate counters on page load
     */
    animateCounters() {
        const stats = this.tracker.getStatistics();
        
        this.animateCounter('[data-visitor-count]', stats.totalVisits);
        this.animateCounter('[data-unique-visitors]', stats.uniqueVisitors);
        this.animateCounter('[data-average-visits]', parseFloat(stats.averageVisitsPerUser));
    }

    /**
     * Format number dengan separator
     */
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Update last updated time dengan relative time
     */
    updateLastUpdatedTime(timestamp) {
        const element = document.querySelector('.visitor-last-updated');
        if (!element) return;
        
        const now = new Date();
        const updated = new Date(timestamp);
        const diffMs = now - updated;
        const diffMins = Math.floor(diffMs / 60000);
        
        let timeText = 'Updated just now';
        
        if (diffMins < 1) {
            timeText = 'Updated just now';
        } else if (diffMins < 60) {
            timeText = `Updated ${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        } else {
            const diffHours = Math.floor(diffMins / 60);
            timeText = `Updated ${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        }
        
        element.textContent = timeText;
    }

    /**
     * Buat modal untuk menampilkan detail statistik
     */
    showDetailedStats() {
        const stats = this.tracker.getStatistics();
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm';
        modal.innerHTML = `
            <div class="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-white">Detailed Visitor Statistics</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>
                
                <div class="space-y-6">
                    <!-- Overview -->
                    <div>
                        <h3 class="text-lg font-semibold text-white mb-4">Overview</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="glass-effect p-4 rounded-lg">
                                <div class="text-2xl font-bold text-blue-400">${this.formatNumber(stats.totalVisits)}</div>
                                <div class="text-sm text-gray-400">Total Visits</div>
                            </div>
                            <div class="glass-effect p-4 rounded-lg">
                                <div class="text-2xl font-bold text-green-400">${this.formatNumber(stats.uniqueVisitors)}</div>
                                <div class="text-sm text-gray-400">Unique Visitors</div>
                            </div>
                            <div class="glass-effect p-4 rounded-lg">
                                <div class="text-2xl font-bold text-purple-400">${stats.averageVisitsPerUser}</div>
                                <div class="text-sm text-gray-400">Avg/User</div>
                            </div>
                            <div class="glass-effect p-4 rounded-lg">
                                <div class="text-2xl font-bold text-yellow-400">${stats.topCountries.length}</div>
                                <div class="text-sm text-gray-400">Countries</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Top Countries -->
                    <div>
                        <h3 class="text-lg font-semibold text-white mb-4">Top Countries</h3>
                        <div class="space-y-2">
                            ${stats.topCountries.map((country, index) => `
                                <div class="glass-effect p-3 rounded-lg flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <span class="text-gray-400">#${index + 1}</span>
                                        <span class="text-white">${country.country}</span>
                                    </div>
                                    <span class="text-blue-400 font-semibold">${this.formatNumber(country.visits)} visits</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Recent Visitors -->
                    <div>
                        <h3 class="text-lg font-semibold text-white mb-4">Recent Visitors</h3>
                        <div class="space-y-2">
                            ${stats.recentVisitors.slice(0, 5).map(visitor => `
                                <div class="glass-effect p-3 rounded-lg">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-white">${visitor.location.city}, ${visitor.location.country}</span>
                                        <span class="text-sm text-gray-400">${visitor.visitCount} visit${visitor.visitCount > 1 ? 's' : ''}</span>
                                    </div>
                                    <div class="text-xs text-gray-500">Last: ${new Date(visitor.lastVisit).toLocaleString()}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Actions -->
                    <div class="flex gap-4">
                        <button onclick="window.visitorTracker.exportData()" class="glass-effect px-6 py-2 rounded-lg hover:bg-white/10 transition-colors text-white">
                            Export Data
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Export
window.VisitorStatsDisplay = VisitorStatsDisplay;
