import * as React from "react";

import { Link } from "react-router-dom";

import Pinpointscore from "../assets/pinpointscore.svg";
import PinpointscoreMenu from "../assets/pinpointscore-menu.svg";
import NavList from "./navbar/NavList";

export default function Navbar() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const authentication = false;

    // Close the menu when clicking or moving the mouse outside of it
    const main = document?.querySelector("#main");
    if (main) {
      main.addEventListener("mouseenter", () => {
        setOpen(false);
      });
      main.addEventListener("click", () => {
        setOpen(false);
      });
    }

    return () => {
      if (authentication) {
        setAuthenticated(true);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <nav className="relative hidden invisible mb-0 md:block md:visible md:mb-[9vh]">
        <ul className="flex flex-row items-center self-center mx-auto space-x-3">
          <li className="flex flex-col justify-self-start mr-9">
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
          <NavList authenticated={authenticated} handleOpen={handleOpen} />
        </ul>
      </nav>
      <nav className="relative block visible mb-[9vh] md:hidden md:invisible md:mb-0">
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
          <li className="flex flex-col justify-self-end  bg-neutral-800">
            <Link
              rel="noopener noreferrer"
              target="_self"
              to="/"
              onClick={handleOpen}
            >
              <img
                className="m-1 p-1"
                src={PinpointscoreMenu}
                alt="Pinpointscore menu"
                height={30}
                width={30}
              />
            </Link>
          </li>
        </ul>
        <div id="menu-wrapper" className="block relative">
          {open ? (
            <div
              id="menu"
              className="z-30 absolute h-auto w-full mt-3 py-3 px-3 bg-neutral-900 shadow-xl transition-all"
            >
              <ul className="flex flex-col space-y-3 mx-auto">
                <NavList
                  authenticated={authenticated}
                  handleOpen={handleOpen}
                />
              </ul>
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
}
