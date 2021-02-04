"use strict"

const READING_SPEED = 250 / 10
let inProcess = false;

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
            setTimeout(() => {index++; inProcess = false;}, si.value);
            break;
        // Add more events
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
    new Line ('text', 'Culpa', 1000),
    new Line ('text', 'Enim', 1000),
    new Line ("pause", 100000),
    new Line ("choice", ["Hello", "World", "Nerd"]),
    new Line ("fadeText", null, 500),
    new Line ('revealText', 'speaker', 500)
]


