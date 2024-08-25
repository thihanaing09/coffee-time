// Function to filter items based on selected criteria
function filterItems(items, criteria) {
  switch (criteria) {
      case 'popular':
          return items.filter(item => item.isPopular);
      case 'new':
          return items.filter(item => item.isNewArrival);
      case 'discount':
          return items.filter(item => item.isDiscounted);
      default:
          return items; // 'all' or any other criteria
  }
}

// Export the filter function
export { filterItems };
