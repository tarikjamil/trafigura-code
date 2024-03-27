// ------------------ gsap ------------------ //

gsap.registerPlugin(ScrollTrigger, CustomEase);

// ------------------ smooth ease ------------------ //

CustomEase.create("smooth", "M0,0 C0.38,0.005 0.215,1 1,1");

// ------------------ loading ------------------ //
function pageLoad() {
  let tl = gsap.timeline();

  tl.to(".main-wrapper", {
    opacity: 1,
    ease: "smooth",
    duration: 0.6,
  });

  tl.from(
    "[animation=loading]",
    {
      y: "20rem",
      opacity: "0",
      stagger: { each: 0.1, from: "start" },
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart"
  );
}

pageLoad();

// ------------------ heading ------------------ //
gsap.to(".portfolio--row:nth-child(2)", {
  x: "20vw", // Target scale
  scrollTrigger: {
    trigger: ".section.is--portfolio--rows",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

document.querySelectorAll("[animation=fade]").forEach(function (fadeSplitElem) {
  gsap.from(fadeSplitElem, {
    scrollTrigger: {
      trigger: fadeSplitElem,
      start: "top bottom-=50",
      markers: false,
    },
    y: "20rem",
    opacity: 0,
    ease: "smooth",
    duration: 0.6,
  });
});

// ------------------ navbar - accordion ------------------ //
$(".navbar--dropdown-trigger").on("click", function () {
  // Close other accordions when opening a new one
  if (!$(this).hasClass("open")) {
    $(".navbar--dropdown-trigger.open").click();
  }

  // Toggle the is--active class on the parent .navbar--dropdown
  // It's important to toggle this before we check for the "open" class since we're about to toggle that
  $(this).closest(".navbar--dropdown").toggleClass("is--active");

  // Save the sibling of the toggle we clicked on
  let sibling = $(this).siblings(".navbar--dropdown--list");
  let animationDuration = 500;

  if ($(this).hasClass("open")) {
    // Close the content div if already open
    sibling.animate({ height: "0px" }, animationDuration, function () {
      // It might be necessary to remove is--active class here if you want to remove it only after animation
      // However, if the is--active class should mirror the open state regardless of animation, leave the toggleClass where it is
    });
  } else {
    // Open the content div if already closed
    sibling.css("height", "auto");
    let autoHeight = sibling.height(); // Get the full height
    sibling.css("height", "0px"); // Reset the height
    sibling.animate({ height: autoHeight }, animationDuration, function () {
      sibling.css("height", "auto"); // Set the height to auto after the animation

      // Scroll the page to the accordion, leaving 200 pixels from the top
      // Additional functionality for scrolling can be added here if needed
    });
  }

  // Open and close the toggle div
  $(this).toggleClass("open");
});

// ------------------ Swiper ------------------ //

$(".is--testimonials-slider").append(`
    <div class="swiper-arrows"><a href="#" class="swiper-button-prev w-inline-block"><svg class="icon--24 is--arrow" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 25" fill="none"><path d="M19 12.135H5M5 12.135L12 19.135M5 12.135L12 5.13501" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></a><a href="#" class="swiper-button-next w-inline-block"><svg class="icon--24 is--arrow is--second" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 25" fill="none"><path d="M19 12.135H5M5 12.135L12 19.135M5 12.135L12 5.13501" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></a></div>
`);

const swiper = new Swiper(".is--slider", {
  direction: "horizontal",
  slidesPerView: 1, // Default to 1 slide per view for mobile and smaller viewports
  slidesPerGroup: 1,
  spaceBetween: "20rem",
  loop: false,
  centeredSlides: false,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // Define breakpoints
  breakpoints: {
    // When window width is >= 992px
    992: {
      slidesPerView: 1,
      spaceBetween: "20rem",
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});

let swiper2; // Declare the swiper variable at a scope accessible by your initialization function and resize event

function initializeSwiper() {
  swiper2 = new Swiper(".is--circles-slider", {
    direction: "horizontal",
    slidesPerView: 3, // Default to 1 slide per view for mobile and smaller viewports
    slidesPerGroup: 1,
    spaceBetween: "20rem",
    loop: false,
    centeredSlides: false,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Define breakpoints
    breakpoints: {
      // When window width is >= 992px
      992: {
        slidesPerView: 1,
        spaceBetween: "20rem",
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });
}

function checkSwiper() {
  const screenWidth = window.innerWidth;

  // Check if the screen width is less than or equal to 992px
  if (screenWidth <= 992) {
    // Initialize Swiper if it's not already initialized
    if (!swiper2) {
      initializeSwiper();
    }
  } else {
    // If screen width is greater than 992px and swiper is initialized, destroy it
    if (swiper2) {
      swiper2.destroy();
      swiper2 = null; // Reset the swiper variable to allow reinitialization if needed
    }
  }
}

// Run checkSwiper on initial load
checkSwiper();

// Add event listener for window resize
window.addEventListener("resize", checkSwiper);

// ------------------ marquee ------------------ //
// marquee is--scrolling
const scrollSpeed = 50; // pixels per second, adjust as needed

function updateScrollingSpeed() {
  document.querySelectorAll(".marquee--row").forEach((element) => {
    const scrollWidth = element.offsetWidth;
    const duration = scrollWidth / scrollSpeed; // seconds

    element.style.setProperty("--scroll-width", `${scrollWidth}px`);
    element.style.animationDuration = `${duration}s`;
  });
}

// Call initially
updateScrollingSpeed();

// Update on window resize
window.addEventListener("resize", updateScrollingSpeed);
