import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    (async function () {
      const response = await fetch(`/api/message`);
      const message = await response.text();
      setData(message);
    })();
    console.log("If the putt went in you will see it here", data);
  });

  return (
    <>
      <BrowserRouter>
        <main className="max-w-6xl mt-[9vh] mx-9 xl:mx-auto">
          <div className="flex flex-col flex-auto min-w-0 mt-3 px-3 md:px-0">
            <Navbar />
            <AppRoutes />
            <Footer />
          </div>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
