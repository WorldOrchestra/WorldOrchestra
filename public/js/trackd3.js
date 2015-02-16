/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var showTrack = function(dataset) {
    var h = 1000, w = 5000;
    // dataset to contain - offset, duration, pitch (height), volume
    dataset = dataset || [{offset: 10, duration: 10, pitch: 8, volume: 28}, {offset: 200, duration: 10, pitch: 8, volume: 28}];
    var dragmove = function(d) {
        d3.select(this)
            .attr("y", d.y = Math.floor((d3.event.sourceEvent.clientY - 5)/100) * 100);//Math.max(radius, Math.min(h - radius, d3.event.y)));
    };
    var zoomFn = function(d) {
        var col = Math.min(255, Math.floor(Math.pow(10, d3.event.scale)));
        d.volume = col;
        console.log(d);
        d3.select(this).attr('fill', 'rgb(' + col+ ',' +  col+','+ col+')');
    };
    var svg = d3.select('body')
        .append('svg')
        .attr('width', w + 'px')
        .attr('height', h + 'px');
    var drag = d3.behavior.drag()
        .origin(function(d) {return d;})
        .on('drag', dragmove);
    var zoom = d3.behavior.zoom()
        //.scaleExtent([0, 255])
        .on('zoom', zoomFn);
    var radius = 25;

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
        }).attr({"width": 50, "height": 10})
        .call(drag)
        .call(zoom);

    //only vertical motion.
    //snap to grid heights e.g. Math.floor(y/10) * 10
    //clientY - does not work with all browsers?
    //zoom is logarithmic - algebraicly establish range?
    return svg;
};

