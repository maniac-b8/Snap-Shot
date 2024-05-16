import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomBar.css'; 

import carsIcon from '../../assets/cars-icon.png'; 
import natureIcon from '../../assets/nature-icon.png';
import uploadIcon from '../../assets/upload-icon.png';
import gamingIcon from '../../assets/gaming-icon.png';
import allPostsIcon from '../../assets/all-posts-icon.png';

export default function BottomBar({ onUpload }) {
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const isNaturePage = location.pathname === '/nature';

  const handleToggleModal = () => {
    onUpload(true);
  }

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollTop = currentScrollTop;
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('scroll', handleScroll);
    document.querySelector('.bottom-bar').addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      const bottomBar = document.querySelector('.bottom-bar');
      if (bottomBar) {
        bottomBar.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  return (
    <div className={`bottom-bar ${isNaturePage ? 'nature-bottombar' : ''} ${isHidden ? 'hidden' : ''}`}>
      <Link to="/cars" className="navigation-button">
        <img src={carsIcon} alt="Cars" />
      </Link>
      <Link to="/nature" className="navigation-button">
        <img src={natureIcon} alt="Nature" />
      </Link>
      <button onClick={handleToggleModal} className="upload-button">
        <img src={uploadIcon} alt="Upload Post" />
      </button>
      <Link to="/gaming" className="navigation-button">
        <img src={gamingIcon} alt="Gaming" />
      </Link>
      <Link to="/" className="navigation-button">
        <img src={allPostsIcon} alt="All Posts" />
      </Link>
    </div>
  );
}
