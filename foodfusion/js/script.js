/* =========================================================
   FOODFUSION — MAIN SCRIPT
   Handles: navbar scroll, mobile menu, dark mode, search,
   cart (localStorage), favorites, card rendering, animations
========================================================= */

// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function getCart(){ return JSON.parse(localStorage.getItem("ff_cart")) || []; }
function saveCart(cart){ localStorage.setItem("ff_cart", JSON.stringify(cart)); updateCartCount(); }
function getFavorites(){ return JSON.parse(localStorage.getItem("ff_favs")) || []; }
function saveFavorites(favs){ localStorage.setItem("ff_favs", JSON.stringify(favs)); }

function updateCartCount(){
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = $("#cartCount");
  if (el) el.textContent = count;
}

function addToCart(id){
  const item = foodItems.find(f => f.id === id);
  if (!item) return;
  const cart = getCart();
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: item.id, name: item.name, price: item.price, img: item.img, qty: 1 });
  saveCart(cart);
  flashButton(id);
}

function flashButton(id){
  const btn = document.querySelector(`.add-cart-btn[data-id="${id}"]`);
  if (!btn) return;
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i>';
  setTimeout(() => { btn.innerHTML = original; }, 900);
}

function toggleFavorite(id, btn){
  let favs = getFavorites();
  if (favs.includes(id)){
    favs = favs.filter(f => f !== id);
    btn.classList.remove("active");
  } else {
    favs.push(id);
    btn.classList.add("active");
  }
  saveFavorites(favs);
}

function starString(rating){
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let str = "";
  for (let i = 0; i < full; i++) str += '<i class="fa-solid fa-star"></i>';
  if (half) str += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = full + (half ? 1 : 0); i < 5; i++) str += '<i class="fa-regular fa-star"></i>';
  return str;
}

// ---------- render a food card ----------
function foodCardHTML(item){
  const favs = getFavorites();
  const isFav = favs.includes(item.id) ? "active" : "";
  const badge = item.special ? '<span class="badge">Special</span>' : "";
  return `
  <div class="food-card" data-category="${item.category}" data-name="${item.name.toLowerCase()}">
    <div class="img-wrap">
      <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x220/eee/999?text=${encodeURIComponent(item.name)}'">
      ${badge}
      <button class="fav-btn ${isFav}" onclick="toggleFavorite('${item.id}', this)"><i class="fa-solid fa-heart"></i></button>
    </div>
    <div class="food-card-body">
      <h4>${item.name}</h4>
      <div class="food-rating">${starString(item.rating)} <span>${item.rating}</span></div>
      <div class="food-bottom">
        <span class="food-price">₹${item.price}</span>
        <button class="add-cart-btn" data-id="${item.id}" onclick="addToCart('${item.id}')"><i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
  </div>`;
}

// ---------- populate home page sections ----------
function renderHomeSections(){
  const specialGrid = $("#specialGrid");
  const popularGrid = $("#popularGrid");
  if (specialGrid){
    const specials = foodItems.filter(f => f.special);
    specialGrid.innerHTML = specials.map(foodCardHTML).join("");
  }
  if (popularGrid){
    const popular = [...foodItems].sort((a,b) => b.rating - a.rating).slice(0, 8);
    popularGrid.innerHTML = popular.map(foodCardHTML).join("");
  }
}

function renderReviews(){
  const slider = $("#reviewsSlider");
  if (!slider) return;
  slider.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="stars">${starString(r.rating)}</div>
      <p>"${r.text}"</p>
      <div class="review-user">
        <img src="${r.img}" alt="${r.name}">
        <div><h5>${r.name}</h5></div>
      </div>
    </div>`).join("");
}

// ---------- navbar scroll effect ----------
window.addEventListener("scroll", () => {
  const navbar = $("#navbar");
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 60);

  const backToTop = $("#backToTop");
  if (backToTop) backToTop.classList.toggle("show", window.scrollY > 400);

  revealOnScroll();
});

// ---------- mobile hamburger ----------
const hamburger = $("#hamburger");
const navLinks = $("#navLinks");
if (hamburger){
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
}

// ---------- dark mode ----------
const themeBtn = $("#themeBtn");
function applyTheme(){
  const saved = localStorage.getItem("ff_theme");
  if (saved === "dark"){
    document.body.classList.add("dark");
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}
if (themeBtn){
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("ff_theme", isDark ? "dark" : "light");
    themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  });
}

// ---------- search overlay ----------
const searchBtn = $("#searchBtn");
const searchBox = $("#searchBox");
const closeSearch = $("#closeSearch");
if (searchBtn){
  searchBtn.addEventListener("click", () => {
    searchBox.classList.toggle("active");
    if (searchBox.classList.contains("active")) $("#searchInput").focus();
  });
}
if (closeSearch){
  closeSearch.addEventListener("click", () => searchBox.classList.remove("active"));
}
const searchInput = $("#searchInput");
if (searchInput){
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchInput.value.trim() !== ""){
      window.location.href = `menu.html?search=${encodeURIComponent(searchInput.value.trim())}`;
    }
  });
}

// ---------- back to top ----------
const backToTop = $("#backToTop");
if (backToTop){
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ---------- scroll reveal ----------
function revealOnScroll(){
  $$("[data-aos]").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) el.classList.add("aos-in");
  });
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  updateCartCount();
  renderHomeSections();
  renderReviews();
  revealOnScroll();
});
