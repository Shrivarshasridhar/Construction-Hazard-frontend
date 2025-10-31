


// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaCog,
//   FaUser,
//   FaChartBar,
//   FaExclamationTriangle,
//   FaHome,
//   FaFileAlt,
//   FaShieldAlt,
// } from "react-icons/fa";
// import { io } from "socket.io-client";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [unreadAlerts, setUnreadAlerts] = useState(0);

//   const isAboutPage = location.pathname === "/";
//   const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

//   useEffect(() => {
//     if (!isAboutPage && !isAuthPage) {
//       const socket = io("http://localhost:5000");
//       socket.on("newAlert", () => {
//         setUnreadAlerts((prev) => prev + 1);
//       });
//       return () => socket.disconnect();
//     }
//   }, [isAboutPage, isAuthPage]);

//   const navStyle = {
//     width: "100%",
//     background: "#0A2540",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "0 2rem",
//     height: "64px",
//     position: "sticky",
//     top: 0,
//     zIndex: 100,
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//   };

//   const brandStyle = {
//     display: "flex",
//     alignItems: "center",
//     fontWeight: 700,
//     fontSize: "1.4rem",
//     color: "#fff",
//     textDecoration: "none",
//     letterSpacing: "0.5px",
//   };

//   const linkStyle = (path) => ({
//     color: location.pathname === path ? "#4FC3F7" : "#E0E6ED",
//     textDecoration: "none",
//     fontWeight: 500,
//     fontSize: "1rem",
//     display: "flex",
//     alignItems: "center",
//     gap: "0.4rem",
//     position: "relative",
//     paddingBottom: "4px",
//     borderBottom:
//       location.pathname === path ? "2px solid #4FC3F7" : "2px solid transparent",
//     transition: "all 0.25s ease",
//   });

//   const logoutStyle = {
//     background: "none",
//     border: "none",
//     color: "#FF6B6B",
//     cursor: "pointer",
//     fontWeight: 600,
//     fontSize: "1rem",
//   };

  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

  
//   if (isAboutPage || isAuthPage) {
//     return (
//       <nav style={navStyle}>
//         <Link to="/" style={brandStyle}>
//           <FaShieldAlt style={{ marginRight: 8, fontSize: "1.5rem" }} />
//           Hazard Monitor
//         </Link>

//         <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
//           <Link
//             to="/login"
//             style={{ ...linkStyle("/login"), color: "#fff", fontWeight: 600 }}
//           >
//             Login
//           </Link>
//           <Link
//             to="/register"
//             style={{ ...linkStyle("/register"), color: "#fff", fontWeight: 600 }}
//           >
//             Register
//           </Link>
//         </div>
//       </nav>
//     );
//   }

  
//   return (
//     <nav style={navStyle}>
//       <Link to="/dashboard" style={brandStyle}>
//         <FaShieldAlt style={{ marginRight: 8, fontSize: "1.5rem" }} />
//         Hazard Monitor
//       </Link>

//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "1.8rem",
//           flex: 1,
//           marginLeft: "2rem",
//         }}
//       >
//         <Link to="/dashboard" style={linkStyle("/dashboard")}>
//           <FaHome /> Dashboard
//         </Link>
//         <Link to="/alerts" style={linkStyle("/alerts")}>
//           <FaExclamationTriangle /> Alerts
//           {unreadAlerts > 0 && (
//             <span
//               style={{
//                 background: "#e53935",
//                 color: "#fff",
//                 borderRadius: "50%",
//                 fontSize: "0.7rem",
//                 padding: "0.2em 0.45em",
//                 position: "absolute",
//                 top: "-5px",
//                 right: "-8px",
//                 fontWeight: 600,
//               }}
//             >
//               {unreadAlerts}
//             </span>
//           )}
//         </Link>
//         <Link to="/reports" style={linkStyle("/reports")}>
//           <FaFileAlt /> Reports
//         </Link>
//         <Link to="/settings" style={linkStyle("/settings")}>
//           <FaCog /> Settings
//         </Link>
//         <Link to="/profile" style={linkStyle("/profile")}>
//           <FaUser /> Profile
//         </Link>
//       </div>

//       <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//         <button
//           style={{
//             background: "none",
//             border: "none",
//             color: "#E0E6ED",
//             cursor: "pointer",
//             fontSize: "1.2rem",
//           }}
//         >
//           <FaBell />
//         </button>
//         <button onClick={handleLogout} style={logoutStyle}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCog,
  FaUser,
  FaChartBar,
  FaExclamationTriangle,
  FaHome,
  FaFileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { io } from "socket.io-client";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadAlerts, setUnreadAlerts] = useState(0);

  const isAboutPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  // ✅ Use environment variable (Render or local)
  const SOCKET_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!isAboutPage && !isAuthPage) {
      const socket = io(SOCKET_URL, {
        transports: ["websocket"], // helps with Render deployment
      });
      socket.on("newAlert", () => {
        setUnreadAlerts((prev) => prev + 1);
      });
      return () => socket.disconnect();
    }
  }, [isAboutPage, isAuthPage, SOCKET_URL]);

  const navStyle = {
    width: "100%",
    background: "#0A2540",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  const brandStyle = {
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    fontSize: "1.4rem",
    color: "#fff",
    textDecoration: "none",
    letterSpacing: "0.5px",
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#4FC3F7" : "#E0E6ED",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    position: "relative",
    paddingBottom: "4px",
    borderBottom:
      location.pathname === path ? "2px solid #4FC3F7" : "2px solid transparent",
    transition: "all 0.25s ease",
  });

  const logoutStyle = {
    background: "none",
    border: "none",
    color: "#FF6B6B",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isAboutPage || isAuthPage) {
    return (
      <nav style={navStyle}>
        <Link to="/" style={brandStyle}>
          <FaShieldAlt style={{ marginRight: 8, fontSize: "1.5rem" }} />
          Hazard Monitor
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link
            to="/login"
            style={{ ...linkStyle("/login"), color: "#fff", fontWeight: 600 }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{ ...linkStyle("/register"), color: "#fff", fontWeight: 600 }}
          >
            Register
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav style={navStyle}>
      <Link to="/dashboard" style={brandStyle}>
        <FaShieldAlt style={{ marginRight: 8, fontSize: "1.5rem" }} />
        Hazard Monitor
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.8rem",
          flex: 1,
          marginLeft: "2rem",
        }}
      >
        <Link to="/dashboard" style={linkStyle("/dashboard")}>
          <FaHome /> Dashboard
        </Link>
        <Link to="/alerts" style={linkStyle("/alerts")}>
          <FaExclamationTriangle /> Alerts
          {unreadAlerts > 0 && (
            <span
              style={{
                background: "#e53935",
                color: "#fff",
                borderRadius: "50%",
                fontSize: "0.7rem",
                padding: "0.2em 0.45em",
                position: "absolute",
                top: "-5px",
                right: "-8px",
                fontWeight: 600,
              }}
            >
              {unreadAlerts}
            </span>
          )}
        </Link>
        <Link to="/reports" style={linkStyle("/reports")}>
          <FaFileAlt /> Reports
        </Link>
        <Link to="/settings" style={linkStyle("/settings")}>
          <FaCog /> Settings
        </Link>
        <Link to="/profile" style={linkStyle("/profile")}>
          <FaUser /> Profile
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#E0E6ED",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          <FaBell />
        </button>
        <button onClick={handleLogout} style={logoutStyle}>
          Logout
        </button>
      </div>
    </nav>
  );
}

