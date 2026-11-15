// Southwest Vent Solutions - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('svg');
      if (icon) {
        // Toggle icon state if desired
      }
    });

    // Close mobile nav when clicking a link
    navMenu.querySelectorAll('.nav-link, .nav-mobile-btn').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Interactive Price Calculator
  setupCostCalculator();

  // Accordion Interaction
  setupAccordion();
});

// Calculator Implementation
function setupCostCalculator() {
  const serviceButtons = document.querySelectorAll('#calcServiceOptions .calc-opt-btn');
  const sqftRange = document.getElementById('sqftRange');
  const sqftDisplay = document.getElementById('sqftDisplay');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox input');
  const totalPriceDisplay = document.getElementById('totalPriceDisplay');

  let currentBase = 179;

  function calculateTotal() {
    const sqft = parseInt(sqftRange.value, 10);
    
    // Scale pricing slightly for larger homes (e.g. +$25 per 500 sqft above 1500)
    let sizeMultiplier = 0;
    if (sqft > 1500) {
      sizeMultiplier = Math.floor((sqft - 1500) / 500) * 25;
    }

    let addonsTotal = 0;
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        addonsTotal += parseInt(cb.dataset.cost || 0, 10);
      }
    });

    const finalTotal = currentBase + sizeMultiplier + addonsTotal;
    
    if (totalPriceDisplay) {
      totalPriceDisplay.textContent = `$${finalTotal}`;
    }
  }

  // Service selection buttons
  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBase = parseInt(btn.dataset.base, 10);
      calculateTotal();
    });
  });

  // Range slider
  if (sqftRange && sqftDisplay) {
    sqftRange.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      sqftDisplay.textContent = `${val.toLocaleString()} sq ft`;
      calculateTotal();
    });
  }

  // Addons
  addonCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateTotal);
  });

  // Initial calculation run
  calculateTotal();
}

// Accordion Implementation
function setupAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      }
    });
  });
}

// Form Submission Simulation
function handleFormSubmit(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Dispatching Request...</span>`;

  setTimeout(() => {
    form.style.display = 'none';
    const successMsg = document.getElementById('formSuccessMessage');
    if (successMsg) {
      successMsg.classList.remove('hidden');
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 900);
}
