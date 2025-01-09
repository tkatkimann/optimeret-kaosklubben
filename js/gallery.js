"use strict"; // Gør JavaScript-streng tilstand aktiv

let galleryData = []; // Global variabel til at gemme data
let currentIndex = 0; // Start med det første element

// Hent data fra JSON-filen
fetch('./gallery.json') // Ændret til korrekt sti
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP-fejl! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        galleryData = Object.values(data); // Gem data som en array
        displayContent(); // Vis det første element
    })
    .catch(error => {
        console.error('Fejl ved hentning af data:', error);
    });

// Funktion til at vise aktuelt indhold (billede eller video)
function displayContent() {
    const contentDiv = document.getElementById('gallery-content');
    const description = document.getElementById('description');
    
    if (!galleryData[currentIndex]) {
        console.error('Ingen data til det nuværende index:', currentIndex);
        return;
    }

    const currentItem = galleryData[currentIndex];
    contentDiv.innerHTML = ''; // Ryd tidligere indhold
    
    // Opret og indsæt billede eller video
    if (currentItem.type === 'image') {
        const img = document.createElement('img');
        img.src = `img/portfolio/${currentItem.file}`;
        img.alt = currentItem.titel || 'Galleri billede';
        contentDiv.appendChild(img);
    } else if (currentItem.type === 'video') {
        const video = document.createElement('video');
        video.src = `img/portfolio/${currentItem.file}`;
        video.controls = true;
        contentDiv.appendChild(video);
    }

    // Opdater beskrivelsen
    description.textContent = currentItem.kort_beskrivelse || 'Ingen beskrivelse tilgængelig.';
}

// Navigationsknapper
document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    displayContent();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryData.length;
    displayContent();
});
