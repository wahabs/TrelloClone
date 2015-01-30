TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["board_show"],

  render: function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  }

})
