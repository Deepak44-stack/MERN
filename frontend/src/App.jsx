import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

function App() {
return (
  <>
    <Header/>
  <main className="my-3">
    <Outlet />
  </main> 
     <Footer/>
     </>
     
);
}

export default App;
