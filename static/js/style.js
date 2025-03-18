// Add this to your thoughts.js file or create a new JS file

document.addEventListener('DOMContentLoaded', function() {
    // Generate random stars
    createStars();
    
    // Handle message auto-dismiss
    setTimeout(function() {
        let messages = document.getElementById('msg');
        if (messages) {
            let alert = new bootstrap.Alert(messages);
            alert.close();
        }
    }, 3000);
});

// Function to create stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numStars = 100;
    
    // Remove existing static stars
    const existingStars = document.querySelectorAll('.star');
    existingStars.forEach(star => star.remove());
    
    // Create new dynamic stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Random size
        const size = Math.random() * 2 + 1;
        
        // Random twinkle delay
        const delay = Math.random() * 5;
        
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = delay + 's';
        
        starsContainer.appendChild(star);
    }
    
    // Add parallax effect
    window.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX / window.innerWidth) * 15;
        const moveY = (e.clientY / window.innerHeight) * 15;
        
        starsContainer.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    });
}

// Scroll effect for stars - creates parallax movement on scroll
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const starsContainer = document.querySelector('.stars');
    starsContainer.style.transform = `translateY(${scrollY * 0.2}px)`;
});