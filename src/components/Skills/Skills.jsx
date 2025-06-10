import React from 'react';
import styles from './Skills.module.css';

const skills = [
  'JavaScript', 'React', 'Redux', 'Responsive Design',
  'Node.js', 'Express', 'Java', 'Spring Boot', 'Python', 'Django',
  'MongoDB', 'MySQL', 'PostgreSQL',
  'Docker', 'RESTful APIs'
];

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <h2 className={styles.sectionTitle}>My Skills</h2>
      <ul className={styles.skillsList}>
        {skills.map((skill, idx) => (
          <li key={idx} className={styles.skillItem}>
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;