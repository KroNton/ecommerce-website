

let products = []; // Changed from const to let so we can reassign

async function fetchProducts() {
  try {
    const response = await fetch('./products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    products = await response.json();
    renderProducts();
  } catch (error) {
    console.error('Error loading products:', error);
    // Fallback to empty array or default products
    products = [];
    renderProducts();
  }
}

function renderProducts() {
  const productsContainer = document.querySelector('.products-grid');

  if (!productsContainer) {
    console.error('Products container not found');
    return;
  }

  // Clear existing products
  productsContainer.innerHTML = '';

  if (products.length === 0) {
    productsContainer.innerHTML = '<p class="no-products">No products available</p>';
    return;
  }

  // Create and append each product card
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" >
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="product-price">
          <span class="current-price">${product.price} ${product.currency || 'EGP'}</span>
        </div>
        <div class="product-category">
          <span class="category">${product.category || 'Uncategorized'}</span>
        </div>
        <div class="product-description">
          <span class="description">${product.description || 'No description available'}</span>
        </div>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;

    productsContainer.appendChild(productCard);
  });

  // Add event listeners to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const productId = parseInt(this.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      if (product) {
        addToCart(product);
      }
    });
  });
}

function addToCart(product) {
  console.log('Added to cart:', product);
  // Here you would implement your actual cart logic
  alert(`Added ${product.name} to cart!`);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchProducts);