const cart = {};
const cartContainer = document.querySelector('.container__2');
const cartTitle = cartContainer.querySelector('h2');
const cartInfo = cartContainer.querySelector('.info');
const confirmButton = document.createElement('button');
confirmButton.textContent = 'Confirm Order';
confirmButton.className = 'confirm-btn';
cartContainer.appendChild(confirmButton);

function updateCartDisplay() {
  let totalItems = 0;
  let totalPrice = 0;
  let list = '';

  for (const [key, item] of Object.entries(cart)) {
    const subtotal = item.price * item.quantity;
    totalItems += item.quantity;
    totalPrice += subtotal;
    list += `<div><b>${item.name}</b> (${item.quantity} x $${item.price.toFixed(2)}) - $${subtotal.toFixed(2)}</div>`;
  }

  cartTitle.textContent = `Your Cart (${totalItems})`;
  cartInfo.innerHTML = totalItems
    ? `${list}<h3>Total: $${totalPrice.toFixed(2)}</h3>`
    : `<img src="assets/images/illustration-empty-cart.svg"><p>Your added items will appear here</p>`;
}

document.querySelectorAll('.box_1').forEach((box) => {
  const name = box.querySelector('h5').textContent.trim();
  const price = parseFloat(box.querySelector('h4').textContent.replace('$', ''));
  const button = box.querySelector('button');

  button.addEventListener('click', () => {
    if (!cart[name]) {
      cart[name] = { name, price, quantity: 1 };
    } else {
      cart[name].quantity += 1;
    }
    updateCartDisplay();
    
  });
});

confirmButton.addEventListener('click', () => {
  if (Object.keys(cart).length === 0) return;

  const modal = document.createElement('div');
  modal.className = 'order-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Order Confirmed</h2>
      <p>We hope you enjoy your food!</p>
      ${Object.values(cart)
        .map(
          (item) => `
        <div>${item.name} - ${item.quantity} x $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}</div>
      `
        )
        .join('')}
      <h3>Total: $${Object.values(cart)
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2)}</h3>
      <button onclick="location.reload()">Start New Order</button>
    </div>
  `;
  document.body.appendChild(modal);
});
