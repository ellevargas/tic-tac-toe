import Backbone from 'backbone';

import Game from 'app/models/game';
import GameView from 'app/views/gameview';

const Application = Backbone.Model.extend({

  newGame: function() {
    var gameView = new GameView({
      model: new Game(),
      el: '#application'
    });
    gameView.render();
  }

  // gameView.fetch();

  // events: {
  //   'click .btn-clear-board': 'clearBoard',
  // }

});

export default Application;
