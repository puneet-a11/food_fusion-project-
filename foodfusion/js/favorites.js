/* =========================================================
   FAVORITES PAGE LOGIC
========================================================= */

function renderFavorites(){
  const favIds = getFavorites();
  const grid = document.getElementById("favGrid");
  const emptyState = document.getElementById("favEmpty");
  const countText = document.getElementById("favCount");

  const favItems = foodItems.filter(item => favIds.includes(item.id));

  if (favItems.length === 0){
    grid.style.display = "none";
    emptyState.style.display = "block";
    countText.textContent = "";
  } else {
    grid.style.display = "grid";
    emptyState.style.display = "none";
    countText.textContent = `${favItems.length} item${favItems.length > 1 ? "s" : ""} saved`;
    grid.innerHTML = favItems.map(foodCardHTML).join("");
  }
}

// re-render whenever a favorite is toggled from this page (fav-btn click updates localStorage,
// so we just re-render the whole grid to reflect removal instantly)
document.addEventListener("click", (e) => {
  if (e.target.closest(".fav-btn")){
    setTimeout(renderFavorites, 50);
  }
});

document.addEventListener("DOMContentLoaded", renderFavorites);
