document.addEventListener("DOMContentLoaded", function () {
  // Get the value from the <h1> element
  var h1Value = document.querySelector("h1").textContent.trim();

  // Get all partner--item elements
  var items = Array.from(document.querySelectorAll(".partner--item"));

  // Filter items to match the partner--area with h1Value and take the last 3
  var matchedItems = items
    .filter(function (item) {
      var areaValue = item.querySelector(".partner--area").textContent.trim();
      return areaValue === h1Value;
    })
    .slice(0, 3); // Get only the last 3 matching elements

  // Hide all items first
  items.forEach(function (item) {
    item.style.display = "none";
  });

  // Show only the matched items
  matchedItems.forEach(function (item) {
    item.style.display = "block";
  });
});
