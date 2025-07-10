import * as React from "react";

import { useNavigate } from "react-router";

import Navbar from "./components/Navbar";
import Copyright from "./components/Copyright";

export default function App({
  children,
}: Readonly<React.PropsWithChildren<object>>) {
  const navigate = useNavigate();

  // Handle redirect
  const handleRedirect = async () => {
    if (window?.location) {
      const domain = window?.location?.toString();
      if (
        !domain?.includes("localhost") &&
        !domain?.includes("https://pinpointscore.golf/")
      ) {
        window.location.replace("https://pinpointscore.golf/");
      }
    }
  };

  // Handle server-side link
  const handleServerSideLink = async () => {
    if (window?.location) {
      const path = window?.location?.pathname?.toString();
      if (path !== "/") {
        navigate(`${path}`);
      }
    }
  };

  React.useEffect(() => {
    const loadConfiguration = async () => {
      await handleRedirect();
      await handleServerSideLink();
    };
    loadConfiguration();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <main id="main" className="z-0 max-w-6xl m-9 xl:mx-auto">
        <div className="flex flex-col flex-auto min-w-0 mt-3 px-3 md:px-0">
          <Navbar />
          {children}
          <Copyright />
        </div>
      </main>
    </React.Fragment>
  );
}
