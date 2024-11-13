import React from "react";
import styles from './resume.module.css'

export const Resume = () => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/Shanjai_Resume.pdf`;
    link.download = 'Shanjai_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.resumePage}>
      <div className={styles.resume}>
        <h1 className={styles.name}>Resume</h1>
        <p className={styles.parah}>
          A results-driven web developer with a strong foundation in front-end
          technologies such as React, HTML, CSS, and JavaScript. Adept at
          building responsive, user-friendly websites and delivering
          high-quality solutions that meet client needs.
        </p>
      </div>
      <div className={styles.cards}>
        <div className={styles.card1}>
          <h3 className={styles.year}>2024</h3>
          <h3 className={styles.work}>Frontend Developer Intern</h3>
          <p className={styles.company}>Sail Boat Technologies</p>
          <p className={styles.percentage}>
            Zapro is a comprehensive Vendor Relationship Management (VRM) and
            Procurement system that integrates seamlessly with your existing ERP
            or payment modules.
          </p>
        </div>
        <div className={styles.card2}>
          <h3 className={styles.year}>2019-2023</h3>
          <h3 className={styles.work}>BE-Computer Science Engineering</h3>
          <p className={styles.company}>Adhiyamaan College of Engineering</p>
          <p className={styles.percentage}>Percentage: 82%</p>
        </div>
        <div className={styles.card3}>
          <h3 className={styles.year}>2017-2019</h3>
          <h3 className={styles.work}>HSC-Heigher Secondary School</h3>
          <p className={styles.company}>
            Shri VidhyaBharathi Matric Hr Sec School
          </p>
          <p className={styles.percentage}>Percentage: 60%</p>
        </div>
        <div className={styles.card4}>
          <h3 className={styles.year}>2017</h3>
          <h3 className={styles.work}>
            SSLC-Secondary School Leaving Certificate
          </h3>
          <p className={styles.company}>
            Shri Ramachandira Matric Hr Sec School
          </p>
          <p className={styles.percentage}>Percentage: 89%</p>
        </div>
      </div>
      <button className={styles.downloadBtn} onClick={handleDownload}>
        Download CV
      </button>
    </div>
  );
}