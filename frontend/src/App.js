import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './state/AuthContext';

function App() {
  const { user } = useContext(AuthContext); // Global Auth, this can be obtained from anywhere ユーザー情報をどこから、どのページでも取得できる
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/profile/:username" element={<Profile />} />
        {/* /profile/:username is :username anything OK // :username　は任意の文字列 */}
      </Routes>
    </Router>
  );
}

export default App;
