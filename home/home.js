// Load featured products
document.addEventListener('DOMContentLoaded', function () {
    loadFeaturedProducts();
    updateCartIcon();
});

async function loadFeaturedProducts() {
    try {
        const response = await fetch('products/products.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        displayFeaturedProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('featuredProducts').innerHTML =
            '<p class="error-message">Unable to load featured products. Please try again later.</p>';
    }
}

function displayFeaturedProducts(products) {
    const featuredContainer = document.getElementById('featuredProducts');

    // Get 4 random featured products
    const featuredProducts = getRandomProducts(products, 4);

    featuredContainer.innerHTML = '';

    if (featuredProducts.length === 0) {
        featuredContainer.innerHTML = '<p>No featured products available</p>';
        return;
    }

    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">${product.price} ${product.currency || 'EGP'}</span>
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        featuredContainer.appendChild(productCard);
    });

    // Add event listeners to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function getRandomProducts(products, count) {
    // Filter products to only get those marked as featured or get random ones
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // In a real implementation, you would fetch the full product details
    const productToAdd = {
        id: productId,
        quantity: 1,
        // You would add other necessary product details here
    };

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(productToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    showAddedToCartMessage();
}

function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartcount').textContent = totalItems;
}

function showAddedToCartMessage() {
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.textContent = 'Product added to cart!';
    document.body.appendChild(message);

    setTimeout(() => {
        message.classList.add('show');
    }, 10);

    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// Newsletter form handling
document.getElementById('newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input').value;

    // In a real implementation, you would send this to your backend
    console.log('Subscribed email:', email);

    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});