function displayProducts() {
    // Den div där vi vill lägga till produkterna
    const productList = document.getElementById("product-list");
    
    // Använd forEach för att iterera över varje element i products arrayen
    products.forEach((product, index) => {
    // Skapa ett produktkort (en div) för varje element i products arrayen
      const productCard = document.createElement("div");
      // Lägg till CSS-klasser till det skapade produktkortetn (div-elementet)
      productCard.classList.add("col-md-4", "mb-4");
      // Här sätter vi innehållet (HTML) för produktkortet
      productCard.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
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

// Global cart (easy local storage)
let cart = JSON.parse(localStorage.getItem('cart')) || []; 

const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

// Uppdatera kundvagnen och lokal lagring
function updateCart() {
  // Uppdatera antalet produkter i kundvagnen
  cartCount.textContent = cart.length;

  // Uppdatera listan med produkter i kundvagnen
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

  // Uppdatera totalpriset
  totalPriceElement.textContent = `Totalt: ${totalPrice} kr`;

  // Spara kundvagnen till LocalStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Lägg till produkt i kundvagnen
function addToCart(index) {
  const product = products[index];
  cart.push(product);
  updateCart();
}

// Ta bort produkt från kundvagnen
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Visa kundvagn när knappen klickas
cartBtn.addEventListener('click', () => {
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
});

// // Simulera att produkter läggs till i kundvagnen från produktsidan
// function simulateAddToCart() {
//   addToCart(0); // Lägg till Produkt 1 till kundvagnen som exempel
//   addToCart(1); // Lägg till Produkt 2 till kundvagnen som exempel
// }

// Initiera kundvagnen
updateCart();

// // Testa att lägga till produkter till kundvagnen (kan ersättas med dina knappar på produktsidan)
// simulateAddToCart();