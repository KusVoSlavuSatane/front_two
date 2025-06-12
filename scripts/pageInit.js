document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');

    loadingScreen.style.opacity = '0';
    loadingScreen.style.pointerEvents = 'none';

    setTimeout(function() {
        loadingScreen.style.display = 'none';
    }, 500);
});