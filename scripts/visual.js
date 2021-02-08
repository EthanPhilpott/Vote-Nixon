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
            if (typeof ref.parentId === "object")
                for (let parent of ref.parentId)
                    Search(parent).children.push(ref);
            else Search(ref.parentId).children.push(ref);
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
    /spawn //background kitchen.jpg/*Huff Huff* I'm off mom!
    /speaker Mom/Don't forget your breakfast, honey! I don't want you to be hungry on your first day of school!
    /speaker You/Okay Mom!
    /background house.png//speaker Thoughts/I can't belive I am almost late on my first day of school!
    /background school.png/*Whew* I made it on time. The bell is going to ring soon, I best get going.
    I hope I didn't forget anyhting at home.
    /background hallway.png/Where am I? I need to find a map or something.
    /speaker Yuri//spawn friend.png/Um.. excuse me, you look lost. C-Can I help you?`,
    HELP: `/speaker You/Oh! You see, I'm new here and I don't quite know my way around yet. I am looking for Classroom A-2.
    /speaker Yuri/That would be just down the hall, around the coner, and the first door on the left.
    /speaker You/Thank you so much, I don't want to be late for class! I'll be off now! Thanks again for your help!
    /speaker Yuri/Of course`,
    NO_HELP: `/speaker You/No thank you, I can handle this by myself.
    /speaker Yuri/Oh, sorry. I-I didn't mean to bother or anything!
    /speaker You/Don't worry about it.
    /spawn //background classroom.png//speaker Thoughts/See? I found it all on my own. I don't need anyones help.`,
    CLASSROOM: `/spawn //background classroom.png//speaker Thoughts/My goodness, there is a lot of people in here. I starting to get a little nervous.
    I hope none of them are staring at me, that would be just awful.
    They are staring at me aren't they? I can feel their peering eyes all over my body.
    God, this is awful. I hate being the person who stands out.
    They have already formed their own social groups, am I'm the odd person out.
    I'm starting ot stress out. What am I going to do? Please, something come save me!
    /spawn nixon.png//speaker Nixon/Hey, are you new here?
    /speaker ALERT/I am obligated to inform you that I commisioned this beautiful artwork of Richard Nixon from Alisson Corrales
    and that she does some amazing work on her instagram: divine_bunny. Please check her out! Anyway, back to it!
    /speaker Nixon/Hey, are you okay?
    /speaker You/Oh! Yes, sorry I was spacing out and yes I am new here.
    /speaker Thoughts/It felt like I just went through an ad, thats strange.
    /speaker Nixon/Thats cool. I'm Nixon, Richard Nixon that is. Nice to meet you.
    /speaker You/Nice to meet you, Nixon.
    /audio bell.mp3/
    Oh, I guess it's time for class to start, we better take our seats.
    /speaker Nixon/You're right.
    I'll talk to you later, okay?
    /speaker You/Okay!
    /spawn //speaker Thoughts/I'm less nervous now, but my heart still hurts. What is going on?
    He's cute, like really cute. I think he would make a good pope.
    What am I thinking? I need to sit down before the teacher comes in here.
    /spawn teacher.png//speaker Teacher/Okay class, lets get started.
    Looks like we have a new student,
    could you come up to the front of the class and introduce yourself?
    /speaker You/Sure.
    My name is...
    /speaker Thoughts/Oh crap, I forgot my name I'm so nervous!
    What is my name again?`,
    I_FORGOT1: `/speaker You/My name is ███████, it is nice to meet you all!`,
    I_FORGOT2: `/speaker Thoughts/*Whew* I that was nerveracking!
    /speaker Teacher/Thank you, now, go pick an empty seat somewhere. I don't care where.
    /spawn nixon.png//speaker Nixon/Hey! You can sit next to me!
    /speaker Thoughts/Should, I accept his offer?
    He's cute, but I don't know anything about him!
    He could be a crook for all I know.`,
    ACCEPT_OFFER: `/speaker You/Sure!
    /speaker Thoughts/I don't know what compeled me to do it, but I said yes.
    I don't know if it was the right choice or not, but I guess only time will tell.
    /speaker Nixon/Yay! Take a seat right here!
    /speaker You/Okay!`,
    REFUSE_OFFER: `/Speaker You/No.. thanks for offering, though.
    /speaker Thoughts/Gosh! Why did I say that? Now he looks all sad. I hope I didn't hurt his feelings.
    Man, the people around him are laughing at him, I feel really bad now.
    Whatever, can't change anything now unless I want to replay the whole story again.
    I guess I'll just take the seat in the back next to the window.`,
};

const REFERENCES = [
    new Reference("_root", 0, null, SCRIPT.START),
    new Reference("Yes, I'm a little lost", 1, 0, SCRIPT.HELP),
    new Reference("No, I can handle this myself", 2, 0, SCRIPT.NO_HELP),
    new Reference("_classroom", 3, [1, 2], SCRIPT.CLASSROOM),
    new Reference("I forgot", 4, 3, SCRIPT.I_FORGOT1),
    new Reference("to implement", 5, 3, SCRIPT.I_FORGOT1),
    new Reference("this feauture", 6, 3, SCRIPT.I_FORGOT1),
    new Reference("_joinName", 7, [6, 5, 4], SCRIPT.I_FORGOT2),
    new Reference("Sure", 8, 7, SCRIPT.ACCEPT_OFFER),
    new Reference("No thanks", 9, 7, SCRIPT.REFUSE_OFFER),
];

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
                    switch (full[0]) {
                        case "speaker":
                            speaker.innerHTML = full[1];
                            break;
                        case "background":
                            main.style.backgroundImage = `url(images/backgrounds/${full[1]})`;
                            break;
                        case "spawn":
                            if (characterBox.children[0])
                                characterBox.children[0].remove();
                            if (full[1] !== "") {
                                let char = AddClasses(
                                    document.createElement("img"),
                                    ["char"]
                                );
                                char.src = `images/characters/${full[1]}`;
                                characterBox.appendChild(char);
                            }
                            break;
                        case "audio":
                            new Audio(`audio/${full[1]}`).play();
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
            option.innerHTML = `<p>${children[child].choice}</p>`;
            option.value = child;
            option.addEventListener("click", Choose);
            choiceBox.appendChild(option);
        }
    } else {
        currTree = currTree.children[0];
        console.log(currTree);
        canClick = true;
        scriptArrIndex = 0;
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
