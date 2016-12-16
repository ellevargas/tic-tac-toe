import Backbone from 'backbone';

const Player = Backbone.Model.extend({

  defaults: {
    name: "Player1",
    letter: "X",
    scorecard: { "Win":0, "Lose": 0, "Draw": 0}
  },

  initialize: function(options, options) {
  }

});

export default Player;
