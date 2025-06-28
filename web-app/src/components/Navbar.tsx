import { Link } from "react-router-dom";

import PinPointScore from "../assets/pinpointscore.svg";

export default function Navbar() {
  return (
    <nav className="mb-16">
      <ul className="flex flex-row space-x-6 md:space-x-9 space-y-0 mx-auto mt-3 font-sm">
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" to="/">
            <img
              src={PinPointScore}
              className="logo"
              alt="Pin Point Score logo"
              height={30}
              width={30}
            />
          </Link>
        </li>
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" to="/">
            Home
          </Link>
        </li>
        <li className="flex items-center self-center transition-all">
          <Link rel="noopener noreferrer" target="_self" to="/about">
            About
          </Link>
        </li>
        <li className="flex items-center self-center justify-self-end ml-auto transition-all">
          <Link
            rel="noopener noreferrer"
            target="_self"
            to="/signup"
            className="button py-3 px-3 md:px-9"
          >
            Sign Up
          </Link>
        </li>
        {false ? (
          <li className="flex items-center self-center justify-self-end transition-all">
            <Link
              rel="noopener noreferrer"
              target="_self"
              to="/"
              className="button-alt py-3 px-3 md:px-9"
            >
              Sign Out
            </Link>
          </li>
        ) : (
          <li className="flex items-center self-center justify-self-end transition-all">
            <Link
              rel="noopener noreferrer"
              target="_self"
              to="/signin"
              className="button-alt py-3 px-3 md:px-9"
            >
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
