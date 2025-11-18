// Wallet Connection
const connectButton = document.querySelector('.btn-connect');
let isConnected = false;

connectButton?.addEventListener('click', function() {
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

        // Simulate Freighter/Albedo wallet connection
        setTimeout(() => {
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2"/>
                </svg>
                GDXZ...4K9Q
            `;
            this.disabled = false;
            this.style.background = 'linear-gradient(135deg, #26A69A 0%, #0ECB81 100%)';
            isConnected = true;
            showNotification('Wallet Connected', 'Freighter wallet connected successfully', 'success');
        }, 2000);
    }
});

// Price Updates (simulate real-time)
function updatePrices() {
    const currentPrice = document.querySelector('.current-price');
    if (currentPrice) {
        const price = parseFloat(currentPrice.textContent);
        const change = (Math.random() - 0.5) * 0.00005;
        const newPrice = price + change;
        currentPrice.textContent = newPrice.toFixed(5);

        // Update price change indicator
        const priceChange = document.querySelector('.price-change');
        if (priceChange) {
            const changePercent = ((change / price) * 100).toFixed(2);
            const changeValue = Math.abs(change).toFixed(5);
            if (change >= 0) {
                priceChange.className = 'price-change positive';
                priceChange.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L12 12L17 17" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    +${changePercent}% (+${changeValue})
                `;
            } else {
                priceChange.className = 'price-change negative';
                priceChange.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 7L12 12L17 7" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    ${changePercent}% (${changeValue})
                `;
            }
        }
    }
}

// Update prices every 3 seconds
setInterval(updatePrices, 3000);

// Market Pair Selection
const marketItems = document.querySelectorAll('.market-item');
marketItems.forEach(item => {
    item.addEventListener('click', function() {
        marketItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        const pairName = this.querySelector('.pair-name').textContent;
        const price = this.querySelector('.price').textContent;

        // Update main display
        const currentPair = document.querySelector('.current-pair h2');
        if (currentPair) {
            currentPair.textContent = pairName;
        }

        const currentPrice = document.querySelector('.current-price');
        if (currentPrice) {
            currentPrice.textContent = price;
        }

        showNotification('Market Changed', `Switched to ${pairName}`, 'info');
    });
});

// Tab Switching
const tabs = document.querySelectorAll('.tab, .chart-tab, .panel-tab');
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const parent = this.closest('.market-tabs, .chart-tabs, .panel-tabs');
        if (parent) {
            parent.querySelectorAll('.tab, .chart-tab, .panel-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Timeframe Selection
const timeframes = document.querySelectorAll('.timeframe');
timeframes.forEach(frame => {
    frame.addEventListener('click', function() {
        timeframes.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
    });
});

// Swap Calculation
const swapInputs = document.querySelectorAll('.token-input input');
const swapButton = document.querySelector('.trading-panel .btn-primary');

swapInputs[0]?.addEventListener('input', function() {
    const amount = parseFloat(this.value) || 0;
    const rate = 11.6807; // USDC to XLM rate
    const result = amount * rate;

    if (swapInputs[1]) {
        swapInputs[1].value = result.toFixed(2);
    }

    // Update USD values
    const usdValues = document.querySelectorAll('.usd-value');
    if (usdValues[0]) {
        usdValues[0].textContent = `≈ $${amount.toFixed(2)}`;
    }
    if (usdValues[1]) {
        usdValues[1].textContent = `≈ $${(result * 0.0856).toFixed(2)}`;
    }
});

// MAX button
const maxButton = document.querySelector('.max-btn');
maxButton?.addEventListener('click', function() {
    const balance = 12450.25;
    if (swapInputs[0]) {
        swapInputs[0].value = balance;
        swapInputs[0].dispatchEvent(new Event('input'));
    }
});

// Swap Direction Toggle
const swapDirection = document.querySelector('.swap-direction');
swapDirection?.addEventListener('click', function() {
    const input1 = swapInputs[0];
    const input2 = swapInputs[1];

    if (input1 && input2) {
        const temp = input1.value;
        input1.value = input2.value;
        input2.value = temp;
    }

    // Swap token selects visually
    const selects = document.querySelectorAll('.token-select');
    if (selects.length === 2) {
        const temp1 = selects[0].innerHTML;
        selects[0].innerHTML = selects[1].innerHTML;
        selects[1].innerHTML = temp1;
    }
});

// Swap Execute
swapButton?.addEventListener('click', function(e) {
    e.preventDefault();

    if (!isConnected) {
        showNotification('Wallet Required', 'Please connect your wallet first', 'error');
        return;
    }

    const amount = swapInputs[0]?.value;
    if (!amount || parseFloat(amount) <= 0) {
        showNotification('Invalid Amount', 'Please enter a valid amount', 'error');
        return;
    }

    const originalText = this.textContent;
    this.textContent = 'Processing...';
    this.disabled = true;

    // Simulate Stellar transaction
    setTimeout(() => {
        this.textContent = 'Confirming on Stellar...';

        setTimeout(() => {
            this.textContent = '✓ Swap Complete!';
            this.style.background = 'linear-gradient(135deg, #26A69A 0%, #0ECB81 100%)';

            showNotification('Swap Successful', `Swapped ${amount} USDC for XLM in 3.2 seconds`, 'success');

            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                this.style.background = '';
            }, 3000);
        }, 1500);
    }, 1000);
});

// Real-time Trade Feed Updates
function addRecentTrade() {
    const tradesList = document.querySelector('.trades-list');
    if (!tradesList) return;

    const prices = [0.08564, 0.08563, 0.08565, 0.08562, 0.08566];
    const amounts = [425.50, 1234.80, 876.20, 2450.00, 567.90];
    const types = ['buy', 'sell'];

    const price = prices[Math.floor(Math.random() * prices.length)];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });

    const tradeRow = document.createElement('div');
    tradeRow.className = `trade-row ${type}`;
    tradeRow.innerHTML = `
        <span class="price">${price}</span>
        <span class="amount">${amount.toFixed(2)}</span>
        <span class="time">${time}</span>
    `;

    tradeRow.style.opacity = '0';
    tradesList.insertBefore(tradeRow, tradesList.firstChild);

    setTimeout(() => {
        tradeRow.style.transition = 'opacity 0.3s';
        tradeRow.style.opacity = '1';
    }, 10);

    // Remove last trade if more than 10
    if (tradesList.children.length > 10) {
        tradesList.removeChild(tradesList.lastChild);
    }
}

// Add new trade every 5-10 seconds
setInterval(addRecentTrade, Math.random() * 5000 + 5000);

// Order Book Updates (subtle animations)
function updateOrderBook() {
    const bookRows = document.querySelectorAll('.book-row');
    bookRows.forEach(row => {
        if (Math.random() > 0.7) {
            row.style.background = 'rgba(123, 79, 254, 0.1)';
            setTimeout(() => {
                row.style.background = '';
            }, 300);
        }
    });
}

setInterval(updateOrderBook, 4000);

// Notification System
function showNotification(title, message, type = 'info') {
    // Create notification element
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

    // Add styles if not present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                background: var(--bg-elevated);
                border: 1px solid var(--border-secondary);
                border-radius: var(--radius-md);
                padding: 1rem 1.5rem;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                box-shadow: var(--shadow-lg);
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
                background: rgba(14, 203, 129, 0.2);
                color: var(--buy-green);
            }

            .notification-error .notification-icon {
                background: rgba(246, 70, 93, 0.2);
                color: var(--sell-red);
            }

            .notification-info .notification-icon {
                background: rgba(123, 79, 254, 0.2);
                color: var(--stellar-purple);
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

// Liquidity Pool Cards
const poolCards = document.querySelectorAll('.pool-card');
poolCards.forEach(card => {
    const addLiquidityBtn = card.querySelector('.btn-primary');
    addLiquidityBtn?.addEventListener('click', function(e) {
        e.preventDefault();

        if (!isConnected) {
            showNotification('Wallet Required', 'Please connect your wallet first', 'error');
            return;
        }

        const poolName = card.querySelector('h3').textContent;
        showNotification('Adding Liquidity', `Opening liquidity interface for ${poolName}`, 'info');
    });
});

// Smooth Scrolling
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe pool and anchor cards
document.querySelectorAll('.pool-card, .anchor-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Console welcome message
console.log('%c🌟 StellarSwap DEX', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #7B4FFE 0%, #00C9FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cBuilt on Stellar Network • SDEX Protocol • Soroban Smart Contracts', 'font-size: 12px; color: #B4B7C8;');
console.log('%cFeatures: 3-5s settlement • $0.00001 fees • Path Payments • Liquidity Pools', 'font-size: 11px; color: #7B4FFE;');
