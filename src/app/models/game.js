import Backbone from 'backbone';
import Player from 'player';

const Game = Backbone.Model.extend({

  initialize: function() {
    var currentBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    var turnCounter = 0;

    this.player1 = new Player(player1, "X");
    this.player2 = new Player(player2, "O");
    this.activePlayer = this.player1;
    this.inactivePlayer = this.player2;
  }


});

export default Game;
