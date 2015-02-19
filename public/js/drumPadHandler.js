/* globals Tone, GUI */
var drumPadHandler = function() {

	var stepNumber = 0;
	WO.drumPadNoteNames = ["Gb4", "D4", "A4", "G4", "F4", "C4"];
	WO.drumPadCheckboxes = [];
	var indicators = [];

	playDrumPad();

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
	        WO.drumPadCheckboxes[row] = [];
	        for (var beat = 0; beat < 16; beat++){
	            var checkbox = new GUI.Checkbox(sequencer, function(){}, "", "");
	            WO.drumPadCheckboxes[row].push(checkbox);
	            //randomly set some as checked initially
	            if (Math.random() < 0.25){
	                checkbox.check(true);
	            }
	        }
	        sequencer.append("<div></div>");
	    }
	}

	/*makeIndicator();*/
	makeCheckboxes();
	var slider = new GUI.Slider($(".transportView"), function(val){
	    var scaled = val * 30 + 100;
	    Tone.Transport.setBpm(scaled);
	    return scaled;
	}, 120, "tempo");
	slider.render(20/30);

};
