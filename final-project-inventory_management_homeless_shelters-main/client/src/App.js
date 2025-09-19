import logo from './logo.svg';
import './App.css';
import AppRouter from './Routes';
import Navbar from "./containers/Admin/Navbar"; 
import { BrowserRouter as Router, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <ConditionalNavbar />
      <AppRouter />

    </div>
  );
}

function ConditionalNavbar() {
  const location = useLocation();

    const showNavbar = location.pathname.startsWith("/shelters") || location.pathname.startsWith("/inventory") || location.pathname.startsWith("/distributions") || location.pathname.startsWith("/make-distribution");

    return showNavbar ? <Navbar /> : null;
}


export default App;
