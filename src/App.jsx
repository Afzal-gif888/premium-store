import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./store/slices/stockSlice";
import { fetchAnnouncements } from "./store/slices/announcementSlice";
import Routes from "./Routes";

function App() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.stock.products);

  useEffect(() => {
    console.log('App mounted - fetching data...');
    console.log('Initial products in state:', products.length);

    dispatch(fetchProducts()).then((result) => {
      console.log('✅ Products fetched:', result.payload?.length || 0, 'products');
      if (result.payload?.length > 0) {
        console.log('First product:', result.payload[0]);
      }
    });
    dispatch(fetchAnnouncements()).then((result) => {
      console.log('✅ Announcements fetched:', result.payload?.length || 0);
    });
  }, [dispatch]);

  return (
    <Routes />
  );
}

export default App;
