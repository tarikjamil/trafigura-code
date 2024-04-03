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
  console.log("Dropdown script initialized.");

  function toggleDropdown($trigger) {
    const isOpen = $trigger.hasClass("open");
    console.log("Toggling dropdown:", isOpen ? "Closing" : "Opening");

    $(".navbar--dropdown-trigger.open")
      .not($trigger)
      .each(function () {
        toggleContent($(this), true);
        $(this).removeClass("open");
      });

    toggleContent($trigger, isOpen);
    $trigger.toggleClass("open", !isOpen);
  }

  function toggleContent($trigger, isOpen) {
    const $sibling = $trigger.siblings(".navbar--dropdown--list");
    console.log("Toggle content:", isOpen ? "Closing" : "Opening", $sibling);

    if (isOpen) {
      $sibling.animate({ height: "0px" }, 500, function () {
        $(this).css("height", "0px").removeClass("is--active");
        $trigger.data("animating", false);
      });
    } else {
      const autoHeight = $sibling.css("height", "auto").height();
      $sibling.height("0px");
      $sibling.animate({ height: autoHeight + "px" }, 500, function () {
        $(this).css("height", "auto").addClass("is--active");
        $trigger.data("animating", false);
      });
    }
  }

  $(document).on("click", ".navbar--dropdown-trigger", function () {
    const $trigger = $(this);
    if (!$trigger.data("animating")) {
      $trigger.data("animating", true);
      toggleDropdown($trigger);
    }
  });

  function initializeOrRefreshDropdownLogic() {
    console.log("Refreshing dropdown logic for dynamic content.");
    $(".navbar--dropdown-trigger").each(function () {
      const $trigger = $(this);
      // Only trigger a click on dropdown triggers that contain a .navlink.w--current
      if (
        $trigger.siblings(".navbar--dropdown--list").find(".navlink.w--current")
          .length > 0 &&
        !$trigger.hasClass("open")
      ) {
        $trigger.click();
      }
    });
  }

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        console.log("MutationObserver: Child added.");
        initializeOrRefreshDropdownLogic();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
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
