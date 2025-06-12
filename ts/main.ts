interface PostData {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface CardInfo {
    title: string;
    description: string;
    image: string;
}

type CardCollection = Record<string, CardInfo>;

document.addEventListener("DOMContentLoaded", (): void => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then((response: Response): Promise<PostData[]> => response.json())
        .then((posts: PostData[]): void => {
            const cardCollection: CardCollection = posts
                .map((post: PostData, index: number): { [key: string]: CardInfo } => ({
                    [`item-${index + 1}`]: {
                        title: post.title,
                        description: post.body,
                        image: "img/134006.png"
                    }
                }))
                .reduce((acc: CardCollection, card: { [key: string]: CardInfo }): CardCollection => ({ ...acc, ...card }), {});

            function createCardTemplate({ title, description, image }: CardInfo): string {
                return `
                    <div class="card">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-text">${description}</p>
                        <img src="${image}" alt="${title}" class="card-image">
                    </div>
                `;
            }

            function displayCard(cardData: CardInfo): void {
                const cardContainer: HTMLElement | null = document.querySelector('.card-container');
                if (!cardContainer) {
                    console.error('Container for cards not found.');
                    return;
                }
                cardContainer.innerHTML = createCardTemplate(cardData);
            }

            function handleSlideClicks(): void {
                const slides: NodeListOf<HTMLElement> = document.querySelectorAll('.slide-item');

                if (slides.length === 0) {
                    console.error('No slides found.');
                    return;
                }

                slides.forEach((s: HTMLElement): void => s.classList.remove('active'));
                slides[0].classList.add('active');
                displayCard(cardCollection['item-1']);

                slides.forEach((slide: HTMLElement, index: number): void => {
                    slide.addEventListener('click', (): void => {
                        slides.forEach((s: HTMLElement): void => s.classList.remove('active'));
                        slide.classList.add('active');

                        const itemKey: string = `item-${index + 1}`;
                        if (cardCollection[itemKey]) {
                            displayCard(cardCollection[itemKey]);
                        } else {
                            console.error(`Item with key ${itemKey} not found.`);
                        }
                    });
                });
            }

            handleSlideClicks();
        })
        .catch((error: unknown): void => {
            console.error('Error fetching data:', error);
        });
});