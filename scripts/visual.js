"use strict"

const READING_SPEED = 250 / 5 / 60 / 1000

function SetAuto () {
    
}

function WriteLetter () {

}

function NextLine () {
    index++;
    if (typeof script[index] === 'object') {

    }
}

let enabledAuto = false;
let line = 0;
let index = 0;
auto.addEventListener('click', () => {
    if (!enabledAuto) {
        enabledAuto = true;
        let id = setInterval(() => {
            if (script[index] === undefined) {
                NextLine()
            }
            WriteLetter(script[index]);
        }, READING_SPEED);
    }
    else {
        clearInterval(id)
        enabledAuto = false
    }
    SetAuto()
})

let script = []