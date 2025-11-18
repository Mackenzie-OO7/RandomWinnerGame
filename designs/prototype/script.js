// ============================================
// SwiftChain - Nigerian Logistics Platform
// Solana-Powered Supply Chain Tracking
// ============================================

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
    stats: {
        marketSize: 10.95, // $10.95B market
        solanaTPS: 65000,
        blockTime: 400, // ms
        txCost: 0.00003 // $
    },
    shipments: [],
    sensors: {
        temperature: 24.5,
        humidity: 62,
        locationActive: true,
        containerSecure: true
    },
    walletConnected: false
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeStats();
    initializeTracking();
    initializeSensors();
    initializeWalletConnection();
    initializeScrollEffects();
    startLiveUpdates();
});

// ============================================
// STATS ANIMATION
// ============================================
function initializeStats() {
    const statValues = document.querySelectorAll('.stat-value');

    // Animate each stat
    if (statValues[0]) animateValue(statValues[0], 0, 10.95, '$', 'B', 2000);
    if (statValues[1]) animateValue(statValues[1], 0, 65000, '', '', 2000);
    if (statValues[2]) animateValue(statValues[2], 0, 400, '', 'ms', 2000);
    if (statValues[3]) animateValue(statValues[3], 0, 0.00003, '$', '', 2000);
}

function animateValue(element, start, end, prefix, suffix, duration) {
    const startTime = Date.now();
    const range = end - start;

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOutQuart);

        if (prefix === '$' && end < 1) {
            element.textContent = prefix + current.toFixed(5);
        } else if (end > 1000) {
            element.textContent = prefix + current.toFixed(0).toLocaleString() + suffix;
        } else {
            element.textContent = prefix + current.toFixed(2) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// SHIPMENT TRACKING
// ============================================
function initializeTracking() {
    const trackButton = document.querySelector('.btn-track');
    const trackingInput = document.querySelector('#trackingInput');

    if (trackButton) {
        trackButton.addEventListener('click', () => {
            const trackingId = trackingInput.value;
            handleTrackingRequest(trackingId);
        });
    }

    // Simulate progress checkpoint advancement
    setInterval(() => {
        updateCheckpointProgress();
    }, 10000);
}

function handleTrackingRequest(trackingId) {
    console.log('Tracking shipment:', trackingId);

    // Animate tracking input
    const inputGroup = document.querySelector('.input-group');
    inputGroup.style.borderColor = 'var(--nigeria-green)';
    inputGroup.style.boxShadow = 'var(--shadow-glow-green)';

    setTimeout(() => {
        inputGroup.style.borderColor = '';
        inputGroup.style.boxShadow = '';
        showTrackingConfirmation();
    }, 500);
}

function showTrackingConfirmation() {
    const notification = createNotification(
        '🚚',
        'Shipment tracking updated • Blockchain verified',
        '#00A862'
    );
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function updateCheckpointProgress() {
    const activeCheckpoint = document.querySelector('.progress-checkpoint.active');
    const pendingCheckpoints = document.querySelectorAll('.progress-checkpoint.pending');

    if (activeCheckpoint && pendingCheckpoints.length > 0) {
        // Move active to completed
        activeCheckpoint.classList.remove('active');
        activeCheckpoint.classList.add('completed');

        // Move first pending to active
        pendingCheckpoints[0].classList.remove('pending');
        pendingCheckpoints[0].classList.add('active');

        // Update checkpoint details
        const checkpointTime = activeCheckpoint.querySelector('.checkpoint-time');
        const now = new Date();
        checkpointTime.textContent = now.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        showCheckpointNotification();
    }
}

function showCheckpointNotification() {
    const notification = createNotification(
        '📍',
        'Checkpoint reached • Location updated on Solana',
        '#0066CC'
    );
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// ============================================
// IOT SENSOR MONITORING
// ============================================
function initializeSensors() {
    setInterval(() => {
        updateTemperature();
        updateHumidity();
    }, 5000);
}

function updateTemperature() {
    const tempValue = document.querySelector('.sensor-card:nth-child(1) .sensor-value');
    if (!tempValue) return;

    // Fluctuate temperature realistically (23-26°C range for Nigerian climate)
    state.sensors.temperature += (Math.random() - 0.5) * 0.5;
    state.sensors.temperature = Math.max(23, Math.min(26, state.sensors.temperature));

    tempValue.textContent = state.sensors.temperature.toFixed(1) + '°C';

    // Check if temperature is out of normal range
    const tempIcon = document.querySelector('.temp-normal');
    const tempStatus = document.querySelector('.sensor-card:nth-child(1) .sensor-status');

    if (state.sensors.temperature > 25.5 || state.sensors.temperature < 23.5) {
        tempIcon.classList.remove('temp-normal');
        tempIcon.classList.add('temp-warning');
        tempStatus.textContent = 'Warning';
        tempStatus.classList.remove('status-normal');
        tempStatus.classList.add('status-warning');
    } else {
        tempIcon.classList.add('temp-normal');
        tempIcon.classList.remove('temp-warning');
        tempStatus.textContent = 'Normal';
        tempStatus.classList.add('status-normal');
        tempStatus.classList.remove('status-warning');
    }
}

function updateHumidity() {
    const humidityValue = document.querySelector('.sensor-card:nth-child(2) .sensor-value');
    if (!humidityValue) return;

    // Fluctuate humidity (60-70% range typical for Nigeria)
    state.sensors.humidity += (Math.random() - 0.5) * 2;
    state.sensors.humidity = Math.max(60, Math.min(70, state.sensors.humidity));

    humidityValue.textContent = Math.round(state.sensors.humidity) + '%';
}

// ============================================
// WALLET CONNECTION
// ============================================
function initializeWalletConnection() {
    const walletBtn = document.querySelector('.btn-wallet');

    if (walletBtn) {
        walletBtn.addEventListener('click', handleWalletConnection);
    }
}

function handleWalletConnection() {
    const button = document.querySelector('.btn-wallet');
    const originalHTML = button.innerHTML;

    // Show loading state
    button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke-width="2"/>
        </svg>
        Connecting...
    `;
    button.disabled = true;

    // Simulate Solana wallet connection
    setTimeout(() => {
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Connected: 7a2b...9f4c
        `;
        button.style.background = 'linear-gradient(135deg, #00A862, #006B3F)';
        state.walletConnected = true;

        showWalletConnectedMessage();
    }, 2000);
}

function showWalletConnectedMessage() {
    const welcome = document.createElement('div');
    welcome.style.cssText = `
        position: fixed;
        top: 6rem;
        right: 2rem;
        padding: 1.5rem;
        background: linear-gradient(135deg, rgba(0, 135, 81, 0.95), rgba(0, 180, 216, 0.95));
        backdrop-filter: blur(20px);
        border-radius: 1rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        max-width: 350px;
        animation: slideInRight 0.5s ease-out;
    `;

    welcome.innerHTML = `
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: white;">Solana Wallet Connected! 🚀</h3>
        <p style="font-size: 0.875rem; margin-bottom: 1rem; opacity: 0.9; color: white;">Your shipments are now tracked on Solana blockchain with 400ms confirmation.</p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span style="padding: 0.25rem 0.75rem; background: rgba(0, 0, 0, 0.3); border-radius: 1rem; font-size: 0.75rem; color: white;">✓ 65,000 TPS</span>
            <span style="padding: 0.25rem 0.75rem; background: rgba(0, 0, 0, 0.3); border-radius: 1rem; font-size: 0.75rem; color: white;">✓ $0.00003 Fees</span>
            <span style="padding: 0.25rem 0.75rem; background: rgba(0, 0, 0, 0.3); border-radius: 1rem; font-size: 0.75rem; color: white;">✓ 400ms Blocks</span>
        </div>
    `;

    document.body.appendChild(welcome);

    setTimeout(() => {
        welcome.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => welcome.remove(), 500);
    }, 6000);
}

// ============================================
// LIVE UPDATES
// ============================================
function startLiveUpdates() {
    // Periodic shipment updates
    setInterval(() => {
        if (Math.random() > 0.7) {
            showShipmentUpdate();
        }
    }, 15000);

    // Blockchain verification updates
    setInterval(() => {
        updateBlockchainProof();
    }, 8000);
}

function showShipmentUpdate() {
    const updates = [
        { icon: '📦', text: 'New shipment registered: Lagos → Port Harcourt', color: '#0066CC' },
        { icon: '✓', text: 'Customs cleared at Apapa Port', color: '#00A862' },
        { icon: '🚛', text: 'In transit: Passing Ibadan checkpoint', color: '#00B4D8' },
        { icon: '📍', text: 'GPS location updated on blockchain', color: '#FF6B35' }
    ];

    const update = updates[Math.floor(Math.random() * updates.length)];
    const notification = createNotification(update.icon, update.text, update.color);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

function updateBlockchainProof() {
    const blockHeight = document.querySelector('.proof-value:nth-child(2)');
    if (blockHeight) {
        const currentHeight = parseInt(blockHeight.textContent.replace(/,/g, ''));
        const newHeight = currentHeight + Math.floor(Math.random() * 5) + 1;
        blockHeight.textContent = newHeight.toLocaleString();
    }
}

// ============================================
// NOTIFICATION HELPER
// ============================================
function createNotification(icon, text, color) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: rgba(10, 14, 26, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-left: 3px solid ${color};
        border-radius: 0.75rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.5s ease-out;
        max-width: 400px;
    `;

    notification.innerHTML = `
        <span style="font-size: 1.5rem;">${icon}</span>
        <span style="color: white; font-weight: 600; font-size: 0.9375rem;">${text}</span>
    `;

    return notification;
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe animated elements
    const elements = document.querySelectorAll('.problem-card, .step-card, .benefit-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Parallax effect for hero
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');

                if (hero && scrolled < 800) {
                    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    hero.style.opacity = 1 - (scrolled / 800);
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// HOVER EFFECTS
// ============================================
document.querySelectorAll('.problem-card, .step-card, .benefit-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// CUSTOM ANIMATIONS (CSS-in-JS)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .temp-warning {
        background: rgba(255, 165, 0, 0.1) !important;
        color: #FFA500 !important;
    }

    .status-warning {
        background: rgba(255, 165, 0, 0.1) !important;
        color: #FFA500 !important;
    }
`;
document.head.appendChild(style);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle responsive adjustments
    }, 250);
}, { passive: true });

// ============================================
// CONSOLE LOGS
// ============================================
console.log('🚀 SwiftChain initialized');
console.log('⚡ Solana blockchain connected');
console.log('📦 Nigerian logistics tracking active');
console.log('🔒 IoT sensors monitoring');
console.log(`📊 Market size: $${state.stats.marketSize}B`);
console.log(`⚙️  Solana TPS: ${state.stats.solanaTPS.toLocaleString()}`);
console.log(`⏱️  Block time: ${state.stats.blockTime}ms`);
console.log(`💰 TX cost: $${state.stats.txCost}`);
