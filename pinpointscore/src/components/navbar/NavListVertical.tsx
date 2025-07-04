import * as React from "react";

import { Link } from "react-router-dom";

interface NavListVerticalProps {
  handleToggle: () => void;
}

export default function NavListVertical({
  handleToggle,
}: Readonly<NavListVerticalProps>) {
  return (
    <React.Fragment>
      <ul className="flex flex-col space-y-3 mx-auto">
        <li>
          <Link
            className="block w-full mx-auto p-3 text-center text-neutral-300 bg-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all"
            rel="noopener noreferrer"
            target="_self"
            to="/"
            onClick={() => handleToggle()}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="block w-full mx-auto p-3 text-center text-neutral-300 bg-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all"
            rel="noopener noreferrer"
            target="_self"
            to="/about"
            onClick={() => handleToggle()}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="block w-full mx-auto p-3 text-center text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all"
            rel="noopener noreferrer"
            target="_self"
            to="/signup"
            onClick={() => handleToggle()}
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
}
