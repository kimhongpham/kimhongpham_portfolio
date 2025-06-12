import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Home.module.css';
// import Header from '../components/Header/Header'; // Bỏ dòng này
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Education from '../components/Education/Education';
import ContactFab from '../components/ContactForm/ContactFab';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const heroRef = useRef();
  const projectsRef = useRef();
  const educationRef = useRef();
  const contactRef = useRef();

  useEffect(() => {
    const sections = [
      { id: 'hero', ref: heroRef },
      { id: 'projects', ref: projectsRef },
      { id: 'education', ref: educationRef },
      { id: 'contact', ref: contactRef },
    ];

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach(section => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.home}>
      {/* <Header activeSection={activeSection} /> */} {/* Bỏ dòng này */}
      <main>
        <motion.section
          id="hero"
          ref={heroRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Hero />
        </motion.section>
        <motion.section
          id="projects"
          ref={projectsRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Projects />
        </motion.section>
        <motion.section
          id="education"
          ref={educationRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Education />
        </motion.section>
      </main>
      <ContactFab />
      <Footer />
    </div>
  );
};

export default Home;