// pagination.js

// Create pagination controls and handle page changes
function createPagination(containerId, totalPages, onPageChange) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Clear existing pagination

  for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.add('pagination-btn');

      button.addEventListener('click', () => onPageChange(i));
      
      container.appendChild(button);
  }
}

// Show specific page of items
function showPage(items, page, itemsPerPage, container) {
  container.innerHTML = ''; // Clear existing items
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = items.slice(start, end);

  paginatedItems.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <div class='card-img'>
            <img src="${item.image}" alt="${item.name}">
          </div>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span class="price">$${item.price}</span>
          <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
      `;
      container.appendChild(card);
  });
}

export { createPagination, showPage };
 

