# FinBuddy 🌸📈
> **Smart Wealth, Crypto & Forex Intelligence for US & UK Investors**  
> Built with a modern, luxury White & Pink fintech aesthetic, interactive financial calculators, and dual-currency transatlantic market analysis.

---

## 🌟 Overview

**FinBuddy** is a high-performance, beautifully designed financial editorial platform engineered specifically for investors navigating both the **United States (Wall Street, SEC, IRS)** and the **United Kingdom (City of London, FCA, HMRC)** financial ecosystems.

The site is built with a bespoke **White and Pink** luxury fintech visual identity featuring:
- Soft rose and vibrant pink gradients (`#FF2E74`, `#FA709A`, `#FFF0F4`)
- High-contrast charcoal readability (`#0F172A`)
- Frosted glassmorphism with subtle glow drop-shadows
- Live-updating transatlantic financial tickers
- Interactive dual-currency USD ($) / GBP (£) toggles

---

## 🚀 Key Features

### 1. Dual-Currency & Market Switcher (USD & GBP)
- Real-time conversion across the site between **USD ($)** and **GBP (£)**.
- Automatically recalculates dynamic asset prices and adjusts financial calculator inputs with a single click.

### 2. Live Market Ticker Tape
- Dynamic infinite-scrolling ticker bar covering **BTC/USD**, **GBP/USD (The Cable)**, **ETH/USD**, **EUR/USD**, **S&P 500**, **FTSE 100**, and **Gold (XAU/USD)** with micro-fluctuations.

### 3. Interactive Financial Calculators
1. **Compound Wealth Growth Calculator**:
   - Computes long-term portfolio growth under US 401(k) / Roth IRA and UK ISA tax-free compounding.
   - Live breakdown of total principal invested vs. compound interest earned.
2. **Forex Pip & Risk Sizing Tool**:
   - Computes exact pip values for GBP/USD, EUR/USD, and USD/JPY based on standard lots (100k units).
   - Calculates exact dollar/pound stop-loss risk.

### 4. Transatlantic US vs UK Investment Matrix
- Side-by-side comparative table analyzing:
  - 401(k) / Roth IRA ($30,500 limit) vs. Stocks & Shares ISA (£20,000 allowance)
  - IRS Form 8949 capital gains vs. HMRC Section 104 Share Pooling
  - US spot Bitcoin ETFs vs. UK FCA retail crypto derivative restrictions
  - CFTC 1:50 leverage vs. FCA 1:30 leverage & UK tax-free spread betting

### 5. 3 Comprehensive In-Depth Guides
1. **Finance & Wealth**: *The Transatlantic Wealth Blueprint: 401(k) & Roth IRA vs. Stocks & Shares ISA* (`post-isa-401k.html`)
2. **Crypto & Digital Assets**: *Institutional Crypto & Bitcoin: Navigating SEC Spot ETFs, HMRC Taxes, & Cold Storage* (`post-crypto-guide.html`)
3. **Forex & Macro**: *Mastering GBP/USD (The 'Cable'): Trading Bank of England vs Fed Rate Divergence* (`post-forex-cable.html`)

### 6. Additional Pages & Interactive Modules
- **Blog Archive** (`blog.html`): Real-time keyword search and dynamic category filter pills.
- **About FinBuddy** (`about.html`): Mission statement, editorial standards, and analyst masthead.
- **Contact Desk** (`contact.html`): Bureau locations in New York (140 Broadway) and London (100 Bishopsgate), inquiry form, and FAQ.
- **UX Delights**:
  - Reading progress bar at the top of every article.
  - Interactive newsletter toast notifications.
  - One-click social sharing (Twitter/X, LinkedIn, Copy Link).
  - Fully responsive drawer navigation for smartphones and tablets.

---

## 📁 Project Architecture

```
finbuddy/
├── index.html                  # Main Landing Page (Hero, Live Tickers, Tools, Matrix)
├── blog.html                   # Blog Archive with Search & Category Filtering
├── post-isa-401k.html          # Guide 1: 401(k) vs Stocks & Shares ISA
├── post-crypto-guide.html      # Guide 2: Bitcoin ETFs & Crypto Tax Guide
├── post-forex-cable.html       # Guide 3: GBP/USD Cable Forex Playbook
├── about.html                  # About FinBuddy & Analyst Profiles
├── contact.html                # Contact Bureau & Inquiries
├── css/
│   └── style.css               # Luxury White & Pink Master Stylesheet
├── js/
│   └── main.js                 # Interactive Engine (Calculators, Tickers, Filters)
├── images/
│   ├── blog-wealth-isa-401k.svg # Vector Illustration for Wealth Post
│   ├── blog-crypto-halving.svg  # Vector Illustration for Crypto Post
│   └── blog-forex-cable.svg     # Vector Illustration for Forex Post
└── README.md                   # Documentation & Setup Guide
```

---

## 💻 How to Run Locally

You do not need any external build tools or node modules to run FinBuddy. It is engineered with pure standard HTML5, CSS3, and modern JavaScript.

1. Clone or download the repository.
2. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox).
3. Alternatively, launch a local web server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Or with Node.js npx
   npx serve .
   ```
4. Navigate to `http://localhost:8000`.

---

## 📜 Regulatory Disclaimer

*FinBuddy is an educational media publication. The content provided across all guides and calculators is strictly for educational and informational purposes and does not constitute personalized financial, investment, or legal advice. Trading forex and cryptocurrencies involves significant risk of capital loss.*

---

© 2026 **FinBuddy Media Group Inc.** All rights reserved.
