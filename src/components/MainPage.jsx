import React, { useState, useEffect, useRef } from 'react';
import styles from './mainpage.module.css';
import { Home } from './Home';
import { About } from './About';
import { Resume } from './Resume';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Contact } from './Contact';

export const MainPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({
    home: null,
    about: null,
    resume: null,
    skills: null,
    projects: null,
    contact: null,
  });

  // Smooth scroll when clicking a navbar link
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Use IntersectionObserver to track visible section
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.6, // Section is "active" when 60% of it is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); 
        }
      });
    }, observerOptions);

    // Observe each section
    Object.keys(sectionRefs.current).forEach((section) => {
      const currentSection = document.getElementById(section);
      if (currentSection) {
        observer.observe(currentSection);
      }
    });

    return () => {
      // Cleanup the observer on component unmount
      Object.keys(sectionRefs.current).forEach((section) => {
        const currentSection = document.getElementById(section);
        if (currentSection) {
          observer.unobserve(currentSection);
        }
      });
    };
  }, []);

  return (
    <div className={styles.overall}>
      <header className={styles.header}>
        <h2 className={styles.name}>Shanjai</h2>

        <nav className={styles.nav}>
          <h3
            className={`${styles.navbar} ${
              activeSection === 'home' ? styles.active : ''
            }`}
            onClick={() => scrollToSection('home')}
          >
            Home
          </h3>
          <h3
            className={`${styles.navbar} ${
              activeSection === 'about' ? styles.active : ''
            }`}
            onClick={() => scrollToSection('about')}
          >
            About
          </h3>
          <h3
            className={`${styles.navbar} ${
              activeSection === 'resume' ? styles.active : ''
            }`}
            onClick={() => scrollToSection('resume')}
          >
            Resume
          </h3>
          <h3
            className={`${styles.navbar} ${
              activeSection === 'skills' ? styles.active : ''
            }`}
            onClick={() => scrollToSection('skills')}
          >
            Skills
          </h3>
          <h3
            className={`${styles.navbar} ${
              activeSection === 'projects' ? styles.active : ''
            }`}
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </h3>
          <h3
            className={`${styles.navbar} ${
              activeSection === 'contact' ? styles.active : ''
            }`}
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </h3>
        </nav>
      </header>

      {/* Adding id attributes to each section for smooth scroll */}
      <div id='home' ref={(el) => (sectionRefs.current.home = el)}>
        <Home />
      </div>
      <div id='about' ref={(el) => (sectionRefs.current.about = el)}>
        <About />
      </div>
      <div id='resume' ref={(el) => (sectionRefs.current.resume = el)}>
        <Resume />
      </div>
      <div id='skills' ref={(el) => (sectionRefs.current.skills = el)}>
        <Skills />
      </div>
      <div id='projects' ref={(el) => (sectionRefs.current.projects = el)}>
        <Projects />
      </div>
      <div id='contact' ref={(el) => (sectionRefs.current.contact = el)}>
        <Contact />
      </div>
    </div>
  );
};
