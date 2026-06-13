document.addEventListener('DOMContentLoaded', () => {
    const cinemaList = document.getElementById('cinema-list');

    const cinemaStories = [
        {
            title: 'The Silent Echo',
            description: 'A psychological thriller about a sound engineer who records a murder but cannot convince anyone what he heard.'
        },
        {
            title: 'Neon Shadows',
            description: 'A cyberpunk tale set in a futuristic Bangalore where a rogue AI attempts to write the perfect screenplay.'
        },
        {
            title: 'Roots of the Banyan',
            description: 'A heartfelt drama following three generations of a family as they navigate the changing landscapes of Karnataka.'
        }
    ];

    function renderCinemaItem(item) {
        const li = document.createElement('li');
        li.className = 'cinema-item';

        li.innerHTML = `
            <div class="cinema-title">${item.title}</div>
            <div class="cinema-desc">${item.description}</div>
        `;
        return li;
    }

    if (cinemaList) {
        cinemaStories.forEach(story => {
            cinemaList.appendChild(renderCinemaItem(story));
        });
    }
});