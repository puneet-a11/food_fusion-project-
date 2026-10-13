/* =========================================================
   CHECKOUT PAGE LOGIC
   - renders order summary from cart (localStorage)
   - validates delivery form
   - saves order + redirects to order-confirmation.html
========================================================= */

const DELIVERY_FEE = 40;
const GST_RATE = 0.05;

function calcTotals(cart){
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = cart.length ? DELIVERY_FEE : 0;
  const tax = Math.round(subtotal * GST_RATE);
  const total = subtotal + delivery + tax;
  return { subtotal, delivery, tax, total };
}

function renderCheckoutSummary(){
  const cart = getCart();
  const summaryItems = document.getElementById("summaryItems");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const emptyNote = document.getElementById("emptyCartNote");

  if (!summaryItems) return;

  if (cart.length === 0){
    summaryItems.innerHTML = `<p style="color:#999;font-size:0.9rem;">Your cart is empty.</p>`;
    if (placeOrderBtn){ placeOrderBtn.disabled = true; placeOrderBtn.style.opacity = "0.5"; placeOrderBtn.style.cursor = "not-allowed"; }
    if (emptyNote) emptyNote.style.display = "block";
  } else {
    summaryItems.innerHTML = cart.map(item => `
      <div class="summary-item-row">
        <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/50/eee/999?text=food'">
        <div class="si-info"><h5>${item.name}</h5><span>Qty: ${item.qty}</span></div>
        <div class="si-price">₹${item.price * item.qty}</div>
      </div>`).join("");
    if (placeOrderBtn){ placeOrderBtn.disabled = false; placeOrderBtn.style.opacity = "1"; placeOrderBtn.style.cursor = "pointer"; }
    if (emptyNote) emptyNote.style.display = "none";
  }

  const { subtotal, delivery, tax, total } = calcTotals(cart);
  document.getElementById("sumSubtotal").textContent = `₹${subtotal}`;
  document.getElementById("sumDelivery").textContent = `₹${delivery}`;
  document.getElementById("sumTax").textContent = `₹${tax}`;
  document.getElementById("sumTotal").textContent = `₹${total}`;
}

// ---------- validation ----------
function showError(fieldId, message){
  const errEl = document.getElementById(`err-${fieldId}`);
  const inputEl = document.getElementById(fieldId);
  if (errEl) errEl.textContent = message;
  if (inputEl) inputEl.classList.toggle("invalid", !!message);
}

function validateForm(){
  let valid = true;

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const city = document.getElementById("custCity").value.trim();
  const zip = document.getElementById("custZip").value.trim();

  if (name.length < 3){ showError("custName", "Please enter your full name"); valid = false; }
  else showError("custName", "");

  if (!/^[0-9]{10}$/.test(phone)){ showError("custPhone", "Enter a valid 10-digit phone number"); valid = false; }
  else showError("custPhone", "");

  if (address.length < 8){ showError("custAddress", "Please enter a complete address"); valid = false; }
  else showError("custAddress", "");

  if (city.length < 2){ showError("custCity", "Please enter your city"); valid = false; }
  else showError("custCity", "");

  if (!/^[0-9]{4,6}$/.test(zip)){ showError("custZip", "Enter a valid zip code"); valid = false; }
  else showError("custZip", "");

  return valid;
}

function generateOrderId(){
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,"0");
  const d = String(date.getDate()).padStart(2,"0");
  const rand = Math.floor(1000 + Math.random()*9000);
  return `FF${y}${m}${d}${rand}`;
}

// ---------- form submit ----------
const checkoutForm = document.getElementById("checkoutForm");
if (checkoutForm){
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) return;
    if (!validateForm()) return;

    const payment = document.querySelector('input[name="payment"]:checked').value;
    const { subtotal, delivery, tax, total } = calcTotals(cart);

    const order = {
      id: generateOrderId(),
      name: document.getElementById("custName").value.trim(),
      phone: document.getElementById("custPhone").value.trim(),
      address: document.getElementById("custAddress").value.trim(),
      city: document.getElementById("custCity").value.trim(),
      zip: document.getElementById("custZip").value.trim(),
      payment,
      items: cart,
      subtotal, delivery, tax, total,
      placedAt: Date.now()
    };

    localStorage.setItem("ff_last_order", JSON.stringify(order));
    localStorage.removeItem("ff_cart"); // clear cart after order

    window.location.href = "order-confirmation.html";
  });
}

document.addEventListener("DOMContentLoaded", renderCheckoutSummary);
