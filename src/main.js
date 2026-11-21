
import './style.css'

document.querySelector('#app').innerHTML = `
  <header class="navbar">
    <a href="#" class="logo">
  <img src="/Golden%20Fashion%20Sneaker%20Emblem.png" alt="YOUR FASHION Logo" style="height:60px; width:auto;">
</a>

    <nav>
      <a href="#home">Home</a>
      <a href="#collections">Collections</a>
      <a href="#shop">Shop</a>
    </nav>

    <button class="cart-btn" id="cartBtn">
      🛒 Cart <span id="cartCount">0</span>
    </button>
  </header>

  <main>
    <section class="hero" id="home">
      <p class="eyebrow">THE PREMIUM SHOE COLLECTION</p>
      <h1>STEP INTO<br><span>YOUR STYLE.</span></h1>
      <p class="hero-text">
        Discover your perfect pair. Walk with confidence.
      </p>
      <a href="#shop" class="gold-btn">EXPLORE COLLECTION</a>
    </section>

    <section class="collections" id="collections">
      <p class="eyebrow">EXPLORE YOUR STYLE</p>
      <h2>Our Collections</h2>

      <div class="category-grid">
        <button class="category" data-category="Men">MEN'S SHOES <span>→</span></button>
        <button class="category" data-category="Women">WOMEN'S SHOES <span>→</span></button>
        <button class="category" data-category="Kids">KIDS' SHOES <span>→</span></button>
      </div>
    </section>

    <section class="shop-section" id="shop">
      <p class="eyebrow">YOUR NEXT FAVOURITE PAIR</p>
      <h2>Shop Shoes</h2>

      <div class="tools">
        <input id="searchInput" type="search" placeholder="Search shoes...">

        <select id="categoryFilter">
          <option value="All">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <select id="sortFilter">
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="new">Newest First</option>
        </select>
      </div>

      <div class="empty-products">
        <div class="shoe-icon">✧</div>
        <h3>Your Collection Starts Here</h3>
        <p>Our exclusive shoes collection will be added soon.</p>
      </div>
    </section>
  </main>

  <div class="cart-panel" id="cartPanel">
    <div class="cart-content">
      <button id="closeCart" class="close-btn">✕</button>
      <h2>Shopping Cart</h2>
      <p id="cartMessage">Your cart is empty.</p>
    </div>
  </div>

  <footer>
    <a href="#home" class="logo">YOUR <span>FASHION</span></a>
    <p>Walk with confidence. Walk with style.</p>
    <small>© 2026 YOUR FASHION. All Rights Reserved.</small>
  </footer>
`

let cart = []
function updateCart() {
  document.querySelector('#cartCount').textContent = cart.length

  document.querySelector('#cartMessage').textContent =
    cart.length === 0
      ? 'Your cart is empty.'
      : `You have ${cart.length} item(s) in your cart.`
}

const cartBtn = document.querySelector('#cartBtn')
const cartPanel = document.querySelector('#cartPanel')

cartBtn.addEventListener('click', () => {
  cartPanel.classList.add('active')
  updateCart()
})

document.querySelector('#closeCart').addEventListener('click', () => {
  cartPanel.classList.remove('active')
})

document.querySelectorAll('.category').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#categoryFilter').value =
      button.dataset.category
    document.querySelector('#shop').scrollIntoView({
      behavior: 'smooth'
    })
  })
})

const wishlist = []

const wishlistBtn = document.createElement('button')
wishlistBtn.className = 'cart-btn'
wishlistBtn.textContent = '♡ Wishlist'

document.querySelector('.navbar').insertBefore(
  wishlistBtn,
  document.querySelector('#cartBtn')
)

const wishlistPanel = document.createElement('div')
wishlistPanel.className = 'cart-panel'
wishlistPanel.innerHTML = `
  <div class="cart-content">
    <button class="close-btn" id="closeWishlist">✕</button>
    <h2>My Wishlist ♡</h2>
    <p id="wishlistMessage">Your wishlist is empty.</p>
  </div>
`

document.body.appendChild(wishlistPanel)

wishlistBtn.addEventListener('click', () => {
  wishlistPanel.classList.add('active')
})

document.querySelector('#closeWishlist').addEventListener('click', () => {
  wishlistPanel.classList.remove('active')
})

function addToWishlist(product) {
  wishlist.push(product)
  document.querySelector('#wishlistMessage').textContent =
    wishlist.map(item => item.name).join(', ')
}

const reviewSection = document.createElement('section')

reviewSection.className = 'shop-section'
reviewSection.id = 'reviews'

reviewSection.innerHTML = `
  <p class="eyebrow">YOUR EXPERIENCE MATTERS</p>
  <h2>Customer Reviews</h2>

  <div class="review-box">
    <div class="stars">☆☆☆☆☆</div>
    <h3>Share Your Experience</h3>

    <input id="reviewName" placeholder="Your Name">

    <select id="reviewRating">
      <option value="5">★★★★★ - Excellent</option>
      <option value="4">★★★★ - Very Good</option>
      <option value="3">★★★ - Good</option>
      <option value="2">★★ - Fair</option>
      <option value="1">★ - Poor</option>
    </select>

    <textarea id="reviewText" placeholder="Write your review..."></textarea>

    <button class="gold-btn" id="submitReview">
      SUBMIT REVIEW
    </button>

    <div id="reviewList"></div>
  </div>
`

document.querySelector('footer').before(reviewSection)

document.querySelector('#submitReview').addEventListener('click', () => {
  const name = document.querySelector('#reviewName').value.trim()
  const rating = document.querySelector('#reviewRating').value
  const message = document.querySelector('#reviewText').value.trim()

  if (!name || !message) {
    alert('Please enter your name and review.')
    return
  }

  const review = document.createElement('div')
  review.className = 'review-item'

  const heading = document.createElement('h4')
  heading.textContent = name + ' - ' + '★'.repeat(Number(rating))

  const paragraph = document.createElement('p')
  paragraph.textContent = message

  review.append(heading, paragraph)
  document.querySelector('#reviewList').prepend(review)

  document.querySelector('#reviewName').value = ''
  document.querySelector('#reviewText').value = ''
})

const checkoutSection = document.createElement('section')

checkoutSection.className = 'shop-section'
checkoutSection.id = 'checkout'

checkoutSection.innerHTML = `
  <p class="eyebrow">COMPLETE YOUR ORDER</p>
  <h2>Customer Checkout</h2>

  <form class="checkout-box" id="checkoutForm">
    <input id="customerName" type="text"
      placeholder="Full Name" required>

    <input id="customerPhone" type="tel"
      placeholder="Mobile Number" required>

    <textarea id="customerAddress"
      placeholder="Full Delivery Address" required></textarea>

    <select id="paymentMethod" required>
      <option value="">Select Payment Method</option>
      <option value="Cash on Delivery">Cash on Delivery</option>
      <option value="UPI">UPI</option>
    </select>

    <button class="gold-btn" type="submit">
      PLACE ORDER
    </button>
  </form>
`

document.querySelector('footer').before(checkoutSection)

document.querySelector('#checkoutForm').addEventListener('submit', (event) => {
  event.preventDefault()

  const name = document.querySelector('#customerName').value.trim()
  const phone = document.querySelector('#customerPhone').value.trim()
  const address = document.querySelector('#customerAddress').value.trim()
  const payment = document.querySelector('#paymentMethod').value

  if (!/^[0-9]{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit mobile number.')
    return
  }

  const message =
  `NEW ORDER - YOUR FASHION\n\n` +
  `Name: ${name}\n` +
  `Phone: ${phone}\n` +
  `Address: ${address}\n` +
  `Payment: ${payment}`

const whatsappURL =
  'https://wa.me/917029968898?text=' +
  encodeURIComponent(message)

window.open(whatsappURL, '_blank')
})
