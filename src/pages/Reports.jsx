
// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import { FaDownload } from "react-icons/fa";


// const getToken = async () => {
//   let token = localStorage.getItem("token");
//   if (token) return token;

//   const res = await fetch("http://localhost:5000/api/users/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email: "sri@example.com", password: "sri" }),
//   });

//   const data = await res.json();
//   if (data.token) {
//     localStorage.setItem("token", data.token);
//     return data.token;
//   } else throw new Error("Auto-login failed");
// };

// export default function Reports() {
//   const [sensor, setSensor] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const thresholds = {
//     dust: { warning: 70, critical: 150 },
//     vibration: { warning: 1.0, critical: 2.0 },
//   };

//   const getStatus = (value, type) => {
//     value = parseFloat(value);
//     if (type === "dustDensity") {
//       if (value > thresholds.dust.critical) return "critical";
//       if (value > thresholds.dust.warning) return "warning";
//       return "normal";
//     }
//     if (type === "vibration") {
//       if (value > thresholds.vibration.critical) return "critical";
//       if (value > thresholds.vibration.warning) return "warning";
//       return "normal";
//     }
//     return "normal";
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "critical":
//         return { color: "#c62828", fontWeight: 600 };
//       case "warning":
//         return { color: "#f9a825", fontWeight: 600 };
//       default:
//         return { color: "#2e7d32", fontWeight: 600 };
//     }
//   };

//   const handleGenerate = async () => {
//     if (!sensor || !fromDate || !toDate) return;
//     setLoading(true);
//     setReportData([]);

//     try {
//       const token = await getToken();
//       const res = await fetch(
//         `http://localhost:5000/api/sensors?from=${fromDate}&to=${toDate}&sensor=${sensor}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.status === 401) {
//         localStorage.removeItem("token");
//         alert("Unauthorized! Token expired.");
//         setLoading(false);
//         return;
//       }

//       const data = await res.json();
//       if (data.success) {
//         setReportData(
//           data.sensors.sort(
//             (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//           )
//         );
//       } else alert(data.message || "Failed to fetch report data");
//     } catch (err) {
//       console.error("Error fetching report:", err);
//       alert("Error fetching report data");
//     }

//     setLoading(false);
//   };

//   const handleDownloadCSV = async () => {
//     if (!sensor || !fromDate || !toDate) return;

//     try {
//       const token = await getToken();
//       const res = await fetch(
//         `http://localhost:5000/api/sensors/download?from=${fromDate}&to=${toDate}&sensor=${sensor}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (!res.ok) throw new Error("Failed to download CSV");

//       const blob = await res.blob();
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = `report_${sensor}_${fromDate}_to_${toDate}.csv`;
//       link.click();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div
//         style={{
//           minHeight: "100vh",
//           padding: "2rem 1rem",
//           background: "#ffffff", 
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <div
//           className="card shadow-sm p-4"
//           style={{
//             width: "100%",
//             maxWidth: "800px",
//             borderRadius: 16,
//             backgroundColor: "#ffffffee",
//             backdropFilter: "blur(6px)",
//           }}
//         >
//           <h3
//             className="text-center mb-4 fw-bold"
//             style={{ color: "#1976d2" }}
//           >
//             Generate Reports
//           </h3>

//           <div className="mb-3">
//             <label>Sensor</label>
//             <select
//               className="form-select"
//               value={sensor}
//               onChange={(e) => setSensor(e.target.value)}
//             >
//               <option value="">Select Sensor</option>
//               <option value="vibration">Vibration</option>
//               <option value="dustDensity">Dust Density</option>
//             </select>
//           </div>

//           <div className="mb-3">
//             <label>From</label>
//             <input
//               type="date"
//               className="form-control"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label>To</label>
//             <input
//               type="date"
//               className="form-control"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//             />
//           </div>

//           <div className="d-flex justify-content-center gap-2 mb-4">
//             <button
//               className="btn btn-primary"
//               onClick={handleGenerate}
//               disabled={loading}
//             >
//               {loading ? "Generating..." : "Generate"}
//             </button>

//             {reportData.length > 0 && (
//               <button className="btn btn-success" onClick={handleDownloadCSV}>
//                 <FaDownload /> Download CSV
//               </button>
//             )}
//           </div>

//           {reportData.length > 0 && (
//             <div
//               style={{
//                 overflowX: "auto",
//                 borderRadius: 8,
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               }}
//             >
//               <table className="table table-striped mb-0 text-center align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Timestamp</th>
//                     <th>
//                       {sensor === "vibration"
//                         ? "Vibration (V)"
//                         : "Dust Density (µg/m³)"}
//                     </th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reportData.map((item, idx) => {
//                     const value =
//                       sensor === "vibration"
//                         ? item.vibration
//                         : item.dustDensity;
//                     const status = getStatus(value, sensor);
//                     return (
//                       <tr key={idx}>
//                         <td>{new Date(item.createdAt).toLocaleString()}</td>
//                         <td>{value.toFixed(2)}</td>
//                         <td style={getStatusStyle(status)}>
//                           {status.toUpperCase()}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaDownload } from "react-icons/fa";

// ✅ Get backend base URL from .env (with fallback for local dev)
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getToken = async () => {
  let token = localStorage.getItem("token");
  if (token) return token;

  const res = await fetch(`${API}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "sri@example.com", password: "sri" }),
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    return data.token;
  } else throw new Error("Auto-login failed");
};

export default function Reports() {
  const [sensor, setSensor] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const thresholds = {
    dust: { warning: 70, critical: 150 },
    vibration: { warning: 1.0, critical: 2.0 },
  };

  const getStatus = (value, type) => {
    value = parseFloat(value);
    if (type === "dustDensity") {
      if (value > thresholds.dust.critical) return "critical";
      if (value > thresholds.dust.warning) return "warning";
      return "normal";
    }
    if (type === "vibration") {
      if (value > thresholds.vibration.critical) return "critical";
      if (value > thresholds.vibration.warning) return "warning";
      return "normal";
    }
    return "normal";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "critical":
        return { color: "#c62828", fontWeight: 600 };
      case "warning":
        return { color: "#f9a825", fontWeight: 600 };
      default:
        return { color: "#2e7d32", fontWeight: 600 };
    }
  };

  const handleGenerate = async () => {
    if (!sensor || !fromDate || !toDate) return;
    setLoading(true);
    setReportData([]);

    try {
      const token = await getToken();
      const res = await fetch(
        `${API}/api/sensors?from=${fromDate}&to=${toDate}&sensor=${sensor}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        alert("Unauthorized! Token expired.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setReportData(
          data.sensors.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else alert(data.message || "Failed to fetch report data");
    } catch (err) {
      console.error("Error fetching report:", err);
      alert("Error fetching report data");
    }

    setLoading(false);
  };

  const handleDownloadCSV = async () => {
    if (!sensor || !fromDate || !toDate) return;

    try {
      const token = await getToken();
      const res = await fetch(
        `${API}/api/sensors/download?from=${fromDate}&to=${toDate}&sensor=${sensor}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error("Failed to download CSV");

      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `report_${sensor}_${fromDate}_to_${toDate}.csv`;
      link.click();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          padding: "2rem 1rem",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="card shadow-sm p-4"
          style={{
            width: "100%",
            maxWidth: "800px",
            borderRadius: 16,
            backgroundColor: "#ffffffee",
            backdropFilter: "blur(6px)",
          }}
        >
          <h3
            className="text-center mb-4 fw-bold"
            style={{ color: "#1976d2" }}
          >
            Generate Reports
          </h3>

          <div className="mb-3">
            <label>Sensor</label>
            <select
              className="form-select"
              value={sensor}
              onChange={(e) => setSensor(e.target.value)}
            >
              <option value="">Select Sensor</option>
              <option value="vibration">Vibration</option>
              <option value="dustDensity">Dust Density</option>
            </select>
          </div>

          <div className="mb-3">
            <label>From</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>To</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-center gap-2 mb-4">
            <button
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>

            {reportData.length > 0 && (
              <button className="btn btn-success" onClick={handleDownloadCSV}>
                <FaDownload /> Download CSV
              </button>
            )}
          </div>

          {reportData.length > 0 && (
            <div
              style={{
                overflowX: "auto",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <table className="table table-striped mb-0 text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Timestamp</th>
                    <th>
                      {sensor === "vibration"
                        ? "Vibration (V)"
                        : "Dust Density (µg/m³)"}
                    </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, idx) => {
                    const value =
                      sensor === "vibration"
                        ? item.vibration
                        : item.dustDensity;
                    const status = getStatus(value, sensor);
                    return (
                      <tr key={idx}>
                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                        <td>{value.toFixed(2)}</td>
                        <td style={getStatusStyle(status)}>
                          {status.toUpperCase()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
