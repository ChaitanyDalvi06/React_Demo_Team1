// import React, { useContext } from 'react'
// import './FoodDisplay.css'
// import FoodItem from '../FoodItem/FoodItem'
// import { StoreContext } from '../../Context/StoreContext'

// const FoodDisplay = ({category}) => {

//   const {food_list} = useContext(StoreContext);

//   return (
//     <div className='food-display' id='food-display'>
//       <h2>Top dishes near you</h2>
//       <div className='food-display-list'>
//         {food_list.map((item)=>{
//           if (category==="All" || category===item.food_category) {
//             return <FoodItem key={item.food_id} image={item.food_image} name={item.food_name} desc={item.food_desc} price={item.food_price} id={item.food_id}/>
//           }
//         })}
//       </div>
//     </div>
//   )
// }

// export default FoodDisplay


import React, { useState, useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // State to manage number of items to show initially
  const [visibleItems, setVisibleItems] = useState(6);
  const [showAll, setShowAll] = useState(false);

  // Filter food items based on the category
  const filteredItems = food_list.filter(item => category === "All" || category === item.food_category);

  // Items to be displayed based on the visibility state
  const itemsToShow = showAll ? filteredItems : filteredItems.slice(0, visibleItems);

  // Handler for "Show More" button
  const handleShowMore = () => {
    setShowAll(true);
  };

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {itemsToShow.map((item) => (
          <FoodItem 
            key={item.food_id}
            image={item.food_image}
            name={item.food_name}
            desc={item.food_desc}
            price={item.food_price}
            id={item.food_id}
          />
        ))}
      </div>
      {!showAll && filteredItems.length > visibleItems && (
        <button className='show-more-btn' onClick={handleShowMore}>
          Show More
        </button>
      )}
    </div>
  );
}

export default FoodDisplay;
