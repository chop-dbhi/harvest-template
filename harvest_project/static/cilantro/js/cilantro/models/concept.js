define(["underscore","backbone","../core","./base","./field"],function(e,t,n,r,i){var l=function(t){return e.map(t,function(e){var t=n.data.fields.findWhere({id:e.pk});return t.set({alt_name:e.alt_name,alt_plural_name:e.alt_plural_name}),t})},s=r.Model.extend({constructor:function(){this.fields=new i.FieldCollection,r.Model.prototype.constructor.apply(this,arguments)},parse:function(e,t){if(r.Model.prototype.parse.call(this,e,t),e){if(e.fields){var i=e.fields;n.data.fields.length?(i=l(i),this.fields.set(i,t)):this.listenToOnce(n.data.fields,"sync",function(){i=l(i),this.fields.set(i,t)}),delete e.fields}return e}}}),u=r.Collection.extend({model:s,search:function(n,r){return t.ajax({url:e.result(this,"url"),data:{query:n,brief:1},dataType:"json",success:function(e){r(e)}})}}),a=u.extend({constructor:function(){this.queryable=new u,this.viewable=new u;var t=this;this.queryable.url=function(){return e.result(t,"url")},this.viewable.url=function(){return e.result(t,"url")},u.prototype.constructor.apply(this,arguments)},initialize:function(){this.on("add remove reset",function(){this.queryable.reset(this.filter(function(e){return!!e.get("queryable")})),this.viewable.reset(this.filter(function(e){return!!e.get("viewable")}))})}});return{Concept:s,Concepts:a}});
//# sourceMappingURL=concept.js.map