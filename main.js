Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    })
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/apHc6ls1F/model.json',modelLoaded);
function modelLoaded(){
    console.log("modelLoaded")
}
function speak(){
    var synth= window.speechSynthesis;
    speak_data1= "The first prediciton is" + prediction_1;
    speak_data2= "The second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotresult);
}
function gotresult(error, results){
    console.log("inside gotresult")
    if(error){
    console.error(error);
} else {
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = results[0].label;
    document.getElementById("result_gesture_name2").innerHTML = results[1].label; 
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(results[0].label == "Amazing"){
        document.getElementById("emoji_name").innerHTML = "&#128076;";
    }

    if(results[0].label == "Good"){
        document.getElementById("emoji_name").innerHTML = "&#128077;";
    }

    if(results[0].label == "Victory"){
        document.getElementById("emoji_name").innerHTML = "&#9996;";
    } 
    
    if(results[1].label == "Amazing"){
        document.getElementById("emoji_name2").innerHTML = "&#128076;";
    }

    if(results[1].label == "Good"){
        document.getElementById("emoji_name2").innerHTML = "&#128077;";
    }

    if(results[1].label == "Victory"){
        document.getElementById("emoji_name2").innerHTML = "&#9996;";
    } 
}
}
prediction_1="";
prediction_2="";