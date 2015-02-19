//clientY - does not work with all browsers?
//zoom is logarithmic - algebraicly establish range?
var parseTrack = function(track) {
    var altPitch, result, stack, i, l, j, start;
    altPitch = {
        A4: 5,
        Bb4: 10,
        B4: 15,
        C4: 20,
        Db4: 25,
        E4: 30,
        F4: 35,
        Gb4: 40,
        G4: 45,
        Ab4: 50,
        A5: 55,
        Bb5: 60,
        B5: 65
    };
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
                pitch: altPitch[start[1]],
                volume: 10});
            track.shift();
        }
    }
    return result;
};
var showTrack = function(dataset) {
    var h = 95, w = 1000;
    // dataset to contain - offset, duration, pitch (height), volume
    dataset = dataset || [{offset: 10, duration: 10, pitch: 8, volume: 28}, {offset: 200, duration: 10, pitch: 8, volume: 28}];
    var dragmove = function(d) {
        d3.select(this)
            .attr("y", d.y = Math.floor((d3.event.sourceEvent.clientY - 5)/5) * 5);//Math.max(radius, Math.min(h - radius, d3.event.y)));
    };
    var zoomFn = function(d) {
        var col = Math.min(255, Math.floor(Math.pow(10, d3.event.scale)));
        d.volume = col;
        d3.select(this).attr('fill', 'rgb(' + col+ ',' +  col+','+ col+')');
    };
    var svg = d3.select('.track-notes')
        .append('svg')
        .attr('width', w + 'px')
        .attr('height', h + 'px');
    var drag = d3.behavior.drag()
        .origin(function(d) {return d;})
        .on('drag', dragmove);
    var zoom = d3.behavior.zoom()
        //.scaleExtent([0, 255])
        .on('zoom', zoomFn);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr({"x": function (d) {
            return d.offset;
        }, "y": function (d) {
            return d.pitch;
        }}).attr("class", "test").text(function (d) {
            return d;
        }).attr({"width": function(d){return d.duration}, "height": 10})
        .call(drag)
        .call(zoom);
    return svg;
};

