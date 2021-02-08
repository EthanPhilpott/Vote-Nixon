"use strict";

const nicetry = new Audio("audio/nicetry.mp3");

auto.addEventListener("click", () => {
    nicetry.play();
});

// Major props to this article for the tree structure
// https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/

class Reference {
    constructor(choice, id, parentId, script) {
        this.choice = choice;
        this.script = script;
        this.children = [];
        this.parentId = parentId;
        this.id = id;
    }
}

function Search(searchId) {
    for (let obj of REFERENCES) {
        if (obj.id === searchId) return obj;
    }
}

function FormTreeStruct() {
    for (let ref of REFERENCES) {
        if (ref.parentId !== null) {
            Search(ref.parentId).children.push(ref);
        } else {
            treeRoot = ref;
        }
    }
}

function WriteLetter(letter) {
    textBody.innerHTML += letter;
}

function AddClasses(html, classArr) {
    for (let class_ of classArr) html.classList.add(class_);
    return html;
}

const READING_SPEED = 250 / 10;

const SCRIPT = {
    START: `Good morning, honey! I hope you slept well.
    /speaker You/*Yawn* Good morning.
    /speaker Mom/You need to get up, honey. It's almost time for your first day of school!
    /speaker You/What time is it?
    /speaker Mom/I told you, its almost time for school. You have about 1 minute before you need to leave.
    /speaker You/WHAT?? I need to get ready! Get out Mom, I'm changing!
    /spawn /`,
};

const REFERENCES = [new Reference("_root", 0, null, SCRIPT.START)];

let treeRoot;
FormTreeStruct();

// EXE

function ReadLine(line) {
    canClick = false;
    let toggle = false;
    let full = "";
    let letterIndex = 0;
    let id = setInterval(() => {
        if (letterIndex >= line.length) {
            clearInterval(id);
            canClick = true;
        } else {
            if (line[letterIndex] === "/") {
                if (toggle) {
                    full = full.split(" ");
                    console.log(full);
                    switch (full[0]) {
                        case "speaker":
                            speaker.innerHTML = full[1];
                            break;
                        case "background":
                            main.style.backgroundImage = `url(images/backgrounds/${full[1]})`;
                            break;
                        case "spawn":
                            if (characterBox.children)
                                characterBox.children[0].remove();
                            if (full[1] !== "") {
                                let char = AddClasses(
                                    document.createElement("img"),
                                    ["char"]
                                );
                                char.src = `images/characters/${full[1]}`;
                                characterBox.appendChild(char);
                            }
                    }
                    toggle = false;
                    full = "";
                } else {
                    toggle = true;
                }
            } else {
                if (toggle) {
                    full += line[letterIndex];
                } else {
                    WriteLetter(line[letterIndex]);
                }
            }
            letterIndex++;
        }
    }, READING_SPEED);
}

function Choose() {
    currTree = currTree.children[this.value];
    scriptArrIndex = 0;
    for (let child of [...choiceBox.children]) {
        child.removeEventListener("click", Choose);
        child.remove();
    }
    canClick = true;
}

function Choice(children) {
    canClick = false;
    if (children.length > 1) {
        for (let child = 0; child < children.length; child++) {
            let option = AddClasses(document.createElement("div"), ["choice"]);
            option.value = child;
            option.innerHTML = `<p>${children[child].choice}</p>`;
            option.value = child;
            option.addEventListener("click", Choose);
            choiceBox.appendChild(option);
        }
    } else {
        currTree = children[0];
    }
}

let currTree = treeRoot;
let scriptArrIndex = 0;
let canClick = true;

window.addEventListener("click", () => {
    if (canClick) {
        let scriptArr = currTree.script.split("\n");
        if (scriptArr.length - 1 < scriptArrIndex) Choice(currTree.children);
        else {
            textBody.innerHTML = "";
            ReadLine(scriptArr[scriptArrIndex]);
            scriptArrIndex++;
        }
    }
});

document.body.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
