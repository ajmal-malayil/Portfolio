// Mobile menu toggle functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('header nav ul');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Improve accessibility
        mobileMenuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        
        // Add smooth transition
        navMenu.style.transition = 'transform 0.3s ease-in-out';
        navMenu.style.transform = navMenu.classList.contains('active') ? 'translateX(0)' : 'translateX(100%)';
        
        // Prevent scrolling when menu is open
        document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Smooth scrolling when navigation links are clicked
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Blog content data
const blogPosts = {
    'guardian-ai': {
        title: '🛡️ GuardianAI: Multi-Model GenAI for Cyber Threat Detection',
        category: 'AI Security',
        date: 'Apr 19, 2025',
        readTime: '10 min read',
        image: 'guardian-ai.svg',
        content: `
            <h4>🚀 Introduction</h4>
            <p>In today's rapidly evolving cybersecurity landscape, detecting and responding to threats quickly is more critical than ever. As part of the Google x Kaggle GenAI Capstone Project, I created GuardianAI—a smart, AI-powered threat detection tool that leverages multiple Generative AI models to analyze cybersecurity logs and generate structured, actionable reports.</p>
            
            <h4>🧠 What is GuardianAI?</h4>
            <p>GuardianAI is a web-based threat log analyzer designed to simplify and automate the detection of cybersecurity threats. It supports multiple powerful GenAI models:</p>
            <ul>
                <li>Gemini (Google)</li>
                <li>OpenAI GPT-4</li>
                <li>Claude (Anthropic)</li>
                <li>DeepSeek</li>
            </ul>
            
            <h4>Key Features:</h4>
            <ul>
                <li>Upload various file types (PDF, Excel, EXE, TXT, and more)</li>
                <li>Parse and understand content with document analysis</li>
                <li>Contextual threat analysis using GenAI</li>
                <li>Structured outputs in JSON format</li>
                <li>Downloadable PDF reports</li>
                <li>Visual threat levels, MITRE mappings, and AI-driven recommendations</li>
            </ul>
            
            <h4>🔐 Real-World Problem Solved</h4>
            <p>Cybersecurity professionals often face the challenge of making sense of unstructured log files and incident reports. Manual analysis is not only time-consuming but also vulnerable to oversight.</p>
            
            <p>GuardianAI solves this by:</p>
            <ul>
                <li>Automating the interpretation of log files</li>
                <li>Leveraging GenAI to summarize threats and contextualize incidents</li>
                <li>Producing structured reports to accelerate response time</li>
            </ul>
            
            <h4>🔧 Technologies Used</h4>
            <ul>
                <li>Gradio for the interactive web interface</li>
                <li>Python for core logic and model integrations</li>
                <li>Google Gemini API (Live implementation)</li>
                <li>Environment Variables to securely manage API keys</li>
                <li>Render.com for application deployment</li>
                <li>GitHub + Cloudflare Pages for portfolio hosting</li>
            </ul>
            
            <h4>📌 GenAI Capabilities Demonstrated</h4>
            <ul>
                <li>✅ Structured Output (JSON Parsing)</li>
                <li>✅ Document Understanding</li>
                <li>✅ Retrieval-Augmented Generation (RAG)</li>
                <li>🟡 Few-Shot Prompting (Coming Soon!)</li>
            </ul>
            
            <h4>🎯 Live Demo</h4>
            <p>🔗 Try the tool: <a href="https://ai-threat-analyzer.onrender.com/" target="_blank">🛡️ GuardianAI - Live App</a></p>
            <p>📂 Explore the code: <a href="https://www.kaggle.com/code/ajmalmalayil/ai-powered-threat-detection-using-multi-modelgenai" target="_blank">📁 Kaggle Notebook</a></p>
            <p>🌐 Visit my site: <a href="https://ajmalmalayil.pages.dev/" target="_blank">🌐 Portfolio</a></p>
            
            <h4>💡 Limitations & Future Improvements</h4>
            <p>While GuardianAI is live and functional, it's still evolving:</p>
            <ul>
                <li>Multi-model integration is in progress</li>
                <li>Currently only Gemini is live; other models show a "Coming Soon" message</li>
                <li>The chatbot assistant has basic functionality—we plan to enhance it with better memory and interactivity</li>
            </ul>
            
            <h4>🧩 Final Thoughts</h4>
            <p>GuardianAI is more than just a project—it's a forward-thinking solution that showcases the power of Generative AI in the cybersecurity space. Built from the ground up, it's designed to help analysts and professionals detect threats faster and smarter.</p>
            
            <p>If you're hiring, collaborating, or exploring AI in security—let's connect!</p>
            
            <h4>🔗 Let's Connect</h4>
            <ul>
                <li>📧 : <a href="mailto:ajmalmalayil896@gmail.com">Email</a></li>
                <li>💼 : <a href="https://www.linkedin.com/in/ajmalmalayil" target="_blank">LinkedIn</a></li>
                <li>🌐 : <a href="https://ajmalmalayil.pages.dev/" target="_blank">Portfolio</a></li>
            </ul>
            
            <p>Thanks for reading and stay secure! 🙌</p>
        `
    },
    'network': {
        title: 'Modern Network Architecture Design',
        category: 'Networking',
        date: 'Sep 30, 2023',
        readTime: '6 min read',
        image: 'network.svg',
        content: `
            <p>Key principles and best practices for designing scalable and secure network infrastructures:</p>
            
            <h4>1. Network Segmentation</h4>
            <p>Implementing effective network segmentation strategies to enhance security and performance.</p>
            
            <h4>2. Scalability Planning</h4>
            <p>Designing networks that can grow with your organization's needs while maintaining performance.</p>
            
            <h4>3. Security Integration</h4>
            <p>Building security into the network architecture from the ground up.</p>
        `
    },
    'cloud-migration': {
        title: 'Successful Cloud Migration Strategies',
        category: 'Cloud',
        date: 'Sep 25, 2023',
        readTime: '8 min read',
        image: 'cloud-security.svg',
        content: `
            <p>Best practices and step-by-step guide for migrating your infrastructure to the cloud:</p>
            
            <h4>1. Assessment and Planning</h4>
            <p>Evaluating current infrastructure and developing a comprehensive migration strategy.</p>
            
            <h4>2. Migration Approaches</h4>
            <p>Different migration strategies and when to use each approach.</p>
            
            <h4>3. Post-Migration Optimization</h4>
            <p>Ensuring optimal performance and cost-efficiency after migration.</p>
        `
    },
    'security-automation': {
        title: 'Automating Security Operations',
        category: 'Security',
        date: 'Sep 20, 2023',
        readTime: '7 min read',
        image: 'automation.svg',
        content: `
            <p>How to implement automated security monitoring and response in your infrastructure:</p>
            
            <h4>1. Security Monitoring</h4>
            <p>Setting up automated security monitoring and threat detection systems.</p>
            
            <h4>2. Incident Response</h4>
            <p>Automating incident response procedures for common security events.</p>
            
            <h4>3. Compliance Automation</h4>
            <p>Maintaining security compliance through automated controls and reporting.</p>
        `
    },
    'cloud-security': {
        title: 'Cloud Security Best Practices for 2024',
        category: 'Security',
        date: 'Oct 15, 2023',
        readTime: '7 min read',
        image: 'cloud-security.svg',
        content: `
            <p>As organizations continue to migrate their infrastructure to the cloud, security remains a top priority. Here are the essential security measures and strategies to protect your cloud infrastructure from emerging threats in 2024:</p>
            
            <h4>1. Zero Trust Architecture</h4>
            <p>Implement a zero trust security model that requires all users and systems to be authenticated and authorized, regardless of their location.</p>
            
            <h4>2. Multi-Factor Authentication</h4>
            <p>Enable MFA for all user accounts and administrative access to strengthen access controls.</p>
            
            <h4>3. Data Encryption</h4>
            <p>Use strong encryption for data at rest and in transit to protect sensitive information.</p>
        `
    },
    'automation': {
        title: 'Automating IT Infrastructure with Python',
        category: 'Automation',
        date: 'Oct 10, 2023',
        readTime: '8 min read',
        image: 'automation.svg',
        content: `
            <p>Learn how to streamline your IT operations using Python scripts and automation frameworks. This guide covers:</p>
            
            <h4>1. Infrastructure as Code</h4>
            <p>Using Python to manage and provision infrastructure resources programmatically.</p>
            
            <h4>2. Configuration Management</h4>
            <p>Automating system configurations and application deployments.</p>
            
            <h4>3. Monitoring and Alerts</h4>
            <p>Building automated monitoring systems and alert mechanisms.</p>
        `
    },
    'devops': {
        title: 'Implementing CI/CD in Enterprise Environments',
        category: 'DevOps',
        date: 'Oct 5, 2023',
        readTime: '9 min read',
        image: 'devops.svg',
        content: `
            <p>A comprehensive guide to setting up robust CI/CD pipelines for large-scale applications:</p>
            
            <h4>1. Pipeline Design</h4>
            <p>Best practices for designing efficient and scalable CI/CD pipelines.</p>
            
            <h4>2. Testing Strategies</h4>
            <p>Implementing automated testing at various stages of the pipeline.</p>
            
            <h4>3. Deployment Automation</h4>
            <p>Techniques for automated and reliable application deployments.</p>
        `
    }
};

// Create modal HTML structure
const modalHTML = `
    <div class="modal-overlay">
        <div class="modal-content">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <div class="modal-header">
                <span class="modal-category"></span>
                <h2 class="modal-title"></h2>
                <div class="modal-meta">
                    <span class="modal-date"><i class="far fa-calendar-alt"></i></span>
                    <span class="modal-read-time"><i class="far fa-clock"></i></span>
                </div>
            </div>
            <img class="modal-image" alt="Blog Post Image">
            <div class="modal-body"></div>
        </div>
    </div>
`;

// Add modal to the document
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Get modal elements
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalCategory = document.querySelector('.modal-category');
const modalTitle = document.querySelector('.modal-title');
const modalDate = document.querySelector('.modal-date');
const modalReadTime = document.querySelector('.modal-read-time');
const modalImage = document.querySelector('.modal-image');
const modalBody = document.querySelector('.modal-body');

// Blog card functionality
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    const readMoreBtn = card.querySelector('.read-more');
    const blogTitle = card.querySelector('h3').textContent;
    
    // Find the blog post data
    const blogKey = Object.keys(blogPosts).find(key => 
    blogPosts[key].title.replace(/[^\w\s]/g, '') === blogTitle.replace(/[^\w\s]/g, '')
    );
    
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if we're on the index page
            const isIndexPage = window.location.pathname.endsWith('index.html') || 
                              window.location.pathname.endsWith('/');
            
            if (isIndexPage) {
                // Redirect to blog.html with hash
                window.location.href = `blogs.html#${blogKey}`;
                return;
            }
            
            // Show modal with blog content
            if (blogKey && blogPosts[blogKey]) {
                const post = blogPosts[blogKey];
                
                modalCategory.textContent = post.category;
                modalTitle.textContent = post.title;
                modalDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${post.date}`;
                modalReadTime.innerHTML = `<i class="far fa-clock"></i> ${post.readTime}`;
                modalImage.src = post.image;
                modalImage.alt = post.title;
                modalBody.innerHTML = post.content;
                
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Close modal functionality
modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle hash changes for blog.html
window.addEventListener('hashchange', handleBlogHash);
window.addEventListener('load', handleBlogHash);

function handleBlogHash() {
    const hash = window.location.hash.slice(1);
    if (hash && blogPosts[hash] && !window.location.pathname.endsWith('index.html')) {
        const post = blogPosts[hash];
        
        modalCategory.textContent = post.category;
        modalTitle.textContent = post.title;
        modalDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${post.date}`;
        modalReadTime.innerHTML = `<i class="far fa-clock"></i> ${post.readTime}`;
        modalImage.src = post.image;
        modalImage.alt = post.title;
        modalBody.innerHTML = post.content;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Skill card hover effects
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add active class to current navigation item
function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('header nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
}

setActiveNavItem();

// Page load animation and service worker registration
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
    
    // Implement lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formStatus = document.getElementById('formStatus');
    
    // Initialize form status messages
    const statusMessages = {
        success: '<div class="alert success"><i class="fas fa-check-circle"></i> Message sent successfully! We\'ll get back to you soon.</div>',
        error: '<div class="alert error"><i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.</div>',
        sending: '<div class="alert info"><i class="fas fa-spinner fa-spin"></i> Sending your message...</div>',
        captcha: '<div class="alert error"><i class="fas fa-exclamation-circle"></i> Please complete the reCAPTCHA verification.</div>'
    };

    // Enhanced form submission handler with reCAPTCHA validation
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate reCAPTCHA first
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            formStatus.innerHTML = statusMessages.captcha;
            return false;
        }

        // Rest of the form submission logic
        // Validate all fields
        if (!validateForm()) {
            return false;
        }
        
        // Show sending state
        formStatus.innerHTML = statusMessages.sending;
        btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        try {
            // Collect form data
            const formData = new FormData(form);
            
            // Send form data using Fetch API
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Success handling
                formStatus.innerHTML = statusMessages.success;
                form.reset();
                grecaptcha.reset();
                
                // Reset form styles
                const fields = form.querySelectorAll('.enhanced-input');
                fields.forEach(field => {
                    field.classList.remove('success', 'error');
                });
                
                // Reset error messages
                document.querySelectorAll('.error-message').forEach(error => {
                    error.textContent = '';
                    error.style.display = 'none';
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            } else {
                throw new Error(data.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.innerHTML = statusMessages.error;
        } finally {
            // Reset button state
            btnText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle?.querySelector('i');

// Check for saved theme preference or use default
function getThemePreference() {
    return localStorage.getItem('theme') === 'dark';
}

function setTheme(isDark) {
    document.body.classList.toggle('dark-theme', isDark);
    // Update icon
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
if (themeToggle) {
    const isDark = getThemePreference();
    setTheme(isDark);
    
    // Update icon based on current theme
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    setTheme(isDark);
});
