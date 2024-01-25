import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Forget from './components/auth/Forget';
import Setnewpassword from './components/auth/Setnewpassword';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/Setnewpassword/:uidb64/:token" element={<Setnewpassword />} />


          <Route path="/forget" element={<Forget />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          {/* Include PasswordResetLink within a Route */}
          

        </Routes>
      </Router>
    );
  }
}

export default App;
