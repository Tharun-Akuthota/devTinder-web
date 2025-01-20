import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />{" "}
      {/*Any children of the Body component will be rendered here, outlet helps to render nested routes */}
      <Footer />
    </>
  );
};

export default Body;
