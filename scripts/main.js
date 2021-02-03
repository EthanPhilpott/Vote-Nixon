"use strict"

obamaSlide.style.width = '50vw'
nixonSlide.style.width = '50vw'

obamaSlide.addEventListener('click', () => {
    if ((Number(obamaSlide.style.width.replace('vw', '')) - 5) / 100 * window.innerWidth > 350) {
        obamaSlide.style.width = (Number(obamaSlide.style.width.replace('vw', '')) - 5) + 'vw';
        nixonSlide.style.width = (Number(nixonSlide.style.width.replace('vw', '')) + 5) + 'vw'
    } else {
        obamaSlide.style.width = 0;
        nixonSlide.style.width = '100vw'
        obamaSlide.style.display = "none";
        for (let child of obamaSlide.children) {
            child.style.display = "none";
            child.style.display = "none";
        }
        setTimeout(() => {
            FadeOpening()
        }, 1000);
    }
})

nixonSlide.addEventListener('click', () => {
    obamaSlide.style.width = 0;
    for (let child of obamaSlide.children) {
        child.style.opacity = 0;
        child.style.opacity = 0;
    }
    nixonSlide.style.width = '100vw'
    obamaSlide.style.display = "none";
    for (let child of obamaSlide.children) {
        child.style.display = "none";
        child.style.display = "none";
    }

    setTimeout(() => {
        FadeOpening()
    }, 1000);
})

function FadeOpening () {
    nixonSlide.style.opacity = 0;
    for (let child of nixonSlide.children) {
        child.style.opacity = 0;
        child.style.opacity = 0;
    }
    obamaSlide.style.display = "none";
    for (let child of obamaSlide.children) {
        child.style.display = "none";
        child.style.display = "none";
    }
}