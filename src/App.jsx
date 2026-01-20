import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./store/slices/stockSlice";
import { fetchAnnouncements } from "./store/slices/announcementSlice";
import Routes from "./Routes";

function App() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.stock.products);

  useEffect(() => {
    // Initial fetch for the entire app state
    dispatch(fetchProducts());
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <Routes />
  );
}

export default App;
