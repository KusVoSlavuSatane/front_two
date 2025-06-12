document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.getElementById('openModal');
    const modalBox = document.getElementById('registrationModal');
    const backdrop = document.querySelector('.modal-backdrop');

    openModalButton.addEventListener('click', function() {
        modalBox.classList.add('active');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    document.getElementById('confirmBtn').addEventListener('click', function() {
        closeModal();
    });

    document.getElementById('closeBtn').addEventListener('click', function() {
        closeModal();
    });

    backdrop.addEventListener('click', function(event) {
        if (event.target === backdrop) {
            closeModal();
        }
    });

    function closeModal() {
        modalBox.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
});