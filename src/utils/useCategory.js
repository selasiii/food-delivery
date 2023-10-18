import { useState, useEffect } from "react";
import { FETCH_CATEGORY_MENU_URL } from "../constants";

const useCategory = (categoryId) => {
  const [categoryMenuData, setCategoryMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(FETCH_CATEGORY_MENU_URL + categoryId);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        const restaurantInfos = json.data.cards
          .map(card => card?.card?.card?.info)
          .filter(info => info !== undefined);
        const data = {
          title: json.data.cards[0].card.card.title,
          description: json.data?.cards[0].card?.card?.description,
          filteredRestaurants: restaurantInfos,
        };
        setCategoryMenuData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [categoryId]);

  return { categoryMenuData, isLoading, error };
};

export default useCategory;
