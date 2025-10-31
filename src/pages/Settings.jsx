
// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { FaSlidersH } from "react-icons/fa";

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

// export default function Settings() {
//   const [dustThreshold, setDustThreshold] = useState(70);
//   const [vibrationThreshold, setVibrationThreshold] = useState(1.0);

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const token = await getToken();
//         const res = await fetch("http://localhost:5000/api/sensors/settings", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (data.success && data.settings) {
//           if (data.settings.dustThreshold != null) setDustThreshold(data.settings.dustThreshold);
//           if (data.settings.vibrationThreshold != null) setVibrationThreshold(data.settings.vibrationThreshold);
//         }
//       } catch (err) {
//         console.error("Error fetching settings:", err);
//         alert("Error fetching settings");
//       }
//     };
//     fetchSettings();
//   }, []);

//   const handleSave = async () => {
//     try {
//       const token = await getToken();
//       const res = await fetch("http://localhost:5000/api/sensors/settings", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({
//           dustThreshold: Number(dustThreshold),
//           vibrationThreshold: Number(vibrationThreshold),
//         }),
//       });
//       const data = await res.json();
//       if (data.success) alert("Settings saved successfully!");
//       else alert("Failed to save settings");
//     } catch (err) {
//       console.error("Error saving settings:", err);
//       alert("Error saving settings");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "0 16px",
//           background: "#ffffff", 
//         }}
//       >
//         <div
//           className="card shadow-sm p-4"
//           style={{ width: "100%", maxWidth: 420, borderRadius: 16 }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               marginBottom: 16,
//             }}
//           >
//             <FaSlidersH size={26} color="#1976d2" style={{ marginRight: 10 }} />
//             <h3 style={{ color: "#1976d2" }}>Settings</h3>
//           </div>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSave();
//             }}
//           >
//             <div className="mb-3">
//               <label className="form-label">Dust Threshold (µg/m³)</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 value={dustThreshold}
//                 onChange={(e) => setDustThreshold(e.target.value)}
//                 min="0"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="form-label">Vibration Threshold (V)</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 value={vibrationThreshold}
//                 onChange={(e) => setVibrationThreshold(e.target.value)}
//                 min="0"
//                 step="0.01"
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">
//               Save Settings
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaSlidersH } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "https://construction-hazard-backend.onrender.com";

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

export default function Settings() {
  const [dustThreshold, setDustThreshold] = useState(70);
  const [vibrationThreshold, setVibrationThreshold] = useState(1.0);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API}/api/sensors/settings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.settings) {
          if (data.settings.dustThreshold != null) setDustThreshold(data.settings.dustThreshold);
          if (data.settings.vibrationThreshold != null) setVibrationThreshold(data.settings.vibrationThreshold);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
        alert("Error fetching settings");
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API}/api/sensors/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          dustThreshold: Number(dustThreshold),
          vibrationThreshold: Number(vibrationThreshold),
        }),
      });
      const data = await res.json();
      if (data.success) alert("Settings saved successfully!");
      else alert("Failed to save settings");
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Error saving settings");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
          background: "#ffffff",
        }}
      >
        <div
          className="card shadow-sm p-4"
          style={{ width: "100%", maxWidth: 420, borderRadius: 16 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <FaSlidersH size={26} color="#1976d2" style={{ marginRight: 10 }} />
            <h3 style={{ color: "#1976d2" }}>Settings</h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Dust Threshold (µg/m³)</label>
              <input
                type="number"
                className="form-control"
                value={dustThreshold}
                onChange={(e) => setDustThreshold(e.target.value)}
                min="0"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Vibration Threshold (V)</label>
              <input
                type="number"
                className="form-control"
                value={vibrationThreshold}
                onChange={(e) => setVibrationThreshold(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
