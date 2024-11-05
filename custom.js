// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('contact-form');

//   form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     alert('Thank you for your message! I will get back to you soon.');
//     form.reset();
//   });
// });

// Get the button
const backToTopButton = document.getElementById('backToTop');

// Show or hide the button based on scroll position
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopButton.classList.remove('hidden');
  } else {
    backToTopButton.classList.add('hidden');
  }
};

// Scroll smoothly to the top when the button is clicked
backToTopButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};


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
