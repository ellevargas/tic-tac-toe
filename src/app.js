import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Application from 'app/models/application';
import Game from 'app/models/game';
import GameView from 'app/views/gameview';

$(document).ready(function(event) {
  var newGame = new Game();
  var gameView = new GameView({model: newGame});
});
