// import { io } from "socket.io-client";

// const SOCKET_URL = "http://localhost:5000"; 

// export const socket = io(SOCKET_URL, {
//   autoConnect: false,         
//   transports: ["websocket"],  
//   reconnection: true,         
//   reconnectionAttempts: 5,    
//   reconnectionDelay: 1000,    
// });


// export const connectSocket = () => {
//   if (!socket.connected) {
//     socket.connect();
//     console.log("Socket connecting...");
//   }
// };


// socket.on("connect", () => {
//   console.log("✅ Socket connected:", socket.id);
// });

// socket.on("connect_error", (err) => {
//   console.error("Socket connection error:", err);
// });

// socket.on("disconnect", (reason) => {
//   console.warn("Socket disconnected:", reason);
// });


import { io } from "socket.io-client";

// 🧩 Debug log
console.log("🔍 import.meta.env.VITE_API_URL =", import.meta.env.VITE_API_URL);

// ✅ Pick URL
const SOCKET_URL =
  import.meta.env.VITE_API_URL || "https://construction-hazard-backend.onrender.com";

console.log("🌐 Using SOCKET_URL =", SOCKET_URL);

// ✅ Create socket instance
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  withCredentials: true,
});

// ✅ Function to connect the socket manually
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
    console.log("🔌 Attempting to connect to socket:", SOCKET_URL);
  }
};

// ✅ Socket event handlers
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.warn("⚠️ Socket disconnected:", reason);
});
