import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

// Function to fetch coordinates and address
async function fetchLatAndLng(id) {
  if (id === '') return;
  const res = await fetch(
    `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`
  );
  const data = await res.json();
  return {
    address: data.data[0].formatted_address,
    coord: {
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng,
    },
  };
}

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [searchPopupVisible, setSearchPopupVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [address, setAddress] = useState("Mumbai");
  const [coord, setCoord] = useState({ lat: 19.0473, lng: 73.0699 });
  const [searchInput, setSearchInput] = useState("");
  const { getTotalCartAmount } = useContext(StoreContext);

  // Function to handle location search
  async function searchLocations(val) {
    if (val === '') return;
    const res = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${val}`
    );
    const data = await res.json();
    setSearchResult(data.data);
  }

  async function handleLocationSelect(place_id) {
    const { address, coord } = await fetchLatAndLng(place_id);
    const locationName = address.split(',')[0]; // Extract the first part of the address
    setAddress(locationName);
    setCoord(coord);
    setSearchPopupVisible(false);
  }

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>Mobile app</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="Cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        <button onClick={() => setShowLogin(true)}>sign in</button>
        <div className="navbar-location" onClick={() => setSearchPopupVisible(true)}>
          <FontAwesomeIcon icon={faLocationDot} style={{ color: "#ff9500", fontSize: '24px' }} />
          {address && <span className="location-address">{address}</span>}
        </div>
      </div>

      {/* Search Popup */}
      <div
        onClick={() => setSearchPopupVisible(false)}
        className={`search-popup-backdrop ${searchPopupVisible ? 'visible' : 'hidden'}`}
      />
      <div
        className={`search-popup ${searchPopupVisible ? 'visible' : 'hidden'}`}
      >
        <div className="search-popup-content">
          <i className="fi fi-br-cross cursor-pointer" onClick={() => setSearchPopupVisible(false)} />
          <input
            type="text"
            placeholder="Search for places..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              searchLocations(e.target.value);
            }}
            className="search-input"
          />
          <div className="search-results">
            {searchResult.length > 0 ? (
              <ul>
                {searchResult.map((data, index) => (
                  <li
                    key={index}
                    onClick={() => handleLocationSelect(data.place_id)}
                    className="search-result-item"
                  >
                    <div className="result-item-text">
                      <strong>{data.structured_formatting.main_text}</strong>
                      <p>{data.structured_formatting.secondary_text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-results">No results found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
