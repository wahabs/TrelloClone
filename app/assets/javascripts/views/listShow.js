TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["list_show"],
  tagName: "li",
  render : function() {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    return this;
  }

})
