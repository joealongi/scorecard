import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import LeaderboardPage from "./pages/LeaderboardPage.tsx";
import { SignInPage } from "./pages/SignInPage.tsx";
import { SignUpPage } from "./pages/SignUpPage.tsx";
import { SignUpChallengePage } from "./pages/SignUpChallengePage.tsx";
import { SignUpCompletedPage } from "./pages/SignUpCompletedPage.tsx";
import { ResetPasswordPage } from "./pages/ResetPasswordPage.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <App>
              <HomePage />
            </App>
          }
        />
        <Route
          path="/about"
          element={
            <App>
              <AboutPage />
            </App>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <App>
              <LeaderboardPage />
            </App>
          }
        />
        <Route
          path="/signin"
          element={
            <App>
              <SignInPage />
            </App>
          }
        />
        <Route
          path="/signup"
          element={
            <App>
              <SignUpPage />
            </App>
          }
        />
        <Route
          path="/signup/challenge"
          element={
            <App>
              <SignUpChallengePage />
            </App>
          }
        />
        <Route
          path="/signup/completed"
          element={
            <App>
              <SignUpCompletedPage />
            </App>
          }
        />
        <Route
          path="/reset"
          element={
            <App>
              <ResetPasswordPage />
            </App>
          }
        />
        <Route
          path="*"
          element={
            <App>
              <HomePage />
            </App>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
