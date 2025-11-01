// import { useEffect, useState, useRef } from 'react';
// import { Navigate } from 'react-router-dom';
// import { io } from 'socket.io-client';

// export default function ProtectedRoute({ children }) {
//   const [isAuthChecked, setIsAuthChecked] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     setTimeout(() => {
//       const authenticated = !!token;
//       setIsAuthenticated(authenticated);
//       setIsAuthChecked(true);

      
//       if (authenticated) {
//         socketRef.current = io("http://localhost:5000", {
//           auth: { token }, 
//         });

        
//         socketRef.current.on("newAlert", (alert) => {
//           console.log("Received new alert:", alert);
//         });
//       }
//     }, 500);

    
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, []);

//   if (!isAuthChecked) {
//     return (
//       <div
//         style={{
//           minHeight: '100vh',
//           background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <div
//           style={{
//             background: '#fff',
//             borderRadius: 16,
//             boxShadow: '0 8px 32px rgba(60,60,120,0.12)',
//             padding: '2.5rem 2rem',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             minWidth: 320,
//           }}
//         >
//           <svg
//             style={{ marginBottom: 16 }}
//             width="48"
//             height="48"
//             viewBox="0 0 48 48"
//             fill="none"
//           >
//             <circle cx="24" cy="24" r="22" stroke="#1976d2" strokeWidth="4" fill="#e3f0fc" />
//             <path d="M24 14v10" stroke="#1976d2" strokeWidth="3" strokeLinecap="round" />
//             <circle cx="24" cy="32" r="2" fill="#1976d2" />
//           </svg>
//           <div style={{ fontWeight: 600, fontSize: '1.2rem', color: '#1976d2', marginBottom: 8 }}>
//             Checking authentication...
//           </div>
//           <div style={{ color: '#6c7a89', fontSize: '1rem' }}>
//             Please wait while we verify your access.
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function ProtectedRoute({ children }) {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const socketRef = useRef(null);

  const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authenticated = !!token;
    setIsAuthenticated(authenticated);
    setIsAuthChecked(true);

    if (authenticated) {
      socketRef.current = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket"],
        withCredentials: true,
      });

      socketRef.current.on("connect", () =>
        console.log("✅ Socket connected (ProtectedRoute)")
      );

      socketRef.current.on("connect_error", (err) =>
        console.error("❌ Socket connection error:", err.message)
      );

      socketRef.current.on("newAlert", (alert) => {
        console.log("📢 Received new alert:", alert);
      });
    }

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [SOCKET_URL]);

  if (!isAuthChecked) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(60,60,120,0.12)",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 320,
          }}
        >
          <svg
            style={{ marginBottom: 16 }}
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="#1976d2"
              strokeWidth="4"
              fill="#e3f0fc"
            />
            <path
              d="M24 14v10"
              stroke="#1976d2"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="24" cy="32" r="2" fill="#1976d2" />
          </svg>
          <div
            style={{
              fontWeight: 600,
              fontSize: "1.2rem",
              color: "#1976d2",
              marginBottom: 8,
            }}
          >
            Checking authentication...
          </div>
          <div style={{ color: "#6c7a89", fontSize: "1rem" }}>
            Please wait while we verify your access.
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}
