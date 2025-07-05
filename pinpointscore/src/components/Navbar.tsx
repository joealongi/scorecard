import * as React from "react";

import { Link } from "react-router-dom";

import Pinpointscore from "../assets/pinpointscore.svg";
import PinpointscoreMenu from "../assets/pinpointscore-menu.svg";
import NavListHorizontal from "./navbar/NavListHorizontal";
import NavListVertical from "./navbar/NavListVertical";

export default function Navbar() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  React.useEffect(() => {
    const authentication = false;
    return () => {
      if (authentication) {
        setAuthenticated(true);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <nav className="block relative mb-9 invisible hidden md:visible md:block">
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
          <NavListHorizontal authenticated={authenticated} />
        </ul>
      </nav>
      <nav className="block relative mb-9 md:invisible md:hidden">
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
            <NavListVertical
              authenticated={authenticated}
              handleToggle={handleToggle}
            />
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </nav>
    </React.Fragment>
  );
}
