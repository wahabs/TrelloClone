TrelloClone.Models.Card = Backbone.Model.extend({

  initialize : function(attributes, options) {
    this.list = options.list;
  },

  urlRoot: "api/cards"

})
