import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import appStore from "./utils/appStore";
import PrivateRoute from "./components/PrivateRoute";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Footer from "./components/Footer";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/login" element={<LoginFooter />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
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
