import Backbone from 'backbone';

const Player = Backbone.Model.extend({

  defaults: {
    name: "Player1",
    letter: "X",
    scorecard: { "Win":0, "Lose": 0, "Draw": 0}
  },

  initialize: function(options) {
  }

});
//
// var player2 = new Player({
//   name: "Bob",
//   letter: "O"
// });
//
// player2.set("name", "Sally");

export default Player;
