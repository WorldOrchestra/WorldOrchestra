//zoom is logarithmic - algebraically establish range?
var WO = WO || {};

WO.MidiRender = function(clas) {
  this.factor = 10;
  this.noteHeight = 6;
  this.h = this.noteHeight * 95 + 2;
  this.w = 512 * this.factor;

  this.svg = d3.select('.' + clas)
      .append('svg')
      .attr('width', this.w + 'px')
      .attr('height', this.h + 'px');

  this.drawGrid();
  this.drawBar(0);
  $('.track-notes').scrollTop(190);
};

WO.MidiRender.prototype.drawGrid = function() {
  var xScale, yScale, xAxis, yAxis;

  xScale = d3.scale.linear()
    .domain([0, this.w])
    .range([0, this.w]);

  yScale = d3.scale.linear()
    .domain([0, this.h])
    .range([this.h, 0]);

  xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .innerTickSize(-this.h)
    .outerTickSize(0)
    .tickPadding(10);

  yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .innerTickSize(-this.w)
    .outerTickSize(0)
    .tickPadding(10);

  this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.h + ")")
      .call(xAxis);

  this.svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
};

WO.MidiRender.prototype.drawBar = function(offset) {
  var lineFunc, lineData;
  lineData = [{
    x: offset,
    y: 0
  }, {
    x: offset,
    y: this.h
  }];
  lineFunc = d3.svg.line()
    .x(function(d) {
      return d.x;
    })
    .y(function(d) {
      return d.y;
    })
    .interpolate('linear');
  this.svg.append('svg:path')
    .attr('d', lineFunc(lineData))
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
};

WO.MidiRender.prototype.octaveMap = function(o) {
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

WO.MidiRender.prototype.altPitch = function(p) {
  var octave, pitch, altPitch;
  octave = p.slice(-1);
  pitch = p.slice(0, -1);
  altPitch = {
    C: 0,
    Db: this.noteHeight,
    D: this.noteHeight * 2,
    Eb: this.noteHeight * 3,
    E: this.noteHeight * 4,
    F: this.noteHeight * 5,
    Gb: this.noteHeight * 6,
    G: this.noteHeight * 7,
    Ab: this.noteHeight * 8,
    A: this.noteHeight * 9,
    Bb: this.noteHeight * 10,
    B: this.noteHeight * 11
  };
  return 574 - 1 - altPitch[pitch] - octave * this.noteHeight * 12;
};

WO.MidiRender.prototype.revAltPitch = function(p) {
  var base, scale, octave, pitch, revAltPitch;
  base = 574 - 1 - p;
  scale = this.noteHeight * 12;
  octave = Math.floor(base / scale);
  pitch = base - octave * scale;
  revAltPitch = {
    0: 'C',
    6: 'Db',
    12: 'D',
    18: 'Eb',
    24: 'E',
    30: 'F',
    36: 'Gb',
    42: 'G',
    48: 'Ab',
    54: 'A',
    60: 'Bb',
    66: 'B'
  };
  return revAltPitch[pitch] + octave;
};

WO.MidiRender.prototype.deleteNote = function(track) {
  var source, actTrack, notes, findIndex, mRender;
  source = d3.select('.activeNote').data()[0].source;
  actTrack = WO.appView.songView.collection.settings.activeTrack;
  mRender = actTrack.get('mRender');
  findIndex = mRender.findIndex;
  notes = actTrack.get('notes');
  notes.splice(findIndex(0, source, notes), 1);
  notes.splice(findIndex(1, source, notes), 1);
  mRender.svg.select('.activeNote').remove();
};

WO.MidiRender.prototype.parseTrack = function(track) {
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
          octave: start[1].slice(-1),
          source: [start, track.shift()]
        });
      }
    }
  }
  return result;
};

WO.MidiRender.prototype.findIndex = function(offset, source, notes) {
  var index;
  index = 0;
  while (!(notes[index][0] === source[offset][0] && notes[index][1] === source[offset][1])) {
    index += 1;
  }
  return index;
};

WO.MidiRender.prototype.showTrack = function(track) {
  var dragmove, zoomFn, drag, zoom, that;
  track = track ? track.slice() : [];

  that = this;
  dragmove = function(d) {
    var newPitch, actTrack, thisNote, originalNotes, revPitch, mRender;

    actTrack = WO.appView.songView.collection.settings.activeTrack;
    newPitch = that.noteHeight / 2 + Math.floor((d3.event.sourceEvent.offsetY - that.noteHeight) / that.noteHeight) * that.noteHeight;
    thisNote = d3.select(this);
    mRender = actTrack.get('mRender');
    revPitch = mRender.revAltPitch(newPitch);
    thisNote.attr("y", d.y = newPitch);//Math.max(radius, Math.min(h - radius, d3.event.y)));
    actTrack.get('instrument').triggerAttackRelease(revPitch);
    originalNotes = actTrack.get('notes');
    originalNotes[mRender.findIndex(0, thisNote.data()[0].source, originalNotes)][1] = revPitch;
    originalNotes[mRender.findIndex(1, thisNote.data()[0].source, originalNotes)][1] = revPitch;
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

  $('rect').off('click');
  this.svg
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
    }, "height": that.noteHeight})
    .attr({"stroke": function(d) {
      return that.octaveMap(d.octave);
    }, "stroke-width": "2px"})
    .call(drag)
    .call(zoom)
    .on('click', function(e, i) {
      d3.select('.activeNote')
        .classed('activeNote', false);
      d3.select(this)
        .classed('activeNote', true);
    });
  return this.svg;
};

