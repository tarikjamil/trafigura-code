document.addEventListener("DOMContentLoaded",function(){var e=Array.from(document.querySelectorAll(".partner-related-text")).map(function(e){return e.textContent.trim()}),t=Array.from(document.querySelectorAll(".partner--item")),n=t.filter(function(t){var n=t.querySelector(".heading-32").textContent.trim();return e.includes(n)}).slice(0,3);t.forEach(function(e){e.style.display="none"}),n.forEach(function(e){e.style.display="block"})});