"use strict"

const nicetry = new Audio ("audio/nicetry.mp3")

auto.addEventListener('click', () => {
    nicetry.play()
})

// Major props to this article for the tree structure
// https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/

class Reference {
    constructor (choice, id, parentId, script) {
        this.choice = choice;
        this.script = script;
        this.children = [];
        this.parentId = parentId;
        this.id = id;
    }
}

function Search (searchId) {
    for (let obj of REFERENCES) {
        if (obj.id === searchId)
            return obj;
    }
}

function FormTreeStruct () {
    for (let ref of REFERENCES) {
        if (ref.parentId !== null) {
            Search(ref.parentId).children.push(ref);
        } else {
            treeRoot = ref;
        }
    }
}

function WriteLetter (letter) {
    textBody.innerHTML += letter
}

function AddClasses (html, classArr) {
    for (let class_ of classArr)
        html.classList.add(class_);
    return html;
}

const READING_SPEED = 250 / 10

const SCRIPT = {
    START: `Today is my first day at West-Mec Highschool!
    I am so exited to meet new poeple and make new freinds!`,
    TEST1: `This is a test branch, 
    test branch one to be exact`,
    TEST2: `This is a test branch,
    test branch two to be exact`,
    TEST3: `Try me
    Nerd`
}

const REFERENCES = [
    new Reference ('_root'        ,  0, null, SCRIPT.START),
    new Reference ("Go down Test1",  1,    0, SCRIPT.TEST1),
    new Reference ("Go down Test2",  2,    0, SCRIPT.TEST2),
    new Reference ("Go down Test3",  3,    1, SCRIPT.TEST3)
]

let treeRoot;
FormTreeStruct()

// EXE

function ReadLine (line) {
    canClick = false;
    let letterIndex = 0;
    let id = setInterval (() => {
        if (letterIndex >= line.length) {
            clearInterval (id)
            canClick = true;
        } else {
            WriteLetter(line[letterIndex])
            letterIndex++;
        }
    }, READING_SPEED)
}

function Choose () {
    currTree = currTree.children[this.value];
    scriptArrIndex = 0;
    for (let child of [...choiceBox.children]) {
        child.removeEventListener('click', Choose)
        child.remove()
    }
    canClick = true;
}

function Choice (children) {
    canClick = false;
    for (let child = 0; child < children.length; child++) {
        let option = AddClasses(document.createElement('div'), ['choice']);
        option.value = child;
        option.innerHTML = `<p>${children[child].choice}</p>`;
        option.value = child;
        option.addEventListener('click', Choose)
        choiceBox.appendChild(option);
    }
}

let currTree = treeRoot
let scriptArrIndex = 0;
let canClick = true;

window.addEventListener('click', () => {
    if (canClick) {
        let scriptArr = currTree.script.split('\n'); 
        if (scriptArr.length - 1 < scriptArrIndex) Choice(currTree.children)
        else {
            textBody.innerHTML = '';
            ReadLine (scriptArr[scriptArrIndex])
            scriptArrIndex++;
        }
    } 
})

document.body.addEventListener('contextmenu', (e) => {e.preventDefault()})

