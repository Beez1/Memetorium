document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close');

    // Sample image URLs (replace with actual URLs)
    const sampleImages = [
        'https://via.placeholder.com/600x400?text=Image+1',
        'https://via.placeholder.com/600x400?text=Image+2',
        'https://via.placeholder.com/600x400?text=Image+3',
        'https://via.placeholder.com/600x400?text=Image+4',
        'https://via.placeholder.com/600x400?text=Image+5'
    ];

    sampleImages.forEach((imageUrl, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Image ${index + 1}`;
        img.classList.add('gallery-image');

        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
        
        // Add event listener for lightbox functionality
        galleryItem.addEventListener('click', function() {
            lightboxImage.src = img.src;
            lightbox.style.display = 'block';
        });
    });

    // Close lightbox when the close button or outside of the image is clicked
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImage) {
            lightbox.style.display = 'none';
        }
    });
});
