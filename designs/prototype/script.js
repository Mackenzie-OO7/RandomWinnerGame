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

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.9)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Filter buttons functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Add subtle animation to marketplace cards
        const cards = document.querySelectorAll('.listing-card');
        cards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
            }, 10);
        });
    });
});

// Trading tabs functionality
const tradingTabs = document.querySelectorAll('.tab-btn');
tradingTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tradingTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Update button text
        const tradeButton = document.querySelector('.trading-panel .btn-primary');
        if (this.textContent === 'Buy') {
            tradeButton.textContent = 'Place Buy Order';
            tradeButton.style.background = 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)';
        } else {
            tradeButton.textContent = 'Place Sell Order';
            tradeButton.style.background = 'linear-gradient(135deg, #F56565 0%, #E53E3E 100%)';
        }
    });
});

// Wallet connection simulation
const walletButton = document.querySelector('.btn-wallet');
walletButton.addEventListener('click', function() {
    const originalText = this.innerHTML;
    this.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="spinner">
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
            GDXZ...7K9Q
        `;
        this.disabled = false;
        this.style.background = 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)';
    }, 2000);
});

// Animate numbers on scroll
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = formatNumber(value, end);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const formatNumber = (value, target) => {
    if (target >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    } else if (target >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Animate stat numbers
            if (entry.target.classList.contains('stat-value')) {
                const text = entry.target.textContent;
                let targetValue = 0;
                if (text.includes('M')) {
                    targetValue = parseFloat(text) * 1000000;
                } else if (text.includes('K')) {
                    targetValue = parseFloat(text) * 1000;
                } else {
                    targetValue = parseFloat(text.replace(/[^0-9.]/g, ''));
                }
                animateValue(entry.target, 0, targetValue, 2000);
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .listing-card, .step-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

document.querySelectorAll('.stat-value').forEach(el => {
    observer.observe(el);
});

// Buy button interactions
document.querySelectorAll('.listing-card .btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.listing-card');
        const title = card.querySelector('.listing-title').textContent;
        const price = card.querySelector('.detail-value').textContent;

        // Create notification
        showNotification(`Processing: ${title}`, `Price: ${price}`, 'success');

        // Button animation
        const originalText = this.textContent;
        this.textContent = 'Processing...';
        this.disabled = true;

        setTimeout(() => {
            this.textContent = 'Success!';
            this.style.background = 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)';

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
                ${type === 'success' ? '✓' : 'i'}
            </div>
            <div>
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
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
                background: var(--dark-card);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--radius-md);
                padding: 1rem 1.5rem;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                min-width: 300px;
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .notification-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: bold;
            }

            .notification-success .notification-icon {
                background: rgba(72, 187, 120, 0.2);
                color: #48BB78;
            }

            .notification-title {
                font-weight: 600;
                margin-bottom: 0.25rem;
            }

            .notification-message {
                font-size: 0.875rem;
                color: var(--text-secondary);
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
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Form validation and interaction
const tradingForm = document.querySelector('.trading-form');
if (tradingForm) {
    const inputs = tradingForm.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const amount = parseFloat(inputs[0].value) || 0;
            const price = parseFloat(inputs[1].value) || 0;
            const total = amount * price;

            const summaryValue = document.querySelector('.summary-row .summary-value');
            if (summaryValue) {
                summaryValue.textContent = `${total.toFixed(2)} XLM`;
            }
        });
    });

    tradingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this.querySelector('.btn-primary');
        const amount = inputs[0].value;
        const price = inputs[1].value;

        if (amount && price) {
            showNotification('Order Placed', `${amount} SOLAR @ ${price} XLM`, 'success');
            button.textContent = 'Order Submitted!';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = 'Place Buy Order';
                button.disabled = false;
            }, 2000);
        }
    });
}

// Price ticker animation
function animatePriceTicker() {
    const priceElement = document.querySelector('.current-price');
    const changeElement = document.querySelector('.price-change');

    if (priceElement && changeElement) {
        setInterval(() => {
            const currentPrice = parseFloat(priceElement.textContent);
            const change = (Math.random() - 0.5) * 0.01; // Random change
            const newPrice = currentPrice + change;

            priceElement.textContent = `${newPrice.toFixed(3)} XLM`;

            const percentChange = ((change / currentPrice) * 100).toFixed(1);
            changeElement.textContent = `${percentChange >= 0 ? '+' : ''}${percentChange}%`;
            changeElement.className = `price-change ${percentChange >= 0 ? 'positive' : 'negative'}`;
        }, 3000);
    }
}

// Initialize price ticker
animatePriceTicker();

// Add hover effects to cards
document.querySelectorAll('.listing-card, .feature-card, .step-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

console.log('🌞 Helios Ten-Chi - Solar Marketplace on Stellar');
console.log('Built with ❤️ for a sustainable future');
