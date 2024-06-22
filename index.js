//import obj from './dictionart/words_dictionary.json' assert {type: 'json'}
let obj;
fetch ("./dictionart/words_dictionary.json", 
    {method: 'GET',
    headers: {
        'Accept': 'application/json',
    }})
    .then((res) => res.json())
    .then((data) => {
        obj = data;
    })
let map = new Map();
let hp = 10;
let maxhp = 10;
let ehp = 10;
let maxehp = 10;
let wins = 0;
let waitTime = 1;
let timer = 0;
let elv = 1;
let lv = 1;
let exp = 0;
let exprequired = 100;
let randomNumber;
let randomLetters = [];
let check = true;
setInterval(() => {
    if (!check) {
        window.addEventListener("beforeunload", beforeUnloadHandler);
    }
    else {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
    }
}, 20);
document.addEventListener("DOMContentLoaded", () => document.body.className = "")
if (localStorage.getItem("wins") != null) {
    wins = parseInt(localStorage.getItem("wins"));
}
if (localStorage.getItem("lv") != null && localStorage.getItem("exp") != null) {
    lv = parseInt(localStorage.getItem("lv"));
    exp = parseInt(localStorage.getItem("exp"));
    exprequired = lv * 100;
    maxhp = lv * 10;
    hp = lv * 10;
}
let chp = hp;
let cehp = ehp;
setInterval(function() {
    chp = lerp(hp, chp);
    document.getElementById("health-bar").style.width = (400 * (chp / maxhp)).toString() + "px"
}, 40);
randomNumber = Math.max(Math.floor(Math.random() * (lv / 5)), 5);
if (lv >= 5) {
    randomize();
    document.getElementById("special").innerHTML = "special letters: ";
    let count = 0;
    while (count < randomNumber - 1) {
        document.getElementById("special").innerHTML += String(randomLetters[count]) + ", ";
        count++;
    }
    document.getElementById("special").innerHTML += String(randomLetters[count]);
}
elv = Math.floor(Math.random() * wins + 1);
ehp = elv * 10;
maxehp = ehp;
document.getElementById("wincounter").innerHTML = "wins: " + JSON.stringify(wins);
document.getElementById("enemystats").innerHTML = "level " + JSON.stringify(elv) + " goblin";
document.getElementById("health-text").innerHTML = (hp * 10).toString() + " HP"
document.getElementById("enemy-health-text").innerHTML = (ehp / maxehp * 100).toString() + "%"
document.getElementById("health-bar").style.width = (400 * (hp / maxhp)).toString() + "px"
document.getElementById("enemy-health-bar").style.width = (400 * (ehp / maxehp)).toString() + "px"
document.getElementById("exp-bar").style.width = (400 * (exp / exprequired)).toString() + "px"
document.getElementById("exp-text").innerHTML = JSON.stringify(exp) + "/" + JSON.stringify(exprequired) + " | Lv." + lv.toString()
function findword()
{
    check = false;
    var ahit = new Audio("hitHurt.wav")
    ahit.play();
    let what = document.getElementById("inputt").value.toLowerCase();
    if (obj[what] !== undefined && map.get(what) == undefined)
    {
        let damage = what.length * lv;
        let cnt = 0;
        let extra = false;
        while (cnt < what.length && lv >= 5) {
            if (randomLetters.includes(what.charAt(cnt))) {
                damage *= 1.25;
                extra = true;
            }
            cnt++;
        }
        if (extra == true) {
            let apup = new Audio("powerUp.wav");
            apup.play();
        }
        ehp = ehp - damage;
        map.set(what, 1);
        document.getElementById("notif").innerHTML = "you dealt " + damage.toString() + " damage!"
    }
    else if (map.get(what) == undefined)
    {
        document.getElementById("notif").innerHTML = "invalid word."
    }
    else
    {
        document.getElementById("notif").innerHTML = "word already used."
    }
    hp = hp - 1;
    if (ehp <= 0) {
        var aexp = new Audio("explosion.wav");
        aexp.play();
        document.getElementById("btn").disabled = true;
        document.getElementById("notif").innerHTML = "victory"
        document.getElementById("enemy-health-bar").style.width = "0px"
        ehp = 0;
        exp += elv * 10;
        wins = wins + 1;
        if (exp >= exprequired) {
            exp -= exprequired;
            lv++;
            document.getElementById("lv").innerHTML = "lv" + lv.toString();
            maxhp = lv * 10;
            exprequired += 100;
        }
        document.getElementById("wincounter").innerHTML = "wins: " + JSON.stringify(wins);
        document.getElementById("exp-bar").style.width = (300 * (exp / exprequired)).toString() + "px"
        document.getElementById("exp-text").innerHTML = JSON.stringify(exp) + "/" + JSON.stringify(exprequired) + " | Lv." + lv.toString()
        let timeout = setTimeout(newEnemy, 1500);
        map = new Map();
    }
    else if (hp <= 0) {
        var asynth = new Audio("synth.wav")
        asynth.play();
        document.body.classList.remove("oofanimate");
        void document.body.offsetWidth;
        document.body.classList.add("oofanimate");
        document.getElementById("btn").disabled = true;
        document.getElementById("notif").innerHTML = "you died";
        let timeout = setTimeout(newEnemy, 1500);
        map = new Map();
    }
    document.getElementById("health-text").innerHTML = (hp * 10).toString() + " HP"
    document.getElementById("enemy-health-text").innerHTML = Math.floor(ehp / maxehp * 100).toString() + "%"
}
function save() {
    localStorage.setItem("wins", JSON.stringify(wins));
    localStorage.setItem("lv", JSON.stringify(lv));
    localStorage.setItem("exp", JSON.stringify(exp));
    check = true;
}
let interval2;
interval2 = setInterval(function() {
    cehp = lerp(ehp, cehp);
    document.getElementById("enemy-health-bar").style.width = (400 * (cehp / maxehp)).toString() + "px"
}, 40);
function newEnemy() {
    randomNumber = Math.max(Math.floor(Math.random() * (lv / 5)), 5);
    if (lv >= 5) {
        document.getElementById("special").innerHTML = "special letters: ";
        randomize();
        let count = 0;
        while (count < randomNumber - 1) {
            document.getElementById("special").innerHTML += String(randomLetters[count]) + ", ";
            count++;
        }
        document.getElementById("special").innerHTML += String(randomLetters[count]);
    }
    document.getElementById("btn").disabled = false;
    elv = Math.floor(Math.random() * wins + 1);
    maxehp = elv * 10;
    ehp = elv * 10;
    hp = maxhp;
    clearInterval(interval2);
    interval2 = setInterval(function() {
        cehp = lerp(ehp, cehp);
        document.getElementById("enemy-health-bar").style.width = (400 * (cehp / maxehp)).toString() + "px"
    }, 40);
    document.getElementById("enemystats").innerHTML = "level " + JSON.stringify(elv) + " goblin";
    document.getElementById("health-text").innerHTML = (hp * 10).toString() + " HP"
    document.getElementById("enemy-health-text").innerHTML = (ehp / maxehp * 100).toString() + "%"
}
function randomize() {
    let count = 0;
    randomLetters = new Array();
    while (count < randomNumber) {
        let n = Math.round(Math.random() * 25 + 97);
        randomLetters[count] = String.fromCharCode(n).charAt(0);
        count++;
    }
}
function lerp (start, end){
    return 0.8 * start + 0.2 * end;
}
document.getElementById("btn").onclick = function(){findword()}
document.getElementById("save").onclick = function(){save()}
var input = document.getElementById("inputt");
input.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        findword();
    }
})
const beforeUnloadHandler = (event) => {
    event.preventDefault();
    event.returnValue = true;
}
