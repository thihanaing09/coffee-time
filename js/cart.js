// cart.js

// Function to get cart items from local storage
function getCartItems() {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
}

// Function to set cart items in local storage
function setCartItems(cartItems) {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to get cart count from local storage
function getCartCount() {
  return getCartItems().length;
}

// Function to set cart count in local storage
function setCartCount(count) {
  localStorage.setItem('cartCount', count);
}

// Function to update cart count in the navbar
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
      cartCountElement.textContent = getCartCount();
  }
}

// Function to update the state of all "Add to Cart" buttons
function updateAllButtonStates() {
  const cartItems = getCartItems();
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
      const itemId = button.dataset.id;
      if (cartItems.some(item => item.id === itemId)) {
        button.disabled = true;
        button.textContent = 'Added';
        button.style.backgroundColor = "Silver";
        button.style.color = "black";
        button.style.cursor = "not-allowed";
        
      } else {
          button.textContent = 'Add to Cart';
          button.disabled = false;
      }
  });
}

// Function to add item to cart
function addToCart(event) {
  if (event.target.classList.contains('add-to-cart')) {
      event.preventDefault();
      const button = event.target;
      const itemId = button.dataset.id;

      // Update cart items in local storage
      let cartItems = getCartItems();
      const itemExists = cartItems.find(item => item.id === itemId);
      
      if (itemExists) {
          itemExists.quantity += 1;
      } else {
          cartItems.push({ id: itemId, quantity: 1 });
      }
      setCartItems(cartItems);

      // Update cart count
      setCartCount(getCartCount());
      updateCartCount();

      // Update the state of the clicked button
      updateButtonState(button);
  }
}

// Function to update a single button state
function updateButtonState(button) {
  const itemId = button.dataset.id;
  const cartItems = getCartItems();
  if (cartItems.some(item => item.id === itemId)) {
      button.textContent = 'Added';
      button.disabled = true;
      button.style.backgroundColor = "Silver";
      button.style.color = "black";
      button.style.cursor = "not-allowed";
  } else {
      button.textContent = 'Add to Cart';
      button.disabled = false;
  }
}
// --------------


// Function to fetch items data from menu.json
async function fetchMenuData() {
  const response = await fetch('menu.json');
  const data = await response.json();
  return data.menu;
}

function getItemDetails(items, itemId) {
  itemId = String(itemId); // Ensure itemId is a string
  return items.find(item => String(item.id) === itemId); // Ensure item.id is a string
}

// Function to calculate the total cart price
function calculateCartTotal(cartItems, items) {
  return cartItems.reduce((total, cartItem) => {
      const item = getItemDetails(items, cartItem.id);
      return total + (item.price * cartItem.quantity);
  }, 0).toFixed(2);
}


// Function to display cart items in a table
async function displayCartItems() {
  const cartItems = getCartItems();
  const menuData = await fetchMenuData();
  const items = menuData.map(category => category.items).flat();
  // console.log(items);
  
  const cartTableBody = document.getElementById('cart-body');
  const cartTable = document.getElementById('cart-table');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartSummary = document.getElementById('cart-summary');
  const cartTotal = document.getElementById('cart-total');

  if (cartTableBody && emptyCartMessage) {
      if (cartItems.length === 0) {
          // Show "Nothing In Cart" message and hide the table
          emptyCartMessage.style.display = 'block'; 
          cartTableBody.style.display = 'none';
          cartTable.style.display = 'none';
          cartSummary.style.display = 'none';
      } else {
          // Hide "Nothing In Cart" message and show the table
          emptyCartMessage.style.display = 'none';
          cartTableBody.style.display = 'table-row-group'; // or 'block', depending on your table structure
          
          // Clear existing rows
          cartTableBody.innerHTML = '';

          // Populate table with cart items
          // console.log(cartItems);
          cartItems.forEach(itemId => {
            // console.log(itemId);
              const item  = getItemDetails(items, itemId.id);
              // console.log(Newitem);
              // Fetch item details from menu.json or similar
              // Placeholder code below
              // const itemDetails = { name: `Item ${item.id}`, price: 10 }; // Replace with actual item fetch

              const row = document.createElement('tr');
              row.innerHTML = `
                  <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;"></td>        
                  <td>$${(item.price).toFixed(2)}</td>
                  
                  <td>
                      <button class="decrease-quantity" data-id="${item.id}">-</button>
                      <span class="quantity">${itemId.quantity}</span>
                      <button class="increase-quantity" data-id="${item.id}">+</button>
                  </td>
                  <td>$${(itemId.quantity * item.price).toFixed(2)}</td>
                  <td><button class="remove-item" data-id="${item.id}">Remove</button></td>
              `;
              cartTableBody.appendChild(row);
          });

          // Update cart total
          const total = calculateCartTotal(cartItems, items);
          cartTotal.textContent = total;
      }
  }
}

async function handleQuantityChange(event) {
  if (event.target.classList.contains('increase-quantity') || event.target.classList.contains('decrease-quantity')) {
      const cartItems = getCartItems();
      const itemId = event.target.dataset.id;
      const item = cartItems.find(item => item.id === itemId);

      if (item) {
          if (event.target.classList.contains('increase-quantity')) {
              item.quantity += 1;
          } else if (event.target.classList.contains('decrease-quantity')) {
              if (item.quantity > 1) {
                  item.quantity -= 1;
              }
          }
      }

      setCartItems(cartItems);
      
      // Update the quantity display
      const quantityElement = event.target.closest('tr').querySelector('.quantity');
      quantityElement.textContent = item.quantity;
      
      // Update the total price for the item
      const priceElement = event.target.closest('tr').querySelector('td:nth-child(4)');
      const menuData = await fetchMenuData();
      const items = menuData.map(category => category.items).flat();
      const itemDetails = getItemDetails(items, itemId);
      priceElement.textContent = `$${(item.quantity * itemDetails.price).toFixed(2)}`;

      // Update the overall cart total
      const cartTotal = document.getElementById('cart-total');
      const total = calculateCartTotal(cartItems, items);
      cartTotal.textContent = total;

      // Update the cart count in the navbar
      updateCartCount();
  } else if (event.target.classList.contains('remove-item')) {
      const cartItems = getCartItems();
      const itemId = event.target.dataset.id;

      const newCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(newCartItems);
      setCartCount(newCartItems.length);
      updateCartCount();
      displayCartItems();
  }
}

function handleCheckout() {
  alert('Checkout successful! Thank you for your purchase.');
  // Optionally, clear the cart after a successful checkout
  localStorage.removeItem('cartItems');
  displayCartItems();
  updateCartCount();
}

// Initialize event listeners and display cart items
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateAllButtonStates();
  displayCartItems();

  document.addEventListener('click', (event) => {
      addToCart(event);
      handleQuantityChange(event);

      if (event.target.id === 'checkout-btn') {
        let text;
        if (confirm("Are you sure you buy this") == true) {
          handleCheckout();
        } 
        
      }
  });

});
