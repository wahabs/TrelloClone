TrelloClone.Routers.TrelloRouter = Backbone.Router.extend({
  routes: {
    "" : "boardsIndex",
    "api/boards/:id" : "boardShow"
  },

  initialize : function($rootEl) {
    this.boards = new TrelloClone.Collections.Boards();
    this.$rootEl = $rootEl;
  },

  boardsIndex : function() {
    this.boards.fetch();
    var index = new TrelloClone.Views.BoardsIndex({ collection: this.boards });
    this._swapView(index);
  },

  boardShow : function(id) {
    debugger
    var board = this.boards.get(id);
    board.fetch();
    var show = new TrelloClone.Views.BoardShow({ model: board });
    this._swapView(show);
  },


  _swapView : function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }

})
