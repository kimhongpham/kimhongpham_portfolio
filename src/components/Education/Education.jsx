import React from 'react';
import styles from './Education.module.css';

const education = [
  {
    title: 'Bachelor of Software Engineering',
    place: 'University of Economics Ho Chi Minh City (UEH)',
    year: '2022 - 2026',
  },
  {
    title: 'Full Stack Web Development Bootcamp',
    place: 'Udemy',
    year: '2021',
  },
];

const awards = [
  {
    name: 'Top 10 Student Research Award',
    org: 'HUST',
    year: '2021',
  },
  {
    name: 'Google DSC Hackathon - 2nd Prize',
    org: 'Google Developer Student Clubs',
    year: '2022',
  },
];

const Skills = () => {
  return (
    <section id="education" className={styles.skills}>
      <h2 className={styles.sectionTitle}>Education</h2>
      <ul className={styles.skillsList}>
        {education.map((edu, idx) => (
          <li key={idx} className={styles.skillItem}>
            <strong>{edu.title}</strong><br />
            <span>{edu.place}</span><br />
            <span>{edu.year}</span>
          </li>
        ))}
      </ul>
      <h2 className={styles.sectionTitle}>Awards</h2>
      <ul className={styles.skillsList}>
        {awards.map((award, idx) => (
          <li key={idx} className={styles.skillItem}>
            <strong>{award.name}</strong><br />
            <span>{award.org}</span><br />
            <span>{award.year}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;