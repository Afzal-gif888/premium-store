import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from "pages/admin-dashboard";
import InventoryManagement from "inventory-management";
import ProductDetails from "product-details";
import Collection from "collection";
import Announcements from "pages/announcements";
import Homepage from "homepage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
