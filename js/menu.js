import { createPagination, showPage } from './pagination.js';
import { filterItems } from './filter.js';

// Fetch data from menu.json
fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        const coffeeItems = data.menu.find(category => category.category === "Coffee").items;
        const cakeItems = data.menu.find(category => category.category === "Cakes").items;
        const productItems = data.menu.find(category => category.category === "Products").items;

        // Set default visibility
        document.getElementById('coffee-section').style.display = 'grid';
        document.getElementById('cake-section').style.display = 'none';
        document.getElementById('product-section').style.display = 'none';

        let currentCoffeePage = 1;
        let currentCakePage = 1;
        let currentProductPage = 1;
        const itemsPerPage = 9;
        
        // Initialize filter values
        let coffeeFilter = document.getElementById('coffee-filter').value;
        // console.log(coffeeFilter);
        let cakeFilter = document.getElementById('cake-filter').value;

        let productFilter = document.getElementById('product-filter').value;


        function updateCoffeeSection(page) {
          const filteredCoffeeItems = filterItems(coffeeItems, coffeeFilter);
          // console.log(filteredCoffeeItems);
          showPage(filteredCoffeeItems, page, itemsPerPage, document.getElementById('coffee-section'));
          createPagination('coffee-pagination', Math.ceil(filteredCoffeeItems.length / itemsPerPage), (page) => {
              
            currentCoffeePage = page;
              updateCoffeeSection(page);

          });

          updateAllButtonStates();
      }

      function updateCakeSection(page) {
        const filteredCakeItems = filterItems(cakeItems, cakeFilter);
        showPage(filteredCakeItems, page, itemsPerPage, document.getElementById('cake-section'));
        createPagination('cake-pagination', Math.ceil(filteredCakeItems.length / itemsPerPage), (page) => {
            currentCakePage = page;
            updateCakeSection(page);
        });

        updateAllButtonStates();
      }

      function updateProductSection(page) {
        const filteredProductItems = filterItems(productItems, productFilter);
        showPage(filteredProductItems, page, itemsPerPage, document.getElementById('product-section'));
        createPagination('product-pagination', Math.ceil(filteredProductItems.length / itemsPerPage), (page) => {
            currentProductPage = page;
            updateProductSection(page);
        });

        updateAllButtonStates();
      }


      function disableFiltersForCurrentSection() {
        const coffeeSectionVisible = document.getElementById('coffee-section').style.display === 'grid';
        const cakeSectionVisible = document.getElementById('cake-section').style.display === 'grid';
 
        if(coffeeSectionVisible) {
          document.getElementById('coffee-filter').style.display = 'block';
          document.getElementById('cake-filter').style.display = 'none';
          document.getElementById('product-filter').style.display = 'none';
        }
        else if(cakeSectionVisible) {
          document.getElementById('coffee-filter').style.display = 'none';
          document.getElementById('cake-filter').style.display = 'block';
          document.getElementById('product-filter').style.display = 'none';
        }
        else {
          document.getElementById('coffee-filter').style.display = 'none';
          document.getElementById('cake-filter').style.display = 'none';
          document.getElementById('product-filter').style.display = 'block';
        }
        
    }

        // Initialize sections
        updateCoffeeSection(currentCoffeePage);

        // Button event listeners
        document.getElementById('coffee-btn').addEventListener('click', () => {
            document.getElementById('coffee-section').style.display = 'grid';
            document.getElementById('coffee-pagination').style.display = 'block';
            document.getElementById('cake-section').style.display = 'none';
            document.getElementById('cake-pagination').style.display = 'none';
            document.getElementById('product-section').style.display = 'none';
            document.getElementById('product-pagination').style.display = 'none';
            
            updateCoffeeSection(currentCoffeePage);
            disableFiltersForCurrentSection();
        });

        document.getElementById('cake-btn').addEventListener('click', () => {
            document.getElementById('cake-section').style.display = 'grid';
            document.getElementById('cake-pagination').style.display = 'block';
            document.getElementById('coffee-section').style.display = 'none';
            document.getElementById('coffee-pagination').style.display = 'none';
            document.getElementById('product-section').style.display = 'none';
            document.getElementById('product-pagination').style.display = 'none';
            
            updateCakeSection(currentCakePage);
            disableFiltersForCurrentSection();
        });

        document.getElementById('product-btn').addEventListener('click', () => {
          document.getElementById('product-section').style.display = 'grid';
          document.getElementById('product-pagination').style.display = 'block';
          document.getElementById('coffee-section').style.display = 'none';
          document.getElementById('coffee-pagination').style.display = 'none';
          document.getElementById('cake-section').style.display = 'none';
          document.getElementById('cake-pagination').style.display = 'none';
          
          updateProductSection(currentProductPage);
          disableFiltersForCurrentSection();
      });

         // Event listeners for filter dropdowns
         document.getElementById('coffee-filter').addEventListener('change', (event) => {
          coffeeFilter = event.target.value;
          currentCoffeePage = 1; // Reset to first page
          updateCoffeeSection(currentCoffeePage);

          // console.log(currentCoffeePage);
        });

        document.getElementById('cake-filter').addEventListener('change', (event) => {
            cakeFilter = event.target.value;
            currentCakePage = 1; // Reset to first page
            updateCakeSection(currentCakePage);
        });

        document.getElementById('product-filter').addEventListener('change', (event) => {
          productFilter = event.target.value;
          currentProductPage = 1; // Reset to first page
          updateProductSection(currentProductPage);
      });

        // Set default view
        document.getElementById('cake-section').style.display = 'none';
        document.getElementById('cake-pagination').style.display = 'none';
        document.getElementById('product-section').style.display = 'none';
        document.getElementById('product-pagination').style.display = 'none';
        
        disableFiltersForCurrentSection();
    })
    .catch(error => console.error('Error fetching menu data:', error));


   // Select all the buttons inside the container
const buttons = document.querySelectorAll('.button-container div');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Remove 'active' class from all buttons
    buttons.forEach((btn) => btn.classList.remove('active'));

    // Add 'active' class to the clicked button
    e.target.classList.add('active');
  });
});

