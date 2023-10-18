export function filterRestaurantsByName(searchText, restaurants) {
    if (!Array.isArray(restaurants)) {
      throw new Error("Expected restaurants to be an array");
    }
  
    const trimmedSearchText = searchText.trim().toLowerCase();
  
    return restaurants.filter((restaurant) =>
      restaurant?.info?.name?.toLowerCase()?.includes(trimmedSearchText)
    );
  }
  