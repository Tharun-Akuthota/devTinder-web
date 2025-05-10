import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import BASE_URL from "../utils/constants";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user); // here we are getting the user data from the redux store

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data)); // here we are adding the user to the redux store so that we can access it even if we navigate to a different page
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login"); // if the user is not logged in then we will navigate to the login page
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser(); // here fetch user will make a request to the server to get the user details
  }, []); // this will run only once when the component is first rendered

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
        {/*Any children of the Body component will be rendered here, outlet helps to render nested routes */}
      </main>
      <Footer />
    </div>
  );
};

export default Body;
