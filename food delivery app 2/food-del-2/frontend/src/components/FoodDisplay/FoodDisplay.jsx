import React, { useContext, useEffect } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";

const FoodDisplay = ({ category }) => {
    let { food_list } = useContext(StoreContext);

    // food_list = [...food_list.splice(0, 7)];

    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem
                                key={item._id}
                                image={item.image}
                                name={item.name}
                                desc={item.description}
                                price={item.price}
                                id={item._id}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
