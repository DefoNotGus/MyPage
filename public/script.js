// script.js

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Change background color dynamically based on the section in view
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (section.id === 'home') {
                document.body.style.backgroundColor = '#f5f5f5'; // Light grey
            } else if (section.id === 'about') {
                document.body.style.backgroundColor = '#e3f2fd'; // Light blue
            } else if (section.id === 'contact') {
                document.body.style.backgroundColor = '#ffebee'; // Light pink
            }
        }
    });
});
