(function() {
  'use strict';

  angular
    .module('bd.app')
    .value('Drums', createDrums());


  function createDrums() {
    var drumsKits = {
      Standard: [
        {
          name: 'tom1',
          label: 'Small Rack Tom',
          filename: 'sounds/drums/acoustic2/small-rack-tom',
          duration: 0.66
        }, {
          name: 'tom2',
          label: 'Big Rack Tom',
          filename: 'sounds/drums/acoustic2/big-rack-tom',
          duration: 0.9
        }, {
          name: 'tom3',
          label: 'Floor Tom',
          filename: 'sounds/drums/acoustic2/floor-tom',
          duration: 1.09
        }, {
          name: 'crash',
          label: 'Crash',
          filename: 'sounds/drums/acoustic2/crash',
          duration: 3.85
        }, {
          name: 'hihat-open',
          label: 'Hi-Hat Open',
          filename: 'sounds/drums/acoustic2/hi-hat-open',
          duration: 1.56
        }, {
          name: 'hihat',
          label: 'Hi-Hat Closed',
          filename: 'sounds/drums/acoustic2/hi-hat-closed',
          duration: 0.13
        }, {
          name: 'snare',
          label: 'Snare',
          filename: 'sounds/drums/acoustic2/snare',
          duration: 0.46
        }, {
          name: 'kick',
          label: 'Kick',
          filename: 'sounds/drums/acoustic2/kick',
          duration: 0.44
        }
      ],
      Bongo: [
        {
          name: 'tom1',
          label: 'Bongo',
          filename: 'sounds/drums/bongo/bongo_001d',
          duration: 0.5
        }, {
          name: 'tom2',
          label: 'Bongo',
          filename: 'sounds/drums/bongo/bongo_002c',
          duration: 0.5
        }, {
          name: 'tom3',
          label: 'Bongo',
          filename: 'sounds/drums/bongo/bongo_005d',
          duration: 0.5
        }, {
          name: 'snare',
          label: 'Bongo',
          filename: 'sounds/drums/bongo/bongo_006r',
          duration: 0.5
        }, {
          name: 'kick',
          label: 'Bongo',
          filename: 'sounds/drums/bongo/bongo_004c',
          duration: 0.5
        }
      ]
    };
    // drums = [
    //   {
    //     name: 'tom1',
    //     label: 'Tom 1',
    //     filename: 'sounds/drums/acoustic-kit/tom1',
    //     duration: 0.41
    //   }, {
    //     name: 'tom2',
    //     label: 'Tom 2',
    //     filename: 'sounds/drums/acoustic-kit/tom2',
    //     duration: 0.6
    //   }, {
    //     name: 'tom3',
    //     label: 'Tom 3',
    //     filename: 'sounds/drums/acoustic-kit/tom3',
    //     duration: 1.0
    //   }, {
    //     name: 'hihat',
    //     label: 'Hi-Hat',
    //     filename: 'sounds/drums/acoustic-kit/hihat',
    //     duration: 0.25
    //   }, {
    //     name: 'snare',
    //     label: 'Snare',
    //     filename: 'sounds/drums/acoustic-kit/snare',
    //     duration: 0.36
    //   }, {
    //     name: 'kick',
    //     label: 'Kick',
    //     filename: 'sounds/drums/acoustic-kit/kick',
    //     duration: 0.27
    //   }
    // ];

    for (name in drumsKits) {
      var kit = drumsKits[name];
      kit.drumMap = {};
      kit.forEach(function(drum) {
        kit.drumMap[drum.name] = drum;
      });
    }
    return drumsKits;
  }

})();