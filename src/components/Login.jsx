import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // await axios.post("http://localhost:7777/login", { emailId, password });
    // this request will blocked by CORS because the server is not configured to accept requests from same domain
    // it is browser's security feature to block requests from different domain, even port is matter

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true } // when doing axios request, we can pass withCredentials: true to send cookies along with the request
      );

      dispatch(addUser(res.data)); // dispatching an action to update the state variable
      return navigate("/"); // redirecting to the home page
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      console.log(res.data);
      console.log(res.data.data);

      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-gray-300 text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title bold text-black justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {!isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={firstName}
                  className="bg-white input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-black">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={lastName}
                  className="bg-white input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-black">Email Id</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={emailId}
              className="bg-white input input-bordered w-full max-w-xs"
              onChange={(e) => setEmailId(e.target.value)} // binding the state variable to the UI and updating the state variable
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-black">Password</span>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Type here"
              value={password}
              className="bg-white input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end">
            <button
              className="btn hover:bg-gray-800"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Log In" : "Sign Up"}
            </button>
          </div>

          <p
            className="text-center mt-4 cursor-pointer"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm
              ? "New User? SignUp Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
