import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import ContactForm from './ContactForm';
import styles from './ContactFab.module.css';

const ContactFab = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setOpen(true)}
        aria-label="Get In Touch"
      >
        ✉️
      </button>
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              Get In Touch
              <button className={styles.close} onClick={() => setOpen(false)}>&times;</button>
            </div>
            <div className={styles.modalContent}>
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactFab;