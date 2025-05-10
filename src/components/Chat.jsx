import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const chatContainerRef = useRef(null);
  const socket = useRef(null);

  const userId = user?._id;

  const formatTime = (timestamp) => {
    if (!timestamp) return "Just now";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          senderId: senderId?._id,
          text: text,
          timestamp: createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
    }
  };

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) {
      return;
    }

    // Create socket connection once
    socket.current = createSocketConnection();

    // Join chat room
    socket.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // Listen for new messages
    socket.current.on(
      "messageReceived",
      ({ firstName, lastName, text, senderId, timestamp }) => {
        // Only add received messages from others, not our own (which we've added locally)
        if (senderId !== userId) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              firstName,
              lastName,
              senderId,
              text,
              timestamp: timestamp || new Date().toISOString(),
            },
          ]);
        }
      }
    );

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [userId, targetUserId, user.firstName]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket.current) return;

    const timestamp = new Date().toISOString();

    // Emit message through socket
    socket.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      text: newMessage,
      userId,
      targetUserId,
      timestamp,
    });

    // Add message to our local state immediately (only once)
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        senderId: userId,
        text: newMessage,
        timestamp,
      },
    ]);

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-3/4 mx-auto mt-10 border-2 border-gray-600 rounded-lg m-5 h-[70vh] flex flex-col">
      <h1 className="text-center p-3 border-b border-gray-600 font-semibold uppercase text-xl">
        chat
      </h1>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5 flex flex-col gap-2"
      >
        {messages.map((msg, index) => {
          const isCurrentUser = msg.senderId === userId;

          return (
            <div
              key={index}
              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isCurrentUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}
              >
                {!isCurrentUser && (
                  <div className="font-semibold text-sm mb-1">
                    {`${msg.firstName} ${msg.lastName}`}
                  </div>
                )}
                <div>{msg.text}</div>
                <div
                  className={`text-xs mt-1 ${isCurrentUser ? "text-blue-200" : "text-gray-300"}`}
                >
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-600 flex justify-between items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-500 text-white rounded-full px-4 py-2 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="btn btn-secondary rounded-full px-6"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import BASE_URL from "../utils/constants";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const user = useSelector((store) => store.user);
//   const userId = user?._id;

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "Just now";
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//       withCredentials: true,
//     });

//     console.log(chat.data.messages);

//     const chatMessages = chat?.data?.messages.map((msg) => {
//       const { senderId, text } = msg;
//       return {
//         firstName: senderId?.firstName,
//         lastName: senderId?.lastName,
//         text,
//       };
//     });
//     setMessages(chatMessages);
//   };
//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId) {
//       return;
//     }
//     const socket = createSocketConnection();
//     // As soon as the page loaded, the socket connection is made and joinChat event is emitted
//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//     });

//     socket.on("messageReceived", ({ firstName, lastName, text }) => {
//       console.log(firstName + " :  " + text);
//       setMessages((messages) => [...messages, { firstName, lastName, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserId]);

//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       userId,
//       targetUserId,
//       text: newMessage,
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
//       <h1 className="p-5 border-b border-gray-600">Chat</h1>
//       <div className="flex-1 overflow-scroll p-5">
//         {messages.map((msg, index) => {
//           return (
//             <div
//               key={index}
//               className={
//                 "chat " +
//                 (user.firstName === msg.firstName ? "chat-end" : "chat-start")
//               }
//             >
//               <div className="chat-header">
//                 {`${msg.firstName}  ${msg.lastName}`}
//                 <time className="text-xs opacity-50"> 2 hours ago</time>
//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               <div className="chat-footer opacity-50">Seen</div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="p-5 border-t border-gray-600 flex items-center gap-2">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border border-gray-500 text-white rounded p-2"
//         ></input>
//         <button onClick={sendMessage} className="btn btn-secondary">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Chat;
