document.addEventListener("DOMContentLoaded", function () {
  const heroVideo = document.getElementById("hero-video");
  const videoSource = heroVideo.querySelector("source");
  const videoWrapper = document.querySelector(".tales--video-swiper");
  const playButton = document.querySelector(".tales--play");

  // 1. Set the video source from the .tales--video-swiper div
  if (videoWrapper && videoSource) {
    const videoURL = videoWrapper.textContent.trim();
    videoSource.src = videoURL;
    heroVideo.load();

    // 2. Once the video is ready, fade it in and play it
    heroVideo.addEventListener("loadeddata", function () {
      heroVideo.style.opacity = "1";
      heroVideo.play();
    });
  }

  // 3. Add play/pause toggle functionality
  playButton?.addEventListener("click", function () {
    if (heroVideo.paused) {
      heroVideo.play();
    } else {
      heroVideo.pause();
    }
  });
});
