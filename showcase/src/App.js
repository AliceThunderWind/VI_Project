import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Country from './pages/Country';
import PageOne from './pages/Page1';
import PageTwo from './pages/Page2';
import About from './pages/About';

import Navbar from './components/Navbar';


function App() {
  return (
    <div className="app-container">
      <main className="page-content">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/country/:id" exact element={<Country />} />
          <Route path="/firstpage" exact element={<PageOne />} />
          <Route path="/secondpage" exact element={<PageTwo />} />
          <Route path="/about" exact element={<About />} />
        </Routes>
      </Router>
      </main>
    </div>
  );
}
export default App;