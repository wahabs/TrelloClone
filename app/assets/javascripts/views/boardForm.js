TrelloClone.Views.BoardForm = Backbone.View.extend({
  template: JST["board_form"],
  tagName: "form",

  events: {
    "submit" : "createBoard"
  },

  render : function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createBoard : function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var board = new TrelloClone.Models.Board();
    board.set(formData);
    board.save({}, {
      success: function() {
         Backbone.history.navigate("api/boards/" + board.id, { trigger: true })
      }
    });
  }

})
