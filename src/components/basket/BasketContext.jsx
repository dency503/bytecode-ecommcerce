import React, { createContext, useContext, useState } from 'react';

const BasketContext = createContext();

export const useBasketContext = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const showBasket = () => setIsBasketVisible(true);
  const hideBasket = () => setIsBasketVisible(false);

  return (
    <BasketContext.Provider value={{ isBasketVisible, showBasket, hideBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
