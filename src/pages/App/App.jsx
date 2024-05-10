import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import PostsPage from '../PostsPage/PostsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../Home/HomePage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/Posts" element={<PostsPage />} />
              <Route path="/Profile" element={<ProfilePage />} />
              {/* Catch all */}
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
