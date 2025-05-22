let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const cartSummaryContainer = document.getElementById('cart-summary');
const clearCartBtn = document.querySelector('.clear-cart-btn');

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}
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
                                <button class="quantity-btn">-</button>
                                <input type="number" value="${item.quantity}" min="1" max="${item.maxQuantity || item.quantity}" class="quantity-input">
                                <button class="quantity-btn">+</button>
                            </div>
                            
                            <button class="remove-btn">Remove</button>
                        </div>
                    `;

        cartItemsContainer.appendChild(cartItem);
    });

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



renderCart();