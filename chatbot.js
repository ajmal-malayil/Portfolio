// Chatbot functionality
const chatbotHTML = `
    <div class="chatbot-container" style="display: none;">
        <div class="chatbot-header">
            <h3><i class="fas fa-robot"></i> AI Assistant</h3>
            <button class="chatbot-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="chatbot-messages"></div>
        <div class="chatbot-input">
            <input type="text" placeholder="Type your message..." />
            <button><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
    <div class="chatbot-toggle">
        <i class="fas fa-comments"></i>
    </div>
`;

// Add chatbot HTML to the body
document.body.insertAdjacentHTML('beforeend', chatbotHTML);

// Get DOM elements
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotClose = document.querySelector('.chatbot-close');
const chatbotMessages = document.querySelector('.chatbot-messages');
const chatbotInput = document.querySelector('.chatbot-input input');
const chatbotSendButton = document.querySelector('.chatbot-input button');

// Toggle chatbot visibility
function toggleChatbot() {
    const isVisible = chatbotContainer.style.display === 'flex';
    chatbotContainer.style.display = isVisible ? 'none' : 'flex';
    chatbotToggle.style.display = isVisible ? 'flex' : 'none';
    if (!isVisible) {
        chatbotInput.focus();
    }
}

// Add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Handle user input
let responses = {
    greetings: {
        patterns: ['hi', 'hy', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
        responses: ['Hello! How can I help you today?', 'Hi there! What can I do for you?', 'Greetings! How may I assist you?']
    },
    about: {
        patterns: ['who are you', 'what are you', 'tell me about yourself', 'your purpose', 'what do you do'],
        responses: ['I am Ajmal\'s AI assistant. I can help you learn more about his work and experience.', 'I\'m an AI chatbot designed to help you learn more about Ajmal and his professional journey.']
    },
    skills: {
        patterns: ['what can you do', 'your skills', 'help me', 'capabilities', 'features'],
        responses: ['I can help you with:\n- Information about Ajmal\'s experience\n- Details about his projects\n- Scheduling meetings\n- General inquiries', 'I\'m here to assist with:\n- Learning about Ajmal\'s technical expertise\n- Exploring his project portfolio\n- Setting up meetings\n- Answering your questions']
    },
    contact: {
        patterns: ['contact', 'email', 'reach', 'connect', 'get in touch', 'social media'],
        responses: ['You can contact Ajmal through:\n- Email: [ajmalmalayil896@gmail.com]\n- LinkedIn: [https://www.linkedin.com/in/ajmalmalayil]\n- Or use the contact form on this website']
    },
    projects: {
        patterns: ['projects', 'portfolio', 'work', 'experience', 'showcase'],
        responses: ['Ajmal has worked on various exciting projects! You can explore them on the portfolio section of this website. Would you like to know more about any specific project?']
    },
    education: {
        patterns: ['education', 'study', 'degree', 'qualification', 'academic'],
        responses: ['Ajmal has a strong educational background in technology and computer science. Would you like to know more about his academic achievements?']
    },
    availability: {
        patterns: ['available', 'hire', 'job', 'opportunity', 'work together'],
        responses: ['Ajmal is always open to discussing new opportunities and collaborations. The best way to discuss potential work is to reach out via email or LinkedIn.']
    },
    default: {
        responses: ['I\'m not sure I understand. Could you rephrase that?', 'Could you please be more specific about what you\'re looking for?', 'I didn\'t quite catch that. Can you explain what you need help with?']
    }
};

// Function to load custom responses from a file
async function loadCustomResponses(file) {
    try {
        const response = await fetch(file);
        const fileExtension = file.split('.').pop().toLowerCase();
        
        if (fileExtension === 'json') {
            const data = await response.json();
            responses = { ...responses, ...data };
        } else if (fileExtension === 'csv') {
            const text = await response.text();
            const lines = text.split('\n').filter(line => line.trim());
            const headers = lines[0].split(',');
            
            const csvData = {};
            lines.slice(1).forEach(line => {
                const values = line.split(',').map(value => value.trim().replace(/^"|"$/g, ''));
                const category = values[0];
                const patterns = values[1].split(',').map(p => p.trim());
                const response = values[2];
                
                if (!csvData[category]) {
                    csvData[category] = {
                        patterns: [],
                        responses: []
                    };
                }
                
                csvData[category].patterns = [...new Set([...csvData[category].patterns, ...patterns])];
                csvData[category].responses.push(response);
            });
            
            responses = { ...responses, ...csvData };
        } else {
            throw new Error('Unsupported file format. Please use JSON or CSV files.');
        }
        
        return true;
    } catch (error) {
        console.error('Error loading custom responses:', error);
        return false;
    }
}

function findBestMatch(message) {
    const lowercaseMessage = message.toLowerCase();
    for (const category in responses) {
        if (category === 'default') continue;
        const patterns = responses[category].patterns;
        if (patterns && patterns.some(pattern => lowercaseMessage.includes(pattern))) {
            return responses[category].responses[Math.floor(Math.random() * responses[category].responses.length)];
        }
    }
    return responses.default.responses[Math.floor(Math.random() * responses.default.responses.length)];
}

function handleUserInput() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatbotInput.value = '';
        setTimeout(() => {
            const response = findBestMatch(message);
            addMessage(response);
        }, 1000);
    }
}

// Event listeners
chatbotToggle.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', toggleChatbot);
chatbotSendButton.addEventListener('click', handleUserInput);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});