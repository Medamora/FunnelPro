document.addEventListener('DOMContentLoaded', function () {
  // Initialize countdown timers
  initCountdowns();

  // Initialize FAQ accordions
  initFaqAccordions();

  // Initialize form submissions
  initForms();

  // Add animation classes on scroll
  initScrollAnimations();
});

// Countdown Timer Functions
function initCountdowns() {
  // Landing page countdown (24 hours)
  if (
    document.getElementById('hours') &&
    document.getElementById('minutes') &&
    document.getElementById('seconds')
  ) {
    startCountdown('hours', 'minutes', 'seconds', 24 * 60 * 60); // 24 hours
  }

  // Landing page footer countdown (sync with main)
  if (
    document.getElementById('hours-footer') &&
    document.getElementById('minutes-footer') &&
    document.getElementById('seconds-footer')
  ) {
    startCountdown('hours-footer', 'minutes-footer', 'seconds-footer', 24 * 60 * 60);
  }

  // Upsell page countdown (15 minutes)
  if (
    document.getElementById('upsell-minutes') &&
    document.getElementById('upsell-seconds')
  ) {
    startMinuteCountdown('upsell-minutes', 'upsell-seconds', 15);
  }

  // Upsell page footer countdown
  if (
    document.getElementById('upsell-minutes-footer') &&
    document.getElementById('upsell-seconds-footer')
  ) {
    startMinuteCountdown('upsell-minutes-footer', 'upsell-seconds-footer', 15);
  }

  // Downsell page countdown (10 minutes)
  if (
    document.getElementById('downsell-minutes') &&
    document.getElementById('downsell-seconds')
  ) {
    startMinuteCountdown('downsell-minutes', 'downsell-seconds', 10);
  }

  // Downsell page footer countdown
  if (
    document.getElementById('downsell-minutes-footer') &&
    document.getElementById('downsell-seconds-footer')
  ) {
    startMinuteCountdown('downsell-minutes-footer', 'downsell-seconds-footer', 10);
  }

  // Checkout page countdown (15 minutes)
  if (
    document.getElementById('checkout-minutes') &&
    document.getElementById('checkout-seconds')
  ) {
    startMinuteCountdown('checkout-minutes', 'checkout-seconds', 15);
  }
}

function startCountdown(hoursId, minutesId, secondsId, totalSeconds) {
  const hoursElement = document.getElementById(hoursId);
  const minutesElement = document.getElementById(minutesId);
  const secondsElement = document.getElementById(secondsId);

  let timer = totalSeconds;

  function updateCountdown() {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');

    if (timer > 0) {
      timer--;
      setTimeout(updateCountdown, 1000);
    } else {
      // When countdown reaches zero, restart it
      timer = totalSeconds;
      setTimeout(updateCountdown, 1000);
    }
  }

  updateCountdown();
}

function startMinuteCountdown(minutesId, secondsId, totalMinutes) {
  const minutesElement = document.getElementById(minutesId);
  const secondsElement = document.getElementById(secondsId);

  let timer = totalMinutes * 60; // minutes to seconds

  function updateCountdown() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');

    if (timer > 0) {
      timer--;
      setTimeout(updateCountdown, 1000);
    } else {
      // restart
      timer = totalMinutes * 60;
      setTimeout(updateCountdown, 1000);
    }
  }

  updateCountdown();
}

// FAQ Accordion Functions
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Close others
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle this one
      item.classList.toggle('active');
    });
  });
}

// Form Submission Functions
function initForms() {
  // Opt-in form
  const optInForm = document.getElementById('opt-in-form');
  if (optInForm) {
    optInForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');

      if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
        alert('Please fill in all fields.');
        return;
      }

      const submitButton = optInForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending...';

      setTimeout(() => {
        alert('Thank you! Your free template has been sent to your email.');
        optInForm.reset();
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }, 1500);
    });
  }

  // Checkout form
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const requiredInputs = checkoutForm.querySelectorAll(
        'input[required], select[required]'
      );
      let isValid = true;

      requiredInputs.forEach((input) => {
        if (input.value.trim() === '') {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });

      if (!isValid) {
        alert('Please fill in all required fields.');
        return;
      }

      const submitButton = checkoutForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.innerHTML = 'Processing...';

      setTimeout(() => {
        window.location.href = 'thank-you.html';
      }, 2000);
    });
  }
}

// Scroll Animation Functions
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.benefit-card, .feature-card, .testimonial-card, .pricing-card, .upsell-feature, .downsell-offer'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-element');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Add dynamic SSL badge to checkout page
function addSSLBadge() {
  const secureSection = document.querySelector('.secure-badges');
  if (secureSection) {
    const sslBadge = document.createElement('div');
    sslBadge.className = 'ssl-badge';
    sslBadge.innerHTML = `
      <div class="ssl-icon">
        <i class="fas fa-lock"></i>
      </div>
      <div class="ssl-text">
        <p>SSL SECURED PAYMENT</p>
        <p class="ssl-subtext">Your information is protected by 256-bit SSL encryption</p>
      </div>
    `;
    secureSection.appendChild(sslBadge);
  }
}

// Second DOMContentLoaded for extra UI tweaks
document.addEventListener('DOMContentLoaded', function () {
  addSSLBadge();

  // Pulse effect on important elements
  const pulseElements = document.querySelectorAll(
    '.highlight, .countdown, .pricing-value, .guarantee-badge'
  );
  pulseElements.forEach((element) => {
    element.classList.add('pulse-subtle');
  });

  // Hover effects for buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((button) => {
    button.addEventListener('mouseover', function () {
      this.classList.add('btn-hover');
    });
    button.addEventListener('mouseout', function () {
      this.classList.remove('btn-hover');
    });
  });

  // Local storage
  initLocalStorage();
});

// Local storage functions
function initLocalStorage() {
  const hasVisited = localStorage.getItem('hasVisited');

  if (!hasVisited) {
    localStorage.setItem('hasVisited', 'true');
    localStorage.setItem('visitTimestamp', Date.now());
  } else {
    const userName = localStorage.getItem('userName');
    if (userName) {
      const subtitles = document.querySelectorAll('.subtitle');
      subtitles.forEach((subtitle) => {
        if (subtitle.textContent.includes('Join thousands')) {
          subtitle.textContent = `Welcome back, ${userName}! Continue your journey to business transformation.`;
        }
      });
    }
  }

  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    const inputs = form.querySelectorAll('input');

    inputs.forEach((input) => {
      const savedValue = localStorage.getItem(input.id);
      if (savedValue) {
        input.value = savedValue;
      }

      input.addEventListener('change', function () {
        localStorage.setItem(this.id, this.value);

        if (this.id === 'name' || this.id === 'first-name') {
          localStorage.setItem('userName', this.value);
        }
      });
    });
  });
}

// HTTPS protocol enforcement
function checkProtocol() {
  if (
    window.location.protocol === 'http:' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    window.location.href = window.location.href.replace('http:', 'https:');
  }
}

checkProtocol();
