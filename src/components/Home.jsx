import React from 'react';
import styles from './home.module.css';

export const Home = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:shanjaisenthil10@gmail.com';
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.home}>
        <h4 className={styles.header}>HELLO!</h4>
        <h1 className={styles.profile}>
          I'm<span className={styles.name}> Shanjai</span>
        </h1>
        <h3 className={styles.work}>Frontend Developer</h3>
        <div className={styles.buttonContainer}>
          <button className={styles.downloadBtn} onClick={handleEmailClick}>
            Email
          </button>
          <button className={styles.downloadBtn} onClick={handleEmailClick}>
            Contact
          </button>
        </div>
      </div>
      <div className={styles.image}>
        <img src='./Shanjai1_pic.png' alt='Shanjai' width='500' height='590' />
      </div>
    </div>
  );
};
