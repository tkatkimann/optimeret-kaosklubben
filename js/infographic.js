"use strict";

// Få alle ikoner og bobler
const icons = document.querySelectorAll('.icon');
const bubbles = document.querySelectorAll('.bubble');

// Event listener på ikonerne
icons.forEach(icon => {
    icon.addEventListener('click', () => {
        console.log("Ikon klikket: ", icon);  
        bubbles.forEach(bubble => {
            bubble.classList.remove('active');
        });

        const bubbleId = icon.getAttribute('data-bubble');
        const targetBubble = document.getElementById(bubbleId);

        if (targetBubble) {
            console.log("Viser boble: ", targetBubble);  
            targetBubble.classList.add('active');
        }
    });
});


