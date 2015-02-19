var WO = WO || {};
WO.userInputView = Backbone.View.extend({
    //tagname: "",
    //className: 'songView',
    //events: {},
    template: _.template(
        '<div>'+
        '<div id="Container">'+
        '<div id="Content">'+
        '<div id="Loading">LOADING...</div>'+
        '<div id="Sequencer"></div>'+
        '</div>'+
        '</div>'+
        '</div>'
    ),
    initialize: function(params) {
        // this.render();
    },
    render: function() {
        var myTemplate = this.$el.append(this.template);
        // drumPadHandler();
        return myTemplate;
    }
});
