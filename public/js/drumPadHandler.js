/* globals Tone, GUI */
var drumPadHandler = function() {
		//try this out?
		debugger;
	var keys = new Tone.MultiSampler({
    "A" : "../soundfont/acoustic_grand_piano-mp3/A4.mp3",
/*    "C#" : "./tylersDrumkit/acoustic-kit/snare.wav",
    "E" : "./tylersDrumkit/acoustic-kit/tom1.wav",
    "F#" : "./tylersDrumkit/acoustic-kit/tom2.wav",
    "G" : "./tylersDrumkit/acoustic-kit/tom3.wav",
    "D" : "./tylersDrumkit/acoustic-kit/kick.wav"*/
}, function(){
    $("#Loading").remove();
    startCheckbox.enable();
});
keys.toMaster();

	var stepNumber = 0;
	var noteNames = ["A", "C#", "E", "F#", "G", "D"];
	var checkboxes = [];
	var indicators = [];

	Tone.Transport.setLoopEnd("1m");
	Tone.Transport.loop = true;
	Tone.Transport.setInterval(function(time){
	    //remove the old indicator
	    $(".Lit").removeClass("Lit");
	    //light up the new one
	    indicators[stepNumber].addClass("Lit");
	    stepNumber++;
	    stepNumber = stepNumber % 16;
	    //get the current column
	    for (var i = 0; i < checkboxes.length; i++){
	        var box = checkboxes[i][stepNumber];
	        if (box.isChecked()){
	            keys.triggerAttack(noteNames[i], time);
	        }
	    }
	}, "16n");
	// GUI //
	var sequencer = $("#Sequencer");
	var slider = $(".Slider");
	//the indicator of the beat
	function makeIndicator(){
	    for (var beat = 0; beat < 16; beat++){
	        var indicator = $("<div>", {"class" : "Indicator"}).appendTo(slider);
	        indicators.push(indicator);
	    }
	    slider.append("<br><br>");
	}
	//1 row for each instrument
	//16 beats in each row
	function makeCheckboxes(){
	    for (var row = 0; row < 6; row++){
	        checkboxes[row] = [];
	        for (var beat = 0; beat < 16; beat++){
	            var checkbox = new GUI.Checkbox(sequencer, function(){}, "", "");
	            checkboxes[row].push(checkbox);
	            //randomly set some as checked initially
	            if (Math.random() < 0.25){
	                checkbox.check(true);
	            }
	        }
	        sequencer.append("<div></div>");
	    }
	}
	new GUI.TopBar(Tone);
	var startButton = $("#StartButton");
	var startCheckbox = new GUI.Checkbox(startButton, function(on){
	    if (on){
	        Tone.Transport.start();
	    } else {
	        Tone.Transport.stop();
	    }
	}, "start", "stop");
	startCheckbox.disable();

	/*makeIndicator();*/
	makeCheckboxes();
	var slider = new GUI.Slider($("#Content"), function(val){
	    var scaled = val * 30 + 100;
	    Tone.Transport.setBpm(scaled);
	    return scaled;
	}, 120, "tempo");
	slider.render(20/30);

};