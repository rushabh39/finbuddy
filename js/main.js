/* ==========================================================================
   FINBUDDY - Interactive Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgressBar();
  initMobileNav();
  initCurrencySwitcher();
  initCompoundCalculator();
  initForexPipCalculator();
  initTickerLiveSimulation();
  initNewsletterToast();
  initShareButtons();
  initBlogFilterAndSearch();
});

/* 1. Reading Progress Bar */
function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  });
}

/* 2. Mobile Navigation Toggle */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    toggleBtn.innerHTML = isExpanded 
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  });
}

/* 3. Global Currency Switcher (USD $ <-> GBP £) */
let currentCurrency = 'USD';
const USD_GBP_RATE = 0.78; // 1 USD = 0.78 GBP; 1 GBP = ~1.282 USD

function initCurrencySwitcher() {
  const usdBtn = document.getElementById('btnCurUSD');
  const gbpBtn = document.getElementById('btnCurGBP');
  if (!usdBtn || !gbpBtn) return;

  const setCurrency = (curr) => {
    currentCurrency = curr;
    if (curr === 'USD') {
      usdBtn.classList.add('active');
      gbpBtn.classList.remove('active');
    } else {
      gbpBtn.classList.add('active');
      usdBtn.classList.remove('active');
    }

    // Update currency symbols across page
    document.querySelectorAll('.cur-sym').forEach(el => {
      el.textContent = curr === 'USD' ? '$' : '£';
    });

    // Update dynamic price spans
    document.querySelectorAll('[data-usd]').forEach(el => {
      const usdVal = parseFloat(el.getAttribute('data-usd'));
      if (!isNaN(usdVal)) {
        if (curr === 'USD') {
          el.textContent = '$' + usdVal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        } else {
          const gbpVal = usdVal * USD_GBP_RATE;
          el.textContent = '£' + gbpVal.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        }
      }
    });

    // Trigger recalculation if calculator exists
    if (typeof updateCompoundInterest === 'function') updateCompoundInterest();
    if (typeof updateForexPip === 'function') updateForexPip();

    showToast(`Region & Currency set to ${curr === 'USD' ? 'United States (USD $)' : 'United Kingdom (GBP £)'}`);
  };

  usdBtn.addEventListener('click', () => setCurrency('USD'));
  gbpBtn.addEventListener('click', () => setCurrency('GBP'));
}

/* 4. Interactive Compound Wealth Growth Calculator */
function initCompoundCalculator() {
  const initialInput = document.getElementById('calcInitial');
  const monthlyInput = document.getElementById('calcMonthly');
  const rateInput = document.getElementById('calcRate');
  const yearsInput = document.getElementById('calcYears');

  if (!initialInput || !monthlyInput || !rateInput || !yearsInput) return;

  const totalInvestedEl = document.getElementById('resInvested');
  const interestEarnedEl = document.getElementById('resInterest');
  const finalBalanceEl = document.getElementById('resBalance');

  window.updateCompoundInterest = () => {
    const P = parseFloat(initialInput.value) || 0;
    const PMT = parseFloat(monthlyInput.value) || 0;
    const r = (parseFloat(rateInput.value) || 0) / 100 / 12; // monthly rate
    const years = parseFloat(yearsInput.value) || 1;
    const n = years * 12; // total months

    let futureValue = P * Math.pow(1 + r, n);
    if (r > 0) {
      futureValue += PMT * ((Math.pow(1 + r, n) - 1) / r);
    } else {
      futureValue += PMT * n;
    }

    const totalInvested = P + (PMT * n);
    const totalInterest = Math.max(0, futureValue - totalInvested);
    const sym = currentCurrency === 'USD' ? '$' : '£';

    if (totalInvestedEl) totalInvestedEl.textContent = `${sym}${Math.round(totalInvested).toLocaleString()}`;
    if (interestEarnedEl) interestEarnedEl.textContent = `${sym}${Math.round(totalInterest).toLocaleString()}`;
    if (finalBalanceEl) finalBalanceEl.textContent = `${sym}${Math.round(futureValue).toLocaleString()}`;
  };

  [initialInput, monthlyInput, rateInput, yearsInput].forEach(inp => {
    inp.addEventListener('input', window.updateCompoundInterest);
  });

  window.updateCompoundInterest();
}

/* 5. Forex Pip & Risk Calculator */
function initForexPipCalculator() {
  const pairSelect = document.getElementById('fxPair');
  const lotsInput = document.getElementById('fxLots');
  const slPipsInput = document.getElementById('fxSlPips');

  if (!pairSelect || !lotsInput || !slPipsInput) return;

  const pipValueEl = document.getElementById('resPipValue');
  const totalRiskEl = document.getElementById('resTotalRisk');

  window.updateForexPip = () => {
    const pair = pairSelect.value;
    const lots = parseFloat(lotsInput.value) || 1.0;
    const pips = parseFloat(slPipsInput.value) || 20;

    // Base pip value for standard lot (100,000 units)
    let standardPipUSD = 10.0; // EUR/USD, GBP/USD, AUD/USD
    if (pair === 'USD/JPY') standardPipUSD = 6.85;

    let pipValue = standardPipUSD * lots;
    let totalRisk = pipValue * pips;

    const sym = currentCurrency === 'USD' ? '$' : '£';
    const rateMultiplier = currentCurrency === 'USD' ? 1.0 : USD_GBP_RATE;

    const finalPip = (pipValue * rateMultiplier).toFixed(2);
    const finalRisk = (totalRisk * rateMultiplier).toFixed(2);

    if (pipValueEl) pipValueEl.textContent = `${sym}${finalPip}`;
    if (totalRiskEl) totalRiskEl.textContent = `${sym}${finalRisk}`;
  };

  [pairSelect, lotsInput, slPipsInput].forEach(inp => {
    inp.addEventListener('input', window.updateForexPip);
    inp.addEventListener('change', window.updateForexPip);
  });

  window.updateForexPip();
}

/* 6. Market Ticker Realistic Simulation */
function initTickerLiveSimulation() {
  const tickerItems = document.querySelectorAll('.dynamic-ticker-val');
  if (!tickerItems.length) return;

  setInterval(() => {
    tickerItems.forEach(item => {
      const rawBase = parseFloat(item.getAttribute('data-base'));
      if (isNaN(rawBase)) return;

      // ± 0.05% fluctuation
      const deltaPercent = (Math.random() - 0.49) * 0.1;
      const newVal = rawBase * (1 + deltaPercent / 100);
      item.setAttribute('data-base', newVal.toFixed(2));

      const isCrypto = newVal > 1000;
      const formatted = isCrypto ? newVal.toLocaleString('en-US', { maximumFractionDigits: 1 }) : newVal.toFixed(4);
      item.textContent = formatted;
    });
  }, 4000);
}

/* 7. Newsletter & Toast Notification System */
function initNewsletterToast() {
  const forms = document.querySelectorAll('.newsletter-form, #contactForm');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast(`🎉 Thank you for subscribing! Your FinBuddy US & UK Weekly Briefing is on its way.`);
        emailInput.value = '';
      } else {
        showToast(`🚀 Message sent! A FinBuddy editor will respond within 24 hours.`);
        form.reset();
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('finbuddy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'finbuddy-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span style="font-size:1.2rem;">✨</span>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}

/* 8. Share and Copy Link */
function initShareButtons() {
  const shareButtons = document.querySelectorAll('[data-share]');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-share');
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);

      if (type === 'x') {
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
      } else if (type === 'linkedin') {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
      } else if (type === 'copy') {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('🔗 Article link copied to clipboard!');
        }).catch(() => {
          showToast('🔗 Link ready to share!');
        });
      }
    });
  });
}

/* 9. Blog Filter & Search (For blog.html archive) */
function initBlogFilterAndSearch() {
  const searchInput = document.getElementById('blogSearch');
  const filterPills = document.querySelectorAll('.filter-pill');
  const postCards = document.querySelectorAll('.archive-post-card');

  if (!postCards.length) return;

  let currentCategory = 'all';
  let searchTerm = '';

  const applyFilters = () => {
    let visibleCount = 0;
    postCards.forEach(card => {
      const cardCat = card.getAttribute('data-category') || '';
      const cardTitle = (card.querySelector('.post-card-title')?.textContent || '').toLowerCase();
      const cardExcerpt = (card.querySelector('.post-card-excerpt')?.textContent || '').toLowerCase();

      const matchesCat = currentCategory === 'all' || cardCat.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = !searchTerm || cardTitle.includes(searchTerm) || cardExcerpt.includes(searchTerm);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.getElementById('noResultsMsg');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });
}
