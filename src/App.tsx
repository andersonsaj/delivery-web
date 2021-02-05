import './App.css';
import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <Navbar/>
      <Home />
    </Router>
  );
}

export default App;
