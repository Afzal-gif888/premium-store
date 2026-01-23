import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// import NotFound from "pages/NotFound"; // Lazy load this too

// Lazy loading pages
const Homepage = lazy(() => import("homepage"));
const ProductDetails = lazy(() => import("product-details"));
const NotFound = lazy(() => import("pages/NotFound"));

// Admin Pages
const LoginPage = lazy(() => import("pages/admin/LoginPage"));
const AdminLayout = lazy(() => import("pages/admin/AdminLayout"));
const StockPage = lazy(() => import("pages/admin/StockPage"));
const AnnouncementsPage = lazy(() => import("pages/admin/AnnouncementsPage"));
const BestsellersPage = lazy(() => import("pages/admin/BestsellersPage"));
const PaymentsPage = lazy(() => import("pages/admin/PaymentsPage"));

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
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        }>
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
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
