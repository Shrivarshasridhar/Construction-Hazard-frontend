import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaProjectDiagram, FaCogs, FaTools, FaShieldAlt } from "react-icons/fa";


import img1 from "../assets/construction-worker.jpeg";
import img2 from "../assets/construction1.jpg";
import img3 from "../assets/construction3.jpeg";

export default function About() {
  const images = [img1, img2, img3];
  const [currentImage, setCurrentImage] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fff",
          padding: "80px 20px",
          color: "#333",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Hero Section */}
          <section
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 80,
              gap: 20,
            }}
          >
            {/* Text */}
            <div style={{ flex: "1 1 400px", minWidth: 250 }}>
              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "#1F3C88",
                  marginBottom: 20,
                }}
              >
                Hazard Detection & Alert System for Construction Sites
              </h1>
              <p style={{ fontSize: "1.2rem", color: "#555", lineHeight: 1.6 }}>
                Real-time hazard detection and alert system using IoT sensors for dust, vibration. Keep your construction sites safe and compliant with instant notifications.
              </p>
            </div>

            {/* Image Slider */}
            <div
              style={{
                flex: "1 1 400px",
                minWidth: 250,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={images[currentImage]}
                alt="Construction Safety"
                style={{
                  borderRadius: 16,
                  width: "100%",          
                  maxWidth: "450px",      
                  height: "300px",        
                  objectFit: "cover",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  transition: "opacity 0.5s ease-in-out",
                }}
              />
            </div>
          </section>

          {/* Features Section */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 30,
              marginBottom: 80,
            }}
          >
            <div
              style={{
                background: "#f5f5f5",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "0.3s",
                textAlign: "center",
              }}
            >
              <FaProjectDiagram size={40} color="#1976d2" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: "1.4rem", marginBottom: 12 }}>Project Overview</h3>
              <p style={{ color: "#555", lineHeight: 1.6 }}>
                IoT-based embedded system monitoring construction hazards in real-time. Sends alerts when thresholds exceed safe levels for dust, vibration.
              </p>
            </div>

            <div
              style={{
                background: "#f5f5f5",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "0.3s",
                textAlign: "center",
              }}
            >
              <FaCogs size={40} color="#1976d2" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: "1.4rem", marginBottom: 12 }}>How It Works</h3>
              <p style={{ color: "#555", lineHeight: 1.6 }}>
                 sensors send data via MQTT to the cloud platform.  Generate instant notifications to supervisors, ensuring proactive hazard management.
              </p>
            </div>

            <div
              style={{
                background: "#f5f5f5",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "0.3s",
                textAlign: "center",
              }}
            >
              <FaTools size={40} color="#1976d2" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: "1.4rem", marginBottom: 12 }}>Technologies</h3>
              <p style={{ color: "#555", lineHeight: 1.6 }}>
                React, Node.js, Express, MongoDB, MQTT protocol, cloud analytics, and embedded sensors for dust, vibration.
              </p>
            </div>

            <div
              style={{
                background: "#f5f5f5",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "0.3s",
                textAlign: "center",
              }}
            >
              <FaShieldAlt size={40} color="#1976d2" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: "1.4rem", marginBottom: 12 }}>Safety Focus</h3>
              <p style={{ color: "#555", lineHeight: 1.6 }}>
                Prioritizes worker safety with continuous monitoring and actionable alerts to minimize risks and ensure compliance with construction safety standards.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer
  style={{
    textAlign: "center",
    padding: "1rem 0",
    backgroundColor: "#1F3C88",
    color: "#fff",
    marginTop: "2rem",
    fontSize: "0.85rem",
  }}
>
  &copy; {new Date().getFullYear()} Hazard Monitor. All rights reserved.
</footer>

        </div>
      </div>
    </>
  );
}
