import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import App from "./App.tsx";
import Home from "./pages/basic/Home";
import About from "./pages/basic/About";
import Dashboard from "./pages/basic/Dashboard";
import { SignIn } from "./pages/sign-in/SignIn";
// import { UserInfo } from "./pages/user/UserInfo";
import { SignUp } from "./pages/sign-up/SignUp";
import { SignUpChallenge } from "./pages/sign-up/SignUpChallenge";
import { SignUpCompleted } from "./pages/sign-up/SignUpCompleted";
import { ResetPassword } from "./pages/reset-password/ResetPassword";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <App>
              <Home />
            </App>
          }
        />
        <Route
          path="/about"
          element={
            <App>
              <About />
            </App>
          }
        />
        <Route
          path="/dashboard"
          element={
            <App>
              <Dashboard />
            </App>
          }
        />
        <Route
          path="/signin"
          element={
            <App>
              <SignIn />
            </App>
          }
        />
        <Route
          path="/signup"
          element={
            <App>
              <SignUp />
            </App>
          }
        />
        <Route
          path="/signup/challenge"
          element={
            <App>
              <SignUpChallenge />
            </App>
          }
        />
        <Route
          path="/signup/completed"
          element={
            <App>
              <SignUpCompleted />
            </App>
          }
        />
        <Route
          path="/reset"
          element={
            <App>
              <ResetPassword />
            </App>
          }
        />
        {/* <Route
          path="/user"
          element={
            <App>
              <UserInfo />
            </App>
          }
        /> */}
        <Route
          path="*"
          element={
            <App>
              <Home />
            </App>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
