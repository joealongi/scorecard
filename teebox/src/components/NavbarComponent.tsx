import * as React from "react";

import { NavLink } from "react-router";

import Pinpointscore from "../assets/pinpointscore.svg";
import PinpointscoreMenu from "../assets/pinpointscore-menu.svg";
import NavList from "./navbar/NavListComponent";

export default function NavbarComponent() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const authentication = false;

    // Close the menu when clicking or moving the mouse outside of it
    const main = document?.querySelector("#main");
    if (main) {
      // Desktop
      main.addEventListener("mouseenter", () => {
        setOpen(false);
      });
      main.addEventListener("click", () => {
        setOpen(false);
      });
      // Mobile
      main.addEventListener("touchmove", () => {
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
      <nav className="relative my-[9vh] invisible md:visible hidden md:block">
        <ul className="flex flex-row items-center self-center mx-auto space-x-3">
          <li className="flex flex-col justify-self-start mr-9">
            <NavLink rel="noopener noreferrer" target="_self" to="/">
              <img
                src={Pinpointscore}
                className="logo"
                alt="Pinpointscore logo"
                height={30}
                width={30}
              />
            </NavLink>
          </li>
          <NavList authenticated={authenticated} handleOpen={handleOpen} />
        </ul>
      </nav>
      <nav className="z-30 relative block md:hidden visible md:invisible my-[9vh] md:my-0">
        <ul className="flex flex-row justify-center items-center self-center">
          <li className="flex flex-col flex-auto justify-self-start">
            <NavLink rel="noopener noreferrer" target="_self" to="/">
              <img
                src={Pinpointscore}
                className="logo"
                alt="Pinpointscore logo"
                height={30}
                width={30}
              />
            </NavLink>
          </li>
          <li className="flex flex-col justify-self-end bg-neutral-950">
            <NavLink
              rel="noopener noreferrer"
              target="_self"
              to="#"
              onClick={handleOpen}
            >
              <img
                className="m-1 p-1"
                src={PinpointscoreMenu}
                alt="Pinpointscore menu"
                height={30}
                width={30}
              />
            </NavLink>
          </li>
        </ul>
        <div id="menu-wrapper" className="block relative">
          {open ? (
            <div
              id="menu"
              className="z-30 absolute h-auto w-full mt-3 py-3 px-3 bg-neutral-950 shadow-xl transition-all"
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
