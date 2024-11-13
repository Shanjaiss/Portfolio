import React from "react";
import styles from './about.module.css'

export const About = () => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/Shanjai_Resume.pdf`; 
    link.download = 'Shanjai_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.aboutPage}>
      <div className={styles.image}>
        <img src='./Shanjai1_pic.png' alt='Shanjai' width={400}></img>
      </div>
      <div className={styles.about}>
        <h2 className={styles.header}>About Me</h2>
        <p className={styles.text}>
          I'm Shanjai, a passionate web developer specializing in front-end
          technologies like React, HTML, and CSS. I enjoy creating clean,
          responsive websites that deliver exceptional user experiences.
        </p>
        <div className={styles.infoContainer}>
          <p className={styles.question}>
            Name:
            <br />
            Date of Birth:
            <br />
            Address:
            <br />
            Zip Code:
            <br />
            Email:
            <br />
            Phone:
          </p>
          <p className={styles.answer}>
            Shanjai
            <br />
            July 10, 2002
            <br />
            7/41,Sekkangadu,Tiruchengode,Namakkal(DT)
            <br />
            637202
            <br />
            shanjaisenthil10@gmail.com
            <br />
            +919659675152
          </p>
        </div>
        <button className={styles.downloadBtn} onClick={handleDownload}>
          Download CV
        </button>
      </div>
    </div>
  );
}