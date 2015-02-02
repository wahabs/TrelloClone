TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST["card_show"],
  tagName: "li",
  className: "card-show",
  events: {
    "click button.card-delete" : "destroyCard"
  },

  initialize: function () {
    this.listenTo(this.model, "all", this.render)
  },

  render : function() {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },

  destroyCard : function(event) {
    this.model.destroy();
  }

})
