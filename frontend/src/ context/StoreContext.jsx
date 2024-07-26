import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url="http://localhost:4000";
  const [token,setToken]=useState('');
  const [food_list, setFoodList] = useState([]);

 

  const addToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };
  const fetchFoodList = async()=>{
    const res = await axios.get(`${url}/api/food/list`);
    setFoodList(res.data.data);
  }
  useEffect(()=>{
    async function loadData(){
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
      }
      fetchFoodList();
    }
    loadData();
  },[])

  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] === 1) {
        delete newCartItems[itemId];
      } else {
        newCartItems[itemId] -= 1;
      }
      return newCartItems;
    });
  };
  const getTotalCartAmount =()=>{
    let totalAmount =0;
    for (const item in cartItems) {
      if(cartItems[item]>0){
        let itemInfo = food_list.find((product)=>product._id ===item);
        totalAmount+=itemInfo.price * cartItems[item];
      }  
    }
    return totalAmount;
  }

  
  const contextValue = {
    food_list,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
