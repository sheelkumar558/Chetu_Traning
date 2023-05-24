/**
 *Constants
 */
const USER_CART = "USER_CART";
const PLACEHOLDER_IMG = "./image/placeholder.jpeg";
const CART_LIMIT = 15;

/**
 * Elements
 */
const lazyImages = document.querySelectorAll(".lazy-img");
const cartItems = document.querySelector("#cart-items");
const modalBtn = document.querySelector("#custom-btn");
const shoppingBtns = document.querySelectorAll(".shoping");

/**
 * Load lazy images when visible in the viewport
 */

lazyImages.forEach((element) => {
  element.src = PLACEHOLDER_IMG;
});

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.getAttribute("data-src");
    }
  });
};

const observer = new IntersectionObserver(observerCallback);

/**
 * Cart related functionality
 */

const refreshCartCount = () => {
  const count = localStorage.getItem(USER_CART) || 0;
  cartItems.innerHTML = count;
};

const handleAddToCart = () => {
  const count = localStorage.getItem(USER_CART) || 0;
  localStorage.setItem(USER_CART, Number(count) + 1);
  refreshCartCount();
  Notifier.fire(getMessage(), count > CART_LIMIT ? 'success' : 'success');
};

shoppingBtns.forEach((element) => {
  element.addEventListener('click', handleAddToCart);
});

const getMessage = () => {
    const count = localStorage.getItem(USER_CART) || 0;
    const badge =  count === 0 ? '' : `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${Number(count) > 10 ? 10 +'+' : count }</span></i>`;
    const emptyCartBtn = count === 0 ? '' : `<div>
        <button class="btn btn-success btn-sm" style="margin-left: 10px" onclick="handlePurchase()">Purchase</button>
        <button class="btn btn-danger btn-sm" style="margin-left: 10px" onclick="handleEmptyCart()">Empty cart</button>
    </div>`;

    if(count === 0) {
        return `Please add some items to your cart ${emptyCartBtn}  ${badge}`;
    }

    const msg = `${count} Items added to your cart ${emptyCartBtn}  ${badge}`;
    return Number(count) > CART_LIMIT ? `Your cart is already full. Please remove/purchase products ${emptyCartBtn} ${badge}` : msg;
}

const handleEmptyCart = () => {
    localStorage.removeItem(USER_CART);
    refreshCartCount();
    Notifier.fire(getMessage());
}

const handlePurchase = () => {
    localStorage.removeItem(USER_CART);
    refreshCartCount();
    Notifier.hide();
    Notifier.fire('Purchased successfully! your order will dispatch soon :) <button onclick="handleReorder()" class="btn btn-warning btn-sm">Reorder</button>')
}

const handleReorder = () => {
    Notifier.hide();
}

/**
 * Load initials
 */

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    modalBtn.click();
  }, 2000);

  lazyImages.forEach((element) => {
    observer.observe(element);
  });

  refreshCartCount();
});
