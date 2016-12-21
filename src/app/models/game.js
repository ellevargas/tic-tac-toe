import Backbone from 'backbone';

const Game = Backbone.Model.extend({

  initialize: function() {
    this.set("currentBoard", [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    this.set("turnCounter", 0);

    this.set("player1", {name: "Bumblebee", letter: "X",
    scorecard: {win: 0, lose: 0, draw: 0}});
    this.set("player2", {name: "Honeycomb", letter: "O",
    scorecard: {win: 0, lose: 0, draw: 0}});

    // this.get("player1").name;

    this.set("activePlayer", this.get("player1"));
    this.set("inactivePlayer", this.get("player2"));

    // this.set("scorecard",
    //   {player1: { "Win":0, "Lose": 0, "Draw": 0},
    //   player2: { "Win":0, "Lose": 0, "Draw": 0}})
  },

  play: function(move) {
    if (move >= 0 && move < 9 && this.get("currentBoard")[move] == " " && this.winCheck(this.get("currentBoard")) == false && this.get("turnCounter") < 9) {

      var board = this.get("currentBoard");
      board[move] = this.get("activePlayer").letter;
      this.set("currentBoard", board);
      // this.scoreKeeper();
      // this.turnHandler();
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
    // if (this.get("turnCounter") % 2 == 0) {

      var inactive = this.get("inactivePlayer");
      var active = this.get("activePlayer");
      this.set("activePlayer", inactive);
      this.set("inactivePlayer", active);

      // this.set("activePlayer", this.get("player1"));
      // this.set("inactivePlayer", this.get("player2"));
    // } else {
    //   var inactive = this.get("inactivePlayer");
    //   var active = this.get("activePlayer");
    //   this.set("activePlayer", inactive);
    //   this.set("inactivePlayer", active);
    //   // this.set("activePlayer", this.get("player2"));
    //   // this.set("inactivePlayer", this.get("player1"));
    // };
    return this.get("turnCounter");
  },

  scoreKeeper: function() {
    if (this.winCheck(this.get("currentBoard")) == true) {

      console.log("Active scorecard is ", this.get("activePlayer").scorecard.win);
      // console.log("Inactive scorecard is ", this.get("inactivePlayer").scorecard.lose);

      var pascore = this.get("activePlayer").scorecard.win;
      var pacard = this.get("activePlayer").scorecard.win;
      pacard = pacard + 1;
      this.set(pascore, pacard);

      //accessing 2d nested object with this.set

      var piscore = this.get("inactivePlayer").scorecard.lose;
      var picard = this.get("inactivePlayer").scorecard.lose;
      picard = picard + 1;
      this.set(piscore, picard);

      console.log("Active scorecard is ", this.get("activePlayer").scorecard.win);
      // console.log("Inactive scorecard is ", this.get("inactivePlayer").scorecard.lose);

      // var board = this.get("currentBoard");
      // board[move] = this.get("activePlayer").letter;
      // this.set("currentBoard", board);

      // this.set("activePlayer".scorecard["Win"], this.get("activePlayer").scorecard["Win"] + 1);
      // this.set("inactivePlayer".scorecard["Lose"], this.get("inactivePlayer").scorecard["Lose"] + 1);
    } else if (this.get("turnCounter") == 8 && this.winCheck(this.get("currentBoard")) == false) {
      this.set("activePlayer".scorecard["Draw"], this.get("activePlayer").scorecard["Draw"] + 1);
      this.set("inactivePlayer".scorecard["Draw"], this.get("inactivePlayer").scorecard["Draw"] + 1);
    }
    // else {
    //   this.turnHandler();
    // }
  },

  newGame: function() {
    this.set("currentBoard", [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    this.set("turnCounter", 0);
    // var inactive = this.get("inactivePlayer");
    // var active = this.get("activePlayer");
    // this.set("activePlayer", inactive);
    // this.set("inactivePlayer", active);
    // console.log("I made it to newGame in model");

    // DOES NOT ACTUALLY RESET PLAYERS
  }

});

export default Game;
