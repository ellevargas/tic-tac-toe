import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Game from 'app/models/game';
import Application from 'app/models/application';

const GameView = Backbone.View.extend({
  initialize: function() {
    this.listElement = $('#player1-win');
    var win1 = this.model.attributes.player1.scorecard.win;
    this.listElement.html(win1);

    this.listElement = $('#player1-lose');
    var lose1 = this.model.attributes.player1.scorecard.lose;
    this.listElement.html(lose1);

    this.listElement = $('#player1-draw');
    var draw1 = this.model.attributes.player1.scorecard.draw;
    this.listElement.html(draw1);

    this.listElement = $('#player2-win');
    var win2 = this.model.attributes.player2.scorecard.win;
    this.listElement.html(win2);

    this.listElement = $('#player2-lose');
    var lose2 = this.model.attributes.player2.scorecard.lose;
    this.listElement.html(lose2);

    this.listElement = $('#player2-draw');
    var draw2 = this.model.attributes.player2.scorecard.draw;
    this.listElement.html(draw2);

    this.listenTo(this.model, "change", this.render);

    console.log("Active: " + this.model.attributes.activePlayer.name);
    console.log("Inactive: " + this.model.attributes.inactivePlayer.name);
    console.log("turnCounter " + this.model.attributes.turnCounter);
  },

  render: function() {
    this.delegateEvents();
    // ^ reconnects the DOM event handlers
    return this;
  },

  events: {
    'click .move td': 'makeMove',
    'keypress .move td[tabindex]': 'makeMove',

    'click .btn-clear-board': 'clearBoard',
    'click .btn-new-session': 'newSession'
  },

  makeMove: function(event) {
    event.preventDefault();
    // console.log("You clicked " + $(event.target).attr('id'));
    // console.log(this.model.attributes.activePlayer);
    // // console.log("You clicked " + $(event.target).attr('id'));
    // console.log(this.model.attributes.inactivePlayer);

    this.model.play($(event.target).attr('id'));

    this.listElement = $(event.target);

    var letter = this.model.attributes.activePlayer.letter;
    if (letter == "X") {
      this.listElement.html('<img id="X" alt="You have put a stylish bee X!" src="/images/bee-X.png" />');
    } else if (letter == "O") {
      this.listElement.html('<img id="O" alt="You have placed a snazzy beehive O!" src="/images/honeycomb-O.png" />');
    };

    this.model.scoreKeeper();
    // console.log("turnCounter " + this.model.attributes.turnCounter);
    this.model.turnHandler();
    console.log("End of play turnCounter " + this.model.attributes.turnCounter);

    // console.log(this.model.attributes.currentBoard);
  },

  clearBoard: function(event) {
    // console.log(this.model.attributes.currentBoard);

    // console.log("Active: " + this.model.attributes.activePlayer.name);
    // console.log("Inactive: " + this.model.attributes.inactivePlayer.name);

    this.model.newGame();

    this.tableCell = $("td");
    this.tableCell.html('');

    // if (this.model.attributes.turnCounter > 0) {
    //   var inactive = this.model.attributes.inactivePlayer;
    //   var active = this.model.attributes.activePlayer;
    //   this.model.attributes.activePlayer = inactive;
    //   this.model.attributes.inactivePlayer = active;
    // };

    console.log("Active: " + this.model.attributes.activePlayer.name);
    console.log("Inactive: " + this.model.attributes.inactivePlayer.name);
    console.log("Clear board turnCounter " + this.model.attributes.turnCounter);
  },

  newSession: function(event) {
    console.log("I tried to make a new session!")
  }

});

export default GameView;
