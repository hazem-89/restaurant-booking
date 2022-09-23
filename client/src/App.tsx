import { Route, Routes } from 'react-router-dom';
import ConfirmationPage from './pages/Confirmation/ConfirmationPage';
import HomePage from './pages/HomePage/HomePage';
import Reservation from './pages/Reservation/Reservation';
import ContactPage from './pages/ContactPage/Contact';
import './App.css';
import AminPage from './pages/AminPage/AminPage';
function App() {
  return (
    <Routes >
      <Route path="/" element={<HomePage />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/admin" element={<AminPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* <Route path="*" element={< />} /> */}
    </Routes>
  );
}

export default App;
