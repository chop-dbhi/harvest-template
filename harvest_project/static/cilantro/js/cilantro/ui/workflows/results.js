define(["jquery","underscore","marionette","../core","../paginator","../numbers","../tables"],function(t,e,i,o,a,s,n){var l=i.ItemView.extend({tagName:"span",className:"result-count",template:"count",ui:{count:".count",label:".count-label"},initialize:function(){this.model.stats.on("sync",this.updateCount,this),this.on("render",this.updateCount,this)},updateCount:function(){var t=this.model.stats.get("count");this.collection.setResultCount(t),s.renderCount(this.ui.count,t,"all"),this.ui.label.text("records")}}),r=a.Paginator.extend({renderPageCount:function(t,e){var i=e;void 0===e&&(i="all"),0===e&&(i=1),this.ui.pageCount.text(i)},renderCurrentPage:function(t,e,i){this.ui.currentPage.text(e),this.ui.first.prop("disabled",!!i.first),this.ui.prev.prop("disabled",!!i.first),this.ui.next.prop("disabled",!!i.next),this.ui.last.prop("disabled",!!i.last),i.first&&(this.ui.first.tooltip("hide"),this.ui.prev.tooltip("hide")),i.last&&(this.ui.next.tooltip("hide"),this.ui.last.tooltip("hide"))}}),u=i.Layout.extend({className:"results-workflow",template:"workflows/results",ui:{toggleFiltersButton:"[data-toggle=context-panel]",toggleFiltersIcon:"[data-toggle=context-panel] i",toggleFiltersText:"[data-toggle=context-panel] span",navbar:".results-workflow-navbar",resultsContainer:".results-container",navbarButtons:".results-workflow-navbar button",loadingOverlay:"[data-target=results-loading-message]",canceledQueryMessage:"[data-target=canceled-query-message]"},events:{"click [data-toggle=columns-dialog]":"showColumnsDialog","click [data-toggle=exporter-dialog]":"showExporterDialog","click [data-toggle=query-dialog]":"showQueryDialog","click [data-toggle=api-script-dialog]":"showApiScriptDialog","click [data-toggle=context-panel]":"toggleContextPanel","click [data-action=cancel-query]":"handleCancelQuery","click [data-action=retry-query]":"handleRetryQuery"},regions:{count:".count-region",table:".table-region",paginator:".paginator-region"},initialize:function(){if(e.bindAll(this,"onPageScroll"),this.data={},!(this.data.context=this.options.context))throw new Error("context model required");if(!(this.data.view=this.options.view))throw new Error("view model required");if(!(this.data.results=this.options.results))throw new Error("results collection required");this.listenTo(this.data.results,"request",this.showLoadingOverlay),this.listenTo(this.data.results,"sync",this.hideLoadingOverlay),this.on("router:load",this.onRouterLoad),this.on("router:unload",this.onRouterUnload)},onRouterLoad:function(){this.data.results.trigger("workspace:load"),this.hideContextPanel()},onRouterUnload:function(){this.data.results.trigger("workspace:unload")},handleCancelQuery:function(t){t.preventDefault(),this.data.results.cancel(),this.showCanceledQueryMessage()},handleRetryQuery:function(t){t.preventDefault(),this.data.results.markAsDirty(),this.data.results.fetch()},showCanceledQueryMessage:function(){this.hideLoadingOverlay(),this.ui.canceledQueryMessage.show(),this.table.$el.hide()},hideCanceledQueryMessage:function(){this.ui.canceledQueryMessage.hide(),this.table.$el.show()},showLoadingOverlay:function(){this.isClosed!==!0&&(this.hideCanceledQueryMessage(),this.ui.loadingOverlay.show())},hideLoadingOverlay:function(){this.isClosed!==!0&&this.ui.loadingOverlay.hide()},toggleContextPanel:function(){o.panels.context.isPanelClosed()?this.showContextPanel():this.hideContextPanel()},showContextPanel:function(){o.panels.context.openPanel(),this.$el.addClass("panel-open"),this.ui.toggleFiltersButton.tooltip("hide").attr("data-original-title","Hide Filter Panel").tooltip("fixTitle"),this.ui.toggleFiltersIcon.removeClass("icon-collapse-alt"),this.ui.toggleFiltersIcon.addClass("icon-expand-alt"),this.ui.toggleFiltersText.html("Hide Filters")},hideContextPanel:function(){o.panels.context.closePanel({full:!0}),this.$el.removeClass("panel-open"),this.ui.toggleFiltersButton.tooltip("hide").attr("data-original-title","Show Filter Panel").tooltip("fixTitle"),this.ui.toggleFiltersIcon.addClass("icon-collapse-alt"),this.ui.toggleFiltersIcon.removeClass("icon-expand-alt"),this.ui.toggleFiltersText.html("Show Filters")},onPageScroll:function(){var e=t(document).scrollTop();if(void 0===this.navbarVerticalOffset&&(this.navbarVerticalOffset=this.ui.navbar.offset().top),void 0===this.topNavbarHeight){var i=t(".navbar-fixed-top");this.topNavbarHeight=i.length>0?i.height():0}this.ui.navbar.hasClass("navbar-fixed-top")?e<this.navbarVerticalOffset-this.topNavbarHeight&&this.ui.navbar.removeClass("navbar-fixed-top"):e>=this.navbarVerticalOffset-this.topNavbarHeight&&(this.ui.navbar.css("top",this.topNavbarHeight),this.ui.navbar.addClass("navbar-fixed-top"))},onRender:function(){t(document).on("scroll",this.onPageScroll),this.paginator.show(new r({model:this.data.results})),this.count.show(new l({model:this.data.context,collection:this.data.results})),this.table.show(new n.Table({view:this.data.view,collection:this.data.results})),this.ui.navbarButtons.tooltip({animation:!1,placement:"bottom"}),this.listenTo(this.data.view.facets,"reset",function(){0!==this.data.view.facets.length||o.config.get("session.defaults.data.preview")||o.notify({header:"No Columns Selected: ",level:"warning",timeout:!1,message:'No data can be displayed. Click the "Change Columns" button on the toolbar to select columns to display.'})})},onClose:function(){t(document).off("scroll",this.onPageScroll)},showExporterDialog:function(){o.dialogs.exporter.open()},showColumnsDialog:function(){o.dialogs.columns.open()},showQueryDialog:function(){o.dialogs.query.open()},showApiScriptDialog:function(){o.dialogs.apiScript.open()}});return{ResultCount:l,ResultsWorkflow:u}});
//# sourceMappingURL=results.js.map