import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import RestaurantMenu from "./pages/RestaurantMenu/RestaurantMenu";
import { Coordinates, Visibility } from "./Context/ContextApi";
import SpinWheel from "./components/Random/SpinWheel";

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [visible, setVisible] = useState(false);
    const [coord, setCoord] = useState({ lat: 28.5355161, lng: 77.3910265 });

    return (
      <>
      
        <Coordinates.Provider value={{ coord, setCoord }}>
          <ToastContainer />
          {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
          <div className="app">
            <Navbar setShowLogin={setShowLogin} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/spin-wheel" element={<SpinWheel />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
            </Routes>
          </div>
          <Footer />
        </Coordinates.Provider>
      </>
    );
};

export default App;
export const baseURL = "http://localhost:4000";
