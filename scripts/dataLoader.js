document.addEventListener("DOMContentLoaded", () => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(response => response.json())
        .then(posts => {
            const cardItems = posts.map((post, index) => ({
                [`item-${index + 1}`]: {
                    title: post.title,
                    description: post.body,
                    image: "img/134006.png"
                }
            }))
                .reduce((acc, card) => ({ ...acc, ...card }), {});
            function generateCardTemplate({ title, description, image }) {
                return `
                    <div class="card">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-text">${description}</p>
                        <img src="${image}" alt="${title}" class="card-image">
                    </div>
                `;
            }
            function showCard(cardData) {
                const cardContainer = document.querySelector('.card-container');
                if (!cardContainer) {
                    console.error('Container for cards not found.');
                    return;
                }
                cardContainer.innerHTML = generateCardTemplate(cardData);
            }
            function manageSlideClicks() {
                const slides = document.querySelectorAll('.slide-item');
                if (slides.length > 0) {
                    slides[0].classList.add('active');
                    showCard(cardItems['item-1']);
                }
                slides.forEach((slide, index) => {
                    slide.addEventListener('click', () => {
                        slides.forEach(s => s.classList.remove('active'));
                        slide.classList.add('active');
                        const itemKey = `item-${index + 1}`;
                        if (cardItems[itemKey]) {
                            showCard(cardItems[itemKey]);
                        } else {
                            console.error(`Item with key ${itemKey} not found.`);
                        }
                    });
                });
            }
            manageSlideClicks();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});