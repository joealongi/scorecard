import React from "react";
import { NavLink } from "react-router";

import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

export const SignUpCompletedPage: React.FC = () => {
  return (
    <>
      <section className="sign-up-form">
        <HeadingOneComponent text={"Sign Up Completed"} />
        <IntroductionComponent
          text={"Your account has been successfully created!"}
        />
        <div className="my-3 md:my-9 mx-auto">
          <NavLink
            rel="noopener noreferrer"
            target="_self"
            to="/signin"
            className="block w-full mx-auto p-3 text-xl text-center font-bold text-neutral-950 bg-lime-600 hover:text-neutral-950 hover:bg-neutral-300 transition-all cursor-pointer"
          >
            Sign In
          </NavLink>
        </div>
      </section>
    </>
  );
};
