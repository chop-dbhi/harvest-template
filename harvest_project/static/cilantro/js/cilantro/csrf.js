define(["jquery"],function(t){function e(t){var e=document.location.host,n=document.location.protocol,o="//"+e,r=n+o;return t===r||t.slice(0,r.length+1)===r+"/"||t===o||t.slice(0,o.length+1)===o+"/"||!/^(\/\/|http:|https:).*/.test(t)}function n(t){return/^(GET|HEAD|OPTIONS|TRACE)$/.test(t)}function o(o,r){t.ajaxPrefilter(function(t,u,c){return!n(t.type)&&e(t.url)?c.setRequestHeader(o,r):void 0})}return{apply:o}});
//# sourceMappingURL=csrf.js.map