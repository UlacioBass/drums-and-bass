(function() {
  'use strict';

  angular
    .module('bd.app')
    .factory('audioVisualiser', audioVisualiser);

  function audioVisualiser() {
    function AudioVisualiser() {}

    AudioVisualiser.prototype.initialize = function(elem, analyser) {
        this.x = 0;
        this.y = 0;
        this.width = canvas.offsetWidth;
        this.height = canvas.offsetHeight;
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = 'rgb(240, 240, 240)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgb(180, 0, 0)';
        // this.ctx.translate(0, 0);

        this.dataArray = new Uint8Array(analyser.frequencyBinCount);
        this.analyser = analyser;
        // this._analyze = this._analyze.bind(this);
    };


    AudioVisualiser.prototype.reset = function() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.x = 0;
      this.ctx.moveTo(0, this.y);        
    };

    // AudioVisualiser.prototype._analyze = function() {
    //   var time = this.analyser.context.currentTime;
    //   if (time < this.beat.endTime) {
    //     this.draw();
    //     requestAnimationFrame(this._analyze);
    //   }
    // };

    function analyze() {
      var time = this.visualiser.analyser.context.currentTime;
      if (time < this.beat.endTime) {
        this.visualiser.draw();
        requestAnimationFrame(analyze.bind({
          visualiser: this.visualiser,
          beat: this.beat
        }));
      }
    }

    AudioVisualiser.prototype.beatSync = function(bpm, beat) {
      // console.log('BEAT Sync '+bpm);
      if (beat === 1) {
        this.reset();
        // console.log(this.analyser.frequencyBinCount);
        // console.log(this.width/4);
        // console.log(60000/bpm);
      }
      var beatTime = 60/bpm;
      var beatStart = this.analyser.context.currentTime;
      var beat = {
        index: beat,
        bpm: bpm,
        startTime: beatStart,
        endTime: beatStart + beatTime
      }
      this.beat = beat;
      requestAnimationFrame(analyze.bind({
        visualiser: this,
        beat: beat
      }));
    };

    AudioVisualiser.prototype.draw = function() {
      //console.log('drawing');
      var ctx = this.ctx;
      this.analyser.getByteTimeDomainData(this.dataArray);
      
      // ctx.beginPath();
      // ctx.moveTo(x-2, y);
      // ctx.lineTo(x, y);
      // ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);

      var time = this.analyser.context.currentTime;
      var relativeOffset = (time - this.beat.startTime) / (this.beat.endTime-this.beat.startTime);

      var beatWidth = Math.round(this.width/4);
      var beatStartPx = Math.round(beatWidth * (this.beat.index-1));
      var toPx = Math.round(beatStartPx + relativeOffset*beatWidth);
      // var step = parseInt(3300/this.beat.bpm);
      var steps = toPx - this.x;
      for(var i = 0; i < steps; i+=1) {
        var dataIndex= parseInt((i+1)*this.analyser.frequencyBinCount/steps);
        var v = this.dataArray[dataIndex-1] / 128.0;
        this.y = v * this.height / 2;
        // if (this.x > this.width) {
        //   this.reset();
        // }
        if (i === 0) {
        } else {
          ctx.lineTo(this.x+1, this.y);
        }
        this.x += 1;
      }
      ctx.stroke();
    };

    return new AudioVisualiser();
  };
})();