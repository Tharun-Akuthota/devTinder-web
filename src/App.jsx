import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import appStore from "./utils/appStore";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginFooter />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
              </Route>
            </Route>

            {/* Handle Unknown Routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </>
      </BrowserRouter>
    </Provider>
  );
}

function LoginFooter() {
  return (
    <>
      <Login />
      <Footer />
    </>
  );
}

export default App;
