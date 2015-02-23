//zoom is logarithmic - algebraically establish range?
var WO = WO || {};

WO.midiRender = function(clas) {
  this.h = 95;
  this.w = 1000;
  this.factor = 10;

  this.svg = d3.select('.' + clas)
      .append('svg')
      .attr('width', this.w + 'px')
      .attr('height', this.h + 'px');

  this.xScale = d3.scale.linear()
      .domain([0, this.w])
      .range([0, this.w]);

  this.yScale = d3.scale.linear()
      .domain([0, this.h])
      .range([this.h, 0]);

  this.xAxis = d3.svg.axis()
      .scale(this.xScale)
      .orient("bottom")
      .innerTickSize(-this.h)
      .outerTickSize(0)
      .tickPadding(10);

  this.yAxis = d3.svg.axis()
      .scale(this.yScale)
      .orient("left")
      .innerTickSize(-this.w)
      .outerTickSize(0)
      .tickPadding(10);

  this.drawGrid();
};

WO.midiRender.prototype.drawGrid = function() {
  this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.h + ")")
      .call(this.xAxis);
  this.svg.append("g")
      .attr("class", "y axis")
      .call(this.yAxis);
};

WO.midiRender.prototype.octaveMap = function(o) {
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

WO.midiRender.prototype.altPitch = function(p) {
  var altPitch = {
    C4: 90,
    Db4: 85,
    D4: 80,
    Eb4: 75,
    E4: 70,
    F4: 65,
    Gb4: 60,
    G4: 55,
    Ab4: 50,
    A4: 45,
    Bb4: 40,
    B4: 35,
    C5: 30,
    Db5: 25,
    D5: 20,
    Eb5: 15,
    E5: 10,
    F5: 5
  };
  return altPitch[p];
};

WO.midiRender.prototype.revAltPitch = function(p) {
  var revAltPitch = {
    90: 'C4',
    85: 'Db4',
    80: 'D4',
    75: 'Eb4',
    70: 'E4',
    65: 'F4',
    60: 'Gb4',
    55: 'G4',
    50: 'Ab4',
    45: 'A4',
    40: 'Bb4',
    35: 'B4',
    30: 'C5',
    25: 'Db5',
    20: 'D5',
    15: 'Eb5',
    10: 'E5',
    5: 'F5'
  };
  return revAltPitch[p];
};

WO.midiRender.prototype.parseTrack = function(track) {
  var result, start, waitingRoom;
  result = [];
  if(track.length > 1) {
    waitingRoom = {};
    waitingRoom[track[0][1]] = track.shift();
    while (track.length > 0) {
      if (track[0][2] === 1) {
        waitingRoom[track[0][1]] = track.shift();
      } else {
        start = waitingRoom[track[0][1]];
        delete waitingRoom[track[0][1]];
        result.push({
          offset: Tone.prototype.toSeconds(start[0]) * 16,
          duration: (Tone.prototype.toSeconds(track[0][0]) - Tone.prototype.toSeconds(start[0])) * this.factor,
          pitch: this.altPitch(start[1]),
          volume: 10,
          octave: start[1].slice(-1)
        });
        track.shift();
      }
    }
  }
  return result;
};

WO.midiRender.prototype.showTrack = function(track) {
  var dragmove, zoomFn, drag, zoom, that;
  track = track ? track.slice() : [];

  dragmove = function(d) {
      var pitch = Math.floor((d3.event.sourceEvent.offsetY - 5)/5) * 5;
    d3.select(this)
      .attr("y", d.y = pitch);//Math.max(radius, Math.min(h - radius, d3.event.y)));
      // reverse convert height to note.

  };
  zoomFn = function(d) {
    var col = Math.min(255, Math.floor(Math.pow(10, d3.event.scale)));
    d.volume = col;
    d3.select(this).attr('fill', 'rgb(' + col+ ',' +  col+','+ col+')');
  };
  drag = d3.behavior.drag()
    .origin(function(d) {return d;})
    .on('drag', dragmove);
  zoom = d3.behavior.zoom()
    // TODO How to make zoom behave linearly?  .scaleExtent([0, 255])
    .on('zoom', zoomFn);

  that = this;
  d3.select('svg')
    .selectAll("rect")
    .data(this.parseTrack(track))
    .enter()
    .append("rect")
    .attr({"x": function (d) {
      return d.offset * that.factor;
    }, "y": function (d) {
      return d.pitch;
    }}).attr("class", "test")
    .text(function (d) {
      return d;
    }).attr({"width": function(d){
      return d.duration * that.factor;
    }, "height": 10})
    .attr({"stroke": function(d) {
      return that.octaveMap(d.octave);
    }, "stroke-width": "2px"})
    .call(drag)
    .call(zoom);
  return this.svg;
};

