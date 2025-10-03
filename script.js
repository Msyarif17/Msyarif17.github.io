// Global data storage
let portfolioData = null;
let locomotiveScroll = null;

// Ensure Lucide icons are properly loaded
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
        console.log('Lucide icons initialized successfully');
        return true;
    } else {
        console.warn('Lucide not ready yet...');
        return false;
    }
}

// Utility function to safely initialize icons with retry
function safeInitializeLucide(callback) {
    if (initializeLucideIcons()) {
        if (callback) callback();
    } else {
        setTimeout(() => safeInitializeLucide(callback), 100);
    }
}

function calculateAge(birthdayString) {
    if (!birthdayString) return '';
    const birthday = new Date(birthdayString);
    if (Number.isNaN(birthday.getTime())) return '';
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age -= 1;
    }
    return age > 0 ? `${age} yrs` : '';
}

function getLucideIconForPlatform(platform = '') {
    const key = platform.toLowerCase();
    const iconMap = {
        linkedin: 'linkedin',
        github: 'github',
        instagram: 'instagram',
        whatsapp: 'message-circle',
        dribbble: 'dribbble',
        behance: 'browser',
        facebook: 'facebook',
        twitter: 'twitter',
        x: 'twitter'
    };
    return iconMap[key] || 'link-2';
}

function renderSocialLinks(containerId, { linkClasses = '', iconClasses = '' } = {}) {
    if (!portfolioData || !portfolioData.personal_info || !Array.isArray(portfolioData.personal_info.social)) return;
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    portfolioData.personal_info.social.forEach((item, index) => {
        const link = document.createElement('a');
        link.href = item.link || '#';
        link.target = item.link && item.link.startsWith('http') ? '_blank' : '_self';
        link.rel = 'noopener noreferrer';
        link.className = `${linkClasses}`.trim();
        link.setAttribute('aria-label', item.platform);

        link.innerHTML = `
            <i data-lucide="${getLucideIconForPlatform(item.platform)}" class="${iconClasses}"></i>
        `;

        container.appendChild(link);
    });
}

function formatLabelFromKey(key = '') {
    if (!key) return 'Field';
    return key
        .toString()
        .replace(/[_-]/g, ' ')
        .split(' ')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getContactFieldMeta(fieldKey = '') {
    const key = fieldKey.toLowerCase();
    const baseLabel = formatLabelFromKey(fieldKey);
    const metaMap = {
        fullname: {
            label: 'Full Name',
            type: 'text',
            icon: 'user',
            placeholder: 'Your full name'
        },
        email: {
            label: 'Email',
            type: 'email',
            icon: 'mail',
            placeholder: 'Your email address'
        },
        message: {
            label: 'Message',
            type: 'textarea',
            icon: 'message-square',
            placeholder: 'Your message',
            rows: 6
        },
        phone: {
            label: 'Phone Number',
            type: 'tel',
            icon: 'phone',
            placeholder: 'Your phone number'
        }
    };

    const meta = metaMap[key] || {};
    return {
        label: meta.label || baseLabel,
        type: meta.type || 'text',
        icon: meta.icon || 'edit-3',
        placeholder: meta.placeholder || `Enter your ${baseLabel.toLowerCase()}`,
        rows: meta.rows || 4,
        required: meta.required !== false
    };
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioData();
    initializeEventListeners();
    initializeScrollAnimations();
    initializeLocomotiveScroll();
});

// Load data from JSON file
async function loadPortfolioData() {
    try {
        const response = await fetch('./data/personal.json');
        portfolioData = await response.json();
        
        // Populate all sections
        populateHeroSection();
        populateAboutSection();
        populateServicesSection();
        populateResumeSection();
    populateSkillsSection();
        populatePortfolioSection();
        populateBlogSection();
        populateClientsSection();
        populateContactSection();
        
        // Initialize resume tabs after content is loaded
        initializeResumeTabs();
        
        // Initialize animations
        initializeScrollAnimations();
        safeInitializeLucide();
        
        console.log('Portfolio data loaded successfully');
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

// Hero Section
function populateHeroSection() {
    if (!portfolioData) return;
    
    const heroName = document.getElementById('hero-name');
    const heroTitle = document.getElementById('hero-title');
    const heroAvatar = document.getElementById('hero-avatar');
    const heroSocial = document.getElementById('hero-social');
    
    if (heroName) {
        const name = portfolioData.personal_info.name;
        heroName.textContent = '';
        const span = document.createElement('span');
        span.className = 'hero-name-gradient';
        span.textContent = name;
        heroName.appendChild(span);
    }
    
    if (heroTitle) {
        heroTitle.textContent = portfolioData.personal_info.title;
    }

    if (heroAvatar) {
        const avatarSrc = portfolioData.personal_info.avatar || './assets/images/my-avatar.png';
        heroAvatar.src = avatarSrc;
        heroAvatar.alt = `${portfolioData.personal_info.name} avatar`;
    }

    renderSocialLinks('hero-social', {
        linkClasses: 'text-gray-200 hover:text-white transition-colors duration-300',
        iconClasses: 'w-4 h-4'
    });
}

// About Section
function populateAboutSection() {
    if (!portfolioData) return;
    
    const aboutText = document.getElementById('about-text');
    if (aboutText) {
        const mainText = portfolioData.about?.text || portfolioData.personal_info.description || '';
        aboutText.textContent = mainText;
    }

    const personalInfo = portfolioData.personal_info || {};
    const contactInfo = personalInfo.contact || {};

    const personalName = document.getElementById('personal-name');
    if (personalName) {
        personalName.textContent = personalInfo.name || '';
    }

    const personalBirthday = document.getElementById('personal-birthday');
    if (personalBirthday) {
        personalBirthday.textContent = contactInfo.birthday || '';
    }

    const personalAge = document.getElementById('personal-age');
    if (personalAge) {
        personalAge.textContent = calculateAge(contactInfo.birthday);
    }

    const contactLocation = document.getElementById('contact-location');
    if (contactLocation) {
        contactLocation.textContent = contactInfo.location || '';
    }

    renderSocialLinks('about-social', {
        linkClasses: 'glass-effect p-2 rounded-full text-gray-300 hover:text-white transition-colors duration-300',
        iconClasses: 'w-5 h-5'
    });
}

// Services Section dengan Layout Modern Horizontal
function populateServicesSection() {
    if (!portfolioData) return;
    
    const data = portfolioData;
    const servicesGrid = document.getElementById('services-grid');
    servicesGrid.innerHTML = '';
    
    // Check if services data exists
    if (!data.what_i_am_doing || !Array.isArray(data.what_i_am_doing)) {
        console.error('No services data found in JSON');
        return;
    }
    
    console.log('Loading services:', data.what_i_am_doing.length, 'items');
    
    // Create service cards dengan layout horizontal modern
    data.what_i_am_doing.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = `group cursor-pointer transform hover:scale-[1.01] transition-all duration-300`;
        
        // Modern color schemes
        const colorSchemes = [
            { 
                bg: 'from-blue-500/10 via-blue-600/5 to-transparent',
                border: 'border-blue-500/30 group-hover:border-blue-400/50',
                icon: 'text-blue-400 group-hover:text-blue-300',
                iconBg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/30',
                accent: 'text-blue-300'
            },
            { 
                bg: 'from-emerald-500/10 via-emerald-600/5 to-transparent',
                border: 'border-emerald-500/30 group-hover:border-emerald-400/50',
                icon: 'text-emerald-400 group-hover:text-emerald-300',
                iconBg: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/30',
                accent: 'text-emerald-300'
            },
            { 
                bg: 'from-purple-500/10 via-purple-600/5 to-transparent',
                border: 'border-purple-500/30 group-hover:border-purple-400/50',
                icon: 'text-purple-400 group-hover:text-purple-300',
                iconBg: 'bg-gradient-to-br from-purple-500/20 to-purple-600/30',
                accent: 'text-purple-300'
            },
            { 
                bg: 'from-orange-500/10 via-orange-600/5 to-transparent',
                border: 'border-orange-500/30 group-hover:border-orange-400/50',
                icon: 'text-orange-400 group-hover:text-orange-300',
                iconBg: 'bg-gradient-to-br from-orange-500/20 to-orange-600/30',
                accent: 'text-orange-300'
            }
        ];
        
        // Enhanced icon mapping
        const iconMap = {
            'Web design': 'palette',
            'Web development': 'code-2',
            'Rest API': 'database',
            'Game': 'gamepad-2',
            'design': 'palette',
            'development': 'code-2',
            'api': 'database',
            'game': 'gamepad-2'
        };
        
        // Get icon name
        let iconName = iconMap[service.title] || iconMap[service.title.toLowerCase()] || 'code-2';
        const colorScheme = colorSchemes[index % colorSchemes.length];
        
        // Modern horizontal card layout
        serviceCard.innerHTML = `
            <div class="relative p-6 lg:p-8 lg:h-full rounded-2xl bg-gradient-to-r ${colorScheme.bg} backdrop-blur-sm border ${colorScheme.border} transition-all duration-500 hover:shadow-2xl overflow-hidden">
                <!-- Content Layout -->
                <div class="relative z-10 flex items-start space-x-4 lg:space-x-6">
                    <!-- Icon Section -->
                    <div class="flex-shrink-0">
                        <div class="w-16 h-16 lg:w-20 lg:h-20 ${colorScheme.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                            <i data-lucide="${iconName}" class="w-8 h-8 lg:w-10 lg:h-10 ${colorScheme.icon} stroke-2 transition-colors duration-300"></i>
                        </div>
                    </div>
                    
                    <!-- Content Section -->
                    <div class="flex-1 min-w-0">
                        <div class="mb-3 lg:mb-4">
                            <h3 class="text-xl lg:text-2xl font-bold text-white group-hover:${colorScheme.accent} transition-colors duration-300 mb-2">
                                ${service.title}
                            </h3>
                            <p class="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                                ${service.description}
                            </p>
                        </div>
                        
                        <!-- Features -->
                        <div class="flex flex-wrap gap-2 lg:gap-3">
                            ${getServiceFeatures(service.title).slice(0, 3).map(feature => 
                                `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/10 text-gray-300">
                                    <i data-lucide="check" class="w-3 h-3 ${colorScheme.icon} mr-1 stroke-2"></i>
                                    ${feature}
                                </span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <!-- Arrow -->
                    <div class="flex-shrink-0 self-center">
                        <div class="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300">
                            <i data-lucide="arrow-right" class="w-4 h-4 text-gray-400 group-hover:${colorScheme.icon} transition-colors duration-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
    
    // Initialize Lucide icons
    safeInitializeLucide(() => {
        console.log('Icons initialized for modern services section');
    });
}

// Helper function to get features for each service
function getServiceFeatures(serviceTitle) {
    const featureMap = {
        'Web design': ['Responsive Design', 'UI/UX Focus', 'Modern Aesthetic'],
        'Web development': ['Clean Code', 'Fast Performance', 'SEO Optimized'],
        'Rest API': ['Scalable Architecture', 'Secure Endpoints', 'Documentation'],
        'Game': ['Interactive UI', 'Real-time Updates', 'Multiplayer Support']
    };
    
    return featureMap[serviceTitle] || ['Professional Quality', 'Best Practices', 'Timely Delivery'];
}

// Skills Section
function populateSkillsSection() {
    if (!portfolioData) return;

    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = '';

    const skills = portfolioData.skills;
    if (!Array.isArray(skills) || skills.length === 0) {
        console.error('No skills data found in JSON');
        return;
    }

    const cardAccents = [
        { ring: 'ring-1 ring-blue-400/40', bar: 'from-blue-400 via-blue-500 to-blue-300' },
        { ring: 'ring-1 ring-emerald-400/40', bar: 'from-emerald-400 via-emerald-500 to-emerald-300' },
        { ring: 'ring-1 ring-purple-400/40', bar: 'from-purple-400 via-purple-500 to-purple-300' },
        { ring: 'ring-1 ring-orange-400/40', bar: 'from-orange-400 via-orange-500 to-orange-300' }
    ];

    skills.forEach((skill, index) => {
        const accent = cardAccents[index % cardAccents.length];
        const rawProficiency = skill.proficiency || '0%';
        const parsedValue = typeof rawProficiency === 'number'
            ? rawProficiency
            : parseInt(String(rawProficiency).replace(/[^0-9]/g, ''), 10);
        const clampedValue = Number.isFinite(parsedValue) ? Math.min(Math.max(parsedValue, 0), 100) : 0;
        const displayValue = skill.proficiency || `${clampedValue}%`;

        const skillCard = document.createElement('div');
        skillCard.className = `glass-effect rounded-xl lg:rounded-2xl p-5 lg:p-6 hover-scale fade-in stagger-${(index % 4) + 1} ${accent.ring}`;

        skillCard.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg lg:text-xl font-semibold text-white">${skill.name || 'Skill'}</h3>
                <span class="px-3 py-1 bg-white/10 text-gray-200 text-xs font-medium rounded-full">${displayValue}</span>
            </div>
            <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                <div class="skill-bar h-2 rounded-full bg-gradient-to-r ${accent.bar}" style="width: ${clampedValue}%;"></div>
            </div>
            ${skill.description ? `<p class="text-gray-400 text-sm">${skill.description}</p>` : ''}
        `;

        skillsGrid.appendChild(skillCard);
    });
}

// Clients Section
function populateClientsSection() {
    if (!portfolioData) return;
    
    const clientsGrid = document.getElementById('clients-grid');
    if (!clientsGrid) return;
    
    clientsGrid.innerHTML = '';
    
    // Check if clients data exists
    if (!portfolioData.clients || !Array.isArray(portfolioData.clients)) {
        console.error('No clients data found in JSON');
        return;
    }
    
    portfolioData.clients.forEach((client, index) => {
        const clientCard = document.createElement('div');
        clientCard.className = `glass-effect rounded-xl p-4 hover-scale text-center fade-in stagger-${index + 1}`;
        
        clientCard.innerHTML = `
            <a href="${client.link}" target="_blank" rel="noopener noreferrer" class="block">
                <img src="${client.logo}" alt="${client.name}" loading="lazy" class="w-full h-20 object-contain mb-3">
                <p class="text-sm text-gray-300 truncate">${client.name}</p>
            </a>
        `;
        
        clientsGrid.appendChild(clientCard);
    });
}

// Resume Section
function populateResumeSection() {
    if (!portfolioData) return;
    
    // Check if resume data exists
    if (!portfolioData.resume) {
        console.error('No resume data found in JSON');
        return;
    }
    
    const { resume } = portfolioData;
    
    // Experience Timeline with Enhanced Design
    const experienceTimeline = document.getElementById('experience-timeline');
    if (experienceTimeline && resume.experience && Array.isArray(resume.experience)) {
        experienceTimeline.innerHTML = '';
        
        resume.experience.forEach((exp, index) => {
            const expItem = document.createElement('div');
            expItem.className = `timeline-item fade-in stagger-${(index % 4) + 1}`;
            expItem.setAttribute('data-scroll', '');
            expItem.setAttribute('data-scroll-speed', (0.3 + (index % 3) * 0.2).toFixed(1));
            
            // Extract skills if they exist in description
            let skillsHtml = '';
            if (exp.skills && Array.isArray(exp.skills)) {
                skillsHtml = `
                    <div class="flex flex-wrap gap-2 mt-4 ${window.innerWidth >= 1024 && index % 2 === 0 ? 'justify-end' : ''}">
                        ${exp.skills.map(skill => `
                            <span class="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 hover:scale-110 transition-transform duration-300">
                                ${skill}
                            </span>
                        `).join('')}
                    </div>
                `;
            }
            
            expItem.innerHTML = `
                <div class="timeline-dot hidden lg:block"></div>
                <div class="timeline-content">
                    <div class="timeline-card glass-effect-strong rounded-2xl p-6 lg:p-8 hover-scale relative overflow-hidden group">
                        <!-- Decorative gradient overlay -->
                        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div class="relative z-10">
                            <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 ${window.innerWidth >= 1024 && index % 2 === 0 ? 'lg:flex-row-reverse' : ''}">
                                <div class="mb-3 lg:mb-0 ${window.innerWidth >= 1024 && index % 2 === 0 ? 'lg:text-right' : ''}">
                                    ${exp.years ? `
                                        <div class="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full text-sm font-semibold text-blue-300 mb-3 shadow-lg shadow-blue-500/20 border border-blue-500/30">
                                            <i data-lucide="calendar" class="w-4 h-4 mr-2"></i>
                                            ${exp.years}
                                        </div>
                                    ` : ''}
                                    <h3 class="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                        ${exp.title || exp.position || 'Experience Role'}
                                    </h3>
                                    ${exp.company ? `
                                        <div class="flex items-center gap-2 text-gray-300 text-base ${window.innerWidth >= 1024 && index % 2 === 0 ? 'lg:justify-end' : ''}">
                                            <i data-lucide="building" class="w-4 h-4"></i>
                                            <p>${exp.company}</p>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                            
                            ${exp.description ? `
                                <div class="relative pl-4 border-l-2 border-gradient-to-b from-blue-500/50 to-purple-500/50 mb-4">
                                    <p class="text-gray-300 text-sm lg:text-base leading-relaxed">
                                        ${exp.description}
                                    </p>
                                </div>
                            ` : ''}
                            
                            ${skillsHtml}
                        </div>
                        
                        <!-- Bottom accent line -->
                        <div class="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
                    </div>
                </div>
            `;
            
            experienceTimeline.appendChild(expItem);
        });
        
        // Re-initialize Lucide icons for new elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Education Timeline with Enhanced Design
    const educationTimeline = document.getElementById('education-timeline');
    if (educationTimeline && resume.education && Array.isArray(resume.education)) {
        educationTimeline.innerHTML = '';
        
        resume.education.forEach((edu, index) => {
            const eduItem = document.createElement('div');
            eduItem.className = `timeline-item fade-in stagger-${(index % 4) + 1}`;
            eduItem.setAttribute('data-scroll', '');
            eduItem.setAttribute('data-scroll-speed', (0.3 + (index % 3) * 0.2).toFixed(1));
            
            // Extract subjects/courses if they exist
            let coursesHtml = '';
            if (edu.courses && Array.isArray(edu.courses)) {
                coursesHtml = `
                    <div class="flex flex-wrap gap-2 mt-4 ${window.innerWidth >= 1024 && index % 2 === 0 ? 'justify-end' : ''}">
                        ${edu.courses.map(course => `
                            <span class="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30 hover:scale-110 transition-transform duration-300">
                                ${course}
                            </span>
                        `).join('')}
                    </div>
                `;
            }
            
            eduItem.innerHTML = `
                <div class="timeline-dot hidden lg:block"></div>
                <div class="timeline-content">
                    <div class="timeline-card glass-effect-strong rounded-2xl p-6 lg:p-8 hover-scale relative overflow-hidden group">
                        <!-- Decorative gradient overlay -->
                        <div class="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div class="relative z-10">
                            ${edu.years ? `
                                <div class="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full text-sm font-semibold text-green-300 mb-3 shadow-lg shadow-green-500/20 border border-green-500/30">
                                    <i data-lucide="calendar" class="w-4 h-4 mr-2"></i>
                                    ${edu.years}
                                </div>
                            ` : ''}
                            
                            <h3 class="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                                ${edu.degree || edu.school || 'Education'}
                            </h3>
                            
                            ${edu.degree && edu.school ? `
                                <div class="flex items-center gap-2 text-gray-300 text-base mb-3">
                                    <i data-lucide="graduation-cap" class="w-4 h-4"></i>
                                    <p>${edu.school}</p>
                                </div>
                            ` : !edu.degree && edu.school ? `
                                <div class="flex items-center gap-2 text-gray-300 text-base mb-3">
                                    <i data-lucide="graduation-cap" class="w-4 h-4"></i>
                                    <p>${edu.school}</p>
                                </div>
                            ` : ''}
                            
                            ${edu.description ? `
                                <div class="relative pl-4 border-l-2 border-gradient-to-b from-green-500/50 to-emerald-500/50 mb-4">
                                    <p class="text-gray-300 text-sm lg:text-base leading-relaxed">
                                        ${edu.description}
                                    </p>
                                </div>
                            ` : ''}
                            
                            ${coursesHtml}
                        </div>
                        
                        <!-- Bottom accent line -->
                        <div class="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-500"></div>
                    </div>
                </div>
            `;
            
            educationTimeline.appendChild(eduItem);
        });
        
        // Re-initialize Lucide icons for new elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Observe timeline items for animation
    observeTimelineItems();
}

// Observe timeline items for scroll animation
function observeTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        timelineItems.forEach(item => observer.observe(item));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        timelineItems.forEach(item => item.classList.add('visible'));
    }
}

// Initialize Resume Tabs Functionality
function initializeResumeTabs() {
    const tabButtons = document.querySelectorAll('.resume-tab-btn');
    const tabContents = document.querySelectorAll('.resume-tab-content');
    
    console.log('Initializing Resume Tabs...', {
        tabButtons: tabButtons.length,
        tabContents: tabContents.length
    });
    
    if (!tabButtons.length || !tabContents.length) {
        console.error('Resume tabs not found!');
        return;
    }
    
    tabButtons.forEach((button, index) => {
        console.log(`Adding click listener to button ${index}:`, button.getAttribute('data-tab'));
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTab = this.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show target tab content
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Trigger animation for timeline items
                const timelineItems = targetContent.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s ease-out';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Update Locomotive Scroll
                setTimeout(() => {
                    if (locomotiveScroll) {
                        locomotiveScroll.update();
                    }
                }, 400);
            }
        });
    });
    
    console.log('Resume tabs initialized successfully!');
    
    // Reinitialize icons after populating
    safeInitializeLucide();
}

// Portfolio Section
function populatePortfolioSection() {
    if (!portfolioData) return;
    
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = '';
    
    // Check if portfolio data exists and has projects
    if (!portfolioData.portfolio || !portfolioData.portfolio.projects || !Array.isArray(portfolioData.portfolio.projects)) {
        console.error('No portfolio projects data found in JSON');
        return;
    }
    
    portfolioData.portfolio.projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = `portfolio-card-wrapper`;
        projectCard.setAttribute('data-scroll', '');
        projectCard.setAttribute('data-scroll-speed', (1).toFixed(1));
        projectCard.setAttribute('data-category', project.category.toLowerCase());
        
        // Determine category class
        let categoryClass = 'web';
        const catLower = project.category.toLowerCase();
        if (catLower.includes('api') || catLower.includes('backend')) categoryClass = 'api';
        else if (catLower.includes('game')) categoryClass = 'game';
        else if (catLower.includes('design') || catLower.includes('ui')) categoryClass = 'design';
        
        projectCard.innerHTML = `
            <article class="portfolio-card">
                <!-- Image Section -->
                <div class="portfolio-image-container">
                    <img src="${project.image}" 
                         alt="${project.title}" 
                         loading="lazy" 
                         class="portfolio-image">
                    
                    <!-- Hover Overlay with Actions -->
                    <div class="portfolio-overlay">
                        <div class="portfolio-quick-actions">
                            <a href="${project.link}" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               class="portfolio-action-btn primary"
                               onclick="event.stopPropagation()">
                                <i data-lucide="external-link" class="w-4 h-4"></i>
                                Live Demo
                            </a>
                            ${project.github_link ? `
                            <a href="${project.github_link}" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               class="portfolio-action-btn secondary"
                               onclick="event.stopPropagation()">
                                <i data-lucide="github" class="w-4 h-4"></i>
                                Source Code
                            </a>` : ''}
                        </div>
                    </div>
                </div>
                
                <!-- Content Section -->
                <div class="portfolio-content">
                    <!-- Category Badge -->
                    <div class="portfolio-category ${categoryClass}">
                        <i data-lucide="${getCategoryIcon(categoryClass)}" class="w-3 h-3"></i>
                        ${project.category}
                    </div>
                    
                    <!-- Title -->
                    <h3 class="portfolio-title">${project.title}</h3>
                    
                    <!-- Description -->
                    <p class="portfolio-description">
                        ${project.description || 'A comprehensive project showcasing modern web development practices and cutting-edge technologies.'}
                    </p>
                    
                    <!-- Tech Stack -->
                    ${project.technologies ? `
                    <div class="portfolio-tech-stack">
                        ${project.technologies.slice(0, 5).map(tech => 
                            `<span class="portfolio-tech-tag">${tech}</span>`
                        ).join('')}
                        ${project.technologies.length > 5 ? `<span class="portfolio-tech-tag">+${project.technologies.length - 5}</span>` : ''}
                    </div>` : ''}
                </div>
            </article>
        `;
        
        portfolioGrid.appendChild(projectCard);
    });
    
    // Initialize filter functionality
    initializePortfolioFilter();
    
    // Refresh Locomotive Scroll after adding items
    setTimeout(() => {
        if (locomotiveScroll) {
            locomotiveScroll.update();
        }
        safeInitializeLucide();
    }, 100);
}

// Helper function to get category icon
function getCategoryIcon(category) {
    const iconMap = {
        'web': 'globe',
        'api': 'server',
        'game': 'gamepad-2',
        'design': 'palette'
    };
    return iconMap[category] || 'code-2';
}

// Initialize Portfolio Filter
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-card-wrapper');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items with animation
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('is-inview');
                    }, index * 50);
                } else {
                    item.classList.remove('is-inview');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Update Locomotive Scroll
            setTimeout(() => {
                if (locomotiveScroll) {
                    locomotiveScroll.update();
                }
            }, 400);
        });
    });
    
    // Trigger initial animation
    setTimeout(() => {
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('is-inview');
            }, index * 100);
        });
    }, 200);
}

// Blog Section
function populateBlogSection() {
    if (!portfolioData) return;
    
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;
    
    blogGrid.innerHTML = '';
    
    // Check if blog data exists
    if (!portfolioData.blog || !Array.isArray(portfolioData.blog)) {
        console.error('No blog data found in JSON');
        return;
    }
    
    portfolioData.blog.forEach((post, index) => {
        const blogCard = document.createElement('div');
        blogCard.className = `group glass-effect rounded-xl lg:rounded-2xl overflow-hidden hover-scale fade-in stagger-${(index % 4) + 1}`;
        
        blogCard.innerHTML = `
            <div class="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <img src="${post.image}" alt="${post.title}" loading="lazy" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-4 left-4">
                    <span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">${post.category}</span>
                </div>
            </div>
            <div class="p-4 lg:p-6">
                <div class="flex items-center text-xs text-gray-400 mb-2">
                    <i data-lucide="calendar" class="w-3 h-3 mr-1"></i>
                    ${post.date}
                    ${post.read_time ? `<span class="mx-2">•</span>
                    <i data-lucide="clock" class="w-3 h-3 mr-1"></i>
                    ${post.read_time}` : ''}
                </div>
                <h3 class="text-lg lg:text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">${post.title}</h3>
                <p class="text-gray-400 text-sm lg:text-base">${post.text || post.excerpt || ''}</p>
            </div>
        `;
        
        blogGrid.appendChild(blogCard);
    });
}

// Contact Section
function populateContactSection() {
    if (!portfolioData) return;
    
    const personalInfo = portfolioData.personal_info || {};
    const contactInfo = personalInfo.contact || {};
    const contactFormData = portfolioData.contact_form || {};

    const contactEmail = document.getElementById('contact-email');
    if (contactEmail) {
        const emailValue = contactInfo.email || '';
        contactEmail.textContent = emailValue;
        if (emailValue) {
            contactEmail.href = `mailto:${emailValue}`;
        }
    }

    const contactPhone = document.getElementById('contact-phone');
    if (contactPhone) {
        const phoneValue = contactInfo.phone || '';
        contactPhone.textContent = phoneValue;
        if (phoneValue) {
            contactPhone.href = `tel:${phoneValue}`;
        }
    }

    const contactLocation = document.getElementById('contact-location');
    if (contactLocation) {
        contactLocation.textContent = contactInfo.location || '';
    }

    const contactMap = document.getElementById('contact-map');
    if (contactMap && contactFormData.map_link) {
        contactMap.src = contactFormData.map_link;
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        if (contactFormData.form_action) {
            contactForm.setAttribute('action', contactFormData.form_action);
        } else {
            contactForm.removeAttribute('action');
        }

        const inputKeys = Array.isArray(contactFormData.inputs) && contactFormData.inputs.length
            ? contactFormData.inputs
            : ['fullname', 'email', 'message'];

        contactForm.innerHTML = '';

        inputKeys.forEach((fieldKey, index) => {
            const meta = getContactFieldMeta(fieldKey);
            const elementId = fieldKey.toLowerCase();
            const fieldWrapper = document.createElement('div');

            const label = document.createElement('label');
            label.setAttribute('for', elementId);
            label.className = 'block text-white font-medium mb-2';
            label.innerHTML = `
                <i data-lucide="${meta.icon}" class="w-4 h-4 inline mr-2"></i>
                ${meta.label}
            `;

            fieldWrapper.appendChild(label);

            if (meta.type === 'textarea') {
                const textarea = document.createElement('textarea');
                textarea.id = elementId;
                textarea.name = fieldKey;
                textarea.rows = meta.rows;
                textarea.className = 'w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none';
                textarea.placeholder = meta.placeholder;
                if (meta.required) textarea.required = true;
                fieldWrapper.appendChild(textarea);
            } else {
                const input = document.createElement('input');
                input.type = meta.type;
                input.id = elementId;
                input.name = fieldKey;
                input.className = 'w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300';
                input.placeholder = meta.placeholder;
                if (meta.required) input.required = true;
                fieldWrapper.appendChild(input);
            }

            contactForm.appendChild(fieldWrapper);
        });

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'w-full px-8 py-3 glass-effect rounded-lg hover-scale text-white font-medium flex items-center justify-center';
        submitBtn.innerHTML = `
            <i data-lucide="send" class="w-4 h-4 mr-2"></i>
            <span id="form-btn-text">${contactFormData.form_btn_text || 'Send Message'}</span>
        `;

        contactForm.appendChild(submitBtn);
    }

    const footerLocation = document.getElementById('footer-location');
    if (footerLocation) {
        footerLocation.textContent = contactInfo.location || '';
    }

    const footerEmail = document.getElementById('footer-email');
    if (footerEmail) {
        const emailValue = contactInfo.email || '';
        footerEmail.innerHTML = emailValue ? `<a href="mailto:${emailValue}" class="text-gray-300 hover:text-white transition-colors duration-300">${emailValue}</a>` : '';
    }

    const footerPhone = document.getElementById('footer-phone');
    if (footerPhone) {
        const phoneValue = contactInfo.phone || '';
        footerPhone.innerHTML = phoneValue ? `<a href="tel:${phoneValue}" class="text-gray-300 hover:text-white transition-colors duration-300">${phoneValue}</a>` : '';
    }

    const footerName = document.getElementById('footer-name');
    if (footerName) {
        footerName.textContent = personalInfo.name || '';
    }

    renderSocialLinks('footer-social', {
        linkClasses: 'glass-effect p-2 rounded-full text-gray-300 hover:text-white transition-colors duration-300',
        iconClasses: 'w-4 h-4'
    });

    safeInitializeLucide();
}

// Event Listeners
function initializeEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for navigation links with Locomotive Scroll support
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                if (locomotiveScroll) {
                    // Use Locomotive Scroll for smooth navigation
                    locomotiveScroll.scrollTo(target, {
                        duration: 1000,
                        easing: [0.25, 0.0, 0.35, 1.0],
                        offset: -80
                    });
                } else {
                    // Fallback to native smooth scroll
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        // Show/hide based on scroll position
        const toggleBackToTop = () => {
            const scrollTop = locomotiveScroll ? 
                locomotiveScroll.scroll.instance.scroll.y : 
                window.pageYOffset;
                
            if (scrollTop > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        };
        
        if (locomotiveScroll) {
            locomotiveScroll.on('scroll', toggleBackToTop);
        } else {
            window.addEventListener('scroll', toggleBackToTop);
        }
        
        backToTopBtn.addEventListener('click', () => {
            if (locomotiveScroll) {
                locomotiveScroll.scrollTo('top', {
                    duration: 1000,
                    easing: [0.25, 0.0, 0.35, 1.0]
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize Locomotive Scroll
function initializeLocomotiveScroll() {
    // Check if Locomotive Scroll is loaded
    if (typeof LocomotiveScroll === 'undefined') {
        console.warn('Locomotive Scroll not loaded, using fallback scroll');
        return;
    }
    
    try {
        const scrollContainer = document.querySelector('[data-scroll-container]');
        if (!scrollContainer) {
            console.warn('No scroll container found');
            return;
        }
        
        locomotiveScroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            smoothMobile: false,
            multiplier: 0.8,
            class: 'is-inview',
            getSpeed: false,
            getDirection: false,
            reloadOnContextChange: true,
            touchMultiplier: 2,
            lerp: 0.08,
            smartphone: {
                smooth: false
            },
            tablet: {
                smooth: false,
                breakpoint: 1024
            }
        });
        
        // Update on images loaded
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;
        
        if (totalImages === 0) {
            if (locomotiveScroll) locomotiveScroll.update();
        } else {
            images.forEach(img => {
                const checkLoaded = () => {
                    loadedImages++;
                    if (loadedImages === totalImages && locomotiveScroll) {
                        setTimeout(() => {
                            locomotiveScroll.update();
                        }, 100);
                    }
                };
                
                if (img.complete) {
                    checkLoaded();
                } else {
                    img.addEventListener('load', checkLoaded);
                    img.addEventListener('error', checkLoaded);
                }
            });
        }
        
        // Update on window resize with debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (locomotiveScroll) {
                    locomotiveScroll.update();
                }
            }, 250);
        });
        
        // Update on scroll (optional, untuk custom effects)
        if (locomotiveScroll) {
            locomotiveScroll.on('scroll', (args) => {
                // Bisa tambahkan custom scroll effects di sini
            });
        }
        
        // Update after initial load
        setTimeout(() => {
            if (locomotiveScroll) {
                locomotiveScroll.update();
            }
        }, 500);
        
        console.log('Locomotive Scroll initialized successfully');
        
    } catch (error) {
        console.error('Error initializing Locomotive Scroll:', error);
        // Fallback to normal scroll if error
        locomotiveScroll = null;
    }
}