function generateReport() {
  const reportData = {
      items: cart,
      total: parseFloat(document.getElementById('cart-total').textContent),
      paymentMethod: document.getElementById('payment-method').value
  };
  localStorage.setItem('reportData', JSON.stringify(reportData));
  window.location.href = 'report.html';
}

// Substitua o event listener do botão 'finish-order' por este:
document.getElementById('finish-order').addEventListener('click', () => {
  const paymentMethod = document.getElementById('payment-method').value;
  if (!paymentMethod) {
      alert('Por favor, selecione um método de pagamento.');
      return;
  }
  generateReport();
});

let products = [
  { id: 1, name: "Produto 1", price: 10.99 },
  { id: 2, name: "Produto 2", price: 15.99 },
  { id: 3, name: "Produto 3", price: 20.99 }
];

let cart = [];

const productGrid = document.getElementById('product-grid');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const modal = document.getElementById('modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const finishOrderBtn = document.getElementById('finish-order');
const productForm = document.getElementById('product-form');

function displayProducts() {
  productGrid.innerHTML = '';
  products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
          <h3>${product.name}</h3>
          <p>R$ ${product.price.toFixed(2)}</p>
          <div class="product-actions">
              <button onclick="addToCart(${product.id})"><i class="fas fa-cart-plus"></i></button>
              <button onclick="editProduct(${product.id})"><i class="fas fa-edit"></i></button>
              <button onclick="removeProduct(${product.id})"><i class="fas fa-trash"></i></button>
          </div>
      `;
      productGrid.appendChild(productCard);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCartCount();
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function displayCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          ${item.name} - R$ ${item.price.toFixed(2)}
          <button onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
      `;
      cartItems.appendChild(li);
      total += item.price;
  });
  cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
  updateCartCount();
}

function editProduct(productId) {
  const product = products.find(p => p.id === productId);
  const newName = prompt('Novo nome do produto:', product.name);
  const newPrice = parseFloat(prompt('Novo preço do produto:', product.price));
  if (newName && !isNaN(newPrice)) {
      product.name = newName;
      product.price = newPrice;
      displayProducts();
  }
}

function removeProduct(productId) {
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
      products.splice(index, 1);
      displayProducts();
  }
}

cartIcon.addEventListener('click', () => {
  displayCart();
  modal.style.display = 'block';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
      modal.style.display = 'none';
  }
});

// finishOrderBtn.addEventListener('click', () => {
//   const paymentMethod = document.getElementById('payment-method').value;
//   if (!paymentMethod) {
//       alert('Por favor, selecione um método de pagamento.');
//       return;
//   }
  
//   const orderSummary = `
//       <h2>Resumo do Pedido</h2>
//       <ul>${cart.map(item => `<li>${item.name} - R$ ${item.price.toFixed(2)}</li>`).join('')}</ul>
//       <p>Total: R$ ${cartTotal.textContent}</p>
//       <p>Método de Pagamento: ${paymentMethod}</p>
//   `;
  
//   localStorage.setItem('orderSummary', orderSummary);
//   window.location.href = 'C:\Users\hilar\Desktop\projeto UX-UI\order-summary.html';
// });

function generateReport() {
  const reportData = {
      items: cart,
      total: parseFloat(document.getElementById('cart-total').textContent),
      paymentMethod: document.getElementById('payment-method').value
  };
  localStorage.setItem('reportData', JSON.stringify(reportData));
  
  // Abrir o relatório em uma nova aba
  window.open('report.html', '_blank');
}

// Event listener do botão 'finish-order'
document.getElementById('finish-order').addEventListener('click', () => {
  const paymentMethod = document.getElementById('payment-method').value;
  if (!paymentMethod) {
      alert('Por favor, selecione um método de pagamento.');
      return;
  }
  generateReport();
  
  // Limpar o carrinho e fechar o modal após gerar o relatório
  cart = [];
  updateCartCount();
  displayCart();
  document.getElementById('modal').style.display = 'none';
});


productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('product-name').value;
  const price = parseFloat(document.getElementById('product-price').value);
  if (name && !isNaN(price)) {
      const newProduct = {
          id: products.length + 1,
          name: name,
          price: price
      };
      products.push(newProduct);
      displayProducts();
      productForm.reset();
  }
});

displayProducts();