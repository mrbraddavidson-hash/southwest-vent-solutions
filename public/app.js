// Southwest Vent Solutions - Specialized Cleaning Interactive Logic

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
    });

    // Close mobile nav when clicking a link
    navMenu.querySelectorAll('.nav-link, .nav-mobile-btn').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Interactive Price Calculator
  setupCleaningCalculator();
});

// Cleaning Calculator Implementation
function setupCleaningCalculator() {
  const serviceButtons = document.querySelectorAll('#calcServiceOptions .calc-opt-btn');
  const sqftRange = document.getElementById('sqftRange');
  const sqftDisplay = document.getElementById('sqftDisplay');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox input');
  const totalPriceDisplay = document.getElementById('totalPriceDisplay');

  let currentBase = 389;

  const sizeLabels = {
    1: 'Small (6 - 8 ft canopy)',
    2: 'Standard (10 - 12 ft canopy)',
    3: 'Large (14 - 18 ft canopy)',
    4: 'Mega (20+ ft multi-hood)'
  };

  const sizeMultipliers = {
    1: -60,
    2: 0,
    3: 110,
    4: 240
  };

  function calculateTotal() {
    const sizeLevel = parseInt(sqftRange.value, 10);
    const sizeOffset = sizeMultipliers[sizeLevel] || 0;

    let addonsTotal = 0;
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        addonsTotal += parseInt(cb.dataset.cost || 0, 10);
      }
    });

    const finalTotal = currentBase + sizeOffset + addonsTotal;
    
    if (totalPriceDisplay) {
      totalPriceDisplay.textContent = `$${Math.max(finalTotal, 99)}`;
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
      sqftDisplay.textContent = sizeLabels[val] || `${val}`;
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

// Form Submission Simulation
function handleFormSubmit(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Checking Scheduling Availability...</span>`;

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
