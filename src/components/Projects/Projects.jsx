import React, { useState } from 'react';
import styles from './Projects.module.css';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'LimieRosie Website',
    description: 'A full-featured online store with cart functionality and payment processing.',
    imageUrl: 'https://picsum.photos/300/200?random=1',
    liveUrl: '#',
    codeUrl: '#',
    tech: ['React', 'Spring Boot', 'PostgreSQL']
  },
  {
    id: 2,
    title: 'Blog Website',
    description: 'A productivity app for organizing tasks with drag-and-drop functionality.',
    imageUrl: 'https://picsum.photos/300/200?random=2',
    liveUrl: '#',
    codeUrl: '#',
    tech: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 3,
    title: 'ATM System',
    description: 'The ATM system is built using a service-based architecture, focusing on user experience, security, transaction speed, and scalability for future integration with digital banking services.',
    imageUrl: 'https://picsum.photos/300/200?random=3',
    liveUrl: '#',
    codeUrl: 'https://github.com/kimhongpham/ATM-SYSTEM.git',
    tech: ['Java', 'Spring Boot', 'MySQL']
  },
  {
    id: 4,
    title: 'Banking App',
    description: 'The ATM system is built using a service-based architecture, focusing on user experience, security, transaction speed, and scalability for future integration with digital banking services.',
    imageUrl: 'https://picsum.photos/300/200?random=4',
    liveUrl: '#',
    codeUrl: '#',
    tech: ['React Native', 'Spring Boot', 'PostgreSQL']
  }
];

const allTechs = Array.from(
  new Set(projects.flatMap(project => project.tech))
);

const Projects = () => {
  const [selectedTech, setSelectedTech] = useState('All');

  const filteredProjects =
    selectedTech === 'All'
      ? projects
      : projects.filter(project => project.tech.includes(selectedTech));

  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.sectionTitle}>My Projects</h2>
      <div className={styles.filterBar}>
        <button
          className={selectedTech === 'All' ? styles.activeFilter : ''}
          onClick={() => setSelectedTech('All')}
        >
          All
        </button>
        {allTechs.map(tech => (
          <button
            key={tech}
            className={selectedTech === tech ? styles.activeFilter : ''}
            onClick={() => setSelectedTech(tech)}
          >
            {tech}
          </button>
        ))}
      </div>
      <div className={styles.projectsGrid}>
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;