import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import SpinWheel from '../../components/Random/SpinWheel';
import TopRestaurant from "../../components/TopRestaurants/TopRestaurants"; // Ensure this path is correct
import Shimmer from '../../components/TopRestaurants/Shimmer';
import { Coordinates } from "../../Context/contextApi";
import { useSelector } from 'react-redux';
import HorizontalRes from '../../components/TopRestaurants/HorizontalRes'; // Ensure this path is correct
import OnYourMind from '../../components/TopRestaurants/OnYourMind';
import OnlineFoodDelivey from '../../components/TopRestaurants/OnlineFoodDelivey';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [topRestaurantData, setTopRestaurantData] = useState([]);
  const [topResTitle, setTopResTitle] = useState('');
  const [onlineTitle, setOnlineTitle] = useState('');
  const [onYourMindData, setOnYourMindData] = useState([]);
  const [data, setData] = useState({});
  const {
    coord: { lat, lng },
} = useContext(Coordinates);


  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const lat = 19.0473; // Replace with your latitude
    const lng = 73.0699; // Replace with your longitude

    try {
      const response = await fetch(
        `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const result = await response.json();
      console.log(result);
      setData(result.data);

      setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title);
      setOnlineTitle(result?.data?.cards[2]?.card?.card?.title);

      const mainData = result?.data?.cards.find(
        (data) => data?.card?.card?.id === "top_brands_for_you"
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      const mainData2 = result?.data?.cards.find(
        (data) => data?.card?.card?.id === "restaurant_grid_listing"
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      setTopRestaurantData(mainData || mainData2);

      setOnYourMindData(
        result?.data?.cards.find(
          (data) => data?.card?.card?.id === "on_your_mind"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchData() {
    const data = await fetch(
        `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const result = await data.json();
    console.log(result);
    setData(result.data);
    setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title);
    setOnlineTitle(result?.data?.cards[2]?.card?.card?.title);

    let mainData = result?.data?.cards.find(
        (data) => data?.card?.card?.id == "top_brands_for_you"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    let mainData2 = result?.data?.cards.find(
        (data) => data?.card?.card?.id == "restaurant_grid_listing"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setTopRestaurantData(mainData || mainData2);

    let data2 = result?.data?.cards.find(
        (data) => data?.card?.card?.id == "whats_on_your_mind"
    ).card?.card?.imageGridCards?.info;

    setOnYourMindData(data2);
}
useEffect(() => {
    fetchData();
}, [lat, lng]);

console.log(topRestaurantData)

const filterVal = useSelector((state) => state?.filterSlice?.filterVal);
console.log(filterVal)

const filteredData = topRestaurantData.filter((item) => {
    if (!filterVal) return true;

    switch (filterVal) {
        case "Ratings 4.0+":
            return item?.info?.avgRating > 4;
        case "Rs. 300-Rs. 600":
            return (
                item?.info?.costForTwo?.slice(1, 4) >= "300" &&
                item?.info?.costForTwo?.slice(1, 4) <= "600"
            );
        case "Offers":
            return;
        case "Less than Rs. 300":
            return item?.info?.costForTwo?.slice(1, 4) < "300";
        default:
            return true;
    }
});

if (data.communication || data.tid == "") {
    return (
        <div className="flex mt-64 overflow-hidden justify-center items-center flex-col">
            <img
                className="w-72"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
                alt=""
            />
            <h1>Location unservicalbe</h1>
        </div>
    );
}
  return (
    <>
      <Header />
      <ExploreMenu setCategory={setCategory} category={category} />
      <FoodDisplay category={category} />
      <SpinWheel />
      <div className="w-full ">
            {topRestaurantData.length ? (
                <div className=" w-full px-10 sm:w-[90%] lg:w-[80%] mx-auto mt-3 overflow-hidden">
                    {onYourMindData.length ? (
                        <>
                            <TopRestaurant
                                data={topRestaurantData}
                                title={topResTitle}
                            />
                        </>
                    ) : (
                        ""
                    )}

                    <OnlineFoodDelivey
                        data={filterVal ? filteredData : topRestaurantData}
                        title={onlineTitle}
                    />
                </div>
            ) : (
                <Shimmer />
            )}
        </div>
      <AppDownload />
    </>
  );
};

export default Home;
