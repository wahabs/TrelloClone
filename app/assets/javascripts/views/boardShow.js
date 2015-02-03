TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["board_show"],

  initialize : function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model.lists(), "remove", this.removeList);
    this.model.lists().each(function(list) { this.addList(list) }, this);

    var list = new TrelloClone.Models.List({}, { board: this.model });
    this.addSubview(".new_list", new TrelloClone.Views.ListForm({ model: list }));
  },

  events: {
    "sortupdate" : "updateOrds"
  },

  onRender : function() {
    Backbone.CompositeView.prototype.onRender.call(this);
    $(".lists").sortable();
  },

  render : function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  addList: function (list) {
    var listShow = new TrelloClone.Views.ListShow({ model: list, board: this.model });
    this.addSubview(".lists", listShow);
  },

  removeList : function(list) {
    var that = this;
    var subViewToRemove = _.findWhere(that.subviews(".lists"), { model: list });
    that.removeSubview(that.subviews(".lists"), subViewToRemove);
  },

  updateOrds : function(event, ui) {
    var that = this;

    _(that.$(".lists").children()).each( function(list, i) {
      var oldOrd = $(list).find(".list-title").data("ord");
      var listModel = that.model.lists().findWhere({ord: oldOrd});
      listModel.set("ord", i);
      listModel.save();
    });

    that.model.lists().sort();
    _(that.subviews(".lists")).each( function(subview) { subview.updateOrds() });
  }

})
