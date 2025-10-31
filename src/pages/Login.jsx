
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginUser } from "../services/api"; 


import site1 from "../assets/construction1.jpg";
import site2 from "../assets/construction-worker.jpeg";
import site3 from "../assets/construction3.jpeg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const images = [site1, site2, site3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser({ email, password }); 

      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Login failed. Try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderRadius: 10,
    padding: "0.7rem",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    color: "#333",
  };

  const labelStyle = { color: "#555", marginBottom: "0.3rem", display: "block", fontSize: "0.95rem" };

  return (
    <div style={{ minHeight: "100vh", background: "#e8f0f7" }}>
      <Navbar />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", overflow: "hidden" }}>
        {/* Left Section - Image Slideshow */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden", height: "80vh", maxWidth: "50%", borderRadius: "16px", boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Construction site"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 1s ease-in-out",
                opacity: currentImage === index ? 1 : 0,
                filter: "brightness(85%)",
                borderRadius: "16px",
              }}
            />
          ))}
        </div>

        {/* Right Section - Login Card */}
        <div style={{ width: "100%", maxWidth: "400px", background: "#ffffff", borderRadius: 16, border: "none", color: "#333", marginLeft: "3%", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", padding: "2rem" }}>
          <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#1F3C88", fontWeight: 700, letterSpacing: "0.5px" }}>
            Login
          </h3>
          <p style={{ textAlign: "center", color: "#555", fontSize: "0.95rem" }}>Login to continue monitoring construction site safety.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label style={labelStyle}>Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" placeholder="Enter your email" style={inputStyle} />
            </div>

            <div className="mb-4">
              <label style={labelStyle}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control" placeholder="Enter your password" style={inputStyle} />
            </div>

            <button
              type="submit"
              className="btn w-100"
              disabled={loading}
              style={{
                borderRadius: 10,
                fontWeight: 600,
                background: "linear-gradient(90deg, #1F3C88, #1976d2)",
                border: "none",
                color: "#fff",
                padding: "0.8rem",
                letterSpacing: "0.5px",
                transition: "0.3s ease-in-out",
                boxShadow: "0 0 12px rgba(31,60,136,0.3)",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <small style={{ color: "#555" }}>
              Don’t have an account?{" "}
              <Link to="/register" style={{ color: "#1976d2", fontWeight: 600, textDecoration: "none" }}>
                Register here
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
