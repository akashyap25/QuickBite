import { useState, useEffect } from 'react';
import { FETCH_MENU_URL } from '../config';

const useRestaurant = (restaurantId) => {
  const [restaurant, setRestaurant] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const data = await fetch(FETCH_MENU_URL + restaurantId);
        const json = await data.json();

        console.log(json);

        const resInfo = json.data.cards[2]?.card?.card?.info || {};
        console.log(resInfo);
        const menuItems = json.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards || [];
        console.log(menuItems);

        setRestaurant(resInfo);
        setMenuItems(menuItems);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant information:', error);
        setIsLoading(false);
      }
    };

    fetchRestaurantInfo();
  }, [restaurantId]);

  return { restaurant, menuItems, isLoading };
};

export default useRestaurant;
