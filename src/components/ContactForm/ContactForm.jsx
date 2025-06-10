import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'kimhongpham';
const TEMPLATE_ID = 'template_ab0jtfj';
const PUBLIC_KEY = 'ERV6WGQIS5UZVwQLz';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (status === 'Please fill in all fields.') {
      setStatus('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('Please fill in all fields.');
      return;
    }
    setStatus('Sending...');
    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setStatus('Failed to send message. Please try again.');
      });
  };

  return (
    <section id="contact" className={styles.contactSection} aria-labelledby="contactHeading">
      <div className={styles.container}>
        <h2 id="contactHeading" className={styles.sectionTitle}>Get In Touch</h2>
        <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Your full name"
              aria-required="true"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="you@example.com"
              aria-required="true"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.textarea}
              placeholder="Write your message here..."
              aria-required="true"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
          <div className={styles.statusMessage} style={{ minHeight: '2.5rem' }}>
            {status}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

