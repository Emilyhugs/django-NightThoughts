
// Twinkling Stars Background Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create stars container
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.querySelector('.main-bg').prepend(starsContainer);
    
    // Configuration for stars
    const config = {
        starCount: 150,         // Total number of stars
        minSize: 1,             // Minimum star size in pixels
        maxSize: 3,             // Maximum star size in pixels
        minDuration: 3,         // Minimum twinkle animation duration in seconds
        maxDuration: 8          // Maximum twinkle animation duration in seconds
    };
    
    // Create stars with random properties
    for (let i = 0; i < config.starCount; i++) {
        createStar(starsContainer, config);
    }
    
    // Create a new star with random properties
    function createStar(container, options) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size between min and max
        const size = options.minSize + Math.random() * (options.maxSize - options.minSize);
        
        // Random animation duration
        const duration = options.minDuration + Math.random() * (options.maxDuration - options.minDuration);
        
        // Random delay for animation start
        const delay = Math.random() * 5;
        
        // Apply styles
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        // Add star to container
        container.appendChild(star);
    }
});