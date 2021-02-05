"use strict"

let cursorHtml = document.createElement('div');
cursorHtml.classList.add('cursor');
document.body.appendChild(cursorHtml);
window.addEventListener('mousemove', (e) => {
    if (e.clientY + cursorHtml.getBoundingClientRect().height/2 < window.innerHeight) cursorHtml.style.top = e.clientY - cursorHtml.getBoundingClientRect().height/2 + 'px';
    if (e.clientX + cursorHtml.getBoundingClientRect().width/2 < window.innerWidth) cursorHtml.style.left = e.clientX - cursorHtml.getBoundingClientRect().width/2 + 'px';
})