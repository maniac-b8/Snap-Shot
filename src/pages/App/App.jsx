import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import PostsPage from '../PostsPage/PostsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../Home/HomePage';
import CarsPage from '../CarsPage/CarsPage';
import NaturePage from '../NaturePage/NaturePage'
import GamingPage from '../GamingPage/GamingPage'

export default function App() {
  const [user, setUser] = useState(getUser());

    return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        {/* Allow visitors these pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />

        {/* Protected routes for logged in users */}
        {user && (
          <>
            <Route path="/posts" element={<PostsPage currentUser={user} />} />
            <Route path="/profile" element={<ProfilePage currentUser={user} />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/nature" element={<NaturePage />} />
            <Route path="/gaming" element={<GamingPage />} />
          </>
        )}

        {/* Catch all*/}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}