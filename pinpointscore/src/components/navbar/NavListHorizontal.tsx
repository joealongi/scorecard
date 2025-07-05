import * as React from "react";

import { Link } from "react-router-dom";

interface NavListHorizontalProps {
  authenticated: boolean;
}

export default function NavListHorizontal({
  authenticated,
}: Readonly<NavListHorizontalProps>) {
  return (
    <React.Fragment>
      <li>
        <Link
          className="flex flex-col flex-auto justify-self-start w-full mx-auto p-3 text-center text-neutral-300  hover:text-lime-600  transition-all"
          rel="noopener noreferrer"
          target="_self"
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="flex flex-col flex-auto justify-self-start w-full mx-auto p-3 text-center text-neutral-300  hover:text-lime-600  transition-all"
          rel="noopener noreferrer"
          target="_self"
          to="/about"
        >
          About
        </Link>
      </li>
      <li className="flex flex-col flex-auto justify-self-end"></li>
      {authenticated ? (
        <li>
          <Link
            className="block w-full mx-auto py-3 px-9 text-center text-neutral-900 bg-neutral-300  hover:bg-lime-600 transition-all"
            rel="noopener noreferrer"
            target="_self"
            to="/signup"
          >
            Sign Up
          </Link>
        </li>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {authenticated ? (
        <li className="flex flex-col justify-self-end">
          <Link
            rel="noopener noreferrer"
            target="_self"
            to="/signin"
            className="block w-full mx-auto py-3 px-9 text-center text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all"
          >
            Sign In
          </Link>
        </li>
      ) : (
        <li className="flex flex-col justify-self-end">
          <Link
            rel="noopener noreferrer"
            target="_self"
            to="/"
            className="block w-full mx-auto py-3 px-9 text-center text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all"
          >
            Sign Out
          </Link>
        </li>
      )}
    </React.Fragment>
  );
}
