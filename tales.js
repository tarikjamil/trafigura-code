document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("hero-video");
  const videoSource = video.querySelector("source");
  const playBtn = document.querySelector(".tales--play");
  const arrows = document.querySelectorAll(".tales--arrow");

  let isVideoPlaying = true;
  let swiper; // declare globally

  // Observer to wait until CMS content is fully loaded
  const observer = new MutationObserver(() => {
    const slides = document.querySelectorAll(".swiper-slide");
    if (slides.length >= 3 && !swiper) {
      observer.disconnect(); // only once

      // Initialize Swiper
      swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,

        on: {
          init: function () {
            console.log(
              "Swiper initialized with",
              this.slides.length,
              "slides"
            );
            updateHeroVideo(this.slides[this.activeIndex]);
          },
          slideChangeTransitionStart: function () {
            fadeOutVideo();
          },
          slideChangeTransitionEnd: function () {
            updateHeroVideo(this.slides[this.activeIndex]);
          },
        },
      });

      console.log(
        "Duplicate slides now:",
        document.querySelectorAll(".swiper-slide-duplicate").length
      );
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Autoplay fix: user interaction first
  document.addEventListener(
    "click",
    () => {
      if (video.paused) {
        video.play().catch((err) => {
          console.warn("Autoplay failed after user click:", err);
        });
      }
    },
    { once: true }
  );

  // Try autoplay anyway (might fail silently)
  video.play().catch((err) => {
    console.warn("Initial autoplay failed:", err);
  });

  // Arrows
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      if (!swiper) return;
      const dir = arrow.getAttribute("data-dir");
      if (dir === "next") swiper.slideNext();
      else swiper.slidePrev();
    });
  });

  // Play/Pause toggle
  playBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      isVideoPlaying = true;
    } else {
      video.pause();
      isVideoPlaying = false;
    }
  });

  function fadeOutVideo() {
    video.style.opacity = 0;
    video.muted = true;
  }

  function updateHeroVideo(activeSlide) {
    const videoDiv = activeSlide.querySelector(".tales--video-swiper");
    if (!videoDiv) return;

    const videoUrl = videoDiv.textContent.trim();
    if (!videoUrl) return;

    videoSource.src = videoUrl;
    video.load();

    video.oncanplay = () => {
      video.style.opacity = 1;
      video.muted = false;
      if (isVideoPlaying) video.play();
    };
  }
});

// ---------------- motif.js ---------------- //

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false, // Important: set to false so indexes match .bg--motif
    on: {
      init: function () {
        updateActiveMotif(this.realIndex);
      },
      slideChange: function () {
        updateActiveMotif(this.realIndex);
      },
    },
  });

  function updateActiveMotif(index) {
    const motifs = document.querySelectorAll(".bg--motif");
    motifs.forEach((motif, i) => {
      motif.classList.toggle("is--active", i === index);
    });
  }
});
