document.addEventListener('DOMContentLoaded', () => {
    const contentForm = document.getElementById('content-form');
    const contentList = document.getElementById('content-list');
    const filterCategory = document.getElementById('filter-category');
    const filterLanguage = document.getElementById('filter-language');

    // Load items from localStorage
    let contentItems = JSON.parse(localStorage.getItem('contentItems')) || [];

    // --- Core Functions ---

    // 1. Render a single content card
    function renderCard(item) {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.innerHTML = `
            <h4 class="card-title">${item.title}</h4>
            <div class="card-details">
                <span>Category: ${item.category}</span>
                <span>Language/Tech: ${item.language}</span>
            </div>
            <p>Logged: ${new Date(item.timestamp).toLocaleDateString()}</p>
        `;
        return card;
    }

    // 2. Display all content items, applying current filters
    function displayContent() {
        contentList.innerHTML = '';
        const selectedCategory = filterCategory.value;
        const selectedLanguage = filterLanguage.value;

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

    // Handle filtering
    filterCategory.addEventListener('change', displayContent);
    filterLanguage.addEventListener('change', displayContent);

    // Clear filters function (called by the button)
    window.clearFilters = () => {
        filterCategory.value = 'all';
        filterLanguage.value = 'all';
        displayContent();
    };


    // --- Initialization ---

    populateFilters();
    displayContent();
});document.addEventListener('DOMContentLoaded', () => {
    const contentForm = document.getElementById('content-form');
    const contentList = document.getElementById('content-list');
    const filterCategory = document.getElementById('filter-category');
    const filterLanguage = document.getElementById('filter-language');

    // Load items from localStorage
    let contentItems = JSON.parse(localStorage.getItem('contentItems')) || [];

    // --- Core Functions ---

    // 1. Render a single content card
    function renderCard(item) {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.innerHTML = `
            <h4 class="card-title">${item.title}</h4>
            <div class="card-details">
                <span>Category: ${item.category}</span>
                <span>Language/Tech: ${item.language}</span>
            </div>
            <p>Logged: ${new Date(item.timestamp).toLocaleDateString()}</p>
        `;
        return card;
    }

    // 2. Display all content items, applying current filters
    function displayContent() {
        contentList.innerHTML = '';
        const selectedCategory = filterCategory.value;
        const selectedLanguage = filterLanguage.value;

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

    // Handle filtering
    filterCategory.addEventListener('change', displayContent);
    filterLanguage.addEventListener('change', displayContent);

    // Clear filters function (called by the button)
    window.clearFilters = () => {
        filterCategory.value = 'all';
        filterLanguage.value = 'all';
        displayContent();
    };


    // --- Initialization ---

    populateFilters();
    displayContent();
});
