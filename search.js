// Blog search functionality
const searchBlog = (query) => {
    query = query.toLowerCase().trim();
    return Object.entries(blogPosts).filter(([key, post]) => {
        const searchableContent = [
            post.title,
            post.category,
            post.content
        ].join(' ').toLowerCase();
        return searchableContent.includes(query);
    }).map(([key, post]) => ({
        key,
        ...post
    }));
};

// Create search UI
const createSearchUI = () => {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" placeholder="Search blog posts..." id="searchInput">
            <i class="fas fa-search"></i>
        </div>
        <div class="search-results" id="searchResults"></div>
    `;

    const blogSection = document.querySelector('.blog-section');
    if (blogSection) {
        blogSection.insertBefore(searchContainer, blogSection.firstChild);
    }

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value;
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            const results = searchBlog(query);
            displaySearchResults(results, searchResults);
        }, 300);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
};

// Display search results
const displaySearchResults = (results, container) => {
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No matching posts found</div>';
        container.style.display = 'block';
        return;
    }

    const resultsHTML = results.map(post => `
        <div class="search-result-item" data-post-key="${post.key}">
            <div class="result-category">${post.category}</div>
            <div class="result-title">${post.title}</div>
            <div class="result-meta">
                <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
                <span><i class="far fa-clock"></i> ${post.readTime}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = resultsHTML;
    container.style.display = 'block';

    // Add click handlers to search results
    container.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const postKey = item.dataset.postKey;
            if (window.location.pathname.endsWith('index.html') || 
                window.location.pathname.endsWith('/')) {
                window.location.href = `blogs.html#${postKey}`;
            } else {
                // Show modal with blog content
                const post = blogPosts[postKey];
                if (post) {
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
            container.style.display = 'none';
        });
    });
};

// Initialize search functionality
document.addEventListener('DOMContentLoaded', createSearchUI);