import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaSmile } from 'react-icons/fa';
import styles from './ContactForm.module.css';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'kimhongpham';
const TEMPLATE_ID = 'template_ab0jtfj';
const PUBLIC_KEY = 'ERV6WGQIS5UZVwQLz';

const ContactForm = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm here to help you get in touch with me.",
      sender: 'bot',
      timestamp: 'Just now'
    },
    {
      id: 2,
      text: "What's your name?",
      sender: 'bot',
      timestamp: 'Just now'
    }
  ]);
  
  const [currentStep, setCurrentStep] = useState('name'); // name, email, message, sent
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (currentStep !== 'sent' && !isTyping) {
      textareaRef.current && textareaRef.current.focus();
    }
  }, [currentStep, isTyping]);

  const addMessage = (text, sender, callback) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (callback) {
      setTimeout(callback, 1000);
    }
  };

  const showTyping = (duration = 1500) => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), duration);
  };

  const validateEmail = (email) => {
    // Đơn giản, đủ dùng cho form liên hệ
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    addMessage(inputValue, 'user');

    // Process based on current step
    if (currentStep === 'name') {
      setFormData(prev => ({ ...prev, name: inputValue }));
      setInputValue('');

      showTyping();
      setTimeout(() => {
        addMessage(`Nice to meet you, ${inputValue}! ✨`, 'bot');
        setTimeout(() => {
          addMessage("What's your email address?", 'bot');
          setCurrentStep('email');
        }, 1000);
      }, 1500);

    } else if (currentStep === 'email') {
      // Kiểm tra email hợp lệ
      if (!validateEmail(inputValue)) {
        addMessage("📧 Whoops! That email looks a bit strange 😅 Try again?", 'bot');
        setInputValue('');
        return;
      }
      setFormData(prev => ({ ...prev, email: inputValue }));
      setInputValue('');

      showTyping();
      setTimeout(() => {
        addMessage("Perfect! 📧", 'bot');
        setTimeout(() => {
          addMessage("Now, what would you like to tell me?", 'bot');
          setCurrentStep('message');
        }, 1000);
      }, 1500);

    } else if (currentStep === 'message') {
      setFormData(prev => ({ ...prev, message: inputValue }));
      setInputValue('');

      showTyping();
      setTimeout(() => {
        addMessage("Got it! Please wait for me... 🚀", 'bot');

        // Send email
        const dataToSend = { ...formData, message: inputValue };
        emailjs.send(SERVICE_ID, TEMPLATE_ID, dataToSend, PUBLIC_KEY)
          .then(() => {
            setTimeout(() => {
              addMessage("I'll get back to you soon.", 'bot');
              setCurrentStep('sent');
              setStatus('sent');
            }, 2000);
          })
          .catch(() => {
            setTimeout(() => {
              addMessage("Oops! Something went wrong. 😅 Please try again later.", 'bot');
              setCurrentStep('message');
            }, 2000);
          });
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPlaceholder = () => {
    switch (currentStep) {
      case 'name': return 'Type your name...';
      case 'email': return 'Type your email...';
      case 'message': return 'Type your message...';
      default: return 'Conversation completed ✅';
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* Messages Area */}
      <div className={styles.messagesArea}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`${styles.messageWrapper} ${message.sender === 'user' ? styles.userMessage : styles.botMessage}`}
          >
            {message.sender === 'bot' && (
              <div className={styles.botAvatar}>
                <span>R</span>
              </div>
            )}
            <div className={styles.messageContent}>
              <div className={styles.messageBubble}>
                {message.text}
              </div>
              <div className={styles.messageTime}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className={`${styles.messageWrapper} ${styles.botMessage}`}>
            <div className={styles.botAvatar}>
              <span>R</span>
            </div>
            <div className={styles.messageContent}>
              <div className={styles.typingIndicator}>
                <div className={styles.typingDot}></div>
                <div className={styles.typingDot}></div>
                <div className={styles.typingDot}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {currentStep !== 'sent' && (
        <div className={styles.inputArea}>
          <div className={styles.inputContainer}>
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={getPlaceholder()}
              className={styles.messageInput}
              rows={1}
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              className={styles.sendButton}
              disabled={!inputValue.trim() || isTyping}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      {/* Restart Option */}
      {currentStep === 'sent' && (
        <div className={styles.restartArea}>
          <button 
            onClick={() => {
              setMessages([
                {
                  id: 1,
                  text: "Hi there! 👋 I'm here to help you get in touch with me.",
                  sender: 'bot',
                  timestamp: 'Just now'
                },
                {
                  id: 2,
                  text: "What's your name?",
                  sender: 'bot',
                  timestamp: 'Just now'
                }
              ]);
              setCurrentStep('name');
              setFormData({ name: '', email: '', message: '' });
              setInputValue('');
              setStatus('');
            }}
            className={styles.restartButton}
          >
            Start New Conversation
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;