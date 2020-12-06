 var myQuestions = [
    {
        question: "I prefer a presenter or a teacher who uses:",
        answers: {
            a: "diagrams, charts, maps or graphs.",
            b: "question and answer, talk, group discussion, or guest speakers.",
            c: "handouts, books, or readings.",
            d: "demonstrations, models or practical sessions."
        },
        },
        
        {
        question: "A website has a video showing how to make a special graph or chart. There is a person speaking, some lists and words describing what to do and some diagrams. I would learn most from:",
        answers: {
           a: "seeing the diagrams.",
            b: "listening",
            c: "reading the words.",
            d: "watching the actions."
        },
        },
        
          {
        question: "I want to save more money and to decide between a range of options. I would:",
        answers: {
           a: "use graphs showing different options for different time periods.",
            b: "talk with an expert about the options.",
            c: "read a print brochure that describes the options in detail.",
            d: "consider examples of each option using my financial information."
        },
        },
        
         {
        question: "I have a problem with my heart. I would prefer that the doctor:",
        answers: {
            a: "showed me a diagram of what was wrong.",
            b: "described what was wrong.",
            c: "gave me something to read to explain what was wrong.",
            d: "used a plastic model to show me what was wrong."
        },
        },
        
        //q6
        {
		question: "I want to learn how to take better photos. I would:",
        answers: {
            a: "use diagrams showing the camera and what each part does.",
            b: "ask questions and talk about the camera and its features.",
            c: "use the written instructions about what to do.",
            d: "use examples of good and poor photos showing how to improve them."
        },
        },
        
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // store the output and the answer choices
        var output = [];
        var answers;

        // for each question
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            
            for(letter in questions[i].answers){

                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        

        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        var visAnswers = 0;
        var audAnswers = 0;
        var rrAnswers = 0;
        var kinAnswers = 0;
       
        for(var i=0; i<questions.length; i++){
        
        	//count number of audio, visual, etc. answers

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
             //counts user score for each learning style
             
             if (userAnswer=='a') {
             	visAnswers++;
							
             }
             
               if (userAnswer=='b') {
               	audAnswers++;
             }
             
               if (userAnswer=='c') {
             	 rrAnswers++;
             }
             
               if (userAnswer=='d') {
             		kinAnswers++;
             }
             
             //end of 4th question


        } //end of for loop
        
        
//creates array to hold all total scores for each learning category
				let scores = Array(4);
        scores[0] = visAnswers;
        scores[1] = audAnswers;
        scores[2] = rrAnswers;
        scores[3] = kinAnswers;
				var max = scores[0];
        
        //find maximum learning score
        var t1 = 0;
        for (var t=0; t<4; t++) {
        	if (scores[t]>max) {
          	max = scores[t];
            t1 = t;
          }
          
        }
        
        var tie_exists = 0;
        
        var t2 = 0;
        for (var t=0; t<4; t++) {
        	if (scores[t] == max) {
            tie_exists++;
            if (tie_exists == 2) {
            t2 = t;
            }
          }
          
        }
        
        if (tie_exists > 1) { //if we have a tie
        //-------visual ties------------
          if ((t1 == 0) && (t2 == 1)) {
        	resultsContainer.innerHTML = 'you have a tie in your learning styles between visual and auditory.';
          }
          
            if ((t1 == 0) && (t2 == 2)) {
        	resultsContainer.innerHTML = 'you have a tie in your learning styles between visual and reading/writing.';
          }
          
           if ((t1 == 0) && (t2 == 3)) {
        	resultsContainer.innerHTML = 'you have a tie in your learning styles between visual and kinesthetic.';
          }
          //-----auditory ties--------
          if ((t1 == 1) && (t2 == 2)) {
        	resultsContainer.innerHTML = 'you have a tie in your learning styles between auditory and reading/writing.';
          }
          
            if ((t1 == 1) && (t2 == 3)) {
        	resultsContainer.innerHTML = 'you have a tie in your learning styles between auditory and kinesthetic.';
          }
          
 //---------rr ties-------------   
   if ((t1 == 2) && (t2 == 3)) {
        	resultsContainer.innerHTML = 'you have a tie in your learning styles between reading/writing and kinesthetic.';
          }
          
        }
        
     
     
     else {   
        if (max == scores[0]) {
        resultsContainer.innerHTML = 'your dominant style is visual with ' + max + ' out of ' + questions.length;
        window.open("https://www.cowley.edu/academics/skills/tipsvl.html");
        }
        
         if (max == scores[1]) {
        resultsContainer.innerHTML = 'your dominant style is auditory with ' + max + ' out of ' + questions.length;
        window.open("https://www.cowley.edu/academics/skills/tipsal.html");
        }
        
         if (max == scores[2]) {
        resultsContainer.innerHTML = 'your dominant style is reading and writing with ' + max + ' out of ' + questions.length;
        window.open("https://www.k-state.edu/biology/pob/succeed/read.html");
        }
        
        
         if (max == scores[3]) {
        resultsContainer.innerHTML = 'your dominant style is kinesthetic with ' + max + ' out of ' + questions.length;
        window.open("https://www.cowley.edu/academics/skills/tipstk.html");
        }
}
    
    }

    // show questions asap
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}