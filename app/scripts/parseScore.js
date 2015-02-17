var notes = [];

parseScore = function (score){
                   var notes = [];
                   for (var inst in score){
                       var part = score[inst];
                       if (inst === "tempo"){
                           Tone.Transport.setBpm(part);
                       } else if (inst === "timeSignature"){
                           Tone.Transport.setTimeSignature(part[0], part[1]);
                       } else if (Array.isArray(part)){
                           for (var i = 0; i < part.length; i+=2){
                               var noteDescription = part[i];
                               var note;
                               if (Array.isArray(noteDescription)){
                                   var time = noteDescription[0];
                                   var value = noteDescription.slice(1);
                                   var dur_time1=time;
                                   var dur_time2 = part[i+1][0];
                                   var duration = function(start, end){
                                        var duration = Math.abs(Tone.Transport.toSeconds(end) - Tone.Transport.toSeconds(start));
                                        return duration
                                   };
                                   var noteDuration = duration(dur_time1, dur_time2);
                                   note = new Tone.Note(inst, time, value, noteDuration);
                               } else {
                                   note = new Tone.Note(inst, noteDescription);
                               }
                               notes.push(note);
                           }
                       } else {
                           throw new TypeError("score parts must be Arrays");
                       }
                   }
                   console.log('notes->', notes);
                   console.log(notes.length);
                   return notes;
};