// App.tsx
import { createSignal, onMount, onCleanup } from 'solid-js';
import './global.css';
import SampahIcon from './assets/sampah.png';
// Import Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpm-Zz32sEYYV2jH5f7PCP2BcDxe1HsQw",
  authDomain: "urai-d1f1c.firebaseapp.com",
  projectId: "urai-d1f1c",
  storageBucket: "urai-d1f1c.firebasestorage.app",
  messagingSenderId: "431256076213",
  appId: "1:431256076213:web:54f6521a3d6155a4dae3fc",
  measurementId: "G-2PHNG76BCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [activeSection, setActiveSection] = createSignal('home');
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  
  // Form state
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [formStatus, setFormStatus] = createSignal({ success: false, error: false, message: '' });

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const handleScroll = () => {
    const sections = ['home', 'about', 'features', 'how-it-works', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        if (
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };

  // Submit form data to Firebase
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    // Form validation
    if (!name() || !email() || !message()) {
      setFormStatus({ 
        success: false, 
        error: true, 
        message: 'Please fill in all fields' 
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email())) {
      setFormStatus({ 
        success: false, 
        error: true, 
        message: 'Please enter a valid email address' 
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Add data to Firestore
      await addDoc(collection(db, "contacts"), {
        name: name(),
        email: email(),
        message: message(),
        timestamp: new Date()
      });
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      
      // Success message
      setFormStatus({ 
        success: true, 
        error: false, 
        message: 'Thank you for your message! We will get back to you soon.' 
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ success: false, error: false, message: '' });
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting form: ", error);
      setFormStatus({ 
        success: false, 
        error: true, 
        message: 'Something went wrong. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onCleanup(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div class="app">
      {/* Header/Navigation */}
      <header class="header">
        <div class="container header-container">
          <div class="logo">
            <span class="logo-text">Urai</span>
          </div>
          
          <button class="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen())}>
            <span class={`hamburger ${isMenuOpen() ? 'open' : ''}`}></span>
          </button>

          <nav class={`nav ${isMenuOpen() ? 'open' : ''}`}>
            <ul class="nav-list">
              <li><a class={activeSection() === 'home' ? 'active' : ''} 
                    onClick={() => scrollToSection('home')}>Home</a></li>
              <li><a class={activeSection() === 'about' ? 'active' : ''} 
                    onClick={() => scrollToSection('about')}>About</a></li>
              <li><a class={activeSection() === 'features' ? 'active' : ''}
                    onClick={() => scrollToSection('features')}>Features</a></li>
              <li><a class={activeSection() === 'how-it-works' ? 'active' : ''}
                    onClick={() => scrollToSection('how-it-works')}>How It Works</a></li>
              <li><a class={activeSection() === 'contact' ? 'active' : ''}
                    onClick={() => scrollToSection('contact')}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" class="hero">
        <div class="container">
          <div class="hero-content">
            <h1>Smart Waste Sorting for a Cleaner Future</h1>
            <p>Urai helps you sort your trash correctly with recognition, making recycling easier and more efficient than ever before.</p>
            <div class="hero-buttons">
              <button class="btn btn-primary">Get Started</button>
              <button class="btn btn-secondary">Learn More</button>
            </div>
          </div>
          <div class="hero-image">
            <div class="image-container">
            <div
              class="recycling-icon"
              style={{ '--sampah-icon': `url(${SampahIcon})` }}
            ></div>
            </div>
          </div>
        </div>
        <div class="scroll-down" onClick={() => scrollToSection('about')}>
          <span>Scroll Down</span>
          <div class="arrow-down"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" class="about">
        <div class="container">
          <div class="section-header">
            <h2>About Urai</h2>
            <p>Revolutionizing waste management through technology</p>
          </div>
          <div class="about-content">
            <div class="about-image">
              <div class="leaf-decoration"></div>
            </div>
            <div class="about-text">
              <p>Urai is a modern solution to the growing waste management crisis. Our platform combines cutting-edge technology with environmental consciousness to make proper waste sorting accessible to everyone.</p>
              <p>With a mission to reduce landfill waste by 30% in the next 5 years, we're dedicated to creating a more sustainable future through better waste sorting practices.</p>
              <div class="stats">
                <div class="stat-item">
                  <h3>85%</h3>
                  <p>Sorting Accuracy</p>
                </div>
                <div class="stat-item">
                  <h3>1M+</h3>
                  <p>Items Sorted</p>
                </div>
                <div class="stat-item">
                  <h3>25%</h3>
                  <p>Waste Reduction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" class="features">
        <div class="container">
          <div class="section-header">
            <h2>Key Features</h2>
            <p>What makes Urai the ultimate waste sorting solution</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon ai-icon"></div>
              <h3>AI Recognition</h3>
              <p>Advanced algorithms identify waste types from photos with 95% accuracy</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon guide-icon"></div>
              <h3>Sorting Guides</h3>
              <p>Detailed instructions for sorting various types of waste properly</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon map-icon"></div>
              <h3>Recycling Map</h3>
              <p>Find nearest recycling centers and specialized disposal facilities</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon track-icon"></div>
              <h3>Progress Tracking</h3>
              <p>Monitor your environmental impact with detailed statistics</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon community-icon"></div>
              <h3>Community Challenges</h3>
              <p>Join eco-challenges and compete with friends to reduce waste</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon education-icon"></div>
              <h3>Educational Content</h3>
              <p>Learn about waste management and environmental conservation</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" class="how-it-works">
        <div class="container">
          <div class="section-header">
            <h2>How It Works</h2>
            <p>Start sorting waste correctly in just three easy steps</p>
          </div>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Take a Photo</h3>
                <p>Simply take a picture of the item you're unsure how to sort</p>
              </div>
            </div>
            <div class="step-connector"></div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>Get Results</h3>
                <p>Our AI system identifies the item and provides sorting instructions</p>
              </div>
            </div>
            <div class="step-connector"></div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Sort Properly</h3>
                <p>Follow the guidance to dispose of your waste in the right bin</p>
              </div>
            </div>
          </div>
          <div class="cta-container">
            <p>Ready to start sorting smarter?</p>
            <button class="btn btn-primary">Try Urai Now</button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" class="contact">
        <div class="container">
          <div class="section-header">
            <h2>Get In Touch</h2>
            <p>Have questions or feedback? We'd love to hear from you!</p>
          </div>
          <div class="contact-container">
            <div class="contact-form">
              <form onSubmit={handleSubmit}>
                {formStatus().message && (
                  <div class={`form-status ${formStatus().success ? 'success' : 'error'}`}>
                    {formStatus().message}
                  </div>
                )}
                <div class="form-group">
                  <label for="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Your Name" 
                    value={name()}
                    onInput={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Your Email" 
                    value={email()}
                    onInput={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea 
                    id="message" 
                    placeholder="Your Message"
                    value={message()}
                    onInput={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  disabled={isSubmitting()}
                >
                  {isSubmitting() ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            <div class="contact-info">
              <div class="info-item">
                <div class="info-icon email-icon"></div>
                <p>info@urai.com</p>
              </div>
              <div class="info-item">
                <div class="info-icon phone-icon"></div>
                <p>+62 813-9241-4286</p>
              </div>
              <div class="info-item">
                <div class="info-icon location-icon"></div>
                <p>Banyumas, Jawa Tengah 53181</p>
              </div>
              <div class="social-links">
                <a href="#" class="social-icon facebook"></a>
                <a href="#" class="social-icon twitter"></a>
                <a href="#" class="social-icon instagram"></a>
                <a href="#" class="social-icon linkedin"></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-logo">
              <span class="logo-text">Urai</span>
              <p>Smart waste sorting for a cleaner future</p>
            </div>
            <div class="footer-links">
              <div class="footer-column">
                <h4>Navigation</h4>
                <ul>
                  <li><a onClick={() => scrollToSection('home')}>Home</a></li>
                  <li><a onClick={() => scrollToSection('about')}>About</a></li>
                  <li><a onClick={() => scrollToSection('features')}>Features</a></li>
                  <li><a onClick={() => scrollToSection('how-it-works')}>How It Works</a></li>
                  <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
                </ul>
              </div>
              <div class="footer-column">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Urai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;