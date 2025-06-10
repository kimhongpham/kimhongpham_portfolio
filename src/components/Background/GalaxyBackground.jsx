import React, { useEffect, useState } from 'react';
import styles from './GalaxyBackground.module.css';

const GalaxyBackground = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    // Generate static stars
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 800; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 3,
          color: getStarColor()
        });
      }
      setStars(starArray);
    };

    // Generate shooting stars
    const generateShootingStars = () => {
      const shootingArray = [];
      for (let i = 0; i < 8; i++) {
        shootingArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          angle: Math.random() * 360,
          speed: Math.random() * 2 + 1,
          delay: Math.random() * 10
        });
      }
      setShootingStars(shootingArray);
    };

    generateStars();
    generateShootingStars();
  }, []);

  const getStarColor = () => {
    const colors = ['#ffffff', '#fffacd', '#e6e6fa', '#add8e6', '#ffd1dc', '#98fb98'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="galaxy-container">
      {/* Nebula layers */}
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      <div className="nebula nebula-3"></div>
      
      {/* Milky Way core */}
      <div className="milky-way"></div>
      
      {/* Static stars */}
      <div className="stars-layer">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.opacity,
              animationDelay: `${star.twinkleDelay}s`
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className="shooting-stars-layer">
        {shootingStars.map((shootingStar) => (
          <div
            key={shootingStar.id}
            className="shooting-star"
            style={{
              left: `${shootingStar.x}%`,
              top: `${shootingStar.y}%`,
              transform: `rotate(${shootingStar.angle}deg)`,
              animationDelay: `${shootingStar.delay}s`,
              animationDuration: `${shootingStar.speed}s`
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="particles">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          />
        ))}
      </div>

      {/* Portfolio content overlay */}
      <div className="content-overlay">
        <div className="portfolio-content">
          <h1 className="title">
            <span className="glitch-text">Portfolio</span>
          </h1>
          <p className="subtitle">Exploring the Digital Universe</p>
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalaxyBackground;