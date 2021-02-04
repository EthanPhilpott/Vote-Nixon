"use strict"

const READING_SPEED = 250 / 10
let inProcess = false;
let autoPlay = false;

window.addEventListener('click', () => {
    if (!inProcess) NextLine()
})

function WriteLetter (letter) {
    textBody.innerHTML += letter;
}

function NextLine () {
    let si = script[index];
    inProcess = true;
    switch (si.type) {
        case 'text':
            textBody.innerHTML = '';
            let dn = Date.now();
            let i = 0;
            let id = setInterval(() => {
                if (i >= si.value.length) {
                    if (autoPlay) {
                        setTimeout(() => {
                            index++;
                            inProcess = false
                        }, si.autoPlayPause);
                    } else {
                        index++;
                        inProcess = false
                    }
                    clearInterval(id);
                } else {
                    WriteLetter(si.value[i])
                    i++
                }
            }, READING_SPEED);
            break;
        case 'pause':
            setTimeout(() => {
                index++; 
                inProcess = false;
            }, si.value)
            break;
        case 'fadeText':
            fadeBox.style.opacity = 0;
            setTimeout(() => {
                index++;
                inProcess = false;
            }, 500 + si.autoPlayPause);
            break;
        case 'revealText':
            speaker.innerHTML = si.value;
            fadeBox.style.opacity = 1;
            setTimeout(() => {
                index++;
                inProcess = false
            }, 500 + si.autoPlayPause);
            break;
        case 'choice':
            inProcess = false;
            index++;
            break;
        default:
            inProcess = false;
            index++;
            break;
    }
}

let line = 0;
let index = 0;

class Line {
    constructor (type, value, autoPlayPause=0) {
        this.type = type;
        this.value = value;
        this.autoPlayPause = autoPlayPause;
    }
}

let script = [
    new Line ('text', "I'm off to my first day of school at ", 1000),
    new Line ('text', 'Enim', 1000),
    new Line ("pause", 1000),
    new Line ("fadeText", null, 500),
    new Line ('revealText', 'You', 500)
]



