/* globals Tone, GUI */
var WO = WO || {};

WO.drumPadHandler = function() {

	var stepNumber = 0;
	WO.drumPadNoteNames = ["Gb4", "D4", "A4", "G4", "F4", "C4"];
	WO.drumPadCheckboxes = [];
	var indicators = [];

	WO.playDrumPad();

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
	        }
	        sequencer.append("<div></div>");
	    }
	}

	/*makeIndicator();*/
	makeCheckboxes();

	WO.setDrumPadPreset(WO.drumPadPresetRock);
	
};
