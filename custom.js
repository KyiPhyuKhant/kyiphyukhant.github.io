// document.addEventListener("DOMContentLoaded", function () {
//   fetch('header.html')
//     .then(response => response.text())
//     .then(data => document.getElementById('header').innerHTML = data);

//   fetch('footer.html')
//     .then(response => response.text())
//     .then(data => document.getElementById('footer').innerHTML = data);
// });


// Get the button
const backToTopButton = document.getElementById('backToTop');

// Show or hide the button based on scroll position
window.onscroll = function () {
  if (!backToTopButton) {
    return;
  }

  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopButton.classList.remove('hidden');
  } else {
    backToTopButton.classList.add('hidden');
  }
};

// Scroll smoothly to the top when the button is clicked
if (backToTopButton) {
  backToTopButton.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
}


// let currentSlide = 0;

// function changeSlide(direction) {
//   const slides = document.querySelectorAll('.slide');
//   slides[currentSlide].classList.remove('active');
//   slides[currentSlide].style.opacity = '0'; // Start fading out

//   currentSlide = (currentSlide + direction + slides.length) % slides.length;

//   slides[currentSlide].classList.add('active');
//   slides[currentSlide].style.opacity = '1'; // Start fading in
// }

// document.querySelectorAll('.slide').forEach((slide, index) => {
//   if (index !== currentSlide) {
//     slide.style.display = 'none';
//     slide.style.opacity = '0'; // Set inactive slides to transparent
//   } else {
//     slide.style.display = 'block';
//     slide.style.opacity = '1'; // Active slide visible
//   }
// });

// setInterval(() => {
//   changeSlide(1);
// }, 5000); // Automatically change slides every 5 seconds

// Get the visitor count from local storage
let count = localStorage.getItem('visitCount');
count = count ? parseInt(count) + 1 : 1;
localStorage.setItem('visitCount', count);

// Display the visitor count
const visitorCounter = document.getElementById('visitor-counter');

if (visitorCounter) {
  visitorCounter.textContent = count;
}

const homePage = document.querySelector('.home-page');

if (homePage) {
  const interactiveCards = document.querySelectorAll(
    '.hero-portrait, .focus-list div, .experience-item, .skill-card, .contact-card, .social-card'
  );

  window.addEventListener('pointermove', function (event) {
    homePage.style.setProperty('--cursor-x', event.clientX + 'px');
    homePage.style.setProperty('--cursor-y', event.clientY + 'px');
  });

  interactiveCards.forEach(function (card) {
    card.addEventListener('pointermove', function (event) {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateX = ((y / bounds.height) - 0.5) * -8;
      const rotateY = ((x / bounds.width) - 0.5) * 8;

      card.style.setProperty('--tilt-x', rotateY.toFixed(2) + 'deg');
      card.style.setProperty('--tilt-y', rotateX.toFixed(2) + 'deg');
      card.style.setProperty('--card-x', x + 'px');
      card.style.setProperty('--card-y', y + 'px');
    });

    card.addEventListener('pointerleave', function () {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--card-x', '50%');
      card.style.setProperty('--card-y', '20%');
    });
  });
}
