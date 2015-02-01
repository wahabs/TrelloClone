TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["board_show"],

  initialize : function(options) {
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.lists(), "add", this.addList)
  },

  render : function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);

    this.model.lists().each(function(list) { this.addList(list) }, this)

    var list = new TrelloClone.Models.List({}, { board: this.model });
    this.addSubview(".new_list", new TrelloClone.Views.ListForm({ model: list }));

    return this;
  },

  addList: function (list) {
    var listShow = new TrelloClone.Views.ListShow({ model: list, list_id: list.id });
    this.addSubview('.lists', listShow);
  },

})
