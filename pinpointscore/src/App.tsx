import * as React from "react";

import Navbar from "./components/Navbar";
import Copyright from "./components/Copyright";

export default function App({
  children,
}: Readonly<React.PropsWithChildren<object>>) {
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
