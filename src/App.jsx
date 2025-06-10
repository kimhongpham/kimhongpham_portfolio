import React from 'react';
import styles from './App.module.css';
import Home from './pages/Home';
import { SocialIcons } from './components/Footer/Footer';

function App() {
  return (
    <div className={styles.app}>
      <Home />
      <SocialIcons />
    </div>
  );
}

export default App;