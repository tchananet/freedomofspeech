document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.querySelector('.jsx-1074408410.root-wrapper');
    if (!viewer) return;

    const images = Array.from(viewer.querySelectorAll('img'));
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    // Set initial image visibility
    images.forEach((img, index) => {
        img.parentElement.style.opacity = index === currentIndex ? '1' : '0';
    });

    const showImage = (index) => {
        images.forEach((img, i) => {
            img.parentElement.style.opacity = i === index ? '1' : '0';
        });
    };

    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.clientX;
        viewer.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        const diffX = currentX - startX;

        // Adjust sensitivity
        if (Math.abs(diffX) > 20) { // Change image every 20 pixels of drag
            if (diffX > 0) { // Dragging right
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            } else { // Dragging left
                currentIndex = (currentIndex + 1) % images.length;
            }
            showImage(currentIndex);
            startX = currentX; // Reset startX to prevent rapid changes
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
        viewer.style.cursor = 'grab';
    };

    viewer.addEventListener('mousedown', handleMouseDown);
    viewer.addEventListener('mousemove', handleMouseMove);
    viewer.addEventListener('mouseup', handleMouseUp);
    viewer.addEventListener('mouseleave', handleMouseUp); // End drag if mouse leaves viewer
});
