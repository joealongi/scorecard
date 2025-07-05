import * as React from "react";

import { Link } from "react-router-dom";

import Pinpointscore from "../assets/pinpointscore.svg";
import PinpointscoreMenu from "../assets/pinpointscore-menu.svg";
import NavList from "./navbar/NavList";

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
      <nav className="block relative mb-[9vh] invisible hidden md:visible md:block">
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
          <NavList authenticated={authenticated} handleToggle={handleToggle} />
        </ul>
      </nav>
      <nav className="block relative mb-[9vh] md:invisible md:hidden">
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
              onClick={() => setToggle(!toggle)}
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
        {toggle ? (
          <div className="absolute h-auto w-full mt-3 py-3 px-3 bg-neutral-900 shadow-xl transition-all">
            <ul className="flex flex-col space-y-3 mx-auto">
              <NavList
                authenticated={authenticated}
                handleToggle={handleToggle}
              />
            </ul>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </nav>
    </React.Fragment>
  );
}
