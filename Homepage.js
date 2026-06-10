document.addEventListener('DOMContentLoaded', () => {
    const contentList = document.getElementById('content-list');
    const filterCategory = document.getElementById('filter-category');
    const filterLanguage = document.getElementById('filter-language');

    // Default items to seed if localStorage is empty
    const defaultItems = [
        {
            title: 'ಕವಿತೆಗಳು',
            category: 'Poetry',
            language: 'Kannada',
            summary: "Expressive verses that capture the essence of emotions and life's simple, profound moments.",
            icon: 'fas fa-feather-alt'
        },
        {
            title: 'ಚಲನಚಿತ್ರ',
            category: 'Cinema',
            language: 'Kannada',
            summary: "Insights, scripts, and discussions diving into the world of storytelling on the silver screen.",
            icon: 'fas fa-film'
        },
        {
            title: 'ನಾಟಕ',
            category: 'Drama',
            language: 'Kannada',
            summary: "Engaging narratives and character-driven plays that bring the stage alive.",
            icon: 'fas fa-theater-masks'
        },
        {
            title: 'ಯೂಟ್ಯೂಬ್',
            category: 'YouTube',
            language: 'Kannada',
            summary: "Creative video content spanning varied genres, designed for engaging modern audiences.",
            icon: 'fab fa-youtube'
        },
        {
            title: 'ಕೆ-ಡ್ರಾಮಾ ಭಾಷೆ',
            category: 'K-Drama Slang',
            language: 'Kannada',
            summary: "A fun, bridge-building guide translating popular K-Drama slangs into local context.",
            icon: 'fas fa-language'
        }
    ];

    // Load items from localStorage
    let contentItems = JSON.parse(localStorage.getItem('contentItems'));
    if (!contentItems || contentItems.length === 0) {
        contentItems = defaultItems;
        localStorage.setItem('contentItems', JSON.stringify(contentItems));
    }

    // --- Core Functions ---

    // 1. Render a single content card
    function renderCard(item) {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.setAttribute('data-category', item.category);
        card.setAttribute('data-language', item.language);

        let iconHtml = item.icon ? `<i class="${item.icon} category-icon"></i>` : '';

        card.innerHTML = `
            ${iconHtml}
            <h3>${item.title}</h3>
            <p class="card-meta">Category: ${item.category} | Language: ${item.language}</p>
            <p class="card-summary">${item.summary || ''}</p>
            <a href="#" target="_blank" class="read-more">Read Sample</a>
        `;
        return card;
    }

    // 2. Display all content items, applying current filters
    function displayContent() {
        if (!contentList) return;
        contentList.innerHTML = '';
        const selectedCategory = filterCategory ? filterCategory.value : 'all';
        const selectedLanguage = filterLanguage ? filterLanguage.value : 'all';

        const filteredItems = contentItems.filter(item => {
            const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
            const languageMatch = selectedLanguage === 'all' || item.language === selectedLanguage;
            return categoryMatch && languageMatch;
        });

        if (filteredItems.length === 0) {
            contentList.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color:#ccc;">No content items match the current filters.</p>';
            return;
        }

        filteredItems.forEach(item => {
            contentList.appendChild(renderCard(item));
        });
    }

    // 3. Populate filter dropdowns based on current content
    function populateFilters() {
        if (!filterCategory || !filterLanguage) return;

        const categories = [...new Set(contentItems.map(item => item.category))];
        const languages = [...new Set(contentItems.map(item => item.language))];

        // Clear existing options (except 'All')
        filterCategory.querySelectorAll('option:not([value="all"])').forEach(opt => opt.remove());
        filterLanguage.querySelectorAll('option:not([value="all"])').forEach(opt => opt.remove());

        // Add options
        categories.forEach(cat => {
            const opt = new Option(cat, cat);
            filterCategory.appendChild(opt);
        });

        languages.forEach(lang => {
            const opt = new Option(lang, lang);
            filterLanguage.appendChild(opt);
        });
    }


    // --- Event Listeners ---

    const contentForm = document.getElementById('content-form');
    if (contentForm) {
        // Handle form submission (logging new content)
        contentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newItem = {
                title: document.getElementById('title').value,
                category: document.getElementById('category').value,
                language: document.getElementById('language').value,
                timestamp: Date.now()
            };

            contentItems.unshift(newItem); // Add to the beginning
            localStorage.setItem('contentItems', JSON.stringify(contentItems));

            // Clear the form and re-render the display and filters
            contentForm.reset();
            populateFilters();
            displayContent();
        });
    }

    // Handle filtering
    if (filterCategory) filterCategory.addEventListener('change', displayContent);
    if (filterLanguage) filterLanguage.addEventListener('change', displayContent);

    // Clear filters function (called by the button)
    window.clearFilters = () => {
        if (filterCategory) filterCategory.value = 'all';
        if (filterLanguage) filterLanguage.value = 'all';
        displayContent();
    };

    // --- Initialization ---
    populateFilters();
    displayContent();
});