TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST["card_show"],
  tagName: "li",
  render : function() {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  }

})
