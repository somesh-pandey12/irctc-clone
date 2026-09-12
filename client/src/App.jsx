import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SearchTrains from './pages/SearchTrains';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600">IRCTC Clone Home 🚆</h1>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchTrains />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;