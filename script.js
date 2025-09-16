document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos necessários
    const comicStrip = document.querySelector('.comic-strip');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageIndicator = document.getElementById('page-indicator');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const comicViewer = document.querySelector('.comic-viewer');

    const pages = document.querySelectorAll('.comic-page');
    const totalPages = pages.length;
    let currentPage = 0;

    // --- FUNÇÕES PRINCIPAIS ---

    function goToPage(pageNumber) {
        currentPage = pageNumber;
        const offset = -currentPage * (100 / totalPages);
        comicStrip.style.transform = `translateX(${offset}%)`;

        // Reseta e re-aplica animações dos painéis da página atual
        const currentPageElement = pages[currentPage];
        const panels = currentPageElement.querySelectorAll('.panel');
        panels.forEach(panel => {
            panel.style.animation = 'none';
            panel.offsetHeight; // Truque para forçar o browser a "resetar" a animação
            panel.style.animation = '';
        });

        updateUI();
    }
    
    function updateUI() {
        // Atualiza o contador de páginas
        pageIndicator.textContent = `Página ${currentPage + 1} de ${totalPages}`;

        // Atualiza o estado dos botões de navegação
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }

    function nextPage() {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        }
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            // Entra em tela cheia no container da HQ
            comicViewer.requestFullscreen().catch(err => {
                alert(`Erro ao tentar ativar tela cheia: ${err.message}`);
            });
        } else {
            // Sai da tela cheia
            document.exitFullscreen();
        }
    }

    // --- EVENT LISTENERS (EVENTOS) ---

    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Event listener para navegação pelo teclado
    document.addEventListener('keydown', (event) => {
        // Verifica se o foco não está em um campo de texto
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        if (event.key === 'ArrowRight') {
            nextPage();
        } else if (event.key === 'ArrowLeft') {
            prevPage();
        }
    });

    // --- INICIALIZAÇÃO ---
    // Inicia a UI com os valores corretos assim que a página carrega
    goToPage(0);
});