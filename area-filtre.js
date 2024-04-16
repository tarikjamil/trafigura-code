document.addEventListener("DOMContentLoaded", function () {
  // Get the value from the <h1> element
  var h1Value = document.querySelector("h1").textContent.trim();

  // Get all elements with the class 'partner--item'
  var items = Array.from(document.querySelectorAll(".partner--item"));

  // Filter items where the 'partner--area' text includes the 'h1Value' and select only the first 3
  var matchedItems = items
    .filter(function (item) {
      var areaValue = item.querySelector(".partner--area").textContent.trim();
      return areaValue.includes(h1Value);
    })
    .slice(-3); // Note: Use slice(-3) to get the last 3 matching elements

  // Hide all items initially
  items.forEach(function (item) {
    item.style.display = "none";
  });

  // Show only the matched items
  matchedItems.forEach(function (item) {
    item.style.display = "block";
  });
});
