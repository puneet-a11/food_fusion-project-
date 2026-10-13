/* =========================================================
   ORDER CONFIRMATION + TRACKING LOGIC
========================================================= */

function loadOrder(){
  const order = JSON.parse(localStorage.getItem("ff_last_order"));
  return order;
}

function renderOrderDetails(order){
  document.getElementById("orderIdText").textContent = `#${order.id}`;

  const itemsList = document.getElementById("orderItemsList");
  itemsList.innerHTML = order.items.map(item => `
    <div class="summary-item-row">
      <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/50/eee/999?text=food'">
      <div class="si-info"><h5>${item.name}</h5><span>Qty: ${item.qty}</span></div>
      <div class="si-price">₹${item.price * item.qty}</div>
    </div>`).join("");

  document.getElementById("ordSubtotal").textContent = `₹${order.subtotal}`;
  document.getElementById("ordDelivery").textContent = `₹${order.delivery}`;
  document.getElementById("ordTax").textContent = `₹${order.tax}`;
  document.getElementById("ordTotal").textContent = `₹${order.total}`;
}

// ---------- tracking animation ----------
// Simulates: Placed -> Preparing -> Out for Delivery -> Delivered
function startTracking(){
  const steps = document.querySelectorAll(".track-step");
  const lineFill = document.getElementById("trackLineFill");
  let current = 1;

  function updateStep(step){
    steps.forEach((el) => {
      const s = parseInt(el.dataset.step);
      el.classList.remove("active", "done");
      if (s < step) el.classList.add("done");
      else if (s === step) el.classList.add("active");
    });
    const percent = ((step - 1) / (steps.length - 1)) * 100;
    lineFill.style.width = `${percent}%`;
  }

  updateStep(current);

  const interval = setInterval(() => {
    current++;
    if (current > steps.length){
      // mark final step fully done
      steps.forEach(el => { el.classList.remove("active"); el.classList.add("done"); });
      lineFill.style.width = "100%";
      clearInterval(interval);
      return;
    }
    updateStep(current);
  }, 4000); // moves to next stage every 4 seconds (demo speed)
}

document.addEventListener("DOMContentLoaded", () => {
  const order = loadOrder();
  if (!order){
    // no order found — send back to menu
    window.location.href = "menu.html";
    return;
  }
  renderOrderDetails(order);
  startTracking();
});
