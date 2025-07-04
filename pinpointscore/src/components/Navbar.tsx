import * as React from "react";

import { Link } from "react-router-dom";

import Pinpointscore from "../assets/pinpointscore.svg";
import PinpointscoreMenu from "../assets/pinpointscore-menu.svg";
import NavListVertical from "./navbar/NavListVertical";

export default function Navbar() {
  // const [state, setState] = React.useState("");
  const [toggle, setToggle] = React.useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    // <nav className="mb-16">
    //   <ul className="flex flex-row space-x-6 md:space-x-9 space-y-0 mx-auto mt-3 font-sm">
    //     <li className="flex items-center self-center transition-all">
    //       <Link rel="noopener noreferrer" target="_self" to="/">
    //         <img
    //           src={Pinpointscore}
    //           className="logo"
    //           alt="Pinpointscore logo"
    //           height={30}
    //           width={30}
    //         />
    //       </Link>
    //     </li>
    //     <li className="flex items-center self-center transition-all">
    //       <Link rel="noopener noreferrer" target="_self" to="/">
    //         Home
    //       </Link>
    //     </li>
    //     <li className="flex items-center self-center transition-all">
    //       <Link rel="noopener noreferrer" target="_self" to="/about">
    //         About
    //       </Link>
    //     </li>
    //     <li className="flex items-center self-center justify-self-end ml-auto transition-all">
    //       <Link
    //         rel="noopener noreferrer"
    //         target="_self"
    //         to="/signup"
    //         className="button py-3 px-3 md:px-9"
    //       >
    //         Sign Up
    //       </Link>
    //     </li>
    //     {false ? (
    //       <li className="flex items-center self-center justify-self-end transition-all">
    //         <Link
    //           rel="noopener noreferrer"
    //           target="_self"
    //           to="/"
    //           className="button-alt py-3 px-3 md:px-9"
    //         >
    //           Sign Out
    //         </Link>
    //       </li>
    //     ) : (
    //       <li className="flex items-center self-center justify-self-end transition-all">
    //         <Link
    //           rel="noopener noreferrer"
    //           target="_self"
    //           to="/signin"
    //           className="button-alt py-3 px-3 md:px-9"
    //         >
    //           Sign In
    //         </Link>
    //       </li>
    //     )}
    //   </ul>
    // </nav>
    <nav className="relative mb-9">
      <ul className="flex flex-row justify-center items-center self-center">
        <li className="flex flex-col flex-auto justify-self-start">
          <Link rel="noopener noreferrer" target="_self" to="/">
            <img
              src={Pinpointscore}
              className="logo"
              alt="Pinpointscore logo"
              height={30}
              width={30}
            />
          </Link>
        </li>
        <li className="flex flex-col justify-self-end">
          <Link
            rel="noopener noreferrer"
            target="_self"
            to="/"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={PinpointscoreMenu}
              className="menu"
              alt="Pinpointscore menu"
              height={30}
              width={30}
            />
          </Link>
        </li>
      </ul>
      {toggle ? (
        <div className="absolute h-auto w-full mt-3 py-3 px-3 bg-neutral-900 shadow-xl transition-all">
          <NavListVertical handleToggle={handleToggle} />
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}
