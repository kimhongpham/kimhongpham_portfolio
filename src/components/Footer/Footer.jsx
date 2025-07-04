import React from 'react';
import styles from './Footer.module.css';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Contact Info</h3>
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.contactIcon} />
            <a href="mailto:rosiepham0107@gmail.com">
              rosiepham0107@gmail.com
            </a>
          </div>
          <div className={styles.contactItem}>
            <FaPhone className={styles.contactIcon} />
            <a href="tel:+84703920317">
              (+84) 703-920-317
            </a>
          </div>
          <div className={styles.contactItem}>
            <FaMapMarkerAlt className={styles.contactIcon} />
            <span>Ho Chi Minh City, Vietnam</span>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Follow Me</h3>
          <div className={styles.socialLinks}>
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
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {currentYear} Kim Hong Pham. All rights reserved.</p>
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