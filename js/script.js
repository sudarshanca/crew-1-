document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.book-gallery');
  carousels.forEach((carousel, index) => {
      const slides = carousel.querySelector('.carousel-slide');
      const images = slides.children;
      const prevButton = carousel.querySelector('.prev');
      const nextButton = carousel.querySelector('.next');
      const dotsContainer = carousel.querySelector('.dots');

      let slideIndex = 0;
      let startX = 0;
      let endX = 0;

      function showSlides(n) {
          if (n >= images.length) slideIndex = 0;
          if (n < 0) slideIndex = images.length - 1;

          // Toggle visibility of nextButton based on current slide index
          nextButton.style.display = slideIndex === images.length - 1 ? 'none' : 'flex';

          // Toggle visibility of prevButton based on current slide index
          prevButton.style.display = slideIndex === 0 ? 'none' : 'flex';

          slides.style.transform = `translateX(${-slideIndex * 100}%)`;
          updateDots();
      }

      function updateDots() {
          dotsContainer.innerHTML = '';
          Array.from(images).forEach((_, i) => {
              const dot = document.createElement('span');
              dot.classList.add('dot');
              dot.dataset.index = i;
              dot.addEventListener('click', () => {
                  slideIndex = i;
                  showSlides(slideIndex);
              });
              if (i === slideIndex) dot.classList.add('active');
              dotsContainer.appendChild(dot);
          });
      }

      function handleSwipeStart(e) {
          startX = e.touches[0].clientX;
      }

      function handleSwipeMove(e) {
          endX = e.touches[0].clientX;
      }

      function handleSwipeEnd() {
          const deltaX = startX - endX;
          if (deltaX > 50 && slideIndex !== images.length - 1) {
              // Swipe right to left (move to next slide)
              showSlides(++slideIndex);
          } else if (deltaX < -50 && slideIndex !== 0) {
              // Swipe left to right (move to previous slide)
              showSlides(--slideIndex);
          }
      }

      prevButton.addEventListener('click', () => {
          showSlides(--slideIndex);
      });

      nextButton.addEventListener('click', () => {
          showSlides(++slideIndex);
      });

      slides.addEventListener('touchstart', handleSwipeStart);
      slides.addEventListener('touchmove', handleSwipeMove);
      slides.addEventListener('touchend', handleSwipeEnd);

      showSlides(slideIndex);
  });
});



// slick slider 

$(document).ready(function () {
  try {
    $('.discover-box').slick({
      lazyLoad: 'ondemand',
      slidesToShow: 3,
      arrows: false,
      prevArrow: '<button class="sk-button sk-round arrow-prev"><span class="sk-icons"><svg width="20" height="20"><use xlink:href="#skiconsLeftCheveron"></use></svg></span></button>',
      nextArrow: '<button class="sk-button sk-round arrow-next"><span class="sk-icons"><svg width="20" height="20"><use xlink:href="#skiconsLeftCheveron"></use></svg></span></button>',
      dots: false,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }
  catch (ex) {
    console.log("Error initiating carousel" + ex)
  }
  document.getElementById("slider-main").style.height = "auto"
});

$(document).ready(function () {
  try {
    $('.review-box').slick({
      slidesToShow: 3,
      arrows: false,
      prevArrow: '<button class="sk-button sk-round arrow-prev"><span class="sk-icons"><svg width="20" height="20"><use xlink:href="#skiconsLeftCheveron"></use></svg></span></button>',
      nextArrow: '<button class="sk-button sk-round arrow-next"><span class="sk-icons"><svg width="20" height="20"><use xlink:href="#skiconsLeftCheveron"></use></svg></span></button>',
      dots: false,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }
  catch (ex) {
    console.log("Error initiating carousel" + ex)
  }

});

$(document).ready(function () {
  try {
    $('.img-slider').slick({
      lazyLoad: 'ondemand',
      slidesToShow: 1,
      arrows: true,
      prevArrow: '<button class="sk-button sk-round arrow-prev"><span class="sk-icons"><svg width="20" height="20"><use xlink:href="#skiconsLeftCheveron"></use></svg></span></button>',
      nextArrow: '<button class="sk-button sk-round arrow-next"><span class="sk-icons"><svg width="20" height="20"><use xlink:href="#skiconsLeftCheveron"></use></svg></span></button>',
      dots: true,
    });
  }
  catch (ex) {
    console.log("Error initiating carousel" + ex)
  }
  document.getElementById("slider-main").style.height = "auto"
});



