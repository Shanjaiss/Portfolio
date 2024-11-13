import React from 'react';
import styles from './contact.module.css';
import SvgLinkedIn from './Icons/SvgLinkedIn';
import SvgCall from './Icons/SvgCall';
import SvgEmail from './Icons/SvgEmail';
import SvgGit from './Icons/SvgGit';

export const Contact = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.contact}>
        <h1 className={styles.name}>Contact Me</h1>
        <p className={styles.parah}>
          Feel free to reach out for any inquiries or opportunities. I’d love to
          connect and discuss how I can contribute to your projects.
        </p>
      </div>
      <div className={styles.logo}>
        <div className={styles.linkedin}>
          <SvgLinkedIn />
          <br />
          <a
            className={styles.email}
            href='https://www.linkedin.com/in/shanjai-s-s'
            target='_blank'
            rel='noopener noreferrer'
          >
            www.linkedin.com/in/shanjai-s-s
          </a>
        </div>
        <div className={styles.callIcon}>
          <SvgCall />
          <br />
          <a className={styles.email} href='tel:+919659675152'>
            +91 9659675152
          </a>
        </div>
        <div className={styles.Email}>
          <SvgEmail />
          <br />
          <a className={styles.email} href='mailto:shanjaisenthil10@gmail.com'>
            shanjaisenthil10@gmail.com
          </a>
        </div>
        <div className={styles.linkedin}>
          <SvgGit />
          <br />
          <a
            className={styles.email}
            href='https://github.com/Shanjaiss'
            target='_blank'
            rel='noopener noreferrer'
          >
            https://github.com/Shanjaiss
          </a>
        </div>
      </div>
    </div>
  );
};
