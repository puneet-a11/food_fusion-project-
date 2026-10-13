/* =========================================================
   MENU PAGE — search + category filter (combined, live)
========================================================= */

let activeCategory = "all";
let activeSearch = "";

function renderMenuGrid(){
  const grid = document.getElementById("menuGrid");
  const noResults = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");
  if (!grid) return;

  let filtered = foodItems.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(activeSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(foodCardHTML).join("");
  resultsCount.textContent = `Showing ${filtered.length} of ${foodItems.length} items`;
  noResults.style.display = filtered.length === 0 ? "block" : "none";
  grid.style.display = filtered.length === 0 ? "none" : "grid";
}

// ---------- category buttons ----------
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    renderMenuGrid();
  });
});

// ---------- live search on menu page ----------
const menuSearchInput = document.getElementById("menuSearchInput");
if (menuSearchInput){
  menuSearchInput.addEventListener("input", () => {
    activeSearch = menuSearchInput.value.trim();
    renderMenuGrid();
  });
}

// ---------- pick up ?search= from navbar search redirect ----------
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");
  if (searchTerm && menuSearchInput){
    menuSearchInput.value = searchTerm;
    activeSearch = searchTerm;
  }
  renderMenuGrid();
});
