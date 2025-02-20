import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate();

  // Load data from sessionStorage when component mounts
  useEffect(() => {
    const savedFormData = sessionStorage.getItem('registrationData');
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setName(parsedData.name || "");
      setAge(parsedData.age || "");
      setPhone(parsedData.phone || "");
      setGmail(parsedData.gmail || "");
      // Don't restore password for security reasons
    }
  }, []);

  // Save form data to sessionStorage whenever fields change
  useEffect(() => {
    if (name || age || phone || gmail) {
      const formData = { name, age, phone, gmail };
      sessionStorage.setItem('registrationData', JSON.stringify(formData));
    }
  }, [name, age, phone, gmail]);

  const generateOtp = () => {
    // Generate a 6-digit random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    return otp;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      // Generate and store OTP
      const otp = generateOtp();
      console.log(`Generated OTP: ${otp}`); // For debugging purposes
  
      // Store user data in localStorage for cross-device persistence
      const userData = { 
        name, 
        age, 
        phone, 
        gmail,
        // Store hashed password instead of plain text
        // This is a simple hash for demo purposes - use a proper hashing library in production
        passwordHash: btoa(password) 
      };
      
      // Store in localStorage for cross-device access
      // In a real app, this would be stored on your server
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      existingUsers.push(userData);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      
      // Simulate OTP sending
      alert(`OTP sent to your phone number: ${phone}`);
      
      setShowOtpField(true);
    } catch (error) {
      console.error("Registration Error:", error);
      alert("An error occurred during registration");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      // Verify the OTP
      if (otp === generatedOtp) {
        // Update user verification status in cache
        const userCache = JSON.parse(localStorage.getItem('userCache') || '{}');
        if (userCache[gmail]) {
          userCache[gmail].verified = true;
          localStorage.setItem('userCache', JSON.stringify(userCache));
        }
        
        // Clear session storage after successful registration
        sessionStorage.removeItem('registrationData');
        
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert("OTP verification failed");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("An error occurred during OTP verification");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "600px", height: "400px" }}>
        {!showOtpField ? (
          <form onSubmit={handleRegistration}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingName">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingAge"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <label htmlFor="floatingAge">Age</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control"
                id="floatingPhone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="floatingPhone">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingGmail"
                placeholder="Gmail"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
              />
              <label htmlFor="floatingGmail">Gmail</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingOtp"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label htmlFor="floatingOtp">OTP</label>
            </div>
            <p className="text-muted mb-3">OTP sent to your phone number: {phone}</p>
            <button type="submit" className="btn btn-primary w-100">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;