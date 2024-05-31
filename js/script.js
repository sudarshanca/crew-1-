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

//details review slider
$(document).ready(function () {
  try {
    $('.review-box').slick({
      slidesToShow: 3,
      arrows: true,
      prevArrow: '<button class="sk-button sk-round arrow-prev" style="background:white;"><span class="sk-icons"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none"> <path d="M17 6.75C17.4142 6.75 17.75 6.41421 17.75 6C17.75 5.58579 17.4142 5.25 17 5.25V6.75ZM1 5.25C0.585787 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585787 6.75 1 6.75V5.25ZM4.47204 11.5327C4.76624 11.8243 5.24111 11.8222 5.53269 11.528C5.82427 11.2338 5.82216 10.7589 5.52796 10.4673L4.47204 11.5327ZM3.23703 9.25269L3.76499 8.72H3.76499L3.23703 9.25269ZM3.23703 2.74731L2.70907 2.21462H2.70907L3.23703 2.74731ZM5.52796 1.53269C5.82216 1.24111 5.82428 0.766238 5.53269 0.472041C5.24111 0.177844 4.76624 0.175726 4.47204 0.467309L5.52796 1.53269ZM1.01989 6.31333L0.275909 6.40816L0.275909 6.40816L1.01989 6.31333ZM1.01989 5.68667L0.275909 5.59184L0.275909 5.59184L1.01989 5.68667ZM17 5.25H1V6.75H17V5.25ZM5.52796 10.4673L3.76499 8.72L2.70907 9.78538L4.47204 11.5327L5.52796 10.4673ZM3.76499 3.28L5.52796 1.53269L4.47204 0.467309L2.70907 2.21462L3.76499 3.28ZM3.76499 8.72C3.0495 8.01086 2.55869 7.52282 2.22659 7.10929C1.904 6.7076 1.79332 6.44958 1.76387 6.2185L0.275909 6.40816C0.354695 7.02628 0.649627 7.54122 1.05706 8.04854C1.45498 8.54403 2.01863 9.10108 2.70907 9.78538L3.76499 8.72ZM2.70907 2.21462C2.01863 2.89892 1.45498 3.45597 1.05706 3.95146C0.649628 4.45878 0.354695 4.97372 0.275909 5.59184L1.76387 5.7815C1.79332 5.55042 1.904 5.2924 2.22659 4.89071C2.55869 4.47718 3.0495 3.98914 3.76499 3.28L2.70907 2.21462ZM1.76387 6.2185C1.74538 6.07341 1.74538 5.92659 1.76387 5.7815L0.275909 5.59184C0.241364 5.86286 0.241364 6.13714 0.275909 6.40816L1.76387 6.2185Z" fill="#444444" /> </svg></span></button>',
      nextArrow: '<button class="sk-button sk-round arrow-next" style="background:white;"><span class="sk-icons"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none"> <path d="M13.528 0.467309C13.2338 0.175726 12.7589 0.177844 12.4673 0.472041C12.1757 0.766238 12.1778 1.24111 12.472 1.53269L14.235 3.28C14.9505 3.98914 15.4413 4.47718 15.7734 4.89071C15.8813 5.02509 15.9655 5.1434 16.0309 5.25L1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41422 0.585786 6.75 1 6.75L16.0309 6.75C15.9655 6.8566 15.8813 6.97491 15.7734 7.10929C15.4413 7.52282 14.9505 8.01086 14.235 8.72L12.472 10.4673C12.1778 10.7589 12.1757 11.2338 12.4673 11.528C12.7589 11.8222 13.2338 11.8243 13.528 11.5327L15.3227 9.7539C15.9987 9.08395 16.5511 8.53641 16.9429 8.04854C17.3504 7.54121 17.6453 7.02628 17.7241 6.40816C17.7414 6.27265 17.75 6.13632 17.75 6C17.75 5.86368 17.7414 5.72735 17.7241 5.59184C17.6453 4.97372 17.3504 4.45878 16.9429 3.95146C16.5511 3.46358 15.9987 2.91604 15.3227 2.24609L13.528 0.467309Z" fill="#444444" /> </svg></span></button>',
      dots: false,
      autoplay: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            prevArrow: false,
            nextArrow: false
          }
        },
        {
          breakpoint: 600,
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


// details gallary mobile version slider 

  let slideIndex = 1;
    let xDown = null;

    function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
    };

    function handleTouchMove(evt) {
      if (!xDown) {
        return;
      }

      let xUp = evt.touches[0].clientX;
      let xDiff = xDown - xUp;

      if (xDiff > 0) {
        // Swipe left
        plusSlides(1);
      } else {
        // Swipe right
        plusSlides(-1);
      }
      /* reset values */
      xDown = null;
    };

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("carousel-slide-img");
      let dotsContainer = document.getElementById("dotContainer");

      if (n > slides.length) { slideIndex = 1 } // Go to first slide if reached end
      if (n < 1) { slideIndex = slides.length } // Go to last slide if reached beginning

      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[slideIndex - 1].style.display = "block";

      // Update dots' active state
      let dots = dotsContainer.getElementsByClassName("dot");
      for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active-dot");
      }
      dots[slideIndex - 1].classList.add("active-dot");
    }

    // Create dots dynamically
    let dotsContainer = document.getElementById("dotContainer");
    for (let i = 0; i < document.getElementsByClassName("carousel-slide-img").length; i++) {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      dot.setAttribute("onclick", "currentSlide(" + (i + 1) + ")");
      dotsContainer.appendChild(dot);
    }
    // Highlight the active dot
    let dots = dotsContainer.getElementsByClassName("dot");
    dots[slideIndex - 1].classList.add("active-dot");



