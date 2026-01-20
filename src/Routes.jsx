import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

import Homepage from "homepage";
import ProductDetails from "product-details";

// Admin Pages
import LoginPage from "pages/admin/LoginPage";
import AdminLayout from "pages/admin/AdminLayout";
import StockPage from "pages/admin/StockPage";
import AnnouncementsPage from "pages/admin/AnnouncementsPage";
import BestsellersPage from "pages/admin/BestsellersPage";
import PaymentsPage from "pages/admin/PaymentsPage";

const ProtectedRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth) || { isAuthenticated: false };
  const { isAuthenticated } = authState;
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Customer Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<LoginPage />} />

          <Route path="/admin/*" element={
            <ProtectedRoute>
              <RouterRoutes>
                <Route element={<AdminLayout />}>
                  <Route path="stock" element={<StockPage />} />
                  <Route path="announcements" element={<AnnouncementsPage />} />
                  <Route path="bestsellers" element={<BestsellersPage />} />
                  <Route path="payments" element={<PaymentsPage />} />
                  <Route path="*" element={<Navigate to="stock" replace />} />
                </Route>
              </RouterRoutes>
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
