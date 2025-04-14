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
  const groups = [
    { selector: ".tale--impact-content", rowClass: "tale--impact-row" },
    { selector: ".richtext--core-pillars", rowClass: "tale--pillar-row" },
  ];

  groups.forEach(({ selector, rowClass }) => {
    const sections = document.querySelectorAll(selector);

    sections.forEach((section) => {
      const newContent = [];
      const children = Array.from(section.children);
      let i = 0;

      while (i < children.length) {
        const el = children[i];

        if (el.tagName === "H3") {
          const row = document.createElement("div");
          row.classList.add(rowClass);

          row.appendChild(el.cloneNode(true));
          i++;

          while (i < children.length && children[i].tagName === "P") {
            row.appendChild(children[i].cloneNode(true));
            i++;
          }

          newContent.push(row);
        } else {
          i++;
        }
      }

      // Replace content
      section.innerHTML = "";
      newContent.forEach((row) => section.appendChild(row));
    });
  });
});
