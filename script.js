function start(){
    var homeworkPoints = document.getElementById("homeworkPoints").value;
    var homeworkWeight = parseInt(document.getElementById("homeworkWeight").value);
    var classworkPoints = document.getElementById("classworkPoints").value;
    var classworkWeight = parseInt(document.getElementById("classworkWeight").value);
    var assessmentPoints = document.getElementById("assessmentPoints").value;
    var assessmentWeight = parseInt(document.getElementById("assessmentWeight").value);
    var participationPoints = document.getElementById("participationPoints").value;
    var participationWeight = parseInt(document.getElementById("participationWeight").value);

    var percent = determinePercent(homeworkWeight, classworkWeight, assessmentWeight, participationWeight);

    homeworkPoints = convertArrayStringToNumber(homeworkPoints);
    classworkPoints = convertArrayStringToNumber(classworkPoints);
    assessmentPoints = convertArrayStringToNumber(assessmentPoints);
    participationPoints = convertArrayStringToNumber(participationPoints);

    var averageHomework = averageArray(homeworkPoints);
    var averageClasswork = averageArray(classworkPoints);
    var averageAssessment = averageArray(assessmentPoints);
    var averageParticipation = averageArray(participationPoints);

    averageColor(averageHomework,"homeworkPoints","homeworkWeight");
    averageColor(averageClasswork,"classworkPoints","classworkWeight");
    averageColor(averageAssessment,"assessmentPoints","assessmentWeight");
    averageColor(averageParticipation,"participationPoints","participationWeight");

    var calculateHomework = gradePlusWeight(averageHomework, homeworkWeight);
    var calculateClasswork = gradePlusWeight(averageClasswork, classworkWeight);
    var calculateAssessment = gradePlusWeight(averageAssessment, assessmentWeight);
    var calculateParticipation = gradePlusWeight(averageParticipation, participationWeight);

    var theRealGrade = calculateCurrentGrade(calculateHomework, calculateClasswork, calculateAssessment, calculateParticipation, percent);


    var percentExceeded = tooMuchPercent(percent);
    if(percentExceeded == false){
        return false;
    }
    document.getElementById("percent").innerHTML = percent + "%";
    document.getElementById("calculateGrade").innerHTML = "Current Grade: " + theRealGrade + "%";

    return theRealGrade;

}


function determinePercent(homeworkW,classworkW,assessmentW, participationW){
    var calculation = homeworkW + classworkW + assessmentW + participationW + parseInt(document.getElementById("finalWeight").value);
    return calculation;
}

function convertArrayStringToNumber(string){
    var arr = string.split(",");
    for(var i = 0; i < arr.length; i++){
        arr[i] = parseInt(arr[i]);
    }
    return arr;
}

function averageArray(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    var average = sum / arr.length;
    return average;
}

function gradePlusWeight(average, weight){
    var catScore = average * (weight * .01);
    return catScore;
}


function calculateCurrentGrade(homework, classwork, assessment, participation, percent){
    var grade =  homework + classwork + assessment + participation;
    var newPercent = percent - parseInt(document.getElementById("finalWeight").value);
    var realPercent = newPercent * 0.01;
    grade = grade / realPercent;
    return grade;
}

function calculateFinal() {
    var currentGrade = start();
    var gradeDesired = parseInt(document.getElementById("gradeDesired").value);
    var finalWeight = parseInt(document.getElementById("finalWeight").value)
    var currentWeight = 1 - (finalWeight/100);
    var weightedCurrent = currentGrade * currentWeight;
    var finalGradeRequired = (gradeDesired - weightedCurrent) / (finalWeight/100);
    document.getElementById("gradeRequired").innerHTML = finalGradeRequired + "%" + " required to obtain a " + gradeDesired + "%";
}

function tooMuchPercent(currentWeight){
    if(currentWeight > 100){
        alert("The weights you have entered exceed 100%");
        return false;
    }
    return true;
}

function averageColor(average, element, secondElement){
    if(average >= 90) {
        document.getElementById(element).style.background = 'green';
        document.getElementById(secondElement).style.background = 'green';

    }
    if(average >= 80 && average < 90){
        document.getElementById(element).style.background = 'blue';
        document.getElementById(secondElement).style.background = 'blue';
    }
    if(average >= 70 && average < 80){
        document.getElementById(element).style.background = 'yellow';
        document.getElementById(secondElement).style.background = 'yellow';
    }
    if(average >= 65 && average < 70){
        document.getElementById(element).style.background = 'orange';
        document.getElementById(secondElement).style.background = 'orange';
    }
    if(average <= 64){
        document.getElementById(element).style.background = 'red';
        document.getElementById(secondElement).style.background = 'red';
    }
}

