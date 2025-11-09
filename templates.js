const startHTML = `
        <div class="board" id="board">
            <div class="boardSide" id="left"></div>
            <div class="screen" id="screen">
                <div class="btn-neustart" onclick="restartGame()">Neustart</div>
                <h1 id="currentPoints">0</h1>
                <div class="sichernBox">
                    <div class="jackpotBox">
                        <img src="./img/jackpot.png">
                        <div class="jackpot" id="jackpot">0</div>
                    </div>
                    <div class="btn-sichern" onclick="sichern()">Sichern</div>
                </div>
            </div>
            <div class="boardSide" id="right"></div>
        </div>
        <div class="sky" id="sky"></div>
        <div class="optionBox d-none" id="optionBox"></div>
    `;


const restartHTML = `
        <div class="menu">
            <img class="title" src="./img/title.png">
            <div class="teamChoiceBox">
                <h2>Wähle die Anzahl der Teams:</h2>
                <div class="teamChoice">
                    <div class="teamPick" onclick="startGame(2)">
                        <img src="./img/wolke.png">
                        <h3>2</h3>
                    </div>
                    <div class="teamPick" onclick="startGame(4)">
                        <img src="./img/wolke.png">
                        <h3>4</h3>
                    </div>
                    <div class="teamPick" onclick="startGame(6)">
                        <img src="./img/wolke.png">
                        <h3>6</h3>
                    </div>
                    <div class="teamPick" onclick="startGame(3)">
                        <img src="./img/wolke.png">
                        <h3>3</h3>
                    </div>
                    <div class="teamPick" onclick="startGame(5)">
                        <img src="./img/wolke.png">
                        <h3>5</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="description">
            <h2>Spielerklärung</h2>
            <p>Ziel des Spiels ist es am Ende die meisten Punkte auf dem Konto zu haben. Diese Punkte erreicht man durch
                das Freilegen der grünen Zahlen auf dem Spielfeld. Diese verbergen sich hinter den weißen Wolken. Das
                erste Team sucht sich also eine Wolke aus und darf danach entscheiden, ob es in dieser Spielrunde weitere
                Punkte dazu sammeln will oder die Punkte sichern möchte. Es muss mindestens eine Wolke ausgewählt werden. 
                Nach dem Sichern ist das nächste Team an der Reihe.Das Spiel endet, wenn sich alle Wolken am Himmel aufgelöst 
                haben. Jedoch verbergen sich nicht nur Punkte hinter den Wolken, sondern auch einige andere Ereignisse:
            </p>
            <div class="iconInfos">
                <div class="icon">
                    <div class="pointsDemoP" style="height: 54px;">20</div>
                    <p>Diese Punkte gilt es zu sammeln. Je mehr Punkte ihr sammelt, desto höher ist eure Gewinnchance.
                    </p>
                </div>
                <div class="icon">
                    <div class="pointsDemoM" style="height: 54px;">-20</div>
                    <p>Diese Punkte werden von der aktuellen Spielrunde abgezogen. Euer Konto bleibt davon unberührt.
                        Weniger als 0 Punkte sind nicht möglich.</p>
                </div>
                <div class="icon">
                    <img src="./img/sturm.png">
                    <p>Die Hälfte eurer insgesamt gesammelten Punkte eures Kontos werden weggeweht und kommen in den
                        Jackpot.</p>
                </div>
                <div class="icon">
                    <img src="./img/ballon.png">
                    <p>Glückwunsch! Alle vom Sturm verwehten Punkte landen als Jackpot im Heißluftballon. Diese Punkte
                        erhaltet ihr als Punkte der aktuellen Spielrunde oben drauf. Ist der Jackpot leer: Pech gehabt.
                    </p>
                </div>
                <div class="icon">
                    <img src="./img/flugzeug.png">
                    <p>Das Flugzeug klaut von allen euren Gegnern 20% ihres Kontos und packt sie auf euren Punktezähler.
                    </p>
                </div>
                <div class="icon">
                    <img src="./img/elster.png">
                    <p>Ihr dürft euch ein gegnerisches Team aussuchen, dem die diebische Elster 50% ihres Kontos klaut
                        und auf euren Punktezähler packt.</p>
                </div>
                <div class="icon">
                    <img src="./img/regen.png">
                    <p>Alle in der aktuellen Runde gesammelten Punkte sind futsch. Die Punkte auf dem gesicherten Konto
                        bleiben jedoch erhalten. Das Team kann an dieser Stelle nicht weiterspielen und die nächste
                        Mannschaft
                        ist an der Reihe.
                    </p>
                </div>
                <div class="icon">
                    <img src="./img/regenbogen.png">
                    <p>Am Ende des Regenbogens wartet der Goldschatz: Euer Konto wird verdoppelt.</p>
                </div>
                <div class="icon">
                    <img src="./img/blitz.png">
                    <p>KABOOM! Ein heftiges Gewitter zieht auf und der Blitz zerstört die kompletten Punkte auf eurem
                        Konto. Ihr seid wieder komplett bei „Null“ und auch die Punkte der aktuellen Spielrunde sind futsch.
                        Das Team kann an dieser Stelle nicht weiterspielen und die nächste Mannschaft ist an der Reihe.
                    </p>
                </div>
            </div>
            <div class="author">
                <p>Ein Spiel von Christian Becker</p>
                <p onclick="imprint(true)" class="imprint">Impressum</p>
            </div>
        </div>
    `;


const pickColorHTML = `
    <div class="pickColorBox">
    <div class="closeButton" onclick="closeOptionBox()">X</div>
        <p class="infoText">Wählt eure Teamfarbe:</p>        
            <div class="colorPalette">`;


function endGameHTML(info, sieger) {
    return `
    <div class="pickColorBox">
    <div class="restartButton" onclick="restartGame()">Noch ein Spiel!</div>
        <p class="infoText">${info}</p>        
        <h2 class="enemyBox" style="background-color: white;">${sieger}</h2>
    </div>
    `;
}


const elsterHTML = `
    <div class="pickColorBox">
    <div class="closeButton" onclick="closeOptionBox()">X</div>
        <p class="infoText">Welches Team soll bestohlen werden?</p>        
            <div class="colorPalette">`;


function generateTeamsHTML(i, teamColor) {
    return `
            <div class="teamBanner color-${teamColor[i - 1]}" id="banner-${i}">
                <img class="invisible" src="./img/pfeil.png">
                <input type="text" id="teamName-${i}" placeholder="Teamname">
                <img class="colorPick" src="./img/color.png" onclick="pickColor(${i})">
                <div class="teamPoints" id="team_${i}_points" onclick="changeTeamManual(${i})">0</div>
            </div>
        `;
}


function generateSkyHTML(i, cloudMove, results, pickResult) {
    return `
        <div class="cloud ${cloudMove}">
            <img class="IMGcloud" id="cloud-${i}" src="./img/wolke.png">
            <div class="number" id="nr-${i}" onclick="cloudReaction('${results[i]}', ${i})">${i + 1}</div>
            <div class="result" id="res-${i}">${pickResult}</div>
        </div>`;
}


const imprintHTML = `
        <div class="closeButton" onclick="imprint(false)" style="">X</div>
        <h3>Impressum</h3>
        <p>Angaben gemäß § 5 DDG
        <p><br>
        <p>Christian Becker</p>
        <p>Odinstr. 7</p>
        <p>56348 Bornich</p>
        <br><br>
        <p>Vertreten durch:</p>
        <p>Christian Becker</p>
        <br>
        <p>Kontakt:</p>
        <p>E-Mail: mail[at]becker-christian.de</p>
        <br><br>
        <p>Alle Grafiken in diesem Spiel stammen von <a href="https://www.cleanpng.com"
                target="_blanc">https://www.cleanpng.com</a></p>
        <p>Alle Audio-Datein in diesem Spiel stammen von <a href="https://pixabay.com"
                target="_blanc">https://pixabay.com</a></p>
`