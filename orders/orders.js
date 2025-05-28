let orders = JSON.parse(localStorage.getItem('orders'));
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const placeOrderBtn = document.getElementById('place-order-btn');
const popup = document.getElementById('order-confirmation-popup');
const closePopupBtn = document.getElementById('close-popup');
const continueShoppingBtn = document.getElementById('continue-shopping');
const orderDateSpan = document.getElementById('order-date');
const orderIdSpan = document.getElementById('order-id');
const orderTotalSpan = document.getElementById('order-total');


function saveCartToOrders() {


    if (cart.length === 0) {
        console.log('Cart is empty');
        return;
    }

    const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: [...cart], // copy cart items
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    localStorage.setItem('orders', JSON.stringify(newOrder));
    return newOrder;
}

saveCartToOrders()
displayOrderSummary()

function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.querySelector('.order-summary .summary-items');
    const summaryTotals = document.querySelector('.summary-totals');

    // Clear existing content
    orderSummary.innerHTML = '';

    if (cart.length === 0) {
        orderSummary.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99; // Fixed shipping cost
    const taxRate = 0.06; // 6% tax rate
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;

    // Add items to summary
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'summary-item';
        itemElement.innerHTML = `
      <div class="item-image">
        <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}">
      </div>
      <div class="item-details">
        <h4>${item.name}</h4>
        <div class="item-price">${item.price.toFixed(2)} EGP</div>
        <div class="item-quantity">Qty: ${item.quantity}</div>
      </div>
    `;
        orderSummary.appendChild(itemElement);
    });

    // Update totals section
    summaryTotals.innerHTML = `
    <div class="total-row">
      <span>Subtotal</span>
      <span>${subtotal.toFixed(2)} EGP</span>
    </div>
    <div class="total-row">
      <span>Shipping</span>
      <span>${shipping.toFixed(2)} EGP</span>
    </div>
    <div class="total-row">
      <span>Tax</span>
      <span>${tax.toFixed(2)} EGP</span>
    </div>
    <div class="total-row grand-total">
      <span>Total</span>
      <span>${total.toFixed(2)} EGP</span>
    </div>
  `;
}

// Show payment section when continue button is clicked
document.querySelector('.continue-btn').addEventListener('click', function () {
    // Validate shipping form first
    if (validateShippingForm()) {
        document.querySelector('.checkout-content').style.display = 'none';
        document.querySelector('.payment-form').style.display = 'block';

        // Update checkout steps
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        document.querySelectorAll('.step')[1].classList.add('active');
    }
});

// Back to shipping button
document.querySelector('.back-btn').addEventListener('click', function () {
    document.querySelector('.payment-form').style.display = 'none';
    document.querySelector('.checkout-content').style.display = 'block';

    // Update checkout steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelectorAll('.step')[0].classList.add('active');
});

// Validate shipping form
function validateShippingForm() {
    const requiredFields = [
        'first-name', 'last-name', 'address',
        'city', 'state', 'zip', 'phone'
    ];

    let isValid = true;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '#ddd';
        }
    });

    if (!isValid) {
        console.log('Please fill in all required fields');
    }

    return isValid;
}

// Payment form submission
document.getElementById('paymentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate payment form
    if (validatePaymentForm()) {
        // Process payment and submit order
        processPayment();
    }
});

function validatePaymentForm() {
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!cardName || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all payment details');
        return false;
    }

    // Simple card number validation (just checks length)
    if (cardNumber.replace(/\s/g, '').length < 15) {
        alert('Please enter a valid card number');
        return false;
    }

    // Simple expiry date validation
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }

    // Simple CVV validation
    if (cvv.length < 3 || cvv.length > 4) {
        alert('Please enter a valid CVV');
        return false;
    }

    return true;
}

function processPayment() {
    // Here you would typically send the payment details to your server
    // For demo purposes, we'll just show a success message

    // Show loading state
    const submitBtn = document.querySelector('.place-order-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    // Simulate API call
    setTimeout(() => {
        // Show success message

        if (placeOrderBtn) {
            showPopup()
        }
        // Redirect to order confirmation page
        // window.location.href = '../order-confirmation/confirmation.html';
    }, 1500);
}

function updateCartIconUI(cart) {
    let total = 0
    for (let index = 0; index < cart.length; index++) {

        total += cart[index].quantity
        console.log(total)
    }

    document.getElementById('cartcount').textContent = total;

}


updateCartIconUI(cart)






// Set current date


// Event listeners

closePopupBtn.addEventListener('click', closePopup);
continueShoppingBtn.addEventListener('click', closePopup);
popup.addEventListener('click', handleOutsideClick);
document.addEventListener('keydown', handleEscapeKey);

// Function to update order data
function updateOrderData() {
    // Get the single order (or null if none exists)
    const order = JSON.parse(localStorage.getItem('orders'));

    if (order) {
        const orderDate = new Date(order.date);

        orderDateSpan.textContent = orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        orderIdSpan.textContent = order.id;
        orderTotalSpan.textContent = order.total.toFixed(2) + ' EGP';
    }
}
// Function to show popup
function showPopup() {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Function to close popup
function closePopup() {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
    localStorage.removeItem('cart');
    localStorage.removeItem('orders');

    window.location.href = '../products/products.html';

}


// Function to handle clicks outside the popup
function handleOutsideClick(e) {
    if (e.target === popup) {
        closePopup();
    }
}

// Function to handle Escape key press
function handleEscapeKey(e) {
    if (e.key === 'Escape' && popup.style.display === 'flex') {
        closePopup();
    }
}
updateOrderData();