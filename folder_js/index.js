const forntpage = document.querySelector(".forntpage");
const frontPageButton = document.querySelector(".forntpage button");
const quizExtension = document.querySelector(".quizextention");
let extentionbut = document.querySelector(".extentionbut button");
let RulesBox = document.querySelector(".RulesBox");
let exitbut = document.querySelector(".Buttons .ExitButton");
let ContinueBut = document.querySelector(".Buttons .ContinueButton");
let Questions = document.querySelector(".Questions");
let option_list = document.querySelector(".MyOptions");
let TimeCount = document.querySelector(".TimeCount .Seconds");
let timeline = document.querySelector(".QuestionsHeader .time_lines");




frontPageButton.onclick = ()=>{
    quizExtension.classList.add("activeapp");
}

extentionbut.onclick = ()=>{
    quizExtension.classList.remove("activeapp");
    RulesBox.classList.add("activeinfo");
}

exitbut.onclick = ()=>{
    quizExtension.classList.remove("activeapp");
    RulesBox.classList.remove("activeinfo");
}

ContinueBut.onclick = ()=>{
    Questions.classList.add("activequiz");
    showquestion(0);
    starttimer(15);
    startTimerLine(0);
}

let nextBtn = document.querySelector(".nextBtn");
let result_box = document.querySelector(".result_box");
let quit_quiz = document.querySelector(".buttons .quit");
let restartbut = document.querySelector(".buttons .restart1");
let que_cou = 0;
let counter;
let counterLine;
let userescore = 0;


quit_quiz.onclick = ()=>{
    window.location.reload();
}

restartbut.onclick = ()=>{
    result_box.classList.remove("activeResult");
    Questions.classList.add("activequiz");
     que_cou = 0;
     userescore = 0;
    showquestion(que_cou);
    clearInterval(counter);
    starttimer(15);
    clearInterval(counterLine);
    startTimerLine(0);
    nextBtn.style.display = "none";
} 



nextBtn.onclick = ()=>{
    if(que_cou < questions.length -1){
        que_cou ++;
        showquestion(que_cou);
        clearInterval(counter);
        starttimer(15);

        clearInterval(counterLine);
        startTimerLine(0);
        nextBtn.style.display = "none";
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("you are done");
        result();
    }
}

function showquestion(index){
    que_text = document.querySelector(".text");

    option_tag = '<div class="options"><span>' +questions[index].Option[0] + '</span></div>'
                +'<div class="options"><span>' +questions[index].Option[1] + '</span></div>'
                +'<div class="options"><span>' +questions[index].Option[2] + '</span></div>'
                +'<div class="options"><span>' +questions[index].Option[3] + '</span></div>';

    option_list.innerHTML = option_tag;

    que_tag = '<span>' + questions[index].num + "." + questions[index].question + '</span>';
    que_text.innerHTML = que_tag;

    let total_que = document.querySelector(".total_que");
    total_quetag = '<span>'+ questions[index].num  + " " + "Of"  + " " + questions.length +" "+ "Questions" + '</span>';
    total_que.innerHTML = total_quetag;


const mainoption = option_list.querySelectorAll(".options");
for(i=0; i<mainoption.length; i++){
    mainoption[i].setAttribute("onclick","optionselact(this)");
}

}


let tickIcon ='<div class="tick icon"><i class="fas fa-check"></i></div>'; 
let crossIcon = '<div class="cross icon"><i class="fas fa-times"></i></div>'; 



function optionselact(answer){
    clearInterval(counter);
    clearInterval(counterLine); 
   

    let usereans = answer.textContent;
    let correctans = questions[que_cou].answer;
    let totaloption = option_list.children.length;


    if(usereans == correctans){
        userescore += 1;
        console.log(userescore);
        answer.classList.add("correct");
        console.log("you are write");
        answer.insertAdjacentHTML('beforeend', tickIcon);
    }
    else{
        answer.classList.add("Incorrect");
        console.log("you are wrong");
        answer.insertAdjacentHTML('beforeend',crossIcon);


        for (i=0; i<totaloption; i++){
            if( option_list.children[i].textContent ==  correctans ){
                option_list.children[i].setAttribute("class", "options correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); 
            }
        }
    }


    for(let i=0; i<totaloption; i++){
        option_list.children[i].classList.add("disabled"); 
    }

nextBtn.style.display = "block";
   
}

function starttimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        TimeCount.textContent = time;
        time-- ;

        if(time<9){
            TimeCount.textContent = "0" +  TimeCount.textContent;
        }
        if(time<0){
            clearInterval(counter);
            TimeCount.textContent = "00";
        }
    }
}


function startTimerLine(time){
    counterLine = setInterval(timer, 50);
    function timer(){
        time += 1 ; 
        timeline.style.width = time + "px"; 
        if(time > 319){
            clearInterval(counterLine); 
        }
    }
}


function result(){
    quizExtension.classList.remove("activeapp");
    RulesBox.classList.remove("activeinfo");
    result_box.classList.add("activeResult");
    console.log("resultlest");

    const score_text = document.querySelector(".score_text");
    if( userescore > 4){
        document.getElementById("piq").innerHTML = '<img src="bigwin.png" alt="bigpic">';
        let score_tag = '<span>BIG WIN You Got<p>' + userescore + '</p> Out Of <p>' + questions.length + '</p></span>';
        score_text.innerHTML = score_tag;
    }
    else if(userescore > 2){
        document.getElementById("piq").innerHTML = '<img src="congratulation.png" alt="bigpic">';
        let score_tag = '<span>Carry On You Got<p>' + userescore + '</p> Out Of <p>' + questions.length + '</p></span>';
        score_text.innerHTML = score_tag;
    }
    else{
        document.getElementById("piq").innerHTML = '<img src="sorry.png" alt="bigpic">';
        let score_tag = '<span> I Am Sorry You Got<p>' + userescore + '</p> Out Of <p>' + questions.length + '</p></span>';
        score_text.innerHTML = score_tag;
    }
}