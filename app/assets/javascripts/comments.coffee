# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on "ajax:success", "form#comments-form", (ev,data)->
	console.log data
	$(this).find("textarea").val("")
	$("#comments-box").append("<li class='list-group-item'> #{data.body} <i class='link-spacer'></i> <i class='info-font-author'> #{data.user.full_name} </i></li>")

$(document).on "ajax:error", "form#comments-form", (ev,data)->
	console.log data