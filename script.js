// ===== STATE MANAGEMENT =====
let categories = [];
let currentCategoryIndex = 0;
let selectedWinner = null;

// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById('loading-screen');
const nomineesScreen = document.getElementById('nominees-screen');
const winnerScreen = document.getElementById('winner-screen');
const categoryTitle = document.getElementById('category-title');
const nomineesGrid = document.getElementById('nominees-grid');
const winnerCategory = document.getElementById('winner-category');
const winnerImageContainer = document.getElementById('winner-image-container');
const winnerCaption = document.getElementById('winner-caption');
const nextCategoryBtn = document.getElementById('next-category-btn');

// ===== INITIALIZATION =====
async function init() {
    try {
        // Fetch categories from server
        const response = await fetch('/api/categories');
        categories = await response.json();

        if (categories.length === 0) {
            alert('Nenhuma categoria encontrada! Por favor, adicione pastas com imagens na pasta "categories".');
            return;
        }

        // Hide loading screen
        loadingScreen.classList.add('hidden');

        // Show first category
        showNominees();
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        loadingScreen.innerHTML = `
            <div class="loading-spinner"></div>
            <p style="color: #d4af37; text-align: center; max-width: 600px; padding: 2rem;">
                Erro ao carregar categorias. Certifique-se de que o servidor está rodando.<br><br>
                Execute: <code style="background: rgba(212,175,55,0.2); padding: 0.5rem; border-radius: 4px;">node server.js</code>
            </p>
        `;
    }
}

// ===== DISPLAY NOMINEES =====
function showNominees() {
    const category = categories[currentCategoryIndex];

    // Update category title
    categoryTitle.textContent = category.name;

    // Clear previous nominees
    nomineesGrid.innerHTML = '';

    // Create nominee cards
    category.nominees.forEach((nominee, index) => {
        const card = createNomineeCard(nominee, index);
        nomineesGrid.appendChild(card);
    });

    // Show nominees screen
    winnerScreen.classList.remove('active');
    nomineesScreen.classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== CREATE NOMINEE CARD =====
function createNomineeCard(nominee, index) {
    const card = document.createElement('div');
    card.className = 'nominee-card';
    card.setAttribute('data-index', index);

    const imageContainer = document.createElement('div');
    imageContainer.className = 'nominee-image-container';

    const image = document.createElement('img');
    image.className = 'nominee-image';
    image.src = nominee.path;
    image.alt = nominee.caption;
    image.loading = 'lazy';

    // Handle image load errors
    image.onerror = () => {
        image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%231a1a1a" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23d4af37" font-family="Arial" font-size="16"%3EImagem não encontrada%3C/text%3E%3C/svg%3E';
    };

    const caption = document.createElement('p');
    caption.className = 'nominee-caption';
    caption.textContent = nominee.caption;

    imageContainer.appendChild(image);
    card.appendChild(imageContainer);
    card.appendChild(caption);

    // Add click handler
    card.addEventListener('click', () => selectWinner(index));

    return card;
}

// ===== SELECT WINNER =====
function selectWinner(index) {
    const category = categories[currentCategoryIndex];
    selectedWinner = category.nominees[index];

    // Update winner screen
    winnerCategory.textContent = `Vencedora da categoria ${category.name}`;
    winnerCaption.textContent = selectedWinner.caption;

    // Clear and update winner image
    winnerImageContainer.innerHTML = '';
    const winnerImage = document.createElement('img');
    winnerImage.className = 'winner-image';
    winnerImage.src = selectedWinner.path;
    winnerImage.alt = selectedWinner.caption;

    winnerImageContainer.appendChild(winnerImage);

    // Show winner screen with animation
    nomineesScreen.classList.remove('active');
    setTimeout(() => {
        winnerScreen.classList.add('active');
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
}

// ===== NEXT CATEGORY =====
function nextCategory() {
    currentCategoryIndex++;

    if (currentCategoryIndex >= categories.length) {
        // All categories completed
        showFinalScreen();
    } else {
        // Show next category
        selectedWinner = null;
        showNominees();
    }
}

// ===== FINAL SCREEN =====
function showFinalScreen() {
    winnerScreen.classList.remove('active');

    const finalScreen = document.createElement('div');
    finalScreen.className = 'screen active';
    finalScreen.innerHTML = `
        <div class="winner-container">
            <h2 class="category-title" style="font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 2rem;">
                Stickers Awards 2024
            </h2>
            <div class="trophy-icon" style="font-size: 8rem; margin: 2rem 0;">🏆</div>
            <p style="font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.5rem); color: var(--color-gold); text-align: center; margin-bottom: 2rem;">
                Todas as categorias foram premiadas!
            </p>
            <button class="next-btn" onclick="location.reload()">Recomeçar</button>
        </div>
    `;

    document.querySelector('.container').appendChild(finalScreen);
}

// ===== EVENT LISTENERS =====
nextCategoryBtn.addEventListener('click', nextCategory);

// ===== START APPLICATION =====
init();
