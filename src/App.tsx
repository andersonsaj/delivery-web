import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes />
      <ToastContainer />
    </Router>
  );
};

export default App;
