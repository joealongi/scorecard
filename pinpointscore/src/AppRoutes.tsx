import { Route, Routes } from "react-router-dom";

import Home from "./pages/basic/Home";
import About from "./pages/basic/About";
import { SignIn } from "./pages/sign-in/SignIn";
// import { UserInfo } from "./pages/user/UserInfo";
import { SignUp } from "./pages/sign-up/SignUp";
import { SignUpChallenge } from "./pages/sign-up/SignUpChallenge";
import { SignUpCompleted } from "./pages/sign-up/SignUpCompleted";
import { ResetPassword } from "./pages/reset-password/ResetPassword";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/challenge" element={<SignUpChallenge />} />
      <Route path="/signup/completed" element={<SignUpCompleted />} />
      <Route path="/reset" element={<ResetPassword />} />
      {/* <Route path="/user" element={<UserInfo />} /> */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};
