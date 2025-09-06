import * as React from "react";

import { NavLink } from "react-router";

import Pinpointscore from "../assets/pinpointscore.svg";
import PinpointscoreMenu from "../assets/pinpointscore-menu.svg";

export default function NavbarComponent() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpenMenu = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const authentication = false;

    // Close the menu when clicking or moving the mouse outside of it
    const main = document?.getElementById("main");
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

    // Close the menu when clicking or moving the mouse outside of the menu button
    const menuButton = document?.getElementById("menu-button");
    if (menuButton) {
      // Desktop
      menuButton.addEventListener("mouseenter", () => {
        setOpen(false);
      });
      menuButton.addEventListener("click", () => {
        setOpen(false);
      });
      // Mobile
      menuButton.addEventListener("touchmove", () => {
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
          {/* <li>
            <NavLink
              className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
              rel="noopener noreferrer"
              target="_self"
              to="/"
              onClick={() => handleOpenMenu()}
            >
              Home
            </NavLink>
          </li> */}
          {authenticated ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <NavLink
                  className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
                  rel="noopener noreferrer"
                  target="_self"
                  to="/coursecard"
                  onClick={() => handleOpenMenu()}
                >
                  Coursecard
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {authenticated ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <NavLink
                  className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
                  rel="noopener noreferrer"
                  target="_self"
                  to="/scorecard"
                  onClick={() => handleOpenMenu()}
                >
                  Scorecard
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {authenticated ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <NavLink
                  className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
                  rel="noopener noreferrer"
                  target="_self"
                  to="/leadercard"
                  onClick={() => handleOpenMenu()}
                >
                  Leadercard
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {/* <li>
            <NavLink
              className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
              rel="noopener noreferrer"
              target="_self"
              to="/handicap"
              onClick={() => handleOpenMenu()}
            >
              Handicap
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink
              className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
              rel="noopener noreferrer"
              target="_self"
              to="/proshop"
              onClick={() => handleOpenMenu()}
            >
              Proshop
            </NavLink>
          </li> */}
          <li className="flex flex-col flex-auto justify-self-end"></li>
          {authenticated ? (
            <React.Fragment>
              <li className="flex flex-col justify-self-end">
                <NavLink
                  rel="noopener noreferrer"
                  target="_self"
                  to="/"
                  className="block w-full mx-auto py-3 px-9 font-bold text-neutral-950 bg-lime-600 hover:text-neutral-950 hover:bg-neutral-300 text-center subpixel-antialiased transition-all cursor-pointer"
                  onClick={() => handleOpenMenu()}
                >
                  Sign Out
                </NavLink>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <NavLink
                  className="block w-full mx-auto py-3 px-9 font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center subpixel-antialiased transition-all cursor-pointer"
                  rel="noopener noreferrer"
                  target="_self"
                  to="/signup"
                  onClick={() => handleOpenMenu()}
                >
                  Sign Up
                </NavLink>
              </li>
              <li className="flex flex-col justify-self-end">
                <NavLink
                  rel="noopener noreferrer"
                  target="_self"
                  to="/signin"
                  className="block w-full mx-auto py-3 px-9 font-bold text-neutral-950 bg-lime-600 hover:text-neutral-950 hover:bg-neutral-300 text-center subpixel-antialiased transition-all cursor-pointer"
                  onClick={() => handleOpenMenu()}
                >
                  Sign In
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
      <nav className="z-30 relative block md:hidden visible md:invisible my-[9vh] md:my-0">
        <ul className="flex flex-row justify-center items-center self-center">
          <li className="z-60 flex flex-col flex-auto justify-self-start">
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
          <li
            id="menu-button"
            className="z-60 flex flex-col justify-self-end bg-neutral-950 hover:bg-neutral-900"
          >
            <NavLink
              rel="noopener noreferrer"
              target="_self"
              to="#"
              onClick={() => handleOpenMenu()}
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
            <div className="z-30 absolute h-auto w-full mt-3 py-3 px-3 bg-neutral-950 shadow-xl transition-all">
              <ul className="flex flex-col space-y-3 mx-auto">
                {/* <li>
                  <NavLink
                    className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
                    rel="noopener noreferrer"
                    target="_self"
                    to="/"
                    onClick={() => handleOpenMenu()}
                  >
                    Home
                  </NavLink>
                </li> */}
                {authenticated ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <React.Fragment>
                    <li>
                      <NavLink
                        className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
                        rel="noopener noreferrer"
                        target="_self"
                        to="/coursecard"
                        onClick={() => handleOpenMenu()}
                      >
                        Coursecard
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
                {authenticated ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <React.Fragment>
                    <li>
                      <NavLink
                        className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
                        rel="noopener noreferrer"
                        target="_self"
                        to="/scorecard"
                        onClick={() => handleOpenMenu()}
                      >
                        Scorecard
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
                {authenticated ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <React.Fragment>
                    <li>
                      <NavLink
                        className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
                        rel="noopener noreferrer"
                        target="_self"
                        to="/leadercard"
                        onClick={() => handleOpenMenu()}
                      >
                        Leadercard
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
                {/* <li>
                  <NavLink
                    className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
                    rel="noopener noreferrer"
                    target="_self"
                    to="/handicap"
                    onClick={() => handleOpenMenu()}
                  >
                    Handicap
                  </NavLink>
                </li> */}
                {/* <li>
                  <NavLink
                    className="block md:flex md:flex-col md:flex-auto md:justify-self-start w-full mx-auto p-3 text-xl text-neutral-300 hover:text-lime-600 text-center subpixel-antialiased transition-all"
                    rel="noopener noreferrer"
                    target="_self"
                    to="/proshop"
                    onClick={() => handleOpenMenu()}
                  >
                    Proshop
                  </NavLink>
                </li> */}
                <li className="flex flex-col flex-auto justify-self-end"></li>
                {authenticated ? (
                  <React.Fragment>
                    <li className="flex flex-col justify-self-end">
                      <NavLink
                        rel="noopener noreferrer"
                        target="_self"
                        to="/"
                        className="block w-full mx-auto py-3 px-9 font-bold text-neutral-950 bg-lime-600 hover:text-neutral-950 hover:bg-neutral-300 text-center subpixel-antialiased transition-all cursor-pointer"
                        onClick={() => handleOpenMenu()}
                      >
                        Sign Out
                      </NavLink>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li>
                      <NavLink
                        className="block w-full mx-auto py-3 px-9 font-bold text-neutral-950 bg-neutral-300 hover:bg-lime-600 text-center subpixel-antialiased transition-all cursor-pointer"
                        rel="noopener noreferrer"
                        target="_self"
                        to="/signup"
                        onClick={() => handleOpenMenu()}
                      >
                        Sign Up
                      </NavLink>
                    </li>
                    <li className="flex flex-col justify-self-end">
                      <NavLink
                        rel="noopener noreferrer"
                        target="_self"
                        to="/signin"
                        className="block w-full mx-auto py-3 px-9 font-bold text-neutral-950 bg-lime-600 hover:text-neutral-950 hover:bg-neutral-300 text-center subpixel-antialiased transition-all cursor-pointer"
                        onClick={() => handleOpenMenu()}
                      >
                        Sign In
                      </NavLink>
                    </li>
                  </React.Fragment>
                )}
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
