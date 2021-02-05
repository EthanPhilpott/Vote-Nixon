"use strict"

const READING_SPEED = 250 / 10

const script = {
    START: `Today is my first day at West-Mec Highschool!
    I am so exited to meet new poeple and make new freinds`,
    TEST1: `This is a test branch, 
    test branch one to be exact`,
    TEST2: `This is a test branch,
    test branch two to be exact`,
    TEST3: `Try me
    Nerd`
}

const REFERENCES = [
    new Reference ('_root'        ,  0, null, START),
    new Reference ("Go down Test1",  1,    0, TEST1),
    new Reference ("Go down Test2",  2,    0, TEST2),
    new Reference ("Go down Test3",  3,    1, SCRIPT.TEST3)
]

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

let treeRoot;
FormTreeStruct()
console.log(treeRoot)





