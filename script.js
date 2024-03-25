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

// ------------------ accordion ------------------ //
$(".faq--item").on("click", function () {
  // Reference to the current item and its response
  let currentItem = $(this);
  let response = $(this).find(".faq--response");

  // Close other accordions when opening a new one
  if (!currentItem.hasClass("open")) {
    $(".faq--item.open").each(function () {
      // Directly manipulate the response instead of triggering click
      let otherResponse = $(this).find(".faq--response");
      $(this).removeClass("open"); // Remove 'open' class
      otherResponse.animate({ height: "0px" }, 500);
    });
  }

  let animationDuration = 500;

  if (currentItem.hasClass("open")) {
    // Close the content div if already open
    response.animate({ height: "0px" }, animationDuration, function () {
      currentItem.removeClass("open"); // Ensure 'open' class is toggled off after animation
    });
  } else {
    // Open the content div if closed
    response.css("height", "auto");
    let autoHeight = response.height();
    response.css("height", "0px");
    response.animate({ height: autoHeight }, animationDuration, function () {
      response.css("height", "auto");
      // Additional actions after opening can be added here
    });
    currentItem.addClass("open"); // Ensure 'open' class is toggled on after animation
  }
});

// ------------------ Swiper ------------------ //

$(".is--testimonials-slider").append(`
    <div class="swiper-arrows"><a href="#" class="swiper-button-prev w-inline-block"><svg class="icon--24 is--arrow" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 25" fill="none"><path d="M19 12.135H5M5 12.135L12 19.135M5 12.135L12 5.13501" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></a><a href="#" class="swiper-button-next w-inline-block"><svg class="icon--24 is--arrow is--second" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 25" fill="none"><path d="M19 12.135H5M5 12.135L12 19.135M5 12.135L12 5.13501" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></a></div>
`);

const swiper = new Swiper(".is--testimonials-slider", {
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
      slidesPerView: 2,
      spaceBetween: "40rem",
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
