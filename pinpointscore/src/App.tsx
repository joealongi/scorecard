import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="max-w-6xl mt-9 mx-9 xl:mx-auto ">
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
