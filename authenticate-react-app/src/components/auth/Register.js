import React, { Component } from "react";
import './register.css'
import '../../bace-style/css/bootstrap.css'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      agreeTerms: false,
      errors: {},
      errorMessage: "",
      showModal: false,
      registrationSuccessful: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === "checkbox" ? checked : value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (!this.validateName(this.state.name)) {
      errors.name = "نام باید حاوی حروف فارسی باشد!";
    }

    if (!this.validateEmail(this.state.email)) {
      errors.email = "لطفاً یک ایمیل معتبر وارد کنید!";
    }

    if (!this.validateNationalCode(this.state.username)) {
      errors.username = "لطفاً یک شماره موبایل 11 رقمی که با 09 شروع شود وارد کنید!";
    }

    if (!this.validatePassword(this.state.password)) {
      errors.password = "رمز عبور باید حاوی حروف بزرگ و کوچک و اعدادو@#! باشد!";
    }

    if (!this.state.agreeTerms) {
      errors.agreeTerms = "شما باید با شرایط و قوانین موافقت کنید!";
    }

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/register/', {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.username,
          password: this.state.password,
        }, {
          withCredentials: true,
        });

        console.log('موفقیت در ثبت نام:', response.data.message);
        this.setState({ registrationSuccessful: true });

      } catch (error) {
        this.setState({ errorMessage: error.response.data.error, showModal: true });

        console.error('خطا در ثبت نام:', error.response.data.error);
      }
    }
  };

  validateName = (name) => {
    const regex = /^[a-zA-Zء-ي\s]+$/;
    return regex.test(name);
  };
  
  validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  validateNationalCode = (phone) => {
    const regex = /^(\+98|0)?9\d{9}$/;
    return regex.test(phone);
  };

  validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@#!]+$/;
    return regex.test(password);
  };

  handleClose = () => this.setState({ showModal: false });

  render() {
    const { errors, errorMessage } = this.state;

    return (
      <div>
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
                          <h5 style={{ color: '#ffff00' }} className="card-title text-center pb-0 fs-4"> ثبت نام </h5>
                          <p style={{ color: '#ffff00' }} className="text-center small">اطلاعات خود را وارد کنید </p>
                        </div>
                        <form className="row g-3 needs-validation" noValidate onSubmit={this.handleSubmit}>
                          <div className="col-12">
                            <label style={{ color: '#ffff00' }} htmlFor="yourName" className="form-label">نام خود را وارد کنید </label>
                            <input
                              type="text"
                              name="name"
                              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                              id="yourName"
                              required
                              value={this.state.name}
                              onChange={this.handleInputChange}
                            />
                            <div style={{ color: '#f80606' }} className="invalid-feedback">{errors.name}</div>
                          </div>
                          <div className="col-12">
                            <label style={{ color: '#ffff00' }} htmlFor="yourEmail" className="form-label">ایمیل خود را وارد کنید </label>
                            <input
                              type="email"
                              name="email"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              id="yourEmail"
                              required
                              value={this.state.email}
                              onChange={this.handleInputChange}
                            />
                            <div style={{ color: '#f80606' }} className="invalid-feedback">{errors.email}</div>
                          </div>
                          <div className="col-12">
                            <label style={{ color: '#ffff00' }} htmlFor="yourUsername" className="form-label">شماره موبایل خود را وارد کنید </label>
                            <div className="input-group has-validation">
                              <input
                                type="text"
                                name="username"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                id="yourUsername"
                                required
                                value={this.state.username}
                                onChange={this.handleInputChange}
                              />
                              <div style={{ color: '#f80606' }} className="invalid-feedback">{errors.username}</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <label style={{ color: '#ffff00' }} htmlFor="yourPassword" className="form-label">رمز عبور خود را وارد کنید </label>
                            <input
                              type="password"
                              name="password"
                              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                              id="yourPassword"
                              required
                              value={this.state.password}
                              onChange={this.handleInputChange}
                            />
                            <div style={{ color: '#f80606' }} className="invalid-feedback">{errors.password}</div>
                          </div>
                          <div className="col-12">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                name="agreeTerms"
                                type="checkbox"
                                id="acceptTerms"
                                required
                                checked={this.state.agreeTerms}
                                onChange={this.handleInputChange}
                              />
                              <label style={{ color: '#ffff00', textAlign: 'right' }} className="form-check-label" htmlFor="acceptTerms">با تمامی شرایط موافقم <a href="#">شرایط و قوانین</a></label>
                              <div style={{ color: '#f80606' }} className="invalid-feedback">{errors.agreeTerms}</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <button style={{ color: '#ffff00' }} className="btn btn-primary w-100" type="submit">ثبت نام </button>
                          </div>
                          <div className="col-12">
                            <p style={{ color: '#ffff00' }} className="small mb-0">
                              اگر حساب کاربری فعال دارید؟{' '}
                            <Link to="/login" style={{ color: '#084298' }}>وارد شوید</Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Modal  className="card-body" show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header style={{ backgroundColor: '#febf03' }} closeButton>
          <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '2rem', color: '#f80606' }}>خطا!</h1>
          </Modal.Body>


          </Modal.Header >
          <Modal.Body className="text-center" style={{ backgroundColor: '#04cbee' }}>{"ایمیل یا شماره  موبایل تکراری است یا این که کاربر دیگری با این مشخصات وجود دارد ."}</Modal.Body>
          <Modal.Footer  style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#febf03' }}>
              <Button style={{ backgroundColor: '#0a58ca' }} variant="secondary" onClick={this.handleClose}>
                متوجه شدم 
              </Button>
          </Modal.Footer>

        </Modal>

        <Modal  className="card-body" show={this.state.registrationSuccessful} onHide={this.handleClose}>
          <Modal.Header style={{ backgroundColor: '#dee2e680' }} closeButton>
          <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '2rem', color: '#06f83bbf' }}>ثبت نام موفق</h1>
          </Modal.Body>


          </Modal.Header >
          <Modal.Body className="text-center" style={{ backgroundColor: '#dee2e680' }}>{"تبریک میگم شما با موفقیت ثبت نام شدید ."}</Modal.Body>
          <Modal.Footer  style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#dee2e680' }}>
              <Button style={{ backgroundColor: '#0a58ca' }} variant="secondary" onClick={this.handleClose}>
                وارد حساب کاربری خود شوید 
              </Button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}

export default Register;
