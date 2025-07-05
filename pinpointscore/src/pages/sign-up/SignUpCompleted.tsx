import React from "react";

import { Link } from "react-router-dom";

export const SignUpCompleted: React.FC = () => {
  return (
    <>
      <section className="sign-up-form">
        <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
          Sign Up Completed
        </h1>
        <h3 className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-light subpixel-antialiased">
          Your account has been successfully created!
        </h3>
        <div className="my-3 md:my-9 mx-auto">
          <Link
            rel="noopener noreferrer"
            target="_self"
            to="/signin"
            className="block w-full mx-auto p-3 text-center font-bold text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all cursor-pointer"
          >
            Sign In
          </Link>
        </div>
      </section>
    </>
  );
};
