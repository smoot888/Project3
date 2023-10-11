// script.js
function openImage(imgElement) {
    var overlay = document.getElementById('overlay');
    var overlayImage = document.getElementById('overlay-image');
    overlay.style.display = 'block';
    overlayImage.src = imgElement.src;
}

function closeImage() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}
