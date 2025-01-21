// script.js

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Change background colour dynamically based on the section in view
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navButtons = document.querySelectorAll('nav button');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Update background colour
            if (section.id === 'home') {
                document.body.style.backgroundColor = '#f5f5f5';
            } else if (section.id === 'about') {
                document.body.style.backgroundColor = '#e3f2fd';
            } else if (section.id === 'contact') {
                document.body.style.backgroundColor = '#ffebee';
            }

            // Add 'visible' class for fade-in effect
            section.classList.add('visible');

            // Update active button in navigation
            navButtons.forEach(button => {
                button.classList.toggle('active', button.textContent === section.querySelector('h1').textContent);
            });
        }
    });
});

// Trigger initial fade-in effect
window.addEventListener('load', () => {
    document.querySelectorAll('.section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY + window.innerHeight > sectionTop) {
            section.classList.add('visible');
        }
    });
});