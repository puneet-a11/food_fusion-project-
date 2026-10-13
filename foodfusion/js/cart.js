/* =========================================================
   CART PAGE LOGIC
========================================================= */

function cartRowHTML(item){
  return `
  <div class="cart-row" data-id="${item.id}">
    <div class="cart-item-info">
      <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/64/eee/999?text=food'">
      <div><h4>${item.name}</h4><span>₹${item.price} each</span></div>
    </div>
    <div class="cart-price">₹${item.price}</div>
    <div class="qty-control">
      <button onclick="changeQty('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
      <span>${item.qty}</span>
      <button onclick="changeQty('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
    </div>
    <div class="cart-item-total">₹${item.price * item.qty}</div>
    <button class="remove-btn" onclick="removeItem('${item.id}')"><i class="fa-solid fa-trash"></i></button>
  </div>`;
}

function renderCart(){
  const cart = getCart();
  const list = document.getElementById("cartItemsList");
  const emptyState = document.getElementById("cartEmpty");
  const summaryWrap = document.getElementById("cartSummaryWrap");
  const proceedBtn = document.getElementById("proceedBtn");

  if (cart.length === 0){
    list.innerHTML = "";
    emptyState.style.display = "block";
    summaryWrap.style.opacity = "0.5";
    summaryWrap.style.pointerEvents = "none";
  } else {
    list.innerHTML = cart.map(cartRowHTML).join("");
    emptyState.style.display = "none";
    summaryWrap.style.opacity = "1";
    summaryWrap.style.pointerEvents = "auto";
  }

  const DELIVERY_FEE = 40;
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = cart.length ? DELIVERY_FEE : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  document.getElementById("cartSubtotal").textContent = `₹${subtotal}`;
  document.getElementById("cartDelivery").textContent = `₹${delivery}`;
  document.getElementById("cartTax").textContent = `₹${tax}`;
  document.getElementById("cartTotal").textContent = `₹${total}`;
}

function changeQty(id, delta){
  const cart = getCart();
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0){
    removeItem(id);
    return;
  }
  saveCart(cart);
  renderCart();
}

function removeItem(id){
  let cart = getCart();
  cart = cart.filter(c => c.id !== id);
  saveCart(cart);
  renderCart();
}

// ---------- "You Might Also Like" ----------
function renderAlsoLike(){
  const grid = document.getElementById("alsoLikeGrid");
  if (!grid) return;
  const cart = getCart();
  const cartIds = cart.map(c => c.id);
  const suggestions = foodItems.filter(f => !cartIds.includes(f.id))
    .sort((a,b) => b.rating - a.rating)
    .slice(0, 4);
  grid.innerHTML = suggestions.map(foodCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  renderAlsoLike();
});
