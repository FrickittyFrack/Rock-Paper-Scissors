$(document).ready(function() {
    
    var config = {
        apiKey: "AIzaSyBMUPlAeQzCthR_taDdvtmhJ7tqmQ8vnds",
        authDomain: "practice2-7dcd7.firebaseapp.com",
        databaseURL: "https://practice2-7dcd7.firebaseio.com",
        projectId: "practice2-7dcd7",
        storageBucket: "practice2-7dcd7.appspot.com",
        messagingSenderId: "17415185778"
        };
    
    firebase.initializeApp(config);
    
    var database = firebase.database();

    var options = [
        {text: 'Rock', pic: 'rock-2.png'},
        {text: 'Paper', pic: 'paper-2.png'},
        {text: 'Scissors', pic: 'scissors-2.png'},
        {text: 'Lizard', pic: 'lizard-2.png'},
        {text: 'Spock', pic: 'spock-2.png'}
    ];

    $(document).on("click", ".start-button", function() { 
        $(this).hide();
        showGame();
    });

    function showGame() {
    
        for (var i = 0; i < options.length; i++) {
            
            var choices = $("<div>");
    
            choices.addClass("pick-one");
            choices.addClass("col");
            choices.attr("id", options[i].text);

            var image = $("<img>");

            var text = $("<div id='info-text' class='white-text'></div>");
    
            text.text(options[i].text);

            $(choices).append(image, text);

            image.attr("src", "assets/images/" + options[i].pic);
            image.attr("height", "150");
            image.attr("width", "150");
    
            $("#clicky-clackitty").append(choices);
    
            console.log(options[i].text);
        };

        $(".pick-one").on("click", function() { 
            
            var ranNum = Math.floor(Math.random() * options.length);
            var computerChoice = options[ranNum].text;

            var userChoice = $(this).text();
            
            $("#users-choice").text("You've picked " + userChoice);
            
            database.ref().push({

                usersChoice: userChoice

            });

            if(
                userChoice === 'Rock' && computerChoice === 'Paper' ||
                userChoice === 'Rock' && computerChoice === 'Spock' ||
                userChoice === 'Paper' && computerChoice === 'Scissors' ||
                userChoice === 'Paper' && computerChoice === 'Lizard' ||
                userChoice === 'Scissors' && computerChoice === 'Rock' ||
                userChoice === 'Scissors' && computerChoice === 'Spock' ||
                userChoice === 'Lizard' && computerChoice === 'Rock' ||
                userChoice === 'Lizard' && computerChoice === 'Scissors' ||
                userChoice === 'Spock' && computerChoice === 'Paper' ||
                userChoice === 'Spock' && computerChoice === 'Lizard') {
                console.log("Loss");
                $("#result").text("You lost");
            };
            if(
                userChoice === 'Rock' && computerChoice === 'Scissors' ||
                userChoice === 'Rock' && computerChoice === 'Lizard' ||
                userChoice === 'Paper' && computerChoice === 'Spock' ||
                userChoice === 'Paper' && computerChoice === 'Rock' ||
                userChoice === 'Scissors' && computerChoice === 'Lizard' ||
                userChoice === 'Scissors' && computerChoice === 'Paper' ||
                userChoice === 'Lizard' && computerChoice === 'Paper' ||
                userChoice === 'Lizard' && computerChoice === 'Spock' ||
                userChoice === 'Spock' && computerChoice === 'Rock' ||
                userChoice === 'Spock' && computerChoice === 'Scissors') {
                console.log("Win");
                $("#result").text("You won!");
            };
            if(
                userChoice === 'Rock' && computerChoice === 'Rock' ||
                userChoice === 'Paper' && computerChoice === 'Paper' ||
                userChoice === 'Scissors' && computerChoice === 'Scissors' ||
                userChoice === 'Lizard' && computerChoice === 'Lizard' ||
                userChoice === 'Spock' && computerChoice === 'Spock') {
                console.log("Tie");
                $("#result").text("It's a draw");
            };
        });
    };
});