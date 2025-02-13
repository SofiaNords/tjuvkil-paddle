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