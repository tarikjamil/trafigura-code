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

jQuery(document).ready(function ($) {
  // Improved event delegation with checks
  $(document).on("click", ".navbar--dropdown-trigger", function () {
    const $trigger = $(this);

    // Ensure the content is ready to be toggled
    if (!$trigger.data("animating")) {
      $trigger.data("animating", true);
      toggleDropdown($trigger);
    }
  });

  function toggleDropdown($trigger) {
    // Close other accordions when opening a new one
    if (!$trigger.hasClass("open")) {
      $(".navbar--dropdown-trigger.open").each(function () {
        toggleContent($(this), true);
      });
    }

    toggleContent($trigger, $trigger.hasClass("open"));
    $trigger.toggleClass("open");
  }

  function toggleContent($trigger, isOpen) {
    const $sibling = $trigger.siblings(".navbar--dropdown--list");
    const animationDuration = 500;

    if (isOpen) {
      // Close the content div
      $sibling.animate({ height: "0px" }, animationDuration, function () {
        $sibling.css("height", "0px");
        $trigger.data("animating", false);
      });
    } else {
      // Open the content div
      $sibling.css("height", "auto");
      let autoHeight = $sibling.height();
      $sibling.css("height", "0px");

      $sibling.animate({ height: autoHeight }, animationDuration, function () {
        $sibling.css("height", "auto");
        $trigger.data("animating", false);
      });
    }

    // Toggle is--active class on the parent
    $trigger.closest(".navbar--dropdown").toggleClass("is--active");
  }

  // Define the missing function to open the dropdown for the current nav link
  function initializeDropdownForCurrentNavlink() {
    $(".navlink.w--current")
      .closest(".navbar--dropdown")
      .find(".navbar--dropdown-trigger")
      .not(".open")
      .click();
  }

  // Setting up the MutationObserver to handle dynamic content loading
  var observer = new MutationObserver(function (mutations, obs) {
    if ($(".navlink.w--current").length) {
      initializeDropdownForCurrentNavlink();
      obs.disconnect(); // Stop observing after the required elements are found
    }
  });

  // Observer options - watching for subtree modifications, child addition or removal
  var config = { childList: true, subtree: true };

  // Target node - assuming 'body' but should be as specific as possible
  var target = document.querySelector("body");

  // Starting the observer
  observer.observe(target, config);
});

// ------------------ team item click ------------------ //
document.addEventListener("DOMContentLoaded", function () {
  // Listen for clicks on elements with the class 'team-item'
  document.querySelectorAll(".team-item").forEach((item) => {
    item.addEventListener("click", function () {
      // Find the child element with class 'richtext--team'
      var richtextTeam = this.querySelector(".richtext--team");

      // Ensure richtextTeam exists
      if (richtextTeam) {
        // Clone the 'richtext--team' element
        var clone = richtextTeam.cloneNode(true);

        // Find the element with class 'is--team-content-toreset'
        var contentToReset = document.querySelector(
          ".is--team-content-toreset"
        );

        if (contentToReset) {
          // Remove all children from 'is--team-content-toreset'
          while (contentToReset.firstChild) {
            contentToReset.removeChild(contentToReset.firstChild);
          }

          // Append the cloned 'richtext--team' element
          contentToReset.appendChild(clone);
        }
      }
    });
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

const swiper3 = new Swiper(".is--gallery-slider", {
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
