TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["board_show"],

  initialize : function(options) {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);

    this.model.lists().each( function(list) {
      var listShow = new TrelloClone.Views.ListShow({model: list});
      this.addSubview($(".lists"), listShow);
    }, this)

    return this;
  }

})
