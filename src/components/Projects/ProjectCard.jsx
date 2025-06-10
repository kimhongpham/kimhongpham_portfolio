import React from 'react';
import styles from './Projects.module.css';

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.projectCard}>
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className={styles.projectImage}
      />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className={styles.projectLinks}>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">View Code</a>
      </div>
    </div>
  );
};

export default ProjectCard;