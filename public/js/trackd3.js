//clientY - does not work with all browsers?
//zoom is logarithmic - algebraicly establish range?
var WO = WO || {};

var midiRender = function(clas) {
    this.h = 95;
    this.w = 1000;
    this.svg = d3.select('.' + clas)
        .attr('width', this.w + 'px')
        .attr('height', this.h + 'px');
};

midiRender.prototype.height = function(h) {
    var height;
    if (h) {
        height = h;
    } else {
        return height || 95;
    }
};

midiRender.prototype.octaveMap = function(o) {
    var octave = {
        1: 'red',
        2: 'orange',
        3: 'yellow',
        4: 'green',
        5: 'blue',
        6: 'indigo',
        7: 'violet'
    };
    return octave[o];
};

midiRender.prototype.altPitch = function(p) {
    var altPitch = {
        A4: 65,
        Bb4: 60,
        B4: 55,
        C4: 50,
        Db4: 45,
        E4: 40,
        F4: 35,
        Gb4: 30,
        G4: 25,
        Ab4: 20,
        A5: 15,
        Bb5: 10,
        B5: 5
    };
    return altPitch[p];
};

midiRender.prototype.parseTrack = function(track) {
    var result, stack, i, j, start;
    result = [];
    stack = [track.shift()];
    for (i = 0; i < track.length; ) {
        if (track[i][2] === 1) {
            stack.push(track.shift());
        } else {
            for (j = stack.length - 1; stack[j][1] !== track[i][1]; j -= 1) {
            }
            start = stack.splice(j, 1)[0];
            result.push({offset: Tone.prototype.toSeconds(start[0]) * 16,
                duration: (Tone.prototype.toSeconds(track[i][0]) - Tone.prototype.toSeconds(start[0])) * 16,
                pitch: this.altPitch(start[1]),
                volume: 10,
                octave: start[1].slice(-1)});
            track.shift();
        }
    }
    return result;
};

midiRender.prototype.showTrack = function(track) {
    track = track ? track.slice() : [["0:0:0","C4",1],["0:0:2","Ab4",1],["0:0:3","C4",0],["10:0:4","Ab4",0]];

    var dragmove = function(d) {
        d3.select(this)
            .attr("y", d.y = Math.floor((d3.event.sourceEvent.offsetY - 5)/5) * 5);//Math.max(radius, Math.min(h - radius, d3.event.y)));
    };
    var zoomFn = function(d) {
        var col = Math.min(255, Math.floor(Math.pow(10, d3.event.scale)));
        d.volume = col;
        d3.select(this).attr('fill', 'rgb(' + col+ ',' +  col+','+ col+')');
    };
    var drag = d3.behavior.drag()
        .origin(function(d) {return d;})
        .on('drag', dragmove);
    var zoom = d3.behavior.zoom()
        //.scaleExtent([0, 255])
        .on('zoom', zoomFn);

    var that = this;
    d3.select('.track-notes').selectAll("rect")
        .data(this.parseTrack(track))
        .enter()
        .append("rect")
        .attr({"x": function (d) {
            return d.offset;
        }, "y": function (d) {
            return d.pitch;
        }}).attr("class", "test")
        .text(function (d) {
            return d;
        }).attr({"width": function(d){
            return d.duration
        }, "height": 10})
        .attr({"stroke": function(d) {
            return that.octaveMap(d.octave);
        }, "stroke-width": "2px"})
        .call(drag)
        .call(zoom);
    return this.svg;
};

WO.midiRender = midiRender;

