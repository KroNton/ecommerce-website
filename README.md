# SantTech E-Commerce Website


SantTech is a modern e-commerce platform specializing in technology products. This repository contains the frontend implementation of the website with user authentication, product browsing, cart functionality, and order management.

## Project Structure
```
ecommerce-website 
|
├── assets
│ └── logo.jpg
├── auth
│ ├── auth.css
│ ├── auth.html
│ └── auth.js
├── cart
│ ├── cart.css
│ ├── cart.html
│ └── cart.js
├── common-style
│ └── header-footer.css
├── home
│ ├── home.css
│ └── home.js
├── images
│ ├── banner
│ │ └── h1.jpg
│ └── products
│ ├── product1.png
│ ├── product2.png
│ └── ... (product images)
├── index.html
├── orders
│ ├── orders.css
│ ├── orders.html
│ └── orders.js
├── products
│ ├── products.css
│ ├── products.html
│ ├── products.js
│ └── products.json
├── README.md
└── utils.js
```

## Features

### 1. User Authentication
- Login and registration system
- Secure session management
- User profile handling

### 2. Product Catalog
- Browse technology products
- Product categories and filtering
- Detailed product views

### 3. Shopping Cart
- Add/remove products
- Quantity adjustment
- Cart persistence

### 4. Order Management
- Order history
- Order status tracking
- Order details

### 5. Responsive Design
- Mobile-friendly layout
- Consistent styling across devices

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- JSON for product data

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge)
- Web server for local development (optional)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/KroNton/ecommerce-website.git
   ```
2. Navigate to the project directory:

``` bash
cd ecommerce-website
```
3. Open index.html in your browser to launch the application.

Usage
Home Page: Landing page with featured products and banners

Products: Browse all available technology products

Cart: Manage your shopping cart before checkout

Orders: View your order history and status

Authentication: Register or login to access full features

### Data Structure
Product data is stored in products/products.json with the following structure:
``` json
[

    {
      "id": 1,
      "name": "Product Name",
      "price": 99.99,
      "currency": "EGP",
      "category": "Smart watches",
      "description": "Product description",
      "image": "product1.png",
    },
]

```

## Development
### Style Guidelines
- Common styles are in common-style/header-footer.css

- Page-specific styles are in their respective directories

- Follow BEM naming convention for CSS classes

### JavaScript Modules
- Utility functions are in utils.js

- Page-specific logic is in respective JS files

- Event listeners are set up in each module

### Future Enhancements
- Payment gateway integration

- Product search functionality

- User reviews and ratings

- Admin dashboard for product management

- Wishlist feature

