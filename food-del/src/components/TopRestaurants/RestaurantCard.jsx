import React from "react";
import { Link } from "react-router-dom";
import path from 'path-browserify';


function RestaurantCard(info) {
    return (
        <Link
            to={`/restaurantMenu/${info.link.split("/").at(-1)}`}
            style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                maxWidth: "295px",
                margin: "0 15px",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "182px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <img
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "12px",
                        objectFit: "cover",
                    }}
                    src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                        info?.cloudinaryImageId
                    }
                    alt=""
                />
                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to top, black 1%, transparent 40%)",
                        borderRadius: "12px",
                        zIndex: "1",
                    }}
                ></div>
                <p
                    style={{
                        position: "absolute",
                        bottom: "0",
                        color: "white",
                        fontSize: "20px",
                        marginLeft: "8px",
                        marginBottom: "8px",
                        fontWeight: "bold",
                        zIndex: "2",
                    }}
                >
                    {/* {
                      info?.aggregatedDiscountInfoV3 ?  info?.aggregatedDiscountInfoV3?.header +
                      " " +
                      info?.aggregatedDiscountInfoV3?.subHeader : "" 
                    } */}
                </p>
            </div>
            <div style={{ marginTop: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>{info?.name}</h2>
                <p style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "16px", fontWeight: "600" }}>
                    <i className="fi fi-ss-circle-star" style={{ marginTop: "2px", color: "#4caf50", fontSize: "18px" }}></i>
                    {info?.avgRating} . <span>{info?.sla?.slaString}</span>
                </p>
                <p style={{ color: "#00000099", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {info.cuisines.join(", ")}
                </p>
                <p style={{ color: "#00000099", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {info.locality}
                </p>
            </div>
        </Link>
    );
}

export default RestaurantCard;
