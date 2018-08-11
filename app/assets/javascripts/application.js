// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require fastclick.min.js
//= require modernizr.custom.32229-2.8-respondjs-1-4-2.js
//= require jquery
//= require jquery_ujs

//= require bootstrap-sprockets
//= require jquery.jpanelmenu.min.js
//= require modernizr-custom.js
//= require jquery-2.2.3.min.js
//= require comments
//= require main.js

//= require froala_editor.min.js
//= require plugins/font_size.min.js
//= require plugins/paragraph_format.min.js
//= require plugins/paragraph_style.min.js
//= require plugins/align.min.js
//= require plugins/fullscreen.min.js
//= require plugins/link.min.js
//= require plugins/lists.min.js

$( document ).ready(function() {
  $('selector').froalaEditor();
});
