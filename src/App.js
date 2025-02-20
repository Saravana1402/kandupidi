import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import RegistrationForm from './Components/Registration/RegistrationForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router basename="/kandupidi">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<LoginForm />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;