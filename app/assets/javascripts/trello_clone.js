window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    $rootEl = $('#main');
    new TrelloClone.Routers.TrelloRouter($rootEl);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
