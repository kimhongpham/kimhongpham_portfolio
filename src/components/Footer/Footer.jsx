import React from 'react';
import styles from './Footer.module.css';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contactInfo}>
        <div className={styles.contactHeader}>
          <h3>Contact</h3>
        </div>
        <p>
          <FaEnvelope className={styles.contactIcon} />
          <a href="mailto:rosiepham0107@gmail.com">
            rosiepham0107@gmail.com
          </a>
        </p>
        <p>
          <FaPhone className={styles.contactIcon} />
          <a href="tel:+84703920317">
            (84+)703-920-317
          </a>
        </p>
      </div>
    </footer>
  );
};

export const SocialIcons = () => (
  <div className={styles.socialIcons}>
    <a href="https://github.com/kimhongpham" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <FaGithub />
    </a>
    <a href="https://www.linkedin.com/in/kimhongpham/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
      <FaLinkedin />
    </a>
    <a href="https://x.com/kimhongpham03" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
      <FaTwitter />
    </a>
  </div>
);

export default Footer;