let index = 0;
let attempt = 0;
let score = 0;
let wrong = 0;

let questions = quizz.sort(function() {
    return 0.5 - Math.random();
});


let totalQuestion = questions.length;




function quePage() {
    let name = document.querySelector("input").value;
    $("#welcomePage").show();
    $("#namepage").hide();
    $("#main").hide();
    $("#playerName span").text(" ' " + name + " ' ");

}

function nextPage() {
    $("#namepage").show();
    $("#main").hide();
};

$(function() {
    // timer 

    let totalTime = 120;
    let min = 0;
    let sec = 0;
    let counter = 0;


    let timer = setInterval(function() {
        counter++;
        min = Math.floor((totalTime - counter) / 60);
        sec = totalTime - (min * 60) - counter;

        $(".timeleft span").text(min + ":" + sec);
        if (counter == totalTime) {
            clearInterval(timer);
        }

        //console.log("min = " + min);
        //console.log("sec = " + sec);
    }, 1000);

    // timer end



    // print questions
    printQuestion(index);


});





function printQuestion(i) {
    $(".question1").text(questions[i].question);
    $(".option1 span").eq(0).text(questions[i].option[0]);
    $(".option1 span").eq(1).text(questions[i].option[1]);
    $(".option1 span").eq(2).text(questions[i].option[2]);
    $(".option1 span").eq(3).text(questions[i].option[3]);

}


function checkAnswer(option) {
    attempt++;
    let optionClicked = $(option).data("opt");
    console.log(optionClicked);

    if (optionClicked == questions[index].answer) {
        $(option).addClass("right");
        score++;
    } else {
        $(option).addClass("wrong");
        wrong++;
    }

    $(".score span").text(score);
    $(".option1 span").attr("onclick", "");
}



function showNext() {
    if (index >= (questions.length - 1)) {
        showResult(0);
        return;
    }


    index++;

    $(".option1 span").removeClass();
    $(".option1 span").attr("onclick", "checkAnswer(this)");
    printQuestion(index);
}

function showResult(j) {
    if (j == 1 &&
        index < questions.length - 1 &&
        !confirm("Quiz has not finished yet .Press OK to skip question [your Results will be Display]")) {
        return;
    }
    if (score >= 4) {
        $(".win").show();


    } else if (score >= 2 && score <= 3) {
        $(".medium").show();

    } else {
        $(".lose").show();
    }

    if (score >= 5) {
        $("#Excellent").show();
    } else if (score >= 3) {
        $("#good").show();

    } else if (score >= 1) {
        $("#better").show();
    } else {
        $("#waste").show();
    }



    $("#questionScreen").hide();
    $("#resultScreen").show();

    $("#totalQuestions").text(totalQuestion);
    $("#attemptQuestions").text(attempt);
    $("#correctAnswers").text(score);
    $("#wrongAnswers").text(wrong);
}