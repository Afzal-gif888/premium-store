import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/slices/stockSlice";
import { fetchAnnouncements } from "./store/slices/announcementSlice";
import Routes from "./Routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <Routes />
  );
}

export default App;
