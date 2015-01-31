TrelloClone.Views.ListForm = Backbone.View.extend({
  template: JST["list_form"],
  tagName: "form",

  events: {
    "submit" : "createList"
  },

  render : function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createList : function(event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    that.model.set(formData);
    that.model.set("board_id", that.model.board.id);
    that.model.save({}, {
      success: function() {
        that.model.board.lists().push(that.model);
        Backbone.history.navigate(
         "api/boards/" + that.model.get("board_id"), { trigger: true }
        )
      }
    });
  }

})