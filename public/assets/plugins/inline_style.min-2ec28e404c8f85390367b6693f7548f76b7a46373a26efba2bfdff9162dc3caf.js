/*!
 * froala_editor v2.5.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c)}:a(window.jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{inlineStyles:{"Big Red":"font-size: 20px; color: red;","Small Blue":"font-size: 14px; color: blue;"}}),a.FE.PLUGINS.inlineStyle=function(b){function c(c){""!==b.selection.text()?b.html.insert(a.FE.START_MARKER+'<span style="'+c+'">'+b.selection.text()+"</span>"+a.FE.END_MARKER):b.html.insert('<span style="'+c+'">'+a.FE.INVISIBLE_SPACE+a.FE.MARKERS+"</span>")}return{apply:c}},a.FE.RegisterCommand("inlineStyle",{type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.inlineStyles;for(var c in b)b.hasOwnProperty(c)&&(a+='<li role="presentation"><span style="'+b[c]+'" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="inlineStyle" data-param1="'+b[c]+'" title="'+this.language.translate(c)+'">'+this.language.translate(c)+"</a></span></li>");return a+="</ul>"},title:"Inline Style",callback:function(a,b){this.inlineStyle.apply(b)},plugin:"inlineStyle"}),a.FE.DefineIcon("inlineStyle",{NAME:"paint-brush"})});
