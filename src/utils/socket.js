import { io } from "socket.io-client";
import BASE_URL from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};

// set up socket connection with the server
