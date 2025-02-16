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
          
          <!-- Quantity input, Add to Cart, and Details buttons -->
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center me-2">
              <label for="productQuantity${index}" class="form-label mb-0 me-2">Quantity</label>
              <input type="number" id="productQuantity${index}" class="form-control" value="1" min="1" style="width: 60px;">
            </div>

            <div class="d-flex">
              <!-- Details Button -->
              <button class="btn btn-info me-2" data-bs-toggle="modal" data-bs-target="#productModal" onclick="openModal(${index})">Details</button>

              <!-- Add to Cart Button -->
              <button class="btn btn-primary" onclick="addToCart(${index})">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
  });
}




displayProducts();

let currentProductIndex = null;

function openModal(index) {
  const product = products[index];
  
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalDescription").textContent = product.description;

  currentProductIndex = index;

  const addToCartModalBtn = document.getElementById("addToCartModalBtn");
  addToCartModalBtn.style.display = "block";
}



let cart = JSON.parse(localStorage.getItem('cart')) || []; 

const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

function updateCart() {
  cartCount.textContent = cart.reduce((total, product) => total + product.quantity, 0);

  cartItems.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((product, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');

    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center cart-item">
        <div class="cart-item-name">${product.name}</div>
        <div class="cart-item-quantity">
          <input 
            type="number" 
            class="form-control quantity-input" 
            value="${product.quantity}" 
            min="1" 
            onchange="updateQuantity(${index}, this.value)"
            style="width: 60px;">
        </div>
        <div class="cart-item-price">${product.price * product.quantity} kr</div>
        <button class="btn btn-danger btn-sm remove-btn" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartItems.appendChild(li);
    totalPrice += product.price * product.quantity;
  });

  totalPriceElement.textContent = `Total: ${totalPrice} kr`;

  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantity(index, newQuantity) {
  if (newQuantity < 1) {
    newQuantity = 1; 
  }
  cart[index].quantity = parseInt(newQuantity);
  updateCart();
}

function addToCart(index) {
  const quantityInput = document.getElementById(`productQuantity${index}`);
  const quantity = parseInt(quantityInput.value, 10); 
  const product = products[index];

  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity,
    });
  }

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


function addToCartFromModal() {
  if (currentProductIndex !== null) {
    const product = products[currentProductIndex];
    
    const quantity = parseInt(document.getElementById("productQuantity").value);

    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      cart.push(product);
    }

    updateCart();

    const modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
    modal.hide();
  }
}

const apiKey = "eaa060c139865127fb1a852acd62c9c0";
const city = "Tjuvkil"; 

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const weather = data.weather[0].description;
    const temp = data.main.temp - 273.15; 
    const windSpeed = data.wind.speed;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(); 
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(); 
    document.getElementById('weather').innerHTML = `<h3>Weather in ${city}:</h3>
     <p>Temperature: ${temp.toFixed(1)}°C, Wind Speed: ${windSpeed} m/s</p>
     <p>Sunrise: ${sunrise}, Sunset: ${sunset}</p>
      `;
  })
  .catch(error => console.error("Error:", error));