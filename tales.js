document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("hero-video");
  const videoSource = video.querySelector("source");
  const playBtn = document.querySelector(".tales--play");
  const arrows = document.querySelectorAll(".tales--arrow");

  let isVideoPlaying = true;

  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: "20rem",
    loop: true,
    loopedSlides: 3, // Force number of slides to duplicate
    loopAdditionalSlides: 3, // Extra copies to smooth transition

    on: {
      init: function () {
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

  // Arrows
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
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
