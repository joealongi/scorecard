import * as React from "react";

import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

import Navbar from "./components/Navbar";
import Copyright from "./components/Copyright";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <main id="main" className="z-0 max-w-6xl m-9 xl:mx-auto">
          <div className="flex flex-col flex-auto min-w-0 mt-3 px-3 md:px-0">
            <Navbar />
            <AppRoutes />
            <Copyright />
          </div>
        </main>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
