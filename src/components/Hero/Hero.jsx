import React from 'react';
import styles from './Hero.module.css';
import profileImage from '../../assets/images/profile.jpg';
import { SocialIcons } from '../Footer/Footer';

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <a
        href="https://www.linkedin.com/in/kimhongpham/"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={0}
        aria-label="Visit my LinkedIn profile"
      >
        <img
          src={profileImage}
          alt="Kim Hong Pham - FullStack Software Engineer"
          className={styles.avatar}
        />
      </a>
      <div className={styles.heroContent}>
        <h1>Hi,</h1>
        <h2>I'm Kim Hong Pham</h2>
        <p>
          "I develop scalable, responsive full-stack applications, combining sleek user interfaces with powerful backend logic and efficient database design."
        </p>
        <SocialIcons />
      </div>
    </section>
  );
};

export default Hero;