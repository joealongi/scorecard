import React from "react";

import { Link } from "react-router-dom";

export const SignUpCompleted: React.FC = () => {
  return (
    <>
      <section className="sign-up-form">
        <h1 className="mx-auto text-3xl md:text-6xl font-light subpixel-antialiased">
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
            className="button-alt py-3 px-3 md:px-9"
          >
            Sign In
          </Link>
        </div>
      </section>
    </>
  );
};
