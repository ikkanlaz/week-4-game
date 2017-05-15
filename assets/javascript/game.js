$(document).ready(function () {
    var selectedCharacter;
    var currentOpponent;
    var gameStarted;
    var characterObjects = {
        yoda: {
            name: "Yoda",
            health: 180,
            attackPower: 7,
            counterAttackPower: 26,
            imgUrl: "assets/images/yoda.png",
            isDefeated: false
        },
        hanSolo: {
            name: "Han Solo",
            health: 120,
            attackPower: 9,
            counterAttackPower: 22,
            imgUrl: "assets/images/han-solo.png",
            isDefeated: false
        },
        darthVader: {
            name: "Darth Vader",
            health: 150,
            attackPower: 8,
            counterAttackPower: 24,
            imgUrl: "assets/images/darth-vader.png",
            isDefeated: false
        },
        bobaFett: {
            name: "Boba Fett",
            health: 100,
            attackPower: 10,
            counterAttackPower: 20,
            imgUrl: "assets/images/boba-fett.png",
            isDefeated: false
        }
    }
    var characterList = [characterObjects.yoda, characterObjects.hanSolo, characterObjects.darthVader, characterObjects.bobaFett];



    function loadFightScreen() {
        $(".page-header").css("height", "100px");
        $("#logo").animate({ marginLeft: "20px", height: "100px", width: "233.65px", padding: "0" }, 1000, "swing", function () {
            $("#logo").addClass("col-md-3");
            $("#remaining-opponents-container").css("display", "block");
            $("#fight-container").css("display", "block");
        });
        $("#character-select-container").css("display", "none");
        $("#selected-character-image").attr("src", characterObjects[selectedCharacter].imgUrl);
        updateOpponents();
        updateHealth();
    }

    function updateHealth() {
        $("#selected-character-health").text(characterObjects[selectedCharacter].health);
        $("#current-opponent-health").text(characterObjects[currentOpponent].health);
    }

    function updateOpponents() {
        $("#selected-opponent-image").attr("src", characterObjects[currentOpponent].imgUrl);
        $(".game-directive").text("Defeat " + characterObjects[currentOpponent].name);
        for (var i = 0; i < characterList.length; i++) {
            if (characterList[i] !== characterObjects[selectedCharacter]
                && characterList[i] !== characterObjects[currentOpponent]
                && characterList[i].isDefeated === false) {
                var remainingOpponent = $("<img>");
                remainingOpponent.addClass("remaining-opponent-image");
                remainingOpponent.attr("src", characterList[i].imgUrl);
                $("#remaining-opponents-image-container").append(remainingOpponent);
            }
        }
    }

    $(".character-image").on("click", function () {
        var clickedCharacter = $(this).attr("value");
        if (!gameStarted) {
            if (selectedCharacter) {
                currentOpponent = clickedCharacter;
                console.log("Your opponent is: " + currentOpponent);
                $(this).parent().css("display", "none");
                gameStarted = true;
                loadFightScreen();
            } else {
                selectedCharacter = clickedCharacter;
                console.log("You selected: " + selectedCharacter);
                $(this).parent().css("display", "none");
                $(".character-select-directive").text("Select Your Opponent");
            }
        }
    });

    $("#attack-button").on("click", function() {
        $("#attack-log").text("You attacked " + characterObjects[currentOpponent].name + " for " + characterObjects[selectedCharacter].attackPower + " damage.");
        $("#counter-attack-log").text(characterObjects[currentOpponent].name + " attacked you for " + characterObjects[currentOpponent].counterAttackPower + " damage.");
    });
});