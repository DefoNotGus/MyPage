// script.js

// Smooth scroll to section
function scrollToSection(sectionId) {
    const navHeight = document.querySelector('header').offsetHeight;
    const element = document.getElementById(sectionId);
    const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}

// Change header look on scroll
window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
});

// Trigger fade-in effect on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.section').forEach(section => {
        if (window.scrollY + window.innerHeight > section.offsetTop) {
            section.classList.add('visible');
        }
    });
});

// Fetch projects from JSON and populate grid
function loadProjects() {
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.innerHTML = `
                    <a href="${project.link}" target="_blank">
                        <img src="${project.img}" alt="${project.title}">
                        <h2>${project.title}</h2>
                        <p>${project.description}</p>
                    </a>
                `;
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
}

// Fetch hobbies from JSON and populate grid
function loadHobbies() {
    fetch('hobbies.json')
        .then(response => response.json())
        .then(hobbies => {
            const hobbiesContainer = document.getElementById('hobbies-container');
            hobbiesContainer.innerHTML = "";
            hobbies.forEach(hobby => {
                const hobbyCard = document.createElement('div');
                hobbyCard.classList.add('hobby-card');
                hobbyCard.style.backgroundColor = hobby.colour;
                hobbyCard.innerHTML = `
                    <a href="${hobby.link}" target="_self" style="text-decoration: none; color: inherit;">
                        <span>${hobby.name}</span>
                    </a>
                `;
                hobbiesContainer.appendChild(hobbyCard);
            });
        })
        .catch(error => console.error('Error loading hobbies:', error));
}

// Navigation button highlight on scroll
function updateActiveButton() {
    const sections = document.querySelectorAll('.section');
    const navButtons = document.querySelectorAll('nav button');
    const scrollPosition = window.scrollY + (window.innerHeight / 3);
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            navButtons.forEach(button => {
                button.classList.toggle('active', button.textContent.toLowerCase() === section.id);
            });
        }
    });
}

// Konami code rain effect
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

function activateRainEffect() {
    document.body.style.backgroundImage = 'url(images/rain2.gif)';
    document.body.style.color = 'white';
    document.querySelectorAll('h1, h2').forEach(el => el.style.color = 'white');
    document.body.style.cursor = 'url(images/cursor.cur), auto';
    createRandomAnimations();
    const rainImage = new Image();
    rainImage.src = 'images/rain2.gif';
    rainImage.onload = () => {
        document.body.style.backgroundImage = `url(${rainImage.src})`;
        document.body.style.opacity = '1.2';
    };
    ['.project-card', '.honours-project', '.hobbies-banner', 'form'].forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.backgroundColor = '#320f39';
        });
    });
}

function createRandomAnimations() {
    const animationCount = 50;
    const animationDuration = 3000;
    for (let i = 0; i < animationCount; i++) {
        const animationElement = document.createElement('div');
        animationElement.classList.add('konami-animation');
        document.body.appendChild(animationElement);
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const randomSize = Math.random() * 50 + 20;
        animationElement.style.left = `${randomX}px`;
        animationElement.style.top = `${randomY}px`;
        animationElement.style.width = `${randomSize}px`;
        animationElement.style.height = `${randomSize}px`;
        animationElement.style.backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
        animationElement.animate([
            { transform: 'scale(0)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(1.2)', opacity: 0.5 },
            { transform: 'scale(0)', opacity: 0 }
        ], { duration: animationDuration, iterations: 1, easing: 'ease-in-out' });
        setTimeout(() => animationElement.remove(), animationDuration);
    }
}

// Logo popup
document.addEventListener('DOMContentLoaded', () => {
    const logoLink = document.getElementById('logoLink');
    const popup = document.getElementById('imagePopup');
    const closeBtn = document.querySelector('.close-btn');
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        popup.style.display = 'block';
    });
    closeBtn.addEventListener('click', () => popup.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === popup) popup.style.display = 'none';
    });
});

// Konami popup
function showKonamiPopup() {
    const popup = document.createElement('div');
    popup.classList.add('konami-popup');
    popup.innerHTML = `<p>Konami code available <br> <a href="#" id="konami-popup-link">click here to see.</a></p>`;
    document.body.appendChild(popup);
    document.getElementById('konami-popup-link').addEventListener('click', (e) => {
        e.preventDefault();
        activateRainEffect();
        popup.remove();
    });
    setTimeout(() => { if (document.body.contains(popup)) popup.remove(); }, 5000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadHobbies();
    showKonamiPopup();
});
window.addEventListener('scroll', updateActiveButton);
document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateRainEffect(); // Call activateRainEffect directly
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});