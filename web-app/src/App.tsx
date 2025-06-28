import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  console.log("----VITE_BASE_API_URL", import.meta.env.VITE_BASE_API_URL);
  console.log("----VITE_REDIRECT_URI", import.meta.env.VITE_REDIRECT_URI);
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
