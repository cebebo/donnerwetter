let results = [];
let audio = [
    new Audio('./audio/ballon.mp3'),   // 0
    new Audio('./audio/flugzeug.mp3'),  // 1
    new Audio('./audio/elster.mp3'),    // 2
    new Audio('./audio/sturm.mp3'),     // 3
    new Audio('./audio/regen.mp3'),     // 4
    new Audio('./audio/blitz.mp3'),     // 5
    new Audio('./audio/regenbogen.mp3'), // 6
    new Audio('./audio/plus.mp3'),      // 7
    new Audio('./audio/minus.mp3'),      // 8
    new Audio('./audio/sichern.mp3')      // 9
];
let team_1 = [0, 'blue'];
let team_2 = [0, 'red'];
let team_3 = [0, 'yellow'];
let team_4 = [0, 'green'];
let team_5 = [0, 'orange'];
let team_6 = [0, 'purple'];
let teamColor = ['blue', 'red', 'yellow', 'green', 'orange', 'purple', 'turquoise', 'pink', 'brown', 'grey'];
let chosenColors = [];

let activeTeam = 1;
let amountTeams = 4;
let currentPoints = 0;
let jackpot = 0;
let clouds = 55;
let cloudCounter = 0;
let endgame = false;


function startGame(amount) {
    document.getElementById('background').innerHTML = startHTML;
    amountTeams = amount;
    generateSky();
}


function restartGame() {
    document.getElementById('background').innerHTML = restartHTML;
    resetAll();
}


function resetAll() {
    team_1 = [0, 'blue'];
    team_2 = [0, 'red'];
    team_3 = [0, 'yellow'];
    team_4 = [0, 'green'];
    team_5 = [0, 'orange'];
    team_6 = [0, 'purple'];
    chosenColors = [];
    activeTeam = 1;
    amountTeams = 4;
    currentPoints = 0;
    jackpot = 0;
    clouds = 55;
    cloudCounter = 0;
    endgame = false;
}


function generateSky() {
    const sky = document.getElementById('sky');
    sky.innerHTML = ''; 
    curPointsNull()
    generateTeams();
    takeColorsFromTeams();
    shuffleResults();
    deleteColorInPoints();
    changeColorInPoints();
    for (let i = 0; i < clouds; i++) {
        let pickResult = loadResult(i);
        let cloudMove = randomClouds()
        sky.innerHTML += generateSkyHTML(i, cloudMove, results, pickResult);
    }
}


function generateTeams() {
    let side = '';
    for (let i = 1; i <= amountTeams; i++) {
        if (i % 2 === 0) { side = 'right'; } else { side = 'left'; }
        document.getElementById(`${side}`).innerHTML += generateTeamsHTML(i, teamColor);
    }
    showArrowOnActiveTeam();
}


function takeColorsFromTeams() {
    chosenColors = [];
    for (let i = 1; i <= amountTeams; i++) {
        if (i == 1) chosenColors.push(team_1[1]);
        else if (i == 2) chosenColors.push(team_2[1]);
        else if (i == 3) chosenColors.push(team_3[1]);
        else if (i == 4) chosenColors.push(team_4[1]);
        else if (i == 5) chosenColors.push(team_5[1]);
        else if (i == 6) chosenColors.push(team_6[1]);
    }
}


function changeTeamManual(team) {
    activeTeam = team;
    showArrowOnActiveTeam();
    deleteColorInPoints();
    changeColorInPoints();
}


function curPointsNull() {
    currentPoints = 0;
    showCurrentPoints();
}


function showCurrentPoints() {
    document.getElementById('currentPoints').innerText = currentPoints;
}


function randomClouds() {
    const rnd = Math.floor(Math.random() * 3);
    if (rnd === 0) return 'cloud_up';
    else if (rnd === 1) return 'cloud_down';
    else return '';
}


function cloudReaction(result, i) {
    playSound(result);
    document.getElementById(`cloud-${i}`).classList.add('fade_out');
    document.getElementById(`nr-${i}`).classList.add('fade_out');
    document.getElementById(`res-${i}`).classList.add('fade_in');
    calculateResult(result);
    cloudCounter++;
    if (cloudCounter == clouds) { endgame = true; }
    if (endgame) {
        if (result != 'elster') { endGame(); }
    }
}


function playSound(result) {
    switch (result) {
        case 'm20': audio[8].play(); break;
        case 'p20': audio[7].play(); break;
        case 'p50': audio[7].play(); break;
        case 'p80': audio[7].play(); break;
        case 'p100': audio[7].play(); break;
        case 'p150': audio[7].play(); break;
        case 'blitz':
            audio[5].play();
            document.getElementById('background').classList.add('thunderstorm');
            setTimeout(() => {
                document.getElementById('background').classList.remove('thunderstorm');
            }, 3500);
            break;
        case 'regen': audio[4].play(); break;
        case 'sturm': audio[3].play(); break;
        case 'elster': audio[2].play(); break;
        case 'flugzeug': audio[1].play(); break;
        case 'ballon': audio[0].play(); break;
        case 'regenbogen': audio[6].play(); break;
    }
}


function loadResult(i) {
    switch (results[i]) {
        case 'm20':
            return `<div class="points minus">-20</div>`;
        case 'p20':
            return `<div class="points plus">20</div>`;
        case 'p50':
            return `<div class="points plus">50</div>`;
        case 'p80':
            return `<div class="points plus">80</div>`;
        case 'p100':
            return `<div class="points plus">100</div>`;
        case 'p150':
            return `<div class="points plus">150</div>`;
        case 'blitz':
            return `<img src="./img/blitz.png">`;
        case 'regen':
            return `<img src="./img/regen.png">`;
        case 'sturm':
            return `<img src="./img/sturm.png">`;
        case 'elster':
            return `<img src="./img/elster.png">`;
        case 'flugzeug':
            return `<img src="./img/flugzeug.png">`;
        case 'ballon':
            return `<img src="./img/ballon.png">`;
        case 'regenbogen':
            return `<img src="./img/regenbogen.png">`;
    }
}


function shuffleResults() {
    results = [];
    for (let j = 0; j < 55; j++) {
        const rand = Math.floor(Math.random() * 36);
        if (rand <= 5) results.push('m20');
        else if (rand <= 11) results.push('p20');
        else if (rand <= 16) results.push('p50');
        else if (rand <= 21) results.push('p80');
        else if (rand <= 24) results.push('p100');
        else if (rand === 25) results.push('p150');
        else if (rand <= 26) results.push('blitz');
        else if (rand <= 28) results.push('regen');
        else if (rand <= 30) results.push('sturm');
        else if (rand <= 32) results.push('elster');
        else if (rand <= 33) results.push('flugzeug');
        else if (rand <= 34) results.push('ballon');
        else results.push('regenbogen');
    }
    checkResults();
}


function checkResults() {
    if (results.filter(result => result === 'blitz').length < 4 || results.filter(result => result === 'blitz').length > 7) {
        shuffleResults();
    }
}


function calculateResult(result) {
    switch (result) {
        case 'm20':
            currentPoints -= 20;
            if (currentPoints < 0) currentPoints = 0;
            break;
        case 'p20': currentPoints += 20; break;
        case 'p50': currentPoints += 50; break;
        case 'p80': currentPoints += 80; break;
        case 'p100': currentPoints += 100; break;
        case 'p150': currentPoints += 150; break;
        case 'blitz': blitz(); break;
        case 'regen': regen(); break;
        case 'sturm': sturm(); break;
        case 'elster': elster(); break;
        case 'flugzeug': flugzeug(); break;
        case 'ballon': ballon(); break;
        case 'regenbogen': regenbogen(); break;
    }
    showCurrentPoints();
}


function nextTeam() {
    activeTeam++;
    if (activeTeam > amountTeams) activeTeam = 1;
    showArrowOnActiveTeam();
    deleteColorInPoints();
    changeColorInPoints();
}


function deleteColorInPoints() {
    document.getElementById('currentPoints').classList.remove('color-blue');
    document.getElementById('currentPoints').classList.remove('color-red');
    document.getElementById('currentPoints').classList.remove('color-yellow');
    document.getElementById('currentPoints').classList.remove('color-green');
    document.getElementById('currentPoints').classList.remove('color-orange');
    document.getElementById('currentPoints').classList.remove('color-purple');
    document.getElementById('currentPoints').classList.remove('color-turquoise');
    document.getElementById('currentPoints').classList.remove('color-pink');
    document.getElementById('currentPoints').classList.remove('color-brown');
    document.getElementById('currentPoints').classList.remove('color-grey');
}


function changeColorInPoints() {
    document.getElementById('currentPoints').classList.add(`color-${chosenColors[activeTeam - 1]}`);
}


function showArrowOnActiveTeam() {
    for (let i = 1; i <= amountTeams; i++) {
        if (i === activeTeam) {
            document.getElementById(`banner-${i}`).children[0].classList.remove('invisible');
        } else {
            document.getElementById(`banner-${i}`).children[0].classList.add('invisible');
        }
    }
}


function chooseTeam(num) {
    activeTeam = num;
}


function sichern() {
    switch (activeTeam) {
        case 1:
            team_1[0] += currentPoints; break;
        case 2:
            team_2[0] += currentPoints; break;
        case 3:
            team_3[0] += currentPoints; break;
        case 4:
            team_4[0] += currentPoints; break;
        case 5:
            team_5[0] += currentPoints; break;
        case 6:
            team_6[0] += currentPoints; break;
    }
    curPointsNull();
    showAllTeamsPoints();
    nextTeam();
    audio[9].play();
}


function showAllTeamsPoints() {
    if (amountTeams > 0) document.getElementById('team_1_points').innerText = team_1[0];
    if (amountTeams > 1) document.getElementById('team_2_points').innerText = team_2[0];
    if (amountTeams > 2) document.getElementById('team_3_points').innerText = team_3[0];
    if (amountTeams > 3) document.getElementById('team_4_points').innerText = team_4[0];
    if (amountTeams > 4) document.getElementById('team_5_points').innerText = team_5[0];
    if (amountTeams > 5) document.getElementById('team_6_points').innerText = team_6[0];
    document.getElementById('jackpot').innerText = jackpot;
}


function blitz() {
    curPointsNull();
    actionActiveTeam('blitz');
    showAllTeamsPoints();
    setTimeout(() => { nextTeam(); }, 3000);
}


function regen() {
    curPointsNull();
    nextTeam();
}


function sturm() {
    actionActiveTeam('sturm');
    showAllTeamsPoints();
}


function elster() {
    let box = document.getElementById('optionBox');
    let temp = elsterHTML;
    for (let i = 1; i <= amountTeams; i++) {
        if (i != activeTeam) {
            let teamName = document.getElementById(`teamName-${i}`).value;
            temp += `<div class="enemyBox color-${chosenColors[i - 1]}" onclick="stealFromTeam(${i}); closeOptionBox();">${teamName}</div>`;
            if (i == amountTeams) temp += `</div></div>`;
        }
        box.innerHTML = temp;
        box.classList.remove('d-none');
    }
}


function stealFromTeam(teamNum) {
    let steal = 0;
    switch (teamNum) {
        case 1: steal = Math.round(team_1[0] / 2); team_1[0] -= steal; currentPoints += steal; break;
        case 2: steal = Math.round(team_2[0] / 2); team_2[0] -= steal; currentPoints += steal; break;
        case 3: steal = Math.round(team_3[0] / 2); team_3[0] -= steal; currentPoints += steal; break;
        case 4: steal = Math.round(team_4[0] / 2); team_4[0] -= steal; currentPoints += steal; break;
        case 5: steal = Math.round(team_5[0] / 2); team_5[0] -= steal; currentPoints += steal; break;
        case 6: steal = Math.round(team_6[0] / 2); team_6[0] -= steal; currentPoints += steal; break;
    }
    showCurrentPoints();
    showAllTeamsPoints();
    if (endgame) { endGame(); }
}


function flugzeug() {
    actionActiveTeam('flugzeug');
    showCurrentPoints();
    showAllTeamsPoints();
}


function ballon() {
    actionActiveTeam('ballon');
    showAllTeamsPoints();
}


function regenbogen() {
    actionActiveTeam('regenbogen');
    showAllTeamsPoints();
}


function actionActiveTeam(action) {
    if (activeTeam === 1) team_1[0] = reactionActiveTeam(team_1[0], action);
    else if (activeTeam === 2) team_2[0] = reactionActiveTeam(team_2[0], action);
    else if (activeTeam === 3) team_3[0] = reactionActiveTeam(team_3[0], action);
    else if (activeTeam === 4) team_4[0] = reactionActiveTeam(team_4[0], action);
    else if (activeTeam === 5) team_5[0] = reactionActiveTeam(team_5[0], action);
    else if (activeTeam === 6) team_6[0] = reactionActiveTeam(team_6[0], action);
}

function reactionActiveTeam(points, action) {
    let res = 0;
    let cur = 0;
    if (action === 'blitz') { res = points * 0; };
    if (action === 'sturm') {
        res = Math.round(points / 2);
        jackpot += res;
    };
    if (action === 'flugzeug') {
        if (activeTeam != 1) { cur += Math.round(team_1[0] / 5); team_1[0] -= Math.round(team_1[0] / 5); }
        if (activeTeam != 2) { cur += Math.round(team_2[0] / 5); team_2[0] -= Math.round(team_2[0] / 5); }
        if (activeTeam != 3 && amountTeams > 2) { cur += Math.round(team_3[0] / 5); team_3[0] -= Math.round(team_3[0] / 5); }
        if (activeTeam != 4 && amountTeams > 3) { cur += Math.round(team_4[0] / 5); team_4[0] -= Math.round(team_4[0] / 5); }
        if (activeTeam != 5 && amountTeams > 4) { cur += Math.round(team_5[0] / 5); team_5[0] -= Math.round(team_5[0] / 5); }
        if (activeTeam != 6 && amountTeams > 5) { cur += Math.round(team_6[0] / 5); team_6[0] -= Math.round(team_6[0] / 5); }
        res = points;
    }
    if (action === 'regenbogen') { res = points * 2; };
    if (action === 'ballon') { cur += jackpot; res = points; jackpot = 0; };
    currentPoints += cur;
    showCurrentPoints();
    return res;
}


function pickColor(teamNum) {
    let box = document.getElementById('optionBox');
    let temp = pickColorHTML;
    for (let i = 0; i < teamColor.length; i++) {
        temp += `<div class="colorCircle color-${teamColor[i]}" onclick="changeTeamColor(${teamNum}, ${i}); closeOptionBox();"></div>`;
        if (i == teamColor.length - 1) temp += `</div></div>`;
    }
    box.innerHTML = temp;
    box.classList.remove('d-none');
}


function changeTeamColor(team, color) {
    eraseOlderColors(team);
    document.getElementById(`banner-${team}`).classList.add(`color-${teamColor[color]}`);
    chosenColors[team - 1] = teamColor[color];
}


function eraseOlderColors(team) {
    document.getElementById(`banner-${team}`).classList.remove('color-blue');
    document.getElementById(`banner-${team}`).classList.remove('color-red');
    document.getElementById(`banner-${team}`).classList.remove('color-yellow');
    document.getElementById(`banner-${team}`).classList.remove('color-green');
    document.getElementById(`banner-${team}`).classList.remove('color-orange');
    document.getElementById(`banner-${team}`).classList.remove('color-purple');
    document.getElementById(`banner-${team}`).classList.remove('color-turquoise');
    document.getElementById(`banner-${team}`).classList.remove('color-pink');
    document.getElementById(`banner-${team}`).classList.remove('color-brown');
    document.getElementById(`banner-${team}`).classList.remove('color-grey');
}


function closeOptionBox() {
    document.getElementById('optionBox').classList.add('d-none');
}


function endGame() {
    sichern();
    sieger = checkWinner();
    info = '';
    if (sieger != 'Unentschieden') { info += `Gewonnen hat das Team:`; }
    else { info += `Das Spiel endet mit einem`; }
    let box = document.getElementById('optionBox');
    let temp = endGameHTML(info, sieger);
    box.innerHTML = temp;
    box.classList.remove('d-none');
}


function checkWinner() {
    let winner;
    if (team_1[0] > team_2[0] && team_1[0] > team_3[0] && team_1[0] > team_4[0] && (amountTeams < 5 || team_1[0] > team_5[0]) && (amountTeams < 6 || team_1[0] > team_6[0])) {
        winner = document.getElementById('teamName-1').value || 'Team 1';
    } else if (team_2[0] > team_1[0] && team_2[0] > team_3[0] && team_2[0] > team_4[0] && (amountTeams < 5 || team_2[0] > team_5[0]) && (amountTeams < 6 || team_2[0] > team_6[0])) {
        winner = document.getElementById('teamName-2').value || 'Team 2';
    } else if (amountTeams >= 3 && team_3[0] > team_1[0] && team_3[0] > team_2[0] && team_3[0] > team_4[0] && (amountTeams < 5 || team_3[0] > team_5[0]) && (amountTeams < 6 || team_3[0] > team_6[0])) {
        winner = document.getElementById('teamName-3').value || 'Team 3';
    } else if (amountTeams >= 4 && team_4[0] > team_1[0] && team_4[0] > team_2[0] && team_4[0] > team_3[0] && (amountTeams < 5 || team_4[0] > team_5[0]) && (amountTeams < 6 || team_4[0] > team_6[0])) {
        winner = document.getElementById('teamName-4').value || 'Team 4';
    } else if (amountTeams >= 5 && team_5[0] > team_1[0] && team_5[0] > team_2[0] && team_5[0] > team_3[0] && team_5[0] > team_4[0] && (amountTeams < 6 || team_5[0] > team_6[0])) {
        winner = document.getElementById('teamName-5').value || 'Team 5';
    } else if (amountTeams >= 6 && team_6[0] > team_1[0] && team_6[0] > team_2[0] && team_6[0] > team_3[0] && team_6[0] > team_4[0] && team_6[0] > team_5[0]) {
        winner = document.getElementById('teamName-6').value || 'Team 6';
    } else {
        winner = 'Unentschieden';
    }
    return winner;
}


function imprint (bol) {
    imp = document.getElementById('offScreen');
    if (bol) imp.classList.remove('d-none');
    else imp.classList.add('d-none');
    imp.innerHTML = imprintHTML;
}