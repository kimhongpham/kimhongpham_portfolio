import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import styles from './Projects.module.css';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'LimieRosie Website',
    description: 'An e-commerce website for fashion products featuring a user-friendly shopping experience with cart management, order tracking, and payment integration.',
    imageUrl: 'https://picsum.photos/300/200?random=1',
    liveUrl: '#',
    codeUrl: '#',
    tech: ['React', 'Spring Boot', 'PostgreSQL']
  },
  {
    id: 2,
    title: 'Blog Website',
    description: 'A personal blog platform where users can create, edit, and delete posts. Includes rich-text editing, comment functionality, and MongoDB-based storage.',
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
    description: 'A mobile banking application developed with React Native, providing users with account management, fund transfers, and transaction tracking in a secure environment.',
    imageUrl: 'https://picsum.photos/300/200?random=4',
    liveUrl: '#',
    codeUrl: '#',
    tech: ['React Native', 'Spring Boot', 'PostgreSQL']
  },
  {
    id: 5,
    title: 'App Thời Trang (Mobile)',
    description: 'Ứng dụng mua sắm thời trang trên thiết bị di động, kế thừa backend từ website, hỗ trợ thông báo đẩy và kết nối qua GraphQL/REST API.',
    imageUrl: 'https://picsum.photos/300/200?random=5',
    liveUrl: '#',
    codeUrl: '#',
    tech: ['Kotlin', 'Spring Boot', 'PostgreSQL', 'Firebase', 'GraphQL']
  },
  {
    id: 6,
    title: 'App Quản Lý Chi Tiêu Cá Nhân',
    description: 'Ứng dụng giúp người dùng theo dõi và phân tích chi tiêu hàng ngày với biểu đồ trực quan, đồng bộ dữ liệu lên cloud và đăng nhập an toàn bằng OAuth2.',
    imageUrl: 'https://picsum.photos/300/200?random=6',
    liveUrl: '#',
    codeUrl: '#',
    tech: ['React Native', 'Spring Boot', 'MongoDB', 'OAuth2', 'Chart.js']
  },
  {
    id: 7,
    title: 'Web Phân Tích Cổ Phiếu Cơ Bản',
    description: 'Nền tảng phân tích tài chính cho nhà đầu tư, trực quan hóa dữ liệu cổ phiếu theo thời gian thực, kết hợp cache Redis và tích hợp API bên ngoài.',
    imageUrl: 'https://picsum.photos/300/200?random=7',
    liveUrl: '#',
    codeUrl: '#',
    tech: ['React.js', 'Spring Boot', 'PostgreSQL', 'Redis', 'Python', 'D3.js']
  },
  {
    id: 8,
    title: 'Web Giả Lập Đầu Tư Cổ Phiếu',
    description: 'Website mô phỏng đầu tư chứng khoán với dữ liệu giao dịch thời gian thực, bảo mật bằng JWT và triển khai bằng Docker/Kubernetes.',
    imageUrl: 'https://picsum.photos/300/200?random=8',
    liveUrl: '#',
    codeUrl: '#',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'WebSocket', 'JWT', 'Docker']
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
      <h2 className={styles.sectionTitle}>Projects</h2>
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