import React, { useEffect, useState } from 'react';

const GalaxyBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const earthScale = Math.min(1 + scrollY * 0.003, 5);
  const earthTranslateZ = Math.min(scrollY * 2, 800);

  // Generate stars
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 1000; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        depth: Math.random() * 1000
      });
    }
    return stars;
  };

  const stars = generateStars();

  const planets = [
    { name: 'mercury', size: 8, distance: 120, color: '#8c7853', speed: 0.02 },
    { name: 'venus', size: 14, distance: 160, color: '#ffc649', speed: 0.015 },
    { name: 'earth', size: 16, distance: 200, color: '#6b93d6', speed: 0.01 },
    { name: 'mars', size: 12, distance: 240, color: '#c1440e', speed: 0.008 },
    { name: 'jupiter', size: 35, distance: 320, color: '#d8ca9d', speed: 0.005 },
    { name: 'saturn', size: 30, distance: 380, color: '#fab27b', speed: 0.003 },
    { name: 'uranus', size: 20, distance: 440, color: '#4fd0e7', speed: 0.002 },
    { name: 'neptune', size: 18, distance: 480, color: '#4b70dd', speed: 0.001 }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <div
        className="min-h-[300vh] pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="fixed inset-0 overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 40%, #0f0f23 70%, #000 100%)`,
            perspective: '1000px',
            zIndex: 0
          }}
        >
          {/* Stars */}
          <div className="absolute inset-0">
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  transform: `translateZ(${star.depth - scrollY}px)`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          {/* Sun */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(-50%, -50%) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`
            }}
          >
            <div
              className="relative rounded-full animate-spin"
              style={{
                width: '80px',
                height: '80px',
                background: `radial-gradient(circle at 30% 30%, #ffeb3b, #ff9800, #ff5722)`,
                boxShadow: `
                0 0 50px #ff9800,
                0 0 100px #ff5722,
                0 0 150px rgba(255, 152, 0, 0.3),
                inset -10px -10px 20px rgba(255, 87, 34, 0.3)
              `,
                animationDuration: '20s'
              }}
            >
              {/* Sun corona */}
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background: `radial-gradient(circle, transparent 40%, rgba(255, 152, 0, 0.1) 60%, transparent 80%)`,
                  width: '200px',
                  height: '200px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '4s'
                }}
              />
            </div>

            {/* Planets */}
            {planets.map((planet, index) => {
              const angle = Date.now() * planet.speed + index * 45;
              const isEarth = planet.name === 'earth';

              return (
                <div key={planet.name}>
                  {/* Orbit ring */}
                  <div
                    className="absolute top-1/2 left-1/2 border border-gray-700 rounded-full opacity-20"
                    style={{
                      width: `${planet.distance * 2}px`,
                      height: `${planet.distance * 2}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />

                  {/* Planet */}
                  <div
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `
                      translate(-50%, -50%) 
                      rotateZ(${angle}deg) 
                      translateX(${planet.distance}px) 
                      rotateZ(-${angle}deg)
                      ${isEarth ? `scale(${earthScale}) translateZ(${earthTranslateZ}px)` : ''}
                    `,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div
                      className="rounded-full relative animate-spin"
                      style={{
                        width: `${planet.size}px`,
                        height: `${planet.size}px`,
                        background: isEarth
                          ? `radial-gradient(circle at 30% 30%, #4fc3f7, #2196f3, #1976d2)`
                          : `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}dd)`,
                        boxShadow: isEarth
                          ? `0 0 20px rgba(79, 195, 247, 0.6), inset -5px -5px 10px rgba(25, 118, 210, 0.3)`
                          : `0 0 10px ${planet.color}44, inset -3px -3px 6px rgba(0,0,0,0.3)`,
                        animationDuration: '10s'
                      }}
                    >
                      {/* Earth details */}
                      {isEarth && (
                        <>
                          {/* Continents */}
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `
                              radial-gradient(circle at 40% 30%, transparent 20%, #2e7d32 25%, transparent 35%),
                              radial-gradient(circle at 60% 60%, transparent 15%, #2e7d32 20%, transparent 30%),
                              radial-gradient(circle at 20% 70%, transparent 10%, #2e7d32 15%, transparent 25%)
                            `
                            }}
                          />

                          {/* Atmosphere glow */}
                          <div
                            className="absolute inset-0 rounded-full animate-pulse"
                            style={{
                              background: `radial-gradient(circle, transparent 70%, rgba(135, 206, 250, 0.4) 80%, transparent 90%)`,
                              width: '120%',
                              height: '120%',
                              top: '-10%',
                              left: '-10%',
                              animationDuration: '3s'
                            }}
                          />

                          {/* Moon */}
                          <div
                            className="absolute top-1/2 left-1/2"
                            style={{
                              transform: `
                              translate(-50%, -50%) 
                              rotateZ(${angle * 12}deg) 
                              translateX(${planet.size + 15}px) 
                              rotateZ(-${angle * 12}deg)
                            `
                            }}
                          >
                            <div
                              className="rounded-full"
                              style={{
                                width: '6px',
                                height: '6px',
                                background: '#c0c0c0',
                                boxShadow: '0 0 5px rgba(192, 192, 192, 0.5)'
                              }}
                            />
                          </div>
                        </>
                      )}

                      {/* Saturn rings */}
                      {planet.name === 'saturn' && (
                        <>
                          <div
                            className="absolute top-1/2 left-1/2 border-2 border-yellow-600 rounded-full opacity-60"
                            style={{
                              width: '50px',
                              height: '8px',
                              transform: 'translate(-50%, -50%) rotateX(75deg)',
                              borderWidth: '1px'
                            }}
                          />
                          <div
                            className="absolute top-1/2 left-1/2 border border-yellow-700 rounded-full opacity-40"
                            style={{
                              width: '45px',
                              height: '7px',
                              transform: 'translate(-50%, -50%) rotateX(75deg)'
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Asteroid belt */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {Array.from({ length: 50 }, (_, i) => {
              const angle = (i / 50) * 360 + Date.now() * 0.001;
              const distance = 280 + Math.random() * 20;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `
                    translate(-50%, -50%) 
                    rotateZ(${angle}deg) 
                    translateX(${distance}px) 
                    rotateZ(-${angle}deg)
                  `
                  }}
                >
                  <div
                    className="rounded-full bg-gray-600"
                    style={{
                      width: `${1 + Math.random() * 2}px`,
                      height: `${1 + Math.random() * 2}px`,
                      opacity: 0.6
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalaxyBackground;