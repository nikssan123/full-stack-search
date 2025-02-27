import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:id" element={<Details type="hotels" />} />
        <Route path="/countries/:id" element={<Details type="countries" />} />
        <Route path="/cities/:id" element={<Details type="cities" />} />
      </Routes>
    </Router>
  );
}

export default App;


