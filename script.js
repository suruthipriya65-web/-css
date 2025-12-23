// Select elements
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const orderForm = document.getElementById('order-form');

let cart = [];

// 🔹 Add item to cart
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const cake = button.parentElement;
    const name = cake.getAttribute('data-name');
    const price = parseFloat(cake.getAttribute('data-price'));

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

// 🔹 Update cart UI
function updateCart() {
  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartItemsList.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
}

// 🔹 Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// 🔹 Checkout button
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Proceeding to checkout...');
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// 🔹 Order form submission
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;

  // Simple validation
  if (!name || !address || !phone) {
    alert('Please fill in all fields.');
    return;
  }

  // Show order summary
  let orderSummary = '🎂 Order Summary:\n';
  cart.forEach(item => {
    orderSummary += ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n;
  });
  orderSummary += Total: $${cartTotal.textContent}\n\n;
  orderSummary += Customer: ${name}\nAddress: ${address}\nPhone: ${phone};

  alert(orderSummary);


  // Clear cart & form
  cart = [];
  updateCart();
  orderForm.reset();
});