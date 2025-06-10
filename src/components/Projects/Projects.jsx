import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
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

const PAGE_SIZE = 6; // Số lượng project mỗi lần load

const Projects = () => {
  const [selectedTech, setSelectedTech] = useState('All');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loaderRef = useRef();

  // Debounce search input
  React.useEffect(() => {
    const handler = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Lọc dự án theo từ khóa
  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.title.toLowerCase().includes(debounced.toLowerCase()) ||
          p.description.toLowerCase().includes(debounced.toLowerCase())
      ),
    [debounced, projects]
  );

  const displayedProjects =
    selectedTech === 'All'
      ? filteredProjects
      : filteredProjects.filter(project => project.tech.includes(selectedTech));

  // Infinite scroll: tăng số lượng hiển thị khi chạm đáy
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, projects.length));
    }
  }, [projects.length]);

  useEffect(() => {
    const option = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

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
      {/* <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}
      <div className={styles.projectsGrid}>
        {displayedProjects.slice(0, visibleCount).map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {visibleCount < projects.length && (
        <div ref={loaderRef} style={{ height: 40 }} />
      )}
    </section>
  );
};

export default Projects;