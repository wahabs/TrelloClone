TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards_index"],

  initialize : function() {
    this.listenTo(this.collection, "sync", this.render)
    this.indexItems = this.subviews($("#boards"));
  },

  render: function() {
    var that = this;
    var content = that.template({ boards: that.collection });
    that.$el.html(content);

    that.collection.each( function(board) {
      var item = new TrelloClone.Views.BoardsIndexItem({ model: board});
      that.addSubview($("#boards"), item);
    })

    return that;
  }
})
