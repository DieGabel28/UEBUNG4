let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  showNotification();
}

function showNotification() {
  const notif = document.getElementById('notification');
  if (!notif) return;
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 2000);
}

function filterCategory(category) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
  });
}

function loadCart() {
  const list = document.getElementById('cartItems');
  const totalEl = document.getElementById('total');
  if (!list) return;

  let total = 0;
  list.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.name + ' - €' + item.price;

    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.onclick = () => {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
    };

    li.appendChild(btn);
    list.appendChild(li);
    total += item.price;
  });

  if (totalEl) totalEl.textContent = 'Gesamt: €' + total;
}

function clearCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

window.onload = loadCart;
