let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const cartSummaryContainer = document.getElementById('cart-summary');
const clearCartBtn = document.querySelector('.clear-cart-btn');

// Helper function to format price with commas
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to render the cart
function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartSummaryContainer.innerHTML = '';
        return;
    }

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.dataset.id = item.id;

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${item.name}</h3>
                <p class="product-description">${item.description}</p>
                <span class="product-category">${item.category}</span>
                <p class="product-price">${formatPrice(item.price)} ${item.currency}</p>
                
                <div class="quantity-controls">
                    <button class="decrease-quantity quantity-btn">-</button>
                    <span class="quantity-input">${item.quantity}</span>
                    <button class="increase-quantity quantity-btn">+</button>
                </div>
                
                <button class="remove-btn">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners after rendering
    addCartEventListeners();
    renderCartSummary();
}

// Function to render cart summary
function renderCartSummary() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const currency = cart.length > 0 ? cart[0].currency : 'EGP';

    cartSummaryContainer.innerHTML = `
        <p class="total-price">Total: ${formatPrice(total)} ${currency}</p>
        <button class="checkout-btn">Proceed to Checkout</button>
    `;
}

// Add all cart event listeners
function addCartEventListeners() {
    // Decrease quantity
    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });

    // Increase quantity
    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });

    // Remove item
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });

    // Clear cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
}

// Update cart in localStorage and render the cart
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateCartItem(productId, newQuantity) {
    if (newQuantity > 0) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity = parseInt(newQuantity);
        }
    } else {
        // Remove item if quantity is 0
        cart = cart.filter(item => item.id !== productId);
    }
    updateCart();
}

function increaseQuantity(e) {
    const itemElement = e.target.closest('.cart-item');
    const itemId = parseInt(itemElement.dataset.id);
    const item = cart.find(item => item.id === itemId);

    if (item && item.quantity < 5) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(e) {
    const itemElement = e.target.closest('.cart-item');
    const itemId = parseInt(itemElement.dataset.id);
    const item = cart.find(item => item.id === itemId);

    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
    }
}

function removeFromCart(e) {
    const itemElement = e.target.closest('.cart-item');
    const itemId = parseInt(itemElement.dataset.id);
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

// Initialize cart on page load
renderCart();