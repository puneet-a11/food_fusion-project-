/* =========================================================
   BUILD YOUR OWN PIZZA — LOGIC
   Live price updates as user selects size/crust/cheese/toppings
========================================================= */

// pre-set positions for topping emojis scattered on the pizza image
const toppingPositions = [
  {x:30,y:30},{x:70,y:25},{x:50,y:50},{x:25,y:65},{x:75,y:65},
  {x:50,y:20},{x:20,y:45},{x:80,y:45},{x:35,y:80},{x:65,y:80}
];

function getSelectedPrice(name){
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? parseInt(el.dataset.price) : 0;
}

function getSelectedToppings(){
  return Array.from(document.querySelectorAll('input[name="topping"]:checked'));
}

function calculatePizzaPrice(){
  const sizePrice = getSelectedPrice("size");
  const crustPrice = getSelectedPrice("crust");
  const cheesePrice = getSelectedPrice("cheese");
  const toppingsPrice = getSelectedToppings().reduce((sum, el) => sum + parseInt(el.dataset.price), 0);
  return sizePrice + crustPrice + cheesePrice + toppingsPrice;
}

function updatePillActiveStates(){
  document.querySelectorAll(".pill-option").forEach(pill => {
    const input = pill.querySelector("input");
    pill.classList.toggle("active", input.checked);
  });
  document.querySelectorAll(".topping-card").forEach(card => {
    const input = card.querySelector("input");
    card.classList.toggle("active", input.checked);
  });
}

function updateToppingVisuals(){
  const layer = document.getElementById("toppingLayer");
  const selected = getSelectedToppings();
  layer.innerHTML = selected.map((el, i) => {
    const pos = toppingPositions[i % toppingPositions.length];
    return `<span class="topping-emoji" style="left:${pos.x}%; top:${pos.y}%;">${el.dataset.emoji}</span>`;
  }).join("");
}

function updatePreviewTags(){
  const size = document.querySelector('input[name="size"]:checked');
  const crust = document.querySelector('input[name="crust"]:checked');
  const cheese = document.querySelector('input[name="cheese"]:checked');
  const toppings = getSelectedToppings();

  const tagsEl = document.getElementById("previewTags");
  let tags = [
    `<span><i class="fa-solid fa-ruler"></i> ${size.parentElement.querySelector('span').childNodes[0].textContent.trim()}</span>`,
    `<span><i class="fa-solid fa-pizza-slice"></i> ${crust.parentElement.querySelector('span').childNodes[0].textContent.trim()}</span>`,
    `<span><i class="fa-solid fa-cheese"></i> ${cheese.parentElement.querySelector('span').childNodes[0].textContent.trim()}</span>`
  ];
  if (toppings.length){
    tags.push(`<span><i class="fa-solid fa-leaf"></i> ${toppings.length} Topping${toppings.length > 1 ? "s" : ""}</span>`);
  }
  tagsEl.innerHTML = tags.join("");
}

function updateLivePrice(){
  const price = calculatePizzaPrice();
  const priceEl = document.getElementById("livePrice");
  priceEl.textContent = `₹${price}`;
  priceEl.classList.add("bump");
  setTimeout(() => priceEl.classList.remove("bump"), 200);
}

function refreshBuilder(){
  updatePillActiveStates();
  updateToppingVisuals();
  updatePreviewTags();
  updateLivePrice();
}

// ---------- listen for changes ----------
document.querySelectorAll('input[name="size"], input[name="crust"], input[name="cheese"], input[name="topping"]').forEach(input => {
  input.addEventListener("change", refreshBuilder);
});

// ---------- add custom pizza to cart ----------
const addPizzaBtn = document.getElementById("addPizzaBtn");
if (addPizzaBtn){
  addPizzaBtn.addEventListener("click", () => {
    const size = document.querySelector('input[name="size"]:checked');
    const crust = document.querySelector('input[name="crust"]:checked');
    const cheese = document.querySelector('input[name="cheese"]:checked');
    const toppings = getSelectedToppings().map(t => t.value);
    const price = calculatePizzaPrice();

    const sizeLabel = size.value.charAt(0).toUpperCase() + size.value.slice(1);
    const crustLabel = crust.parentElement.querySelector('span').childNodes[0].textContent.trim();

    let name = `Custom Pizza — ${sizeLabel}, ${crustLabel}`;
    if (cheese.value === "extra") name += ", Extra Cheese";
    if (toppings.length) name += `, ${toppings.join("/")}`;

    const cart = getCart();
    const customId = `custom-${Date.now()}`;
    cart.push({
      id: customId,
      name: name,
      price: price,
      img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=200&q=60",
      qty: 1
    });
    saveCart(cart);
    showToast("Your custom pizza added to cart!");
  });
}

function showToast(msg){
  const toast = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

document.addEventListener("DOMContentLoaded", refreshBuilder);
