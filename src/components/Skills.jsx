import React from 'react';
import styles from './skills.module.css';

export const Skills = () => {
  const skills = [
    { name: 'ReactJs', level: '90%' },
    { name: 'TypeScript', level: '90%' },
    { name: 'Github', level: '90%' },
    { name: 'JavaScript', level: '90%' },
    { name: 'CSS3', level: '90%' },
    { name: 'HTML5', level: '95%' },
  ];

  return (
    <div className={styles.skillsPage}>
      <div className={styles.skills}>
        <h1 className={styles.name}>Skills</h1>
        <p className={styles.parah}>
          Strong debugging and troubleshooting skills to optimize performance
          and user experience.
        </p>
      </div>

      <div className={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <div className={styles.skillRow} key={index}>
            <div className={styles.skillLabel}>{skill.name}</div>
            <div className={styles.skillBarContainer}>
              <div className={styles.skillBar} style={{ width: skill.level }}>
                <span className={styles.skillLevel}>{skill.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
