
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Profile() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');

  useEffect(() => {
    
  }, []);

  const handleUpdate = () => {
    alert("Profile updated!");
    
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', backgroundColor: '#ffffff', padding: '16px' }} 
      >
        <div
          className="card shadow-sm p-4"
          style={{ width: '100%', maxWidth: '400px', borderRadius: '16px' }}
        >
          <h3 className="text-center mb-4 fw-bold" style={{ color: '#1976d2' }}>
            Profile
          </h3>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
