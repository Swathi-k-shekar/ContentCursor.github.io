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
            title: 'ಸಣ್ಣ ಕಥೆಗಳು',
            titleEn: 'Series',
            category: 'Series',
            summary: "A fun, bridge-building Series for K-Drama lovers with Indain slang adding local context.",
            iconFile: 'assets/Speech Bubble.png'
        },
        {
            title: 'ಚಲನಚಿತ್ರ ಗೀತೆಗಳು',
            titleEn: 'Cinema Songs',
            category: 'Cinema Songs',
            summary: "Insights, scripts, and discussions diving into the world of storytelling on the silver screen.",
            iconFile: 'assets/Film Reel.png'
        }
    ];

    // Use default items and overwrite localStorage to ensure correct cards are displayed
    let contentItems = defaultItems;
    localStorage.setItem('contentItemsDarkFantasy', JSON.stringify(contentItems));

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

        card.addEventListener('click', () => {
            if (item.category === 'Poetry') {
                window.open('https://www.instagram.com/sapnaaradnyaig', '_blank');
                window.open('https://www.youtube.com/@sapnaaradnyaYT/shorts', '_blank');
            } else if (item.category === 'Cinema Songs') {
                window.location.href = 'cinema.html';
            }
        });

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
