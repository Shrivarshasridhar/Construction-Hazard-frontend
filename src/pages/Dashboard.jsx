


// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import Navbar from "../components/Navbar";
// import SensorCard from "../components/SensorCard";
// import { FaTachometerAlt } from "react-icons/fa";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export default function Dashboard() {
//   const [sensors, setSensors] = useState([]);

  
//   const [timeLabels, setTimeLabels] = useState([]);
//   const [dustData, setDustData] = useState([]);
//   const [vibrationData, setVibrationData] = useState([]);

//   useEffect(() => {
//     const socket = io("http://localhost:5000", { autoConnect: true });

//     socket.on("connect", () => console.log("Connected via Socket.IO:", socket.id));

//     socket.on("newSensorData", (data) => {
//       console.log("Received live sensor data:", data);

//       const updatedSensors = [
//         { name: "Dust Density", value: data.dustDensity.toFixed(2), status: getStatus(data.dustDensity, "dust") },
//         { name: "Vibration", value: data.vibration.toFixed(2), status: getStatus(data.vibration, "vibration") },
//       ];

//       setSensors(updatedSensors);

      
//       const currentTime = new Date().toLocaleTimeString();
//       setTimeLabels((prev) => [...prev, currentTime].slice(-20));
//       setDustData((prev) => [...prev, parseFloat(data.dustDensity.toFixed(2))].slice(-20));
//       setVibrationData((prev) => [...prev, parseFloat(data.vibration.toFixed(2))].slice(-20));

      
//       updatedSensors.forEach((sensor) => {
//         if (sensor.status === "warning" || sensor.status === "critical") {
//           showAlert(sensor.name, sensor.value, sensor.status);
//         }
//       });
//     });

//     socket.on("disconnect", () => console.log("Socket disconnected"));

//     return () => socket.disconnect();
//   }, []);

//   function getStatus(value, type) {
//     value = parseFloat(value);
//     switch (type) {
//       case "dust":
//         if (value > 150) return "critical";
//         if (value > 70) return "warning";
//         return "normal";
//       case "vibration":
//         if (value > 2.0) return "critical";
//         if (value > 1.0) return "warning";
//         return "normal";
//       default:
//         return "info";
//     }
//   }

//   function showAlert(name, value, status) {
//     const message = `${name} level is ${status.toUpperCase()} (value: ${value})`;
//     if (status === "critical") toast.error(message, { position: "top-right", autoClose: 5000 });
//     else if (status === "warning") toast.warn(message, { position: "top-right", autoClose: 5000 });
//   }

  
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Live Sensor Data Graph" },
//     },
//     scales: { y: { beginAtZero: true } },
//     maintainAspectRatio: false,
//   };

//   return (
//     <>
//       <Navbar />
//       <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 16px" }}>
//         {/* Dashboard Header */}
//         <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
//           <FaTachometerAlt size={28} color="#1976d2" />
//           <h2 style={{ fontWeight: 700, margin: 0, color: "#222" }}>Dashboard</h2>
//         </div>

//         {/* Sensor Cards Section */}
//         {sensors.length > 0 ? (
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
//               gap: 24,
//               justifyContent: "center",
//             }}
//           >
//             {sensors.map((sensor, index) => (
//               <div key={index}>
//                 <SensorCard name={sensor.name} value={sensor.value} status={sensor.status} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div style={{ textAlign: "center", marginTop: 80, color: "#6c7a89" }}>
//             <p style={{ fontSize: "1.2rem" }}>Waiting for live sensor data...</p>
//           </div>
//         )}

//         {/* Graphs Section */}
//         {sensors.length > 0 && (
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
//               gap: 24,
//               marginTop: 40,
//               justifyContent: "center",
//             }}
//           >
//             {/* Dust Density Graph */}
//             <div
//               style={{
//                 height: 300,
//                 background: "#fff",
//                 padding: 16,
//                 borderRadius: 12,
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <h3 style={{ marginBottom: 8 }}>Dust Density Graph</h3>
//               <Line
//                 data={{
//                   labels: timeLabels,
//                   datasets: [
//                     {
//                       label: "Dust Density",
//                       data: dustData,
//                       borderColor: "#ff6384",
//                       backgroundColor: "rgba(255,99,132,0.2)",
//                       fill: true,
//                       tension: 0.3,
//                     },
//                   ],
//                 }}
//                 options={chartOptions}
//               />
//             </div>

//             {/* Vibration Graph */}
//             <div
//               style={{
//                 height: 300,
//                 background: "#fff",
//                 padding: 16,
//                 borderRadius: 12,
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <h3 style={{ marginBottom: 8 }}>Vibration Graph</h3>
//               <Line
//                 data={{
//                   labels: timeLabels,
//                   datasets: [
//                     {
//                       label: "Vibration",
//                       data: vibrationData,
//                       borderColor: "#36a2eb",
//                       backgroundColor: "rgba(54,162,235,0.2)",
//                       fill: true,
//                       tension: 0.3,
//                     },
//                   ],
//                 }}
//                 options={chartOptions}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <ToastContainer />
//     </>
//   );
// }



import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import SensorCard from "../components/SensorCard";
import { FaTachometerAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [sensors, setSensors] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const [dustData, setDustData] = useState([]);
  const [vibrationData, setVibrationData] = useState([]);

  // ✅ Automatically picks backend URL (Render or localhost)
  const SOCKET_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

  useEffect(() => {
    // ✅ Connect using environment variable
    const socket = io(SOCKET_URL, { autoConnect: true, transports: ["websocket"] });

    socket.on("connect", () => console.log("✅ Connected via Socket.IO:", socket.id));

    socket.on("newSensorData", (data) => {
      console.log("📡 Received live sensor data:", data);

      const updatedSensors = [
        {
          name: "Dust Density",
          value: data.dustDensity.toFixed(2),
          status: getStatus(data.dustDensity, "dust"),
        },
        {
          name: "Vibration",
          value: data.vibration.toFixed(2),
          status: getStatus(data.vibration, "vibration"),
        },
      ];

      setSensors(updatedSensors);

      const currentTime = new Date().toLocaleTimeString();
      setTimeLabels((prev) => [...prev, currentTime].slice(-20));
      setDustData((prev) => [...prev, parseFloat(data.dustDensity.toFixed(2))].slice(-20));
      setVibrationData((prev) => [...prev, parseFloat(data.vibration.toFixed(2))].slice(-20));

      updatedSensors.forEach((sensor) => {
        if (sensor.status === "warning" || sensor.status === "critical") {
          showAlert(sensor.name, sensor.value, sensor.status);
        }
      });
    });

    socket.on("disconnect", () => console.log("❌ Socket disconnected"));

    return () => socket.disconnect();
  }, [SOCKET_URL]);

  function getStatus(value, type) {
    value = parseFloat(value);
    switch (type) {
      case "dust":
        if (value > 150) return "critical";
        if (value > 70) return "warning";
        return "normal";
      case "vibration":
        if (value > 2.0) return "critical";
        if (value > 1.0) return "warning";
        return "normal";
      default:
        return "info";
    }
  }

  function showAlert(name, value, status) {
    const message = `${name} level is ${status.toUpperCase()} (value: ${value})`;
    if (status === "critical") toast.error(message, { position: "top-right", autoClose: 5000 });
    else if (status === "warning") toast.warn(message, { position: "top-right", autoClose: 5000 });
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Live Sensor Data Graph" },
    },
    scales: { y: { beginAtZero: true } },
    maintainAspectRatio: false,
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <FaTachometerAlt size={28} color="#1976d2" />
          <h2 style={{ fontWeight: 700, margin: 0, color: "#222" }}>Dashboard</h2>
        </div>

        {sensors.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {sensors.map((sensor, index) => (
              <div key={index}>
                <SensorCard name={sensor.name} value={sensor.value} status={sensor.status} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: 80, color: "#6c7a89" }}>
            <p style={{ fontSize: "1.2rem" }}>Waiting for live sensor data...</p>
          </div>
        )}

        {sensors.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: 24,
              marginTop: 40,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: 300,
                background: "#fff",
                padding: 16,
                borderRadius: 12,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: 8 }}>Dust Density Graph</h3>
              <Line
                data={{
                  labels: timeLabels,
                  datasets: [
                    {
                      label: "Dust Density",
                      data: dustData,
                      borderColor: "#ff6384",
                      backgroundColor: "rgba(255,99,132,0.2)",
                      fill: true,
                      tension: 0.3,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </div>

            <div
              style={{
                height: 300,
                background: "#fff",
                padding: 16,
                borderRadius: 12,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: 8 }}>Vibration Graph</h3>
              <Line
                data={{
                  labels: timeLabels,
                  datasets: [
                    {
                      label: "Vibration",
                      data: vibrationData,
                      borderColor: "#36a2eb",
                      backgroundColor: "rgba(54,162,235,0.2)",
                      fill: true,
                      tension: 0.3,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
}
