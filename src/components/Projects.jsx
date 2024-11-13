import React from 'react';
import styles from './project.module.css';

export const Projects = () => {
  return (
    <div className={styles.projectPage}>
      <div className={styles.project}>
        <h1 className={styles.name}>Our Project</h1>
        <h4 className={styles.projectName}>Vendor Management System</h4>
      </div>
      <div className={styles.image}>
        <img src='Dasboard.png' alt='Dashboard' width='500' height='350' />
        <img src='ListPage.png' alt='List Page' width='500' height='350' />
        <img src='ViewPage.png' alt='View Page' width='500' height='350' />
        <img
          src='SourcingEvent.png'
          alt='Sourcing Event'
          width='500'
          height='350'
        />
      </div>
      <div className={styles.description}>
        <p>
          A Vendor Management System (VMS) is a platform that helps
          organizations streamline and manage their interactions with vendors
          and suppliers. Its primary uses include:
        </p>
        <ul>
          <li>
            <span className={styles.label}>
              Vendor Selection and Onboarding:
            </span>{' '}
            Assists in choosing qualified vendors, managing registration, and
            ensuring vendors meet compliance and qualification criteria.
          </li>
          <li>
            <span className={styles.label}>Contract Management:</span>{' '}
            Centralizes and tracks vendor contracts, making it easier to review
            terms, renew, or negotiate contracts.
          </li>
          <li>
            <span className={styles.label}>Performance Tracking:</span> Monitors
            vendor performance through key performance indicators (KPIs),
            helping to ensure service levels and quality standards are met.
          </li>
          <li>
            <span className={styles.label}>Risk Management:</span> Helps
            identify and mitigate risks associated with vendor relationships,
            such as financial stability, compliance, and data security risks.
          </li>
          <li>
            <span className={styles.label}>Cost Control:</span> Tracks
            vendor-related expenses, compares pricing, and enables cost-saving
            opportunities through competitive analysis.
          </li>
          <li>
            <span className={styles.label}>
              Compliance and Regulatory Management:
            </span>{' '}
            Ensures vendors adhere to relevant laws, regulations, and company
            policies, aiding in audit preparation and compliance reporting.
          </li>
          <li>
            <span className={styles.label}>
              Invoice and Payment Processing:
            </span>{' '}
            Automates invoicing and payment workflows, reducing manual processes
            and ensuring timely and accurate payments.
          </li>
          <li>
            <span className={styles.label}>
              Communication and Collaboration:
            </span>{' '}
            Provides a centralized platform for communication, document sharing,
            and project management between vendors and internal teams.
          </li>
          <li>
            <span className={styles.label}>Data and Analytics:</span> Offers
            insights and reporting on vendor performance, costs, and procurement
            trends, helping inform better business decisions.
          </li>
          <li>
            <span className={styles.label}>Scalability and Efficiency:</span>{' '}
            Facilitates scalable vendor management practices, allowing
            organizations to handle a larger pool of vendors more effectively.
          </li>
        </ul>
        <p>
          A VMS ultimately improves vendor relationship management, increases
          efficiency, reduces costs, and ensures better compliance and risk
          management.
        </p>
      </div>
    </div>
  );
};
