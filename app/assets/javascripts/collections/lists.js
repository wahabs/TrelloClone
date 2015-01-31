TrelloClone.Collections.Lists = Backbone.Collection.extend({

  initialize : function(models, options) {
    this.board = options.board;
  },

  url: 'api/lists',

  model: TrelloClone.Models.List,

  sortBy : function(list) {
    list.get("ord");
  }

})
