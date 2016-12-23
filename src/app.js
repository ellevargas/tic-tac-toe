import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Application from 'app/models/application';
import GameHistory from 'app/collections/gameHistory';
import Game from 'app/models/game';
import GameView from 'app/views/gameview';

$(document).ready(function(event) {
  var gameHistory = new GameHistory();
  // gameHistory.fetch();

  var gameView = new GameView({
    model: new Game(),
    el: '#application'
  });

  // gameView.fetch();

  gameView.render();

  $('input').keypress(function(e){
   if(e.keyCode == 13){
      $(this).trigger('enter');
   }
  });
});
