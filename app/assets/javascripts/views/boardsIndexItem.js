TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({
  template: JST["boards_index_item"],
  tagName: "li",

  events: {
    "click button.delete" : "deleteBoard"
  },

  render: function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  deleteBoard : function(event) {
    this.model.destroy();
  }

})
