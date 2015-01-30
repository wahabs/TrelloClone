TrelloClone.Collections.Lists = Backbone.Collection.extend({

  initialize : function(models, options) {
    this.board = options.board;
  },

  url: function() {
    return "api/boards/" + this.board.id + "/lists/";
  },

  model: TrelloClone.Models.List

})
