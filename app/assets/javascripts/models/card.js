TrelloClone.Models.Card = Backbone.Model.extend({
  urlRoot: "/api/cards",

  initialize : function(attributes, options) {
    this.list = options.list;
  }


})
