import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './register.css';
import '../../bace-style/css/bootstrap.css';
import axios from 'axios';


function Setnewpassword() {
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    errors: {},
    showModal: false,
    errorMessage: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // Password validation
    const errors = {};
    if (!validatePassword(state.password)) {
      errors.password = "رمز عبور باید حاوی حروف بزرگ و کوچک و اعدادو@#! باشد!";
    }

    if (state.password !== state.confirmPassword) {
      errors.confirmPassword = "رمز عبور و تکرار آن باید یکسان باشند!";
    }

    setState((prev) => ({ ...prev, errors }));

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/auth/reset_password_complate/${uidb64}/${token}/`,
          {
            uidb64,
            token,
            password: state.password,
          }
        );

        setSuccessMessage("Password successfully changed");
        console.log(response.data);

        navigate("/login");
      } catch (error) {
        console.error("Error changing password:", error.response.data.error);
        setState((prev) => ({
          ...prev,
          errorMessage: "Password change failed. Please try again.",
        }));
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@#!]+$/;
    return regex.test(password);
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="container">
                  <a href="index.html" className="logo d-flex align-items-center w-auto">
                    <img src="assets/img/logo.png" alt="" />
                    <h1 style={{ color: "#000103" }}>
                      <span className=" d-lg-block">فروشگاه دوچرخه اسپید </span>
                    </h1>
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 style={{ color: "#ffff00" }} className="card-title text-center pb-0 fs-4">
                        بازیابی رمز عبور{" "}
                      </h5>
                    </div>

                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                      <div className="col-12">
                        <label style={{ color: "#ffff00" }} htmlFor="yourPassword" className="form-label">
                          رمز عبور جدید را وارد کنید
                        </label>
                        <input
                          type="password"
                          name="password"
                          className={`form-control ${state.errors.password ? "is-invalid" : ""}`}
                          id="yourPassword"
                          required
                          value={state.password}
                          onChange={handleInputChange}
                        />
                        <div style={{ color: "#f80606" }} className="invalid-feedback">
                          {state.errors.password}
                        </div>
                      </div>

                      <div className="col-12">
                        <label style={{ color: "#ffff00" }} htmlFor="confirmPassword" className="form-label">
                          تکرار رمز عبور
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className={`form-control ${state.errors.confirmPassword ? "is-invalid" : ""}`}
                          id="confirmPassword"
                          required
                          value={state.confirmPassword}
                          onChange={handleInputChange}
                        />
                        <div style={{ color: "#f80606" }} className="invalid-feedback">
                          {state.errors.confirmPassword}
                        </div>
                      </div>

                      <div className="col-12">
                        <button style={{ color: "#ffff00" }} className="btn btn-primary w-100" type="submit" disabled={loading}>
                          {loading ? "Loading..." : "ثبت رمز عبور جدید"}
                        </button>
                      </div>
                    </form>

                    {successMessage && (
                      <div className="mt-3 alert alert-success" role="alert">
                        {successMessage}
                      </div>
                    )}

                    {state.errorMessage && (
                      <div className="mt-3 alert alert-danger" role="alert">
                        {state.errorMessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Setnewpassword;
