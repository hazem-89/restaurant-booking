import { Route, Routes } from 'react-router-dom';
import ConfirmationPage from './pages/Confirmation/ConfirmationPage';
import HomePage from './pages/HomePage/HomePage';
import Reservation from './pages/Reservation/Reservation';
import './App.css';
function App() {
  return (
    <Routes >
      <Route path="/" element={<HomePage />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      {/* <Route path="*" element={< />} /> */}
    </Routes>
  );
}

export default App;
