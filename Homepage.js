document.addEventListener('DOMContentLoaded', () => {
    const contentList = document.getElementById('content-list');
    const filterCategory = document.getElementById('filter-category');

    // Default items
    const defaultItems = [
        {
            title: 'ಕವಿತೆಗಳು',
            titleEn: 'Poetry',
            category: 'Poetry',
            summary: "Expressive verses that capture the essence of emotions and life's simple, profound moments.",
            iconFile: 'assets/Feather Quill.png'
        },
        {
            title: 'ಸೀರಿಯಲ್',
            titleEn: 'Serial',
            category: 'Serial',
            summary: "Engaging narratives and character-driven plays that brings the character alive.",
            iconFile: 'assets/Theater Masks.png'
        },
        {
            title: 'ಹಾಡುಗಳು',
            titleEn: 'Songs',
            category: 'Songs',
            summary: "Creative Audio content spanning varied genres, designed for engaging modern audiences. Lyrics suitable for classical Music, Rap, Pop and Cenima",
            iconFile: 'assets/Mobile Phone Play.png'
        },
        {
            title: 'ಸಣ್ಣ ಕಥೆಗಳು',
            titleEn: 'Series',
            category: 'Series',
            summary: "A fun, bridge-building Series for K-Drama lovers with Indain slang adding local context.",
            iconFile: 'assets/Speech Bubble.png'
        },
         {
            title: 'ಚಲನಚಿತ್ರ',
            titleEn: 'Cinema',
            category: 'Cinema',
            summary: "Insights, scripts, and discussions diving into the world of storytelling on the silver screen.",
            iconFile: 'assets/Film Reel.png'
        }
    ];

    // Load items from localStorage
    let contentItems = JSON.parse(localStorage.getItem('contentItemsDarkFantasy'));
    if (!contentItems || contentItems.length === 0) {
        contentItems = defaultItems;
        localStorage.setItem('contentItemsDarkFantasy', JSON.stringify(contentItems));
    }

    function renderCard(item) {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.setAttribute('data-category', item.category);

        let iconHtml = item.iconFile ? `<img src="${item.iconFile}" alt="${item.titleEn}" class="category-icon">` : '';

        card.innerHTML = `
            ${iconHtml}
            <h3>${item.title}</h3>
            <p class="card-meta">${item.titleEn}</p>
            <p class="card-summary">${item.summary || ''}</p>
        `;
        return card;
    }

    function displayContent() {
        if (!contentList) return;
        contentList.innerHTML = '';
        const selectedCategory = filterCategory ? filterCategory.value : 'all';

        const filteredItems = contentItems.filter(item => {
            return selectedCategory === 'all' || item.category === selectedCategory;
        });

        if (filteredItems.length === 0) {
            contentList.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color:#ccc;">No content found.</p>';
            return;
        }

        filteredItems.forEach(item => {
            contentList.appendChild(renderCard(item));
        });
    }

    function populateFilters() {
        if (!filterCategory) return;

        const categories = [...new Set(contentItems.map(item => item.category))];
        filterCategory.querySelectorAll('option:not([value="all"])').forEach(opt => opt.remove());

        categories.forEach(cat => {
            const opt = new Option(cat, cat);
            filterCategory.appendChild(opt);
        });
    }

    if (filterCategory) filterCategory.addEventListener('change', displayContent);

    window.clearFilters = () => {
        if (filterCategory) filterCategory.value = 'all';
        displayContent();
    };

    populateFilters();
    displayContent();
});
