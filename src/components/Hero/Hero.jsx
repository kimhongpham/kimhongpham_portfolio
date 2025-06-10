import React from 'react';
import styles from './Hero.module.css';
import profileImage from '../../assets/images/profile.jpg';

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroContent}>
        <img 
          src={profileImage}
          alt="Kim Hong Pham - Full Stack Developer" 
          className={styles.avatar}
        />
        <h1>Kim Hong Pham</h1>
        <h2>Full Stack Developer</h2>
        <p>
          "I develop scalable, responsive full-stack applications, combining sleek user interfaces with powerful backend logic and efficient database design."
        </p>
      </div>
    </section>
  );
};

export default Hero;