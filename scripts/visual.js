"use strict"

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
    let letterIndex = 0;
    let id = setInterval (() => {
        if (letterIndex >= line.length) {
            clearInterval (id)
        } else {
            WriteLetter(line[letterIndex])
            letterIndex++;
        }
    }, READING_SPEED)
}

function Choice (children) {
    for (let child of children) {
        let option = AddClasses(document.createElement('div'), ['choice']);
        option.innerHTML = child.choice
    }
}

function Recur (tree) {
    let scriptArr = tree.script.split('\n'); 
    let scriptArrIndex = 0;
    window.addEventListener('click', () => {
        if (scriptArr.length - 1 < scriptArrIndex) Choice(tree.children)
        else {
            textBody.innerHTML = '';
            ReadLine (scriptArr[scriptArrIndex])
            scriptArrIndex++;
        }
    })
}
Recur(treeRoot);





