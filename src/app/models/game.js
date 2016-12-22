import Backbone from 'backbone';

const Game = Backbone.Model.extend({

  initialize: function() {
    this.set("currentBoard", [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    this.set("turnCounter", 0);

    this.set("player1", {name: "Bumblebee", letter: "X"});
    this.set("player2", {name: "Honeycomb", letter: "O"});

    // this.get("player1").name;

    this.set("activePlayer", this.get("player1"));
    this.set("inactivePlayer", this.get("player2"));

    // this.modal = $('#winner-modal');
  },

  play: function(move) {
    if (move >= 0 && move < 9 && this.get("currentBoard")[move] == " " && this.winCheck(this.get("currentBoard")) == false && this.get("turnCounter") < 9) {

      var board = this.get("currentBoard");
      board[move] = this.get("activePlayer").letter;
      this.set("currentBoard", board);

      return this.get("currentBoard");

      // console.log("Marked with " + this.get("activePlayer").name + " " +  this.get("activePlayer").letter);

      // if (this.winCheck(this.get("currentBoard")) == false &&
      //  this.get("turnCounter") < 9) {
      // };
    } else {
      throw new TypeError("Please choose a valid move.");
    };
  },

  winCheck: function(board) {
    if (board[0] == board[1] && board[1] == board[2] && board[0] != " " ||
        board[3] == board[4] && board[4] == board[5] && board[3] != " " ||
        board[6] == board[7] && board[7] == board[8] && board[6] != " " ||
        board[0] == board[3] && board[3] == board[6] && board[0] != " " ||
        board[1] == board[4] && board[4] == board[7] && board[1] != " " ||
        board[2] == board[5] && board[5] == board[8] && board[2] != " " ||
        board[2] == board[4] && board[4] == board[6] && board[2] != " " ||
        board[0] == board[4] && board[4] == board[8] && board[0] != " ") {
      return true;
    } else {
      return false;
    }
  },

  turnHandler: function () {
    this.set("turnCounter", this.get("turnCounter") + 1);
      var inactive = this.get("inactivePlayer");
      var active = this.get("activePlayer");
      this.set("activePlayer", inactive);
      this.set("inactivePlayer", active);
    return this.get("turnCounter");
  },

  newGame: function() {
    this.set("currentBoard", [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    this.set("turnCounter", 0);
  }

});

export default Game;
