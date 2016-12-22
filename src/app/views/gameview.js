import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Game from 'app/models/game';
import Application from 'app/models/application';

const GameView = Backbone.View.extend({
  initialize: function() {
    // this.listElement = $('#player1-win');
    // var win1 = this.model.attributes.player1.scorecard.win;
    // this.listElement.html(win1);

    var whoseTurn = this.model.attributes.activePlayer.name;
    $('#' + whoseTurn).css("text-decoration", "underline");

    this.listenTo(this.model, "change", this.render);

    // console.log("Active: " + this.model.attributes.activePlayer.name);
    // console.log("Inactive: " + this.model.attributes.inactivePlayer.name);
    // console.log("turnCounter " + this.model.attributes.turnCounter);
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
  },

  makeMove: function(event) {
    event.preventDefault();
    // console.log(this.model.attributes.activePlayer);

    this.model.play($(event.target).attr('id'));

    var whoseTurn = this.model.attributes.activePlayer.name;
    $('#' + whoseTurn).css("text-decoration", "none");

    this.listElement = $(event.target);

    var letter = this.model.attributes.activePlayer.letter;
    if (letter == "X") {
      this.listElement.html('<img id="X" alt="You have put a stylish bee X!" src="/images/bee-X.png" />');
    } else if (letter == "O") {
      this.listElement.html('<img id="O" alt="You have placed a snazzy honeycomb O!" src="/images/honeycomb-O.png" />');
    };

    // console.log("turnCounter " + this.model.attributes.turnCounter);
    this.model.turnHandler();
    var whoseTurn = this.model.attributes.activePlayer.name;
    $('#' + whoseTurn).css("text-decoration", "underline");
    // console.log("End of play, turnCounter: " + this.model.attributes.turnCounter);
  },

  clearBoard: function(event) {
    // console.log("Begin clear board turnCounter: " + this.model.attributes.turnCounter);

    if (this.model.attributes.turnCounter % 2 == 0) {
      var inactive = this.model.attributes.inactivePlayer;
      var active = this.model.attributes.activePlayer;
      this.model.attributes.activePlayer = inactive;
      this.model.attributes.inactivePlayer = active;
    };

    this.model.newGame();

    var whoseTurn = this.model.attributes.activePlayer.name;
    $('#' + whoseTurn).css("text-decoration", "underline");

    var whoseTurn = this.model.attributes.inactivePlayer.name;
    $('#' + whoseTurn).css("text-decoration", "none");

    this.tableCell = $("td");
    this.tableCell.html('');

    console.log("Active: " + this.model.attributes.activePlayer.name);
    console.log("Inactive: " + this.model.attributes.inactivePlayer.name);
  }

});

export default GameView;
