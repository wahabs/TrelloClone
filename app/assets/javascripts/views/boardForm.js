TrelloClone.Views.BoardForm = Backbone.View.extend({
  template: JST["board_form"],
  tagName: "form",

  events: {
    "submit" : "createBoard"
  }

  render : function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createBoard : function(event) {
    var formData = $(event.currentTarget).serializeJSON()
  }

})
