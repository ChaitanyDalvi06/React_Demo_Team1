import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { useDispatch } from "react-redux";
import { setFilterValue } from "./utils/filterSlice";
import path from 'path-browserify';


function OnlineFoodDelivey({ data, title }) {
    const filterOptions = ["Ratings 4.0+", "Rs. 300-Rs. 600", "Offers", "Less than Rs. 300"];
    const [activeBtn, setActiveBtn] = useState(null);
    const dispatch = useDispatch();

    function handleFilterBtn(filterName) {
        const newFilterValue = activeBtn === filterName ? null : filterName;
        setActiveBtn(newFilterValue);
        dispatch(setFilterValue(newFilterValue));
    }

    return (
        <div>
            <h1 style={{ fontWeight: "bold", margin: "1.75rem 0", fontSize: "2rem" }}>{title}</h1>
            <div style={{ margin: "1.75rem 0", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {filterOptions.map((filterName) => (
                    <button
                        key={filterName}
                        onClick={() => handleFilterBtn(filterName)}
                        style={{
                            border: "1px solid rgb(191, 191, 191)",
                            padding: "0.625rem 1.25rem",
                            borderRadius: "2.5rem",
                            boxShadow: "5px 5px rgb(216, 215, 215)",
                            display: "flex",
                            gap: "0.5rem",
                            backgroundColor: activeBtn === filterName ? "#3e4152" : "transparent",
                            color: activeBtn === filterName ? "white" : "black"
                        }}
                    >
                        <p>{filterName}</p>
                        <i
                            className="fi text-sm mt-1 fi-br-cross"
                            style={{ display: activeBtn === filterName ? "block" : "none" }}
                        ></i>
                    </button>
                ))}
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "2.5rem"
                }}
            >
                {data.map(({ info, cta: { link } }) => (
                    <div
                        key={info.id}
                        style={{
                            transition: "transform 0.3s",
                            transform: "scale(1)",
                            cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(0.95)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <RestaurantCard {...info} link={link} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OnlineFoodDelivey;
