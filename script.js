// Initialize Carousel
document.addEventListener('DOMContentLoaded', function () {
  const myCarousel = new bootstrap.Carousel(document.getElementById('featuredCarousel'), {
    interval: 3000, // Change slide every 3 seconds
    ride: 'carousel' // Enable automatic sliding
  });
});

// Cart functionality (unchanged)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
  cart.push({ productName, price, quantity: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${item.productName} 
      <span>
        $${item.price} 
        <button class="btn btn-sm btn-danger remove-item" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      </span>
    `;
    cartItems.appendChild(li);
    total += parseFloat(item.price) * item.quantity;
  });
  
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

// Remove item from cart
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-item')) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }
});

// Initialize cart on load
updateCartUI();

// Add event listeners for all Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.dataset.product;
    const price = button.dataset.price;
    addToCart(productName, price);
  });
});

// Proceed to Checkout Button
document.querySelector('#cartModal .btn-primary').addEventListener('click', () => {
  // Get the total amount from the cart
  const total = document.getElementById('cart-total').textContent;
  
  // Set the total amount in the bKash modal
  document.getElementById('bkash-total').textContent = total;

  // Hide the cart modal
  const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  cartModal.hide();

  // Show the bKash modal
  const bkashModal = new bootstrap.Modal(document.getElementById('bkashModal'));
  bkashModal.show();
});

// Confirm Payment Button
document.getElementById('confirm-payment').addEventListener('click', () => {
  alert('Payment confirmed! Thank you for your purchase.');
  
  // Clear the cart
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();

  // Hide the bKash modal
  const bkashModal = bootstrap.Modal.getInstance(document.getElementById('bkashModal'));
  bkashModal.hide();
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from submitting

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Simulate form submission (you can replace this with actual API call)
  alert(`Thank you, ${name}! Your message has been sent. We will contact you at ${email} shortly.`);

  // Clear the form
  document.getElementById('contact-form').reset();
});