// ============================================
// GameForge Academy - Interactive Features
// Immutable zkEVM Gaming Platform
// ============================================

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
    currentFilter: 'all',
    userLevel: 12,
    userXP: 8450,
    xpToNextLevel: 10000,
    stats: {
        games: 440,
        users: 3300000,
        transactions: 150000000
    },
    quests: [],
    nfts: [],
    userProfile: {
        nftsOwned: 47,
        gamesPlayed: 12,
        achievements: 89
    }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeStats();
    initializeQuests();
    initializeMarketplace();
    initializePassport();
    initializeScrollEffects();
    startLiveUpdates();
});

// ============================================
// BACKGROUND ANIMATIONS
// ============================================
function initializeAnimations() {
    // Add more particles dynamically
    const particleContainer = document.querySelector('.bg-gradient');
    if (particleContainer) {
        for (let i = 6; i <= 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particleContainer.appendChild(particle);
        }
    }

    // Animated gradient background
    let hue = 0;
    setInterval(() => {
        hue = (hue + 0.1) % 360;
        const bgGradient = document.querySelector('.bg-gradient');
        if (bgGradient) {
            bgGradient.style.filter = `hue-rotate(${hue}deg)`;
        }
    }, 100);
}

// ============================================
// STATS COUNTER ANIMATION
// ============================================
function initializeStats() {
    const stats = [
        { element: document.querySelectorAll('.stat-value')[0], target: 440, suffix: '+' },
        { element: document.querySelectorAll('.stat-value')[1], target: 3.3, suffix: 'M+' },
        { element: document.querySelectorAll('.stat-value')[2], target: 150, suffix: 'M+' }
    ];

    stats.forEach(stat => {
        if (!stat.element) return;
        animateCounter(stat.element, 0, stat.target, stat.suffix, 2000);
    });

    // Update stats periodically
    setInterval(() => {
        state.stats.transactions += Math.floor(Math.random() * 1000);
        state.stats.users += Math.floor(Math.random() * 10);
        updateStatsDisplay();
    }, 5000);
}

function animateCounter(element, start, end, suffix, duration) {
    const startTime = Date.now();
    const range = end - start;

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOutQuart);

        element.textContent = current.toFixed(1) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end.toFixed(end % 1 === 0 ? 0 : 1) + suffix;
        }
    }

    requestAnimationFrame(update);
}

function updateStatsDisplay() {
    const statElements = document.querySelectorAll('.stat-value');
    if (statElements[1]) {
        statElements[1].textContent = (state.stats.users / 1000000).toFixed(1) + 'M+';
    }
    if (statElements[2]) {
        statElements[2].textContent = (state.stats.transactions / 1000000).toFixed(0) + 'M+';
    }
}

// ============================================
// QUEST SYSTEM
// ============================================
function initializeQuests() {
    const questCards = document.querySelectorAll('.quest-card');

    questCards.forEach((card, index) => {
        // Animate progress bars
        const progressFill = card.querySelector('.progress-fill');
        if (progressFill) {
            const targetWidth = progressFill.style.width;
            progressFill.style.width = '0%';
            setTimeout(() => {
                progressFill.style.width = targetWidth;
            }, 100 + (index * 100));
        }

        // Add hover sound effect simulation
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Quest action button
        const actionButton = card.querySelector('.quest-action');
        if (actionButton) {
            actionButton.addEventListener('click', (e) => {
                e.stopPropagation();
                handleQuestAction(card);
            });
        }

        // Simulate quest progress updates
        if (Math.random() > 0.7) {
            setTimeout(() => {
                updateQuestProgress(card);
            }, 3000 + (index * 2000));
        }
    });
}

function handleQuestAction(card) {
    const button = card.querySelector('.quest-action');
    const originalText = button.textContent;

    button.textContent = 'Starting...';
    button.style.background = 'rgba(16, 185, 129, 0.2)';
    button.style.borderColor = 'rgba(16, 185, 129, 0.5)';
    button.style.color = '#10B981';

    setTimeout(() => {
        button.textContent = 'In Progress';
        updateQuestProgress(card);
    }, 1500);
}

function updateQuestProgress(card) {
    const progressFill = card.querySelector('.progress-fill');
    const progressText = card.querySelector('.progress-label span:last-child');

    if (progressFill && progressText) {
        const currentWidth = parseFloat(progressFill.style.width);
        const newWidth = Math.min(currentWidth + (Math.random() * 20), 100);

        progressFill.style.width = newWidth + '%';

        const current = Math.floor((newWidth / 100) * 5);
        const total = 5;
        progressText.textContent = `${current}/${total}`;

        // Add completion animation
        if (newWidth >= 100) {
            card.classList.add('quest-completed');
            showCompletionEffect(card);
        }
    }
}

function showCompletionEffect(card) {
    const badge = document.createElement('div');
    badge.className = 'completion-badge';
    badge.innerHTML = '✓ Completed';
    badge.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1rem 2rem;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        border-radius: 0.75rem;
        font-weight: 700;
        font-size: 1.25rem;
        box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
        z-index: 10;
        animation: popIn 0.5s ease-out;
    `;

    card.style.position = 'relative';
    card.appendChild(badge);

    setTimeout(() => {
        badge.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => badge.remove(), 500);
    }, 2000);
}

// ============================================
// NFT MARKETPLACE
// ============================================
function initializeMarketplace() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const nftCards = document.querySelectorAll('.nft-card');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.textContent.toLowerCase();
            filterNFTs(filter);
        });
    });

    // NFT card interactions
    nftCards.forEach((card, index) => {
        // Stagger animation on load
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);

        // Price fluctuation
        if (Math.random() > 0.5) {
            setTimeout(() => {
                updateNFTPrice(card);
            }, 5000 + (index * 1000));
        }
    });
}

function filterNFTs(filter) {
    const nftCards = document.querySelectorAll('.nft-card');

    nftCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            const collection = card.querySelector('.nft-collection').textContent.toLowerCase();
            const matchesFilter = collection.includes(filter);

            if (matchesFilter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }
    });
}

function updateNFTPrice(card) {
    const priceElement = card.querySelector('.price');
    if (!priceElement) return;

    const priceText = priceElement.textContent;
    const currentPrice = parseFloat(priceText);

    if (isNaN(currentPrice)) return;

    const change = (Math.random() - 0.5) * 0.5;
    const newPrice = Math.max(0.1, currentPrice + change);

    priceElement.textContent = newPrice.toFixed(2);

    // Add price change indicator
    const indicator = document.createElement('span');
    indicator.style.cssText = `
        display: inline-block;
        margin-left: 0.5rem;
        font-size: 0.75rem;
        color: ${change > 0 ? '#10B981' : '#EF4444'};
    `;
    indicator.textContent = change > 0 ? '↗' : '↘';

    const existingIndicator = priceElement.querySelector('span');
    if (existingIndicator) existingIndicator.remove();

    priceElement.appendChild(indicator);

    setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => indicator.remove(), 300);
    }, 3000);
}

// ============================================
// PASSPORT SYSTEM
// ============================================
function initializePassport() {
    // Animate passport stats
    const passportStats = document.querySelectorAll('.passport-stat-value');

    passportStats.forEach((stat, index) => {
        const target = parseInt(stat.textContent);
        setTimeout(() => {
            animateCounter(stat, 0, target, '', 1500);
        }, 500 + (index * 300));
    });

    // Simulate user level progression
    setInterval(() => {
        updateUserLevel();
    }, 10000);

    // Feature chip animations
    const featureChips = document.querySelectorAll('.feature-chip');
    featureChips.forEach((chip, index) => {
        chip.style.opacity = '0';
        chip.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            chip.style.transition = 'all 0.4s ease-out';
            chip.style.opacity = '1';
            chip.style.transform = 'translateX(0)';
        }, 100 * index);
    });
}

function updateUserLevel() {
    state.userXP += Math.floor(Math.random() * 100);

    if (state.userXP >= state.xpToNextLevel) {
        state.userLevel++;
        state.userXP = 0;
        state.xpToNextLevel = Math.floor(state.xpToNextLevel * 1.2);
        showLevelUpAnimation();
    }

    // Update display
    const levelElement = document.querySelector('.user-level');
    if (levelElement) {
        levelElement.textContent = `Level ${state.userLevel} • ${state.userXP}/${state.xpToNextLevel} XP`;
    }
}

function showLevelUpAnimation() {
    const notification = document.createElement('div');
    notification.className = 'level-up-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 2rem 3rem;
            background: linear-gradient(135deg, #7B3FE4, #00D4FF);
            border-radius: 1rem;
            box-shadow: 0 0 50px rgba(123, 63, 228, 0.5);
            z-index: 1000;
            text-align: center;
            animation: scaleIn 0.5s ease-out;
        ">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉</div>
            <div style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">Level Up!</div>
            <div style="font-size: 2rem; font-weight: 800; color: #FFD700;">Level ${state.userLevel}</div>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
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
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.quest-card, .nft-card, .game-card, .benefit-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 600);
        }
    });
}

// ============================================
// LIVE UPDATES
// ============================================
function startLiveUpdates() {
    // Simulate live marketplace activity
    setInterval(() => {
        showMarketplaceNotification();
    }, 15000);

    // Update quest progress randomly
    setInterval(() => {
        const questCards = document.querySelectorAll('.quest-card:not(.quest-completed)');
        if (questCards.length > 0) {
            const randomQuest = questCards[Math.floor(Math.random() * questCards.length)];
            const progressFill = randomQuest.querySelector('.progress-fill');

            if (progressFill) {
                const currentWidth = parseFloat(progressFill.style.width) || 0;
                const newWidth = Math.min(currentWidth + 5, 100);
                progressFill.style.width = newWidth + '%';

                const progressText = randomQuest.querySelector('.progress-label span:last-child');
                if (progressText) {
                    const [current, total] = progressText.textContent.split('/').map(Number);
                    if (current < total) {
                        progressText.textContent = `${Math.min(current + 1, total)}/${total}`;
                    }
                }
            }
        }
    }, 8000);
}

function showMarketplaceNotification() {
    const activities = [
        { icon: '🎮', text: 'New NFT minted: Legendary Sword #1234', color: '#FFD700' },
        { icon: '💰', text: 'Sale: Epic Shield sold for 15 IMX', color: '#9945FF' },
        { icon: '🏆', text: 'Achievement Unlocked: First Win!', color: '#10B981' },
        { icon: '⚡', text: 'Gas-Free Transaction Complete', color: '#00D4FF' }
    ];

    const activity = activities[Math.floor(Math.random() * activities.length)];

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-left: 3px solid ${activity.color};
        border-radius: 0.75rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.5s ease-out;
    `;

    notification.innerHTML = `
        <span style="font-size: 1.5rem;">${activity.icon}</span>
        <span style="color: white; font-weight: 600;">${activity.text}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// ============================================
// WALLET CONNECTION
// ============================================
const connectWalletBtn = document.querySelector('.connect-wallet');
if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', handleWalletConnection);
}

function handleWalletConnection() {
    const button = document.querySelector('.connect-wallet');
    const originalHTML = button.innerHTML;

    button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke-width="2"/>
        </svg>
        Connecting...
    `;

    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Connected: 0x7a...4f2b
        `;
        button.style.background = 'linear-gradient(135deg, #10B981, #059669)';

        showWelcomeMessage();
    }, 2000);
}

function showWelcomeMessage() {
    const welcome = document.createElement('div');
    welcome.style.cssText = `
        position: fixed;
        top: 6rem;
        right: 2rem;
        padding: 1.5rem;
        background: linear-gradient(135deg, rgba(123, 63, 228, 0.95), rgba(0, 212, 255, 0.95));
        backdrop-filter: blur(20px);
        border-radius: 1rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        max-width: 350px;
        animation: slideInRight 0.5s ease-out;
    `;

    welcome.innerHTML = `
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">Welcome to GameForge! 🎮</h3>
        <p style="font-size: 0.875rem; margin-bottom: 1rem; opacity: 0.9;">Your Immutable Passport is connected. Start your gaming journey with gas-free transactions!</p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span style="padding: 0.25rem 0.75rem; background: rgba(0, 0, 0, 0.3); border-radius: 1rem; font-size: 0.75rem;">✓ Gas-Free</span>
            <span style="padding: 0.25rem 0.75rem; background: rgba(0, 0, 0, 0.3); border-radius: 1rem; font-size: 0.75rem;">✓ Secure</span>
            <span style="padding: 0.25rem 0.75rem; background: rgba(0, 0, 0, 0.3); border-radius: 1rem; font-size: 0.75rem;">✓ Ready to Play</span>
        </div>
    `;

    document.body.appendChild(welcome);

    setTimeout(() => {
        welcome.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => welcome.remove(), 500);
    }, 6000);
}

// ============================================
// GAME CARDS INTERACTION
// ============================================
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
        const gameTitle = card.querySelector('.game-title').textContent;
        showGameModal(gameTitle);
    });
});

function showGameModal(gameTitle) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
        cursor: pointer;
    `;

    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(8, 8, 20, 0.95));
            padding: 2rem;
            border-radius: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-width: 500px;
            cursor: default;
        " onclick="event.stopPropagation()">
            <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">${gameTitle}</h2>
            <p style="color: #9CA3AF; margin-bottom: 1.5rem;">Launch this game with your Immutable Passport. All transactions will be gas-free!</p>
            <div style="display: flex; gap: 1rem;">
                <button style="
                    flex: 1;
                    padding: 1rem;
                    background: linear-gradient(135deg, #7B3FE4, #9945FF);
                    color: white;
                    border: none;
                    border-radius: 0.75rem;
                    font-weight: 700;
                    cursor: pointer;
                ">Launch Game</button>
                <button onclick="this.closest('[style*=\"fixed\"]').remove()" style="
                    padding: 1rem 1.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.75rem;
                    font-weight: 700;
                    cursor: pointer;
                ">Cancel</button>
            </div>
        </div>
    `;

    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
}

// ============================================
// CUSTOM ANIMATIONS
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes scaleIn {
        from {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }

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

    .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Scroll-dependent updates here
    }, 100);
}, { passive: true });

// Log initialization
console.log('🎮 GameForge Academy initialized');
console.log('⚡ Immutable zkEVM features loaded');
console.log('🔒 Gas-free transactions enabled');
