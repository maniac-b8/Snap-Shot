import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import './AuthPage.css'

export default function AuthPage({ setUser }) {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLoginSuccess = () => {
    navigate("/posts");
  };

  return (
    <main className="mainlogin">
      
      <button onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp ? "Log In" : "Sign Up"}
      </button>
      {showSignUp ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} onLoginSuccess={handleLoginSuccess} />
      )}
    </main>
  );
}
