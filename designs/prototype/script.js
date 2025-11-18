// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Wallet connection
const connectButton = document.querySelector('.btn-connect');
let isConnected = false;

connectButton.addEventListener('click', function() {
    if (!isConnected) {
        const originalHTML = this.innerHTML;
        this.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="spin">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="60" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
            Connecting...
        `;
        this.disabled = true;

        setTimeout(() => {
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2"/>
                </svg>
                0x7d8f...4a2c
            `;
            this.disabled = false;
            isConnected = true;
            showNotification('Wallet Connected!', 'Your wallet has been successfully connected.', 'success');
        }, 2000);
    }
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-chip');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Animate cards
        const cards = document.querySelectorAll('.campaign-card');
        cards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
            }, 10);
        });
    });
});

// Campaign join buttons
document.querySelectorAll('.campaign-card .btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.campaign-card');
        const title = card.querySelector('.campaign-title').textContent;

        const originalText = this.textContent;
        this.textContent = 'Joining...';
        this.disabled = true;

        setTimeout(() => {
            this.textContent = '✓ Joined!';
            this.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';

            showNotification('Campaign Joined!', `You've successfully joined: ${title}`, 'success');

            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                this.style.background = '';
            }, 2000);
        }, 1500);
    });
});

// Notification system
function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
            </div>
            <div class="notification-text">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">×</button>
        </div>
    `;

    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--bg-tertiary);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--radius-md);
                padding: 1rem 1.5rem;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                min-width: 320px;
                max-width: 420px;
            }

            .notification-content {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
            }

            .notification-icon {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.25rem;
                font-weight: bold;
                flex-shrink: 0;
            }

            .notification-success .notification-icon {
                background: rgba(16, 185, 129, 0.2);
                color: #10B981;
            }

            .notification-error .notification-icon {
                background: rgba(239, 68, 68, 0.2);
                color: #EF4444;
            }

            .notification-info .notification-icon {
                background: rgba(96, 165, 250, 0.2);
                color: #60A5FA;
            }

            .notification-text {
                flex: 1;
            }

            .notification-title {
                font-weight: 600;
                margin-bottom: 0.25rem;
            }

            .notification-message {
                font-size: 0.875rem;
                color: var(--text-secondary);
            }

            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: color 0.3s;
            }

            .notification-close:hover {
                color: var(--text-primary);
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
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
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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

// Observe elements for animation
document.querySelectorAll('.campaign-card, .step-card, .stat-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Animate stat numbers
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = formatNumber(current, end);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const formatNumber = (value, target) => {
    const targetStr = target.toString();
    if (targetStr.includes('M')) {
        return (value / 1000000).toFixed(1) + 'M+';
    } else if (targetStr.includes('K')) {
        return (value / 1000).toFixed(1) + 'K+';
    } else if (targetStr.includes('$')) {
        return '$' + (value / 1000000).toFixed(0) + 'M+';
    }
    return value.toString() + '+';
};

// Observe stat values
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            let targetValue = 0;

            if (text.includes('M')) {
                targetValue = parseFloat(text) * 1000000;
            } else if (text.includes('K')) {
                targetValue = parseFloat(text) * 1000;
            } else {
                targetValue = parseFloat(text.replace(/[^0-9.]/g, ''));
            }

            animateValue(element, 0, targetValue, 2000);
            statObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number, .stat-value').forEach(el => {
    statObserver.observe(el);
});

// Particle effect for background
const particleContainer = document.querySelector('.particle-container');
if (particleContainer) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }

    // Add particle animation style
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Hover effect for campaign cards
document.querySelectorAll('.campaign-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add active state to navigation links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Log welcome message
console.log('%c🌐 Nexus - Multichain Credential Network', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #FF6B9D 0%, #C084FC 50%, #60A5FA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cBuilt with ❤️ for Web3', 'font-size: 14px; color: #B4B4C8;');
