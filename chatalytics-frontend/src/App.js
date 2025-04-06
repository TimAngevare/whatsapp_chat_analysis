import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import GetStarted from './Pages/GetStarted';

function App() {
  return (
    <div className="App">
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-777TP55Y5G"></script>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/contact/" element={<Contact />} />
        <Route path="/get-started/" element={<GetStarted />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
