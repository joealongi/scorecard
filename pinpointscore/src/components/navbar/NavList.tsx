import * as React from "react";

import { Link } from "react-router-dom";

interface NavListProps {
  authenticated: boolean;
  handleOpen: () => void;
}

export default function NavList({
  authenticated,
  handleOpen,
}: Readonly<NavListProps>) {
  return (
    <React.Fragment>
      <li>
        <Link
          className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-center text-neutral-300  hover:text-lime-600  transition-all"
          rel="noopener noreferrer"
          target="_self"
          to="/"
          onClick={() => handleOpen()}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-center text-neutral-300  hover:text-lime-600  transition-all"
          rel="noopener noreferrer"
          target="_self"
          to="/about"
          onClick={() => handleOpen()}
        >
          About
        </Link>
      </li>
      {authenticated ? (
        <React.Fragment></React.Fragment>
      ) : (
        <li>
          <Link
            className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-center text-neutral-300  hover:text-lime-600  transition-all"
            rel="noopener noreferrer"
            target="_self"
            to="/dashboard"
            onClick={() => handleOpen()}
          >
            Dashboard
          </Link>
        </li>
      )}
      <li className="flex flex-col flex-auto justify-self-end"></li>
      {authenticated ? (
        <React.Fragment></React.Fragment>
      ) : (
        <li>
          <Link
            className="block w-full mx-auto py-3 px-9 text-center text-neutral-900 bg-neutral-300  hover:bg-lime-600 transition-all font-bold"
            rel="noopener noreferrer"
            target="_self"
            to="/signup"
            onClick={() => handleOpen()}
          >
            Sign Up
          </Link>
        </li>
      )}
      {authenticated ? (
        <li className="flex flex-col justify-self-end">
          <Link
            rel="noopener noreferrer"
            target="_self"
            to="/"
            className="block w-full mx-auto py-3 px-9 text-center text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all font-bold"
            onClick={() => handleOpen()}
          >
            Sign Out
          </Link>
        </li>
      ) : (
        <li className="flex flex-col justify-self-end">
          <Link
            rel="noopener noreferrer"
            target="_self"
            to="/signin"
            className="block w-full mx-auto py-3 px-9 text-center text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all font-bold"
            onClick={() => handleOpen()}
          >
            Sign In
          </Link>
        </li>
      )}
    </React.Fragment>
  );
}
