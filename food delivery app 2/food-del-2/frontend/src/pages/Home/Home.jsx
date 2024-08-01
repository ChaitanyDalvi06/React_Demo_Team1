import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import TopRestaurant from "../../components/TopRestaurant/TopRestaurant";
import SpinWheel from "../../components/Random/SpinWheel";

const Home = () => {
    const [category, setCategory] = useState("All");
    const [topRestaurantData, setTopRestaurantData] = useState([]);

    async function fetchData() {
        const data = await fetch(
            `https://www.swiggy.com/dapi/restaurants/list/v5/?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING`
        );
        const result = await data.json();
        // console.log(result);
        // console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setTopRestaurantData(
            result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants
        );
        setOnYourMindData(
            result?.data?.cards[0]?.card?.card?.imageGridCards?.info
        );
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <ExploreMenu setCategory={setCategory} category={category} />
            <SpinWheel/>
            <FoodDisplay category={category} />
            <TopRestaurant data={topRestaurantData} />
            <AppDownload />
        </>
    );
};

export default Home;
