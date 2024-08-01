import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";

function TopRestaurant({ data = [], title }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollAmount = 300; // Adjust as needed

    const handleNext = () => {
        setScrollPosition((prev) => prev + scrollAmount);
    };

    const handlePrev = () => {
        setScrollPosition((prev) => Math.max(prev - scrollAmount, 0)); // Prevent scrolling past the start
    };

    return (
        <div style={{ marginTop: "3.5rem", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.25rem" }}>
                <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>{title}</h1>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <button
                        onClick={handlePrev}
                        disabled={scrollPosition <= 0}
                        style={{
                            padding: "0.5rem",
                            borderRadius: "9999px",
                            backgroundColor: "#E5E7EB",
                            color: scrollPosition <= 0 ? "#9CA3AF" : "#1F2937",
                            cursor: scrollPosition <= 0 ? "not-allowed" : "pointer"
                        }}
                    >
                        <i className="fi text-2xl fi-rr-arrow-small-left" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={scrollPosition >= (data.length * scrollAmount - window.innerWidth)}
                        style={{
                            padding: "0.5rem",
                            borderRadius: "9999px",
                            backgroundColor: "#E5E7EB",
                            color: scrollPosition >= (data.length * scrollAmount - window.innerWidth) ? "#9CA3AF" : "#1F2937",
                            cursor: scrollPosition >= (data.length * scrollAmount - window.innerWidth) ? "not-allowed" : "pointer"
                        }}
                    >
                        <i className="fi text-2xl fi-rr-arrow-small-right" />
                    </button>
                </div>
            </div>

            <div style={{ position: "relative", marginTop: "1rem", overflow: "hidden" }}>
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        transition: "transform 0.3s",
                        transform: `translateX(-${scrollPosition}px)`
                    }}
                >
                    {data.map((restaurant, index) => (
                        <div key={index} style={{ flex: "0 0 auto", width: "calc(33.33% - 16px)" }}>
                            <RestaurantCard {...restaurant.info} link={restaurant.cta.link} />
                        </div>
                    ))}
                </div>
            </div>

            <hr style={{ border: "1px solid #E5E7EB", marginTop: "2.5rem" }} />
        </div>
    );
}

export default TopRestaurant;
