import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../constants";

const useRestaurantDetails = (resId) => {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    async function getRestaurantDetails() {
      try {
        const response = await fetch(FETCH_MENU_URL + resId);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const json = await response.json();

        const menuItemsList = json.data.cards[2]["groupedCard"].cardGroupMap.REGULAR.cards;
        const itemCategory = "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
        const NestedItemCategory = "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory";

        const menu = menuItemsList.filter(item => 
          item.card.card["@type"] === itemCategory || item.card.card["@type"] === NestedItemCategory
        ).map(item => item.card.card);

        const modifiedData = {
          info: json.data.cards[0].card.card.info,
          menu: menu,
        };

        setRestaurant(modifiedData);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    }

    getRestaurantDetails();
  }, [resId]);

  return restaurant;
};

export default useRestaurantDetails;
