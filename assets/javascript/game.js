$(document).ready(function () {
    var selectedCharacter;
    var currentOpponent;
    var gameStarted;
    var characterObjects = {
        yoda: {
            name: "Yoda",
            health: 180,
            attackPower: 7,
            counterAttackPower: 26
        },
        hanSolo: {
            name: "Han Solo",
            health: 120,
            attackPower: 9,
            counterAttackPower: 22
        },
        darthVader: {
            name: "Darth Vader",
            health: 150,
            attackPower: 8,
            counterAttackPower: 24
        },
        bobaFett: {
            name: "Boba Fett",
            health: 100,
            attackPower: 10,
            counterAttackPower: 20
        }
    }


    function loadFightScreen() {
        $(".page-header").css("height", "3%");
        $("#logo").animate({ marginLeft: "20px", height: "100px", width: "233.65px" }, 1000, "swing");
        $("#remaining-opponents-container").css("display", "block");
        $("#fight-container").css("display", "block");
        $("#character-select-container").css("display", "none");
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
});