import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Coordinates } from "../../Context/contextApi";
import { MenuShimmer } from "./Shimmer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

let veg =
    "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
let nonVeg =
    "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";

function RestaurantMenu() {
    const { id } = useParams();
    let mainId = id.split("-").at(-1);

    const [resInfo, setResInfo] = useState([]);
    const [menuData, setMenuData] = useState([]);
    const [topPicksData, setTopPicksData] = useState(null);
    const [value, setValue] = useState(0);
    const [currIndex, setCurrIndex] = useState(false);
    const {
        coord: { lat, lng },
    } = useContext(Coordinates);

    function handleNext() {}

    function handlePrev() {}

    async function fetchMenu() {
        try {
            let response = await fetch(
                `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
            );
            let res = await response.json();

            const resInfo = res?.data?.cards.find((data) =>
                data?.card?.card?.["@type"].includes("food.v2.Restaurant")
            )?.card?.card?.info;

            setResInfo(resInfo);

            let actualMenu = res?.data?.cards.find((data) => data?.groupedCard);

            setTopPicksData(
                (actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
                    (data) => data.card.card.title === "Top Picks"
                )[0]
            );

            setMenuData(
                actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
                    (data) =>
                        data?.card?.card?.itemCards || data?.card?.card?.categories
                )
            );
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    }

    useEffect(() => {
        fetchMenu();
    }, []);

    function toggleFun() {
        setCurrIndex(!currIndex);
    }

    const containerStyle = {
        width: '95%',
        maxWidth: '800px',
        margin: 'auto',
        paddingTop: '8px',
    };

    const headerStyle = {
        fontSize: '12px',
        color: 'slategray',
    };

    const breadcrumbLinkStyle = {
        cursor: 'pointer',
        color: 'slategray',
        textDecoration: 'underline',
    };

    const restaurantInfoStyle = {
        width: '100%',
        height: '206px',
        background: 'linear-gradient(to top, rgba(203, 203, 203, 0.7), transparent)',
        padding: '0 16px 16px',
        marginTop: '3px',
        borderRadius: '30px',
    };

    const infoCardStyle = {
        width: '100%',
        border: '1px solid rgba(203, 203, 203, 0.7)',
        borderRadius: '30px',
        backgroundColor: 'white',
    };

    const topPicksStyle = {
        fontWeight: 'bold',
        fontSize: '24px',
        marginTop: '8px',
    };

    const searchBoxStyle = {
        width: '100%',
        marginTop: '8px',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: 'slategray',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
    };

    const dealsHeaderStyle = {
        fontWeight: 'bold',
        fontSize: '20px',
        marginTop: '8px',
    };

    const arrowButtonStyle = {
        cursor: 'pointer',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        margin: '0 4px',
    };

    const arrowIconStyle = {
        fontSize: '24px',
    };

    return (
        <div style={{ width: '100%' }}>
            {menuData.length ? (
                <div style={containerStyle}>
                    <p style={headerStyle}>
                        <Link to={"/"}>
                            <span style={breadcrumbLinkStyle}>
                                Home
                            </span>
                        </Link>{" "}
                        /{" "}
                        <Link to={"/"}>
                            <span style={breadcrumbLinkStyle}>
                                {resInfo.city}
                            </span>
                        </Link>{" "}
                        / <span style={{ color: 'slategray' }}>{resInfo.name}</span>
                    </p>

                    <h1 style={{ fontWeight: 'bold', paddingTop: '6px', fontSize: '24px' }}>{resInfo.name}</h1>
                    <div style={restaurantInfoStyle}>
                        <div style={infoCardStyle}>
                            <div style={{ padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                                    <i className="fi fi-ss-circle-star" style={{ color: 'green', fontSize: '18px' }}></i>
                                    <span>{resInfo.avgRating}</span>
                                    <span>({resInfo.totalRatingsString})</span>.
                                    <span>{resInfo.costForTwoMessage}</span>
                                </div>

                                <p style={{ textDecoration: 'underline', fontWeight: 'bold', color: 'orange' }}>
                                    {resInfo?.cuisines?.join(", ")}
                                </p>

                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    <div style={{ width: '9px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ width: '7px', height: '7px', backgroundColor: 'gray', borderRadius: '50%' }}></div>
                                        <div style={{ width: '1px', height: '25px', backgroundColor: 'gray' }}></div>
                                        <div style={{ width: '7px', height: '7px', backgroundColor: 'gray', borderRadius: '50%' }}></div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                                        <p>
                                            Outlet <span style={{ color: 'gray', fontWeight: 'normal' }}>{resInfo.locality}</span>
                                        </p>
                                        <p>{resInfo.sla?.slaString}</p>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div style={{ width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', padding: '12px' }}>
                                    {resInfo.length !== 0 && resInfo?.expectationNotifiers ? (
                                        <>
                                            <img
                                                style={{ width: '24px' }}
                                                src={
                                                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/" +
                                                    resInfo.feeDetails?.icon
                                                }
                                                alt=""
                                            />

                                            <span style={{ fontSize: '14px', marginLeft: '16px', color: 'gray', fontWeight: 'normal' }}>
                                                {resInfo?.expectationNotifiers[0]?.enrichedText.replace(
                                                    /<[^>]*>/g,
                                                    ""
                                                )}
                                            </span>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                            <h1 style={dealsHeaderStyle}>Deals for you</h1>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div
                                    onClick={handlePrev}
                                    style={{
                                        ...arrowButtonStyle,
                                        backgroundColor: value <= 0 ? '#f5f5f5' : '#e0e0e0'
                                    }}
                                >
                                    <i
                                        className={`fi text-2xl mt-1 fi-rr-arrow-small-left`}
                                        style={{
                                            ...arrowIconStyle,
                                            color: value <= 0 ? 'gray' : 'black'
                                        }}
                                    ></i>
                                </div>
                                <div
                                    onClick={handleNext}
                                    style={{
                                        ...arrowButtonStyle,
                                        backgroundColor: value >= 124 ? '#f5f5f5' : '#e0e0e0'
                                    }}
                                >
                                    <i
                                        className={`fi text-2xl mt-1 fi-rr-arrow-small-right`}
                                        style={{
                                            ...arrowIconStyle,
                                            color: value >= 124 ? 'gray' : 'black'
                                        }}
                                    ></i>
                                </div>
                            </div>
                        </div>
                        {/* Uncomment and style your discount data here */}
                        {/* <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                            {discountData.map((data, index) => (
                                <Discount key={index} data={data} />
                            ))}
                        </div> */}
                    </div>

                    <h2 style={{ textAlign: 'center', marginTop: '20px', lineHeight: '1.5' }}>MENU</h2>

                    <div style={{ width: '100%', marginTop: '16px', position: 'relative', cursor: 'pointer' }}>
                        <div style={searchBoxStyle}>
                            Search for dishes
                        </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <div style={{ width: '100%' }}>
                            {menuData?.map((data, index) => (
                                <div key={index}>
                                    {data?.card?.card?.itemCards ? (
                                        <>
                                            {data?.card?.card?.itemCards.map(
                                                (items, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            gap: '8px',
                                                            padding: '12px',
                                                            marginBottom: '12px',
                                                            borderBottom: '2px solid #f5f5f5',
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', gap: '12px' }}>
                                                            <div style={{ width: '100px', height: '100px' }}>
                                                                <img
                                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                                                    src={
                                                                        items?.card?.info?.imageId
                                                                            ? "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100/" +
                                                                              items?.card?.info?.imageId
                                                                            : ""
                                                                    }
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{items?.card?.info?.name}</p>
                                                                <p style={{ color: 'gray', fontSize: '14px' }}>
                                                                    {items?.card?.info?.description}
                                                                </p>
                                                                <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'green' }}>
                                                                    ₹
                                                                    {items?.card?.info?.price / 100}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {/* Uncomment and add AddToCartBtn component */}
                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <FontAwesomeIcon icon="fa-regular fa-cart-shopping" style={{color: "#ff7b00",}} />
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <MenuShimmer />
            )}
        </div>
    );
}

export default RestaurantMenu;
