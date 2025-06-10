import React, { useState } from 'react';
import styles from './Header.module.css';

const navItems = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const Header = ({ activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
        <ul className={`${styles.navList} ${menuOpen ? styles.open : ''}`}>
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href={item.href}
                className={activeSection === item.id ? styles.active : ''}
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;