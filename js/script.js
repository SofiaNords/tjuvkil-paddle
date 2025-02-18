let cart = [];

function displayProducts() {
  const productList = document.getElementById("productList");

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


function openModal(index) {
  const product = products[index];
  
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("productModalLabel").textContent = product.name;
}


function addToCart(index) {
  const product = products[index];
  const quantity = document.getElementById(`productQuantity${index}`).value;

  const cartItem = {
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: parseInt(quantity),
  };

  const existingItemIndex = cart.findIndex(item => item.name === cartItem.name);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += cartItem.quantity;
  } else {
    cart.push(cartItem);
  }

  updateCart();
}


function updateCart(){
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const totalPriceElement = document.getElementById("totalPrice");

  cartItemsContainer.innerHTML = "";

  let totalPrice = 0;
  let totalProducts = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement("li");
    cartItemElement.classList.add("list-group-item");

    cartItemElement.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;" class="me-2">
          <span>${item.name} - ${item.quantity} x ${item.price} kr</span>
        </div>
        <span>${item.quantity * item.price} kr</span>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemElement);

    totalPrice += item.quantity * item.price;

    totalProducts += item.quantity;
  });

  cartCount.textContent = totalProducts;

  console.log(totalProducts);

  totalPriceElement.textContent = `Total: ${totalPrice} kr`;
}