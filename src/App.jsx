import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import About from "./components/About/About";
import Home from "./pages/Home";
import MarketPlace from "./pages/MarketPlace";
import ProfileJobDetailsCard from "./pages/ProfileJobDetailsCard";
import JobApply from "./pages/JobApply";
import LoginPage from "./pages/LoginPage";
import "./App.css";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Updated from "/search" to "/marketplace" to match our new links */}
        <Route
          path="/search"
          element={
            <MainLayout>
              <MarketPlace />
            </MainLayout>
          }
        />

        <Route
          path="/jobs/:jobId"
          element={
            <MainLayout>
              <ProfileJobDetailsCard />
            </MainLayout>
          }
        />

        <Route
          path="/jobs/:jobId/apply"
          element={
            <MainLayout>
              <JobApply />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <LoginPage key="login-page" initialMode="login" />
            </MainLayout>
          }
        />

        <Route
          path="/register"
          element={
            <MainLayout>
              <LoginPage key="register-page" initialMode="signup" />
            </MainLayout>
          }
        />

        {/* --- NEW PLACEHOLDER ROUTES FOR FOOTER LINKS --- */}
        {/* Replace the inline divs with actual components when you build them */}
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />

        <Route
          path="/post-job"
          element={
            <MainLayout>
              <div style={{ padding: "100px 20px", textAlign: "center" }}>
                <h2>Post a Job</h2>
                <p>Employer portal coming soon...</p>
              </div>
            </MainLayout>
          }
        />

        <Route
          path="/privacy"
          element={
            <MainLayout>
              <div style={{ padding: "100px 20px", textAlign: "center" }}>
                <h2>Privacy Policy</h2>
              </div>
            </MainLayout>
          }
        />

        <Route
          path="/terms"
          element={
            <MainLayout>
              <div style={{ padding: "100px 20px", textAlign: "center" }}>
                <h2>Terms of Service</h2>
              </div>
            </MainLayout>
          }
        />

        <Route
          path="/cookie-policy"
          element={
            <MainLayout>
              <div style={{ padding: "100px 20px", textAlign: "center" }}>
                <h2>Cookie Policy</h2>
              </div>
            </MainLayout>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <MainLayout>
              <h2 style={{ textAlign: "center", padding: "100px 20px" }}>
                404 - Page Not Found
              </h2>
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
