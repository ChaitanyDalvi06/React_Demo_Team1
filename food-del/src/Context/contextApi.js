import { createContext } from "react";


export const Visibility = createContext(false)
export const Coordinates = createContext({
    coord: { lat: 19.0473, lng: 73.0699 } // Default values
  });
export const CartContext = createContext([])