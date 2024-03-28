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
$(document).ready(function () {
  // Your existing click event code for .navbar--dropdown-trigger
  $(".navbar--dropdown-trigger").on("click", function () {
    // Close other accordions when opening a new one
    if (!$(this).hasClass("open")) {
      $(".navbar--dropdown-trigger.open").click();
    }

    // Toggle the is--active class on the parent .navbar--dropdown
    $(this).closest(".navbar--dropdown").toggleClass("is--active");

    let sibling = $(this).siblings(".navbar--dropdown-list");
    let animationDuration = 500;

    if ($(this).hasClass("open")) {
      sibling.animate({ height: "0px" }, animationDuration);
    } else {
      sibling.css("height", "auto");
      let autoHeight = sibling.height();
      sibling.css("height", "0px");
      sibling.animate({ height: autoHeight }, animationDuration, function () {
        sibling.css("height", "auto");
      });
    }

    $(this).toggleClass("open");
  });

  // Check if any .navlink has the class .w--current and trigger click on its .navbar--dropdown-trigger
  $(".navlink.w--current").each(function () {
    $(this)
      .closest(".navbar--dropdown")
      .find(".navbar--dropdown-trigger")
      .click();
  });
});

// ------------------ Swiper ------------------ //

const swiper = new Swiper(".is--slider-resources", {
  direction: "horizontal",
  slidesPerView: 1, // Default to 1 slide per view for mobile and smaller viewports
  slidesPerGroup: 1,
  spaceBetween: "20rem",
  loop: false,
  centeredSlides: false,
  // If we need pagination
  // Define breakpoints
  breakpoints: {
    // When window width is >= 992px
    992: {
      slidesPerView: 1,
      spaceBetween: "20rem",
    },
  },
});

const swiper2 = new Swiper(".is--circles-slider", {
  direction: "horizontal",
  slidesPerView: 3, // Default to 1 slide per view for mobile and smaller viewports
  slidesPerGroup: 1,
  spaceBetween: "20rem",
  loop: false,
  centeredSlides: false,
  // Define breakpoints
  breakpoints: {
    // When window width is >= 992px
    992: {
      slidesPerView: 1,
      spaceBetween: "20rem",
    },
  },
  // Navigation arrows
});
