/**
 * Brevo Newsletter Integration
 * Handles form submissions to Brevo email list
 * 
 * SETUP REQUIRED:
 * 1. Get API key from Brevo dashboard
 * 2. Get List ID from your subscriber list
 * 3. Update the BREVO_CONFIG below with your credentials
 */

// ==================== CONFIGURATION ====================
// Load from Cloudflare environment variables or use template values
// For Cloudflare Pages/Workers, these are set in the Cloudflare Dashboard
// For local testing, update these values in the .env file
const getBrevoConfig = async () => {
    // Try to load from Cloudflare environment (if available)
    if (typeof CF !== 'undefined' && CF.BREVO_API_KEY) {
        return {
            API_KEY: CF.BREVO_API_KEY,
            LIST_ID: CF.BREVO_LIST_ID,
            API_ENDPOINT: 'https://api.brevo.com/v3/contacts',
        };
    }
    
    // Fallback to template (for GitHub, will show warning)
    return {
        API_KEY: 'YOUR_API_KEY_HERE',  // Set in Cloudflare dashboard
        LIST_ID: 0,  // Set in Cloudflare dashboard
        API_ENDPOINT: 'https://api.brevo.com/v3/contacts',
    };
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Brevo integration loaded');
    
    // Find all newsletter forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    if (newsletterForms.length === 0) {
        console.warn('⚠ No newsletter forms found (.newsletter-form)');
        return;
    }
    
    console.log(`✓ Found ${newsletterForms.length} newsletter form(s)`);
    
    // Attach handler to each form
    newsletterForms.forEach((form, index) => {
        console.log(`  - Form ${index + 1}: Adding Brevo handler`);
        form.addEventListener('submit', handleNewsletterSubmit);
    });
});

// ==================== FORM SUBMISSION HANDLER ====================
async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    // Get email input from form
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput?.value?.trim();
    
    if (!email) {
        showMessage(this, 'Please enter a valid email', 'error');
        return;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
        showMessage(this, 'Please enter a valid email address', 'error');
        return;
    }
    
    // Check configuration
    if (BREVO_CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
        showMessage(this, 
            '⚠ Newsletter not configured yet. Contact the site owner.',
            'error'
        );
        console.error('❌ Brevo API key not configured');
        return;
    }
    
    // Show loading state
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Subscribing...';
    
    try {
        // Send to Brevo
        const response = await fetch(BREVO_CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'api-key': BREVO_CONFIG.API_KEY,
            },
            body: JSON.stringify({
                email: email,
                listIds: [BREVO_CONFIG.LIST_ID],
                updateEnabled: true,  // Update if already exists
            }),
        });
        
        // Handle response
        if (response.ok) {
            console.log('✓ Email subscribed successfully:', email);
            showMessage(this, 
                '✓ Thanks for subscribing! Check your email for confirmation.',
                'success'
            );
            this.reset();  // Clear the form
            
            // Log to console for transparency
            logSubscription(email);
        } else if (response.status === 400) {
            // Email already subscribed or invalid
            const data = await response.json();
            if (data.message?.includes('already exists')) {
                showMessage(this, 'This email is already subscribed!', 'warning');
            } else {
                showMessage(this, 'Email already in our list!', 'info');
            }
            console.log('ℹ Response:', data.message);
        } else {
            const error = await response.json();
            console.error('❌ Brevo API error:', error);
            showMessage(this, 
                'Something went wrong. Please try again later.',
                'error'
            );
        }
    } catch (error) {
        console.error('❌ Network error:', error);
        showMessage(this, 
            'Connection error. Please try again.',
            'error'
        );
    } finally {
        // Restore button
        button.disabled = false;
        button.textContent = originalText;
    }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show success/error/info message to user
 */
function showMessage(form, message, type = 'info') {
    // Remove any existing message
    const existingMessage = form.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `newsletter-message newsletter-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        margin-top: 10px;
        padding: 10px 12px;
        border-radius: 5px;
        font-size: 0.9rem;
        animation: slideIn 0.3s ease;
    `;
    
    // Color based on type
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3',
    };
    messageEl.style.backgroundColor = colors[type] || colors.info;
    messageEl.style.color = 'white';
    
    // Add to form
    form.appendChild(messageEl);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transition = 'opacity 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

/**
 * Log subscription for transparency
 */
function logSubscription(email) {
    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] Newsletter subscription: ${email}`;
    console.log('📧 ' + logMessage);
}

// ==================== ADD CSS FOR MESSAGES ====================
// Add styles for newsletter messages (if not already in CSS)
if (!document.querySelector('style[data-brevo-styles]')) {
    const style = document.createElement('style');
    style.setAttribute('data-brevo-styles', 'true');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .newsletter-message {
            animation: slideIn 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

console.log('✓ Brevo integration script ready');



