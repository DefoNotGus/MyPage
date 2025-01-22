// script.js

// Smooth scroll to section
function scrollToSection(sectionId) {
    const navHeight = document.querySelector('header').offsetHeight;
    const element = document.getElementById(sectionId);
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}


// Change header look on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Dynamic background colour change on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + (window.innerHeight / 2);
    
    // Define the background colors for different sections
    const sectionColours = {
        home: '#f5f5f5',
        about: '#F2F5E9',
        contact: '#f8f9fa'
    };
    
    // Find the current active section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            // Apply background color smoothly
            document.body.style.backgroundColor = sectionColours[section.id];
            
            // Update active navigation button
            const navButtons = document.querySelectorAll('nav button');
            navButtons.forEach(button => {
                button.classList.toggle('active', 
                    button.textContent.toLowerCase() === section.id);
            });
        }
    });
});


// Trigger fade-in effect on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY + window.innerHeight > sectionTop) {
            section.classList.add('visible');
        }
    });
});

// Fetch projects from the JSON file and populate the grid
function loadProjects() {
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');

            // Generate project cards
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
        .catch(error => {
            console.error('Error loading projects:', error);
        });
}


// Call the function on page load
document.addEventListener('DOMContentLoaded', loadProjects);

// Fetch hobbies from the JSON file and populate the grid
function loadHobbies() {
    fetch('hobbies.json') // Ensure hobbies.json is accessible from the root folder
        .then(response => response.json())
        .then(hobbies => {
            const hobbiesContainer = document.getElementById('hobbies-container');
            hobbiesContainer.innerHTML = ""; // Clear container before adding cards

            hobbies.forEach(hobby => {
                // Create a div for each hobby
                const hobbyCard = document.createElement('div');
                hobbyCard.classList.add('hobby-card');
                hobbyCard.style.backgroundColor = hobby.colour; // Assign colour

                // Add the HTML content with the title and link
                hobbyCard.innerHTML = `
                    <a href="${hobby.link}" target="_self" style="text-decoration: none; color: inherit;">
                        <span>${hobby.name}</span>
                    </a>
                `;

                hobbiesContainer.appendChild(hobbyCard); // Add to the container
            });
        })
        .catch(error => {
            console.error('Error loading hobbies:', error);
        });
}


// Call the function on page load
document.addEventListener('DOMContentLoaded', loadHobbies);

// Update the background color change logic in script.js
function updateBackgroundColor(section) {
    const sectionColours = {
        home: '#f5f5f5',
        about: '#e3f2fd',
        contact: '#ffebee'
    };
    
    document.body.style.backgroundColor = sectionColours[section.id] || '#ffffff';
}

// Navigation Button Highlight
function updateActiveButton() {
    const sections = document.querySelectorAll('.section');
    const navButtons = document.querySelectorAll('nav button');
    const scrollPosition = window.scrollY + (window.innerHeight / 3);

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            navButtons.forEach(button => {
                if (button.textContent.toLowerCase() === section.id) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveButton);


// Add to script.js
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateRainEffect();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateRainEffect() {
    document.body.style.backgroundImage = 'url(images/rain.gif)';
}

document.addEventListener('DOMContentLoaded', function() {
    const logoLink = document.getElementById('logoLink');
    const popup = document.getElementById('imagePopup');
    const closeBtn = document.querySelector('.close-btn');

    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside the image
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});
