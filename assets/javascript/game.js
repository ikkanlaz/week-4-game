$(document).ready(function () {
    var selectedCharacter;
    var currentOpponent;
    var gameStarted;
    var enableCharacterSelect = true;
    var selectedCharacterBaseAttackPower;
    var attackNumber = 1;
    var characterObjects = {
        yoda: {
            name: "Yoda",
            health: 280,
            attackPower: 7,
            counterAttackPower: 11,
            imgUrl: "assets/images/yoda.png",
            isDefeated: false
        },
        hanSolo: {
            name: "Han Solo",
            health: 180,
            attackPower: 9,
            counterAttackPower: 20,
            imgUrl: "assets/images/han-solo.png",
            isDefeated: false
        },
        darthVader: {
            name: "Darth Vader",
            health: 240,
            attackPower: 8,
            counterAttackPower: 21,
            imgUrl: "assets/images/darth-vader.png",
            isDefeated: false
        },
        ackbar: {
            name: "Ackbar",
            health: 140,
            attackPower: 10,
            counterAttackPower: 20,
            imgUrl: "assets/images/ackbar.png",
            isDefeated: false
        }
    }
    //assigning all objects in characterObjects to a list so it is iteratable 
    var characterList = [characterObjects.yoda, characterObjects.hanSolo, characterObjects.darthVader, characterObjects.ackbar];

    $("#yoda-health").text(characterObjects.yoda.health);
    $("#han-solo-health").text(characterObjects.hanSolo.health);
    $("#darth-vader-health").text(characterObjects.darthVader.health);
    $("#ackbar-health").text(characterObjects.ackbar.health);


    function loadFightScreen() {
        $("#attack-button").text("Attack")
            .css("background-color", "rgba(255, 0, 0, 0.075)")
            .css("border", "rgba(255, 0, 0, 0.5) solid 2px");
        $("#remaining-opponents-container").css("display", "block");
        $("#fight-container").css("display", "block");
        $("#character-select-container").css("display", "none");
        $("#selected-character-image").attr("src", characterObjects[selectedCharacter].imgUrl);
        updateOpponents();
        updateRemainingOpponentsContainer();
        updateHealth();
    }

    function logoAnimation() {
        $(".page-header").css("height", "100px");
        $("#logo").animate({ marginLeft: "20px", height: "100px", width: "233.65px", padding: "0" }, 1000, "swing", function () {
            $("#logo").addClass("col-md-3");
            loadFightScreen();
        });
    }

    //updates the text on page related to health stats
    function updateHealth() {
        $("#selected-character-health").text(characterObjects[selectedCharacter].health);
        $("#current-opponent-health").text(characterObjects[currentOpponent].health);
    }

    //updates the opponent when a new one is needed
    function updateOpponents() {
        $("#selected-opponent-image").attr("src", characterObjects[currentOpponent].imgUrl);
        $(".game-directive").text("Defeat " + characterObjects[currentOpponent].name);
    }

    function updateRemainingOpponentsContainer() {
        $("#remaining-opponents-image-container").empty();
        var numberRemaining = 0;
        for (var i = 0; i < characterList.length; i++) {
            if (characterList[i] !== characterObjects[selectedCharacter]
                && characterList[i] !== characterObjects[currentOpponent]
                && characterList[i].isDefeated === false) {
                numberRemaining++;
                var remainingOpponent = $("<img>");
                remainingOpponent.addClass("remaining-opponent-image col-xs-6");
                remainingOpponent.attr("src", characterList[i].imgUrl);
                $("#remaining-opponents-image-container").append(remainingOpponent);
            }
        }
        if (numberRemaining === 0) {
            $("#remaining-opponents-container").css("display", "none");
        }
    }

    function checkWinCondition() {
        var remainingOpponents = 0;
        for (var i = 0; i < characterList.length; i++) {
            if (characterList[i].isDefeated === false && characterList[i] !== characterObjects[selectedCharacter]) {
                remainingOpponents++;
                console.log("remainingOpponents: " + remainingOpponents);
            }
        }
        if (remainingOpponents === 0) {
            return true;
        } else {
            return false;
        }
    }

    function getNewOpponent() {
        enableCharacterSelect = true;
        $(".game-log").empty();
        $("#fight-container").css("display", "none");
        $("#remaining-opponents-container").css("display", "none");
        $("#character-select-container").css("display", "block");
    }

    function opponentIsDefeated() {
        currentOpponentObj.health = 0;
        currentOpponentObj.isDefeated = true;
        if (checkWinCondition()) {
            getWinScreen();
        } else {
            $("#attack-button").text("Get New Opponent")
                .css("background-color", "rgba(77, 192, 77, 0.075)")
                .css("border", "rgba(77, 192, 77, 0.5) solid 2px");
            $(".game-directive").text("You've defeated " + currentOpponentObj.name);
        }
    }

    function gameOver() {
        selectedCharacterObj.health = 0;
        selectedCharacterObj.isDefeated = true;
        $(".game-directive").text("You have been defeated by " + currentOpponentObj.name);
        $("#attack-button").text("Start New Game")
            .css("background-color", "rgba(77, 192, 77, 0.075)")
            .css("border", "rgba(77, 192, 77, 0.5) solid 2px");
        gameStarted = false;
    }

    function getWinScreen() {
        gameStarted = false;
        $(".game-directive").text("You win!");
        $("#attack-button").text("Start New Game")
            .css("background-color", "rgba(77, 192, 77, 0.075)")
            .css("border", "rgba(77, 192, 77, 0.5) solid 2px");
    }

    function createNewGame() {
        location.reload();
    }

    $(".character-image").on("click", function () {
        var clickedCharacter = $(this).attr("value");
        if (enableCharacterSelect) {
            if (selectedCharacter) {
                currentOpponent = clickedCharacter;
                console.log("Your opponent is: " + currentOpponent);
                $(this).parent().css("display", "none");
                enableCharacterSelect = false;
                $("#character-select-container").css("display", "none");
                if (!gameStarted) {
                    logoAnimation();
                } else {
                    loadFightScreen();
                }
                gameStarted = true;
            } else {
                selectedCharacter = clickedCharacter;
                console.log("You selected: " + selectedCharacter);
                selectedCharacterBaseAttackPower = characterObjects[selectedCharacter].attackPower;
                $(this).parent().css("display", "none");
                $(".character-select-directive").text("Select Your Opponent");
            }
        }
    });

    $("#attack-button").on("click", function () {
        currentOpponentObj = characterObjects[currentOpponent];
        selectedCharacterObj = characterObjects[selectedCharacter];
        if (gameStarted) {
            if (currentOpponentObj.isDefeated === false) {
                if (selectedCharacterObj.health <= 0) {
                    gameOver();
                } else {
                    selectedCharacterObj.attackPower = selectedCharacterBaseAttackPower * attackNumber;
                    attackNumber++;
                    $("#attack-log").text("You attacked " + currentOpponentObj.name + " for " + selectedCharacterObj.attackPower + " damage.");
                    $("#counter-attack-log").text(currentOpponentObj.name + " attacked you for " + currentOpponentObj.counterAttackPower + " damage.");
                    currentOpponentObj.health = currentOpponentObj.health - selectedCharacterObj.attackPower;
                    selectedCharacterObj.health = selectedCharacterObj.health - currentOpponentObj.counterAttackPower;
                    if (selectedCharacterObj.health <= 0 && currentOpponentObj.health <= 0) {
                        if (selectedCharacterObj.health >= currentOpponentObj.health) {
                            selectedCharacterObj.health = 0;
                            opponentIsDefeated();
                        } else {
                            gameOver();
                        }
                    } else if (selectedCharacterObj.health <= 0) {
                        gameOver();
                    } else if (currentOpponentObj.health <= 0) {
                        opponentIsDefeated();
                    }
                    updateHealth();
                }
            } else {
                getNewOpponent();
            }
        } else {
            createNewGame();
        }
    });
});