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
let maxehp = ehp;
let wins = 0;
let waitTime = 1;
let timer = 0;
let elv = 1;
let lv = 1;
let exp = 0;
let exprequired = 100;
document.getElementById("wincounter").innerHTML = "số lần thắng: " + JSON.stringify(wins);
if (localStorage.getItem("wins") != null) {
    wins = parseInt(localStorage.getItem("wins"));
}
if (localStorage.getItem("lv") != null) {
    lv = parseInt(localStorage.getItem("lv"));
    exp = parseInt(localStorage.getItem("exp"));
    exprequired = lv * 100;
    maxhp = lv * hp;
}
elv = Math.floor(Math.random() * wins + 1);
ehp = elv * 10;
maxehp = ehp;
hp = maxhp;
let chp = hp;
let cehp = ehp;
exprequired = lv * 100;
console.log(lv);
console.log(exp);
let randomNumber;
let randomLetters = [];
randomNumber = Math.max(Math.floor(Math.random() * (lv / 5)), 5);
setInterval(function() {
    chp = lerp(hp, chp);
    document.getElementById("health-bar").style.width = (400 * (chp / maxhp)).toString() + "px"
}, 40);
if (lv >= 5) {
    randomize();
    document.getElementById("special").innerHTML = "các chữ cái đặc biệt(đánh mạnh hơn 1,25 lần): ";
    let count = 0;
    while (count < randomNumber - 1) {
        document.getElementById("special").innerHTML += String(randomLetters[count]) + ", ";
        count++;
    }
    document.getElementById("special").innerHTML += String(randomLetters[count]);
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
document.getElementById("wincounter").innerHTML = "số lần thắng: " + JSON.stringify(wins);
document.getElementById("enemystats").innerHTML = "chuột level " + JSON.stringify(elv);
document.getElementById("health-text").innerHTML = (hp * 10).toString() + " HP"
document.getElementById("enemy-health-text").innerHTML = (ehp / maxehp * 100).toString() + "%"
document.getElementById("exp-bar").style.width = (400 * (exp / exprequired)).toString() + "px"
document.getElementById("exp-text").innerHTML = JSON.stringify(exp) + "/" + JSON.stringify(exprequired) + " | Lv." + lv.toString()
function findword()
{
    var ahit = new Audio("hitHurt.wav")
    ahit.play();
    let what = document.getElementById("inputt").value;
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
        document.getElementById("notif").innerHTML = "bạn đã gây " + damage.toString() + " máu!"
    }
    else if (map.get(what) == undefined)
    {
        document.getElementById("notif").innerHTML = "từ không hợp lệ"
    }
    else
    {
        document.getElementById("notif").innerHTML = "từ đã được sử dụng."
    }
    hp = hp - 1;
    if (ehp <= 0) {
        var aexp = new Audio("explosion.wav");
        aexp.play();
        document.getElementById("btn").disabled = true;
        document.getElementById("notif").innerHTML = "chiến thắng"
        ehp = 0;
        wins = wins + 1;
        exp += lv * 10;
        if (exp >= exprequired) {
            exp -= exprequired;
            lv++;
            maxhp = lv * 10;
            hp = maxhp;
            document.getElementById("exp-text").innerHTML = JSON.stringify(exp) + "/" + JSON.stringify(exprequired) + " | Lv." + lv.toString()
        }
        
        document.getElementById("wincounter").innerHTML = "số lần thắng: " + JSON.stringify(wins);
        document.getElementById("exp-bar").style.width = (400 * (exp / exprequired)).toString() + "px"
        document.getElementById("exp-text").innerHTML = JSON.stringify(exp) + "/" + JSON.stringify(exprequired) + " | Lv." + lv.toString()
        let timeout = setTimeout(newEnemy, 1500);
        map = new Map();
        console.log(lv)
        console.log(exp)
    }
    if (hp <= 0) {
        var asynth = new Audio("synth.wav")
        asynth.play();
        document.body.classList.remove("oofanimate");
        void document.body.offsetWidth;
        document.body.classList.add("oofanimate");
        document.getElementById("btn").disabled = true;
        document.getElementById("notif").innerHTML = "bạn đã chết";
        let timeout = setTimeout(newEnemy, 1500);
        map = new Map();
    }
    document.getElementById("health-text").innerHTML = (hp * 10).toString() + " HP"
    document.getElementById("enemy-health-text").innerHTML = (ehp / maxehp * 100).toString() + "%"
}
function save() {
    console.log("saved")
    console.log(lv)
    console.log(exp)
    localStorage.setItem("wins", JSON.stringify(wins));
    localStorage.setItem("lv", JSON.stringify(lv));
    localStorage.setItem("exp", JSON.stringify(exp));
    
}
let interval2;
interval2 = setInterval(function() {
    cehp = lerp(ehp, cehp);
    document.getElementById("enemy-health-bar").style.width = (400 * (cehp / maxehp)).toString() + "px"
}, 40);
function newEnemy() {
    randomNumber = Math.max(Math.floor(Math.random() * (lv / 5)), 5);
    if (lv >= 5) {
        randomize();
        document.getElementById("special").innerHTML = "các chữ cái đặc biệt(đánh mạnh hơn 1,25 lần): ";
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
    document.getElementById("enemystats").innerHTML = "chuột level " + JSON.stringify(elv);
    document.getElementById("health-text").innerHTML = (hp * 10).toString() + " HP"
    document.getElementById("enemy-health-text").innerHTML = (ehp / maxehp * 100).toString() + "%"
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