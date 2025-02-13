function displayProducts() {

    const productList = document.getElementById("product-list");
    
    products.forEach((product, index) => {

      const productCard = document.createElement("div");

      productCard.classList.add("col-md-4", "mb-4");

      productCard.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price} kr per day</p>
            <button class="button" data-bs-toggle="modal" data-bs-target="#productModal" onclick="openModal(${index})">
              Details
            </button>
            <button class="add-button" onclick="addToCart(${index})">Add</button>
          </div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  }

displayProducts();


let cart = JSON.parse(localStorage.getItem('cart')) || []; 

const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

function updateCart() {
  cartCount.textContent = cart.length;

  cartItems.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((product, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
      <strong>${product.name}</strong> - ${product.price} kr
      <button class="btn btn-danger btn-sm float-end" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(li);
    totalPrice += product.price;
  });

  totalPriceElement.textContent = `Totalt: ${totalPrice} kr`;

  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(index) {
  const product = products[index];
  cart.push(product);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

cartBtn.addEventListener('click', () => {
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
});

updateCart();
