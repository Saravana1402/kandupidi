import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import RegistrationForm from './Components/Registration/RegistrationForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/kandupidi/login" element={<LoginForm />} />
        <Route path="/kandupidi/register" element={<RegistrationForm />} />
        <Route path="/kandupidi/" element={<LoginForm />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};


export default App;
