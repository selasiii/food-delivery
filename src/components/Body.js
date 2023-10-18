import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { ShimmerCards } from "./Shimmer";
import { FETCH_RESTAURANTS } from "../constants";
import useOnline from "../utils/useOnline";
import Loader from "./Loader";
import NotFound from "./NotFound";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const isOnline = useOnline();

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const response = await fetch(FETCH_RESTAURANTS);
    const json = await response.json();

    async function checkJsonData(jsonData) {
      return jsonData?.data?.cards.find(
        card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    }

    const resData = await checkJsonData(json);


    setAllRestaurants(resData);
    setFilteredRestaurants(resData);
  }

  if (!allRestaurants) return <Loader />;
  if (!isOnline) {
    return (
      <h2>
        There is a problem with your internet connection. Please try again
      </h2>
    );
  }

  return allRestaurants.length === 0 ? (
    <ShimmerCards />
  ) : (
    <>
      {filteredRestaurants.length === 0 ? (
        <NotFound />
      ) : (
        <>
          <h1 className="main-content-text">
            Restaurants with online food delivery!
          </h1>
          <div className="restaurant-lists">
            {filteredRestaurants.map((restaurant) => (
              <Link
                to={"/restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
              >
                <RestaurantCard {...restaurant.info} />
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Body;
