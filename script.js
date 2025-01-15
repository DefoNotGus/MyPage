// Smoothly scroll to a section based on its ID
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Use smooth scrolling with the horizontal offset
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
        });

        // Add active animation effect to the current section
        highlightSection(section);
    }
}

// Apply a fade-in effect to the section being shown
function highlightSection(section) {
    // Remove fade effect from all sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.opacity = 0.5;  // Default lower opacity for hidden sections
    });

    // Apply full-opacity to the current section
    section.style.opacity = 1;
}

// Add event listener to ensure active section logic is dynamically applied when scrolling
document.addEventListener('scroll', () => {
    // Get the current horizontal scroll position
    const currentScroll = window.scrollX;

    // Iterate over each section and adjust opacity based on view
    document.querySelectorAll('.section').forEach(section => {
        const sectionLeft = section.offsetLeft;
        const sectionRight = sectionLeft + section.offsetWidth;

        // If the section is in view, set as active
        if (currentScroll >= sectionLeft && currentScroll < sectionRight) {
            highlightSection(section);
        }
    });
});
