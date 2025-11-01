
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import Navbar from "../components/Navbar";
// import AlertCard from "../components/AlertCard";
// import { FaBell } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

// export default function Alerts() {
//   const [alerts, setAlerts] = useState([]);
//   const [newAlertIds, setNewAlertIds] = useState([]);

//   const thresholds = {
//     dust: { warning: 70, critical: 150 },
//     vibration: { warning: 1.0, critical: 2.0 },
//   };

  
//   useEffect(() => {
//     const fetchAlerts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/alerts");
//         setAlerts(res.data);
//       } catch (err) {
//         console.error("Failed to fetch alerts:", err);
//       }
//     };
//     fetchAlerts();
//   }, []);

  
//   useEffect(() => {
//     const socket = io("http://localhost:5000", { autoConnect: true });

//     socket.on("connect", () => console.log("Connected via Socket.IO:", socket.id));

//     socket.on("newSensorData", async (data) => {
//       const newAlerts = [];

//       if (data.dustDensity > thresholds.dust.critical) {
//         newAlerts.push({ type: "Dust Alert", message: `Dust density too high: ${data.dustDensity.toFixed(2)} µg/m³`, severity: "critical", timestamp: new Date() });
//       } else if (data.dustDensity > thresholds.dust.warning) {
//         newAlerts.push({ type: "Dust Warning", message: `Dust rising: ${data.dustDensity.toFixed(2)} µg/m³`, severity: "warning", timestamp: new Date() });
//       }

//       if (data.vibration > thresholds.vibration.critical) {
//         newAlerts.push({ type: "Vibration Alert", message: `Vibration too high: ${data.vibration.toFixed(2)} V`, severity: "critical", timestamp: new Date() });
//       } else if (data.vibration > thresholds.vibration.warning) {
//         newAlerts.push({ type: "Vibration Warning", message: `Vibration rising: ${data.vibration.toFixed(2)} V`, severity: "warning", timestamp: new Date() });
//       }

//       if (newAlerts.length > 0) {
//         try {
//           const savePromises = newAlerts.map(alert => axios.post("http://localhost:5000/api/alerts", alert));
//           const savedAlerts = await Promise.all(savePromises);
//           const savedIds = savedAlerts.map(a => a.data._id);
//           setNewAlertIds(savedIds);
//           setTimeout(() => setNewAlertIds(prev => prev.filter(id => !savedIds.includes(id))), 10000);
//         } catch (err) {
//           console.error("Failed to save alert:", err);
//         }

//         setAlerts(prev => {
//           const combined = [...newAlerts, ...prev].slice(0, 5);
//           return combined;
//         });

//         newAlerts.forEach(alert => {
//           const style = { critical: { type: "error", icon: "🚨" }, warning: { type: "warning", icon: "⚠️" }, info: { type: "info", icon: "ℹ️" } };
//           const toastType = style[alert.severity] || style.info;
//           toast[toastType.type](`${toastType.icon} ${alert.message}`, { position: "top-right", autoClose: 5000 });
//         });
//       }
//     });

//     return () => socket.disconnect();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
//           <FaBell size={28} color="#1976d2" />
//           <h2 style={{ fontWeight: 700, margin: 0, color: "#222" }}>Alerts</h2>
//         </div>

//         {alerts.length > 0 ? (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
//             {alerts.map((alert, index) => (
//               <div key={index} style={{ position: "relative" }}>
//                 <AlertCard
//                   type={alert.type}
//                   message={alert.message}
//                   severity={alert.severity}
//                   timestamp={new Date(alert.timestamp).toLocaleString()}
//                 />
//                 {newAlertIds.includes(alert._id) && (
//                   <div style={{ position: "absolute", top: 8, right: 12, background: "#1976d2", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 6, letterSpacing: 0.5 }}>
//                     NEW
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div style={{ textAlign: "center", marginTop: 80, color: "#6c7a89" }}>
//             <p style={{ fontSize: "1.2rem" }}>No alerts at the moment.</p>
//             <small>All systems are operating normally.</small>
//           </div>
//         )}

//         <ToastContainer />
//       </div>
//     </>
//   );
// }







// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import Navbar from "../components/Navbar";
// import AlertCard from "../components/AlertCard";
// import { FaBell } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

// export default function Alerts() {
//   const [alerts, setAlerts] = useState([]);
//   const [newAlertIds, setNewAlertIds] = useState([]);

//   const thresholds = {
//     dust: { warning: 70, critical: 150 },
//     vibration: { warning: 1.0, critical: 2.0 },
//   };

//   // ✅ Use environment variable for backend URL (works on localhost & Render)
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   useEffect(() => {
//     const fetchAlerts = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/alerts`);
//         setAlerts(res.data);
//       } catch (err) {
//         console.error("Failed to fetch alerts:", err);
//       }
//     };
//     fetchAlerts();
//   }, [API_URL]);

//   useEffect(() => {
//     const socket = io(API_URL, { autoConnect: true, transports: ["websocket"] });

//     socket.on("connect", () => console.log("Connected via Socket.IO:", socket.id));

//     socket.on("newSensorData", async (data) => {
//       const newAlerts = [];

//       if (data.dustDensity > thresholds.dust.critical) {
//         newAlerts.push({
//           type: "Dust Alert",
//           message: `Dust density too high: ${data.dustDensity.toFixed(2)} µg/m³`,
//           severity: "critical",
//           timestamp: new Date(),
//         });
//       } else if (data.dustDensity > thresholds.dust.warning) {
//         newAlerts.push({
//           type: "Dust Warning",
//           message: `Dust rising: ${data.dustDensity.toFixed(2)} µg/m³`,
//           severity: "warning",
//           timestamp: new Date(),
//         });
//       }

//       if (data.vibration > thresholds.vibration.critical) {
//         newAlerts.push({
//           type: "Vibration Alert",
//           message: `Vibration too high: ${data.vibration.toFixed(2)} V`,
//           severity: "critical",
//           timestamp: new Date(),
//         });
//       } else if (data.vibration > thresholds.vibration.warning) {
//         newAlerts.push({
//           type: "Vibration Warning",
//           message: `Vibration rising: ${data.vibration.toFixed(2)} V`,
//           severity: "warning",
//           timestamp: new Date(),
//         });
//       }

//       if (newAlerts.length > 0) {
//         try {
//           const savePromises = newAlerts.map((alert) =>
//             axios.post(`${API_URL}/api/alerts`, alert)
//           );
//           const savedAlerts = await Promise.all(savePromises);
//           const savedIds = savedAlerts.map((a) => a.data._id);
//           setNewAlertIds(savedIds);
//           setTimeout(
//             () => setNewAlertIds((prev) => prev.filter((id) => !savedIds.includes(id))),
//             10000
//           );
//         } catch (err) {
//           console.error("Failed to save alert:", err);
//         }

//         setAlerts((prev) => {
//           const combined = [...newAlerts, ...prev].slice(0, 5);
//           return combined;
//         });

//         newAlerts.forEach((alert) => {
//           const style = {
//             critical: { type: "error", icon: "🚨" },
//             warning: { type: "warning", icon: "⚠️" },
//             info: { type: "info", icon: "ℹ️" },
//           };
//           const toastType = style[alert.severity] || style.info;
//           toast[toastType.type](`${toastType.icon} ${alert.message}`, {
//             position: "top-right",
//             autoClose: 5000,
//           });
//         });
//       }
//     });

//     return () => socket.disconnect();
//   }, [API_URL]);

//   return (
//     <>
//       <Navbar />
//       <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
//           <FaBell size={28} color="#1976d2" />
//           <h2 style={{ fontWeight: 700, margin: 0, color: "#222" }}>Alerts</h2>
//         </div>

//         {alerts.length > 0 ? (
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
//               gap: 24,
//             }}
//           >
//             {alerts.map((alert, index) => (
//               <div key={index} style={{ position: "relative" }}>
//                 <AlertCard
//                   type={alert.type}
//                   message={alert.message}
//                   severity={alert.severity}
//                   timestamp={new Date(alert.timestamp).toLocaleString()}
//                 />
//                 {newAlertIds.includes(alert._id) && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: 8,
//                       right: 12,
//                       background: "#1976d2",
//                       color: "#fff",
//                       fontSize: 10,
//                       fontWeight: 700,
//                       padding: "2px 6px",
//                       borderRadius: 6,
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     NEW
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div style={{ textAlign: "center", marginTop: 80, color: "#6c7a89" }}>
//             <p style={{ fontSize: "1.2rem" }}>No alerts at the moment.</p>
//             <small>All systems are operating normally.</small>
//           </div>
//         )}

//         <ToastContainer />
//       </div>
//     </>
//   );
// }





import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import AlertCard from "../components/AlertCard";
import { FaBell } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [newAlertIds, setNewAlertIds] = useState([]);

  const thresholds = {
    dust: { warning: 70, critical: 150 },
    vibration: { warning: 1.0, critical: 2.0 },
  };

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/alerts`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setAlerts(res.data);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      }
    };
    fetchAlerts();
  }, [API_URL]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io(API_URL, {
      autoConnect: true,
      transports: ["websocket"],
      withCredentials: true,
      auth: { token },
    });

    socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
    socket.on("connect_error", (err) =>
      console.error("❌ Socket connection error:", err.message)
    );

    socket.on("newSensorData", async (data) => {
      const newAlerts = [];

      // Dust logic
      if (data.dustDensity > thresholds.dust.critical) {
        newAlerts.push({
          type: "Dust Alert",
          message: `Dust density too high: ${data.dustDensity.toFixed(2)} µg/m³`,
          severity: "critical",
          timestamp: new Date(),
        });
      } else if (data.dustDensity > thresholds.dust.warning) {
        newAlerts.push({
          type: "Dust Warning",
          message: `Dust rising: ${data.dustDensity.toFixed(2)} µg/m³`,
          severity: "warning",
          timestamp: new Date(),
        });
      }

      // Vibration logic
      if (data.vibration > thresholds.vibration.critical) {
        newAlerts.push({
          type: "Vibration Alert",
          message: `Vibration too high: ${data.vibration.toFixed(2)} V`,
          severity: "critical",
          timestamp: new Date(),
        });
      } else if (data.vibration > thresholds.vibration.warning) {
        newAlerts.push({
          type: "Vibration Warning",
          message: `Vibration rising: ${data.vibration.toFixed(2)} V`,
          severity: "warning",
          timestamp: new Date(),
        });
      }

      if (newAlerts.length > 0) {
        try {
          const savePromises = newAlerts.map((alert) =>
            axios.post(`${API_URL}/api/alerts`, alert, {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            })
          );
          const savedAlerts = await Promise.all(savePromises);
          const savedIds = savedAlerts.map(
            (a) => a.data._id || a.data.id
          );
          setNewAlertIds(savedIds);
          setTimeout(
            () =>
              setNewAlertIds((prev) =>
                prev.filter((id) => !savedIds.includes(id))
              ),
            10000
          );
        } catch (err) {
          console.error("Failed to save alert:", err);
        }

        setAlerts((prev) => [...newAlerts, ...prev].slice(0, 5));

        newAlerts.forEach((alert) => {
          const style = {
            critical: { type: "error", icon: "🚨" },
            warning: { type: "warning", icon: "⚠️" },
            info: { type: "info", icon: "ℹ️" },
          };
          const toastType = style[alert.severity] || style.info;
          toast[toastType.type](`${toastType.icon} ${alert.message}`, {
            position: "top-right",
            autoClose: 5000,
          });
        });
      }
    });

    return () => socket.disconnect();
  }, [API_URL]);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <FaBell size={28} color="#1976d2" />
          <h2 style={{ fontWeight: 700, margin: 0, color: "#222" }}>Alerts</h2>
        </div>

        {alerts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {alerts.map((alert, index) => (
              <div key={index} style={{ position: "relative" }}>
                <AlertCard
                  type={alert.type}
                  message={alert.message}
                  severity={alert.severity}
                  timestamp={new Date(alert.timestamp).toLocaleString()}
                />
                {newAlertIds.includes(alert._id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 12,
                      background: "#1976d2",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: 6,
                      letterSpacing: 0.5,
                    }}
                  >
                    NEW
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: 80, color: "#6c7a89" }}>
            <p style={{ fontSize: "1.2rem" }}>No alerts at the moment.</p>
            <small>All systems are operating normally.</small>
          </div>
        )}

        <ToastContainer />
      </div>
    </>
  );
}
