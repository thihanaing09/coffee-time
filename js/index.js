// index.js

// Fetch data from menu.json
fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        generatePopularCoffeeCards(data);
        generatePopularProductCards(data);
    })
    .catch(error => console.error('Error fetching menu data:', error));

// Function to generate popular coffee cards
function generatePopularCoffeeCards(data) {
    const coffeeSection = document.querySelector('.coffee-cards');
    const coffeeItems = data.menu.find(category => category.category === "Coffee").items;

    // Filter popular coffee items and limit to 3 items
    const popularCoffeeItems = coffeeItems.filter(item => item.isPopular).slice(0, 3);

    popularCoffeeItems.forEach(item => {
        const coffeeCard = document.createElement('div');
        coffeeCard.classList.add('coffee-card');
        coffeeCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">$${item.price}</span>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        `;
        coffeeSection.appendChild(coffeeCard);
    });
}

// Function to generate popular product cards
function generatePopularProductCards(data) {
    const productSection = document.querySelector('.product-cards');
    const productItems = data.menu.find(category => category.category === "Products").items;

    // Filter popular product items and limit to 3 items
    const popularProductItems = productItems.filter(item => item.isPopular).slice(0, 3);

    popularProductItems.forEach(item => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">$${item.price}</span>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        `;
        productSection.appendChild(productCard);
    });
}

