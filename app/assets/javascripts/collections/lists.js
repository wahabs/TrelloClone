TrelloClone.Collections.Lists = Backbone.Collection.extend({

  comparator: "ord",

  initialize : function(models, options) {
    this.board = options.board;
  },

  url: 'api/lists',

  model: TrelloClone.Models.List,

})
