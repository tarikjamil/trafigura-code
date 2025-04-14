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

// -------------- impact -------------- //

document.addEventListener("DOMContentLoaded", function () {
  const impactSections = document.querySelectorAll(".tale--impact-content");

  impactSections.forEach((section) => {
    const children = Array.from(section.children);
    let i = 0;

    while (i < children.length) {
      if (children[i].tagName === "H3") {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("tale--impact-row");

        // Move the <h3> inside
        rowDiv.appendChild(children[i]);

        i++;

        // Move all following <p> tags until next <h3> or end
        while (i < children.length && children[i].tagName === "P") {
          rowDiv.appendChild(children[i]);
          i++;
        }

        // Insert the new group before the first moved element
        section.insertBefore(rowDiv, rowDiv.firstChild);
        section.appendChild(rowDiv);
      } else {
        i++;
      }
    }
  });
});
