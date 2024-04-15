document.addEventListener("DOMContentLoaded", function () {
  // Collect all partner-related-text values into an array
  var relatedTexts = Array.from(
    document.querySelectorAll(".partner-related-text")
  ).map(function (elem) {
    return elem.textContent.trim();
  });

  // Get all partner--item elements
  var partnerItems = Array.from(document.querySelectorAll(".partner--item"));

  // Filter partner--items to find those where heading-32 matches any relatedText
  var matchedItems = partnerItems
    .filter(function (item) {
      var headingText = item.querySelector(".heading-32").textContent.trim();
      return relatedTexts.includes(headingText);
    })
    .slice(0, 3); // Get only the first 3 matching elements

  // Hide all partner--items initially
  partnerItems.forEach(function (item) {
    item.style.display = "none";
  });

  // Show only the matched items
  matchedItems.forEach(function (item) {
    item.style.display = "block";
  });
});
