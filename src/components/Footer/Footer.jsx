import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <a href="https://github.com/kimhongpham" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/kimhongpham/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://x.com/kimhongpham03" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
      <p>&copy; {new Date().getFullYear()} Kim Hong Pham. All rights reserved.</p>
    </footer>
  );
};

export default Footer;