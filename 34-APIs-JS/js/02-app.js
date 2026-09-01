document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Ya es visible');
            }
        });
    });

    observar.observe(document.querySelector('.premium'));
});
