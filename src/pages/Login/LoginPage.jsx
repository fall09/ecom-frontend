import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const isSuccess = await login(formData.email, formData.password);

      if (isSuccess === true) {
        alert("Login başarılı");
        navigate("/register");
      } else {
        setErrorMessage("Email veya şifre yanlış");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Login başarısız");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="src/assets/shopping.png" alt="Shopping" className="login-icon" />

        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please sign in to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {errorMessage && <p className="error-text">{errorMessage}</p>}

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="login-footer">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;