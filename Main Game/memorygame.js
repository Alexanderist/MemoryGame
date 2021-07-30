"use strict"
$(function () {
    $("#tabs").tabs();
});

$(document).ready(() => {
    $("#clear_board").click(() => {
        clearField();
    })
})

var player_name;
var num_cards;



// initialize the game by checking for preferences
if (sessionStorage.getItem("memory_game_6") != null) {
    let retrieving_data = sessionStorage.getItem("memory_game_6") + ",";

    function makeArray(str, delimiter = ",") {
        let save_data = str.slice(0, str.indexOf("\n")).split(delimiter);
    }
    makeArray(retrieving_data)

} else {
    num_cards = $("#num_cards option:selected").text();
    num_cards = parseInt(num_cards);
}


//card array
const cardArray = [{
    name: "card1",
    img: "images/card_1.png"
}, {
    name: "card1",
    img: "images/card_1.png"
}, {
    name: "card2",
    img: "images/card_2.png"
}, {
    name: "card2",
    img: "images/card_2.png"
}, {
    name: "card3",
    img: "images/card_3.png"
}, {
    name: "card3",
    img: "images/card_3.png"
}, {
    name: "card4",
    img: "images/card_4.png"
}, {
    name: "card4",
    img: "images/card_4.png"
}, {
    name: "card5",
    img: "images/card_5.png"
}, {
    name: "card5",
    img: "images/card_5.png"
}, {
    name: "card6",
    img: "images/card_6.png"
}, {
    name: "card6",
    img: "images/card_6.png"
}, {
    name: "card7",
    img: "images/card_7.png"
}, {
    name: "card7",
    img: "images/card_7.png"
}, {
    name: "card8",
    img: "images/card_8.png"
}, {
    name: "card8",
    img: "images/card_8.png"
}, {
    name: "card9",
    img: "images/card_9.png"
}, {
    name: "card9",
    img: "images/card_9.png"
}, {
    name: "card10",
    img: "images/card_10.png"
}, {
    name: "card10",
    img: "images/card_10.png"
}, {
    name: "card11",
    img: "images/card_11.png"
}, {
    name: "card11",
    img: "images/card_11.png"
}, {
    name: "card12",
    img: "images/card_12.png"
}, {
    name: "card12",
    img: "images/card_12.png"
}, {
    name: "card13",
    img: "images/card_13.png"
}, {
    name: "card13",
    img: "images/card_13.png"
}, {
    name: "card14",
    img: "images/card_14.png"
}, {
    name: "card14",
    img: "images/card_14.png"
}, {
    name: "card15",
    img: "images/card_15.png"
}, {
    name: "card15",
    img: "images/card_15.png"
}, {
    name: "card16",
    img: "images/card_16.png"
}, {
    name: "card16",
    img: "images/card_16.png"
}, {
    name: "card17",
    img: "images/card_17.png"
}, {
    name: "card17",
    img: "images/card_17.png"
}, {
    name: "card18",
    img: "images/card_18.png"
}, {
    name: "card18",
    img: "images/card_18.png"
}, {
    name: "card19",
    img: "images/card_19.png"
}, {
    name: "card19",
    img: "images/card_19.png"
}, {
    name: "card20",
    img: "images/card_20.png"
}, {
    name: "card20",
    img: "images/card_20.png"
}, {
    name: "card21",
    img: "images/card_21.png"
}, {
    name: "card21",
    img: "images/card_21.png"
}, {
    name: "card22",
    img: "images/card_22.png"
}, {
    name: "card22",
    img: "images/card_22.png"
}, {
    name: "card23",
    img: "images/card_23.png"
}, {
    name: "card23",
    img: "images/card_23.png"
}, {
    name: "card24",
    img: "images/card_24.png"
}, {
    name: "card24",
    img: "images/card_24.png"
}];
var current_field
/* to make the options for different amounts of cards, should we make a 
8 card array like this, have an event listener for the select box, and
use the option ids to correspond with popping a certain number of array
items out?*/

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
var cardsChosen = [];
var cardsChosenId = [];
var cardsWon = [];

//create board -
function createBoard() {
    clearField();
    let num_cards = parseInt($("#num_cards option:selected").text());
    // console.log("before: " + cardArray.length)
    current_field = cardArray.slice(0, num_cards);
    // console.log("after: " + current_field.length)
    current_field.sort(() => 0.5 - Math.random());
    for (let i = 0; i < current_field.length; i++) {
        var card = document.createElement("img");
        card.setAttribute("src", "images/back.png");
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    };
};

function checkForMatch() {
    var cards = $("#cards img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
        // alert("you found a match");
        cards[optionOneId].setAttribute("src", "images/blank.png")
        cards[optionOneId].removeEventListener("click", flipCard)
        cards[optionTwoId].setAttribute("src", "images/blank.png")
        cards[optionTwoId].removeEventListener("click", flipCard)
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].setAttribute("src", "images/back.png");
        cards[optionTwoId].setAttribute("src", "images/back.png");
        // alert("Sorry, try again");
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === current_field.length / 2) {
        resultDisplay.textContent = "Congratulations! You found them all!";
    };
};

function flipCard() {
    var cardId = this.getAttribute("data-id")
    cardsChosen.push(current_field[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute("src", current_field[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 800)
    }
}

createBoard();

function clearField() {
    $("#cards img").remove();
}