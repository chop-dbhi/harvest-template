define(["underscore","marionette","../constants"],function(t,e,i){var n=e.ItemView.extend({className:"search",template:"search",options:{placeholder:"Search...",delay:i.INPUT_DELAY},ui:{input:"input"},events:{"keyup @ui.input":"_triggerSearch"},constructor:function(i){this._triggerSearch=t.debounce(this.triggerSearch,this.options.delay),e.ItemView.prototype.constructor.call(this,i),this._query="",this.on("search",this.renderInputText),this.search&&this.on("search",this.search)},onRender:function(){this.ui.input.attr("placeholder",this.options.placeholder);var e=this;t.defer(function(){e._isRendered&&!e.isClosed&&e.ui.input.focus()})},renderInputText:function(t){this.ui.input.val()!==t&&(this._query=t,this.ui.input.val(t))},triggerSearch:function(t){t.stopImmediatePropagation();var e=this.ui.input.val().trim();e!==this._query&&(this._query=e,this.trigger("search",e))}});return{Search:n}});
//@ sourceMappingURL=search.js.map